import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { IDisciplina } from '../../interfaces/disciplina-model';

export default function Disciplina() {

  const navigate = useNavigate();
  const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([]);

  useEffect(() => {
    obterDisciplinas();
  }, [])

  const obterDisciplinas = () => {
    axios.get('http://localhost:8080/disciplinas')
      .then(response => {
        setDisciplinas(response.data)
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }

  const deletarDisciplina = (id: number) => {
    axios.delete('http://localhost:8080/disciplinas/'+id)
      .then(() => {
        obterDisciplinas();
        toast.success('Disciplina excluida com sucesso!');
      })
      .catch(error => {
        toast.error('Erro na solicitação!');
      });
      
  }

  return (
    <div className="container-default" style={{padding: '2%'}}>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Disciplinas cadastradas</h3>
        <div>
          <Link to="/disciplina/cadastro" className='btn btn-dark btn-sm'>Cadastrar</Link>
        </div>
      </div>

      <table className="table table-striped" style={{fontSize: '12px'}}>
        <thead>
          <tr className='table-dark'>
            <th>ID</th>
            <th>Nome</th>
            <th>Professor</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {disciplinas?.length > 0 ? (
            disciplinas
              .sort((a, b) => a.id - b.id)
              .map((disciplina, key) => (
                <tr key={key}>
                  <td>{disciplina.id}</td>
                  <td>{disciplina.nome}</td>
                  <td><Link to={"/professor/"+disciplina.professor?.id}>{disciplina.professor?.nome}</Link></td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end">
                      <Link to={`/disciplina/${disciplina.id}`} className="btn btn-outline-secondary btn-sm">
                        <img src="eye.svg" alt="Visualizar" />
                      </Link>
                      <Link to={`/disciplina/edicao/${disciplina.id}`} className="btn btn-outline-secondary btn-sm mx-1">
                        <img src="pencil.svg" alt="Editar" />
                      </Link>
                      <button className="btn btn-outline-secondary btn-sm m-0" onClick={() => deletarDisciplina(disciplina.id)}>
                        <img src="trash.svg" alt="Excluir" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center" style={{ fontSize: '18px' }}>Nenhuma disciplina cadastrada!</td>
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
