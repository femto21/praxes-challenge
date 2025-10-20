package com.praxes.consultation.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class MessageRequest {

    // instance variables
    @Min(value = 1, message = "Invalid consultation ID")
    private int consultationId;

    @Size(min = 1, message = "missing author")
    private String author;

    @Size(min = 1, message = "missing author role")
    private String authorRole;

    @Size(min = 1, message = "missing message content")
    private String content;

    @Size(min = 1, message = "missing message timestamp")
    private String timestamp;

    // constructor
    public MessageRequest(int consultationId, String author, String authorRole, String content, String timestamp) {
        this.consultationId = consultationId;
        this.author = author;
        this.authorRole = authorRole;
        this.content = content;
        this.timestamp = timestamp;
    }

    // getters
    public int getConsultationId() {
        return consultationId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getContent() {
        return content;
    }

    public String getAuthor() {
        return author;
    }

    public String getAuthorRole() {
        return authorRole;
    }

    // setters
    public void setConsultationId(int consultationId) {
        this.consultationId = consultationId;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setAuthorRole(String authorRole) {
        this.authorRole = authorRole;
    }
}
