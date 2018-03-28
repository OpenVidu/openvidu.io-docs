<h2 id="section-title">Releases</h2>
<hr>

### 1.9.0-beta-1

- **Safari support**: now OpenVidu is compatible with the most recent versions of Safari in Mac and iOS. It is necessary to use Kurento Media Server 6.7.0:<br><br>
    - **[openvidu/openvidu-server-kms:1.9.0-beta-1](https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/)** Docker image already incorporates KMS 6.7.0
    - **[openvidu/openvidu-server:1.9.0-beta-1](https://hub.docker.com/r/openvidu/openvidu-server/tags/)** Docker image and **[openvidu-server-1.9.0-beta-1.jar](https://github.com/OpenVidu/openvidu/releases/tag/v1.9.0-beta-1)** need KMS 6.7.0. To install it, first be sure to completely uninstall and clean any previous version of KMS and then:
        
<pre style="padding-left: 80px"><code class="bash hljs"># In first command: xenial for Ubuntu 16.04, trusty for Ubuntu 14.04
sudo echo "deb http://ubuntu.openvidu.io/6.7.0 xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
sudo apt-get update
sudo apt-get -y dist-upgrade
sudo apt-get -y install kurento-media-server
sudo apt-get -y install openh264-gst-plugins-bad-1.5
</code></pre>

<p style="padding-left: 80px">To start and stop KMS 6.7.0:</p>

<pre style="padding-left: 80px"><code class="bash hljs">sudo service kurento-media-server start
sudo service kurento-media-server stop
</code></pre>

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>Type</th>
    <th>Latest version</th>
    <th>Link</th>
    <th class="last-table-col">Info</th>
  </tr>
  
  <tr>
    <td rowspan="2">openvidu-browser</td>
    <td>NPM package</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser?activeTab=versions" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v1.9.0-beta-1" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v1.9.0-beta-1" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it!" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>1.8.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C1.8.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Library for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>1.8.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client?activeTab=versions" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Library for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-cloud-devops</td>
    <td>JSON files</td>
    <td>1.7.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu-cloud-devops/releases/tag/v1.7.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Configuration files for automatic launching of OpenVidu Server and OpenVidu Demos in AWS CloudFormation" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-parent</td>
    <td>POM</td>
    <td>1.9.0-beta-1</td>
        <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-parent%7C1.9.0-beta-1%7Cpom" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Maven multi-module project parent. It makes easy the management of versions, dependencies and plugins of all OpenVidu artifacts" class="icon ion-information-circled"></i></td>
  </tr>
  
</table>
