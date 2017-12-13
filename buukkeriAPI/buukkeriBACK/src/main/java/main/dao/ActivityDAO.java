package main.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import main.entity.Activity;
import main.entity.Activity_IF;

/**
 * This class consists of CRUD methods for Activity class objects.
 * Class is a subclass of an abstract DAO.
 * 
 * 
 * @author Roni, Ville
 *
 */
@Repository
public class ActivityDAO extends DAO implements ActivityDAO_IF {
	/**
	 * Creates an Activity object to the database by inserting the object without an ID.
	 * @param act the Activity to be added to the database.
	 * @return true if the Activity was successfully added to the database, false if something went wrong.
	 */
	@Override
	public boolean createActivity(Activity_IF act) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "insert ignore into Activity values(default,?, ?, ?, ?,?);";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(1, act.getName());
			myStatement.setInt(2, act.getSpid());
			myStatement.setString(3, act.getLocation());
			myStatement.setString(4, act.getDescription());
			myStatement.setInt(5, act.getSportid());
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
	 * Sets an existing Activity's location to a new one, by comparing the ID values between the object and database data.
	 * @param act the Activity to be manipulated.
	 * @return true if the Activity was successfully manipulated, false if something went wrong.
	 */
	@Override
	public boolean updateActivity(Activity_IF act) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "update Activity set Location = ? where ID = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(1, act.getLocation());
			myStatement.setInt(2,act.getId());
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
	 * Deletes an existing Activity by comparing the ID values between the object and database data.
	 * @param act the Activity to be removed.
	 * @return true if the Activity was successfully removed, false if something went wrong.
	 */
	@Override
	public boolean deleteActivity(Activity_IF act) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "delete from Activity where ID = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setInt(1, act.getId());
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
	 * Fetches all Activities which belong to a certain Service Provider from the database, by comparing SPID values.
	 * @param sp_id Target Service Provider's ID value.
	 * @return Activity_IF[] with all Activities that belong to the Service Provider.
	 */
	@Override
	public Activity_IF[] readActivitiesBySPId(int sp_id) {
		ArrayList<Activity_IF> activities = new ArrayList();
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Activity where SP_ID = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setInt(1, sp_id);
			myRs = myStatement.executeQuery();

			while(myRs.next()) {
				int id = myRs.getInt("ID");
				String name = myRs.getString("Name");
				int SP_ID = myRs.getInt("SP_ID");
				int sportID = myRs.getInt("Sport_ID");
				String location = myRs.getString("Location");
				String description = myRs.getString("Description");

				Activity_IF act = new Activity(id,name,SP_ID,sportID,location,description);
				activities.add(act);
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

		Activity_IF[] palautus = new Activity[activities.size()];
		return (Activity_IF[])activities.toArray(palautus);
	}
	
	/** 
	 * Fetches all Activities which belong to a certain Sport category from the database, by comparing Sport ID values.
	 * @param sport_id Target Sport's ID value.
	 * @return Activity_IF[] with all Activities that belong to the Sport category.
	 */
	public Activity_IF[] readActivitiesBySportID(int sport_id) {
		ArrayList<Activity_IF> activities = new ArrayList();
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Activity where Sport_ID = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setInt(1, sport_id);
			myRs = myStatement.executeQuery();

			while(myRs.next()) {
				int id = myRs.getInt("ID");
				String name = myRs.getString("Name");
				int SP_ID = myRs.getInt("SP_ID");
				int sportID =myRs.getInt("Sport_ID");
				String location = myRs.getString("Location");
				String description = myRs.getString("Description");

				Activity_IF act = new Activity(id,name,SP_ID,sportID,location,description);
				activities.add(act);
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

		Activity_IF[] palautus = new Activity[activities.size()];
		return (Activity_IF[])activities.toArray(palautus);
	}
	
	/** 
	 * Fetches an Activity by an ID value.
	 * @param ID Target Activity's ID value.
	 * @return Activity_IF which has the inserted ID value.
	 */
	@Override
	public Activity_IF readActivityById(int ID) {
		PreparedStatement myStatement = null;
		ResultSet myRs = null;
		Activity_IF act = null;

		try{
			String sqlSelect = "Select * from Activity where ID = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setInt(1, ID);
			myRs = myStatement.executeQuery();

			while(myRs.next()) {
				int id = myRs.getInt("ID");
				String name = myRs.getString("Name");
				int SP_ID = myRs.getInt("SP_ID");
				int sportID =myRs.getInt("Sport_ID");
				String location = myRs.getString("Location");
				String description = myRs.getString("Description");

				act = new Activity(id,name,SP_ID,sportID,location,description);
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
		return act;
	}

	/** 
	 * Fetches all Activities from the database.
	 * @return Activity_IF[] with all Activities that are in the database.
	 */
	@Override
	public Activity_IF[] readActivities() {
		ArrayList<Activity_IF> activities = new ArrayList();
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Activity";
			myStatement = myCon.prepareStatement(sqlSelect);
			myRs = myStatement.executeQuery();

			while(myRs.next()) {
				int id = myRs.getInt("ID");
				String name = myRs.getString("Name");
				int sp_id = myRs.getInt("SP_ID");
				int sportID =myRs.getInt("Sport_ID");
				String location = myRs.getString("Location");
				String description = myRs.getString("Description");

				Activity_IF act = new Activity(id,name,sp_id,sportID,location,description);
				activities.add(act);
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

		Activity_IF[] palautus = new Activity[activities.size()];
		return (Activity_IF[])activities.toArray(palautus);
	}
}
