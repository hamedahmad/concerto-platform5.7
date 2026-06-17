#!/bin/bash

set -e

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

# ✅ install frontend dependencies (NO BOWER)
echo "Installing frontend dependencies..."

BASE=/usr/src/concerto/web/bundles/concertopanel/angularjs/bower_components
mkdir -p $BASE

# ✅ jQuery
mkdir -p $BASE/jquery/dist
curl -sL https://code.jquery.com/jquery-2.1.4.min.js \
  -o $BASE/jquery/dist/jquery.min.js

# ✅ jquery metadata
mkdir -p $BASE/jquery.metadata
curl -sL https://cdnjs.cloudflare.com/ajax/libs/jquery-metadata/2.1/jquery.metadata.min.js \
  -o $BASE/jquery.metadata/jquery.metadata.js

# ✅ Bootstrap
mkdir -p $BASE/bootstrap/dist/css
mkdir -p $BASE/bootstrap/dist/js
curl -sL https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css \
  -o $BASE/bootstrap/dist/css/bootstrap.min.css
curl -sL https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap-theme.min.css \
  -o $BASE/bootstrap/dist/css/bootstrap-theme.min.css
curl -sL https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js \
  -o $BASE/bootstrap/dist/js/bootstrap.min.js

# ✅ Angular
mkdir -p $BASE/angular
curl -sL https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js \
  -o $BASE/angular/angular.min.js

# ✅ Angular sanitize
mkdir -p $BASE/angular-sanitize
curl -sL https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-sanitize.min.js \
  -o $BASE/angular-sanitize/angular-sanitize.min.js

# ✅ Angular bootstrap
mkdir -p $BASE/angular-bootstrap
curl -sL https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.2.5/ui-bootstrap.min.js \
  -o $BASE/angular-bootstrap/ui-bootstrap.min.js
curl -sL https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.2.5/ui-bootstrap-tpls.min.js \
  -o $BASE/angular-bootstrap/ui-bootstrap-tpls.min.js

# ✅ Angular block UI
mkdir -p $BASE/angular-block-ui/dist
curl -sL https://cdnjs.cloudflare.com/ajax/libs/angular-block-ui/0.2.2/angular-block-ui.min.js \
  -o $BASE/angular-block-ui/dist/angular-block-ui.min.js
curl -sL https://cdnjs.cloudflare.com/ajax/libs/angular-block-ui/0.2.2/angular-block-ui.min.css \
  -o $BASE/angular-block-ui/dist/angular-block-ui.min.css

# ✅ jQuery migrate
mkdir -p $BASE/jquery.migrate

curl -L https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/1.2.1/jquery-migrate-1.2.1.min.js \
  -o $BASE/jquery.migrate/jquery-migrate-1.2.1.min.js
# ✅ jQuery UI
mkdir -p $BASE/jquery-ui

curl -L https://code.jquery.com/ui/1.11.4/jquery-ui.min.js \
  -o $BASE/jquery-ui/jquery-ui.min.js

mkdir -p $BASE/jquery-ui/themes/base

curl -L https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css \
  -o $BASE/jquery-ui/themes/base/jquery-ui.min.css

curl -L https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/images/ui-icons_444444_256x240.png \
  -o $BASE/jquery-ui/themes/base/ui-icons_444444_256x240.png
curl -L https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/images/ui-icons_555555_256x240.png \
  -o $BASE/jquery-ui/themes/base/ui-icons_555555_256x240.png
curl -L https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/images/ui-icons_777777_256x240.png \
  -o $BASE/jquery-ui/themes/base/ui-icons_777777_256x240.png
curl -L https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/images/ui-icons_cc0000_256x240.png \
  -o $BASE/jquery-ui/themes/base/ui-icons_cc0000_256x240.png
curl -L https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/images/ui-icons_ffffff_256x240.png \
  -o $BASE/jquery-ui/themes/base/ui-icons_ffffff_256x240.png
# ✅ install Symfony assets (safe)
php bin/console assets:install web --symlink || true

# ✅ additional Concerto tasks
php bin/console concerto:r:cache || true
php bin/console concerto:content:upgrade --init-only || true
php bin/console concerto:schedule:tick || true

# ✅ warmup cache
rm -rf var/cache/*
php bin/console cache:warmup --env=prod || true

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