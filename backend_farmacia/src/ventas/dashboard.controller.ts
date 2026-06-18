import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  

  @Get('totals')
  @ApiOperation({ summary: 'Obtener el total de registros de las entidades principales' })
  getTotals() {
    return this.dashboardService.getTotals();
  }

@Get('stock-bajo')
stockBajo() {
  return this.dashboardService.stockBajo();
}

@Get('proximos-vencer')
proximosVencer() {
  return this.dashboardService.proximosVencer();
}
@Get('lotes-vencidos')
lotesVencidos() {
  return this.dashboardService.lotesVencidos();
}

}