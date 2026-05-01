import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty({ description: 'Nombre de la categoría', example: 'Medicamentos' })
    @IsNotEmpty({ message: 'El campo "nombre" es obligatorio.' })
    @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
    @MaxLength(100, { message: 'El campo "nombre" no puede exceder los 100 caracteres.' })
    readonly nombre: string;

    @ApiProperty({ description: 'Descripción de la categoría', example: 'Categoría para medicamentos' })
    @IsString({ message: 'El campo "descripcion" debe ser una cadena de texto.' })
    readonly descripcion: string;
    
}
