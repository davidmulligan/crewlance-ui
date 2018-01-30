import { Skill } from './skill';

export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    biography: string;
    skills: Skill[];
    enabled: boolean;
}
