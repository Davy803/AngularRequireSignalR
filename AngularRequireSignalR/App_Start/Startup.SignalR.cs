using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

using Autofac;
using Autofac.Integration.SignalR;

using Microsoft.AspNet.SignalR;

using Owin;

namespace AngularRequireSignalR
{
    public partial class Startup
    {
        private static void ConfigureSignalR(IAppBuilder app, IDependencyResolver autofacDependencyResolver)
        {
            var hubConfiguration = new HubConfiguration
            {
                EnableDetailedErrors = true,
                Resolver = autofacDependencyResolver
            };

            app.MapSignalR(hubConfiguration);
        }


        private static void RegisterSignalRDependencies(ContainerBuilder builder)
        {
            builder.RegisterHubs(Assembly.GetExecutingAssembly());
        }
    }
}