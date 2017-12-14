package main.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.stereotype.Repository;

import main.entity.User;
import main.entity.User_IF;

/**
 * This class consists of CRUD methods for User class objects.
 * Class is a subclass of an abstract DAO.
 * 
 * 
 * @author Roni, Ville
 *
 */
@Repository
public class UserDAO extends DAO implements UserDAO_IF {
	
	/**
	 * Creates a User object to the database by inserting the object without an ID.
	 * @param user the User to be added to the database.
	 * @return true if the User was successfully added to the database, false if something went wrong.
	 */
	@Override
	public boolean createUser(User_IF user) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "insert ignore into Account values(default,?, ?, ?, ?, ?);";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(1, user.getFname());
			myStatement.setString(2, user.getLname());
			myStatement.setString(3, user.getPassword());
			myStatement.setString(4, user.getEmail());
			myStatement.setString(5, user.getPhone());
			count = myStatement.executeUpdate();

		} catch(Exception e) {
			e.printStackTrace();
		} finally{
			try {
				if (myStatement != null)
					myStatement.close();
			}
			catch(Exception e){
				e.printStackTrace();
			}
		}
		if(count!=1){
			return false;
		}
		else{
			return true;
		}
	}
	/**
	 * Sets an existing User's password to a new one, by comparing the email address between the object and database data.
	 * @param user the User to be manipulated.
	 * @return true if the User was successfully manipulated, false if something went wrong.
	 */
	@Override
	public boolean updateUser(User_IF user) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "update Account set Password = ? where Email = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(1, user.getPassword());
			myStatement.setString(2, user.getEmail());
			count = myStatement.executeUpdate();
	}
		catch(Exception e) {
			e.printStackTrace();
		}
		finally{
			try {
				if (myStatement != null)
					myStatement.close();
			}
			catch(Exception e){
				e.printStackTrace();
			}
		}
		if(count!=1){
			return false;
		}
		else{
			return true;
		}
	}
	/**
	 * Deletes an existing User by comparing the email address between the object and database data.
	 * @param user the User to be removed.
	 * @return true if the User was successfully removed, false if something went wrong.
	 */
	@Override
	public boolean deleteUser(User_IF user) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "delete from Account where Email = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(1, user.getEmail());
			count = myStatement.executeUpdate();
		} catch(Exception e) {
			e.printStackTrace();
		}
		finally{
			try {
				if (myStatement != null)
					myStatement.close();
			}
			catch(Exception e){
				e.printStackTrace();
			}
		}
		if(count!=1){
			return false;
		}
		else{
			return true;
		}
	}
	/**
	 * Fetches a User for email address, password combination.
	 * @param email Email address of the searched user
	 * @param pass Password of the user
	 * @return the specific User who has the inserted email, password combination.
	 */
	@Override
	public User_IF readUser(String email, String pass) {
		User_IF user = null;
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Account where Email = ? AND Password = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setString(1, email);
			myStatement.setString(2, pass);
			myRs = myStatement.executeQuery();

			if(myRs.next()) {
				int id = myRs.getInt("ID");
				String fname = myRs.getString("Firstname");
				String lname = myRs.getString("Lastname");
				String pw = myRs.getString("Password");
				String Email = myRs.getString("Email");
				String phone = myRs.getString("Phone");

				user = new User(id, fname, lname, pw, phone, Email);
		}

		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			try {
				if (myRs != null)
					myRs.close();
				if (myStatement != null)
					myStatement.close();
			}
			catch(Exception e){
				e.printStackTrace();
			}
		}

		return user;
	}
	
	/** 
	 * Fetches a User by an ID value.
	 * @param  id Target User's ID value.
	 * @return the User object which has the inserted ID.
	 */
	public User_IF readUserByID(int id) {
		User_IF user = null;
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Account where ID = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setInt(1, id);
			myRs = myStatement.executeQuery();

			if(myRs.next()) {
				int ID = myRs.getInt("ID");
				String fname = myRs.getString("Firstname");
				String lname = myRs.getString("Lastname");
				String pw = myRs.getString("Password");
				String Email = myRs.getString("Email");
				String phone = myRs.getString("Phone");

				user = new User(ID, fname, lname, pw, phone, Email);
		}

		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			try {
				if (myRs != null)
					myRs.close();
				if (myStatement != null)
					myStatement.close();
			}
			catch(Exception e){
				e.printStackTrace();
			}
		}

		return user;
	}
}
