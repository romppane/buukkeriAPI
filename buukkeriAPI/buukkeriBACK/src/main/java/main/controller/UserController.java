package main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import main.entity.User;
import main.entity.User_IF;
import main.service.UserService;

/**
 * Controls the received REST API calls made for Users and maps them forward to service layer.
 * @author Ville
 *
 */
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value ="/{email}&{pass}" ,method = RequestMethod.GET)
	public User_IF getUser(@PathVariable("email")String email,@PathVariable("pass") String pass) {
		return userService.getUser(email, pass);
	}
	@RequestMapping(value ="/id={id}" ,method = RequestMethod.GET)
	public User_IF getUserByID(@PathVariable("id")int id) {
		return userService.getUser(id);
	}
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean createuser(@RequestBody User user) {
		return userService.createUser(user);
	}
	@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean userupdate(@RequestBody User user) {
		return userService.updateUser(user);
	}
	@RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean userdelete(@RequestBody User user) {
		return userService.deleteUser(user);
	}
	
	

}
