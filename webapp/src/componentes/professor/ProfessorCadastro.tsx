import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

export default function ProfessorCadastro() {

  const navigate = useNavigate();

  const submit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    const data = {
      nome: formData.get('nome')?.toString(),
      email: formData.get('email')?.toString()
    };

    if (data.nome && data.email) {

      axios.post('http://localhost:8080/professores', data)
      .then(response => {
        toast.success('Professor cadastrado com sucesso!');
        navigate('/professor');
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
      <h3>Cadastro de professor</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" className="form-control" />
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
