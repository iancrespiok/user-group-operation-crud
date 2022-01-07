package dcc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import dcc.dto.GroupDTO;
import dcc.dto.OperationDTO;
import dcc.dto.UserDTO;
import dcc.model.Group;
import dcc.model.Operation;
import dcc.model.User;
import dcc.service.GroupService;
import dcc.service.OperationService;
import dcc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class GroupController {

    @Autowired
    UserService userService;
    @Autowired
    GroupService groupService;
    @Autowired
    OperationService operationService;

    @ResponseBody
    @RequestMapping(value = "/groups", method = RequestMethod.GET, produces = "application/json")
    public Map<String, List<GroupDTO>> getGroups(Model model) {
        Map<String, List<GroupDTO>> groups = new HashMap<>();
        groups.put("groups", groupService.getAllGroups().stream().map(group -> groupService.mapGroupToDTO(group)).collect(Collectors.toList()));
        return groups;
    }

    @ResponseBody
    @RequestMapping(value = "/groups", method = RequestMethod.POST)
    public void addGroup(@RequestBody GroupDTO groupDTO) {
        groupService.saveOrUpdate(groupDTO);
    }

    @ResponseBody
    @RequestMapping(value = "/groups/edit", method = RequestMethod.POST)
    public void updateUser(@RequestBody GroupDTO groupDTO) {
        groupService.saveOrUpdate(groupDTO);
    }

    @ResponseBody
    @RequestMapping(value = "/groups", method = RequestMethod.DELETE)
    public void deleteUser(@RequestBody GroupDTO groupDTO) {
        groupService.deleteGroup(groupDTO.getId());
    }

    @ResponseBody
    @RequestMapping(value = "/groups/{id}/users",  method = RequestMethod.GET, produces = "application/json")
    public Map<String, List<UserDTO>> usersOfAGroup(@PathVariable("id") Long id) {
        Map<String, List<UserDTO>> users = new HashMap<>();
        List<User> usersOfGroupList = groupService.getUsersFromGroup(id);
//        List<User> usersOfGroupList = new ArrayList<User>(usersOfGroupList1);
//        List<User> usersList = userService.getAllUsers();
//        usersList.removeIf(user -> usersOfGroupList.stream().anyMatch(user1 -> user1.getId() == user.getId()));
        List<UserDTO> userDTOs = usersOfGroupList.stream().map(user -> userService.mapUsertoDTO(user)).collect(Collectors.toList());
        users.put("users", userDTOs);
        return users;
    }

    @ResponseBody
    @RequestMapping(value = "/groups/{id}/operations", method = RequestMethod.GET, headers = "Accept=application/json")
    public String operationsOfAGroup(@PathVariable("id") Long id, Model model) {
        Map<String, List<OperationDTO>> users = new HashMap<>();
        List<Operation> operationsOfGroupList = groupService.getOperationsFromGroup(id);
//        List<Operation> operationList = operationService.getAllOperations();
//        operationList.removeIf(operation -> operationsOfGroupList.stream().anyMatch(operation1 -> operation1.getId() == operation.getId()));
//        model.addAttribute("operationsOfGroupList",operationsOfGroupList);
//        model.addAttribute("operationList", operationList);
//        model.addAttribute("groupId", id);
        return "groupOperations";
    }

    @ResponseBody
    @RequestMapping(value = "/groups/{groupId}/users/{userId}", method = RequestMethod.POST, headers = "Accept=application/json")
    public void addUserToAGroup(@PathVariable("groupId") Long groupId, @PathVariable("userId") Long userId) {
        groupService.addUser(groupId,userId);
    }

    /*@RequestMapping(value = "/groups", method = RequestMethod.GET, headers = "Accept=application/json")
    public String getGroups(Model model) {
        List<Group> listOfGroups = groupService.getAllGroups();
        model.addAttribute("group", new GroupDTO());
        model.addAttribute("listOfGroups", listOfGroups);
        return "groupsDetails";
    }

    @RequestMapping(value = "/groups", method = RequestMethod.POST, headers = "Accept=application/json")
    public String addGroup(@ModelAttribute("group") GroupDTO groupDTO) {
        groupService.saveOrUpdate(groupDTO);
        return "redirect:/groups";
    }

    @RequestMapping(value = "/groups/{id}", method = RequestMethod.GET, headers = "Accept=application/json")
    public Group getGroupById(@PathVariable Long id) {
        return groupService.getGroup(id);
    }


    @RequestMapping(value = "/groups/{id}/edit", method = RequestMethod.GET, headers = "Accept=application/json")
    public String updateGroupView(@PathVariable("id") Long id, Model model) {
        model.addAttribute("group", this.groupService.getGroup(id));
        model.addAttribute("listOfGroups", this.groupService.getAllGroups());
        model.addAttribute("id", id);
        return "groupsDetails";
    }


    @RequestMapping(value = "/groups/{id}/delete", method = RequestMethod.GET, headers = "Accept=application/json")
    public String deleteGroup(@PathVariable("id") Long id) {
        groupService.deleteGroup(id);
        return "redirect:/groups";

    }

    @RequestMapping(value = "/groups/{id}/users", method = RequestMethod.GET, headers = "Accept=application/json")
    public String usersOfAGroup(@PathVariable("id") Long id, Model model) {
        List<User> usersOfGroupList1 = groupService.getUsersFromGroup(id);
        List<User> usersOfGroupList = new ArrayList<User>(usersOfGroupList1);
        List<User> usersList = userService.getAllUsers();
        usersList.removeIf(user -> usersOfGroupList.stream().anyMatch(user1 -> user1.getId() == user.getId()));
        model.addAttribute("usersOfGroupList",usersOfGroupList);
        model.addAttribute("usersList", usersList);
        model.addAttribute("groupId", id);
        return "groupUsers";
    }

    @RequestMapping(value = "/groups/{groupId}/users/{userId}/delete", method = RequestMethod.GET, headers = "Accept=application/json")
    public String deleteUserOfAGroup(@PathVariable("groupId") Long groupId, @PathVariable("userId") Long userId) {
        groupService.deleteUser(groupId,userId);
        return "redirect:/groups/" + groupId + "/users/";
    }

    @RequestMapping(value = "/groups/{groupId}/users/{userId}/add", method = RequestMethod.GET, headers = "Accept=application/json")
    public String addUserToAGroup(@PathVariable("groupId") Long groupId, @PathVariable("userId") Long userId) {
        groupService.addUser(groupId,userId);
        return "redirect:/groups/" + groupId + "/users/";
    }

    @RequestMapping(value = "/groups/{id}/operations", method = RequestMethod.GET, headers = "Accept=application/json")
    public String operationsOfAGroup(@PathVariable("id") Long id, Model model) {
        List<Operation> operationsOfGroupList = groupService.getOperationsFromGroup(id);
        List<Operation> operationList = operationService.getAllOperations();
        operationList.removeIf(operation -> operationsOfGroupList.stream().anyMatch(operation1 -> operation1.getId() == operation.getId()));
        model.addAttribute("operationsOfGroupList",operationsOfGroupList);
        model.addAttribute("operationList", operationList);
        model.addAttribute("groupId", id);
        return "groupOperations";
    }

    @RequestMapping(value = "/groups/{groupId}/operations/{operationId}/delete", method = RequestMethod.GET, headers = "Accept=application/json")
    public String deleteOperationOfAGroup(@PathVariable("groupId") Long groupId, @PathVariable("operationId") Long operationId) {
        groupService.deleteOperation(groupId,operationId);
        return "redirect:/groups/" + groupId + "/operations/";
    }
    @RequestMapping(value = "/groups/{groupId}/operations/{operationId}/add", method = RequestMethod.GET, headers = "Accept=application/json")
    public String addOperationToAGroup(@PathVariable("groupId") Long groupId, @PathVariable("operationId") Long operationId) {
        groupService.addOperation(groupId,operationId);
        return "redirect:/groups/" + groupId + "/operations/";
    }*/
}

