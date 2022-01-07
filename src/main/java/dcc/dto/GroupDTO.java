package dcc.dto;

import dcc.model.IdentifiableEntity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class GroupDTO extends IdentifiableEntity {
    private String name;
    private String description;

    public GroupDTO(Long id, String name, String description) {
        this.setId(id);
        this.name = name;
        this.description = description;
    }

    public GroupDTO() {
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
}
