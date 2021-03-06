# Дальше можно не читать

Тут я пробовал участвовать в конкурсе от ВК, но по итогу выяснилось что nodejs не канает.
Front, redis, конфигурации серверов доделывать уже не стал. Получилось, что получилось.

# Install node-typings
node_modules/.bin/typings install dt~node --global --save

# Build client code
npm run frontend

# Start server
DB_USER=system_username DB_PASSWORD=user_password npm run server

# Deploy nodejs-app
Stop nodejs-app on server. 
Pull branch origin/master. 
Npm run build-backend, npm run dev-server.

# Общая архитектура

## БД

### MySql - 3 инстанса:

1. Таблица System (id заказов взятых пользователями с комиссией системы). Что бы посчитать нашу прибыль.
Таблица Users - пользователи системы.

2. Таблица Orders Shard 1 - заказы пользователей с четным ID

3. Таблица Orders Shard 2 - заказы пользователей с нечетным ID

Схема чтения - master. То есть и читаем и пишем из мастера. Сделать бы еще возможность добавления
кастомных схем. К примеру, на будущее сделать возможным добавление схемы master-slave 
при которой читаем с серверов slave, а пишем в master, который потом средствами MySql реплицируется на slave-ы.

### Redis - 1 инстанс:

Добавлять новые заказы сначала в redis, потом в mysql. Пробовать получить сначала из redis, если нет, то с mysql. 
В redis записывать только при добавлении. Ограничить количество записей в нем до 300 - 400 для начала (задавать число в конфиге).
В общем в главную ленту 300 - 400 заказов будут браться быстро из redis, остальные (если пользователь добрался до них) пусть берутся из mysql. 
 

### Серверы приложений

На платформе nodejs стартуем приложение на стольки серверах сколько посчитаем нужным.
На каждом сервере будет работать PM2 который будет выступать в роли балансировщика между запущенными 
NodeJs процессами (сумарное число которых = количеству ядер на сервере).
 
### Nginx

На nginx задействован upstream в котором внесены ip всех наших серверов приложений
с nodejs-ами. И nginx задействует каждый внесенный сервер по очереди поступления запросов.

# API

### Регистрация POST

> host:3333/registration/

> x-www-form-urlencoded <br />
> username: 'string' <br />
> password: 'string' <br />
> isCustomer: 0 or 1

### Логин POST

> host:3333/login

> x-www-form-urlencoded <br />
> username: 'string' <br />
> password: 'string' <br />

### Логаут GET

> host:3333/logout

### Информация пользователя GET

> host:3333/api/user

### Разместить заказ POST

> host:3333/api/order

> x-www-form-urlencoded <br />
> amount: 'number' <br />
> headText: 'string' <br />
> text: 'string' <br />

### Получить заказы GET

> host:3333/api/orders?offset=0&limit=3

### Получить заказы добавленные мной GET

> host:3333/api/myorders?offset=0&limit=5

### Получить определенный заказ по user_id и order_id GET

> host:3333/api/order?user_id=111&order_id=10

### Взять заказ в исполнение POST

> host:3333/api/execorder

> x-www-form-urlencoded <br />
> order_id: 'number' <br />
> customer_id: 'number' <br />