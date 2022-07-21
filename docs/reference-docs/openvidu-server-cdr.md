<h2 id="section-title">OpenVidu CDR</h2>
<hr>

OpenVidu Server offers a CDR logging system that informs about all the relevant events that take place in the system. The available events to be stored in the CDR are the same as those offered by the [WebHook service](reference-docs/openvidu-server-webhook/#openvidu-webhook-events).

To start OpenVidu Server with CDR enabled, set [configuration property `OPENVIDU_CDR=true`](reference-docs/openvidu-config/). The CDR file location is given by configuration property `OPENVIDU_CDR_PATH`, default to `/opt/openvidu/cdr`.

The CDR file is a **plain UTF-8 text file** complying with **[JSON Lines](http://jsonlines.org/){:target="_blank"}** format: one standard JSON entry for each line. The structure of each event is slightly different to the WebHook ones: the event type becomes a single root property that contains in a nested JSON object the rest of the properties of the event. Below there are a couple of examples demonstrating this structure.

- For `sessionCreated` event, what in OpenVidu WebHook is ...

        {"event":"sessionCreated","timestamp":1538481330577,"sessionId":"ses_Jd8tUyvhXO"}

    ... in OpenVidu CDR is ...

        {"sessionCreated":{"timestamp":1538481330577,"sessionId":"ses_Jd8tUyvhXO"}}

- For `signalSent` event, what in OpenVidu WebHook is ...

        {"event":"signalSent","timestamp":1605181948719,"sessionId":"ses_Jd8tUyvhXO","from":"con_ZbNTYgi0ae","to":["con_Yz3To5z53q"],"type":"my-chat","data":"{'message':'Hello!','name':'Alice'}"}

    ... in OpenVidu CDR is ...

        {"signalSent":{"timestamp":1605181948719,"sessionId":"ses_Jd8tUyvhXO","from":"con_ZbNTYgi0ae","to":["con_Yz3To5z53q"],"type":"my-chat","data":"{'message':'Hello!','name':'Alice'}"}}

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>