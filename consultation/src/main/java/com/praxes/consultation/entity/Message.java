package com.praxes.consultation.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "message")
public class Message {

    // instance variables
    @Id
    @Column(name = "id")
    private long id;

    @Column(name = "consultation_id")
    private int consultationId;

    @Column(name = "author")
    private String author;

    @Column(name = "author_role")
    private String authorRole;

    @Column(name = "content")
    private String content;

    @Column(name = "timestamp")
    private String timestamp;

    // constructor for the database
    public Message() {}

    //constructor
    public Message(long id, int consultationId, String author, String authorRole, String content, String timestamp) {
        this.id = id;
        this.consultationId = consultationId;
        this.author = author;
        this.authorRole = authorRole;
        this.content = content;
        this.timestamp = timestamp;
    }

    // getters
    public long getId(){
        return id;
    }

    public int getConsultationId(){
        return consultationId;
    }

    public String getAuthor() {
        return author;
    }

    public String getAuthorRole() {
        return authorRole;
    }

    public String getContent() {
        return content;
    }

    public String getTimestamp() {
        return timestamp;
    }

    // setters
    public void setId(long id) {
        this.id = id;
    }

    public void setConsultationId(int consultationId) {
        this.consultationId = consultationId;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setAuthorRole(String authorRole) {
        this.authorRole = authorRole;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", consultationId=" + consultationId +
                ", author='" + author + '\'' +
                ", authorRole='" + authorRole + '\'' +
                ", content='" + content + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
