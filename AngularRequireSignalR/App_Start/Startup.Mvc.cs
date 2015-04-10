using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

using Autofac;
using Autofac.Integration.Mvc;

using Owin;

namespace AngularRequireSignalR
{
    public partial class Startup
    {
        private static void ConfigureMvc(IAppBuilder app, IDependencyResolver autofacDependencyResolver, ILifetimeScope container)
        {
            // Run other optional steps, like registering model binders,
            // web abstractions, etc., then set the dependency resolver
            // to be Autofac.
            DependencyResolver.SetResolver(autofacDependencyResolver);

            // OWIN MVC SETUP:

            // Register the Autofac middleware FIRST, then the Autofac MVC middleware.
            app.UseAutofacMiddleware(container);
            app.UseAutofacMvc();
        }

        private static void RegisterMvcDependencies(ContainerBuilder builder)
        {
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
        }
    }
}