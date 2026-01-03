FROM php:8.2-apache

# Disable all MPM modules first, then enable only prefork
RUN a2dismod mpm_event || true && \
    a2dismod mpm_worker || true && \
    a2dismod mpm_prefork || true && \
    a2enmod mpm_prefork && \
    apache2ctl configtest

RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY ./src /var/www/html/
RUN chown -R www-data:www-data /var/www/html
EXPOSE 80