FROM php:8.2-apache

RUN rm -f /etc/apache2/mods-enabled/mpm_*.conf /etc/apache2/mods-enabled/mpm_*.load \
    && rm -f /etc/apache2/mods-available/mpm_event.conf /etc/apache2/mods-available/mpm_event.load \
    && rm -f /etc/apache2/mods-available/mpm_worker.conf /etc/apache2/mods-available/mpm_worker.load \
    && a2enmod mpm_prefork

RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY ./src /var/www/html/
RUN chown -R www-data:www-data /var/www/html
EXPOSE 80