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
