import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}

//ResponsableGuard
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    //get the data from the incoming HTTP request, such as headers, parameters, body
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === 'responsable') {
      return true; // Allow access if user is admin
    }

    return false; // Deny access if user is not admin
  }
}

//EtudiantGuard
export class EtudiantGuard implements CanActivate {
   canActivate(context: ExecutionContext): boolean {
    //get the data from the incoming HTTP request, such as headers, parameters, body
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === 'etudiant') {
      return true; // Allow access if user is etudiant
    }

    return false; // Deny access if user is not etudiant
  }
}

//EnseignantGuard
export class EnseignantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    //get the data from the incoming HTTP request, such as headers, parameters, body
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === 'enseignant') {
      return true; // Allow access if user is enseignant
    }

    return false; // Deny access if user is not enseignant
  }
}
