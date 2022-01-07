package dcc.service;

import java.util.List;
import java.util.stream.Collectors;

import dcc.dao.GroupDAO;
import dcc.dao.OperationDAO;
import dcc.dao.UserDAO;
import dcc.dto.GroupDTO;
import dcc.model.Group;
import dcc.model.Operation;
import dcc.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("groupService")
public class GroupService {

    @Autowired
    GroupDAO groupDAO;
    @Autowired
    UserDAO userDAO;
    @Autowired
    OperationDAO operationDAO;

    @Transactional
    public List<Group> getAllGroups() {
        return groupDAO.getAllGroups();
    }

    @Transactional
    public Group getGroup(Long id) {
        return groupDAO.getGroup(id);
    }

    @Transactional
    public void addGroup(Group group) {
        groupDAO.addGroup(group);
    }

    @Transactional
    public void updateGroup(Group group) {
        groupDAO.updateGroup(group);
    }

    @Transactional
    public void deleteGroup(Long id) {
        groupDAO.deleteGroup(id);
    }

    @Transactional
    public void saveOrUpdate(GroupDTO groupDTO) {
        if(groupDTO.getId() != null){ //create
            Group group = getGroup(groupDTO.getId());
            copyProperties(groupDTO, group);
            groupDAO.updateGroup(group);
        }else{ //update
            Group group = new Group(groupDTO.getName(),groupDTO.getDescription());
            groupDAO.addGroup(group);
        }
    }

    private void copyProperties(GroupDTO groupDTO, Group group) {
        group.setName(groupDTO.getName());
        group.setDescription(groupDTO.getDescription());
    }

    public GroupDTO mapGroupToDTO (Group group) {
        GroupDTO groupDTO = new GroupDTO(group.getId(), group.getName(), group.getDescription());
        return groupDTO;
    }
    @Transactional
    public List<User> getUsersFromGroup(Long id) {
        List<User> usuarios = groupDAO.getGroup(id).getUsers().stream().collect(Collectors.toList());
        return usuarios;
    }

    @Transactional
    public List<Operation> getOperationsFromGroup(Long id) {
        List<Operation> operaciones = groupDAO.getGroup(id).getAvailableOperations().stream().collect(Collectors.toList());
        return operaciones;
    }

    @Transactional
    public void setGroupUsers(Long groupId, List<User> usersAux) {
        groupDAO.getGroup(groupId).setUsers(usersAux);
    }

    @Transactional
    public void deleteUser(Long groupId, Long userId) {
        groupDAO.getGroup(groupId).getUsers().removeIf(u -> u.getId() == userId);;
    }

    @Transactional
    public void deleteOperation(Long groupId, Long operationId) {
        groupDAO.getGroup(groupId).getAvailableOperations().removeIf(o -> o.getId() == operationId);;
    }

    @Transactional
    public void addUser(Long groupId, Long userId) {
        User user = userDAO.getUser(userId);
        groupDAO.getGroup(groupId).getUsers().add(user);
    }

    @Transactional
    public void addOperation(Long groupId, Long operationId) {
        Operation operation = operationDAO.getOperation(operationId);
        groupDAO.getGroup(groupId).getAvailableOperations().add(operation);
    }
}
