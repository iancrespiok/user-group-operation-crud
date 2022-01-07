package dcc.dao;

import java.util.List;

import dcc.model.Group;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GroupDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sf) {
        this.sessionFactory = sf;
    }

    public List<Group> getAllGroups() {
        Session session = this.sessionFactory.getCurrentSession();
        List<Group> groupList = session.createQuery("from Group").list();
        return groupList;
    }

    public Group getGroup(Long id) {
        Session session = this.sessionFactory.getCurrentSession();
        Group group = (Group) session.get(Group.class, id);
        return group;
    }

    public Group addGroup(Group group) {
        Session session = this.sessionFactory.getCurrentSession();
        session.persist(group);
        return group;
    }

    public void updateGroup(Group group) {
        Session session = this.sessionFactory.getCurrentSession();
        session.update(group);
    }

    public void deleteGroup(Long id) {
        Session session = this.sessionFactory.getCurrentSession();
        Group p = (Group) session.load(Group.class, id);
        if (null != p) {
            session.delete(p);
        }
    }
}
