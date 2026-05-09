import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  content!: string;

  @IsString()
  @IsOptional()
  coverImage!: string;

  @IsString()
  @IsOptional()
  summary!: string;

  //Obtengo el userId del token, no lo envio en el body.
  // @IsNumber()
  // @IsNotEmpty()
  // userId!: number;

  @IsArray()
  @IsNumber({}, { each: true })//valida si es numero cada elemento del array.
  @IsOptional()
  categoryIds!: number[];
}
