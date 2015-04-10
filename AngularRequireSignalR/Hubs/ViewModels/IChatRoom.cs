using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularRequireSignalR.Hubs.ViewModels
{
    public interface IChatRoom
    {
        string Name { get; }
        List<ChatUser> Users { get; }
        List<ChatMessage> Messages { get; }
        ChatUser AddUser(string userId, string userName);
        ChatMessage AddMessage(string userId, string text);
    }
}