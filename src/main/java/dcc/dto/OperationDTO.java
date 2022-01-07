package dcc.dto;

import dcc.model.OperationType;

public class OperationDTO {
    private Long id;
    private String name;
    private String description;
    private String type;

    public OperationDTO() {
    }

    public OperationDTO(Long id, String name, String description, OperationType type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type.toString();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
