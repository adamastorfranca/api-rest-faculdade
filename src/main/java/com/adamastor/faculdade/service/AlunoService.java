package com.adamastor.faculdade.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adamastor.faculdade.model.Aluno;
import com.adamastor.faculdade.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    AlunoRepository repository;
    
    public Aluno create(Aluno aluno){
        return repository.save(aluno);
    }

    public List<Aluno> findAll(){
        return repository.findAll();
    }

    public Optional<Aluno> findById(Long id){
        return repository.findById(id);
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }
    
    public Aluno update(Long id, Aluno alunoUpdated) {
        Optional<Aluno> optionalAluno = findById(id);     
        if (optionalAluno.isPresent()) {
            Aluno aluno = optionalAluno.get();
            aluno.setNome(alunoUpdated.getNome());
            aluno.setEmail(alunoUpdated.getEmail());
            aluno.setCurso(alunoUpdated.getCurso());       
            return create(aluno);
        } else {
        	return null;
        }
    }

}