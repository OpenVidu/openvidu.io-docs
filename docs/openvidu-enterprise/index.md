<h2 id="section-title">OpenVidu Enterprise</h2>
<hr>

- **[OpenVidu Enterprise features](#openvidu-enterprise-features)**
    - [6x more media streams](#6x-more-media-streams)
    - [5x quicker connections](#5x-quicker-connections)
    - [Media quality improvements](#media-quality-improvements)
    - [100% compatible with your current OpenVidu applications](#100-compatible-with-your-current-openvidu-applications)
    - [High Availability deployment option](#high-availability-deployment-option)
- **[OpenVidu Enterprise roadmap](#openvidu-enterprise-roadmap)**
    - [Large scale sessions](#large-scale-sessions)
    - [E2E encryption](#e2e-encryption)
- **[OpenVidu Enterprise beta limitations](#openvidu-enterprise-beta-limitations)**
- **[Enable OpenVidu Enterprise](#enable-openvidu-enterprise)**

---

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 10px 0 0 0;
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
      OpenVidu Enterprise is currently in <strong>beta</strong>. As long as it remains in beta:
      <ul style="margin-top: 6px">
        <li style="color: inherit">It is completely free of charge. You can try it for free.</li>
        <li style="color: inherit">There are some <a href="openvidu-enterprise/#openvidu-enterprise-beta-limitations">known limitations</a>.</li>
        <li style="color: inherit">There may be unexpected bugs.</li>
      </ul>
</div>
</div>

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
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
<strong>NOTE</strong>: When the beta period officially ends, you will no longer be able to use your OpenVidu Enterprise beta deployment. Any deployment of OpenVidu Enterprise beta (releases 2.19.0 and 2.20.0 for now) will automatically stop working. A final release version of OpenVidu Enterprise edition will be available for you to deploy before this happens. We will notify through all our official channels when the moment comes.
</div>
</div>

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
            <th scope="col" style="border-bottom: 2px solid #049145;">OpenVidu
                            <div id="openvidu-pro-tag"
                    style=" pointer-events: none; display: inline-block; margin-right: 12px; background-color: #06d362; color: white; font-weight: bold; padding: 0px 5px; margin-left: 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">
                    CE</div></th>
            </th>
            <th scope="col" style="border-bottom: 2px solid #005f76;">OpenVidu
                <div id="openvidu-pro-tag"
                    style=" pointer-events: none; display: inline-block; margin-right: 12px; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">
                    PRO</div></th>
            <th scope="col" style="border-bottom: 2px solid #005f76;">OpenVidu
                <div id="openvidu-pro-tag"
                    style=" pointer-events: none; display: inline-block; margin-right: 12px; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">
                    ENTERPRISE</div></th>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">WebRTC media streams</th>
            <td scope="row"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Recording</th>
            <td scope="row"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Screen sharing</th>
            <td scope="row"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Audio and video filters</th>
            <td scope="row"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">IP cameras</th>
            <td scope="row"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Clients: JS, Angular, React, Vue.js, Ionic, Electron</th>
            <td scope="row"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Deployment on Premises</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Deploy OpenVidu in your own Linux server"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Deployment on Cloud</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Deploy OpenVidu in Amazon Web Services" style="text-align: right;"></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">OpenVidu Inspector</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="A powerful, easy-to-use and visually attractive dashboard to help with session monitoring, management and historical data"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Advanced session monitoring</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Elastic stack integration. Elasticsearch and Kibana provide advanced analysis capabilities"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Manual scalability</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Increment or decrement the number of Media Nodes manually"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Elasticity</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Increment or decrement the number of Media Nodes automatically according to CPU load"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">S3 recording storage</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Store your recordings in AWS S3"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Network quality API</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Monitor the network quality of your clients"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Fault Tolerance</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Detect crashed nodes and manually rebuild your video sessions"></td>
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
            <td><a href="https://www.kurento.org/" target="_blank">Kurento</a></td>
            <td><a href="https://www.kurento.org/" target="_blank">Kurento</a></td>
            <td><a href="https://www.kurento.org/" target="_blank">Kurento</a> / <a href="https://mediasoup.org/" target="_blank">mediasoup</a></td>
        </tr>
        <tr>
            <th scope="row">Simulcast and SVC</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="To provide improved quality"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">High Availability</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Replication and decentralization of all nodes in AWS. Load balancing of clients"></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">VP9</th>
            <td scope="row"><i
                    class="icon ion-information-circled pricing-table-icon-info"
                    data-toggle="tooltip" data-placement="right"
                    title="Advanced codec by supported devices"></td>
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
            <td><span style="font-size: 2em">0.0006$ core/minute</span><br>
                <div style="font-size: 1em; margin-top: 8px"><a href="https://openvidu.io/pricing" target="_blank"><strong>Visit Pricing</strong></a></div>
            </td>
            <td><span style="font-size: 2em">Free while in beta</span><br><span style="text-decoration: line-through">0.0012$ core/minute</span><br>
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

#### 6x more media streams

Using the same hardware, OpenVidu Enterprise with mediasoup supports up to 6 times more media streams than with Kurento.

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

    For more technical details about how simulcast works, check the [Simulcast technical details](openvidu-enterprise/simulcast){:target="_blank"} page.

- **VP9** (_not available yet, work in progress_)

    An advanced video codec that brings better quality features when compared to VP8 and H264.

    VP9 achieves better compression rates and better quality with lower bandwidth usage. It also supports SVC, which is in itself an improvement over the benefits provided by Simulcast.

    Popular web browsers such as Google Chrome have integrated VP9 support for a while now, other browsers are slowly getting onboard, and OpenVidu will allow you to benefit from it too.

#### 100% compatible with your current OpenVidu applications

OpenVidu hides all complexity that lies behind swapping Media Server technologies: New SDKs, architecture changes, etc...

With OpenVidu, there's no need to change a single line of your application: **what used to work with OpenVidu Pro will work as-is with OpenVidu Enterprise**.

#### High Availability deployment option

OpenVidu Enterprise offers a High Availability deployment option in AWS, with replication of all nodes and load balancing for clients. Visit the [High Availability](openvidu-enterprise/high-availability/){:target="_blank"} documentation for further information.

<br>

---

## OpenVidu Enterprise roadmap

#### Large scale sessions

OpenVidu Enterprise will support much larger sessions in terms of users and streams. This is a statement based on 3 points:

- The better performance of mediasoup allows processing more media streams in the same hardware.
- Sessions will be able to be replicated in different Media Nodes, sharing the load of the same session in different machines. This will provide horizontal scaling in OpenVidu for the first time.
- Selection of dominant speaker(s) will add the possibility of sessions with hundreds or thousands of publishers without crashing client devices. Only the latest active speakers in a session will be sent to the client side, theoretically allowing for an unlimited number of publishers in the same session.

#### E2E encryption

Thanks to mediasoup, OpenVidu Enterprise will offer E2E encryption using WebRTC Insertable Streams. With Kurento, media streams are encrypted in the client-to-server and server-to-client channels, protecting them from man-in-the-middle attacks. But media streams have to be individually decoded and processed in the server side, so data must be decrypted by Kurento, which breaks the client-to-client encryption. But with mediasoup, media streams can remain protected client-to-client, without the server needing to decrypt it.

<br>

---

## OpenVidu Enterprise beta limitations

As a beta feature, mediasoup support in OpenVidu comes with a handful of limitations that will be solved in the near future, when it finally reaches the General Availability stage. These are:

- There is no support for the forced video codec feature yet ([configuration property `OPENVIDU_STREAMS_FORCED_VIDEO_CODEC`](reference-docs/openvidu-config){:target="_blank"}, or REST API parameter `forcedVideoCodec` of [POST /openvidu/api/sessions](reference-docs/REST-API/#post-openviduapisessions){:target="_blank"}). When using mediasoup **VP8** video codec will always be used under the hood, and for now it cannot be changed.
- Firefox for Android has been proven to present some issues.
- See beta limitations on [Simulcast](openvidu-enterprise/simulcast#simulcast-enterprise-beta-limitations){:target="_blank"}
- See beta limitations on [High Availability](openvidu-enterprise/high-availability/#beta-limitations){:target="_blank"}
- As a beta, there may be bugs in OpenVidu Enterprise that affect the expected general behavior.

<br>

---

## Enable OpenVidu Enterprise

OpenVidu Enterprise is very easy to enable. While in beta, you just need an **OpenVidu Pro** cluster version **2.19.0** up and running.

Configure the following property in the **`.env`** file at Master Node installation path (default to `/opt/openvidu/`)

```yml
OPENVIDU_EDITION=enterprise
```

Then restart the services running command `./openvidu restart` in the same installation path.

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
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
<strong>NOTE</strong>: When the beta period officially ends, you will no longer be able to use your OpenVidu Enterprise beta deployment. Any deployment of OpenVidu Enterprise beta (releases 2.19.0 and 2.20.0 for now) will automatically stop working. A final release version of OpenVidu Enterprise edition will be available for you to deploy before this happens. We will notify through all our official channels when the moment comes.
</div>
</div>

<br>
