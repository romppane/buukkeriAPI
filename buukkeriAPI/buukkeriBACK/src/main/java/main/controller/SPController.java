package main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import main.entity.SP;
import main.entity.SP_IF;
import main.entity.User_IF;
import main.service.SPService;

/**
 * Controls the received REST API calls made for Service Providers and maps them forward to service layer.
 * @author Ville
 *
 */
@RestController
@RequestMapping("/SP")
public class SPController {
	@Autowired
	private SPService spservice;
	
	@RequestMapping(method = RequestMethod.GET)
	public SP_IF[] readSPs() {
		return spservice.readsps();
	}
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean createsp(@RequestBody SP sp) {
		return spservice.createsp(sp);
	}
	@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean updatesp(@RequestBody SP sp) {
		return spservice.updatesp(sp);
	}
	@RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean deletesp(@RequestBody SP sp) {
		return spservice.deletesp(sp);
	}
	@RequestMapping(value ="/{email}&{pass}" ,method = RequestMethod.GET)
	public SP_IF getSP(@PathVariable("email")String email,@PathVariable("pass") String pass) {
		return spservice.readsp(email, pass);
	}
}
