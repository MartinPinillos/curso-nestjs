import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,

  ],
  //Se coemntan los controladores y servicios de usuarios porque ya se importan a través del módulo de usuarios
  // controllers: [UsersController],
  // providers: [UsersService],
})
export class AppModule {}
