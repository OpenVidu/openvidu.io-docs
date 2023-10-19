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

There are dozens of different languages supported by Azure. You have the complete list in [this link](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support?tabs=stt-tts){:target="_blank"}. Use the language code in the table's column `Speech-to-text` when [subscribing to Speech to Text events](#receiving-speech-to-text-events).

### AWS

See [AWS web](https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html){:target="_blank"}.

AWS provides a service called Amazon Transcribe that transcribes spoken audio to text. OpenVidu seamlessly integrates the audio streams of OpenVidu Sessions with this AWS service. The only thing needed is a set of AWS credentials with access to Amazon Transcribe.

#### Enabling Speech To Text module

```properties
OPENVIDU_PRO_SPEECH_TO_TEXT=aws
OPENVIDU_PRO_AWS_ACCESS_KEY=<AWS_ACCESS_KEY_ID>      ## e.g. AKIAIOSFODNN7EXAMPLE
OPENVIDU_PRO_AWS_SECRET_KEY=<AWS_SECRET_ACCESS_KEY>  ## e.g. wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
OPENVIDU_PRO_AWS_REGION=<AWS_DEFAULT_REGION>         ## e.g. eu-west-1
```

#### Available languages

There are multiple languages supported by AWS. You have the complete list in [this link](https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html){:target="_blank"} (compatible languages are the ones with option `streaming` in their `Data input` table's column). Use the language code in the table's column `Language Code` when [subscribing to Speech to Text events](#receiving-speech-to-text-events).

### Vosk

See [Vosk web](https://alphacephei.com/vosk/){:target="_blank"}.

This is the open source alternative with no extra cost for the service: you will not have to pay an external cloud provider for the service. But you must take into account that it may affect the average accuracy of the transcription and the amount of resources consumed in your OpenVidu cluster (as the engine needs to run in your [Media Nodes](openvidu-pro/scalability/#openvidu-pro-architecture)).

#### Enabling Speech To Text module

Configure the following [configuration property](reference-docs/openvidu-config/) in the **`.env`** file at OpenVidu installation path (default to `/opt/openvidu`):

```properties
OPENVIDU_PRO_SPEECH_TO_TEXT=vosk
```

#### Available languages

The default languages offered by OpenVidu are the small versions of the [Vosk models](https://alphacephei.com/vosk/models){:target="_blank"} for each one of the languages in the table below (all have Apache 2.0 license). Note that these models are lightweight, originally intended for low-resource devices, and transcription accuracy may be affected. You can configure your own [custom models](#using-custom-languages) for better results.

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

#### Using custom languages

Vosk models are available [here](https://alphacephei.com/vosk/models){:target="_blank"}. The default ones offered by OpenVidu are the small versions of the models for each language, which all have Apache 2.0 license.

To use a custom language model, you need to override the Speech to Text module to use a custom one. It is very easy: you just need to create a Docker image based on the default one `openvidu/speech-to-text-service-base`. The only thing to do in your custom image is copying your language model to path `/app/dist/vosk-models`. Let's go step by step, considering that we want to add a new language called **`custom-model`**:

**1)** Go to an empty directory and create a file called `Dockerfile` with the following content:

```text
FROM openvidu/speech-to-text-service-base:2.29.0

COPY custom-model /app/dist/vosk-models/custom-model
```

The Docker image `openvidu/speech-to-text-service-base` does not have any default language model in it. If you want to preserve the default language models, you can use `openvidu/speech-to-text-service` as base image instead.

**2)** [Download](https://alphacephei.com/vosk/models){:target="_blank"} the desired language model and unzip it.

**3)** Rename the unzipped folder to `custom-model`. You can use any other name, but in these steps we will use this one. Just replace `custom-model` with your own name in the next steps if you want.

**4)** Copy the `custom-model` folder to the same directory where the `Dockerfile` is and build the Docker image:

```text
docker build . -t <your-registry>/<image-name>:<tag>
```

**5)** Push the image to your Docker registry.

```text
docker push <your-registry>/<image-name>:<tag>
```

**6)** Configure the new image in the **`.env`** configuration file of OpenVidu (by default located at `/opt/openvidu/.env`). You can also configure the Docker registry credentials if needed. If you are using Dockerhub as Docker registry this is not necessary.

```
OPENVIDU_PRO_SPEECH_TO_TEXT_IMAGE=<your-registry>/<image-name>:<tag>
OPENVIDU_PRO_DOCKER_REGISTRIES=["serveraddress=<your-registry>,username=<your-username>,password=<your-password>"]
```

> - When subscribing to Speech to Text events in your application's client, just configure your new language (that would be `custom-model` in the steps above) as second parameter of the method. Check out section [Receiving Speech To Text events](#receiving-speech-to-text-events).
> - You can add as many custom language models as you want in the same Docker image. Just store them in path `/app/dist/vosk-models` as stated in step 1)

#### Managing language models in Media Nodes

Vosk language models are large files that must be loaded and unloaded from memory inside the [Media Nodes](openvidu-pro/scalability/#openvidu-pro-architecture). [Configuration property **`OPENVIDU_PRO_SPEECH_TO_TEXT_VOSK_MODEL_LOAD_STRATEGY`**](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-pro) dictates the strategy that OpenVidu will follow to load/unload language models in Media Nodes:

- If `OPENVIDU_PRO_SPEECH_TO_TEXT_VOSK_MODEL_LOAD_STRATEGY=on_demand`: OpenVidu by default will dynamically load the required language model in the Media Node when it is first needed. That is: when a user has requested a Speech to Text transcription for that specific language and there is no other previous transcriptions using that language in that Media Node. Besides this, OpenVidu will dynamically unload the language model from the Media Node when it is no longer needed. That is: when the last subscriptions to a Speech to Text transcription for a specific language in a particular Media Node is terminated.<br><br>
- If `OPENVIDU_PRO_SPEECH_TO_TEXT_VOSK_MODEL_LOAD_STRATEGY=manual`: OpenVidu won't load or unload language models dynamically in Media Nodes. You must call the REST API methods to manually [load](reference-docs/REST-API/#post-speech-to-text) and [unload](reference-docs/REST-API/#delete-speech-to-text) a language model in a specific Media Node when necessary. If a user tries to subscribe to a Speech to Text transcription and the requested language model is not available in the required Media Node, an error will be returned.

Why do these two options exist? Ideally, option `on_demand` is the most convenient from an administration perspective: OpenVidu just takes care of it whenever it is necessary. But the reality is somewhat more complicated: since the Vosk language models are large files, it is very inefficient to dynamically load and unload them in the Media Nodes, especially if the application's use case involves many different activations and deactivations of Speech To Text transcriptions.

On top of that, the default language models provided by OpenVidu are small in size and in general will work just fine with `on_demand` option, but when using [custom language models](#using-custom-languages) that are bigger in size, the amount of time required to load the model in memory can dramatically increase. Clients calling the Speech to Text subscription operation may have to wait up to 10 seconds for the operation to return, and that is not acceptable (timeout errors may even occur). So in this case, it is highly recommended (if not almost mandatory) to use `manual` option to control the loading and unloading process of the language models in your Media Nodes. So when a user requests a Speech to Text subscription, the model is already available and ready in the required Media Node.

Check out the REST API operations to manually **[load](reference-docs/REST-API/#post-speech-to-text)** and to **[unload](reference-docs/REST-API/#delete-speech-to-text)** a Vosk language model in a Media Node.

<br>

---

## Receiving Speech To Text events

To receive Speech To Text events in your application's client side you just need to setup listener [`speechToTextMessage`](api/openvidu-browser/interfaces/SessionEventMap.html#speechToTextMessage) in the [`Session`](api/openvidu-browser/classes/Session.html) object. The listener will handle [SpeechToTextEvent](api/openvidu-browser/classes/SpeechToTextEvent.html) objects when the targetted participant speaks. You can differentiate between sentences under construction or final sentences using the event property `reason`:

```javascript
session.on("speechToTextMessage", event => {
    if (event.reason === "recognizing") {
        console.log("User " + event.connection.connectionId + " is speaking: " + event.text);
    } else if (event.reason === "recognized") {
        console.log("User " + event.connection.connectionId + " spoke: " + event.text);
    }
});
```

Then you just need to subscribe to the desired Stream transcription using method [`Session.subscribeToSpeechToText`](api/openvidu-browser/classes/Session.html#subscribeToSpeechToText). Pass the desired [Stream](api/openvidu-browser/classes/Stream.html) object for which you want to receive Speech To Text events, and the language:

```javascript
await session.subscribeToSpeechToText(stream, "en-US");
```

In case you are using vosk and a [custom model](#using-custom-languages), you need to specify the name of the model you have added in the Docker image as the second parameter of the method. For example, if your custom model is located in `/app/dist/vosk-models/custom-model` inside your custom Speech to Text Docker image, you need to pass `custom-model`. For example:

```javascript
await session.subscribeToSpeechToText(stream, "custom-model");
```

For [OpenVidu WebComponent](/ready-to-use-component/){:target="_blank"} and [OpenVidu Angular Components](/components/){:target="_blank"}, you need to add the custom model name as a new value at:

- [OpenVidu Webcomponent (`captionsLangOptions`)](/api/openvidu-angular/components/OpenviduWebComponentComponent.html#captionsLangOptions){:target="_blank"}
- [OpenVidu Angular (`captionsLangOptions`)](/api/openvidu-angular/directives/CaptionsLangOptionsDirective.html){:target="_blank"}

> Check out tutorial [openvidu-speech-to-text](tutorials/openvidu-speech-to-text/) to test a real sample application.

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