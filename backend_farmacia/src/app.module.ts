import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicamentoModule } from './medicamentos/medicamentos.module';
import { ClienteModule } from './clientes/clientes.module';
import { UsuarioModule } from './usuarios/usuarios.module';
import { VentaModule } from './ventas/ventas.module';
import { DetalleVentaModule } from './detalle-ventas/detalleventas.module';
import { CategoriaModule } from './categorias/categorias.module';
import { ConfigModule } from '@nestjs/config';
import { LotesModule } from './lotes/lotes.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './ventas/dashboard.module';
import { FormasFarmaceuticasModule } from './formas-farmaceuticas/formas-farmaceuticas.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MedicamentoModule,
    ClienteModule,
    UsuarioModule,
    VentaModule,
    DetalleVentaModule,
    CategoriaModule,
    LotesModule,
    ProveedoresModule,
    AuthModule,
    DashboardModule,
    FormasFarmaceuticasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
