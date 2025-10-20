# Praxes Coding challenege

## Name: Arpit Gahlot

### TechStack:

- Spring Boot (Java) for backend
- Typescript and React for frontend

#### **Youtube Demo**

https://youtu.be/PRqdKjtn5tM

#### **Setup Instructions**

- For running the app using intelliJ, run ConsultationApplication.java. Alternatively, mvn spring-boot:run in the terminal

- dependencies are included in the pom.xml file

- This project uses H2 in-memory database.
  To access the console, go to localhost:8080/h2-console

  jdbc url: jdbc:h2:file:./data/consultationdb
  username: sa
  password: (leave blank)

- For sample data, paste the script from h2dbscript.txt in the root folder in the space provided and click run

- For the frontend, just use "npm install" to install the necessary packages, followed by "npm run dev"

#### **API Documentation**

- All API endpoints are prefixed with (http://localhost:8080/api/consultation)

1. Get all messages:

   ENDPOINT: GET [/api/consultation](http://localhost:8080/api/consultation)

   Response Example:

   ````[
        {
            "id": 1,
            "consultationId": 1,
            "author": "Dr. Smith",
            "authorRole": "doctor",
            "content": "Hello, how are you feeling today?",
            "timestamp": "2025-10-18 07:00:00"
        },
        {
            "id": 2,
            "consultationId": 1,
            "author": "John Doe",
            "authorRole": "patient",
            "content": "I am feeling a bit better, doctor. Still have a slight cough though.",
            "timestamp": "2025-10-18 07:02:00"
        },
   ]```

   ````

2. Get Messages by Consultation

   Retrieve all messages for a specific consultation. Optional filters available.

   ENDPOINT: GET [/api/consultation/{consultationId}/messages]

   Path Parameters (required): consultationId

   Query Parameters (optional): reverseOrder (boolean) - false for ascending (default), true for descending
   authorRole (string) - "doctor" or "patient" for filtering by role

   Example: http://localhost:8080/api/consultation/1/messages?reverseOrder=true&authorRole=doctor

   Response Example:

   ```
   [
        {
            "id": 3,
            "consultationId": 1,
            "author": "Dr. Smith",
            "authorRole": "doctor",
            "content": "That is good to hear. Continue your medication for another week.",
            "timestamp": "2025-10-18 07:03:00"
        },
        {
            "id": 1,
            "consultationId": 1,
            "author": "Dr. Smith",
            "authorRole": "doctor",
            "content": "Hello, how are you feeling today?",
            "timestamp": "2025-10-18 07:00:00"
        }
   ]
   ```

3. Post a message to a consultation

   Post a message as a doctor or a patient to a particular consultation.

   ENDPOINT: POST [/api/consultation/{consultationId}]

   Path Parameters:
   consultationId (required): ID of the consultation

   Example:

   ```
   curl -X 'POST' \
        'http://localhost:8080/api/consultation/{consultationId}' \
        -H 'accept: application/hal+json' \
        -H 'Content-Type: application/json' \
        -d '{
        "consultationId": 1,
        "author": "Arpit",
        "authorRole": "patient",
        "content": "hi",
        "timestamp": "2025-10-18 19:00:00"
   }'
   ```

   Response Example:

   ```
   {
    "id": 9,
    "consultationId": 1,
    "author": "Arpit",
    "authorRole": "patient",
    "content": "hi",
    "timestamp": "2025-10-18 19:00:00"
   }
   ```

### CORS is enabled for frontend running at http://localhost:5173.

### H2 console can be used to verify message storage directly

#### **Architecture Decisions**

**Data Model:**

### Structure

The data consisted of 2 entities - consultation and message. Consultation represents the mapping between a patient and a doctor. Message represents the individual chats that were exchanged during a particular consultation.

### Fields

Consultation:
There were 3 fields in the consultation entity:
-consultationId (int)(unique ID for each consultation)
-doctor (string)(who was the doctor?)
-patient (string)(who was the patient?)

Message:
There were 6 fields in the Message entity:
-Id (long)(unique ID for each message)
-consultationId (int)(foreign key linking a message to a consultation)
-author (string)(who was the sender?)
-authorRole (string)(what was their role?)
-content (string)(contents of their chat message)
-timestamp (string)(when the message was sent)

### Model ofthe relationship between consultations and messages

This was fairly intuitive. Messages can't be randomly sent to any consultation, so I figured out that I will have to map each message to a particular consultation. Since the consultationId field was unique, I used that field to map each message to a particular consultation. One consultation can have many messages, so this essentially represents a one to many relationship between the two entities (the contrary is not true since 1 message can only belong to 1 consultation). Although It was not required, we could have used a seperate consultation entity class to represent this relationship using JPA.

### Indexing for real database

For Message, the id should be the primary key. The foreign key (mapped to Consultation) should be consultationId.
For Consultation, the consultationId should be the primary key.

We can also index the timestamps for faster sorting of chat messages by time.

**Technology Choices:**
I was very experienced in node.js for backend API development already. Since one of the main job requirements for this co-op position was Java, I really wanted to show my adaptability and flexibility so I went with Spring Boot. I had been learning Spring Boot recently from Udemy, and this was a good opportunity to test out a sample backend implementation.
But apart from my own personal reasons, Spring Boot (Java) by default has a very solid ecosystem, as well as support for rapid development. This coupled with Java's independence and OOP modularity makes it a very good tech stack for backend development.

As for the optional frontend, I just went with a classic TypeSscript + React combo. TS helps with type safety and avoiding errors during runtime. React's ability to reuse components makes frontend development much faster and efficient.

For storage, I went with H2 because the dependencies that Spring Boot providse for its integration are very simple and straightforward. It can be used for an in-memory database which makes it ideal for this use case.

Talking about tradeoffs, since H2 is only good for local development I had to avoid having to setup the entire PostgreSQL database server in order to save time. Another trade-off was that the models was very simplified - messages were storing the consultationId of pre-existing Consultation entities only that were added while running the H2 script. Although this was not a mandatory requirement, I could have worked on the REST APIs for creating new consultations as well.

### **"Making This Production-Ready"**

From a security perspective, we can use Json Web tokens for handling authorization and authentication. For example, before accessing the chat window, there can be a login screen where only people who have the correct credentials can access the application. Another thing we can do is to sanitize the input fields to avoid SQL injection attacks. If we are using the cloud, we can also use their robust storage services for all the data and ensure that it is encrypted during rest and transit.

For performance, one feature that I could have worked on was to include pagination in the chat window. This would have ensured that only a few messagse are loaded at a time (faster speed) and the rest are asynchronously loaded as the user tries to view them. The database queries could have also been optimized more if we were to index fields like timestamp (in case of the chronological order implementation)

For reliability, the error handling could have been significantly improved for a lot of specific cases. For example the timestamp field could have been made to throw an appropriate error if the format was not appropriate.

For scalability, we can move from an in-memory H2 DB to a production RDBMS like Postgre, or even a cloud-based storage service like S3 or dynamoDB. If using the cloud, even horizontal and vertical scaling can be implemented to create multiple instances of the backend server.

For data integrity, many more database constraints like NOT NULL, UNIQUE, etc. can be added in various cases for ensuring better consistency. There were also some partial writes in my case that can be better improved through transactions.

For compliance, it is important to ensure that the data of patients is handled with the regulations. We can encrypt their information, as well as keep a track of logs about who is accessing the application.
