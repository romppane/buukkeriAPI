package main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.dao.SportDAO;
import main.entity.Sport;
import main.entity.Sport_IF;

/**
 * Routes the REST api calls made to SportController to SportDAO.
 * @author Ville
 *
 */
@Service
public class SportService {
	
	@Autowired
	private SportDAO sportdao;

	public Sport_IF[] readSports() {
		return sportdao.getSports();
	}

	public boolean createsport(Sport_IF sport) {
		return sportdao.newsport(sport);
	}

	public boolean deletesport(Sport_IF sport) {
		return sportdao.delsport(sport);
	}

}
