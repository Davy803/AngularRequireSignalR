using System;
using System.Collections.Generic;
using System.Linq;

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

            ConfigureAutofac(app);
        }
    }
}