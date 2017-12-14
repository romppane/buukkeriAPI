package main.service;

import main.dao.UserDAO_IF;
import main.entity.User_IF;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Routes the REST api calls made to UserController to UserDAO.
 * @author Ville
 *
 */
@Service
public class UserService {
	@Autowired
	private UserDAO_IF userdao;
	
 public User_IF getUser(String email, String pass) { 
	 return this.userdao.readUser(email, pass);
 }
 public boolean createUser(User_IF user) {
	 return this.userdao.createUser(user);
 }
 public boolean updateUser(User_IF user) {
	 return this.userdao.updateUser(user);
 }
 public boolean deleteUser(User_IF user) {
	 return this.userdao.deleteUser(user);
 }
public User_IF getUser(int id) {
	return this.userdao.readUserByID(id);
}
}
