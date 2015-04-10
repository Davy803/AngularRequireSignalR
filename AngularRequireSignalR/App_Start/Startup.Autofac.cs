using System;
using System.Collections.Generic;
using System.Linq;

using AngularRequireSignalR.Hubs.ViewModels;
using AngularRequireSignalR.Services;

using Autofac;

using Owin;

namespace AngularRequireSignalR
{
    public partial class Startup
    {
        public static void ConfigureAutofac(IAppBuilder app)
        {
            var builder = new ContainerBuilder();

            RegisterDependencies(builder);

            var container = builder.Build();

            ConfigureSignalR(app, new Autofac.Integration.SignalR.AutofacDependencyResolver(container));

            ConfigureMvc(app, new Autofac.Integration.Mvc.AutofacDependencyResolver(container), container);
        }

        private static void RegisterDependencies(ContainerBuilder builder)
        {
            // You can register hubs all at once using assembly scanning...
            RegisterSignalRDependencies(builder);
            RegisterMvcDependencies(builder);

            builder.RegisterType<ChatRoom>().As<IChatRoom>();
            builder.RegisterType<ChatRoomService>().As<IChatRoomService>().SingleInstance();
        }
    }
}