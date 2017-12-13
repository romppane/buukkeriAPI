package main.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import main.entity.SP;
import main.entity.SP_IF;

/**
 * This class consists of CRUD methods for SP class objects.
 * Class is a subclass of an abstract DAO.
 * 
 * 
 * @author Roni, Ville
 *
 */
@Repository
public class SPDAO extends DAO implements SPDAO_IF {
	/**
	 * Creates an Service Provider object to the database by inserting the object without an ID.
	 * @param sp the SP to be added to the database.
	 * @return true if the SP was successfully added to the database, false if something went wrong.
	 */
	@Override
	public boolean createSP(SP_IF sp) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "insert ignore into Service_Provider values(default,?, ?, ?, ?);";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(1, sp.getName());
			myStatement.setString(2, sp.getPassword());
			myStatement.setString(3, sp.getEmail());
			myStatement.setString(4, sp.getPhone());
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
			System.out.println("Dublicated Email or Phone");
			return false;
		}
		else{
			System.out.println("SP has been created");
			return true;
		}
	}

	/**
	 * Changes Service Provider password by comparing Email values.
	 * @param sp the Sevice Provider who's password will be changed in the database.
	 * @return true if the SP was successfully manipulated, false if something went wrong.
	 */
	@Override
	public boolean updateSP(SP_IF sp) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "update Service_Provider set Password = ? where Email = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(1, sp.getPassword());
			myStatement.setString(2, sp.getEmail());
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
	 * Deletes an existing Service Provider from the database by comparing ID values.
	 * @param sp the Service Provider object which will be deleted from the database.
	 * @return true if the SP was successfully manipulated, false if something went wrong.
	 */
	@Override
	public boolean deleteSP(SP_IF sp) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "delete from Service_Provider where Email = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(1, sp.getEmail());
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
	 * Fetches all Service Providers from the database.
	 * @return SP_IF[] with all Service Providers from the database.
	 */
	@Override
	public SP_IF[] readSPs() {
		ArrayList<SP_IF> providers = new ArrayList();
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Service_Provider";
			myStatement = myCon.prepareStatement(sqlSelect);
			myRs = myStatement.executeQuery();

			while(myRs.next()) {
				int id = myRs.getInt("ID");
				String name = myRs.getString("Name");
				String password = myRs.getString("Password");
				String email = myRs.getString("Email");
				String phone = myRs.getString("Phone");

				SP sp = new SP(id, name, password, email, phone);
				providers.add(sp);
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

		SP_IF[] palautus = new SP[providers.size()];
		return (SP_IF[])providers.toArray(palautus);
	}

	/**
	 * Fetches a Service Provider for email, password pair.
	 * @param email Email of the Service Provider
	 * @param pass Password of the Service Provider
	 * @return a specific Service Provider with the right email, password combination.
	 */
	@Override
	public SP_IF readSP(String email, String pass) {
		SP_IF provider = null;
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Service_Provider where Email = ? AND Password = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setString(1, email);
			myStatement.setString(2, pass);
			myRs = myStatement.executeQuery();

			if(myRs.next()) {
				int id = myRs.getInt("ID");
				String name = myRs.getString("Name");
				String password = myRs.getString("Password");
				String Email = myRs.getString("Email");
				String phone = myRs.getString("Phone");

				provider = new SP(id, name, password, Email, phone);
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

		return provider;
	}

}
