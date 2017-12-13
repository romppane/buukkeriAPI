package main.dao;

import main.entity.Shift_IF;

public interface ShiftDAO_IF {
	boolean createShift(Shift_IF shift);
	boolean updateShift(Shift_IF shift);
	boolean deleteShift(Shift_IF shift);
	boolean unbookShift(Shift_IF shift);
	Shift_IF[] readActivityShifts(int act_id);
	Shift_IF readShiftById(int ID);
	Shift_IF[] readBookingsByUserId(int user_id);

}
