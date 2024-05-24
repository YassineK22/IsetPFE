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

  @Get('attpremier')
  async getAllSoutenancesAttpremier(): Promise<Soutenance[]> {
    return this.soutenanceService.getAllSoutenancesAttpremier();
  }

  @Get('notedonner')
  async getAllSoutenancesNoteDonner(): Promise<Soutenance[]> {
    return this.soutenanceService.getAllSoutenancesNoteDonner();
  }

  @Get('etudiant/:id')
  async getSoutenanceByStudentId(@Param('id') id: string) {
    const soutenances =
      await this.soutenanceService.getSoutenanceByStudentId(id);
    return { soutenances };
  }

  @Get(':id')
  async getSoutenanceById(@Param('id') id: string): Promise<Soutenance> {
    return this.soutenanceService.getSoutenanceById(id);
  }

  @Get('premier')
  async getAllSoutenancesPremier(): Promise<Soutenance[]> {
    return this.soutenanceService.getAllSoutenancesPremier();
  }

  @Post()
  async createSoutenance(
    @Body('idEtudiant') idEtudiant: string,
    @Body('rapport') rapport: string,
  ) {
    const soutenance = await this.soutenanceService.createSoutenance(
      idEtudiant,
      rapport,
    );
    return { soutenance };
  }

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

  @Patch('change-etat/premier/:id')
  async changeEtatPremier(@Param('id') id: string) {
    return await this.soutenanceService.changeEtatPremier(id);
  }

  @Patch('change-etat/attpremier/:id')
  async changeEtatAttpremier(@Param('id') id: string) {
    return await this.soutenanceService.changeEtatAttpremier(id);
  }

  @Patch('change-etat/nonpremier/:id')
  async changeEtatNonPremier(@Param('id') id: string) {
    return await this.soutenanceService.changeEtatNonPremier(id);
  }

  @Patch('change-etat/enattentes/:id')
  async changeEtatEnAttenteS(@Param('id') id: string) {
    return await this.soutenanceService.changeEtatEnAttenteS(id);
  }

  @Patch('change-etat/notedonner/:id')
  async changeEtatNoteDonner(@Param('id') id: string) {
    return await this.soutenanceService.changeEtatNoteDonner(id);
  }

  @Patch('change-etat/notevalider/:id')
  async changeEtatNoteValider(@Param('id') id: string) {
    return await this.soutenanceService.changeEtatNoteValider(id);
  }

  @Patch('change-etat/notenvalider/:id')
  async changeEtatNoteNValider(@Param('id') id: string) {
    return await this.soutenanceService.changeEtatNoteNValider(id);
  }
}
