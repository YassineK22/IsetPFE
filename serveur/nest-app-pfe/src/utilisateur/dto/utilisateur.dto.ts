import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

// DTO class for updating a user
export class UpdateUtilisateurDto {
  @IsOptional()
  @IsString()
  readonly nom?: string;

  @IsOptional()
  @IsString()
  readonly prenom?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['homme', 'femme'])
  readonly sexe?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly telephone?: string;

  @IsOptional()
  @IsString()
  readonly pieceIdentite?: string;

  @IsOptional()
  @IsString()
  readonly motDePasse?: string;

  @IsOptional()
  @IsEnum(['light', 'dark'])
  readonly theme?: string;

  @IsOptional()
  readonly specialite?: string;

  @IsOptional()
  @IsEnum(['etudiant', 'enseignant', 'responsable'])
  readonly role?: string;

  @IsOptional()
  @IsString()
  readonly resetPasswordToken?: string;

  @IsOptional()
  readonly resetPasswordExpires?: Date;
}
