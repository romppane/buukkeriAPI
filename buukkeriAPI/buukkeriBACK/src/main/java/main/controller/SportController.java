package main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import main.entity.Sport;
import main.entity.Sport_IF;
import main.service.SportService;

/**
 * Controls the received REST API calls made for Sports and maps them forward to service layer.
 * @author Ville
 *
 */
@RestController
@RequestMapping("/sports")
public class SportController {

	@Autowired
	private SportService sportservice;
	
	@RequestMapping(method = RequestMethod.GET)
	public Sport_IF[] readSports() {
		return sportservice.readSports();
	}
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean createsport(@RequestBody Sport sport) {
		return sportservice.createsport(sport);
	}
	@RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean deletesport(@RequestBody Sport sport) {
		return sportservice.deletesport(sport);
	}
}
