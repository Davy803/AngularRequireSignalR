using System;
using System.Collections.Generic;
using System.Linq;

using AngularRequireSignalR.Hubs.ViewModels;

namespace AngularRequireSignalR.Services
{
    public interface IChatRoomService
    {
        IChatRoom GetOrCreateChatRoom(string roomName);
        IEnumerable<string> ListRooms();
    }
}