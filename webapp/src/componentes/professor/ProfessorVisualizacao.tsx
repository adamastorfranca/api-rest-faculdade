import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { IProfessor } from '../../interfaces/professor-model';
import { toast } from 'react-toastify';

export default function ProfessorVisualizacao() {

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

  return (
    <div className="container-default" style={{padding: '2% 25%'}}>
      <h3>Informações do professor</h3>
      <div>     
        <div className="form-group row">
          <label className="col-sm-3">ID:</label>
          <div className="col-sm-9">{professor?.id}</div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3">Nome:</label>
          <div className="col-sm-9">{professor?.nome}</div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3">E-mail:</label>
          <div className="col-sm-9">{professor?.email}</div>
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
