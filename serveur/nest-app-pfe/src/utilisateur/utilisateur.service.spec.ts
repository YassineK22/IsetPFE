import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurService } from './utilisateur.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UtilisateurService', () => {
  let service: UtilisateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilisateurService,
        {
          provide: getModelToken('Utilisateur'),
          useValue: {}, // Provide a mock value for the model
        },
      ],
    }).compile();

    service = module.get<UtilisateurService>(UtilisateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests for service methods here
});
