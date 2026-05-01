import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class CreateProveedorDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo "nombre" es obligatorio.' })
    @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El campo "nombre" no puede exceder los 50 caracteres.' })
    readonly nombre: string;
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo "telefono" es obligatorio.' })
    @IsString({ message: 'El campo "telefono" debe ser una cadena de texto.' })
    @MaxLength(20, { message: 'El campo "telefono" no puede exceder los 20 caracteres.' })
    readonly telefono: string;
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo "direccion" es obligatorio.' })
    @IsString({ message: 'El campo "direccion" debe ser una cadena de texto.' })
    @MaxLength(100, { message: 'El campo "direccion" no puede exceder los 100 caracteres.' })
    readonly direccion: string;
}
