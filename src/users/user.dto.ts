import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

//Aca van solo las validaciones de datos que reciben los endpoints, no hay logica de negocio.

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsEmail()
  @IsOptional()
  email!: string;
}
