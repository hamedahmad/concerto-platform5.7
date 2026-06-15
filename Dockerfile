FROM php:8.2-fpm

MAINTAINER Hamed Ahmad <hamed.ahmad@agmail.com>

ARG CRAN_MIRROR=https://cloud.r-project.org/

RUN apt-get update -y && apt-get install -y \
    cron \
    curl \
    git \
    libcurl4-openssl-dev \
    libmariadb-dev \
    libxml2-dev \
    libssl-dev \
    locales \
    default-mysql-client \
    nginx \
    r-base \
    r-base-dev \
    unzip \
    wget \
    zip \
 && sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
 && locale-gen "en_US.UTF-8" \
 && docker-php-ext-install \
    pdo \
    pdo_mysql \
    sockets \
    xml \
    zip


COPY . /usr/src/concerto/

# install composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /usr/src/concerto

# install dependencies (already defined in composer.json)
RUN composer install --no-interaction --prefer-dist --no-scripts


COPY build/php.ini /usr/local/etc/php/php.ini
COPY build/nginx/nginx.conf /etc/nginx/nginx.conf
COPY build/nginx/concerto.conf /etc/nginx/sites-available/concerto.conf

RUN chmod +x /usr/src/concerto/bin/console \
 && rm -f /etc/nginx/sites-enabled/default \
 && ln -s /etc/nginx/sites-available/concerto.conf /etc/nginx/sites-enabled/concerto.conf

EXPOSE 80

WORKDIR /usr/src/concerto

CMD rm -rf var/cache/* \
 && php bin/console concerto:setup || true \
 && php bin/console concerto:r:cache || true \
 && php bin/console cache:warmup --env=prod || true \
 && chown -R www-data:www-data var \
 && service nginx start \
 && cron \
 && php-fpm -F
