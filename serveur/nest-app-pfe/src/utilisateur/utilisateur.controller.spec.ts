import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from '../../src/model/utilisateur.model';

describe('UtilisateurController', () => {
  let controller: UtilisateurController;
  let service: UtilisateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilisateurController],
      providers: [
        UtilisateurService,
        // Mock UtilisateurModel
        {
          provide: 'UtilisateurModel',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UtilisateurController>(UtilisateurController);
    service = module.get<UtilisateurService>(UtilisateurService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user when given a valid id', async () => {
      const userId = '663420d9f7d6891f6d8e309b';
      // Mock user object
      const user: Utilisateur = {
        _id: '663420d9f7d6891f6d8e309b', // Sample id
        nom: 'Dupont',
        prenom: 'Jean',
        sexe: 'M',
        email: 'jean.dupont@example.com',
        telephone: '1234567890',
        pieceIdentite: 'AB123456',
        role: 'responsable',
        motDePasse: 'hashedPassword',
        theme: 'light',
        specialite: 'sampleSpecialite',
        resetPasswordToken: 'resetToken',
        resetPasswordExpires: new Date(),
      } as Utilisateur;

      // Mock the service method to return the user
      jest.spyOn(service, 'getUserById').mockResolvedValue(user);

      const result = await controller.getUserById(userId);
      expect(result).toBeDefined();
      expect(result.id).toEqual(user.id); // Assert specific properties if needed
    });
  });

  describe('getAllUsersPageSearch', () => {
    it('should return an array of users based on search criteria', async () => {
      const page = 1;
      const pageSize = 10;
      const searchQuery = '';
      const searchCategory = 'tous';
      const users: Utilisateur[] = [
        /* Mock array of users */
      ];
      jest.spyOn(service, 'getAllUsersPageSearch').mockResolvedValue(users);

      const result = await controller.getAllUsersPageSearch(
        page,
        pageSize,
        searchQuery,
        searchCategory,
      );
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy(); // Ensure it's an array
    });
  });

  describe('getTotalUsersCount', () => {
    it('should return the total count of users based on search criteria', async () => {
      const searchQuery = '';
      const searchCategory = 'tous';
      const totalCount = 10;
      jest.spyOn(service, 'getTotalUsersCount').mockResolvedValue(totalCount);

      const result = await controller.getTotalUsersCount(
        searchQuery,
        searchCategory,
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('number'); // Ensure it's a number
      expect(result).toBeGreaterThanOrEqual(0); // Ensure it's not negative
    });
  });
});
