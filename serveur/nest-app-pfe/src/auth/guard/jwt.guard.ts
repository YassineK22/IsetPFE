import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // check if the user has the role "responsable" in the JWT token
    //get the data from the incoming HTTP request, such as headers, parameters, body
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === 'responsable') {
      return true; // Allow access if user is admin
    }

    return false; // Deny access if user is not admin
  }
}