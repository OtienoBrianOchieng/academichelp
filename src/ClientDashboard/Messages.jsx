import React, { useState } from "react";

const Messages = () => {
  // Sample messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Support Team",
      subject: "Welcome to AcademicHelp!",
      body: "Thank you for joining AcademicHelp. We're here to assist you with all your academic needs.",
      timestamp: "2023-10-01 10:00 AM",
      isRead: false,
      replies: [],
    },
    {
      id: 2,
      sender: "Order Team",
      subject: "Your Order #ORD12345 has been received",
      body: "We have received your order and will begin working on it shortly.",
      timestamp: "2023-10-02 11:30 AM",
      isRead: false,
      replies: [],
    },
    {
      id: 3,
      sender: "Writer",
      subject: "Question about your order",
      body: "Could you please provide more details about the topic?",
      timestamp: "2023-10-03 09:15 AM",
      isRead: false,
      replies: [],
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    // Mark the message as read
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, isRead: true } : msg
      )
    );
  };

  const handleBack = () => {
    setSelectedMessage(null);
    setReplyText("");
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() === "") return;

    const newReply = {
      id: Date.now(), // Unique ID for the reply
      sender: "You",
      body: replyText,
      timestamp: new Date().toLocaleString(),
    };

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === selectedMessage.id
          ? { ...msg, replies: [...msg.replies, newReply] }
          : msg
      )
    );

    setReplyText("");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>

      {selectedMessage ? (
        // Display selected message details
        <div>
          <button
            onClick={handleBack}
            className="text-green-600 hover:text-green-700 mb-4"
          >
            <i className="fas fa-arrow-left mr-2"></i>Back to Messages
          </button>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{selectedMessage.subject}</h3>
            <p className="text-sm text-gray-600 mb-2">
              From: <span className="font-medium">{selectedMessage.sender}</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Date: <span className="font-medium">{selectedMessage.timestamp}</span>
            </p>
            <p className="text-gray-700 mb-6">{selectedMessage.body}</p>

            {/* Display replies */}
            {selectedMessage.replies.length > 0 && (
              <div className="mt-6 space-y-4">
                {selectedMessage.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      From: <span className="font-medium">{reply.sender}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Date: <span className="font-medium">{reply.timestamp}</span>
                    </p>
                    <p className="text-gray-700">{reply.body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply form */}
            <form onSubmit={handleReplySubmit} className="mt-6">
              <textarea
                value={replyText}
                onChange={handleReplyChange}
                placeholder="Type your reply..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600"
                rows="4"
              />
              <button
                type="submit"
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Reply
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Display list of messages
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className={`p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                message.isRead ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{message.subject}</h3>
                  <p className="text-sm text-gray-600">
                    From: <span className="font-medium">{message.sender}</span>
                  </p>
                </div>
                <div className="text-sm text-gray-600">{message.timestamp}</div>
              </div>
              {!message.isRead && (
                <div className="mt-2">
                  <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                  <span className="ml-2 text-sm text-green-600">New</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;