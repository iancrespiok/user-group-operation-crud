package dcc.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class User extends IdentifiableEntity {
	private String name;
	private String surname;
	private String username;
	private LocalDateTime lastLogin;
	@ManyToOne
	private Group defaultGroup;


	public User(String name, String surname, String username, Group defaultGroup) {
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.lastLogin = LocalDateTime.now();
		this.defaultGroup = defaultGroup;
	}

	public String getName() {
		return name;
	}

	public String getSurname() {
		return surname;
	}

	public String getUsername() {
		return username;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setLastLogin(LocalDateTime lastLogin) {
		this.lastLogin = lastLogin;
	}

	public LocalDateTime getLastLogin() {
		return lastLogin;
	}

	public void login() {
		this.lastLogin = LocalDateTime.now();
	}

	public Group getDefaultGroup() {
		return defaultGroup;
	}

	public void setDefaultGroup(Group defaultGroup) {
		this.defaultGroup = defaultGroup;
	}

	public User() {
		super();

	}


}
