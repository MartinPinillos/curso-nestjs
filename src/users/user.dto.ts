import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateNested } from 'class-validator';

//Aca van solo las validaciones de datos que reciben los endpoints, no hay logica de negocio.

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsOptional()
  avatar!: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile!: CreateProfileDto;
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
