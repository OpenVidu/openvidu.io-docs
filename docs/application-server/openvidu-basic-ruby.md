# openvidu-basic-ruby

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-ruby" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a minimal OpenVidu server application sample built for Ruby with [Sinatra](https://sinatrarb.com/){:target="_blank"}.
It internally uses the [OpenVidu REST API](reference-docs/REST-API/).


## Running this application

#### Prerequisites
To run this application you will need **Ruby** installed on your system:

- [Ruby](https://www.ruby-lang.org/en/downloads/){:target="_blank"}

#### Download repository

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.32.0
cd openvidu-tutorials/openvidu-basic-ruby
```

#### Install dependencies

```bash
bundle install
```

#### Run application

```bash
ruby app.rb
```

## Understanding the code

The application is a simple Ruby application using the popular Sinatra (web server) and Faraday (http client) libraries. It has a single controller file `app.rb` that exports two endpoints:

- `/api/sessions` : Initialize a session.
- `/api/sessions/:sessionId/connections` : Create a connection.

> You can get more information about these endpoints in the [Application Server Endpoints](application-server/#rest-endpoints) section.

Let's see the code of the controller:

```ruby
require 'sinatra'
require 'sinatra/cors'
require 'faraday'
require 'json'
require './env.rb'

# Load env variables
SERVER_PORT = ENV['SERVER_PORT']
OPENVIDU_URL = ENV['OPENVIDU_URL']
OPENVIDU_SECRET = ENV['OPENVIDU_SECRET']

set :port, SERVER_PORT

register Sinatra::Cors
set :allow_origin, "*"
set :allow_methods, "POST,OPTIONS"
set :allow_headers, "content-type"
```

Starting by the top, the `app.rb` file has the following statements:

- All the `require` instructions: load the necessary libraries and environment variables.
- `SERVER_PORT`: port of the application server.
- `OPENVIDU_URL`: the URL of your OpenVidu deployment.
- `OPENVIDU_SECRET`: the secret of your OpenVidu deployment.

Then the application configures the port retrieved from the environment variables (file `env.rb`) and sets the CORS configuration for Sinatra. The CORS policy is configured to allow requests from any origin and any header.

<br>

#### Initialize session endpoint

The first endpoint allows us to initialize a new [OpenVidu Session](developing-your-video-app/#session). The code of this endpoint is the following:

```ruby
post '/api/sessions' do
  begin
    body = request.body.read
    response = Faraday.post do |req|
      req.url "#{OPENVIDU_URL}openvidu/api/sessions"
      req.headers['Content-Type'] = 'application/json'
      req.headers['Authorization'] = "Basic #{Base64.encode64("OPENVIDUAPP:#{OPENVIDU_SECRET}").strip}"
      req.body = body
    end
    if response.success?
      (JSON.parse response.body)['sessionId']
    else
      if response.status == 409
        # Session already exists in OpenVidu
        (JSON.parse body)['customSessionId']
      else
        status response.status
        body response.body
      end
    end
  rescue Faraday::Error => err
    err.response
  end
end
```

The endpoint creates a new Session using the [OpenVidu REST API](reference-docs/REST-API/) and returns the `sessionId` of the new session. If the request brought a `customSessionId` parameter and that session already existed in the OpenVidu deployment (that's the `409 CONFLICT` error), then the endpoint simply returns the same `customSessionId`. At this point the Session is ready to create Connections, whether it is a newly created Session or an already existing one.

<br>

#### Create connection endpoint

The second endpoint allows us to create a new [OpenVidu Connection](developing-your-video-app/#connection) in the session:

```ruby
post '/api/sessions/:sessionId/connections' do
  begin
    body = request.body.read
    response = Faraday.post do |req|
      req.url "#{OPENVIDU_URL}openvidu/api/sessions/#{params['sessionId']}/connection"
      req.headers['Content-Type'] = 'application/json'
      req.headers['Authorization'] = "Basic #{Base64.encode64("OPENVIDUAPP:#{OPENVIDU_SECRET}").strip}"
      req.body = body
    end
    if response.success?
      (JSON.parse response.body)['token']
    else
      status response.status
      body response.body
    end
  rescue Faraday::Error => err
    err.response
  end
end
```

The endpoint creates a new Connection using the [OpenVidu REST API](reference-docs/REST-API/) and returns the `token` of the new connection. We can use this token in [openviu-browser SDK](reference-docs/openvidu-browser/) to connect the user to the Session.
