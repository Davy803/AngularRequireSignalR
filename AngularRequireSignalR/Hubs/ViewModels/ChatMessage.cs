using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularRequireSignalR.Hubs.ViewModels
{
    public class ChatMessage
    {
        public string UserId { get; set; }
        public string Message { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}