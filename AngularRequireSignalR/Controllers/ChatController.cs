using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

using AngularRequireSignalR.Services;

namespace AngularRequireSignalR.Controllers
{
    [RoutePrefix("Chat")]
    public class ChatController : Controller
    {
        private readonly IChatRoomService _chatRoomService;

        public ChatController(IChatRoomService chatRoomService)
        {
            _chatRoomService = chatRoomService;
        }

        [Route("Room/{roomName}")]
        public ActionResult Room(string roomName)
        {
            return View(_chatRoomService.GetOrCreateChatRoom(roomName));
        }

        [Route("Join")]
        public ActionResult Join(string roomName)
        {
            return RedirectToAction("Room", new { roomName });
        }
    }
}