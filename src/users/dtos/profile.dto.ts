import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar!: string;
}

//Creo el Dto de Update basado en las propiedades del Create. Pero las validaciones van a ser opcionales.
export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
