FROM php:8.0-fpm

LABEL maintainer="Hamed Ahmad <hamed.ahmad@agmail.com>"

RUN apt-get update -y && apt-get install -y \
    cron \
    curl \
    git \
    pkg-config \
    libzip-dev \
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


# copy composer files first
COPY composer.json composer.lock /usr/src/concerto/

WORKDIR /usr/src/concerto

# install composer binary
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# install dependencies WITHOUT autoload
RUN composer install --no-dev --no-scripts --no-interaction --no-autoloader

# now copy full project
COPY . /usr/src/concerto/

# generate autoload AFTER files exist
RUN composer dump-autoload --optimize

COPY build/php.ini /usr/local/etc/php/php.ini
COPY build/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker-compose/concerto/nginx/sites/concerto.conf /etc/nginx/sites-available/concerto.conf

RUN echo "opcache.enable=0" >> /usr/local/etc/php/conf.d/opcache.ini \
 && echo "opcache.enable_cli=0" >> /usr/local/etc/php/conf.d/opcache.ini \
 && echo "opcache.validate_timestamps=1" >> /usr/local/etc/php/conf.d/opcache.ini \
 && echo "opcache.revalidate_freq=0" >> /usr/local/etc/php/conf.d/opcache.ini

RUN chmod +x /usr/src/concerto/bin/console \
 && rm -f /etc/nginx/sites-enabled/default \
 && ln -s /etc/nginx/sites-available/concerto.conf /etc/nginx/sites-enabled/concerto.conf

 RUN mkdir -p /usr/src/concerto/var/cache /usr/src/concerto/var/logs \
 && chown -R www-data:www-data /usr/src/concerto/var \
 && chmod -R 775 /usr/src/concerto/var
EXPOSE 80

COPY startup.sh /usr/src/concerto/startup.sh

RUN chmod +x /usr/src/concerto/startup.sh

WORKDIR /usr/src/concerto

CMD ["/usr/src/concerto/startup.sh"]
