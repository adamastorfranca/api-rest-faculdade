import { IMatricula } from "./matricula-model";
import { IProfessor, defaultValue as defaultProfessorValue } from "./professor-model";

export interface IDisciplina {
    id: number;
    nome: string;
    professor: IProfessor;
    nomeDisciplina: string;
    professorDisciplina: string;
    disciplinasAlunoList: IMatricula[];
}

export const defaultValue: Readonly<IDisciplina> = {    
    id: 0,
    nome: '',
    professor: defaultProfessorValue,
    nomeDisciplina: '',
    professorDisciplina: '',
    disciplinasAlunoList: []
};