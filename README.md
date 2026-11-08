# Task Manager

Веб-приложение для создания и управления задачами.

## Используемые технологии

- Ubuntu
- Docker
- Docker Compose
- Nginx
- Python Flask
- PostgreSQL
- Ansible
- Git

## Структура проекта

- frontend — пользовательский интерфейс.
- backend — серверная часть приложения.
- database — инициализация базы данных.
- nginx — настройки обратного прокси.
- ansible — автоматизация развёртывания.
- security — описание мер безопасности.
- docker-compose.yml — конфигурация Docker Compose.
- .env — переменные окружения (не включается в Git).

## Работа приложения

Пользователь открывает приложение через Nginx.

Nginx направляет запросы к Frontend и Backend. Backend взаимодействует с PostgreSQL.

## Функциональность

1. Просмотр списка задач.
2. Добавление новых задач.
3. Удаление задач.
4. Хранение задач в PostgreSQL.
5. Сохранение данных при перезапуске контейнеров.

## Запуск

### 1. Настройка переменных окружения

В корневой папке проекта создайте файл .env:

DB_PASSWORD=$(openssl rand -hex 24)

cat > .env <<EOF
POSTGRES_DB=tasks_db
POSTGRES_USER=app_user
POSTGRES_PASSWORD=$DB_PASSWORD

DB_HOST=database
DB_PORT=5432
BACKEND_PORT=5000
EOF

chmod 600 .env

### 2. Запуск через Docker Compose

docker compose up -d --build


### 3. Запуск через Ansible

ansible-playbook -i ansible/inventory.ini ansible/deploy.yml

### 4. Проверка работы

Проверить состояние контейнеров:
docker compose ps

Проверить доступность API:

curl http://localhost/api/health

Открыть приложение в браузере:

http://localhost:8080

## Дополнительная информация

Описание реализованных мер безопасности находится в файле security/README.md.
