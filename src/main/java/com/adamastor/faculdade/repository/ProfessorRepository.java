package com.adamastor.faculdade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adamastor.faculdade.model.Professor;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
	
}
