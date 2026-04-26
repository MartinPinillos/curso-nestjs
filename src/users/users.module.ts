import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], //Si otro servicio necesita funcionalidades de userService, se exporta para que pueda ser utilizado en otros módulos
})
export class UsersModule {}
