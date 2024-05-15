import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { AdminGuard, EnseignantGuard, JwtGuard } from 'src/auth/guard';
import { Projet } from 'src/model/project.model';

@UseGuards(JwtGuard)
@Controller('projet')
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllProjets(): Promise<Projet[]> {
    return this.projetService.getAllProjets();
  }

  @UseGuards(AdminGuard)
  @Get('en-attente')
  async getAllProjectsEnAttente(): Promise<Projet[]> {
    return this.projetService.getAllProjects('enAttente');
  }

  @UseGuards(AdminGuard)
  @Get('premier')
  async getAllProjectsPremier(): Promise<Projet[]> {
    return this.projetService.getAllProjects('premier');
  }

  @Get(':id')
  async getProjetById(@Param('id') id: string): Promise<Projet> {
    return this.projetService.getProjetById(id);
  }

  @UseGuards(EnseignantGuard)
  @Get('encadreur/:encadreurEnseignant')
  async getProjetsByEncadreurEnseignant(@Param('encadreurEnseignant') encadreurEnseignant: string): Promise<Projet[]> {
    return this.projetService.getProjetsByEncadreurEnseignant(encadreurEnseignant);
  }

  @Post()
  async createProjet(@Body() body: any) {
    return await this.projetService.createProjet(body);
  }

  @Patch(':id')
  async updateProjet(@Param('id') id: string, @Body() body: any) {
    return await this.projetService.updateProjet(id, body);
  }

  @UseGuards(AdminGuard)
  @Patch('update-all/:id')
  async updateAllProjet(@Param('id') id: string, @Body() body: any) {
    return await this.projetService.updateAllProjet(id, body);
  }

  @UseGuards(AdminGuard)
  @Patch('change-etat/en-attente/:id')
  async changeEtatToEnAttente(@Param('id') id: string) {
    return await this.projetService.changeEtatToEnAttente(id);
  }

  @UseGuards(AdminGuard)
  @Patch('change-etat/confirmer/:id')
  async changeEtatToConfirmer(@Param('id') id: string) {
    return await this.projetService.changeEtatToConfirmer(id);
  }

  @Patch('change-etat/annuler/:id')
  async changeEtatToAnnuler(@Param('id') id: string) {
    return await this.projetService.changeEtatToAnnuler(id);
  }
}
