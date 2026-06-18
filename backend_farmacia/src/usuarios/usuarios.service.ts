import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    let usuario = await this.usuarioRepository.findOneBy({
      correo: createUsuarioDto.correo.trim(),
    });

    if (usuario) {
      throw new ConflictException('El usuario ya existe');
    }

    usuario = new Usuario();
    Object.assign(usuario, createUsuarioDto);

    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return usuario;
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ correo });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.softRemove(usuario);
  }

  async validate(correo: string, clave: string): Promise<Usuario> {
    const usuarioOk = await this.usuarioRepository.findOne({
      where: { correo },
      select: ['id', 'nombre','apellido' ,'password', 'correo', 'rol'],
    });

    if (!usuarioOk) throw new NotFoundException('Usuario inexistente');

    if (!(await usuarioOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    usuarioOk.password = '';
    return usuarioOk;
  }
}
