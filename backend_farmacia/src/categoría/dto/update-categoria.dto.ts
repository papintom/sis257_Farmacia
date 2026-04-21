import { PartialType } from '@nestjs/swagger';
import { CreateCategoríaDto } from './create-categoria.dto';

export class UpdateCategoríaDto extends PartialType(CreateCategoríaDto) {}
