using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularRequireSignalR.Hubs.ViewModels
{
    public interface IChatRoom
    {
        List<ChatUser> Users { get; }
        List<ChatMessage> Messages { get; }
        ChatUser AddUser(string userId, string userName);
        ChatMessage AddMessage(string userId, string text);
    }

    public class ChatRoom : IChatRoom
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
}