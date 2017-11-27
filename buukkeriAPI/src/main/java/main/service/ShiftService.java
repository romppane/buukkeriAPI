package main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.dao.ShiftDAO;
import main.entity.Shift;
import main.entity.Shift_IF;

@Service
public class ShiftService {

	@Autowired
	private ShiftDAO shiftdao;

	public boolean createshift(Shift shift) {
		return shiftdao.createShift(shift);
	}

	public boolean deleteshift(Shift shift) {
		return shiftdao.deleteShift(shift);
	}

	public boolean updateshift(Shift shift) {
		return shiftdao.updateShift(shift);
	}

	public Shift_IF getShiftByID(int id) {
		return shiftdao.readShiftById(id);
	}

	public Shift_IF[] getShiftByActID(int id) {
		return shiftdao.readActivityShifts(id);
	}
	
}
