import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EntrepriseAccueil } from './entreprise-accueil.model';
import { EncadreurEntreprise } from './encadreur-entreprise.model';

@Schema()
export class Projet extends Document {
  @Prop({ required: true, unique: true })
  idEtudiant: string;

  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  problematique: string;

  @Prop({ required: true })
  natureSujet: string;

  @Prop({ type: EntrepriseAccueil, required: true })
  entrepriseAccuel: EntrepriseAccueil;

  @Prop({ type: EncadreurEntreprise, required: true })
  encadreurEntreprise: EncadreurEntreprise;

  @Prop()
  encadreurEnseignant: string;

  @Prop()
  attestation: string;

  @Prop({
    type: String,
    enum: [
      'premier', // accepter le projet
      'Attpremier', // attendre acceptation du projet
      'nonPremier', // Projet non accepter
      'enAttente', // en attente d'acceptation encadrement
      'enAttenteR', // en attente de vaildation final projet
      'confirmer',
      'annuler',
    ],
    default: 'Attpremier',
  })
  etatProjet: string;
}

export const ProjetSchema = SchemaFactory.createForClass(Projet);
