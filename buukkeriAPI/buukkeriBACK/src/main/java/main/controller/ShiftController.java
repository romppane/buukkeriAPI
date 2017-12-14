package main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import main.entity.Shift;
import main.entity.Shift_IF;
import main.service.ShiftService;

/**
 * Controls the received REST API calls made for Shifts and maps them forward to service layer.
 * @author Ville
 *
 */
@RestController
@RequestMapping("/shifts")
public class ShiftController {

	@Autowired
	private ShiftService service;
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean createshift(@RequestBody Shift shift) {
		return service.createshift(shift);
	}
	@RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteshift(@RequestBody Shift shift) {
		return service.deleteshift(shift);
	}
	@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean updateshift(@RequestBody Shift shift) {
		return service.updateshift(shift);
	}
	@RequestMapping(value ="/id={id}" ,method = RequestMethod.GET)
	public Shift_IF getShiftByID(@PathVariable("id") int id) {
		return service.getShiftByID(id);
	}
	@RequestMapping(value ="/actid={id}" ,method = RequestMethod.GET)
	public Shift_IF[] getShiftByActID(@PathVariable("id") int id) {
		return service.getShiftByActID(id);
	}
	@RequestMapping(value ="/user_id={user_ID}" ,method = RequestMethod.GET)
	public Shift_IF[] readBookingsByUserId(@PathVariable("user_ID")int user_id) {
		return service.readBookingByUserId(user_id);
	}
}
