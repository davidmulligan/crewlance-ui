import { Category } from 'shared/model/category';

export interface Project {
    id: number;
    title: string;
    description: string;
    amount: number;
    duration: number;
    location: string;
    category: Category;
    createdBy: {};
    createdOn: {};
}
