package tests;
/**
 * @ronim
 */

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import main.dao.UserDAO;
import main.dao.UserDAO_IF;
import main.entity.User;
import main.entity.User_IF;

public class UserTests {
	
	private UserDAO_IF userDAO;
	private User_IF user;
	
	@Before
	public void init() {
		userDAO = new UserDAO();
		user = new User("Kalle", "Kalamies", "Seppo666", "666-1234567", "Kalle.Kalamies@metropolia.fi");
		assertTrue("createUser(): Adding user to database was not successful.",userDAO.createUser(user));
	}
	
	@After
	public void end() {
		// Deleting test user should happen
		assertTrue("deleteUser(): Removing User was not successful.",
				userDAO.deleteUser(user));
		assertTrue("deleteUser(): Removing User was not successful - User was still in database.",
				userDAO.readUser(user.getEmail(), user.getPassword()) == null);
	}
	
	@Test
	public void testUpdate() {
		user = userDAO.readUser(user.getEmail(), user.getPassword());
		
		String tempEmail = user.getEmail();
		String tempPass = user.getPassword();
		
		user.setEmail("testattava.email@LUT.fi");
		user.setPassword("testisalasana");
		
		assertFalse("UserDAO: updating database should have not been possible, but it was.",
				userDAO.updateUser(user));
		
		user.setEmail(tempEmail);
		assertTrue("Updating User was not possible, but it should have been", userDAO.updateUser(user));
		
		User_IF tempuser = null;
		assertEquals("readUserById(): Reading user by id did not return the same user", (tempuser = userDAO.readUserByID(user.getId())).getPhone(),user.getPhone());

		user = tempuser;

		
		assertEquals("readUser(): Email is not correct.",
				"Kalle.Kalamies@metropolia.fi", user.getEmail());
		assertEquals("readUser(): Firstname is not correct.",
				"Kalle", user.getFname());
		assertEquals("readUser(): Lastname is not correct.",
				"Kalamies", user.getLname());
		assertEquals("readUser(): Phone number is not correct.",
				"666-1234567", user.getPhone());
		assertEquals("readUser(): Password is not correct.",
				"testisalasana", user.getPassword());
	}
	
	@Test
	public void testCreate() {
		User_IF duplicate = userDAO.readUser(user.getEmail(), user.getPassword());
		
		assertFalse("UserDAO: adding duplicate user was possible!",
				userDAO.createUser(duplicate));
		
		
	}
	
	@Test
	public void testRemove() {
		User_IF ghost = new User("Haamu", "Haahuilija", "Hahaa", "888-8888888", "haamu.haahuilija@metropolia.fi");
		assertFalse("UserDAO: deleting ghost user was possible.", userDAO.deleteUser(ghost));
	}
	
	
	

}
