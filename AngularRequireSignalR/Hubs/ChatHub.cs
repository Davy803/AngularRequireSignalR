using System;
using System.Collections.Generic;
using System.Linq;

using AngularRequireSignalR.Hubs.ViewModels;

using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AngularRequireSignalR.Hubs
{
    [HubName("chatRoom")]
    public class ChatHub : Hub
    {
        private readonly IChatRoom _chatRoom = new ChatRoom();

        public ChatHub():this(null)
        {
            
        }

        public ChatHub(IChatRoom chatRoom)
        {
            _chatRoom = chatRoom;
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
}