package main.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import main.entity.Activity;
import main.entity.Activity_IF;
import main.service.ActivityService;

/**
 * Controls the received REST API calls made for Activities and maps them forward to service layer.
 * @author Ville
 *
 */
@RestController
@RequestMapping("/act")
public class ActivityController {
	@Autowired
	private ActivityService actservice;
	
	@RequestMapping(method = RequestMethod.GET)
	public Activity_IF[] readActivities() {
		return actservice.readActivities();
	}
	
	@RequestMapping(value ="/{id}" ,method = RequestMethod.GET)
	public Activity_IF ActivityByID(@PathVariable("id")int id) {
		return actservice.getActivityByID(id);
	}
	@RequestMapping(value ="/spid={spid}" ,method = RequestMethod.GET)
	public Activity_IF[] ActivityBySPID(@PathVariable("spid")int spid) {
		return actservice.getActivityBySPID(spid);
	}
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean createact(@RequestBody Activity act) {
		return actservice.createact(act);
	}
	@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean updateact(@RequestBody Activity act) {
		return actservice.updateact(act);
	}
	@RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteact(@RequestBody Activity act) {
		return actservice.deleteact(act);
	}
	@RequestMapping(value ="/sportID={sportID}" ,method = RequestMethod.GET)
	public Activity_IF[] ActivityBySportID(@PathVariable("sportID")int sportid) {
		return actservice.getActivityBySportID(sportid);
	}
}
