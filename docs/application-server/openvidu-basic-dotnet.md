# openvidu-basic-dotnet

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-dotnet" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a minimal OpenVidu server application sample built for .NET with [ASP.NET Core Minimal APIs](https://docs.microsoft.com/aspnet/core/tutorials/min-web-api?view=aspnetcore-6.0&tabs=visual-studio){:target="\_blank"}.
It internally uses the [OpenVidu REST API](reference-docs/REST-API/).

## Running this application

#### Prerequisites

To run this application you will need **.NET**:

- [.NET 7.0](https://dotnet.microsoft.com/en-us/download){:target="\_blank"}

#### Download repository

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.32.0
cd openvidu-tutorials/openvidu-basic-dotnet
```

#### Run application

```bash
dotnet run
```

## Understanding the code

The application is a simple ASP.NET Core Minimal APIs application with a single file `Program.cs` with two endpoints:

- `/api/sessions` : Initialize a session.
- `/api/sessions/:sessionId/connections` : Create a connection.

> You can get more information about these endpoints in the [Application Server Endpoints](application-server/#rest-endpoints) section.

Let's see the code of `Program.cs` file:

```cs
var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables().Build();

// Load env variables
var SERVER_PORT = config.GetValue<int>("SERVER_PORT");
var OPENVIDU_URL = config.GetValue<string>("OPENVIDU_URL");
var OPENVIDU_SECRET = config.GetValue<string>("OPENVIDU_SECRET");

// Enable CORS support
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("*").AllowAnyHeader();
                      });
});

builder.WebHost.UseKestrel(serverOptions => {
    serverOptions.ListenAnyIP(SERVER_PORT);
});

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);


// Allow for insecure certificate in OpenVidu deployment
var handler = new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
};
HttpClient client = new HttpClient(handler);
client.BaseAddress = new System.Uri(OPENVIDU_URL);
```

Starting by the top, the `Program.cs` file has the following fields:

- `builder`: a `WebApplicationBuilder` instance to build the application.
- `config`: a `IConfiguration` instance to load the configuration from the `appsettings.json` file.
- `client`: a `HttpClient` instance to make HTTP requests to the OpenVidu REST API.
- `MyAllowSpecificOrigins`: the name of the CORS policy to be used in the application.
- `app`: the `WebApplication` instance.
- `SERVER_PORT`: the port where the application will be listening.
- `OPENVIDU_URL`: the URL of your OpenVidu deployment.
- `OPENVIDU_SECRET`: the secret of your OpenVidu deployment.

The first thing the application does is to configure CORS support. The CORS policy is configured to allow requests from any origin and any header.

<br>

#### Initialize session endpoint

The first endpoint allows us to initialize a new [OpenVidu Session](developing-your-video-app/#session). The code of this endpoint is the following:

```cs
// Set OpenVidu deployment secret
var basicAuth = Convert.ToBase64String(System.Text.ASCIIEncoding.UTF8.GetBytes($"OPENVIDUAPP:{OPENVIDU_SECRET}"));
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", basicAuth);

app.MapPost("/api/sessions", async (HttpRequest request) =>
{
    String contentString;
    HttpContent content;
    using (var streamContent = new StreamContent(request.Body)) {
        contentString = await streamContent.ReadAsStringAsync();
        content = new StringContent(contentString, Encoding.UTF8, "application/json");
    }
    HttpResponseMessage response = await client.PostAsync("openvidu/api/sessions", content);
    if (response.StatusCode == HttpStatusCode.Conflict) {
        // Session already exists in OpenVidu
        var bodyRequest = JsonSerializer.Deserialize<Dictionary<string, object>>(contentString);
        return bodyRequest["customSessionId"];
    }
    response.EnsureSuccessStatusCode();
    var responseBody = await response.Content.ReadFromJsonAsync<Dictionary<string, object>>();
    var sessionId = responseBody["sessionId"].ToString().Trim('"');
    return sessionId;
});
```

The endpoint creates a new Session using the [OpenVidu REST API](reference-docs/REST-API/) and returns the `sessionId` of the new session. If the request brought a `customSessionId` parameter and that session already existed in the OpenVidu deployment (that's the `409 CONFLICT` error), then the endpoint simply returns the same `customSessionId`. At this point the Session is ready to create Connections, whether it is a newly created Session or an already existing one.

<br>

#### Create conneciton endpoint

The second endpoint allows us to create a new [OpenVidu Connection](developing-your-video-app/#connection) in the session:

```cs
app.MapPost("/api/sessions/{sessionId}/connections", async (HttpRequest request, [FromRoute] string sessionId) =>
{
    HttpContent content;
    using (var streamContent = new StreamContent(request.Body)) {
        var contentString = await streamContent.ReadAsStringAsync();
        content = new StringContent(contentString, Encoding.UTF8, "application/json");
    }
    HttpResponseMessage response = await client.PostAsync("openvidu/api/sessions/" + sessionId.Trim('"') + "/connection", content);
    response.EnsureSuccessStatusCode();
    var responseBody = await response.Content.ReadFromJsonAsync<Dictionary<string, object>>();
    var token = responseBody["token"].ToString().Trim('"');
    return token;
});
```

The endpoint creates a new `Connection` using the [OpenVidu REST API](reference-docs/REST-API/) and returns the `token` of the new connection. We can use this token in [openviu-browser SDK](reference-docs/openvidu-browser/) to connect the user to the Session.
