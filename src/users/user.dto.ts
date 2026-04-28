import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

//Aca van solo las validaciones de datos que reciben los endpoints, no hay logica de negocio.

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(8)
  password!: string;

  @IsEmail()
  @IsOptional()
  email!: string;
}
