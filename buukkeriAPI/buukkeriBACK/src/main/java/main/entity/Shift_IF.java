package main.entity;

public interface Shift_IF {

	public int getId();

	public String getShift_time();

	public void setShift_time(String shift_time);

	public double getPrice();

	public void setPrice(double price);

	public int getActivityid();
	
	public String getShift_date();
	
	public void setShift_date(String shift_date);

	public int getUserId();

	public void setUserId(int userid);
}