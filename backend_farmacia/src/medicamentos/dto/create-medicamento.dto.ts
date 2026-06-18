import { ApiProperty } from '@nestjs/swagger';
import {
  IsBIC,
  IsBoolean,
  IsDefined,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMedicamentoDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo "categoria" es obligatorio.' })
  @IsInt({ message: 'El id del categoría debe ser un número entero' })
  readonly idCategoria: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo "forma_farmaceutica" es obligatorio.' })
  @IsInt({ message: 'El id de la forma farmacéutica debe ser un número entero' })
  readonly idFormaFarmaceutica: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'El id del laboratorio debe ser un número entero' })
  readonly idLaboratorio?: number;


  @ApiProperty()
  @IsNotEmpty({ message: 'El campo "nombre" es obligatorio.' })
  @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
  @MaxLength(80, {
    message: 'El campo "nombre" no puede exceder los 80 caracteres.',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsString({ message: 'El campo "descripcion" debe ser una cadena de texto.' })
  @MaxLength(200, {
    message: 'El campo "descripcion" no puede exceder los 200 caracteres.',
  })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo "concentracion" es obligatorio.' })
  @IsString({
    message: 'El campo "concentracion" debe ser una cadena de texto.',
  })
  @MaxLength(50, {
    message: 'El campo "concentracion" no puede exceder los 50 caracteres.',
  })
  readonly concentracion: string;

  @ApiProperty()
  @IsBoolean({ message: 'El campo "receta" debe ser un valor booleano.' })
  @IsDefined({ message: 'El campo "receta" es obligatorio.' })
  readonly receta: boolean;

  @ApiProperty()
  @IsDefined({ message: 'El campo "precio" es obligatorio.' })
  readonly precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La fotografia es requerido' })
  @IsString({ message: 'La fotografia debe ser una cadena de texto' })
  @MaxLength(2000, {
    message: 'La fotografia no puede tener más de 2000 caracteres',
  })
  readonly fotografia: string;
}
