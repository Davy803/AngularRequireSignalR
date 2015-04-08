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
        private readonly ChatRoom _chatRoom;

        public ChatHub():this(new ChatRoom())
        {
            
        }

        public ChatHub(ChatRoom chatRoom)
        {
            _chatRoom = chatRoom;
        }

        public void AddUser(ChatUser user)
        {
            _chatRoom.AddUser(user);
            Clients.Others.addUser(user);
        }

        public void AddMessage(string userId, string text)
        {
            var message = _chatRoom.AddMessage(userId, text);
            Clients.Others.addMessage(message);
        }
    }

    public class ChatRoom
    {
        readonly List<ChatUser> _users = new List<ChatUser>();
        readonly List<ChatMessage> _messages = new List<ChatMessage>();

        public void AddUser(ChatUser user)
        {
            _users.Add(user);
        }

        public ChatMessage AddMessage(string userId, string text)
        {
            var message = new ChatMessage { UserId = userId, Message = text, TimeStamp = DateTime.Now };
            _messages.Add(message);
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