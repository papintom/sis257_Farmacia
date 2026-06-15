import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class CreateFormasFarmaceuticaDto {
      
      @ApiProperty()
      @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
      @IsDefined({ message: 'El campo "nombre" es obligatorio.' })
      readonly nombre: string;
}
