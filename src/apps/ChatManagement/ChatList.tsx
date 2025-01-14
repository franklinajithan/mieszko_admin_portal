import React from "react";

interface ChatListProps {
  chats: { id: string; name: string }[];
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="w-1/3 bg-gray-100 border-r h-screen">
      <h2 className="p-4 text-lg font-semibold">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="p-4 cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
