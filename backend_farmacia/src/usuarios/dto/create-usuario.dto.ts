import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo "nombre" es obligatorio.' })
    @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El campo "nombre" no puede exceder los 50 caracteres.' })
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo "apellido" es obligatorio.' })
    @IsString({ message: 'El campo "apellido" debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El campo "apellido" no puede exceder los 50 caracteres.' })
    readonly apellido: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo "correo" es obligatorio.' })
    @IsString({ message: 'El campo "correo" debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El campo "correo" no puede exceder los 100 caracteres.' })
    readonly correo: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo "password" es obligatorio.' })
    @IsString({ message: 'El campo "password" debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El campo "password" no puede exceder los 100 caracteres.' })
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo "rol" es obligatorio.' })
    @IsString({ message: 'El campo "rol" debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El campo "rol" no puede exceder los 50 caracteres.' })
    readonly rol: string;




}
