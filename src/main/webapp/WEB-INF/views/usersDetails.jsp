<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<html>
<head>
<style>           
.blue-button{
	background: #25A6E1;
	filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#25A6E1',endColorstr='#188BC0',GradientType=0);
	padding:3px 5px;
	color:#fff;
	font-family:'Helvetica Neue',sans-serif;
	font-size:12px;
	border-radius:2px;
	-moz-border-radius:2px;
	-webkit-border-radius:4px;
	border:1px solid #1A87B9
}     
table {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
   width: 50%;
}
th {
  background: SteelBlue;
  color: white;
}
 td,th{
                border: 1px solid gray;
                width: 25%;
                text-align: left;
                padding: 5px 10px;
            }
</style>
</head>
<jsp:include page="template/header.jsp"/>

<body>
<form:form method="post" modelAttribute="userDTO" action="/SpringMVCHibernateCRUDExample_war/users">
<table>
		<tr>
			<th colspan="2">Add User</th>
		</tr>
		<tr>
		<form:hidden path="id" />
			<td><form:label path="name">Name:</form:label></td>
			<td><form:input path="name" size="30" maxlength="30"></form:input></td>
        </tr>
		<tr>
			<td><form:label path="surname">Surname:</form:label></td>
			<td><form:input path="surname" size="30" maxlength="30"></form:input></td>
		</tr>
		<tr>
			<td><form:label path="username">Username:</form:label></td>
			<td><form:input path="username" size="30" maxlength="30"></form:input></td>
		</tr>
		<tr>
			<td><form:label path="defaultGroupId">Default group:</form:label></td>
			<td>
				<form:select path="defaultGroupId">
					<option selected="selected"></option>
					<c:forEach items="${groups}" var="group">
						<option value=${group.id}>${group.name}</option>
					</c:forEach>
				</form:select>
			</td>
		</tr>
		<tr>
			<td colspan="2"><input type="submit"
				class="blue-button" /></td>
		</tr>
	</table> 
</form:form>
</br>
<h3>User List</h3>
<c:if test="${!empty listOfUsers}">
	<table class="tg">
	<tr>
		<th width="80">Id</th>
		<th width="120">Name</th>
		<th width="120">Surname</th>
		<th width="120">Username</th>
		<th width="120">Default group</th>
		<th width="60">Edit</th>
		<th width="60">Delete</th>
	</tr>
	<c:forEach items="${listOfUsers}" var="user">
		<tr>
			<td>${user.id}</td>
			<td>${user.name}</td>
			<td>${user.surname}</td>
			<td>${user.username}</td>
			<td>${user.defaultGroup.name}</td>
			<td><a href="<c:url value='/users/${user.id}/edit' />" >Edit</a></td>
			<td><a href="<c:url value='/users/${user.id}/delete' />" >Delete</a></td>
		</tr>
	</c:forEach>
	</table>
</c:if>
</body>
</html>
