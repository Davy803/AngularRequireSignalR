using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using AngularRequireSignalR.Services;

namespace AngularRequireSignalR.Controllers
{
    public class HomeController : Controller
    {
        private readonly IChatRoomService _chatRoomService;

        public HomeController(IChatRoomService chatRoomService)
        {
            _chatRoomService = chatRoomService;
        }

        public ActionResult Index()
        {
            return View(_chatRoomService);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}