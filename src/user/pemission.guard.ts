import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PemissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get info user from context
    const request: Request = context.switchToHttp().getRequest();
    const userContext = request['user'];
    if (!userContext) {
      throw new UnauthorizedException('No user found in request context');
    }

    // Check if user has permisstion
    const foundUser = await this.userService.getPermissionsByUsername(
      userContext.username,
    );
    if (!foundUser) {
      throw new UnauthorizedException('User not found');
    }

    // If user has permission, allow access
    if (!foundUser.permissions || foundUser.permissions.length === 0) {
      throw new UnauthorizedException('User does not have permission');
    }

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions || requiredPermissions.length === 0) {
      throw new UnauthorizedException('No permission required');
    }

    // Check if user has required permissions
    const hasPermission = foundUser.permissions.some((permission) =>
      requiredPermissions.includes(permission.name),
    );
    if (!hasPermission) {
      throw new UnauthorizedException(
        'User does not have required permissions',
      );
    }

    return true;
  }
}
