package dcc.model;

import javax.persistence.Entity;
import javax.persistence.Enumerated;

@Entity
public class Operation extends IdentifiableEntity {
    private String name;
    private String description;
    @Enumerated()
    private OperationType type;

    public Operation(String name, String description, OperationType type) {
        this.name = name;
        this.description = description;
        this.type = type;
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

    public OperationType getType() {
        return type;
    }

    public void setType(OperationType type) {
        this.type = type;
    }

    public Operation() {

    }
}
