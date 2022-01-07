package dcc.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import dcc.dto.UserDTO;
import dcc.service.GroupService;
import dcc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class  UserController {

	@Autowired
	UserService userService;
	@Autowired
	GroupService groupService;


/*
	@RequestMapping(value = "/users", method = RequestMethod.GET, headers = "Accept=application/json")
	public String getUsers(Model model) {
		List<User> listOfUsers = userService.getAllUsers();
		List<Group> listOfGroup = groupService.getAllGroups();
		model.addAttribute("userDTO", new UserDTO());
		model.addAttribute("listOfUsers", listOfUsers);
		model.addAttribute("groups", listOfGroup);
		return "usersDetails";
	}



	@RequestMapping(value = "/users", method = RequestMethod.POST, headers = "Accept=application/json")
	public String addUser(@ModelAttribute("user") UserDTO userDTO) {
		userService.saveOrUpdate(userDTO);
		return "redirect:/users";
	}

	@RequestMapping(value = "/users/{id}/edit", method = RequestMethod.GET, headers = "Accept=application/json")
	public String updateUser(@PathVariable("id") Long id,Model model) {
	 	model.addAttribute("userDTO", this.userService.getUser(id));
		model.addAttribute("listOfUsers", this.userService.getAllUsers());
		model.addAttribute("groups", groupService.getAllGroups());
		return "usersDetails";
	}



	@RequestMapping(value = "/users/{id}/delete", method = RequestMethod.GET, headers = "Accept=application/json")
	public String deleteUser(@PathVariable("id") Long id) {
		userService.deleteUser(id);
		return "redirect:/users";
	}*/

	@RequestMapping(value = "/")
	public String home()
	{
		return "redirect:/index";
	}

	@RequestMapping(value = "/index")
	public String index()
	{
		return "index";
	}

	@ResponseBody
	@RequestMapping(value = "/users", method = RequestMethod.GET, produces = "application/json")
	public Map<String, List<UserDTO>> getUsers() {
		Map<String, List<UserDTO>> users = new HashMap<String, List<UserDTO>>();
		users.put("users", userService.getAllUsers().stream().map(user -> userService.mapUsertoDTO(user)).collect(Collectors.toList()));
		return users;
	}

	@ResponseBody
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public void addUser(@RequestBody UserDTO userDTO) {
		userService.saveOrUpdate(userDTO);
	}

	@ResponseBody
	@RequestMapping(value = "/users/edit", method = RequestMethod.POST)
	public void updateUser(@RequestBody UserDTO userDTO) {
		userService.saveOrUpdate(userDTO);
	}

	@ResponseBody
	@RequestMapping(value = "/users", method = RequestMethod.DELETE)
	public void deleteUser(@RequestBody UserDTO userDTO) {
		userService.deleteUser(userDTO.getId());
	}

}
