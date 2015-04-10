using System;
using System.Collections.Generic;
using System.Linq;

using Autofac.Integration.SignalR;

using Microsoft.Owin;

using Owin;

[assembly: OwinStartup(typeof(AngularRequireSignalR.Startup))]

namespace AngularRequireSignalR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            
            var container = ConfigureAutofac(app);
            
            ConfigureSignalR(app, new AutofacDependencyResolver(container));
        }
    }
}