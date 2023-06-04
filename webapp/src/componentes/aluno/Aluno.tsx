import { useEffect, useState } from 'react';
import { IAluno } from '../../interfaces/aluno-model';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Aluno() {

  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<IAluno[]>([]);

  useEffect(() => {
    obterAlunos();
  }, [])

  const obterAlunos = () => {
    axios.get('http://localhost:8080/alunos')
      .then(response => {
        setAlunos(response.data)
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }

  const deletarAluno = (id: number) => {
    axios.delete('http://localhost:8080/alunos/'+id)
      .then(() => {
        obterAlunos();
        toast.success('Aluno excluido com sucesso!');
      })
      .catch(error => {
        toast.error('Erro na solicitação!');
      });  
  }

  return (
    <div className="container-default" style={{padding: '2%'}}>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Alunos cadastrados</h3>
        <div>
          <Link to="/aluno/cadastro" className='btn btn-dark btn-sm'>Cadastrar</Link>
        </div>
      </div>

      <table className="table table-striped" style={{fontSize: '12px'}}>
        <thead>
          <tr className='table-dark'>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Curso</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {alunos?.length > 0 ? (
            alunos
              .sort((a, b) => a.id - b.id)
              .map((aluno, key) => (
                <tr key={key}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td>{aluno.curso}</td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end">
                      <Link to={`/aluno/${aluno.id}`} className="btn btn-outline-secondary btn-sm">
                        <img src="eye.svg" alt="Visualizar" />
                      </Link>
                      <Link to={`/aluno/edicao/${aluno.id}`} className="btn btn-outline-secondary btn-sm mx-1">
                        <img src="pencil.svg" alt="Editar" />
                      </Link>
                      <button className="btn btn-outline-secondary btn-sm m-0" onClick={() => deletarAluno(aluno.id)}>
                        <img src="trash.svg" alt="Excluir" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center" style={{ fontSize: '18px' }}>Nenhum aluno cadastrado!</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='d-flex justify-content-center mt-4'>
        <button className='btn btn-danger btn-sm' onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    </div>
  );
}
