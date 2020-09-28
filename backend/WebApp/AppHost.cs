using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Funq;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Text;

namespace WebApp
{
    public class AppHost : AppHostBase
    {
        // Create a runtime id that lets you track if the server has restarted or not
        public static string RuntimeId = Guid.NewGuid().ToString("N");

        public AppHost(string applicationName) : base(applicationName, typeof(AppHost).Assembly)
        {
            this.ApplicationName = applicationName;
        }

        public string ApplicationName { get; }

        public override void Configure(Container container)
        {
            JsConfig.DateHandler = DateHandler.ISO8601;

            //-------------------------------------------------------------
            // Configure AuthFeature
            //
            // ** Re-wire explicit routes to use an '/api' prefix

            Plugins.Add(new AuthFeature(() => new CustomUserSession(),
                new IAuthProvider[]
                {
                    new BasicAuthProvider(),
                        new CredentialsAuthProvider(),
                        new JwtAuthProvider()
                        {
                            RequireSecureConnection = false,
                                HashAlgorithm = "RS256",
                                PrivateKeyXml = GetPrivateKeyXml()
                        }
                })
            {
                HtmlRedirect = "/auth/sign-in",
                    DeleteSessionCookiesOnLogout = true,
                    GenerateNewSessionCookiesOnAuthentication = true,
                    ServiceRoutes = new Dictionary<Type, string[]>
                    { { typeof(AuthenticateService), new [] { "/api/auth", "/api/auth/{provider}" } }
                    },
                    IncludeAssignRoleServices = false
            });

            Plugins.Add(new RegistrationFeature() { AtRestPath = "/api/auth/register" });

            container.Register<ICacheClient>(new MemoryCacheClient());
            var userRep = new InMemoryAuthRepository();
            container.Register<IUserAuthRepository>(userRep);

            //-------------------------------------------------------------
            // Create Test Accounts

            CreateAccountIfNotExists(container, "admin", "Administrator", "/images/avatar1-bw.png", "Admin");
            CreateAccountIfNotExists(container, "guest", "Guest", "/images/avatar2-bw.png");

            //-------------------------------------------------------------
            // Add CORS
            Plugins.Add(new CorsFeature(allowCredentials: true,
                allowedHeaders: "Content-Type, Allow, Authorization"));
        }

        // Automatically prefix all service routes to desired path structure (in this case /api/{rest of route})
        public override RouteAttribute[] GetRouteAttributes(Type requestType)
        {
            var routeAttributes = base.GetRouteAttributes(requestType);
            foreach (var routeAttribute in routeAttributes)
            {
                if (!routeAttribute.Path.StartsWithIgnoreCase("/api"))
                {
                    routeAttribute.Path = "/api" + routeAttribute.Path;
                }
            }
            return routeAttributes;
        }

        private void CreateAccountIfNotExists(Container container, string username, string displayName, string pictureUrl, params string[] roles)
        {
            var repo = container.Resolve<IUserAuthRepository>();
            if (repo.GetUserAuthByUserName(username) == null)
            {
                var user = new UserAuth
                {
                FullName = displayName,
                DisplayName = displayName,
                UserName = username,
                Roles = roles != null ? roles.ToList() : new List<string>()
                };
                if (user.Meta == null)
                {
                    user.Meta = new Dictionary<string, string>();
                }
                if (!string.IsNullOrWhiteSpace(pictureUrl))
                {
                    user.Meta.Add("picture", pictureUrl);
                }
                repo.CreateUserAuth(user, "Pa$$w0rd");
            }
        }

        private string GetPrivateKeyXml()
        {
            // TODO: you can do better than this obviously :-) 

            var privateKeyFile = "privateKey.xml".MapHostAbsolutePath();
            if (!File.Exists(privateKeyFile))
                File.WriteAllText(privateKeyFile, RsaUtils.CreatePrivateKeyParams(RsaKeyLengths.Bit2048).ToPrivateKeyXml());
            return File.ReadAllText(privateKeyFile);
        }
    }

    public class CustomUserSession : AuthUserSession
    {
        public override void OnAuthenticated(IServiceBase authService, IAuthSession session, IAuthTokens tokens, Dictionary<string, string> authInfo)
        {
            base.OnAuthenticated(authService, session, tokens, authInfo);
            var profileUrl = session.GetProfileUrl();
            if (string.IsNullOrWhiteSpace(profileUrl) || profileUrl.EndsWithIgnoreCase("no-profile64.png"))
            {
                var userAuth = authService.TryResolve<IUserAuthRepository>().GetUserAuthByUserName(session.UserName);
                if (userAuth != null)
                {
                    profileUrl = userAuth.Meta?.GetValueOrDefault("picture");
                }
            }
            session.ProfileUrl = string.IsNullOrWhiteSpace(profileUrl) ? "/images/avatar2-bw.png" : profileUrl;
            authService.SaveSession(session);
        }
    }

}