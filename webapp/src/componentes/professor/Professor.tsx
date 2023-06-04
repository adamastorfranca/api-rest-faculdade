import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { IProfessor } from '../../interfaces/professor-model';

export default function Professor() {

  const navigate = useNavigate();
  const [professores, setProfessores] = useState<IProfessor[]>([]);

  useEffect(() => {
    obterProfessores();
  }, [])

  const obterProfessores = () => {
    axios.get('http://localhost:8080/professores')
      .then(response => {
        setProfessores(response.data);
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }

  const deletarProfessor = (id: number) => {
    axios.delete('http://localhost:8080/professores/'+id)
      .then(() => {
        obterProfessores();
        toast.success('Professor excluido com sucesso!');
      })
      .catch(error => {
        toast.error('Erro na solicitação!');
      });
      
  }

  return (
    <div className="container-default" style={{padding: '2%'}}>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Professores cadastrados</h3>
        <div>
          <Link to="/professor/cadastro" className='btn btn-dark btn-sm'>Cadastrar</Link>
        </div>
      </div>

      <table className="table table-striped" style={{fontSize: '12px'}}>
        <thead>
          <tr className='table-dark'>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {professores?.length > 0 ? (
            professores
              .sort((a, b) => a.id - b.id)
              .map((professor, key) => (
                <tr key={key}>
                  <td>{professor.id}</td>
                  <td>{professor.nome}</td>
                  <td>{professor.email}</td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end">
                      <Link to={`/professor/${professor.id}`} className="btn btn-outline-secondary btn-sm">
                        <img src="eye.svg" alt="Visualizar" />
                      </Link>
                      <Link to={`/professor/edicao/${professor.id}`} className="btn btn-outline-secondary btn-sm mx-1">
                        <img src="pencil.svg" alt="Editar" />
                      </Link>
                      <button className="btn btn-outline-secondary btn-sm m-0" onClick={() => deletarProfessor(professor.id)}>
                        <img src="trash.svg" alt="Excluir" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center" style={{ fontSize: '18px' }}>Nenhum professor cadastrado!</td>
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
