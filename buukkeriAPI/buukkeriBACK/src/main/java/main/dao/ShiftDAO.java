package main.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import main.entity.Shift;
import main.entity.Shift_IF;


/**
 * This class consists of CRUD methods for Shift class objects.
 * Class is a subclass of an abstract DAO.
 * 
 * 
 * @author Roni, Ville
 *
 */
@Repository
public class ShiftDAO extends DAO implements ShiftDAO_IF{
	/**
	 * Creates an Shift object to the database by inserting the object without an ID.
	 * @param shift the Shift to be added to the database.
	 * @return true if the Shift was successfully added to the database, false if something went wrong.
	 */
	public boolean createShift(Shift_IF shift) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "insert ignore into Shift values(default, ?, ?, ?, ?, default);";
			myStatement = myCon.prepareStatement(query);
			myStatement.setString(2, shift.getShift_time());
			myStatement.setDouble(3, shift.getPrice());
			myStatement.setInt(1, shift.getActivityid());
			myStatement.setString(4, shift.getShift_date());
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
	 * Books a Shift for a User.
	 * @param shift the Shift to be manipulated.
	 * @return true if the Shift was successfully manipulated, false if something went wrong.
	 */
	public boolean updateShift(Shift_IF shift) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "update Shift set User_ID = ? where ID = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setDouble(1, shift.getUserId());
			myStatement.setInt(2, shift.getId());
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
	 * Deletes an existing Shift by comparing the ID values between the object and database data.
	 * @param shift the Shift to be removed.
	 * @return true if the Shift was successfully removed, false if something went wrong.
	 */
	public boolean deleteShift(Shift_IF shift) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "delete from Shift where ID = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setInt(1, shift.getId());
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
	 * Fetches all Shifts that belong to a certain Activity.
	 * @param act_id ID number of the searched Activity.
	 * @return Shift_IF[] that contains all the Shifts that belong to the Activity.
	 */
	@Override
	public Shift_IF[] readActivityShifts(int act_id) {
		ArrayList<Shift_IF> shifts = new ArrayList();
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Shift where Activity_ID = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setInt(1, act_id);
			myRs = myStatement.executeQuery();

			while(myRs.next()) {
				int id = myRs.getInt("ID");
				int activityid = myRs.getInt("Activity_ID");
				float price = myRs.getFloat("Price");
				String stime = myRs.getString("Shift_Time");
				String sdate = myRs.getString("Shift_Date");
				int userid = myRs.getInt("User_ID");

				Shift_IF shift = new Shift(id, stime, sdate, price, activityid, userid);
				shifts.add(shift);
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

		Shift_IF[] ret = new Shift[shifts.size()];
		return (Shift_IF[])shifts.toArray(ret);
	}

	// .
	
	/**
	 * Fetches a Shift by ID
	 * @param ID number of the shift
	 * @return a Shift object
	 */
	@Override
	public Shift_IF readShiftById(int ID) {
		Shift_IF shift = null;
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Shift where ID = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setInt(1, ID);
			myRs = myStatement.executeQuery();

			while(myRs.next()) {
				int id = myRs.getInt("ID");
				int activityid = myRs.getInt("Activity_ID");
				float price = myRs.getFloat("Price");
				String stime = myRs.getString("Shift_Time");
				String sdate = myRs.getString("Shift_Date");
				int userid = myRs.getInt("User_ID");

				shift = new Shift(id, stime, sdate, price, activityid, userid);
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

		return shift;
	}
	
	/**
	 * Fetches all Shifts booked by a specific User by comparing the User ID values.
	 * @param user_id ID number of the user who is searching.
	 * @return Shift_IF[] of User's bookings.
	 */
	@Override
	public Shift_IF[] readBookingsByUserId(int user_id) {
		ArrayList<Shift_IF> shifts = new ArrayList();
		PreparedStatement myStatement = null;
		ResultSet myRs = null;

		try{
			String sqlSelect = "Select * from Shift where User_ID = ?";
			myStatement = myCon.prepareStatement(sqlSelect);
			myStatement.setInt(1, user_id);
			myRs = myStatement.executeQuery();

			while(myRs.next()) {
				int id = myRs.getInt("ID");
				int activityid = myRs.getInt("Activity_ID");
				float price = myRs.getFloat("Price");
				String stime = myRs.getString("Shift_Time");
				String sdate = myRs.getString("Shift_Date");
				int userid = myRs.getInt("User_ID");

				Shift_IF shift = new Shift(id, stime, sdate, price, activityid, userid);
				shifts.add(shift);
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

		Shift_IF[] ret = new Shift[shifts.size()];
		return (Shift_IF[])shifts.toArray(ret);
	}

	/**
	 * Removes the reservation made to the Shift.
	 * @param shift the Shift to be manipulated.
	 * @return true if the Shift was successfully manipulated, false if something went wrong.
	 */
	public boolean unbookShift(Shift_IF shift) {
		PreparedStatement myStatement = null;
		String query = null;
		int count = 0;
		try{
			query = "update Shift set User_ID = NULL where ID = ?";
			myStatement = myCon.prepareStatement(query);
			myStatement.setInt(1, shift.getId());
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



}
