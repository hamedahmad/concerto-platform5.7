#!/bin/bash

cd /usr/src/concerto

# fix permissions
chown -R www-data:www-data var
chmod -R 775 var

echo "Waiting for database..."

# wait for MySQL
until mysql -h "${DATABASE_HOST}" -u "${DATABASE_USER}" -p"${DATABASE_PASSWORD}" -e "SELECT 1" > /dev/null 2>&1; do
  echo "Database not ready yet..."
  sleep 3
done

echo "Database is ready ✅"

# generate parameters.yml AFTER DB is ready
cat > /usr/src/concerto/app/config/parameters.yml <<EOF
parameters:
    database_driver: pdo_mysql
    database_host: ${DATABASE_HOST}
    database_port: ${DATABASE_PORT}
    database_name: ${DATABASE_NAME}
    database_user: ${DATABASE_USER}
    database_password: ${DATABASE_PASSWORD}
    database_path: null
    database_unix_socket: null
    database_version: 8.0
    test_database_name: concerto_test
    test_database_user: ${DATABASE_USER}
    test_database_password: ${DATABASE_PASSWORD}
    mailer_transport: smtp
    mailer_host: localhost
    mailer_user: null
    mailer_password: null
    locale: en_GB
    secret: change_this_token
EOF

# clean cache
rm -rf var/cache/*

# create DB if missing
php bin/console doctrine:database:create || true

# setup
php bin/console concerto:setup || true

# install frontend (CRITICAL for JS)
php bin/console concerto:content:import || true

# additional tasks
php bin/console concerto:r:cache || true
php bin/console concerto:content:upgrade --init-only || true
php bin/console concerto:schedule:tick || true

# warmup cache
rm -rf var/cache/*
php bin/console cache:warmup --env=prod || true

# fix permissions
chown -R www-data:www-data var/cache var/logs var/sessions
chown -R www-data:www-data src/Concerto/PanelBundle/Resources/public/files
chown -R www-data:www-data src/Concerto/PanelBundle/Resources/import
chown -R www-data:www-data src/Concerto/TestBundle/Resources/sessions
chown -R www-data:www-data src/Concerto/TestBundle/Resources/R/fifo
chown -R www-data:www-data src/Concerto/TestBundle/Resources/R/init_checkpoint

rm -rf src/Concerto/TestBundle/Resources/R/init_checkpoint/*

# start services
service cron start || cron
service nginx start

php-fpm -F