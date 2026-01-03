FROM php:8.2-apache

RUN sed -i '/LoadModule mpm_event_module/d' /etc/apache2/mods-available/mpm_event.load 2>/dev/null || true \
    && sed -i '/LoadModule mpm_worker_module/d' /etc/apache2/mods-available/mpm_worker.load 2>/dev/null || true \
    && rm -f /etc/apache2/mods-enabled/mpm_* \
    && ln -sf /etc/apache2/mods-available/mpm_prefork.load /etc/apache2/mods-enabled/mpm_prefork.load \
    && ln -sf /etc/apache2/mods-available/mpm_prefork.conf /etc/apache2/mods-enabled/mpm_prefork.conf

RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY ./src /var/www/html/
RUN chown -R www-data:www-data /var/www/html
EXPOSE 80