import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, MaxLength } from "class-validator";

export class CreateClienteDto {
    @ApiProperty({ description: 'Cédula de identidad del cliente', example: '12345678' })
    @IsNotEmpty({ message: 'El campo "ci" es obligatorio.' })
    @MaxLength(20, { message: 'El campo "ci" no puede exceder los 20 caracteres.' })
    readonly ci: string;

    @ApiProperty({ description: 'Nombre del cliente', example: 'Juan' })
    @IsNotEmpty({ message: 'El campo "nombre" es obligatorio.' })
    @MaxLength(100, { message: 'El campo "nombre" no puede exceder los 100 caracteres.' })
    readonly nombre: string;

    @ApiProperty({ description: 'Apellido del cliente', example: 'Pérez' })
    @IsNotEmpty({ message: 'El campo "apellido" es obligatorio.' })
    @MaxLength(100, { message: 'El campo "apellido" no puede exceder los 100 caracteres.' })
    readonly apellido: string;

    @ApiProperty({ description: 'Teléfono del cliente', example: '77777777' })
    @MaxLength(20, { message: 'El campo "telefono" no puede exceder los 20 caracteres.' })
    readonly telefono: string;

    @ApiProperty({ description: 'Dirección del cliente', example: 'Calle Principal, Ciudad' })
    readonly direccion: string;
}
