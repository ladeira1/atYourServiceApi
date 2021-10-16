import { User } from '../entities/User';
import { getToken } from '../utils/getToken';
import { DefaultView } from './defaultView';

export class UserView extends DefaultView {
  static returnUser(user: User) {
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: getToken(user.id),
      },
    };
  }
}
