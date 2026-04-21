import { PartialType } from '@nestjs/swagger';
import { CreateDetalleVentaDto } from './create.detalleventa.dto';

export class UpdateDetalleVentaDto extends PartialType(CreateDetalleVentaDto) {}
