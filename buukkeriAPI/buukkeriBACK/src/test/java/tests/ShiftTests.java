package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import main.dao.ActivityDAO;
import main.dao.ActivityDAO_IF;
import main.dao.SPDAO;
import main.dao.SPDAO_IF;
import main.dao.ShiftDAO;
import main.dao.ShiftDAO_IF;
import main.dao.SportDAO;
import main.dao.SportDAO_IF;
import main.dao.UserDAO;
import main.dao.UserDAO_IF;
import main.entity.Activity;
import main.entity.Activity_IF;
import main.entity.SP;
import main.entity.SP_IF;
import main.entity.Shift;
import main.entity.Shift_IF;
import main.entity.Sport;
import main.entity.Sport_IF;
import main.entity.User;
import main.entity.User_IF;

public class ShiftTests {
	private static SportDAO_IF sportDAO;
	private static Sport_IF sport;
	private static SP_IF sp;
	private static SPDAO_IF spDAO;
	private static Activity_IF act;
	private static ActivityDAO_IF actDAO;
	private static Shift_IF shift;
	private static ShiftDAO_IF shiftDAO;
	private static User_IF user;
	private static UserDAO_IF userDAO;
	
	@BeforeClass
	public static void init() {
		userDAO = new UserDAO();
		user = new User("Kalle", "Kalamies", "Seppo666", "666-1234567", "Kalle.Kalamies@metropolia.fi");
		assertTrue("createUser(): Adding user to database was not successful.",userDAO.createUser(user));
		assertTrue("readUser(): Reading user has failed",(user = userDAO.readUser(user.getEmail(), user.getPassword())).getFname() != null);
		
		sp = new SP("Testi Pulju OY", "tests1234", "testi.pulju@test.fi", "0007878987");
		spDAO = new SPDAO();
		
		assertTrue("SPDAO: creating test SP failed.",spDAO.createSP(sp));
		
		assertTrue("SPDAO: reading test SP has failed.", (sp = spDAO.readSP(sp.getEmail(), sp.getPassword())) != null);
		sportDAO = new SportDAO();
		sport = new Sport("Ringette");
		
		assertTrue("SportDAO: creating test Sport has failed.", sportDAO.newsport(sport));
		
		Sport_IF[] sports = sportDAO.getSports();
		int index = 0;
		for(int i = 0; i<sports.length; i++) {
			if(sports[i].getName().equals(sport.getName())) {
				sport = sports[i];
				index = i;
			}
		}
		assertEquals("SportDAO: finding test Sport was not successful",sport.getID(),sports[index].getID());
		
		
		act = new Activity("Käpylän avoin ringette jää", sp.getId(),sport.getID(), "Käpylän jääkenttä", "Kaikille avoin ringette vuoro, tervetuloa pelaamaan!");
		actDAO = new ActivityDAO();
		assertTrue("ActivityDAO: adding test Activity has failed", actDAO.createActivity(act));
		Activity_IF[] acts = actDAO.readActivitiesBySPId(sp.getId());
		for(int i = 0; i<acts.length; i++) {
			if(acts[i].getName().equals(act.getName())) {
				act = acts[i];
				index = i;
			}
		}
		
		String day = "23.12.2017";
		String time ="10:00 - 11:00";
		assertEquals("ActivityDAO: finding test Activity was not successful", act.getId(), acts[index].getId());
		shift = new Shift(time, day, 20.00, act.getId());
		shiftDAO = new ShiftDAO();
		System.out.println(shift.getActivityid());
		System.out.println(shift.getPrice());
		System.out.println(shift.getShift_date());
		System.out.println(shift.getShift_time());
		assertTrue("ShiftDAO: Adding a test Shift failed!",shiftDAO.createShift(shift) );
		Shift_IF[] shifts = null;
		assertTrue("ShiftDAO: reading activity shifts has returned empty set",(shifts = shiftDAO.readActivityShifts(shift.getActivityid())).length > 0);
		for(int i = 0; i<shifts.length; i++) {
			if(shifts[i].getShift_date().equals(day) && shifts[i].getShift_time().equals(time)) {
				shift = shifts[i];
			}
		}
	}
	
	@AfterClass
	public static void end() {
		assertTrue("ShiftDAO: deleting test Shift has failed.", shiftDAO.deleteShift(shift));
		assertTrue("ActivityDAO: deleting test Activity has failed.", actDAO.deleteActivity(act));
		assertTrue("SportDAO: deleting test sport has failed.", sportDAO.delsport(sport));
		assertTrue("SPDAO: deleting test Service Provider has failed.",spDAO.deleteSP(sp));
		assertTrue("deleteUser(): Removing User was not successful.",
				userDAO.deleteUser(user));
	}
	
	@Test
	public void testBooking() {
		shift.setUserId(user.getId());
		assertTrue("UpdateShift: Updating user_id to shift has failed!",shiftDAO.updateShift(shift));
		Shift_IF tempshift = null;
		
		assertEquals("readShiftById(): Fetching a shift by it's ID has returned a wrong shift",(tempshift = shiftDAO.readShiftById(shift.getId())).getId(), shift.getId());
		shift = tempshift;
		
		Shift_IF[] bookings = null;
		assertTrue("readBookingsByUserId(): Fetching a booked shifts for the user has returned empty set",((bookings = shiftDAO.readBookingsByUserId(user.getId())).length>0));
		int index = 0;
		for(int i = 0; i<bookings.length; i++) {
			if(bookings[i].getId() == shift.getId()) {
				System.out.println("Booked shift has been found");
				index = i;
			}
		}
		assertEquals("Booked shift was not found from the database when looking for it",bookings[index].getId(), shift.getId());
		assertTrue("unbookShift: Unbooking a shift has failed!", shiftDAO.unbookShift(shift));
		assertTrue("User was not able to make the reservation again!",shiftDAO.updateShift(shift));
	}
	
}
