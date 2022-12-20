<h1 id="section-title">Speech To Text</h1>

[TOC]

---

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
This feature is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
    Speech To Text module <strong>needs port 4000/TCP</strong>, so you need to open this port in Media Nodes to allow Master Nodes to communicate with them.
</div>
</div>

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #ffb600;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding: 10px 20px;">
    <strong>WARNING</strong>: OpenVidu Speech to Text is considered a feature in beta version. This means that there is a possibility that unexpected bugs may arise, and that the API may change in the near future.
</div>
</div>

## How does Speech To Text work

OpenVidu provides a Speech To Text module that allows transcribing in real time the audio tracks of an OpenVidu Session.

- OpenVidu is able to deliver events to the client side with the text transcription of Streams that have audio.
- Clients are able to receive events for one or multiple Streams of an OpenVidu Session, including their own Stream.
- Events are returned in real time, following a _recognizing-to-recognized_ strategy: when a speaker that is being transcribed is talking, events flagged as _recognizing_ will be generated one after the other as the speaker delivers one sentence. The transcribed text of _recognizing_ events may change from one to another, while the engine gathers information about the final sentence. When the engine considers that the speaker has completed a full sentence, it triggers a _recognized_ event with the final result.

<video class="img-responsive" style="margin: auto; margin-top: 40px; margin-bottom: 40px; max-width: 80%;" src="img/docs/advanced-features/ov-call-captions.mp4" muted autoplay playsinline async loop></video>

<br>

---

## Speech To Text engines

### Azure

See [Azure web](https://azure.microsoft.com/en-us/products/cognitive-services/speech-to-text/){:target="_blank"}.

Microsoft provides an Azure service called Speech To Text that transcribes spoken audio to text. OpenVidu seamlessly integrates the audio streams of OpenVidu Sessions with this Azure service. The only thing needed is a key for the Cognitive Service API of Azure.

#### Enabling Speech To Text module

```properties
OPENVIDU_PRO_SPEECH_TO_TEXT=azure
OPENVIDU_PRO_SPEECH_TO_TEXT_AZURE_KEY=<AzureKey>        ## e.g. rywfyDIAL5BM70ErU9O1XSIFzWk2QQhP
OPENVIDU_PRO_SPEECH_TO_TEXT_AZURE_REGION=<AzureRegion>  ## e.g. westeurope
```

#### Available languages

There are dozens of different languages supported by Azure. You have the complete list in [this link](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support?tabs=stt-tts){:target="_blank"}.

### AWS

Coming soon...

### Vosk

See [Vosk web](https://alphacephei.com/vosk/){:target="_blank"}.

This is the open source alternative with no extra cost for the service: you will not have to pay an external cloud provider for the service. But you must take into account that it may affect the average accuracy of the transcription and the amount of resources consumed in your OpenVidu cluster (as the engine needs to run in your [Media Nodes](openvidu-pro/scalability/#openvidu-pro-architecture)).

#### Enabling Speech To Text module

Configure the following [configuration property](reference-docs/openvidu-config/) in the **`.env`** file at OpenVidu installation path (default to `/opt/openvidu`):

```properties
OPENVIDU_PRO_SPEECH_TO_TEXT=vosk
```

#### Available languages

The default list includes:

| Language   | Code |
| - ||
| English    | `en-US` |
| Spanish    | `es-ES` |
| French     | `fr-FR` |
| German     | `de-DE` |
| Portuguese | `pt-PT` |
| Italian    | `it-IT` |
| Dutch      | `nl-NL` |
| Catalan    | `ca-ES` |
| Japanese   | `ja-JP` |
| Chinese    | `zh-CN` |
| Hindi      | `hi-IN` |

#### Using custom language models

Vosk models are available [here](https://alphacephei.com/vosk/models){:target="_blank"}. The default ones offered by OpenVidu are the small versions of the models for each language, which all have Apache 2.0 license. But you can set your own custom model by changing [configuration property](reference-docs/openvidu-config/) `OPENVIDU_PRO_SPEECH_TO_TEXT_IMAGE`

```properties
OPENVIDU_PRO_SPEECH_TO_TEXT_IMAGE=your_docker_image:your_docker_tag
```

<br>

---

## Receiving Speech To Text events

To receive Speech To Text events in your application's client side you just need to setup listener [`speechToTextMessage`](api/openvidu-browser/interfaces/SessionEventMap.html#speechToTextMessage) in the [`Session`](api/openvidu-browser/classes/Session.html) object. The listener will handle [SpeechToTextEvent](api/openvidu-browser/classes/SpeechToTextEvent.html) objects when the targetted participant speaks. You can differentiate between sentences under construction or final sentences using the event property `reason`:

```javascript
session.on("subscribeToSpeechToText", event => {
    if (event.reason === "recognizing") {
        console.log("User " + event.connection.connectionId + " is speaking: " + event.text);
    } else if (event.reason === "recognized") {
        console.log("User " + event.connection.connectionId + " spoke: " + event.text);
    }
});
```

Then you just need to subscribe to the desired Stream transcription using method [`Session.subscribeToSpeechToText`](api/openvidu-browser/classes/Session.html#subscribeToSpeechToText). Pass the desired [Stream](api/openvidu-browser/classes/Stream.html) object for which you want to receive Speech To Text events:

```javascript
await session.subscribeToSpeechToText(stream, "en-US");
```

Check out tutorial [openvidu-speech-to-text](tutorials/openvidu-speech-to-text/) to test a real sample application.

<br>

---

## Reconnecting to Speech to Text module in the case of a crash

Speech to Text is a beta feature that could experiment unexpected crashes in rare occasions. [openvidu-browser SDK](reference-docs/openvidu-browser/) provides an event to know if the service has crashed, so that the application may re-establish the transcription subscriptions once it is available again (the Speech to Text module restarts on its own in case of a crash). To do so, simply listen to the [ExceptionEvent](api/openvidu-browser/classes/ExceptionEvent.html) in your [Session](api/openvidu-browser/classes/Session.html) object, and filter by `SPEECH_TO_TEXT_DISCONNECTED` name. See the code snippet below:

```javascript
session.on("exception", async (event) => {

    if (event.name === "SPEECH_TO_TEXT_DISCONNECTED") {

        console.warn("Speech to Text service has disconnected. Retrying the subscription...");
        var speechToTextReconnected = false;

        while (!speechToTextReconnected) {
            await new Promise(r => setTimeout(r, 1000)); // Waiting one second
            try {
                await session.subscribeToSpeechToText(stream, "en-US");
                console.log("Speech to Text service has recovered");
                speechToTextReconnected = true;
            } catch (error) {
                console.warn("Speech to Text service still unavailable. Retrying again...")
            }
        }

    } else {
        // Other types of ExceptionEvents
    }

});
```

<br>