import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { IAluno } from '../../interfaces/aluno-model';
import { toast } from 'react-toastify';
import { IDisciplina } from '../../interfaces/disciplina-model';

export default function AlunoVisualizacao() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [aluno, setAluno] = useState<IAluno>();
  const [disciplinas, setDisciplinas] = useState<IDisciplina>();

  useEffect(() => {
    axios.get<IAluno>('http://localhost:8080/alunos/'+id)
      .then(response => {
        setAluno(response.data);
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }, [id]);

  useEffect(() => {
    obterHistorico();
  }, [aluno]);

  const obterHistorico = () => {
    if (aluno && aluno.id) {
      axios.get<IDisciplina>('http://localhost:8080/matricula-alunos/historico-aluno/'+aluno?.id)
        .then(response => {
          setDisciplinas(response.data);
        })
    }
  }

  const trancarMatricula = (idMatricula: number) => {
    if (aluno) {
      axios.patch('http://localhost:8080/matricula-alunos/atualiza-status/'+idMatricula)
      .then(response => {
        obterHistorico();
        toast.success('Matricula trancada com sucesso!');
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
    } 
  }

  return (
    <div className="container-default" style={{padding: '2%'}}>
      <h3>Informações do aluno</h3>
      <div>     
        <div className="form-group row">
          <label className="col-sm-2">ID:</label>
          <div className="col-sm-10">{aluno?.id}</div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2">Nome:</label>
          <div className="col-sm-10">{aluno?.nome}</div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2">E-mail:</label>
          <div className="col-sm-10">{aluno?.email}</div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2">Curso:</label>
          <div className="col-sm-10">{aluno?.curso}</div>
        </div>

        <h5 className='mt-5 mb-4'>Histórico</h5>
        <table className="table table-striped" style={{fontSize: '14px'}}>
          <thead>
            <tr className='table-dark'>
              <th>Disciplina</th>
              <th>Professor</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Média</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {disciplinas ? (
              disciplinas.disciplinasAlunoList
                .map((disciplina, key) => (
                  <tr key={key}>
                    <td>{disciplina.nomeDisciplina}</td>
                    <td>{disciplina.professorDisciplina}</td>
                    <td>{disciplina.nota1?.toFixed(1)}</td>
                    <td>{disciplina.nota2?.toFixed(1)}</td>
                    <td>{disciplina.media?.toFixed(1)}</td>
                    <td>{disciplina.status}</td>
                    <td className="text-end">
                      {disciplina.status !== 'TRANCADO' ? (
                        <div className="d-flex justify-content-end">
                          <Link  to={`/aluno/${aluno?.id}/matricula/${disciplina.id}/nota`} className="btn btn-outline-success btn-sm mx-1">
                            Notas
                          </Link>
                          <button className="btn btn-outline-danger btn-sm m-0" onClick={() => trancarMatricula(disciplina.id)}>
                            Trancar
                          </button>
                        </div> 
                      ) : (
                        null
                      )}
      
                    </td>
                  </tr> 
                ))) : (
                  <tr>
                    <td colSpan={7} className="text-center" style={{ fontSize: '18px' }}>Nenhuma matricula encontrada!</td>
                  </tr>
                )
            }
          </tbody>
        </table>
        <div className='d-flex justify-content-center mt-4'>
          <Link to={`/aluno/${aluno?.id}/matricula`} type="button" className='btn btn-primary btn-sm' >
            Matricular
          </Link>
          <button className='btn btn-danger btn-sm' onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
