package dcc.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "group_")
public class Group extends IdentifiableEntity {
    private String name;
    private String description;
    @ManyToMany
    @JoinTable(name = "permitions")
    @JoinColumn(referencedColumnName = "operation")
    private Set<Operation> availableOperations = new HashSet<>();
    @ManyToMany
    @JoinTable(name = "groupAssignment")
    @JoinColumn(referencedColumnName = "user")
    private List<User> users = new ArrayList<>();

    public Group() { }

    public Group(String nombre,String description) {
        this.name = nombre;
        this.description = description;
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

    public List<User> getUsers() {
        return users;
    }

    public void setAvailableOperations(Set<Operation> availableOperations) {
        this.availableOperations = availableOperations;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Set<Operation> getAvailableOperations() {
        return availableOperations;
    }

    public void addUser (User user) {
        users.add(user);
    }

    public void addOperation (Operation operation) {
        availableOperations.add(operation);
    }
}
