import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTipoRecetaDto {
  @ApiProperty({
    description: 'Nombre del tipo de receta',
    example: 'Venta Libre',
  })
  @IsNotEmpty({ message: 'El campo "nombre" es obligatorio.' })
  @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
  @MaxLength(100, {
    message: 'El campo "nombre" no puede exceder los 100 caracteres.',
  })
  readonly nombre: string;

  @ApiProperty({
    description: 'Descripción del tipo de receta',
    example: 'No requiere receta médica para su venta',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El campo "descripcion" debe ser una cadena de texto.' })
  @MaxLength(200, {
    message: 'El campo "descripcion" no puede exceder los 200 caracteres.',
  })
  readonly descripcion?: string;

  @ApiProperty({
    description: 'Indica si el medicamento requiere autorización especial o firma autorizada',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo "requiereAutorizacion" debe ser un booleano.' })
  readonly requiereAutorizacion?: boolean;
}
