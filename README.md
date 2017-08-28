# Install node-typings
node_modules/.bin/typings install dt~node --global --save

# Build client code
npm run frontend

# Start server
npm run server

# Copy files on server
scp distr/index.js user@185.68.93.36:/var/www/html/js/index.js

# Deploy static
Just copy static files in /var/www/static

# Deploy nodejs-app
Stop nodejs-app on server. 
Pull branch origin/master. 
Npm run build-backend, npm run dev-server.

# Общая архитектура

### БД

MySql - 3 инстанса:

1. Таблица System (id заказов взятых пользователями с комиссией системы). Что бы посчитать нашу прибыль.
Таблица Users - пользователи системы.

2. Таблица Orders Shard 1 - заказы пользователей с четным ID

3. Таблица Orders Shard 2 - заказы пользователей с нечетным ID

Схема чтения - master. То есть и читаем и пишем из мастера. Сделать бы еще возможность добавления
кастомных схем. К примеру, на будущее сделать возможным добавление схемы master-slave 
при которой читаем с серверов slave, а пишем в master, который потом средствами MySql реплицируется на slave-ы.

Redis - 1 инстанс:

1. Самые новые 300 заказов.

Как синхронизировать этот кеш при отказе Redis на какое то время?
Если Redis вообще лежит - идем в MySql.

### Серверы приложений

На платформе nodejs стартуем приложение на стольки серверах сколько посчитаем нужным.
На каждом сервере будет работать PM2 который будет выступать в роли балансировщика между запущенными 
NodeJs процессами (сумарное число которых = количеству ядер на сервере).
 
### Nginx

На nginx задействован upstream в котором внесены ip всех наших серверов приложений
с nodejs-ами. И nginx задействует каждый внесенный сервер по очереди поступления запросов.

# API

### Регистрация

> host:3333/registration/

> x-www-form-urlencoded
> username: 'string'
> password: 'string'
> isCustomer: 0 or 1

### Логин

> host:3333/login

> x-www-form-urlencoded
> username: 'string'
> password: 'string'

### Логаут

> host:3333/logout

