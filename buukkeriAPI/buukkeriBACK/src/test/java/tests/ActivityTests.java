package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import main.dao.ActivityDAO;
import main.dao.ActivityDAO_IF;
import main.dao.SPDAO;
import main.dao.SPDAO_IF;
import main.dao.SportDAO;
import main.dao.SportDAO_IF;
import main.entity.Activity;
import main.entity.Activity_IF;
import main.entity.SP;
import main.entity.SP_IF;
import main.entity.Sport;
import main.entity.Sport_IF;

public class ActivityTests {
	
	private static SportDAO_IF sportDAO;
	private static Sport_IF sport;
	private static SP_IF sp;
	private static SPDAO_IF spDAO;
	private static Activity_IF act;
	private static ActivityDAO_IF actDAO;
	
	@BeforeClass
	public static void init() {
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
		
		assertEquals("ActivityDAO: finding test Activity was not successful", act.getId(), acts[index].getId());
	}
	
	@AfterClass
	public static void end() {
		assertTrue("ActivityDAO: deleting test Activity has failed.", actDAO.deleteActivity(act));
		assertTrue("SportDAO: deleting test sport has failed.", sportDAO.delsport(sport));
		assertTrue("SPDAO: deleting test Service Provider has failed.",spDAO.deleteSP(sp));
		
	}
	
	@Test
	public void testReadMethods() {
		Activity_IF temp = null;
		Activity_IF test = null;
		Activity_IF[] acts = null;
		temp = actDAO.readActivityById(act.getId());
		System.out.println(temp.getName());
		System.out.println(act.getName());
		assertTrue("ActivityDAO: reading a single Activity by ID failed",temp.getId() == act.getId());
		assertTrue("ActivityDAO: reading all activities from the database has failed.", (acts = actDAO.readActivities()) != null && acts.length>0);
		for(int i = 0; i<acts.length; i++) {
			if(acts[i].getId() == temp.getId()) {
				test = temp;
			}
		}
		System.out.println(acts.length);
		assertTrue("ActivityDAO: test Activity was not found readByID", test.getId() == temp.getId());
		assertTrue("ActivityDAO: reading all activities from the database has failed.", (acts = actDAO.readActivitiesBySportID(act.getId())) != null);
		for(int i = 0; i<acts.length; i++) {
			if(acts[i] == temp) {
				test = temp;
			}
		}
		assertTrue("ActivityDAO: test Activity was not found from by reading with Sport_ID", test.getId() == temp.getId());
	}
	
	@Test
	public void testCRUD() {
		String name = "Käpylän suljettu ringette vuoro";
		Activity_IF temp = new Activity(name, sp.getId(),sport.getID(), "Käpylän jääkenttä", "Maksu SPn tilille, tervetuloa pelaamaan!");
		Activity_IF[] acts = null;
		assertTrue("ActivityDAO: Adding temp Activity failed", actDAO.createActivity(temp));
		assertTrue("ActivityDAO: reading Activity by SP_ID has failed",((acts = actDAO.readActivitiesBySPId(temp.getSpid())) !=null ));
		assertTrue("ActivityDAO: error reading Activity by SP_ID",acts.length>0);
		for(int i = 0; i<acts.length; i++) {
			if(acts[i].getName().equals(name)) {
				temp = acts[i];
			}
		}
		name = "Vaihdettu Nimi";
		temp.setName(name);;
		assertTrue("ActivityDAO: Updating temp Activity failed", actDAO.updateActivity(temp));
		assertTrue("ActivityDAO: Deleting changed Activity failed", actDAO.deleteActivity(temp));
	}
	
	

}
