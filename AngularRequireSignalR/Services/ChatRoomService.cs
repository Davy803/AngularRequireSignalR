using System;
using System.Collections.Generic;
using System.Linq;

using AngularRequireSignalR.Hubs.ViewModels;

namespace AngularRequireSignalR.Services
{
    public class ChatRoomService : IChatRoomService
    {
        private readonly Dictionary<string, IChatRoom> _chatRooms = new Dictionary<string, IChatRoom>();

        public IChatRoom GetOrCreateChatRoom(string roomName)
        {
            if (!_chatRooms.ContainsKey(roomName))
            {
                _chatRooms.Add(roomName, new ChatRoom(roomName));
            }
            return _chatRooms[roomName];
        }

        public IEnumerable<string> ListRooms()
        {
            return _chatRooms.Values.Select(x => x.Name);
        }
    }
}