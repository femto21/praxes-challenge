package com.praxes.consultation.dao;

import com.praxes.consultation.entity.Message;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MessageDAOJpaImpl implements MessageDAO {

    private EntityManager entityManager;

    @Autowired
    public MessageDAOJpaImpl(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public List<Message> findAll() {
        // create a query
        TypedQuery<Message> theQuery = entityManager.createQuery("from Message", Message.class);

        // execute the query and get results list
        List<Message> messages = theQuery.getResultList();

        // return the results
        return messages;
    }

    @Override
    @Transactional
    public Message save(Message theMessage) {
        Message dbMessage = entityManager.merge(theMessage);
        return dbMessage;
    }
}
