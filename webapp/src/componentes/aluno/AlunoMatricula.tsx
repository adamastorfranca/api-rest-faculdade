import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { IAluno } from '../../interfaces/aluno-model';
import { toast } from 'react-toastify';
import { IDisciplina } from '../../interfaces/disciplina-model';
import { IMatricula } from '../../interfaces/matricula-model';

export default function AlunoMatricula() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [matricula, setMatricula] = useState<IMatricula>();
  const [aluno, setAluno] = useState<IAluno>();
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

  useEffect(() => {
    axios.get('http://localhost:8080/alunos/'+id)
      .then(response => {
        setAluno(response.data);
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }, [id])

  const submit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    const data = {
      aluno,
      disciplina: JSON.parse(formData.get('disciplina') as string)
    };

    if (data.aluno && data.disciplina) {

      axios.post('http://localhost:8080/matricula-alunos', data)
      .then(response => {
        toast.success('Aluno matriculado com sucesso!');
        navigate(`/aluno/${aluno?.id}`);
      })
      .catch(error => {
        toast.error('Erro no cadastro!');
      });

    } else {
      toast.error('Preencha todo o formulário!');
    }

  }

  return (
    <div className="container-default" style={{padding: '2% 25%'}}>
      <div className=''>
        <h3>Matricula de aluno</h3>
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input disabled type="text" id="nome" name="nome" className="form-control" defaultValue={aluno?.nome} />
          </div>
          <div className="form-group">
            <label htmlFor="disciplina">Disciplina</label>
            <select id="disciplina" name="disciplina" className="form-control">
              <option>-</option>
              {disciplinas?.map((disciplina, key) => (
                <option key={key} value={JSON.stringify(disciplina)}>{disciplina?.nome}</option>
              ))}
            </select>
          </div>
          <div className='d-flex justify-content-center mt-4'>
            <button type="submit" className='btn btn-primary btn-sm'>
              Salvar
            </button>
            <button className='btn btn-danger btn-sm' onClick={() => navigate(-1)}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
