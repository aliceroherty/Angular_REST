using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace RESTApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        private static bool loaded = false;

        protected void Application_Start()
        {
                       

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //Serve serialized objects with camel casing
            GlobalConfiguration.Configuration
              .Formatters
              .JsonFormatter
              .SerializerSettings
              .ContractResolver = new CamelCasePropertyNamesContractResolver();
            GlobalConfiguration.Configuration
            .Formatters
            .JsonFormatter
            .SerializerSettings
            .NullValueHandling = NullValueHandling.Ignore;
        }

        public void Application_BeginRequest(object sender, EventArgs e)
        {
           if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                //These headers are handling the "pre-flight" OPTIONS call sent by the browser
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token");
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow‌​-Credentials", "true");
                //HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                //HttpContext.Current.Response.End();
            }

            if (Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.StatusCode = 200;
                var httpApplication = sender as HttpApplication;
                httpApplication.CompleteRequest();
            }

            if (!loaded)
            {
                loaded = true;
            }
        }
    }
}
