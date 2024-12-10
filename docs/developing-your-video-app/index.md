<h2 id="section-title">Developing your video app</h2>
<hr>

[TOC]

---

## OpenVidu application architecture

Any OpenVidu application consists of three parts:

- **Your OpenVidu deployment**: provides all the necessary infrastructure for streaming real-time audio and video. It can usually be treated as a black box in which its internal aspects are not important: you just deploy it and use it from your application. It can be an **OpenVidu CE** deployment, an **OpenVidu Pro** deployment or an **OpenVidu Enterprise** deployment (see [OpenVidu Editions](getting-started/#openvidu-editions)).<br><br>
- **Your server application**: runs at your application server, and consumes the **REST API** offered by your OpenVidu deployment ([Java](reference-docs/openvidu-java-client/) and [Node](reference-docs/openvidu-node-client/) SDKs are available, but you can directly call the [REST API](reference-docs/REST-API/) endpoints with any REST client). In this way you can create Sessions, Connections and in short securely manage your video calls.<br><br>
- **Your client application**: runs at a web browser, mobile device or desktop application (see [supported platforms](troubleshooting/#8-what-platforms-are-supported-by-openvidu)). It uses **openvidu-browser.js** SDK to communicate with your OpenVidu deployment, connect to Sessions, publish and subscribe media Streams and manage other aspects of your video calls at the client side.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0">
        <a data-fancybox="gallery" data-type="image" href="img/docs/home/openvidu-app-architecture.png" class="fancybox-img"><img class="img-responsive" style="margin: auto; max-height: 550px" src="img/docs/home/openvidu-app-architecture.png"/></a>
    </div>
</div>

---

## Basic concepts

### Session

A Session is a virtual room where participants can connect to send and receive audio and video streams. Only participants connected to the same Session can see and hear each other. The number of participants per Session varies depending on the use case: can be 2 for simple 1-to-1 calls, to dozens in big videoconference meetings.

### Connection

Connections represent each one of the participants of the Session. They must be initialized from your application server, and their Token must be delivered to your application client to connect to the Session. This provides security to your Sessions, so that unauthorized users cannot connect to them. A Connection therefore can also be seen as a "slot" for clients connecting to Sessions: you initialize the slot from your application server, and that slot may be occupied by a client using its associated Token. Once a client occupies the Connection, it is considered a participant of the Session.

### Token

A Token is required to grant a participant access to a Session. Each participant will use a Token when connecting to a Session. A Token is always associated with a Connection: to obtain a Token to be delivered to your application client you must create a Connection from your application server. In fact, a Token is just a property of a Connection that can be seen as the key that allows occupying the slot of its Connection. When consumed in the application client, Tokens may provide metadata and specific capabilities to the participant inside the Session.

### Stream

A Stream is a media stream flowing into a Session. A participant can publish a Stream, and other participants of the same Session can subscribe to it. There are no restrictions on how, when, who and what type of Streams can be published in a Session. That depends entirely on the application and its use case.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0">
        <a data-fancybox="gallery" data-type="image" href="img/docs/home/session-composition.png" class="fancybox-img"><img class="img-responsive" style="margin: auto; max-height: 550px" src="img/docs/home/session-composition.png"/></a>
    </div>
</div>

### Workflow of an OpenVidu Session

1. You initialize a **Session** from your **application server**.
2. You create **Connections** for the Session from your **application server**. You must create as many Connections as participants will be in the Session. Each Connection has a Token that provides single-access to the Session.
3. Deliver a **Token** to a client so it can connect to the Session.
4. Each client will use a **Token** to connect to the Session, using **openvidu-browser.js**. Once they have successfully done so, they are considered participants of the Session.
5. Once connected to the Session, a participant can publish a **Stream**, using **openvidu-browser.js**. Every other participant of the Session will have the opportunity to subscribe to it.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0">
        <a data-fancybox="gallery" data-type="image" href="img/docs/home/openvidu-workflow.png" class="fancybox-img"><img class="img-responsive" style="margin: auto; max-height: 550px" src="img/docs/home/openvidu-workflow.png"/></a>
    </div>
</div>

---

## OpenVidu in your application server

Integrating OpenVidu in your application server is essential to make your videocalls secure. Visit section **[Application server](application-server/)** to learn how to integrate OpenVidu in your application's server side.

<br>

---

## OpenVidu in your application client

There are different options to integrate OpenVidu in your application client. Choosing the right option is important, as there is a struggle between simplicity vs customization that must be considered. OpenVidu tries to offer distinct alternatives for the client side, so that you can choose the one that suits you best according to your specific use case and the resources you are willing to invest in the client side.

Let's carry out a quick comparison between the different alternatives to integrate OpenVidu in your application client. Below there is a summary table followed by a more detailed explanation of each alternative.

<div class="application-client-options-table"></div>

|      | Ready-to-use component                                                                                             | OpenVidu Components                                                                                                                                     | Full control of the UI                                                                                                                                       |
|------|--------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **What is it?** | A Web Component ready to be inserted in your application | A frontend library offering videoconferencing components to build your own application | Integrate OpenVidu from scratch in your web, mobile or desktop application with client SDKs |
| **Pros** | <ul><li>Videoconferencing capabilities in your app with a few lines of code</li><li>All the good features of our flagship app [OpenVidu Call](components/openvidu-call){:target="_blank"}</li></ul> | <ul><li>Very flexible components: adapt, extend or replace any component</li><li>Have your first version running in minutes, work on your customizations from there</li><li>Easily keep your client code up to date with the latest features</li></ul> | <ul><li>Unlimited level of customization: build your own UI from scratch as you please</li><li>Available for all client platforms: desktop and mobile browsers, native applications...</li></ul> |
| **Cons** | <ul><li>Limited customization</li><li>Specially designed for desktop browsers. Other platforms may have inconsistencies</li></ul>        | <ul><li>Only available for Angular</li></ul>                                                                                                                            | <ul><li>Higher complexity, although there are plenty of tutorials to smooth the learning curve</li></ul>                                                                     |
| **Documentation** | [Link](ready-to-use-component/) | [Link](components/) | [Link](full-control-ui/) |

### Ready-to-use component

A Web Component ready to be inserted in your application. Documentation available [here](ready-to-use-component/).

- **Pros**

    - With a few of lines in your application's client code you will have a fully functional videoconferencing setup.
    - The Web Component is derived directly from our flagship application [OpenVidu Call](components/openvidu-call){:target="_blank"}, so it has all of its advanced features and beautiful styles right built-in.

- **Cons**

    - The customization of the OpenVidu Web Component is somewhat limited. There are some things you can adapt to your needs, such as colors, logo or the buttons/features you want enabled, but low-level and fine-tuned adaptations are more complicated.
    - It is designed to be used in web applications, especially for desktop browsers. Using the Web Component in mobile browsers or other platforms may give inconsistent results. This is of course a work-in-progress, and better responsiveness for other platforms is something that will improve over time.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0">
        <a data-fancybox="gallery2" data-type="iframe" href="video/components/ov-call-greetings.mp4" class="fancybox-img">
            <video class="img-responsive img-wellcome" src="video/components/ov-call-greetings.mp4" style="max-height: 350px" muted async loop autoplay playsinline></video>
        </a>
    </div>
</div>

### OpenVidu Components

A frontend library offering videoconferencing components to build your own application. Documentation available [here](components/).

- **Pros**

    - OpenVidu Components can be adapted, extended and replaced very easily to suit your application's needs.
    - With OpenVidu Components you can have the first version of your application client up and running in minutes, and work on your customizations from there.
    - It keeps your code up to date with the latest features. Using OpenVidu Components means that your application client will be much easier to update after each new OpenVidu release.

- **Cons**

    - Right now OpenVidu Components library is only available for Angular. So if you decide to use it you will be bound to Angular in your client code. Support for React is in our middle-term roadmap.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0">
        <a data-fancybox="gallery3" data-type="iframe" href="video/components/toggle-hand.mp4" class="fancybox-img"><video class="img-responsive img-wellcome" src="video/components/toggle-hand.mp4" style="max-height: 350px" muted async loop autoplay playsinline></video></a>
    </div>
</div>

### Full control of the UI

Integrate OpenVidu from scratch in your web, mobile or desktop application with client SDKs. Documentation available [here](full-control-ui/).

- **Pros**

    - This is the traditional client SDK approach. Build your own UI with any technology you want, and use openvidu-browser.js SDK to implement your videoconferencing logic as you please. The level of customization is unlimited.
    - The amount of client platforms supported with this approach is very large. You can build desktop applications for Windows or MacOS, native mobile applications for Android or iOS, etc...

- **Cons**

    - The complexity of integrating OpenVidu into the application client from scratch is higher. Fortunately, there are plenty of tutorials available to smooth the learning curve, regardless of your client framework.

<div class="row no-margin row-gallery" style="display: flex">
	<div class="col-md-6" style="margin: auto">
		<a data-fancybox="gallery4" data-type="image" class="fancybox-img" href="img/demos/getaroom-session-6.png">
            <img class="img-responsive" style="margin: auto; max-height: 600px" src="img/demos/getaroom-session-6.png"/>
        </a>
	</div>
    <div class="col-md-6">
		<a data-fancybox="gallery4" data-type="image" class="fancybox-img" href="img/demos/ov-ionic3.png">
            <img class="img-responsive" style="margin: auto; max-height: 300px; border: none" src="img/demos/ov-ionic3.png"/>
        </a>
	</div>
</div>

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>