package dcc.dao;

import dcc.model.Operation;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OperationDAO {
    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sf) {
        this.sessionFactory = sf;
    }

    public List<Operation> getAllOperations() {
        Session session = this.sessionFactory.getCurrentSession();
        List<Operation> operationList = session.createQuery("from Operation").list();
        return operationList;
    }

    public Operation getOperation(Long id) {
        Session session = this.sessionFactory.getCurrentSession();
        Operation operation = (Operation) session.get(Operation.class, id);
        return operation;
    }

    public Operation addOperation(Operation operation) {
        Session session = this.sessionFactory.getCurrentSession();
        session.persist(operation);
        return operation;
    }

    public void updateOperation(Operation operation) {
        Session session = this.sessionFactory.getCurrentSession();
        session.update(operation);
    }

    public void deleteOperation(Long id) {
        Session session = this.sessionFactory.getCurrentSession();
        Operation p = (Operation) session.load(Operation.class, id);
        if (null != p) {
            session.delete(p);
        }
    }
}
