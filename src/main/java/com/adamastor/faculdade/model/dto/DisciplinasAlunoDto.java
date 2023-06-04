package com.adamastor.faculdade.model.dto;

import lombok.Data;

@Data
public class DisciplinasAlunoDto {
	
	private Long id;
    
	private String nomeDisciplina;
    
	private String professorDisciplina;
    
	private Double nota1;
    
	private Double nota2;
    
	private Double media;
    
	private String status;
	
}