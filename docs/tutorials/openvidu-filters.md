# openvidu-filters
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-filters" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This tutorial is a modification of **[openvidu-js](tutorials/openvidu-js/)** which includes the posibility to apply voice and video filters to media streams on the media server. For more information about OpenVidu voice and video filters, check section **[Voice and video filters](advanced-features/filters)**.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-filters.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-filters.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial, as this app is no more than an extension of it with some new features and styles.

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.22.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You will need some kind of http web server installed in your development computer to serve the tutorial. If you have Node.js installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"}. It can be installed with:

```bash
npm install --location=global http-server
```

To serve the tutorial:

```bash
# Using the same repository openvidu-tutorials from step 2
http-server openvidu-tutorials/openvidu-filters/web
```

Go to [`http://localhost:8080`](http://localhost:8080){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

<div class="row no-margin row-gallery">
	<div class="col-md-4">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-filters-demo1.png">
            <img class="img-responsive" src="img/tutorials/openvidu-filters-demo1.png">
        </a>
	</div>
	<div class="col-md-4">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-filters-demo2.png">
            <img class="img-responsive" src="img/tutorials/openvidu-filters-demo2.png">
        </a>
	</div>
    <div class="col-md-4">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-filters-demo3.png">
            <img class="img-responsive" src="img/tutorials/openvidu-filters-demo3.png">
        </a>
	</div>
</div>

## Understanding the code

This application is very simple. It has only 4 files:

- `openvidu-browser-VERSION.js`: openvidu-browser library. You don't have to manipulate this file.
- `app.js`: sample application main JavaScript file, which makes use of _openvidu-browser-VERSION.js_. You can manipulate this file to suit your needs.
- `style.css`: some CSS classes to style _index.html_. You can manipulate this file to suit your needs.
- `index.html`: HTML code for the form to connect to a video-call and for the video-call itself. You can manipulate this file to suit your needs. It has two links to both JavaScript files:

<pre class="html-scripts">
    <code>&lt;script src="openvidu-browser-VERSION.js"&gt;&lt;/script&gt;
&lt;script src="app.js"&gt;&lt;/script&gt;</code>
</pre>

Let's see how `app.js` uses `openvidu-browser-VERSION.js`:

---

#### First lines declare the variables that will be needed in different points along the code

```javascript
var OV;
var session;
var publisher;
var role = 'PUBLISHER'; // ['SUBSCRIBER', 'PUBLISHER', 'MODERATOR']
var selectedStreamManager;
```

To handle in a better way **Camera videos** and **Screen Videos**, we declare two variabes for each type of video.

**OpenVidu global variables**:

- `OV`: OpenVidu object, entrypoint to the openvidu-browser SDK (see [OpenVidu](api/openvidu-browser/classes/OpenVidu.html)).
- `session`: the video-call we will connect to (see [Session](api/openvidu-browser/classes/Session.html)).
- `publisher`: the media stream we will publish to the session (see [Publisher](api/openvidu-browser/classes/Publisher.html)).
- `role`: the role our user will have in the session (see [OpenViduRole](api/openvidu-node-client/enums/openvidurole.html)).
- `selectedStreamManager`: the main video in display, that can be the local video (our publisher) or any remote video (subscribers). You can click on any video to make it the main video.

---

#### Let's initialize a new session and configure our events:

```javascript
var mySessionId = $("#sessionId").val();
var myUserName = $("#userName").val();
var startWithFilterEnabled = $('#start-filter-enabled').prop('checked');

// --- 1) Get an OpenVidu object ---

OV = new OpenVidu();

// --- 2) Init a session ---

session = OV.initSession();
```

As you can see in the code, the process is very simple: get an OpenVidu object and initialize a Session object with it. But first we also load from the HTML form the session ID that defines the OpenVidu Session we will connect to (`mySessionId`), and our user name in the session (`myUserName`). There is also a boolean variable (`startWithFilterEnabled`) that allows us to publish our media stream to the session with a filter already applied.

Then we subscribe to all the OpenVidu events that interest us:

```javascript
// --- 3) Specify the actions when events take place in the session ---

// On every new Stream received...
session.on('streamCreated', event => {

    // Subscribe to the Stream to receive it. HTML video will be appended to element with 'video-container' id
    var subscriber = session.subscribe(event.stream, 'video-container');

    // When the HTML video has been appended to DOM...
    subscriber.on('videoElementCreated', event => {
        // Add a new <p> element for the user's nickname just below its video
        appendUserData(event.element, subscriber);
    });

    // When the video starts playing remove the spinner
    subscriber.on('streamPlaying', function (event) {
        $('#spinner-' + subscriber.stream.connection.connectionId).remove();
    });

    // Listen to any subscriber filter applied or removed to update the filter control buttons
    subscriber.on('streamPropertyChanged', function (event) {
        // If the changed property is the filter and the current selected streamManager is this subscriber's one
        if (subscriber === selectedStreamManager && event.changedProperty === 'filter') {
            if (!!event.newValue) {
                showRemoveFilterButtons();
            } else {
                showApplyFilterButtons();
            }
        }
    });
});

// On every Stream destroyed...
session.on('streamDestroyed', event => {
    // Delete the HTML element with the user's nickname. HTML videos are automatically removed from DOM
    removeUserData(event.stream.connection);
});

// On every asynchronous exception...
session.on('exception', (exception) => {
    console.warn(exception);
});
```

Here we subscribe to the events that interest us. In this case, we want to receive all videos published to the session, as well as displaying every user's nickname next to its video. We also setup a load spinner to provide some feedback until the video is actually playing.

- `streamCreated`: for each new Stream received by OpenVidu, we immediately subscribe to it so we can see its video. A new HTML video element will be appended to element with id 'video-container'.

- `videoElementCreated`: event triggered by Subscriber object (returned by the previous `Session.subscribe` method). This allows us to add the participant nickname to the new video previously added in `streamCreated` event. Auxiliary method `appendUserData` is responsible for appending a new paragraph element just below the `event.element` video, containing `subscriber.stream.connection.data` field. In this case, this field contains the user's nickName. You can see how to feed this property from the client in a later step. Appart from the user's nickname, a CSS load spinner is also added on top of the video (it will be present until the video starts playing).

- `streamPlaying`: event triggered by Subscriber object. This allows us to remove the CSS load spinner that is added on `videoElementCreated` event handler.

- `streamPropertyChanged`: event triggered by Subscriber object. This allows us to modify the filter buttons whenever the [`filter`](api/openvidu-browser/classes/Stream.html#filter) property of the [`Subscriber.stream`](api/openvidu-browser/classes/Subscriber.html#stream) object changes.

- `streamDestroyed`: for each Stream that has been destroyed (which means a user has left the video-call), we remove the element with the user's nickname that we added in the previous event with the auxiliary method `removeUserData` (`appendUserData` method created the element with an _id_ containing `event.stream.connection.connectionId` unique value, so we can now identify the right element to be removed). OpenVidu automatically deletes the proper video element by default, so we don't need to do anything else.

- `exception`: event triggered by Session object when an asynchronous unexpected error takes place on the server-side

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/Event.html)

> Check [Application specific methods](#application-specific-methods) section to see all the auxiliary methods used in this app

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

Variable `mySessionId` is the OpenVidu Session we want a token from. Variable `role` is the OpenVidu role the token will provide to our user.

```javascript
// --- 4) Connect to the session with a valid user token ---

// Get a token from the OpenVidu deployment
getToken(mySessionId, role).then(token => {
	// See next point to see how to connect to the session using 'token'
}
```

This is the piece of code in charge of finally retrieving a token from the application server. The tutorial uses `jQuery.ajax()` method to perform the necessary [HTTP requests](application-server/#rest-endpoints).

```javascript
var APPLICATION_SERVER_URL = "http://localhost:5000/";

function getToken(mySessionId) {
	return createSession(mySessionId).then(sessionId => createToken(sessionId));
}

function createSession(sessionId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: APPLICATION_SERVER_URL + "api/sessions",
			data: JSON.stringify({ customSessionId: sessionId }),
			headers: { "Content-Type": "application/json" },
			success: response => resolve(response), // The sessionId
			error: (error) => reject(error)
		});
	});
}

function createToken(sessionId, role) {
	var openviduRole;
	var jsonBody = {
		role: role,
		kurentoOptions: {}
	};
	if (openviduRole !== 'SUBSCRIBER') {
		// Only the PUBLISHERS and MODERATORS need to configure the ability of applying filters
		jsonBody.kurentoOptions = {
			allowedFilters: ['FaceOverlayFilter', 'ChromaFilter', 'GStreamerFilter']
		}
	}
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
			data: JSON.stringify(jsonBody),
			headers: { "Content-Type": "application/json" },
			success: (response) => resolve(response), // The token
			error: (error) => reject(error)
		});
	});
}
```

---

#### Finally, connect to the session using the tokens and publish your webcam:

```javascript
// --- 4) Connect to the session with a valid user token ---

// Get a token from the OpenVidu deployment
getToken(mySessionId, role).then(token => {

    // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    session.connect(token, { clientData: myUserName }).then(() => {

        // --- 5) Set page layout for active call ---

        $('#session-title').text(mySessionId);
        $('#join').hide();
        $('#session').show();

        // --- 6) Get your own camera stream with the desired properties ---

        if (role !== 'SUBSCRIBER') {
            var publisherProperties = {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
                publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
                resolution: '1280x720',  // The resolution of your video
                frameRate: 30,			// The frame rate of your video
                insertMode: 'APPEND',	// How the video is inserted in the target element 'video-container'
                mirror: false       	// Whether to mirror your local video or not
            };

            // If the filter should be enabled from the beginning of the publishing
            if (startWithFilterEnabled) {
                publisherProperties.filter = {
                    type: 'GStreamerFilter',
                    options: { "command": "videobalance saturation=0.0" }
                }
            }

            publisher = OV.initPublisher('video-container', publisherProperties);

            // --- 7) Specify the actions when events take place in our publisher ---

            // When our HTML video has been added to DOM...
            publisher.on('videoElementCreated', function (event) {
                appendUserData(event.element, publisher);
                initMainVideo(publisher, myUserName);
            });
            // When our video has started playing...
            publisher.on('streamPlaying', function (event) {
                $('#spinner-' + publisher.stream.connection.connectionId).remove();
                $('#filter-btns').show();
                $('#buttonApplyFilter').prop('value', 'Apply filter to your stream');
                $('#buttonRemoveFilter').prop('value', 'Remove filter of your stream');
                $('#buttonApplyFilter').prop('disabled', false);
                $('#buttonRemoveFilter').prop('disabled', false);
                if (startWithFilterEnabled) {
                    showRemoveFilterButtons();
                } else {
                    showApplyFilterButtons();
                }
            });

            // Listen to your filter being applied or removed to update the filter control buttons
            publisher.on('streamPropertyChanged', function (event) {
                // If the changed property is the filter and the current selected streamManager is our publisher
                if (publisher === selectedStreamManager && event.changedProperty === 'filter') {
                    if (!!event.newValue) {
                        showRemoveFilterButtons();
                    } else {
                        showApplyFilterButtons();
                    }
                }
            });

            // --- 8) Publish your stream, indicating you want to receive your remote stream to see the filters ---
            publisher.subscribeToRemote();
            session.publish(publisher);

        } else {
            // Show a message warning the subscriber cannot publish
            $('#main-video video').css("background", "url('resources/images/subscriber-msg.jpg') round");
            $('#filter-btns').hide();
        }
    })
    .catch(error => {
        console.log('There was an error connecting to the session:', error.code, error.message);
    });
});
```

We connect to the Session using the Token and show the session view after a successful return. Then we just need to publish our webcam, if our role is different than `SUBSCRIBER`. We configure our Publisher with a filter if boolean `startWithFilterEnabled` was true, and we also make sure to add handlers to events `videoElementCreated`, `streamPlaying` and `streamPropertyChanged` to manage the video player and the filter buttons.

Finally, we call method [`Publisher.subscribeToRemote`](api/openvidu-browser/classes/Publisher.html#subscribeToRemote) to receive our own Stream from the media server (so we can see the filter applied to our local stream just as any remote user would do) and method [`Session.publish`](api/openvidu-browser/classes/Session.html#publish) to publish the stream.

---

#### Leaving the session

Whenever we want a user to leave the session, we just need to call `session.disconnect` method. We also make sure to disconnect the user before the page is unloaded using event `window.onbeforeunload`.

```javascript
function leaveSession() {

	// --- 9) Leave the session by calling 'disconnect' method over the Session object ---

	session.disconnect();

	// Removing all HTML elements with user's nicknames.
	// HTML videos are automatically removed when leaving a Session
	removeAllUserData();

	// Back to 'Join session' page
	$('#join').show();
	$('#filter-btns').hide();
	$('#session').hide();
}

window.onbeforeunload = function () {
	if (session) session.disconnect();
};
```

---

#### Filter related methods

Below are the two methods that manage the application and removal of filters to the streams. As you can see, filter methods are called upon [StreamManager.stream](api/openvidu-browser/classes/StreamManager.html#stream) object.

```javascript
// --- Filter related methods ---

function applyFilter() {
	var filter = { type: '', options: {} };
	var type = $('input[name=filter]:checked').val();
	switch (type) {
		case 'Grayscale':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": "videobalance saturation=0.0" };
			break;
		case 'Rotation':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": "videoflip method=vertical-flip" };
			break;
		case 'Faceoverlay':
			filter.type = 'FaceOverlayFilter';
			filter.options = {};
			break;
		case 'Audioecho':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": "audioecho delay=40000000 intensity=0.7 feedback=0.4" };
			break;
		case 'Amplify':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": "audioamplify amplification=1.7" };
			break;
		case 'Pitch':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": "pitch pitch=1.2" };
			break;
		case 'Videobox':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": "videobox fill=black top=-30 bottom=-30 left=-30 right=-30" };
			break;
		case 'Text':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": 'textoverlay text="Embedded text!" valignment=top halignment=right font-desc="Cantarell 25" draw-shadow=false' };
			break;
		case 'Time':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": 'timeoverlay valignment=bottom halignment=right font-desc="Sans, 20"' };
			break;
		case 'Clock':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": 'clockoverlay valignment=bottom halignment=right shaded-background=true font-desc="Sans, 20"' };
			break;
		case 'Chroma':
			filter.type = 'GStreamerFilter';
			filter.options = { "command": 'chromahold target-r=0 target-g=0 target-b=255 tolerance=90' };
			break;
	}
	selectedStreamManager.stream.applyFilter(filter.type, filter.options)
		.then(f => {
			if (f.type === 'FaceOverlayFilter') {
				f.execMethod(
					"setOverlayedImage",
					{
						"uri": "https://cdn.pixabay.com/photo/2017/09/30/09/29/cowboy-hat-2801582_960_720.png",
						"offsetXPercent": "-0.1F",
						"offsetYPercent": "-0.8F",
						"widthPercent": "1.5F",
						"heightPercent": "1.0F"
					});
			}
		});
}

function removeFilter() {
	selectedStreamManager.stream.removeFilter();
}

// --- End filter related methods ---
```

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>
