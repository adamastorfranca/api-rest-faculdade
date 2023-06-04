package com.adamastor.faculdade.model.dto;

import java.util.List;

import lombok.Data;

@Data
public class HistoricoAlunoDto {

    private String nomeAluno;
    
    private String cursoAluno;
    
    private List<DisciplinasAlunoDto> disciplinasAlunoList;
    
}