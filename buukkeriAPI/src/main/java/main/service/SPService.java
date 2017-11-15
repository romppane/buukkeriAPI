package main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.dao.SPDAO_IF;
import main.entity.SP_IF;

@Service
public class SPService {
	
	@Autowired
	private SPDAO_IF spdao;
	
	public SP_IF[] readsps() {
		return spdao.readSPs();
	}
}
