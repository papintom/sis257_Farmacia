import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { Lote } from './entities/lote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LotesService {
  constructor(
    @InjectRepository(Lote) private loteRepository: Repository<Lote>,
  ) {}
  async create(createLoteDto: CreateLoteDto): Promise<Lote> {
    let lote = await this.loteRepository.findOne({
      where: { fechaVencimiento: createLoteDto.fechaVencimiento },
    });

    if (lote) throw new ConflictException('El lote ya existe');

    lote = new Lote();

    lote.idMedicamento = createLoteDto.idMedicamento;
    lote.idProveedor = createLoteDto.idProveedor;
    lote.stock = createLoteDto.stock;
   
    lote.fechaVencimiento = createLoteDto.fechaVencimiento;

    lote.medicamento = { id: createLoteDto.idMedicamento } as any;
    lote.proveedor = { id: createLoteDto.idProveedor } as any;



    //crear lotes automatico 
   const cantidadLotes = await this.loteRepository.count();

const fecha = new Date();

const anio = fecha.getFullYear();
const mes = String(fecha.getMonth() + 1).padStart(2, '0');
const dia = String(fecha.getDate()).padStart(2, '0');

lote.codigo = `LOT-${anio}${mes}${dia}-${String(
  cantidadLotes + 1,
).padStart(3, '0')}`;


//no crea con fecha vencida
    const DIAS_MINIMOS_VIGENCIA = 30;

const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

const fechaVencimiento = new Date(
  createLoteDto.fechaVencimiento,
);

fechaVencimiento.setHours(0, 0, 0, 0);

const fechaMinima = new Date(hoy);

fechaMinima.setDate(
  fechaMinima.getDate() + DIAS_MINIMOS_VIGENCIA,
);

if (fechaVencimiento < fechaMinima) {
  throw new BadRequestException(
    `El lote debe tener al menos ${DIAS_MINIMOS_VIGENCIA} días de vigencia.`,
  );
}

    return this.loteRepository.save(lote);
  }
  async findAll(): Promise<Lote[]> {
    return this.loteRepository.find({
      order: { id: 'ASC' },
      relations: ['medicamento', 'proveedor'],
    });
  }

  async findOne(id: number): Promise<Lote> {
    const lote = await this.loteRepository.findOne({
      where: { id },
      relations: ['medicamento', 'proveedor'],
    });

    if (!lote) {
      throw new NotFoundException(`Lote con id ${id} no encontrado`);
    }

    return lote;
  }

  async update(id: number, updateLoteDto: UpdateLoteDto): Promise<Lote> {
  const lote = await this.findOne(id);

  if (updateLoteDto.fechaVencimiento) {
    const DIAS_MINIMOS_VIGENCIA = 30;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaVencimiento = new Date(updateLoteDto.fechaVencimiento);
    fechaVencimiento.setHours(0, 0, 0, 0);

    const fechaMinima = new Date(hoy);
    fechaMinima.setDate(
      fechaMinima.getDate() + DIAS_MINIMOS_VIGENCIA,
    );

    if (fechaVencimiento < fechaMinima) {
      throw new BadRequestException(
        `El lote debe tener al menos ${DIAS_MINIMOS_VIGENCIA} días de vigencia.`,
      );
    }
  }

  Object.assign(lote, updateLoteDto);

  return this.loteRepository.save(lote);
}
  async remove(id: number): Promise<Lote> {
    const lote = await this.findOne(id);
    return this.loteRepository.softRemove(lote);
  }

// obtener codigo y se muestra al crear
async obtenerSiguienteCodigo() {
  const cantidadLotes = await this.loteRepository.count();

  const fecha = new Date();

  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');

  return {
    codigo: `LOT-${anio}${mes}${dia}-${String(
      cantidadLotes + 1,
    ).padStart(3, '0')}`,
  };
}


}



