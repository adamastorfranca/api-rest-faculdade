import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { IAluno } from '../../interfaces/aluno-model';
import { toast } from 'react-toastify';

export default function AlunoEdicao() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [aluno, setAluno] = useState<IAluno>();

  useEffect(() => {
    axios.get('http://localhost:8080/alunos/'+id)
      .then(response => {
        setAluno(response.data);
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }, [id])

  const submit = () => {

    if (aluno?.nome && aluno?.email && aluno?.curso) {

      axios.put('http://localhost:8080/alunos/'+id, aluno)
        .then(response => {
          toast.success('Aluno editado com sucesso!');
          navigate('/aluno');
        })
        .catch(error => {
          toast.error('Erro na edição dos dados!');
        });
    } else {
      toast.error('Preencha todo o formulário!');
    }

  }

  return (
    <div className="container-default" style={{padding: '2% 25%'}}>
      <div className=''>
        <h3>Edição de aluno</h3>
        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" className="form-control" defaultValue={aluno?.nome} onChange={(e) => setAluno((prevAluno) => prevAluno ? { ...prevAluno, nome: e.target.value } : prevAluno)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" className="form-control" defaultValue={aluno?.email} onChange={(e) => setAluno((prevAluno) => prevAluno ? { ...prevAluno, email: e.target.value } : prevAluno)} />
          </div>
          <div className="form-group">
            <label htmlFor="curso">Curso</label>
            <select id="curso" name="curso" className="form-control" value={aluno?.curso} onChange={(e) => setAluno((prevAluno) => prevAluno ? { ...prevAluno, curso: e.target.value } : prevAluno)}>
              <option>-</option>
              <option value={"Sistemas para internet"}>Sistemas para internet</option>
              <option value={"Sistemas de informação"}>Sistemas de informação</option>
            </select>
          </div>
          <div className='d-flex justify-content-center mt-4'>
            <button type="submit" className='btn btn-primary btn-sm' onClick={submit}>
              Salvar
            </button>
            <button className='btn btn-danger btn-sm' onClick={() => navigate(-1)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
