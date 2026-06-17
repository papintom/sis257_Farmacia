import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLaboratorioDto {
  @ApiProperty({
    description: 'Nombre del laboratorio o fabricante',
    example: 'Bayer',
  })
  @IsNotEmpty({ message: 'El campo "nombre" es obligatorio.' })
  @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
  @MaxLength(100, {
    message: 'El campo "nombre" no puede exceder los 100 caracteres.',
  })
  readonly nombre: string;

  @ApiProperty({
    description: 'Descripción del laboratorio',
    example: 'Laboratorio farmacéutico multinacional',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El campo "descripcion" debe ser una cadena de texto.' })
  @MaxLength(200, {
    message: 'El campo "descripcion" no puede exceder los 200 caracteres.',
  })
  readonly descripcion?: string;

  @ApiProperty({
    description: 'Dirección física del laboratorio',
    example: 'Av. Siempre Viva 742',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El campo "direccion" debe ser una cadena de texto.' })
  @MaxLength(255, {
    message: 'El campo "direccion" no puede exceder los 255 caracteres.',
  })
  readonly direccion?: string;

  @ApiProperty({
    description: 'Teléfono de contacto del laboratorio',
    example: '+591-4-1234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El campo "telefono" debe ser una cadena de texto.' })
  @MaxLength(20, {
    message: 'El campo "telefono" no puede exceder los 20 caracteres.',
  })
  readonly telefono?: string;
}
