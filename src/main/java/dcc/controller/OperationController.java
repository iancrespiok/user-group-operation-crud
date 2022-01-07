package dcc.controller;

import dcc.dto.GroupDTO;
import dcc.dto.OperationDTO;
import dcc.model.Operation;
import dcc.model.OperationType;
import dcc.service.OperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class OperationController {

    @Autowired
    OperationService operationService;

    @ResponseBody
    @RequestMapping(value = "/operations", method = RequestMethod.GET, produces = "application/json")
    public Map<String, List<OperationDTO>> getOperations(Model model) {
        Map<String, List<OperationDTO>> operations = new HashMap<>();
        operations.put("operations", operationService.getAllOperations().stream().map(group -> operationService.mapOperationToDTO(group)).collect(Collectors.toList()));
        return operations;
    }

    @ResponseBody
    @RequestMapping(value = "/operations", method = RequestMethod.POST)
    public void addGroup(@RequestBody OperationDTO operationDTO) {
        operationService.saveOrUpdate(operationDTO);
    }

    @ResponseBody
    @RequestMapping(value = "/operations", method = RequestMethod.DELETE)
    public void deleteUser(@RequestBody OperationDTO operationDTO) {
        operationService.deleteOperation(operationDTO.getId());
    }


    /*@RequestMapping(value = "/operations", method = RequestMethod.GET, headers = "Accept=application/json")
    public String getOperations(Model model) {

        List<Operation> listOfOperations = operationService.getAllOperations();
        List<OperationType> listOfTypes = Arrays.stream(OperationType.values()).collect(Collectors.toList());

        model.addAttribute("operation", new OperationDTO());
        model.addAttribute("listOfOperations", listOfOperations);
        model.addAttribute("listOfTypes", listOfTypes);

        return "operationsDetails";
    }

    @RequestMapping(value = "/operations", method = RequestMethod.POST, headers = "Accept=application/json")
    public String addOperation(@ModelAttribute("operation") OperationDTO operationDTO) {
        operationService.saveOrUpdate(operationDTO);
        return "redirect:/operations";
    }

     @RequestMapping(value = "/operations/{id}/edit", method = RequestMethod.GET, headers = "Accept=application/json")
    public String updateUser(@PathVariable("id") Long id,Model model) {
        model.addAttribute("operation", operationService.getOperation(id));
        model.addAttribute("listOfOperations", operationService.getAllOperations());
        model.addAttribute("listOfTypes", Arrays.stream(OperationType.values()).collect(Collectors.toList()));
        return "operationsDetails";
    }

    @RequestMapping(value = "/operations/{id}/delete", method = RequestMethod.GET, headers = "Accept=application/json")
    public String deleteUser(@PathVariable("id") Long id) {
        operationService.deleteOperation(id);
        return "redirect:/operations";
    }

     */
}
