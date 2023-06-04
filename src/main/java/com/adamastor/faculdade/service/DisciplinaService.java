package com.adamastor.faculdade.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adamastor.faculdade.model.Disciplina;
import com.adamastor.faculdade.repository.DisciplinaRepository;

@Service
public class DisciplinaService {

    @Autowired
    DisciplinaRepository repository;

    public List<Disciplina> findAll(){ 
    	return repository.findAll(); 
    }
    
    public Optional<Disciplina> findById(Long id) {
    	return repository.findById(id);
    }
    
    public Disciplina save(Disciplina disciplina){ 
    	return repository.save(disciplina);
    }

    public List<Disciplina> findByProfessorId(Long professorId){
        return repository.findByProfessorId(professorId);
    }
    
    public void deleteById(Long id){
        repository.deleteById(id);
    }
    
    public Disciplina update(Long id, Disciplina disciplinaUpdated) {
        Optional<Disciplina> optionalDisciplina = findById(id);
        if (optionalDisciplina.isPresent()){
            Disciplina disciplina = optionalDisciplina.get();
            disciplina.setNome(disciplinaUpdated.getNome());
            disciplina.setProfessor(disciplinaUpdated.getProfessor());
            return save(disciplina);
        } else {
        	return null;
        }
    }
    
}