import { useEffect, useRef, useState } from "react";
import type { Consultation, Message } from "../types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  consultation: Consultation;
}

const ChatWindow = ({ consultation }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [senderRole, setSenderRole] = useState<"doctor" | "patient">("doctor");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [roleFilter, setRoleFilter] = useState<"all" | "doctor" | "patient">(
    "all"
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/consultation/${consultation.consultationId}/messages`
        );
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [consultation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    const author =
      senderRole === "doctor"
        ? consultation.doctorName
        : consultation.patientName;

    try {
      const res = await fetch(
        `http://localhost:8080/api/consultation/${consultation.consultationId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            author: author,
            authorRole: senderRole,
            consultationId: consultation.consultationId,
            content: text,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to send message");

      let newMessage = null;
      try {
        newMessage = await res.json();
      } catch {
        newMessage = {
          author,
          authorRole: senderRole,
          consultationId: consultation.consultationId,
          content: text,
          timestamp: new Date().toISOString(),
        };
      }

      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const filteredMessages = messages
    .filter((m) => (roleFilter === "all" ? true : m.authorRole === roleFilter))
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  return (
    <div className="flex flex-col max-h-[700px] h-full w-full">
      <h2 className="text-2xl font-bold mt-2 mb-4">
        Consultation #{consultation.consultationId}
      </h2>
      <p className="text-gray-500 mb-4">
        {consultation.doctorName} (Doctor) & {consultation.patientName}{" "}
        (Patient)
      </p>

      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-2">
          <label className="font-semibold">Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="select select-bordered select-sm"
          >
            <option value="asc">Latest</option>
            <option value="desc">Oldest</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold">Filter:</label>
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as "all" | "doctor" | "patient")
            }
            className="select select-bordered select-sm"
          >
            <option value="all">All</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll border rounded-lg p-3 mb-3 bg-base-100">
        <MessageList messages={filteredMessages} />
        <div ref={messagesEndRef} />
      </div>

      <div className="mb-2 w-full flex items-center gap-2">
        <label className="font-semibold">Send as:</label>
        <select
          value={senderRole}
          onChange={(e) =>
            setSenderRole(e.target.value as "doctor" | "patient")
          }
          className="select select-bordered select-sm"
        >
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
