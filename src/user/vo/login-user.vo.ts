import { User } from '../entities/user.entity';

export class LoginUserVO {
  elements: {
    user: User;
    token: string;
  };
  status: string;
}
