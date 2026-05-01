import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsIn, IsInt } from "class-validator";

export class CreateVentaDto {
    @ApiProperty()
    @IsDefined({ message: 'El campo "id_usuario" es obligatorio.' })
    @IsInt({ message: 'El campo "id_usuario" debe ser un número entero.' })
    readonly idUsuario: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo "id_cliente" es obligatorio.' })
    @IsInt({ message: 'El campo "id_cliente" debe ser un número entero.' })
    readonly idCliente: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo "fecha" es obligatorio.' })
    @IsDateString({},{ message: 'El campo "fecha" debe ser una fecha válida.' })
    readonly fecha: Date;

    @ApiProperty()
    @IsDefined({ message: 'El campo "total" es obligatorio.' })
    readonly total: number;




}
