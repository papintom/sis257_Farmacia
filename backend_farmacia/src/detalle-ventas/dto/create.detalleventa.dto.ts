import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt } from "class-validator";

export class CreateDetalleVentaDto {
    @ApiProperty()
    @IsInt({ message: 'El campo "cantidad" debe ser un número entero.' })
    @IsDefined({ message: 'El campo "idVenta" es obligatorio.' })
    readonly idVenta: number;

    @ApiProperty()
    @IsInt({ message: 'El campo "loteId" debe ser un número entero.' })
    @IsDefined({ message: 'El campo "loteId" es obligatorio.' })
    readonly idLote: number;

    @ApiProperty()
    @IsInt({ message: 'El campo "cantidad" debe ser un número entero.' })
    @IsDefined({ message: 'El campo "cantidad" es obligatorio.' })
    readonly cantidad: number;

    @ApiProperty()
    @IsInt({ message: 'El campo "precioUnitario" debe ser un número entero.' })
    @IsDefined({ message: 'El campo "precioUnitario" es obligatorio.' })
    readonly precioUnitario: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo "subtotal" es obligatorio.' })
    readonly subtotal: number;

}
