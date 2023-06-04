import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IProfessor } from '../../interfaces/professor-model';

export default function DisciplinaCadastro() {

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

  const submit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    const data = {
      nome: formData.get('nome')?.toString(),
      professor: JSON.parse(formData.get('professor') as string)
    };

    if (data.nome && data.professor) {

      axios.post('http://localhost:8080/disciplinas', data)
      .then(response => {
        toast.success('Disciplina cadastrada com sucesso!');
        navigate('/disciplina');
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
      <h3>Cadastro de disciplina</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="professor">Professor</label>
          <select id="professor" name="professor" className="form-control">
            <option>-</option>
            {professores?.map((professor, key) => (
              <option key={key} value={JSON.stringify(professor)}>{professor?.nome}</option>
            ))}
          </select>
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
