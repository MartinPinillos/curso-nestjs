# Comandos de instalacion de paquetes

-Para instalar
npm i -g @nestjs/cli

Para instalar clase Validation
npm i --save class-validator class-transformer

Para instalar paquete de configuracion de variables de entorno
npm i --save @nestjs/config

Para instalar el ORM TypeORM para la base Postgres
npm install --save @nestjs/typeorm typeorm pg

Para instalar Mapped para usar PartialTypes
npm i @nestjs/mapped-types --save

Para instalar libreria de encriptado
npm i bcrypt
npm i -D @types/bcrypt


# Comandos de Migracion

Para generar archivo de migracions, el init deberia reemplazarse por numero de tarea.
npm run migrations:generate ./src/database/migrations/init

Para ver migraciones implementadas
npm run migrations:show

Para correr migraciones disponibles
npm run migrations:run

Para crear una migracion manualmente y poner scripts alli
npm run migrations:create ./src/database/migrations/change-varchar



[GET] http://localhost:3000/

Hello world

[GET] http://localhost:3000/users > Return all users (200)

[GET] http://localhost:3000/users/:id > Return user with id (200)

[POST] http://localhost:3000/users > Return the user created (201)

[PUT] http://localhost:3000/user/:id > Return the user updated (200)

[DELETE] http://localhost:3000/users/:id > Return status user deleted (200)


# Docker

docker compose up -d # Start the services in the background
docker compose down # Stop the services
docker compose down -v # Stop the services and remove the volumes
docker compose ps # List the services

# Prompt

Basado en @posts.service.ts y en @posts.controller.ts crea el CRUD para las categorias dentro del modulo @posts.module.ts esta es la estructura:

.
├── controllers
│   ├── posts.controller.spec.ts
│   └── posts.controller.ts
├── dto
│   ├── create-post.dto.ts
│   └── update-post.dto.ts
├── entities
│   ├── category.entity.ts
│   └── post.entity.ts
├── posts.module.ts
└── services
    ├── posts.service.spec.ts
    └── posts.service.ts
