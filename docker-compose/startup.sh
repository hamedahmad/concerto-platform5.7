#!/bin/bash

set +e

cd /usr/src/concerto

# ✅ fix permissions
chown -R www-data:www-data var
chmod -R 775 var

echo "Waiting for database..."

# ✅ wait for MySQL
until mysql -h "${DATABASE_HOST}" -u "${DATABASE_USER}" -p"${DATABASE_PASSWORD}" -e "SELECT 1" > /dev/null 2>&1; do
  echo "Database not ready yet..."
  sleep 3
done

echo "Database is ready ✅"

# ✅ generate parameters.yml
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

# ✅ clean cache
rm -rf var/cache/*

# ✅ create DB if needed
php bin/console doctrine:database:create || true

# ✅ setup database
php bin/console concerto:setup || true

# ✅ import default content
php bin/console concerto:content:import || true

rm -rf /usr/src/concerto/web/bundles
mkdir -p /usr/src/concerto/web/bundles


# ✅ install Symfony assets (safe)
php bin/console assets:install web || true


echo "Installing frontend dependencies via Bower..."

cd /usr/src/concerto/src/Concerto/PanelBundle/Resources/public/angularjs

apt-get update -y && apt-get install -y nodejs npm
npm install -g bower

bower install --allow-root || true

# ✅ IMPORTANT: move files to /web
mkdir -p /usr/src/concerto/web/bundles/concertopanel/angularjs

cp -r bower_components \
      /usr/src/concerto/web/bundles/concertopanel/angularjs/

echo "✅ Bower assets copied to web/"

BASE=/usr/src/concerto/web/bundles/concertopanel/angularjs/bower_components

##################################jsPlumb############################################
# ✅ FINAL jsPlumb FIX (create expected legacy path)

# ✅ jsPlumb (COPY FROM HOST frontend FOLDER)

BASE=/usr/src/concerto/web/bundles/concertopanel/angularjs/bower_components
JS_DIR="$BASE/jsPlumb/dist/js"

echo "Installing jsPlumb from local frontend folder..."

# create destination directory
mkdir -p "$JS_DIR"

# copy file from mounted frontend folder
cp /frontend/dom.jsPlumb-1.7.6-min.js \
   "$JS_DIR/dom.jsPlumb-1.7.6-min.js" || echo "❌ jsPlumb copy failed"

# verify
ls -l "$JS_DIR"


chown -R www-data:www-data /usr/src/concerto/web/bundles
chmod -R 755 /usr/src/concerto/web/bundles

##################################BASE############################################

echo "=== FINAL VERIFY FILES ==="
find $BASE -type f -name "*.js" -o -name "*.css"

cd /usr/src/concerto


# ✅ additional Concerto tasks
php bin/console concerto:r:cache || true
php bin/console concerto:content:upgrade --init-only || true
php bin/console concerto:schedule:tick || true

# ✅ warmup cache
rm -rf var/cache/*
php bin/console cache:warmup --env=prod || true


mkdir -p var/cache var/logs var/sessions || true
mkdir -p src/Concerto/PanelBundle/Resources/public/files || true
mkdir -p src/Concerto/PanelBundle/Resources/import || true
mkdir -p src/Concerto/TestBundle/Resources/sessions || true
mkdir -p src/Concerto/TestBundle/Resources/R || true


# ✅ fix permissions
chown -R www-data:www-data var/cache var/logs var/sessions || true
chown -R www-data:www-data src/Concerto/PanelBundle/Resources/public/files || true
chown -R www-data:www-data src/Concerto/PanelBundle/Resources/import || true
chown -R www-data:www-data src/Concerto/TestBundle/Resources/sessions || true
chown -R www-data:www-data src/Concerto/TestBundle/Resources/R || true

# ✅ clean R checkpoint
rm -rf src/Concerto/TestBundle/Resources/R/init_checkpoint/* || true


# ✅ start services
echo "Starting services..."

service cron start || cron
service nginx start

php-fpm -F
