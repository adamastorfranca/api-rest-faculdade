package com.adamastor.faculdade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.adamastor.faculdade.model.MatriculaAluno;
import com.adamastor.faculdade.model.dto.AtualizarNotasRequestDto;
import com.adamastor.faculdade.model.dto.HistoricoAlunoDto;
import com.adamastor.faculdade.service.MatriculaAlunoService;

@RestController
@RequestMapping("/matricula-alunos")
public class MatriculaAlunoController {

    @Autowired
    MatriculaAlunoService service;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<MatriculaAluno> create(@RequestBody MatriculaAluno matriculaAluno) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(matriculaAluno));
    }

    @PatchMapping("/atualiza-notas/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MatriculaAluno> updateNota(@PathVariable Long id, @RequestBody AtualizarNotasRequestDto dto){
        return ResponseEntity.ok(service.patchGrades(id, dto));
    }
    
    @PatchMapping("/atualiza-status/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizaStatus(@PathVariable Long id) throws Exception {
        service.updateStatusToBreak(id);
    }

    @GetMapping("/historico-aluno/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HistoricoAlunoDto getHistoricoDoAluno(@PathVariable Long id) {
        return service.getHistoricoFromAluno(id);
    }
}