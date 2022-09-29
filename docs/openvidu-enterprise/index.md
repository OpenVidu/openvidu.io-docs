<h2 id="section-title">OpenVidu Enterprise</h2>
<hr>

- **[OpenVidu Enterprise features](#openvidu-enterprise-features)**
    - [5x more media streams](#5x-more-media-streams)
    - [5x quicker connections](#5x-quicker-connections)
    - [Media quality improvements](#media-quality-improvements)
    - [High Availability deployment option](#high-availability-deployment-option)
    - [100% compatible with your current OpenVidu applications](#100-compatible-with-your-current-openvidu-applications)
- **[Kurento vs mediasoup](#kurento-vs-mediasoup)**
    - [Additional mediasoup limitations](#additional-mediasoup-limitations)
    - [Using Kurento in OpenVidu Enterprise](#using-kurento-in-openvidu-enterprise)
- **[OpenVidu Enterprise roadmap](#openvidu-enterprise-roadmap)**
    - [Large scale sessions](#large-scale-sessions)
    - [E2E encryption](#e2e-encryption)
- **[Deploying OpenVidu Enterprise](#deploying-openvidu-enterprise)**

---

<table class="table table-striped table-pricing" style="background: #e7e7e7">
    <colgroup>
        <col span="1">
        <col span="1" style="width: 30px;">
        <col span="1">
        <col span="1">
    </colgroup>
    <thead>
        <tr>
            <th scope="col" style="background: #fff; border-bottom: 0px;"></th>
            <th scope="col" style="background: #fff; border-bottom: 0px;"></th>
            <th scope="col" style="border-bottom: 2px solid #049145;"><span style="white-space: nowrap">OpenVidu
                            <div id="openvidu-pro-tag"
                    style=" pointer-events: none; display: inline-block; margin-right: 12px; background-color: #06d362; color: white; font-weight: bold; padding: 0px 5px; margin-left: 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">
                    CE</div></span></th>
            </th>
            <th scope="col" style="border-bottom: 2px solid #005f76;"><span style="white-space: nowrap">OpenVidu
                <div id="openvidu-pro-tag"
                    style=" pointer-events: none; display: inline-block; margin-right: 12px; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">
                    PRO</div></span></th>
            <th scope="col" style="border-bottom: 2px solid #005f76;"><span style="white-space: nowrap">OpenVidu
                <div id="openvidu-pro-tag"
                    style=" pointer-events: none; display: inline-block; margin-right: 12px; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">
                    ENTERPRISE</div></span></th>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">WebRTC media streams</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="WebRTC provides high quality and low latency real time video over the Internet"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Recording</th>
            <td scope="row"><a href="advanced-features/recording/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Record your video sessions with multiple configurations"></a></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Screen sharing</th>
            <td scope="row"><a href="advanced-features/screen-share/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Easily integrate screen-sharing in your application"></a></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Audio and video filters</th>
            <td scope="row"><a href="advanced-features/filters/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Apply real-time audio and video filters to media streams"></a></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">IP cameras</th>
            <td scope="row"><a href="advanced-features/ip-cameras/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Integrate IP cameras with RTSP effortlessly"></a></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Clients: JS, Angular, React, Vue, Ionic, Electron, React Native, Android</th>
            <td scope="row"><a href="tutorials/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Use your preferred client framework. Check our tutorials"></a></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Deployment on Premises</th>
            <td scope="row"><a href="deployment/#openvidu-for-production-on-premises"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Deploy OpenVidu in your own Linux server"></a></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Deployment on Cloud</th>
            <td scope="row"><a href="deployment/#openvidu-for-production-on-aws"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Deploy OpenVidu in Amazon Web Services" style="text-align: right;"></a></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">OpenVidu Inspector</th>
            <td scope="row"><a href="openvidu-pro/openvidu-inspector/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="A powerful, easy-to-use and visually attractive dashboard to help with session monitoring, management and historical data"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Advanced session monitoring</th>
            <td scope="row"><a href="openvidu-pro/monitoring-elastic-stack/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Elastic stack integration. Elasticsearch and Kibana provide advanced analysis capabilities"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Manual scalability</th>
            <td scope="row"><a href="openvidu-pro/scalability/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Increment or decrement the number of Media Nodes manually"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Elasticity</th>
            <td scope="row"><a href="openvidu-pro/scalability/#autoscaling"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Increment or decrement the number of Media Nodes automatically according to CPU load"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">S3 recording storage</th>
            <td scope="row"><a href="advanced-features/recording/#uploading-recordings-to-s3"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Store your recordings in AWS S3"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Network quality API</th>
            <td scope="row"><a href="advanced-features/network-quality/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Monitor the network quality of your clients"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Virtual Background</th>
            <td scope="row"><a href="advanced-features/virtual-background/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Apply a blur effect or background images to video streams"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Fault Tolerance</th>
            <td scope="row"><a href="openvidu-pro/fault-tolerance/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Detect crashed nodes and manually rebuild your video sessions"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Media Server</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Supported Media Servers"></td>
            <td><a href="https://www.kurento.org/" target="_blank"><strong>Kurento</strong></a></td>
            <td><a href="https://www.kurento.org/" target="_blank"><strong>Kurento</strong></a></td>
            <td><a href="https://www.kurento.org/" target="_blank"><strong>Kurento</strong></a> / <a href="https://mediasoup.org/" target="_blank"><strong>mediasoup</strong></a></td>
        </tr>
        <tr>
            <th scope="row">Streams per core</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Increment the performance of your hardware with OpenVidu ENTERPRISE"></td>
            <td>100</td>
            <td>100</td>
            <td>500</td>
        </tr>
        <tr>
            <th scope="row">High Availability</th>
            <td scope="row"><a href="openvidu-enterprise/high-availability/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Replication and decentralization of all nodes in AWS. Load balancing of clients"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Simulcast</th>
            <td scope="row"><a href="openvidu-enterprise/simulcast/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="To provide improved quality"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">VP9</th>
            <td scope="row"><a href="advanced-features/media-codecs/"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Advanced codec by supported devices"></a></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">E2E encryption</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="End-to-End encryption with WebRTC Insertable Streams"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-hammer pricing-table-icon" data-toggle="tooltip"
                    data-placement="right" title="Work in progress"></i></td>
        </tr>
        <tr>
            <th scope="row">Large scale sessions</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Support for sessions with hundreds or even thousands of users"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-hammer pricing-table-icon" data-toggle="tooltip"
                    data-placement="right" title="Work in progress"></i></td>
        </tr>
        <tr>
            <th scope="row">License</th>
            <td scope="row"></td>
            <td>Apache 2.0</td>
            <td>Commercial</td>
            <td>Commercial</td>
        </tr>
        <tr>
            <th scope="row">Support</th>
            <td scope="row"></td>
            <td>Community support on forums</td>
            <td>Email support in business hours</td>
            <td>Email support in business hours</td>
        </tr>
        <tr>
            <th scope="row">Price</th>
            <td scope="row"></td>
            <td><span style="font-size: 2em">Free</span></td>
            <td><span style="font-size: 2em">0.0006$ <span style="font-size: 20px">core/minute</span></span><br>
                <div style="font-size: 1em; margin-top: 8px"><a href="https://openvidu.io/pricing" target="_blank"><strong>Visit Pricing</strong></a></div>
            </td>
            <td><span style="font-size: 2em">0.0018$ <span style="font-size: 20px">core/minute</span></span><br>
                <div style="font-size: 1em; margin-top: 8px"><a href="https://openvidu.io/pricing" target="_blank"><strong>Visit Pricing</strong></a></div>
            </td>
        </tr>
        <tr>
            <th scope="row"></th>
            <td scope="row"></td>
            <td><a href="/" class="btn-primary btn-scroll try-now-btn" target="_blank">Docs</a></td>
            <td><a href="openvidu-pro/" class="btn-primary btn-scroll pro-btn" target="_blank">Docs</a></td>
            <td><a href="openvidu-enterprise/" class="btn-primary btn-scroll pro-btn" style="background-color: #9c27b0" target="_blank">Docs</a></td>
        </tr>
    </tbody>
</table>

## OpenVidu Enterprise features

OpenVidu Enterprise offers the best performance, improved media quality and better scalability for high-demand environments.

The key feature of OpenVidu Enterprise is that it supports using **[mediasoup](https://mediasoup.org/){:target="_blank"}** as Media Server instead of **[Kurento](https://www.kurento.org/){:target="_blank"}**. mediasoup brings a lot of benefits for videoconferencing apps built with OpenVidu:

#### 5x more media streams

Using the same hardware, OpenVidu Enterprise with mediasoup supports up to 5 times more media streams than with Kurento.

<p align="center">
  <img class="img-responsive xcode-img" style="max-width: 550px" src="img/docs/openvidu-enterprise/improved-performance-1.png">
</p>

<p align="center">
  <img class="img-responsive xcode-img" style="max-width: 550px" src="img/docs/openvidu-enterprise/improved-performance-2.png">
</p>

#### 5x quicker connections

Media connections are established **80% quicker** using OpenVidu Enterprise with mediasoup. This means that with Kurento the average time between a customer calling the subscription operation and the video being actually played on their device, it could average around **1.25 seconds**. With mediasoup it averages **0.25 seconds**.

<p align="center">
  <img class="img-responsive xcode-img" style="padding: 25px 0; max-width: 750px" src="img/docs/openvidu-enterprise/improved-performance-3.gif">
</p>

#### Media quality improvements

OpenVidu Enterprise with mediasoup raises the bar of what is possible with adaptive video quality for WebRTC, compared to what was possible with Kurento:

- **Simulcast**

    Simulcast is a technique that allows **optimizing the quality** of routed video, in accordance with the needs of each individual Subscriber. Depending on aspects such as device form-factor or network link quality, the video that gets delivered to each participant in a session can be adjusted to be the perfect match for each circumstance.

    This comes in contrast with the more traditional method of adaptive video bitrate in Kurento, which was all-or-nothing and affected all participants equally, so it wasn't possible to adjust the quality individually for each one of them.

    For more technical details about how simulcast works, check the [Simulcast technical details](openvidu-enterprise/simulcast) page.

- **VP9**

    An advanced video codec that brings better quality features when compared to VP8 and H264.

    VP9 achieves better compression rates and better quality with lower bandwidth usage. It also supports SVC, which is in itself an improvement over the benefits provided by Simulcast.

    Popular web browsers such as Google Chrome have integrated VP9 support for a while now, other browsers are slowly getting onboard, and OpenVidu will allow you to benefit from it too.

#### High Availability deployment option

OpenVidu Enterprise offers a High Availability deployment option in AWS, with replication of all nodes and load balancing for clients. Visit the [High Availability](openvidu-enterprise/high-availability/) documentation for further information.

<p align="center">
  <img class="img-responsive xcode-img" style="padding: 25px 0; max-width: 500px" src="img/docs/openvidu-enterprise/ha-alone.png">
</p>

#### 100% compatible with your current OpenVidu applications

OpenVidu hides all complexity that lies behind swapping Media Server technologies: New SDKs, architecture changes, etc...

With OpenVidu, there's no need to change a single line of your application: **what used to work with OpenVidu Pro will work as-is with OpenVidu Enterprise**.

<br>

---

## Kurento vs mediasoup

OpenVidu Enterprise offers the possibility of choosing between two different media servers for routing media:

- **Kurento** is a powerful full-featured media server used in OpenVidu CE and OpenVidu Pro. It is based on low-level processing of the media streams. This provides advanced features such as transcoding and real time audio-video filters. There is a downside to this power: it can bring some overhead for videoconferencing applications that do not need these advanced features.

- **mediasoup** is a modern, lightweight and fast media server. Its performance for routing media in typical videoconferencing applications is higher than Kurento, as mediasoup does not process media streams at a low level like Kurento does. Besides, it brings the latest technologies in media transmission, such us simulcast, VP9 media codec and E2E encryption with Insertable Streams.

In general, most applications built with OpenVidu will greatly benefit of using mediasoup. The only cases in which it is better to use Kurento is for those applications that specifically require some of the functionality only offered by Kurento (audio/video filters or IP cameras).

<table class="table table-striped table-pricing" style="background: #e7e7e7; margin-top: 25px">
    <colgroup>
        <col span="1">
        <col span="1">
        <col span="1">
    </colgroup>
    <thead>
        <tr>
            <th scope="col" style="background: #fff; border-bottom: 0px;"></th>
            <th scope="col">Kurento</th>
            <th scope="col">mediasoup</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Average number of streams per core <span style="font-weight: normal; font-style: italic;">(higher is better)</span></th>
            <td>100</td>
            <td>500</td>
        </tr>
        <tr>
            <th scope="row">Average time for media establishment <span style="font-weight: normal; font-style: italic;">(lower is better)</span></th>
            <td>1.25 s</td>
            <td>0.25 s</td>
        </tr>
        <tr>
            <th scope="row">Audio and video filters <span style="font-weight: normal">(<a href="advanced-features/filters/">Doc</a>)</span></th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">IP cameras <span style="font-weight: normal">(<a href="advanced-features/ip-cameras/">Doc</a>)</span></th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Simulcast <span style="font-weight: normal">(<a href="openvidu-enterprise/simulcast/">Doc</a>)</span></th>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">VP9</th>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">E2E encryption</th>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-hammer pricing-table-icon" data-toggle="tooltip"
                    data-placement="right" title="Work in progress"></i></td>
        </tr>
    </tbody>
</table>

#### Additional mediasoup limitations

There are a couple of small limitations when using mediasoup that must be taken into account:

- [Audio-only COMPOSED recording](advanced-features/recording/#audio-only-and-video-only-recordings) is not available in mediasoup.
- [Network Quality API](advanced-features/network-quality/) is not available in mediasoup.
- openvidu-browser method [Publisher.subscribeToRemote](api/openvidu-browser/classes/Publisher.html#subscribeToRemote) is not supported in mediasoup.

#### Using Kurento in OpenVidu Enterprise

OpenVidu Enterprise uses mediasoup as default media server. But you can use Kurento instead by overriding [configuration property `OPENVIDU_ENTERPRISE_MEDIA_SERVER`](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-enterprise).

<br>

---

## OpenVidu Enterprise roadmap

#### E2E encryption

Thanks to mediasoup, OpenVidu Enterprise will offer E2E encryption using WebRTC Insertable Streams. With Kurento, media streams are encrypted in the client-to-server and server-to-client channels, protecting them from man-in-the-middle attacks. But media streams have to be individually decoded and processed in the server side, so data must be decrypted by Kurento, which breaks the client-to-client encryption. But with mediasoup, media streams can remain protected client-to-client, without the server needing to decrypt it.

#### Large scale sessions

OpenVidu Enterprise will support much larger sessions in terms of users and streams. This is a statement based on 3 points:

- The better performance of mediasoup allows processing more media streams in the same hardware.
- Sessions will be able to be replicated in different Media Nodes, sharing the load of the same session in different machines. This will provide horizontal scaling in OpenVidu for the first time.
- Selection of dominant speaker(s) will add the possibility of sessions with hundreds or thousands of publishers without crashing client devices. Only the latest active speakers in a session will be sent to the client side, theoretically allowing for an unlimited number of publishers in the same session.

<br>

---

## Deploying OpenVidu Enterprise
<br>

You can deploy OpenVidu Enterprise:

- **[On AWS](deployment/enterprise/aws)** (currently the only option for High Availability deployments)
- **[On premises in your own infrastructure](deployment/enterprise/on-premises/)**

<br>
Visit <a href="https://openvidu.io/pricing" target="_blank"><strong>Pricing</strong></a> section to learn more about the cost of OpenVidu Enterprise.

<br>
