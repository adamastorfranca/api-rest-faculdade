import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { IProfessor } from '../../interfaces/professor-model';
import { toast } from 'react-toastify';
import { IDisciplina } from '../../interfaces/disciplina-model';

export default function DisciplinaVisualizacao() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [disciplina, setDisciplina] = useState<IDisciplina>();

  useEffect(() => {
    axios.get('http://localhost:8080/disciplinas/'+id)
      .then(response => {
        setDisciplina(response.data);
      })
      .catch(error => {
        toast.error('Erro na requisição dos dados!');
      });
  }, [id])

  return (
    <div className="container-default" style={{padding: '2% 25%'}}>
      <h3>Informações da disciplina</h3>
      <div>     
        <div className="form-group row">
          <label className="col-sm-3">ID:</label>
          <div className="col-sm-9">{disciplina?.id}</div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3">Nome:</label>
          <div className="col-sm-9">{disciplina?.nome}</div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3">Professor:</label>
          <Link to={"/professor/"+disciplina?.professor?.id} className="col-sm-9">{disciplina?.professor?.nome}</Link>
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <button className='btn btn-danger btn-sm' onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
