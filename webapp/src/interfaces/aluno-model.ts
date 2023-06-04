export interface IAluno {
    id: number;
    nome: string;
    email: string;
    curso: string;
}

export const defaultValue: Readonly<IAluno> = {    
    id: 0,
    nome: '',
    email: '',
    curso: ''
};