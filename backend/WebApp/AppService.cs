using System;
using System.Linq;
using ServiceStack;
using ServiceStack.Auth;

namespace WebApp
{
    public class AppService : Service
    {
        public object Get(ServerInfoRequest request)
        {
            return new
            {
                Result = new
                {
                    RuntimeId = AppHost.RuntimeId,
                    ServerTime = DateTime.Now,
                    ServerTimeUtc = DateTime.UtcNow,
                    Plugins = ServiceStackHost.Instance.Plugins.Select(p => p.GetType().FullName).ToList(),
                    Routes = ServiceStackHost.Instance.RestPaths,
                    Session = base.GetSession(false)
                    }
            };
        }
    }

    [Route("/server", "GET")]
    public class ServerInfoRequest
    {

    }
}