import React, { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Simulate API fetch
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockMessages = [
          {
            id: 1,
            sender: "Support Team",
            subject: "Welcome to AcademicHelp!",
            body: "Thank you for joining AcademicHelp. We're here to assist you with all your academic needs.",
            timestamp: format(parseISO("2023-10-01T10:00:00"), "MMM d, yyyy h:mm a"),
            isRead: false,
            replies: [],
          },
          {
            id: 2,
            sender: "Order Team",
            subject: "Your Order #ORD12345 has been received",
            body: "We have received your order and will begin working on it shortly.",
            timestamp: format(parseISO("2023-10-02T11:30:00"), "MMM d, yyyy h:mm a"),
            isRead: false,
            replies: [],
          },
          {
            id: 3,
            sender: "Writer",
            subject: "Question about your order",
            body: "Could you please provide more details about the topic?",
            timestamp: format(parseISO("2023-10-03T09:15:00"), "MMM d, yyyy h:mm a"),
            isRead: false,
            replies: [],
          },
        ];
        
        setMessages(mockMessages);
      } catch (err) {
        setError("Failed to load messages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);

  const handleMessageClick = (messageId) => {
    setSelectedMessageId(messageId);
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  const handleBack = () => {
    setSelectedMessageId(null);
    setReplyText("");
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessageId) return;

    const newReply = {
      id: Date.now(),
      sender: "You",
      body: replyText,
      timestamp: format(new Date(), "MMM d, yyyy h:mm a"),
    };

    setMessages(prev =>
      prev.map(msg =>
        msg.id === selectedMessageId
          ? { ...msg, replies: [...msg.replies, newReply] }
          : msg
      )
    );
    setReplyText("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-600">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>

      {selectedMessage ? (
        <div className="space-y-4">
          <button
            onClick={handleBack}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Messages
          </button>

          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{selectedMessage.subject}</h3>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
              <p>From: <span className="font-medium">{selectedMessage.sender}</span></p>
              <p>Date: <span className="font-medium">{selectedMessage.timestamp}</span></p>
            </div>

            <p className="text-gray-700 whitespace-pre-line">{selectedMessage.body}</p>

            {selectedMessage.replies.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="font-medium text-gray-800">
                  Replies ({selectedMessage.replies.length})
                </h4>
                {selectedMessage.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-2">
                      <p>From: <span className="font-medium">{reply.sender}</span></p>
                      <p>Date: <span className="font-medium">{reply.timestamp}</span></p>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{reply.body}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleReplySubmit} className="mt-6 space-y-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Send Reply
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              You have no messages.
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleMessageClick(message.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  message.isRead 
                    ? "bg-gray-50 border-gray-200 hover:bg-gray-100" 
                    : "bg-white border-l-4 border-l-green-500 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{message.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      From: <span className="font-medium">{message.sender}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {message.timestamp}
                  </p>
                </div>
                {!message.isRead && (
                  <div className="mt-2 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="ml-2 text-xs text-green-600 font-medium">NEW</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;