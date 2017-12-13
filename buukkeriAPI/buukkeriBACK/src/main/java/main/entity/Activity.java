package main.entity;
/**
 * Activity Object
 * @author Roni, Tommi, Marika, Ville
 * 
 */

public class Activity implements Activity_IF{
    private int id;
    private String name;
    private int spid;
    private int sportid;
	private String location;
    private String description;

/**
 * Constructor
 */
    public Activity() {
    }
/**
 * Constructor with parameters
 * @param name Name
 * @param spid Service_Provider ID from database
 * @param location Location of activity
 * @param description Description of activity
 */
    public Activity(String name, int spid,int sportid, String location, String description) {
        this.name = name;
        this.spid = spid;
        this.location = location;
        this.description = description;
        this.sportid = sportid;
    }
/**
 * Constructor with parameters
 * @param id ID number
 * @param name Name
 * @param spid Service_Provider ID from database
 * @param location Location of activity
 * @param description Description of activity
 */
    public Activity(int id, String name, int spid,int sportid, String location, String description) {
        this.id = id;
        this.name = name;
        this.spid = spid;
        this.location = location;
        this.description = description;
        this.sportid = sportid;
    }
    /**
     * Getter for ID number
     * @return id
     */
    public int getId() {
        return id;
    }
    /**Getter for name
     * @return name
     */
    public String getName() {
        return name;
    }
    /**Setter for name
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }
    /**Getter for service provider ID
     * @return spid
     */
    public int getSpid() {
        return spid;
    }
    /**Setter for service provider ID
     * @param spid
     */
    public void setSpid(int spid) {
        this.spid = spid;
    }
    /**Getter for location
     * @return location
     */
    public String getLocation() {
        return location;
    }
    /**Setter for location
     * @param location
     */
    public void setLocation(String location) {
        this.location = location;
    }
    /**Getter for description
     * @return description
     */
    public String getDescription() {
        return description;
    }
    /**Setter for description
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }
    /**
     * Getter for sportID
     * @return sportid
     */
    public int getSportid() {
		return sportid;
	}
    /**
     * Setter for sportID
     * @param sportid
     */
	public void setSportid(int sportid) {
		this.sportid = sportid;
	}


}
