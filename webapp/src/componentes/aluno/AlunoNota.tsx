import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IAluno } from '../../interfaces/aluno-model';

export default function AlunoNota() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { idMatricula } = useParams<{ idMatricula: string }>();
  const [aluno, setAluno] = useState<IAluno>();

  useEffect(() => {
    axios.get<IAluno>('http://localhost:8080/alunos/'+id)
      .then(response => {
        setAluno(response.data);
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }, [id]);

  const submit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    const data = {
      nota1: formData.get('nota1')?.toString() || null,
      nota2: formData.get('nota2')?.toString() || null
    };

    if (data.nota1 || data.nota2) {

      axios.patch('http://localhost:8080/matricula-alunos/atualiza-notas/'+idMatricula, data)
      .then(response => {
        toast.success('Nota cadastrada com sucesso!');
        navigate('/aluno/'+aluno?.id);
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
      <h3>Cadastro de nota</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input disabled type="text" id="nome" name="nome" className="form-control" defaultValue={aluno?.nome} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Nota 1</label>
          <input type="nota1" id="nota1" name="nota1" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Nota 2</label>
          <input type="nota2" id="nota2" name="nota2" className="form-control" />
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <button type="submit" className='btn btn-primary btn-sm'>
            Salvar
          </button>
          <button type='button' className='btn btn-danger btn-sm' onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
