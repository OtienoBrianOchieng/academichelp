import React, { useState, useEffect, useRef } from "react";
import { format, parseISO } from 'date-fns';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef(null);

  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedMessageId, selectedMessage?.replies]);

  // Handle order navigation
  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Render message text with clickable order numbers
  const renderMessageWithOrderLinks = (text) => {
    const orderNumberRegex = /(#ORD\d+)/g;
    return text.split(orderNumberRegex).map((part, index) => {
      if (orderNumberRegex.test(part)) {
        const orderId = part.replace('#', '');
        return (
          <span 
            key={index}
            className="text-blue-500 hover:text-blue-400 cursor-pointer underline"
            onClick={(e) => {
              e.stopPropagation();
              handleOrderClick(orderId);
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockMessages = [
          {
            id: 1,
            sender: "Support Team",
            subject: "Your Order #ORD12345",
            orderId: "ORD12345",
            orderStatus: "Completed",
            body: "Your order #ORD12345 has been completed. Please review the work and let us know if you need any revisions.",
            timestamp: format(parseISO("2023-10-01T10:00:00"), "MMM d, yyyy h:mm a"),
            isRead: false,
            replies: [
              {
                id: 101,
                sender: "You",
                body: "Thanks! I have some revision requests for order #ORD12345.",
                timestamp: format(parseISO("2023-10-01T11:30:00"), "MMM d, yyyy h:mm a"),
              }
            ],
          },
          {
            id: 2,
            sender: "Writer",
            subject: "Question about Order #ORD67890",
            orderId: "ORD67890",
            orderStatus: "In Progress",
            body: "I have a question about your requirements for order #ORD67890. Could you clarify the formatting requirements?",
            timestamp: format(parseISO("2023-10-02T11:30:00"), "MMM d, yyyy h:mm a"),
            isRead: false,
            replies: [],
          },
          {
            id: 3,
            sender: "Billing Team",
            subject: "Payment Received for Order #ORD98765",
            orderId: "ORD98765",
            orderStatus: "Drafting",
            body: "We've received payment for order #ORD98765. Your writer has started working on it.",
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
      <div className="flex justify-center items-center h-64 text-gray-600">
        <div className="animate-pulse">Loading messages...</div>
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
    <div className={`flex flex-col h-[calc(100vh-2rem)] p-4 max-w-4xl mx-auto ${selectedMessage ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>
      <h2 className={`text-2xl font-bold mb-4 px-2 ${selectedMessage ? "text-white" : "text-gray-800"}`}>Messages</h2>

      {selectedMessage ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          <button
            onClick={handleBack}
            className="flex items-center text-green-400 hover:text-green-300 transition-colors mb-4 px-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Messages
          </button>

          <div className="flex-1 overflow-y-auto overflow-x-hidden px-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white break-words">
                {selectedMessage.subject}
              </h3>
              {selectedMessage.orderId && (
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedMessage.orderStatus === "Completed" ? "bg-green-100 text-green-800" :
                    selectedMessage.orderStatus === "In Progress" ? "bg-blue-100 text-blue-800" :
                    selectedMessage.orderStatus === "Revision" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {selectedMessage.orderStatus}
                  </span>
                  <button
                    onClick={() => handleOrderClick(selectedMessage.orderId)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm"
                  >
                    View Order #{selectedMessage.orderId}
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-4 pb-4">
              {/* Original Message */}
              <div className="flex justify-start">
                <div className="max-w-[75%] min-w-0 bg-gray-700 p-4 rounded-lg rounded-tl-none break-words overflow-hidden">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-300 mb-2">
                    <p>{selectedMessage.sender}</p>
                    <p>{selectedMessage.timestamp}</p>
                  </div>
                  <p className="text-gray-100 whitespace-pre-wrap break-words">
                    {renderMessageWithOrderLinks(selectedMessage.body)}
                  </p>
                </div>
              </div>

              {/* Replies */}
              {selectedMessage.replies.map((reply) => (
                <div 
                  key={reply.id} 
                  className={`flex ${reply.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[75%] min-w-0 p-4 rounded-lg break-words overflow-hidden ${
                    reply.sender === "You" 
                      ? "bg-green-600 rounded-tr-none" 
                      : "bg-gray-700 rounded-tl-none"
                  }`}>
                    <div className={`flex flex-wrap gap-x-4 gap-y-1 text-sm mb-2 ${
                      reply.sender === "You" ? "text-green-100" : "text-gray-300"
                    }`}>
                      <p>{reply.sender}</p>
                      <p>{reply.timestamp}</p>
                    </div>
                    <p className={`whitespace-pre-wrap break-words ${
                      reply.sender === "You" ? "text-white" : "text-gray-100"
                    }`}>
                      {renderMessageWithOrderLinks(reply.body)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleReplySubmit} className="mt-4 pt-4 border-t border-gray-700 px-2">
            <div className="relative">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-4 pr-12 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white resize-none break-words"
                rows={3}
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className={`absolute right-3 bottom-3 p-2 rounded-full transition-colors ${
                  replyText.trim()
                    ? "bg-green-500 hover:bg-green-400 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                <PaperAirplaneIcon className="h-5 w-5 transform rotate-45" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 px-2">
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
                <div className="flex justify-between items-start min-w-0">
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">
                      {message.subject}
                    </h3>
                    {message.orderId && (
                      <div className="flex items-center mt-1 space-x-2">
                        <span 
                          className={`text-xs px-2 py-1 rounded-full ${
                            message.orderStatus === "Completed" ? "bg-green-100 text-green-800" :
                            message.orderStatus === "In Progress" ? "bg-blue-100 text-blue-800" :
                            message.orderStatus === "Revision" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.orderStatus}
                        </span>
                        <span 
                          className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrderClick(message.orderId);
                          }}
                        >
                          #{message.orderId}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      From: <span className="font-medium">{message.sender}</span>
                    </p>
                    {message.replies.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
                      </p>
                    )}
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