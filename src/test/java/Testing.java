
import dcc.model.Group;
import dcc.model.Operation;
import dcc.model.User;
import dcc.service.GroupService;
import dcc.service.UserService;
import org.junit.Test;
import java.util.List;
import java.util.stream.Collectors;

public class Testing {
    Group g1;
    Group g2;
    Group adm;
    User ian;
    User tom;
    User jack;
    Operation readUF;
    Operation writeUF;
    Operation execUF;


    GroupService groupService = new GroupService();

    UserService userService = new UserService();


    public void bootstrap(Boolean exception) {
        g1 = new Group("Grupo 1", "Descripcion grupo 1");
        g2 = new Group("Grupo 2", "Descripcion grupo 2");
        adm = new Group("Admins group", "Maximus user-group level");
        ian = new User("Ian", "Crespi", "iancrespiok", g1);
        tom = new User("Thomas","Adsaw", "tomadsaw", g1);
        jack = new User("Jack","Williams", "jack123", adm);
        /*readUF = new Operation("ReadUF", "Read user files", OperationType.B);
        writeUF = new Operation("WriteUF","Write user files", OperationType.B);
        execUF = new Operation("ExecUF","Exec user files", OperationType.B);*/

        groupService.addGroup(g1);
        groupService.addGroup(g2);
        groupService.addGroup(adm);
        userService.addUser(ian);
        userService.addUser(tom);
        userService.addUser(jack);

        if(exception){throw new RuntimeException();}
      /*
        OperationRepository.getInstance().registrar(readUF,writeUF,execUF);
        g1.addOperation(readUF);
        g1.addOperation(writeUF);
        g2.addOperation(execUF);*/
        g1.addUser(jack);
        g1.addUser(ian);
        g1.addUser(tom);
        g2.addUser(ian);
    }

    @Test
    public void test() {
        bootstrap(false);


        List<User> groupList = userService.getAllUsers();

        List<Long> ids = groupList.stream().map(g -> g.getId()).collect(Collectors.toList());
        System.out.println(ids);
    }
}

