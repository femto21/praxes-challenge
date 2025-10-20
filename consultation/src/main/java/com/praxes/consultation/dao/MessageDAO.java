package com.praxes.consultation.dao;

import com.praxes.consultation.entity.Message;

import java.util.List;

public interface MessageDAO {

    List<Message> findAll();

    Message save(Message theMessage);
}
