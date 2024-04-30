import { IsString, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'pieceIdentite cannot be empty' })
  @IsString({ message: 'pieceIdentite must be a string' })
  pieceIdentite: string;

  @IsNotEmpty({ message: 'MotDePasse cannot be empty' })
  @IsString({ message: 'MotDePasse must be a string' })
  motDePasse: string;
}