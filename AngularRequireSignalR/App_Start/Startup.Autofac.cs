using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

using AngularRequireSignalR.Hubs.ViewModels;

using Autofac;
using Autofac.Integration.SignalR;

using Owin;

namespace AngularRequireSignalR
{
    public partial class Startup
    {
        public static IContainer ConfigureAutofac(IAppBuilder app)
        {
            var builder = new ContainerBuilder();

            RegisterDependencies(builder);

            var container = builder.Build();

            return container;
        }

        private static void RegisterDependencies(ContainerBuilder builder)
        {
            // You can register hubs all at once using assembly scanning...

            builder.RegisterHubs(Assembly.GetExecutingAssembly());

            builder.RegisterType<ChatRoom>().As<IChatRoom>().InstancePerLifetimeScope();
        }
    }
}