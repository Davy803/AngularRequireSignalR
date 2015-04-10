using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularRequireSignalR.Hubs.ViewModels
{
    public class ChatRoom : IChatRoom
    {
        private readonly string _roomName;

        public ChatRoom(string roomName)
        {
            _roomName = roomName;
        }

        private readonly List<ChatUser> _users = new List<ChatUser>();
        private readonly List<ChatMessage> _messages = new List<ChatMessage>();

        public string Name
        {
            get { return _roomName; }
        }

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
}