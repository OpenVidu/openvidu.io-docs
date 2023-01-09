# openvidu-basic-dotnet

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-dotnet" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>


This is a minimal OpenVidu server application sample built for Python with .NET.
It internally uses the [OpenVidu REST API](reference-docs/REST-API/).


## Running this application

#### Prerequisites
To run this application you will need **.NET** installed on your system:

- [.NET 6.0](https://dotnet.microsoft.com/en-us/download)

#### Download repository

```bash
git clone git@github.com:OpenVidu/openvidu-tutorials.git
cd openvidu-tutorials/openvidu-basic-dotnet
```

#### Run application

```bash
dotnet run
```

## Understanding the code


The application is a simple .NET application with a single controller file `Program.cs` that exports two endpoints:

- `/api/sessions` : Initialize a session.
- `/api/sessions/{{SESSION_ID}}/connections` : Create a connection.

> You can get more information about theses endpoints in the [Application Server Endpoints](application-server/#rest-endpoints) section.


Let's see the code of the controller:

```cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Enable CORS support
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("*").AllowAnyHeader();
                      });
});

app.UseCors(MyAllowSpecificOrigins);


IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables().Build();

// Load env variables
var OPENVIDU_URL = config.GetValue<string>("OPENVIDU_URL");
var OPENVIDU_SECRET = config.GetValue<string>("OPENVIDU_SECRET");
// Allow for insecure certificate in OpenVidu deployment
var handler = new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
};
HttpClient client = new HttpClient(handler);
client.BaseAddress = new System.Uri(OPENVIDU_URL);

...

```

Starting by the top, the `Program.cs` file has the followinf fields:

- `OPENVIDU_URL`: The URL of your OpenVidu deployment.
- `OPENVIDU_SECRET`: The secret of your OpenVidu deployment.
- `client`: A `HttpClient` instance to make HTTP requests to the OpenVidu REST API.
- `MyAllowSpecificOrigins`: The name of the CORS policy to be used in the application.
- `app`: The `WebApplication` instance.

The first thing the application does is to configure CORS support.  This is needed to allow the browser to make requests to the application server. The CORS policy is configured to allow requests from any origin and any header.

<br>

#### Initialize session endpoint

The first endpoint allows us initialize a new [OpenVidu Session](/developing-your-video-app/#session). The code of this endpoint is the following:

```cs
...

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

The endpoint creates a new Session using the [OpenVidu REST API](reference-docs/REST-API/) and returns the `sessionId` of the new session.


<br>

#### Create conneciton endpoint

The second and last endpoint has the goal of creating a new [OpenVidu Connection](/developing-your-video-app/#connection) in a session:

```cs
...

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

The endpoint creates a new Connection using the [OpenVidu REST API](reference-docs/REST-API/) and returns the `token` of the new connection.

