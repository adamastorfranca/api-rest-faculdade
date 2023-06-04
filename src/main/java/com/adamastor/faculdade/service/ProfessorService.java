package com.adamastor.faculdade.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adamastor.faculdade.model.Professor;
import com.adamastor.faculdade.repository.ProfessorRepository;

@Service
public class ProfessorService {

    @Autowired
    ProfessorRepository repository;

    public Professor save(Professor professor){
        return repository.save(professor);
    }

    public List<Professor> findAll(){
        return repository.findAll();
    }

    public Optional<Professor> findById(Long id){
        return repository.findById(id);
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }
    
    public Professor update(Long id, Professor professorUpdated) {
        Optional<Professor> optionalProfessor = findById(id);
        if (optionalProfessor.isPresent()){
            Professor professor = optionalProfessor.get();
            professor.setNome(professorUpdated.getNome());
            professor.setEmail(professorUpdated.getEmail());
            return save(professor);
        } else {
        	return null;
        }
    }

}