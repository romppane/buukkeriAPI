package main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.dao.ActivityDAO;
import main.entity.Activity;
import main.entity.Activity_IF;

@Service
public class ActivityService {
	@Autowired
	private ActivityDAO actdao;
//pena

	public Activity_IF[] readActivities() {
		return actdao.readActivities();
	}

	public Activity_IF getActivityByID(int id) {
		return actdao.readActivityById(id);
	}

	public Activity_IF[] getActivityBySPID(int spid) {
		return actdao.readActivitiesBySPId(spid);
	}

	public boolean createact(Activity act) {
		return actdao.createActivity(act);
	}

	public boolean updateact(Activity act) {
		return actdao.updateActivity(act);
	}

	public boolean deleteact(Activity act) {
		return actdao.deleteActivity(act);
	}
}
