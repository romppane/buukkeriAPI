package main.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.stereotype.Repository;

import main.entity.User;
import main.entity.User_IF;

@Repository
public class UserDAO extends DAO implements UserDAO_IF {
	/** Luo käyttäjän tietokantaan
	 * @param user luotavan käyttäjän tiedot
	 * @return false jos luonti epäonnistuu true jos luonti on onnistunut
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
	//Changes password for User.
	/** Käyttäjän tietojen päivitys
	 * @param user käyttäjän tiedot
	 * @return false jos päivitys ei onnistu true jos päivitys onnistuu
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
	//Deletes User for Password Email pair.
	/**poistaa käyttäjän tietokannasta
	 * @param user poistettavan käyttäjän tiedot
	 * @return false jos ei onnistu true jos onnistuu
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
	/**Returns user for certain unique email address and password
	 * @param email Email address of the searched user
	 * @param pass Password of the user
	 * @return returns a User
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
	public User_IF readUserByID(int id2) {
		User_IF user = null;
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Account where ID = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setInt(1, id2);
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
