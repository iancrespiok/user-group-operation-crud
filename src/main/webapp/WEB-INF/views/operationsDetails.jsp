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
<form:form method="post" modelAttribute="operation" action="/SpringMVCHibernateCRUDExample_war/operations">
    <table>
        <tr>
            <th colspan="2">Add Operation</th>
        </tr>
        <tr>
            <form:hidden path="id" />
            <td><form:label path="name">Name:</form:label></td>
            <td><form:input path="name" size="30" maxlength="30"></form:input></td>
        </tr>
        <tr>
            <td><form:label path="description">Description:</form:label></td>
            <td><form:input path="description" size="30" maxlength="30"></form:input></td>
        </tr>
        <tr>
            <td><form:label path="type">Type:</form:label></td>
            <td>
                <form:select path="type" name="operationType">
                    <option selected="selected"></option>
                    <c:forEach items="${listOfTypes}" var="type">
                        <option value=${type}>${type.toString()}</option>
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
<c:if test="${!empty listOfOperations}">
    <table class="tg">
        <tr>
            <th width="80">Id</th>
            <th width="120">Name</th>
            <th width="120">Description</th>
            <th width="120">Type</th>
            <th width="60">Edit</th>
            <th width="60">Delete</th>
        </tr>
        <c:forEach items="${listOfOperations}" var="operation">
            <tr>
                <td>${operation.id}</td>
                <td>${operation.name}</td>
                <td>${operation.description}</td>
                <td>${operation.type.toString()}</td>
                <td><a href="<c:url value='/operations/${operation.id}/edit' />" >Edit</a></td>
                <td><a href="<c:url value='/operations/${operation.id}/delete' />" >Delete</a></td>
            </tr>
        </c:forEach>
    </table>
</c:if>
</body>
</html>
