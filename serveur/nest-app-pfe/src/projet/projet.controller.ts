import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
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
  
  @Get('attpremier')
  async getAllProjectsAttpremier(): Promise<Projet[]> {
    return this.projetService.getAllProjectsAttpremier();
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

  @Get('etudiant/:idEtudiant') // New endpoint to get project by idEtudiant
  async getProjetByIdEtudiant(
    @Param('idEtudiant') idEtudiant: string,
  ): Promise<Projet> {
    return this.projetService.getProjetByIdEtudiant(idEtudiant);
  }

  @UseGuards(EnseignantGuard)
  @Get('encadreur/:encadreurEnseignant')
  async getProjetsByEncadreurEnseignant(
    @Param('encadreurEnseignant') encadreurEnseignant: string,
  ): Promise<Projet[]> {
    return this.projetService.getProjetsByEncadreurEnseignant(
      encadreurEnseignant,
    );
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
  @Patch('change-etat/enAttente/:id')
  async changeEtatEnAttente(@Param('id') id: string) {
    return await this.projetService.changeEtatProjet(id, 'enAttente');
  }

  @UseGuards(AdminGuard)
  @Patch('change-etat/confirmer/:id')
  async changeEtatConfirmer(@Param('id') id: string) {
    return await this.projetService.changeEtatProjet(id, 'confirmer');
  }

  @Patch('change-etat/annuler/:id')
  async changeEtatAnnuler(@Param('id') id: string) {
    return await this.projetService.changeEtatProjet(id, 'annuler');
  }

  @Patch('change-etat/premier/:id')
  async changeEtatPremier(@Param('id') id: string) {
    return await this.projetService.changeEtatProjet(id, 'premier');
  }

  @Patch('change-etat/Attpremier/:id')
  async changeEtatAttpremier(@Param('id') id: string) {
    return await this.projetService.changeEtatProjet(id,  'Attpremier');
  }

  @Patch('change-etat/nonPremier/:id')
  async changeEtatNonPremier(@Param('id') id: string) {
    return await this.projetService.changeEtatProjet(id, 'nonPremier');
  }
}
