# Manage videos

OpenVidu makes very easy the management of the video players. You can let OpenVidu take care of their lifecycle or you can use your own HTML video elements.
Every Publisher and Subscriber object can display a media stream in as many video players as you want.

### Let OpenVidu take care of the video players

<br>
##### A) Publisher videos

- When initalizing a Publisher object, you can insert a video player by passing a valid `targetElement` in method `OpenVidu.initPublisher` (can be an HTMLElement or its `id` attribute). Second parameter allows you to customize the publisher's stream, including how OpenVidu must insert the video player according to targetElement (more info in [OpenVidu Browser Docs](/../api/openvidu-browser/interfaces/publisherproperties.html){:target="_blank"}):

        var publisher = OV.initPublisher(targetElement, {insertMode: 'APPEND'});

- After getting the Publisher object, you can create more video players to display its media stream just by calling `Publisher.createVideoElement`. Pass a valid `targetElement` and the [insertMode](/../api/openvidu-browser/enums/videoinsertmode.html){:target="_blank"}:

        publisher.createVideoElement(targetElement, 'APPEND');

<br>
##### B) Subscriber videos

- When subscribing to a Stream, you can insert a video player by passing a valid `targetElement` in method `Session.subscribe` (can be an HTMLElement or its `id` attribute). Third parameter allows you to customize the subscriber's stream, including how OpenVidu must insert the video player according to targetElement (more info in [OpenVidu Browser Docs](/../api/openvidu-browser/interfaces/subscriberproperties.html){:target="_blank"}):

        var subscriber;
        session.on('streamCreated', event => {
            subscriber = session.subscribe(event.stream, targetElement, {insertMode: 'APPEND'});
        });

- After getting the Subscriber object, you can create more video players to display its media stream just by calling `Subscriber.createVideoElement`. Pass a valid `targetElement` and the [insertMode](/../api/openvidu-browser/enums/videoinsertmode.html){:target="_blank"}:

        subscriber.createVideoElement(targetElement, 'APPEND');

<br>
> Publisher and Subscriber objects will dispatch a `videoElementCreated` event for every video inserted into DOM by these methods.
> Also these videos will be automatically removed from DOM when required and Publisher and Subscriber objects will dispatch a
> `videoElementDestroyed` event for every one of them

### You take care of the video players

<br>
##### A) Publisher videos

- Pass *undefined* as `targetElement` when initializing your Publisher and when you have it available just call method `Publisher.addVideoElement`, passing an already existing HTML video element of the DOM:

        var publisher = OV.initPublisher(undefined, publisherProperties);
        publisher.addVideoElement(videoElement);

<br>
##### B) Subscriber videos

- Pass *undefined* as `targetElement` when subscribing to a Stream and when you have Subscriber object available just call method `Subscriber.addVideoElement`, passing an already existing HTML video element of the DOM:

        var subscriber;
        session.on('streamCreated', event => {
            subscriber = session.subscribe(event.stream, undefined);
            subscriber.addVideoElement(videoElement);
        });


<br>
> This way of managing the video players is very useful when developing your application with some frontend declarative framework such as **Angular**,
> **React** or **Vue.js**. It allows you to add to the proper `Publisher` or `Subscriber` any video element managed by the framework. Besides, it is possible to
> treat both Publishers and Subscribers the same way regarding their rendering in the page, as they both inherit from the parent class `StreamManager`. If you are
> interested in these concepts, you can check out our super simple [Angular tutorial](/tutorials/openvidu-insecure-angular/){:target="_blank"}.

<br>