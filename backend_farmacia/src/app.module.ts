import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicamentoModule } from './medicamento/medicamento.module';
import { ClienteModule } from './cliente/cliente.module';
import { UsuarioModule } from './usuario/usuario.module';
import { VentaModule } from './venta/venta.module';
import { DetalleVentaModule } from './detalle-venta/detalleventa.module';
import { CategoríaModule } from './categoría/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'sis257_farmacia',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MedicamentoModule,
    ClienteModule,
    UsuarioModule,
    VentaModule,
    DetalleVentaModule,
    CategoríaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}