FROM php:8.2-fpm

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

COPY . /usr/src/concerto/

WORKDIR /usr/src/concerto

COPY build/php.ini /usr/local/etc/php/php.ini
COPY build/nginx/nginx.conf /etc/nginx/nginx.conf
COPY build/nginx/concerto.conf /etc/nginx/sites-available/concerto.conf

RUN chmod +x /usr/src/concerto/bin/console \
 && rm -f /etc/nginx/sites-enabled/default \
 && ln -s /etc/nginx/sites-available/concerto.conf /etc/nginx/sites-enabled/concerto.conf

 RUN mkdir -p /usr/src/concerto/var/cache /usr/src/concerto/var/logs \
 && chown -R www-data:www-data /usr/src/concerto/var \
 && chmod -R 775 /usr/src/concerto/var

EXPOSE 80

CMD ["sh", "-c", "service nginx start && php-fpm -F"]