# 🎫 Система бронирования событий

Проект для управления событиями и бронированием мест. Тестовое задание

**Production URL:** https://booking-test-task-okeygers-projects.vercel.app

## 🚀 Технологический стек

- **Backend Framework:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Containerization:** Docker + Docker Compose
- **API Documentation:** Scalar OpenAPI
- **Deployment:** Vercel

## 📊 Схема базы данных
<img width="400" alt="80eade6e-77a3-4e57-a559-2bb20f36b360" src="https://github.com/user-attachments/assets/4d3f16d7-dec9-4c53-b1fe-6c8cc8bb98fb" />

## 📚 API Документация

Полная документация API доступна через Scalar OpenAPI:
**🔗 [OpenAPI Documentation](https://booking-test-task-okeygers-projects.vercel.app/openapi)**

<img width="1919" height="987" alt="scalar-documentation" src="https://github.com/user-attachments/assets/fb8d1197-1a70-4e86-b84d-02e25450bc9a" />

## 🛠 Локальная разработка

### Предварительные требования

- Node.js 18+
- Docker и Docker Compose
- npm или yarn

### 1. Клонирование репозитория

```bash
git clone <your-repo-url>
cd booking-test-task
```

### 2. Настройка окружения

Создайте файл `.env` в корне проекта: (Для примера есть файл .env.example)

### 3. Запуск базы данных

```bash
# Запуск PostgreSQL в Docker
docker-compose up -d
```

### 4. Установка зависимостей

```bash
npm install
```

### 5. Настройка базы данных

```bash
# Генерация Prisma клиента
npx prisma generate

# Применение миграций
npx prisma db push

# Или создание миграции
npx prisma migrate dev --name init
```

### 6. Запуск приложения

```bash
# Разработка с hot-reload
npm run start:dev

# Или production сборка
npm run build
npm run start:prod
```

Приложение будет доступно по адресу: `http://localhost:3000`

## 📖 Доступные эндпоинты

### Документация
- `GET /openapi` - Scalar OpenAPI документация

### Пользователи
- `GET /api/users` - Получить всех пользователей
- `GET /api/users/:id` - Получить пользователя по ID
- `POST /api/users` - Создать нового пользователя

### События
- `GET /api/events` - Получить все события
- `GET /api/events/:id` - Получить событие по ID
- `POST /api/events` - Создать новое событие

### Бронирования
- `POST /api/bookings/reserve` - Забронировать место
- `POST /api/bookings/cancel` - Отменить бронирование

## 🐳 Docker Compose

Проект включает `docker-compose.yml` для легкого развертывания:

```bash
# Запуск всей инфраструктуры
docker-compose up -d

# Остановка
docker-compose down
```

## 🧪 Тестирование API

Вы можете тестировать API напрямую через Scalar документацию:

1. Откройте https://booking-test-task-okeygers-projects.vercel.app/openapi
2. Используйте встроенный клиент для отправки запросов
3. Все эндпоинты готовы к тестированию

## 📝 Примеры использования

### Создание пользователя
```json
POST /api/users
{
  "name": "Иван Иванов",
  "email": "ivan@example.com"
}
```

### Создание события
```json
POST /api/events
{
  "name": "Концерт Rock Band",
  "totalSeats": 100
}
```

### Бронирование места
```json
POST /api/bookings/reserve
{
  "eventId": 1,
  "userId": 1
}
```

## 🔧 Скрипты

- `npm run start` - Запуск приложения
- `npm run start:dev` - Запуск в режиме разработки
- `npm run build` - Сборка проекта
- `npm run test` - Запуск тестов
- `npx prisma studio` - GUI для базы данных

## 🚀 Деплой

Проект автоматически деплоится на Vercel при пуше в ветку `main`.
