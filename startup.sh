#!/bin/bash

cd /usr/src/concerto

# ✅ fix base permissions
chown -R www-data:www-data var
chmod -R 775 var

echo "Waiting for database..."

# ✅ wait for MySQL (better than wait-for-it)
until mysql -h database -u root -proot -e "SELECT 1" > /dev/null 2>&1; do
  echo "Database not ready yet..."
  sleep 3
done

echo "Database is ready ✅"

# ✅ clean cache before setup
rm -rf var/cache/*

# ✅ ensure database exists (safe re-run)
php bin/console doctrine:database:create || true

# ✅ initialize schema
php bin/console concerto:setup || true

# ✅ 🚨 CRITICAL: install frontend assets (fix JS issues)
php bin/console concerto:content:import || true

# ✅ additional Concerto tasks
php bin/console concerto:r:cache || true
php bin/console concerto:content:upgrade --init-only || true
php bin/console concerto:schedule:tick || true

# ✅ recreate cache
rm -rf var/cache/*
php bin/console cache:warmup --env=prod || true

# ✅ fix permissions (important for runtime)
chown -R www-data:www-data var/cache var/logs var/sessions
chown -R www-data:www-data src/Concerto/PanelBundle/Resources/public/files
chown -R www-data:www-data src/Concerto/PanelBundle/Resources/import
chown -R www-data:www-data src/Concerto/TestBundle/Resources/sessions
chown -R www-data:www-data src/Concerto/TestBundle/Resources/R/fifo
chown -R www-data:www-data src/Concerto/TestBundle/Resources/R/init_checkpoint

# ✅ clean R checkpoint
rm -rf src/Concerto/TestBundle/Resources/R/init_checkpoint/*

# ✅ start services
echo "Starting cron..."
service cron start || cron

echo "Starting nginx..."
service nginx start

echo "Starting PHP-FPM..."
php-fpm -F
