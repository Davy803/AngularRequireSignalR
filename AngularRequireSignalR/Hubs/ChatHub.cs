using System;
using System.Collections.Generic;
using System.Linq;

using AngularRequireSignalR.Hubs.ViewModels;
using AngularRequireSignalR.Services;

using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AngularRequireSignalR.Hubs
{
    [HubName("chatRoom")]
    public class ChatHub : Hub
    {
        private readonly IChatRoomService _chatRoomService;

        public ChatHub(IChatRoomService chatRoomService)
        {
            _chatRoomService = chatRoomService;
        }

        public List<ChatUser> ListUsers(string roomName)
        {
            return _chatRoomService.GetOrCreateChatRoom(roomName).Users;
        }

        public List<ChatMessage> ListMessages(string roomName)
        {
            return _chatRoomService.GetOrCreateChatRoom(roomName).Messages;
        }

        public ChatUser AddUser(string roomName, string userId, string userName)
        {
            var user = _chatRoomService.GetOrCreateChatRoom(roomName).AddUser(userId, userName);
            Clients.Others.addUser(user);
            return user;
        }

        public void AddMessage(string roomName, string userId, string text)
        {
            var message = _chatRoomService.GetOrCreateChatRoom(roomName).AddMessage(userId, text);
            Clients.All.addMessage(message);
        }
    }
}