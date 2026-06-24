#!/bin/bash

set +e

export TZ=Europe/Berlin
echo "✅ $(date) Container ist gestartet und weiter mit dem Datenbank-Check"
cd /usr/src/concerto

# ✅ fix permissions
chown -R www-data:www-data var
chmod -R 775 var


echo "Waiting for database..."

# ✅ wait for MySQL
echo "Waiting for database..."

until mysql --ssl=0 \
  -h "${DATABASE_HOST}" \
  -P "${DATABASE_PORT}" \
  -u "${DATABASE_USER}" \
  -p"${DATABASE_PASSWORD}" \
  -e "SELECT 1"
do
  echo "❌ Still can't connect..."
  sleep 3
done

echo "✅ $(date) Dataenbank ist bereit, weiter mit dem Starten von php-8.2, patsch fuer und concerto5"

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
    command: --ssl=0 --default-authentication-plugin=mysql_native_password
    secret:  ${DATABASE_SECRET}
EOF

cd /usr/src/concerto

# 1. Rename class definition
sed -i 's/class ReadOnly/class ReadOnlyAnnotation/g' \
  vendor/jms/serializer/src/JMS/Serializer/Annotation/ReadOnly.php

# 2. Replace ALL references safely (only whole word)
grep -rl '\bReadOnly\b' vendor/jms/serializer \
  | xargs sed -i 's/\bReadOnly\b/ReadOnlyAnnotation/g'

echo "✅ $(date) ReadOnly patch applied - Weiter mit Symfony bereitstellen"

# ✅ clean cache
rm -rf var/cache/*

# ✅ create DB if needed
php bin/console --no-debug --env=prod  doctrine:database:create || true

# ✅ setup database
php bin/console --no-debug --env=prod  concerto:setup || true

# ✅ import default content
php bin/console --no-debug --env=prod  concerto:content:import || true

rm -rf /usr/src/concerto/web/bundles
mkdir -p /usr/src/concerto/web/bundles

# 1. Symfony assets FIRST
php bin/console --no-debug --env=prod  assets:install web || true

#2. This will make files symlinks instead of copying them, which is better for development

php bin/console --env=prod assets:install web --symlink

# 3. Bower install

echo "✅ $(date) bereitstellen patch bereitgestellt- Weiter mit Javascript (Angular, Bower) installieren ,jsPlumb, concerto5 R package und R cache"
cd /usr/src/concerto/src/Concerto/PanelBundle/Resources/public/angularjs
apt-get update -y && apt-get install -y nodejs npm
npm install -g bower
bower install --allow-root || true

# ✅ IMPORTANT: move files to /web
mkdir -p /usr/src/concerto/web/bundles/concertopanel/angularjs

cp -r bower_components \
      /usr/src/concerto/web/bundles/concertopanel/angularjs/

echo "✅ Bower assets copied to web/"

##################################jsPlumb############################################
# ✅ FINAL jsPlumb FIX (create expected legacy path)

# ✅ jsPlumb (COPY FROM HOST frontend FOLDER)

BASE=/usr/src/concerto/web/bundles/concertopanel/angularjs/bower_components
JS_DIR="$BASE/jsPlumb/dist/js"


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

# 3. GO BACK TO ROOT (CRITICAL)
cd /usr/src/concerto

# 4. COPY TO BOTH BUNDLES (FINAL FIX)

SRC="/usr/src/concerto/src/Concerto/PanelBundle/Resources/public/angularjs/bower_components"
DST_BASE="/usr/src/concerto/web/bundles"

# panel (already works)
mkdir -p "$DST_BASE/concertopanel/angularjs"
cp -r "$SRC" "$DST_BASE/concertopanel/angularjs/"

# ✅ test (THIS IS THE MISSING PART)
mkdir -p "$DST_BASE/concertotest/angularjs"
cp -r "$SRC" "$DST_BASE/concertotest/angularjs/"

###############################END JAVASCRIPT ###########################################

echo "✅ $(date) javascript Bibliotec bereitgestellt- Weiter mit Concerto 5 dependencies installieren"

apt-get update && apt-get install -y \
    build-essential \
    libmariadb-dev \
    libmariadb-dev-compat \
    mariadb-client \
    libssl-dev \
    libcurl4-openssl-dev \
    libxml2-dev \
    nano
    

if ! Rscript -e "library(concerto5)" 2>/dev/null; then

  # "Cleaning R locks..."
  rm -rf /usr/local/lib/R/site-library/00LOCK*

  # "Installing R dependencies..."

  Rscript -e "
  install.packages(
    c('jsonlite','glue','vctrs','blob','hms','rjson','digest','DBI','sessioninfo'),
    repos='https://cloud.r-project.org'
  )
  " || exit 1
  #echo "dependencies OK ---- Installing R base64enc..."
  Rscript -e "if (!require(base64enc, quietly=TRUE)) install.packages('base64enc', repos='https://cloud.r-project.org')" || exit 1
  Rscript -e "library(base64enc); print('✅ base64enc OK')" || exit 1
  
  echo "✅ $(date) Concerto 5 dependencies bereitgestellt- Weiter mit RMariaDB Driver installieren"

  Rscript -e "install.packages('RMariaDB', repos='https://cloud.r-project.org')" || exit 1
  Rscript -e "library(RMariaDB)" || exit 1

  echo "✅ $(date) RMariaDB Driver bereitgestellt- Weiter mit concerto5 R package installieren"

  #"Cleaning broken concerto5..."
  rm -rf /usr/local/lib/R/site-library/concerto5

  DESC=/usr/src/concerto/src/Concerto/TestBundle/Resources/R/concerto5/DESCRIPTION
  PKG_DIR=/usr/src/concerto/src/Concerto/TestBundle/Resources/R/concerto5

  echo "Fixing DESCRIPTION..."
  if ! grep -q "sessioninfo" "$DESC"; then
    sed -i 's/sessioninfoinfo*/sessioninfo/g' "$DESC"
    sed -i 's/^Imports:.*/Imports: sessioninfo, jsonlite, DBI/' "$DESC"
    sed -i 's/^Depends:.*/Depends: R (>= 3.5.0)/' "$DESC"
    sed -i 's/\bsession\b/sessioninfo/g' "$DESC"
  fi

  echo "Fixing R source files..."
  grep -rl "library(session)" "$PKG_DIR" | xargs -r sed -i 's/library(session)/library(sessioninfo)/g' || true
  grep -rl "require(session)" "$PKG_DIR" | xargs -r sed -i 's/require(session)/require(sessioninfo)/g' || true
  grep -rl "\bsession\b" "$PKG_DIR" | xargs -r sed -i 's/\bsession\b/sessioninfo/g' || true
  echo "Installing concerto5..."
  R CMD INSTALL "$PKG_DIR" || exit 1

  Rscript -e "library(concerto5); print('✅ concerto5 installed successfully')" || exit 1

else
  echo "✅ $(date) concerto5 ist schon installiert- Weiter mit R cache erstellen"
fi

#########################END CONCERTO5 ###############################

# ✅ prepare cache folder (CRITICAL FIX)

mkdir -p /usr/src/concerto/var/r

chown -R www-data:www-data /usr/src/concerto/var
chmod -R 775 /usr/src/concerto/var

echo "✅ $(date) R cache  bereit- Weiter mit  R autocompletion cache erstellen"
# ✅ generate R autocompletion cache
echo "Building R documentation cache..."
php bin/console --no-debug --env=prod  concerto:r:cache || echo "❌ R cache failed"
php bin/console --no-debug --env=prod  concerto:content:upgrade --init-only || true
php bin/console --no-debug --env=prod  concerto:schedule:tick || true

# ✅ warmup cache
rm -rf var/cache/*
php bin/console --no-debug --env=prod  cache:warmup --env=prod || true

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

# ✅ FINAL STEP: build R autocompletion cache

php bin/console --no-debug --env=prod  concerto:r:cache || true

# ✅ start services
echo "✅  $(date) 🚀 Gut!! das Concerto5 System ist bereit Nginx,php-8.2, cron und R autocompletion cache werden gestartet, schoene Arbeit!! 🏁"

service cron start || cron
service nginx start
php-fpm -F