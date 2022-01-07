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
<h3>Available Operations</h3>
<c:if test="${!empty operationsOfGroupList}">
    <table class="tg">
        <tr>
            <th width="80">Id</th>
            <th width="120">Name</th>
            <th width="120">Description</th>
            <th width="120">Type</th>
            <th width="60">Delete</th>
        </tr>
        <c:forEach items="${operationsOfGroupList}" var="operation">
            <tr>
                <td>${operation.id}</td>
                <td>${operation.name}</td>
                <td>${operation.description}</td>
                <td>${operation.type.toString()}</td>
                <td><a href="<c:url value='/groups/${groupId}/operations/${operation.id}/delete' />" >Delete</a></td>
            </tr>
        </c:forEach>
    </table>
</c:if>

<h3>Add operations</h3>
<c:if test="${!empty operationList}">
    <table class="tg">
        <tr>
            <th width="80">Id</th>
            <th width="120">Name</th>
            <th width="120">Description</th>
            <th width="120">Type</th>
            <th width="60">Add</th>
        </tr>
        <c:forEach items="${operationList}" var="operation">
            <tr>
                <td>${operation.id}</td>
                <td>${operation.name}</td>
                <td>${operation.description}</td>
                <td>${operation.type.toString()}</td>
                <td><a href="<c:url value='/groups/${groupId}/operations/${operation.id}/add' />" >Add</a></td>
            </tr>
        </c:forEach>
    </table>
</c:if>
</body>
</html>