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
<body>
<jsp:include page="template/header.jsp"/>

<h3>Users</h3>
<c:if test="${!empty usersOfGroupList}">
    <table class="tg">
        <tr>
            <th width="80">Id</th>
            <th width="120">Name</th>
            <th width="120">Description</th>
            <th width="120">Username</th>
            <th width="120">Default group</th>
            <th width="60">Delete</th>
        </tr>
        <c:forEach items="${usersOfGroupList}" var="user">
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.username}</td>
                <td>${user.defaultGroup.name}</td>
                <td><a href="<c:url value='/groups/${groupId}/users/${user.id}/delete' />" >Delete</a></td>
            </tr>
        </c:forEach>
    </table>
</c:if>

<h3>Add users</h3>
<c:if test="${!empty usersList}">
    <table class="tg">
        <tr>
            <th width="80">Id</th>
            <th width="120">Name</th>
            <th width="120">Surname</th>
            <th width="120">Username</th>
            <th width="120">Default group</th>
            <th width="60">Add</th>
        </tr>
        <c:forEach items="${usersList}" var="user">
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.username}</td>
                <td>${user.defaultGroup.name}</td>
                <td><a href="<c:url value='/groups/${groupId}/users/${user.id}/add' />" >Add</a></td>
            </tr>
        </c:forEach>
    </table>
</c:if>
</body>
</html>