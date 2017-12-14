package main.entity;

/**
 *User Object
 * @author Roni, Tommi, Marika, Ville
 *
 */
public class User implements User_IF  {
	private int id;
	private String fname;
	private String lname;
	private String password;
	private String phone;
	private String email;

/**
 * Empty Constructor
 */
	public User() {

	}

/**
 * Constructor with parameters
 * @param fname First name
 * @param lname Last name
 * @param password Password
 * @param phone Telephone number
 * @param email Email address
 */
	public User (String fname, String lname, String password, String phone, String email) {
		this.fname = fname;
		this.lname = lname;
		this.password = password;
		this.phone = phone;
		this.email = email;

	}
	/**
	 * Constructor with parameters
	 * @param id ID number
	 * @param fname First name
	 * @param lname Last name
	 * @param password Password
	 * @param phone Telephone number
	 * @param email Email address
	 */
	public User(int id, String fname, String lname, String password, String phone, String email) {
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.password = password;
		this.phone = phone;
		this.email = email;
	}

/**Getter for User ID
 * @return id
 */
	public int getId() {
		return id;
	}
	/**First name getter
	 * @return fname
	 */
	public String getFname() {
		return fname;
	}
	/**First name setter
	 * @param fname First name
	 */
	public void setFname(String fname) {
		this.fname = fname;
	}
	/**Getter for last name
	 * @return lname Last name
	 */
	public String getLname() {
		return lname;
	}
	/**Setter for last name
	 * @param lname Last name
	 */
	public void setLname(String lname) {
		this.lname = lname;
	}
	/**Getter for password
	 *  @return password Password
	 */
	public String getPassword() {
		return password;
	}
	/**Setter for password
	 * @param password Password
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**Getter for phone number
	 * @return phone Phone number
	 */
	public String getPhone() {
		return phone;
	}
	/**Setter for phone number
	 * @param phone Phone number
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	/**Getter for Email
	 * @return email Email Address
	 */
	public String getEmail() {
		return email;
	}
	/**Setter for Email
	 * @param email Email Address
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	}

