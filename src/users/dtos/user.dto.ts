import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, MinLength, ValidateNested, IsOptional } from 'class-validator';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

//Aca van solo las validaciones de datos que reciben los endpoints, no hay logica de negocio.


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  //Validacion en cascada para el profile, porque el user tiene un profile asociado. Entonces cuando se crea un user, se crea su profile asociado.
  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile!: CreateProfileDto;
}

export class CreateUserWithoutProfileDto extends OmitType(CreateUserDto, ['profile']) {}

export class UpdateUserDto extends PartialType(CreateUserWithoutProfileDto) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile!: UpdateProfileDto;
}
