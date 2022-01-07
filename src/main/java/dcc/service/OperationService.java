package dcc.service;

import java.util.List;

import dcc.dao.OperationDAO;
import dcc.dto.GroupDTO;
import dcc.dto.OperationDTO;
import dcc.model.Group;
import dcc.model.Operation;
import dcc.model.OperationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("operationService")
public class OperationService {

    @Autowired
    OperationDAO operationDAO;

    @Transactional
    public List<Operation> getAllOperations() {
        return operationDAO.getAllOperations();
    }

    @Transactional
    public Operation getOperation(Long id) {
        return operationDAO.getOperation(id);
    }

    @Transactional
    public void saveOrUpdate(OperationDTO operationDTO) {
        if(operationDTO.getId() != null){ //create
            Operation operation = getOperation(operationDTO.getId());
            copyProperties(operationDTO, operation);
            operationDAO.updateOperation(operation);
        }else{ //update
            Operation operation = new Operation(operationDTO.getName(), operationDTO.getDescription(), OperationType.valueOf(operationDTO.getType()));
            operationDAO.addOperation(operation);
        }
    }

    private void copyProperties(OperationDTO operationDTO, Operation operation) {
        operation.setName(operationDTO.getName());
        operation.setDescription(operationDTO.getDescription());
        operation.setType(OperationType.valueOf(operationDTO.getType()));
    }

    public OperationDTO mapOperationToDTO (Operation operation) {
        OperationDTO operationDTO = new OperationDTO(operation.getId(), operation.getName(), operation.getDescription(), operation.getType());
        return operationDTO;
    }

    @Transactional
    public void updateOperation(Operation operation) {
        operationDAO.updateOperation(operation);
    }

    @Transactional
    public void deleteOperation(Long id) {
        operationDAO.deleteOperation(id);
    }
}
