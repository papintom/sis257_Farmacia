import { PartialType } from '@nestjs/swagger';
import { CreateTipoRecetaDto } from './create-tipo-receta.dto';

export class UpdateTipoRecetaDto extends PartialType(CreateTipoRecetaDto) {}
