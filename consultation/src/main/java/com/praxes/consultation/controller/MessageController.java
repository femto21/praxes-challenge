package com.praxes.consultation.controller;

import com.praxes.consultation.dao.MessageDAO;
import com.praxes.consultation.entity.Message;
import com.praxes.consultation.request.MessageRequest;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/consultation")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    private MessageDAO messageDAO;
    private List<Message> messages;

    @Autowired
    public MessageController(MessageDAO theMessageDAO) {
        messageDAO = theMessageDAO;
        messages = findAll();
    }

    @GetMapping()
    public List<Message> findAll(){
        return messageDAO.findAll();
    }

    @Operation(summary = "get all messages that are involved in a particular consultation, using consultation ID")
    @GetMapping("/{consultationId}/messages")
    public List<Message> getMessagesByConsultationId(@PathVariable @Min(value = 1) int consultationId,
                                                     @RequestParam(defaultValue = "false") boolean reverseOrder,
                                                     @RequestParam(required = false) String authorRole) {

        List<Message> allMessages = messages.stream()
                .filter(message -> message.getConsultationId() == consultationId)
                .toList();

        List<Message> matchedMessages = new ArrayList<>();

        if (authorRole != null) {
            matchedMessages = allMessages.stream()
                    .filter(message -> message.getAuthorRole().equalsIgnoreCase(authorRole))
                    .toList();
        }
        else {
            matchedMessages = allMessages;
        }

        if (reverseOrder) {
            matchedMessages = matchedMessages.reversed();
        }

        return matchedMessages;
    }

    @Operation(summary = "make a request to post a message in a particular consultation")
    @PostMapping("/{consultationId}")
    public Message postMessage(@Valid @RequestBody MessageRequest messageRequest) {

        long id;
        if (messages.isEmpty()) {
            id = 1;
        }
        else {
            id = messages.get(messages.size() - 1).getId() + 1;
        }

        Message message = convertToMessage(id, messageRequest);

        messages.add(message);

        return messageDAO.save(message);

    }

    private Message convertToMessage(long id, MessageRequest messageRequest) {
        return new Message(
                id,
                messageRequest.getConsultationId(),
                messageRequest.getAuthor(),
                messageRequest.getAuthorRole(),
                messageRequest.getContent(),
                messageRequest.getTimestamp()
        );
    }
}
