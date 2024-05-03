import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUtilisateurDto } from './dto';
import { Utilisateur } from 'src/model/utilisateur.model';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectModel('Utilisateur')
    private readonly utilisateurModel: Model<Utilisateur>,
  ) {}

  async updateUser(
    id: string,
    utilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    return await this.utilisateurModel.findByIdAndUpdate(id, utilisateurDto, {
      new: true,
    });
  }

  async getUserById(id: string): Promise<Utilisateur> {
    return await this.utilisateurModel.findById(id).exec();
  }

  async getAllUsersPageSearch(
    page: number,
    pageSize: number,
    searchQuery: string,
    searchCategory: string,
  ): Promise<Utilisateur[]> {
    const skip = (page - 1) * pageSize;
    let query = {};

    // Construct the query based on search criteria
    if (searchCategory === 'tous') {
      query = {
        $or: [
          { nom: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { telephone: { $regex: searchQuery, $options: 'i' } },
          { sexe: { $regex: searchQuery, $options: 'i' } },
          { pieceIdentite: { $regex: searchQuery, $options: 'i' } },
          { specialite: { $regex: searchQuery, $options: 'i' } },
          { role: { $regex: searchQuery, $options: 'i' } },
        ],
      };
    } else {
      query[searchCategory] = { $regex: searchQuery, $options: 'i' };
    }
    return await this.utilisateurModel
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .exec();
  }

  async getTotalUsersCount(
    searchQuery: string,
    searchCategory: string,
  ): Promise<number> {
    let query: any = {};

    // Construct the query based on the search category and query
    if (searchQuery && searchCategory) {
      query[searchCategory] = { $regex: searchQuery, $options: 'i' };
    }

    // Count documents based on the constructed query
    return await this.utilisateurModel.countDocuments(query).exec();
  }
}
