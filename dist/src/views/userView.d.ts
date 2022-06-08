import { User } from '../entities/User';
import { DefaultView } from './defaultView';
export declare class UserView extends DefaultView {
    static returnUser(user: User, withToken?: boolean): {
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            city: string;
            token: false;
        };
    };
}
