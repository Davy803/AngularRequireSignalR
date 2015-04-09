using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AngularRequireSignalR.Hubs
{
    [HubName("chatRoom")]
    public class ChatHub : Hub
    {
        private static readonly ChatRoom _staticChatRoom = new ChatRoom();
        private readonly ChatRoom _chatRoom = new ChatRoom();

        public ChatHub():this(null)
        {
            
        }

        public ChatHub(ChatRoom chatRoom)
        {
            _chatRoom = chatRoom ?? _staticChatRoom;
        }

        public List<ChatUser> ListUsers()
        {
            return _chatRoom.Users;
        }

        public List<ChatMessage> ListMessages()
        {
            return _chatRoom.Messages;
        }

        public ChatUser AddUser(string userId, string userName)
        {
            var user = _chatRoom.AddUser(userId, userName);
            Clients.Others.addUser(user);
            return user;
        }

        public void AddMessage(string userId, string text)
        {
            var message = _chatRoom.AddMessage(userId, text);
            Clients.All.addMessage(message);
        }
    }

    public class ChatRoom
    {
        private readonly List<ChatUser> _users = new List<ChatUser>();
        private readonly List<ChatMessage> _messages = new List<ChatMessage>();

        public List<ChatUser> Users
        {
            get { return _users; }
        }

        public List<ChatMessage> Messages
        {
            get { return _messages; }
        }

        public ChatUser AddUser(string userId, string userName)
        {
            var user = new ChatUser { Id = userId ?? Guid.NewGuid().ToString(), Name = userName };
            Users.Add(user);
            return user;
        }

        public ChatMessage AddMessage(string userId, string text)
        {
            var message = new ChatMessage { UserId = userId, Message = text, TimeStamp = DateTime.Now };
            Messages.Add(message);
            return message;
        }
    }

    public class ChatMessage
    {
        public string UserId { get; set; }
        public string Message { get; set; }
        public DateTime TimeStamp { get; set; }
    }

    public class ChatUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}