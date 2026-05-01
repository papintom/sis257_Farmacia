import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMedicamentoDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo "categoria" es obligatorio.' })
  @IsInt({ message: 'El id del categoría debe ser un número entero' })
  readonly idCategoria: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo "nombre" es obligatorio.' })
  @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
  @MaxLength(80, {
    message: 'El campo "nombre" no puede exceder los 80 caracteres.',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsString({ message: 'El campo "descripcion" debe ser una cadena de texto.' })
  @MaxLength(200, {message: 'El campo "descripcion" no puede exceder los 200 caracteres.'})
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo "concentracion" es obligatorio.' })
  @IsString({ message: 'El campo "concentracion" debe ser una cadena de texto.'})
  @MaxLength(50, { message: 'El campo "concentracion" no puede exceder los 50 caracteres.'})
  readonly concentracion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo "forma" es obligatorio.' })
  @IsString({ message: 'El campo "forma" debe ser una cadena de texto.'})
  @MaxLength(20, { message: 'El campo "forma" no puede exceder los 20 caracteres.'})
  readonly forma: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo "precio" es obligatorio.' })
  readonly precio: number;

}
