package dcc.dto;

public class UserDTO {
    private Long id;
    private String name;
    private String surname;
    private String username;
    private Long defaultGroupId;

    public UserDTO() {
    }

    public UserDTO(Long id, String name, String surname, String username, Long defaultGroupId) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.defaultGroupId = defaultGroupId;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getDefaultGroupId() {
        return defaultGroupId;
    }

    public void setDefaultGroupId(Long defaultGroupId) {
        this.defaultGroupId = defaultGroupId;
    }
}
