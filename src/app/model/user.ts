import { Role } from "./role";

export class User {

    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: Role;
    token?: string;
    user_iglesia_id: string;
    user_password: string;
    

}
