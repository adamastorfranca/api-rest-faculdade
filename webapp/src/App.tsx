import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/navbar/Navbar";
import Home from "./componentes/home/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Aluno from "./componentes/aluno/Aluno";
import AlunoCadastro from "./componentes/aluno/AlunoCadastro";
import AlunoEdicao from "./componentes/aluno/AlunoEdicao";
import AlunoVisualizacao from "./componentes/aluno/AlunoVisualizacao";
import AlunoMatricula from "./componentes/aluno/AlunoMatricula";
import AlunoNota from "./componentes/aluno/AlunoNota";
import Professor from "./componentes/professor/Professor";
import ProfessorVisualizacao from "./componentes/professor/ProfessorVisualizacao";
import ProfessorEdicao from "./componentes/professor/ProfessorEdicao";
import ProfessorCadastro from "./componentes/professor/ProfessorCadastro";
import Disciplina from "./componentes/disciplina/Disciplina";
import DisciplinaVisualizacao from "./componentes/disciplina/DisciplinaVisualizacao";
import DisciplinaEdicao from "./componentes/disciplina/DisciplinaEdicao";
import DisciplinaCadastro from "./componentes/disciplina/DisciplinaCadastro";

export default function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/aluno/:id" element={<AlunoVisualizacao />} />
        <Route path="/aluno/:id/matricula" element={<AlunoMatricula />} />
        <Route path="/aluno/:id/matricula/:idMatricula/nota" element={<AlunoNota />} />
        <Route path="/aluno/edicao/:id" element={<AlunoEdicao />} />
        <Route path="/aluno/cadastro" element={<AlunoCadastro />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/professor/:id" element={<ProfessorVisualizacao />} />
        <Route path="/professor/edicao/:id" element={<ProfessorEdicao />} />
        <Route path="/professor/cadastro" element={<ProfessorCadastro />} />
        <Route path="/disciplina" element={<Disciplina />} />
        <Route path="/disciplina/:id" element={<DisciplinaVisualizacao />} />
        <Route path="/disciplina/edicao/:id" element={<DisciplinaEdicao />} />
        <Route path="/disciplina/cadastro" element={<DisciplinaCadastro />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );

}
