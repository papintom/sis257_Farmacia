import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsInt, IsNotEmpty } from 'class-validator';

export class CreateLoteDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo "medicamentoId" es obligatorio.' })
  @IsInt({ message: 'El campo "medicamentoId" debe ser un número entero.' })
  readonly idMedicamento: number;
  @ApiProperty()
  @IsInt({ message: 'El campo "idProveedor" debe ser un número entero.' })
  @IsDefined({ message: 'El campo "idProveedor" es obligatorio.' })
  readonly idProveedor: number;

  @ApiProperty()
  @IsInt({ message: 'El campo "stock" debe ser un número entero.' })
  @IsNotEmpty({ message: 'El campo "stock" es obligatorio.' })
  readonly stock: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo "fechaVencimiento" es obligatorio.' })
  readonly fechaVencimiento: Date;
}
