using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularRequireSignalR.Startup))]
namespace AngularRequireSignalR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            //app.MapSignalR();
            var hubConfiguration = new HubConfiguration();
            hubConfiguration.EnableDetailedErrors = true;
            app.MapSignalR(hubConfiguration);
        }
    }
}
