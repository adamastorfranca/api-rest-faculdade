import { IAluno, defaultValue as defaultAlunoValue } from "./aluno-model";
import { IDisciplina, defaultValue as defaultDisciplinaValue } from "./disciplina-model";

export interface IMatricula {
    id: number;
    nota1: number;
    nota2: number;
    media: number;
    status: string;
    aluno: IAluno;
    disciplina: IDisciplina;
    nomeDisciplina: string;
    professorDisciplina: string;
}

export const defaultValue: Readonly<IMatricula> = {    
    id: 0,
    nota1: 0,
    nota2: 0,
    media: 0,
    status: '',
    aluno: defaultAlunoValue,
    disciplina: defaultDisciplinaValue,
    nomeDisciplina: '',
    professorDisciplina: ''
};