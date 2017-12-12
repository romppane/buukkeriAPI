package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import main.dao.SPDAO;
import main.dao.SPDAO_IF;
import main.entity.SP;
import main.entity.SP_IF;

public class SPTests {
	
	private SPDAO_IF spDAO;
	private SP_IF sp;
	
	@Before
	public void init() {
		spDAO = new SPDAO();
		sp = new SP("Korporaatio", "passu555", "Korpo.Raatio@metropolia.fi", "666-7777777");
		assertTrue("createSP(): Adding service provider to database was not successful.",spDAO.createSP(sp));
	}
	
	@After
	public void end() {
		// Deleting test user should happen
		assertTrue("deleteSP(): Removing Service provider was not successful.",
				spDAO.deleteSP(sp));
		assertTrue("deleteSP(): Removing Service provider was not successful - User was still in database.",
				spDAO.readSP(sp.getEmail(), sp.getPassword()) == null);
	}
	
	@Test
	public void testUpdate() {
		sp = spDAO.readSP(sp.getEmail(), sp.getPassword());
		sp.setName("Vaihtonimi");
		sp.setPhone("555-5555555");
		
		assertTrue("SPDAO: updating database was not successful.",
				spDAO.updateSP(sp));
		
		String tempEmail = sp.getEmail();
		String tempPass = sp.getPassword();
		
		sp.setEmail("testattava.email@LUT.fi");
		sp.setPassword("testisalasana");
		
		assertFalse("SPDAO: updating database should have not been possible, but it was.",
				spDAO.updateSP(sp));
		
		sp.setEmail(tempEmail);
		sp.setPassword(tempPass);
		
		assertEquals("readSP(): Email is not correct.",
				"Korpo.Raatio@metropolia.fi", sp.getEmail());
		assertEquals("readSP(): Service provider name is not correct.",
				"Vaihtonimi", sp.getName());
		assertEquals("readSP(): Phone number is not correct.",
				"555-5555555", sp.getPhone());
		assertEquals("readSP(): Password is not correct.",
				"passu555", sp.getPassword());
		SP_IF[] sps = null;
		SP_IF tempsp = null;
		assertTrue("readSPs(): Reading all Serice Providers returned empty set", (sps = spDAO.readSPs()).length> 0);
		System.out.println(sps.length);
		for (int i = 0; i<sps.length; i++) {
			if(sps[i].getEmail().equals(sp.getEmail())) {
				tempsp = sps[i];
				System.out.println("SP Found");
			}
		}
		assertEquals("readSPs(): Reading all Service Providers has wrong information in them", tempsp.getId(), sp.getId());
	}
	
	@Test
	public void testCreate() {
		SP_IF duplicate = spDAO.readSP(sp.getEmail(), sp.getPassword());
		
		assertFalse("SPDAO: adding duplicate service provider was possible!",
				spDAO.createSP(duplicate));
		
		
	}
	
	@Test
	public void testRemove() {
		SP_IF ghost = new SP("Haamupulju", "Hahaa", "888-8888888", "haamu.haahuilija@metropolia.fi");
		assertFalse("SPDAO: deleting ghost service provider was possible.", spDAO.deleteSP(ghost));
	}

}
