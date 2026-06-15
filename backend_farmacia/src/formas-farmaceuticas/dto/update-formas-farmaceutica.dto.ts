import { PartialType } from '@nestjs/swagger';
import { CreateFormasFarmaceuticaDto } from './create-formas-farmaceutica.dto';

export class UpdateFormasFarmaceuticaDto extends PartialType(CreateFormasFarmaceuticaDto) {}
