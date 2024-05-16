import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SoutenanceService } from './soutenance.service';
import { Soutenance } from 'src/model/soutenance.model';
import { AdminGuard, JwtGuard } from 'src/auth/guard';

UseGuards(JwtGuard);
@Controller('soutenance')
export class SoutenanceController {
  constructor(private readonly soutenanceService: SoutenanceService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllSoutenances(): Promise<Soutenance[]> {
    return this.soutenanceService.getAllSoutenances();
  }

  @Get(':id')
  async getSoutenanceById(@Param('id') id: string): Promise<Soutenance> {
    return this.soutenanceService.getSoutenanceById(id);
  }

  @Post()
  async createSoutenance(@Body('rapport') rapport: string) {
    const soutenance = await this.soutenanceService.createSoutenance(rapport);
    return { soutenance };
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async editSoutenance(
    @Param('id') id: string,
    @Body() data: Partial<Soutenance>,
  ) {
    const soutenance = await this.soutenanceService.editSoutenance(id, data);
    return { soutenance };
  }

  @Get(':id/resultat')
  async getResultat(@Param('id') id: string): Promise<number> {
    return this.soutenanceService.getResultat(id);
  }
}
