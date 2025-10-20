import type { Message } from "../types";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-3">
      {messages.map((msg) => (
        <div key={msg.id} className="chat text-left">
          <div className="chat-header font-semibold">
            {msg.author} ({msg.authorRole})
          </div>
          <div className="chat-bubble bg-base-200 text-white w-fit">
            {msg.content}
          </div>
          <div className="chat-footer opacity-50 text-xs">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
