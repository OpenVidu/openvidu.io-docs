
Developing OpenVidu
===================

Packages required:

```sudo apt-get update```

| Dependecy     | Check version | Install                            |
| ------------- | ------------- |----------------------------------- |
| node          | `nodejs -v`   | `sudo apt-get install -g nodejs`   |
| npm           | `npm -v`      | `sudo apt-get install -g npm`      |
| maven         | `mvn -v`      | `sudo apt-get install -g maven`    |
| angular-cli   | `ng -v`       | `sudo npm install -g @angular/cli` |
| typescript    | `tsc -v`      | `sudo npm install -g typescript`   |


OpenVidu with KMS
------------------

How to *install* and *run* KMS in your development machine:

Ubuntu 14.04 LTS Trusty (64 bits)
```
echo "deb http://ubuntu.kurento.org trusty kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install kurento-media-server-6.0
```

Ubuntu 16.04 LTS Xenial (64 bits)
```
echo "deb http://ubuntu.kurento.org xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install kurento-media-server-6.0
```

Start and stop the service
```
sudo service kurento-media-server-6.0 start
sudo service kurento-media-server-6.0 stop
```

[Here](http://doc-kurento.readthedocs.io/en/stable/installation_guide.html) you can check Kurento's official documentation.

Setup for development
------------------

Here we show how to develop an Angular app with OpenVidu having all packages linked in your local machine, so you can modify them and check the final result. After installing Kurento Media Server and forking or downloading the repo, these are the necessary steps to start developing **openvidu-ng-testapp**:

```
sudo service kurento-media-server-6.0 start
```
**/openvidu/openvidu-browser/src/main/resources**
```
npm install
sudo npm link
```
**/openvidu/openvidu-ng-testapp**
```
npm install
npm link openvidu-browser
ng serve
```
**/openvidu**
```
mvn compile -DskipTests=true
mvn install -DskipTests=true
```
**/openvidu/openvidu-server**
```
mvn clean compile package exec:java
```

*(or if you prefer you can just run the Java application in your favourite IDE)*


----------


At these point, you can start modifying *openvidu-ng-testapp*, *openvidu-browser* or *openvidu-server*.

 - *openvidu-ng-testapp*:  the previous "ng serve" command will take care of refreshing the browser's page whenever any change takes place.
 - *openvidu-browser*: after modifying any typescript file, you will need to run the following command to update your changes (*typescript* package is necessary):
 
 **/openvidu/openvidu-browser/src/main/resources** 
 ``` 
 npm run updatetsc
  ```
 - *openvidu-server*: after modifying any file, there is no other alternative but to re-launch the java application if you want to update your changes.

 **/openvidu/openvidu-server** 
 ``` 
 mvn clean compile package exec:java
  ```
*(or re-launch the Java application in your IDE. Some IDE's support automatic re-launch in response to changes)*


Setup for advanced development (publishing in local server)
------------------
You can also use different machines in the same network to build a more advanced development environment, so you can test the application in different devices at the same time. It's very similar to the process outlined above:

You will need a server for the built app (if you don't have any, we recommend *http-server*):
```npm install -g http-server```

Then...

```
sudo service kurento-media-server-6.0 start
```
**/openvidu/openvidu-browser/src/main/resources**
```
npm install
sudo npm link
```
**/openvidu/openvidu-ng-testapp**
```
npm install
npm link openvidu-browser
```
**/openvidu**
```
mvn compile -DskipTests=true
mvn install -DskipTests=true
```
**/openvidu/openvidu-server**
```
mvn clean compile package exec:java
```
*(or if you prefer you can just run the Java application in your favourite IDE)*


The following commands will be the ones which you should relaunch to update your changes:
**/openvidu/openvidu-ng-testapp**

```
ng build
cd dist
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem  [ACCEPT ALL FIELDS]
http-server -S
```

These commands build the Angular project, generate a self-signed certificate (which unfortunately is a mandatory requirement for http-server SSL) and serves the content in http-server.

Finally, to launch the app connect to *https://127.0.0.1:8080* in the machine running the http-server and to *https://[HOST]:8080* in other devices of the same network ([HOST] the IP of the machine running the http-server).

Don't forget to accept the certificate at *https://[HOST]:8443* !