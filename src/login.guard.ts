import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // get request from context
    const request: Request = context.switchToHttp().getRequest();

    // get token from request header
    const authorization = request.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException('No authorization header provided');
    }

    // extract token from header Beaer xxxx
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // verify token
    try {
      const decodedUser = this.jwtService.verify(token);
      request['user'] = decodedUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
