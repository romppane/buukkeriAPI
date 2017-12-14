package main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.dao.SPDAO_IF;
import main.entity.SP;
import main.entity.SP_IF;


/**
 * Routes the REST api calls made to SPController to SPDAO.
 * @author Ville
 *
 */
@Service
public class SPService {
	
	@Autowired
	private SPDAO_IF spdao;
	
	public SP_IF[] readsps() {
		return spdao.readSPs();
	}
	public boolean createsp(SP_IF sp) {
		return spdao.createSP(sp);
	}
	public boolean updatesp(SP_IF sp) {
		return spdao.updateSP(sp);
	}
	public boolean deletesp(SP_IF sp) {
		return spdao.deleteSP(sp);
	}
	public SP_IF readsp(String email, String pass) {
		return spdao.readSP(email, pass);
	}
}
