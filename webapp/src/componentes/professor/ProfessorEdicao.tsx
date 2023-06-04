import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { IProfessor } from '../../interfaces/professor-model';
import { toast } from 'react-toastify';

export default function ProfessorEdicao() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [professor, setProfessor] = useState<IProfessor>();

  useEffect(() => {
    axios.get('http://localhost:8080/professores/'+id)
      .then(response => {
        setProfessor(response.data);
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }, [id])

  const submit = () => {

    if (professor?.nome && professor?.email) {

      axios.put('http://localhost:8080/professores/'+id, professor)
        .then(response => {
          toast.success('Professor editado com sucesso!');
          navigate('/professor');
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
        <h3>Edição de professor</h3>
        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" className="form-control" defaultValue={professor?.nome} onChange={(e) => setProfessor((prevProfessor) => prevProfessor ? { ...prevProfessor, nome: e.target.value } : prevProfessor)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" className="form-control" defaultValue={professor?.email} onChange={(e) => setProfessor((prevProfessor) => prevProfessor ? { ...prevProfessor, email: e.target.value } : prevProfessor)} />
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
