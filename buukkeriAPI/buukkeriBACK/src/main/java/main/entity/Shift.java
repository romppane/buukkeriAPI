package main.entity;
/**
 * Shift Object
 * @author Roni, Tommi, Marika, Ville
 *
 */
public class Shift implements Shift_IF {
	private int id;
	private String Shift_time;
	private String Shift_date;
	private double price;
	private int activityid;
	private int userid;

	/**
	 * Empty Constructor
	 */
	public Shift() {

	}
	/**
	 * Constructor with parameters
	 * @param shift_time Time of the shift
	 * @param shift_date The date of the shift
	 * @param price Price of the shift
	 * @param activityid ID number of activity
	 */
	public Shift(String shift_time,String shift_date, double price, int activityid) {
		this.Shift_time = shift_time;
		this.Shift_date = shift_date;
		this.price = price;
		this.activityid = activityid;
	}
	/**
	 * Constructor with parameters
	 * @param id ID number of the shift
	 * @param shift_time Time of the shift
	 * @param shift_date The date of the shift
	 * @param price Price of the shift
	 * @param activityid ID number of activity
	 * @param userid ID number of the user this shift belongs to
	 */
	
	public Shift(int id, String shift_time, String shift_date, double price, int activityid, int userid) {
		this.id = id;
		Shift_time = shift_time;
		Shift_date = shift_date;
		this.price = price;
		this.activityid = activityid;
		this.userid = userid;
	}
	/**
	 * @return returns the ID number of Shift
	 */
	public int getId() {
		return id;
	}
	/**
	 * @return Shift_time returns Shift time
	 */
	public String getShift_time() {
		return Shift_time;
	}
	/**
	 * @param shift_time sets a time for a shift
	 */
	public void setShift_time(String shift_time) {
		Shift_time = shift_time;
	}
	/**
	 * @return price returns the price of a shift
	 */
	public double getPrice() {
		return price;
	}
	/**
	 * @param price sets a new price for a shift
	 */
	public void setPrice(double price) {
		this.price = price;
	}
	/**
	 * @return activityid returns the ID number of the activity
	 */
	public int getActivityid() {
		return activityid;
	}
	
	/**
	 * @return Shift's date attribute.
	 */
	public String getShift_date() {
		return Shift_date;
	}
	
	/**
	 * @param shift_date sets the shift date
	 */
	public void setShift_date(String shift_date) {
		Shift_date = shift_date;
	}
	/**
	 * @return User's ID of the User who booked the shift
	 */
	public int getUserId() {
		return userid;
		
	}
	/**
	 * @param userid books a shift for a user.
	 */
	public void setUserId(int userid) {
		this.userid = userid;
	}

}
