export interface IProfessor {
    id: number;
    nome: string;
    email: string;
}

export const defaultValue: Readonly<IProfessor> = {    
    id: 0,
    nome: '',
    email: ''
};