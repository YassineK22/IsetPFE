// utilisateur.controller.ts

import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UpdateUtilisateurDto } from './dto';
import { Utilisateur } from 'src/model/utilisateur.model';
import { AdminGuard, JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard,AdminGuard)
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get('search')
  async getAllUsersPageSearch(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('searchQuery') searchQuery: string,
    @Query('searchCategory') searchCategory: string,
  ): Promise<Utilisateur[]> {
    return await this.utilisateurService.getAllUsersPageSearch(
      page,
      pageSize,
      searchQuery,
      searchCategory,
    );
  }

  @Get('count')
  async getTotalUsersCount(
    @Query('searchQuery') searchQuery: string,
    @Query('searchCategory') searchCategory: string,
  ): Promise<number> {
    return await this.utilisateurService.getTotalUsersCount(
      searchQuery,
      searchCategory,
    );
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Utilisateur> {
    return await this.utilisateurService.getUserById(id);
  }

  @Post(':id/update')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    return await this.utilisateurService.updateUser(id, updateUserDto);
  }
}
