package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.User;
import net.htjs.pt4.core.Mapper;

public interface UserMapper extends Mapper<User> {

	public List<Map<String, Object>> getAll();

	public void insertUser(Map<String, Object> map);

	public void updateUser(Map<String, Object> map);

	public void deleteUser(Map<String, Object> map);

	public Map<String, Object> findById(Map<String, Object> map);
}