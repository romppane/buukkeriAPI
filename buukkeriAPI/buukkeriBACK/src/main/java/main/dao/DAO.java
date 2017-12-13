package main.dao;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 * This is a abstract class which creates a database connection for it's subclasses.
 * 
 * 
 * @author Roni
 *
 */
public abstract class DAO {

	protected Connection myCon;

	/**
	 * Creates a database connection
	 */
	public DAO() {
		try {
			Class.forName("com.mysql.jdbc.Driver");

			myCon = DriverManager.getConnection("jdbc:mysql://localhost:2206/vuorot", "pena", "pena");
		} catch (Exception dBException) {
			System.err.print(dBException);
			System.err.println("Virhe tietokantayhteyden muodostamisessa.");
			System.exit(-1);
		}
	}
/**
 * Closes the database connection
 */
	@Override
	protected void finalize() {
		try {
			if (myCon != null)
				myCon.close();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}
