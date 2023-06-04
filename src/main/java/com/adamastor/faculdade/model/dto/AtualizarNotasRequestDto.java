package com.adamastor.faculdade.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AtualizarNotasRequestDto {
	
    private Double nota1;
    
    private Double nota2;

}