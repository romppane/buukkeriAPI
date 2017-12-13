package main.entity;

/**
 * Sport Object
 * @author Roni
 *
 */
public class Sport implements Sport_IF {
	private int ID;
	private String name;
	
	/**
	 * Constructor for a Sport
	 * @param name the name of the sport
	 */
	public Sport(String name) {
		this.name = name;
	}
	
	/**
	 * Empty Constructor for a Sport
	 */
	public Sport() {
		
	}

	/**
	 * Constructor for a Sport
	 * @param iD the ID of the sport
	 * @param name the name of the sport
	 */
	public Sport(int iD, String name) {
		ID = iD;
		this.name = name;
	}


	/**
	 * @return ID of the sport
	 */
	public int getID() {
		return ID;
	}



	/**
	 * @return name of the sport
	 */
	public String getName() {
		return name;
	}
	
	
	

}
