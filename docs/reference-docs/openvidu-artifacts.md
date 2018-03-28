<h2 id="section-title">OpenVidu Artifacts</h2>
<hr>

<br>
<h3>Main artifacts</h3>

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>Type</th>
    <th>Stable version</th>
    <th>Link</th>
    <th class="last-table-col">Info</th>
  </tr>
  
  <tr>
    <td rowspan="2">openvidu-browser</td>
    <td>NPM package</td>
    <td>1.8.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>1.8.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>1.8.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it!" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>1.8.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>1.8.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>1.8.0</td>
    <td><a class="" href="https://search.maven.org/#search%7Cga%7C1%7Ca%3A%22openvidu-java-client%22" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Library for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>1.8.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Library for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-cloud-devops</td>
    <td>JSON files</td>
    <td>1.7.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu-cloud-devops/releases" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Configuration files for automatic launching of OpenVidu Server and OpenVidu Demos in AWS CloudFormation" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-parent</td>
    <td>POM</td>
    <td>1.1.0</td>
        <td><a class="" href="https://search.maven.org/#search%7Cga%7C1%7Ca%3A%22openvidu-parent%22" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Maven multi-module project parent. It makes easy the management of versions, dependencies and plugins of all OpenVidu artifacts" class="icon ion-information-circled"></i></td>
  </tr>
  
</table>

<br>
<h3>Demos and tutorials artifacts</h3>

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>Type</th>
    <th>Stable version</th>
    <th>Link</th>
  </tr>
  
  <tr>
    <td rowspan="2">openvidu-js-java</td>
    <td>JAR</td>
    <td>1.1.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu-tutorials/releases" target="_blank">GitHub</a></td>
  </tr>
  <tr>
    <td>Docker container<br><em>(basic-webinar-demo)</em></td>
    <td>1.1.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/basic-webinar-demo/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-mvc-java</td>
    <td>JAR</td>
    <td>1.1.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu-tutorials/releases" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td>basic-videoconference-demo</td>
    <td>Docker container</td>
    <td>1.1.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/basic-videoconference-demo/tags/" target="_blank">DockerHub</a></td>
  </tr>

  <tr>
    <td rowspan="2">classroom-demo</td>
    <td>Docker container</td>
    <td>1.1.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/classroom-demo/tags/" target="_blank">DockerHub</a></td>
  </tr>
  <tr>
    <td>WAR</td>
    <td>1.1.0</td>
    <td><a class="" href="https://github.com/OpenVidu/classroom-demo/releases" target="_blank">GitHub</a></td>
  </tr>
  
</table>


<br>
<h3>Tutorials artifacts without a binary distribution</h3>

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>How to run it</th>
  </tr>
  
  <tr>
    <td>openvidu-js-node</td>
    <td><a href="/docs/tutorials/openvidu-js-node/#running-this-tutorial" target="_blank">Go</a></td>
  </tr>
  
  <tr>
    <td>openvidu-mvc-node</td>
    <td><a href="/docs/tutorials/openvidu-mvc-node/#running-this-tutorial" target="_blank">Go</a></td>
  </tr>

  <tr>
    <td>openvidu-insecure-js<br><em>(basic-videoconference-demo)</em></td>
    <td><a href="/docs/tutorials/openvidu-insecure-js/#running-this-tutorial" target="_blank">Go</a></td>
  </tr>

  <tr>
    <td>openvidu-insecure-angular</td>
    <td><a href="/docs/tutorials/openvidu-insecure-angular/#running-this-tutorial" target="_blank">Go</a></td>
  </tr>

  <tr>
    <td>openvidu-getaroom</td>
    <td><a href="/docs/tutorials/openvidu-getaroom/#running-this-tutorial" target="_blank">Go</a></td>
  </tr>
  
</table>

<script>
var mobileWidth = 767;
  var width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
  if (width <= mobileWidth) {
    function changePlacement(tooltip) {
        tooltip.setAttribute('data-placement', 'left');
    }
    var tooltips = document.getElementsByClassName('ion-information-circled');
    for(i = 0; i < tooltips.length; i++) {
        changePlacement(tooltips[i]);
    }
  }
</script>