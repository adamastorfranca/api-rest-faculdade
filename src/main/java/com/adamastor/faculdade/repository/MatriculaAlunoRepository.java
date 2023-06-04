package com.adamastor.faculdade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adamastor.faculdade.model.MatriculaAluno;

@Repository
public interface MatriculaAlunoRepository extends JpaRepository<MatriculaAluno, Long> {
	
    public List<MatriculaAluno> findByAlunoId(Long alunoId);
    
}