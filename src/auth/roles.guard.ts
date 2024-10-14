import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'Role',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // If no roles are required for the route, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // User object added by Passport after successful authentication
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
