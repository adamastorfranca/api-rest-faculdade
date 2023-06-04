import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { IProfessor } from '../../interfaces/professor-model';
import { toast } from 'react-toastify';
import { IDisciplina } from '../../interfaces/disciplina-model';

export default function DisciplinaEdicao() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [disciplina, setDisciplina] = useState<IDisciplina>();
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

  useEffect(() => {
    axios.get('http://localhost:8080/disciplinas/'+id)
      .then(response => {
        setDisciplina(response.data);
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }, [id])

  const submit = () => {

    if (disciplina?.nome && disciplina?.professor) {

      axios.put('http://localhost:8080/disciplinas/'+id, disciplina)
        .then(response => {
          toast.success('Disciplina editada com sucesso!');
          navigate('/disciplina');
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
        <h3>Edição de disciplina</h3>
        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" className="form-control" defaultValue={disciplina?.nome} onChange={(e) => setDisciplina((prevDisciplina) => prevDisciplina ? { ...prevDisciplina, nome: e.target.value } : prevDisciplina)} />
          </div>
          <div className="form-group">
            <label htmlFor="professor">Professor</label>
            <select
              id="professor"
              name="professor"
              className="form-control"
              value={JSON.stringify(disciplina?.professor)}
              onChange={(e) => {
                const selectedProfessor = JSON.parse(e.target.value);
                setDisciplina((prevDisciplina) =>
                  prevDisciplina
                    ? { ...prevDisciplina, professor: selectedProfessor }
                    : prevDisciplina
                );
              }}
            >
              {professores?.map((professor, key) => (
                <option key={key} value={JSON.stringify(professor)}>
                  {professor?.nome}
                </option>
              ))}
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
