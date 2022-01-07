package dcc.service;

import java.util.List;

import dcc.dao.GroupDAO;
import dcc.dao.UserDAO;
import dcc.dto.UserDTO;
import dcc.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
public class UserService {

	@Autowired
	UserDAO userDAO;
	@Autowired
	GroupDAO groupDAO;
	
	@Transactional
	public List<User> getAllUsers() {
		return userDAO.getAllUsers();
	}

	@Transactional
	public UserDTO getUser(Long id) {
		User user = userDAO.getUser(id);
		UserDTO userDTO = new UserDTO(user.getId(),
				user.getName(),
				user.getSurname(),
				user.getUsername(),
				user.getDefaultGroup().getId());
		return userDTO;
	}

	@Transactional
	public void addUser(User user) {
		userDAO.addUser(user);
	}

	@Transactional
	public void updateUser(User user) {
		userDAO.updateUser(user);
	}

	@Transactional
	public void deleteUser(Long id) {
		userDAO.deleteUser(id);
	}

	@Transactional
	public void saveOrUpdate(UserDTO userDTO) {
		if(userDTO.getId() != null){ //update
			User user = userDAO.getUser(userDTO.getId());
			copyProperties(userDTO, user);
			userDAO.updateUser(user);
		}else{ //create
			User user = new User();
			user.setName(userDTO.getName());
			user.setSurname(userDTO.getSurname());
			user.setUsername(userDTO.getUsername());
			user.setDefaultGroup(groupDAO.getGroup(userDTO.getDefaultGroupId()));
			userDAO.addUser(user);
		}
	}

	private void copyProperties(UserDTO userDTO, User user) {
		user.setName(userDTO.getName());
		user.setSurname(userDTO.getSurname());
		user.setUsername(userDTO.getUsername());
		user.setDefaultGroup(groupDAO.getGroup(userDTO.getDefaultGroupId()));
	}

	public UserDTO mapUsertoDTO(User user) {
		return new UserDTO(
			user.getId(),
			user.getName(),
			user.getSurname(),
			user.getUsername(),
			user.getDefaultGroup().getId()
		);
	}
}
