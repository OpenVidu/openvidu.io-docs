
Developing OpenVidu
===================

This documentation is suitable for **Ubuntu 14.04** or **Ubuntu 16.04**. Packages required:

| Dependecy     | Check version   | Install                               |
| ------------- | --------------- |-------------------------------------- |
| java 8 JDK    | `java -version` | `sudo apt-get install -y default-jdk` |
| node          | `node -v`       | `sudo curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -`<br>`sudo apt-get install -y nodejs` |
| maven         | `mvn -v`        | `sudo apt-get install -y maven`       |
| angular-cli   | `ng -v`         | `sudo npm install -g @angular/cli`    |


Setup for development
------------------

Here we show how to develop an Angular app (_openvidu-testapp_) with ***openvidu-browser*** and ***openvidu-server*** as local dependencies, waiting to be modified as you want.

1) [Install KMS](#installing-kms)

2) Clone repo:

```bash
git clone https://github.com/OpenVidu/openvidu.git
```

3) `openvidu/openvidu-browser/`

```bash
npm install
npm run build
sudo npm link
```

4) `openvidu/`

```bash
mvn -DskipTests=true compile && mvn -DskipTests=true install
```

5) `openvidu/openvidu-testapp/`

```bash
npm install
npm link openvidu-browser
ng serve
```

6) Start KMS in your machine:

```bash
sudo service kurento-media-server restart
```

8) `openvidu/openvidu-server/`

```bash
mvn exec:java
```

*(or if you prefer you can just run the Java application in your favourite IDE)*


----------


At these point, you can start modifying *openvidu-ng-testapp*, *openvidu-browser* or *openvidu-server*.

 - **_openvidu-testapp_** :  the previous "ng serve" command will take care of refreshing the browser's page whenever any change takes place.

 - **_openvidu-browser_** : after modifying any typescript file, you will need to run the following command to update your changes:
 
    **/openvidu/openvidu-browser** 

    ``` 
    npm run build
    ```

 - **_openvidu-server_** : after modifying any file, there is no other alternative but to re-launch the java application if you want to update your changes.

    **/openvidu/openvidu-server**

    ``` 
    mvn clean exec:java
    ```

    *(or re-launch the Java application in your IDE. Some IDE's support automatic re-launch in response to changes)*

---

Setup for advanced development: share the app through your network
------------------
You can also use **different machines** in the **same network** to build a more advanced development environment, so you can test the application in different devices at the same time. It's very similar to the process outlined above:

You will need a server for the built app (if you don't have any, we recommend *http-server*):
```npm install -g http-server```

Run exactly the same commands as the process above, but on step **6)** skip `ng serve`. We don't want Angular-CLI to serve our app. Instead, these commands will be the ones which you should launch (and relaunch to update your changes):

`openvidu/openvidu-testapp/`

```bash
ng build --outputPath ./dist
cd dist
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -subj '/CN=www.mydom.com/O=My Company LTD./C=US' -keyout key.pem -out cert.pem
http-server -S
```

This builds the Angular project, generate a self-signed certificate (which unfortunately is a mandatory requirement for http-server SSL) and serves the content with http-server.

Finally, to launch the app connect to `https://localhost:8080` in the machine running the http-server and to `https://[HOST]:8080` in other devices of the same network (`[HOST]` being the IP of the machine running the http-server).

---

Installing KMS
------------------

How to *install* and *run* KMS in your development machine:

Ubuntu 14.04 LTS Trusty (64 bits)

```bash
sudo echo "deb http://ubuntu.openvidu.io/6.8.1 trusty kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
sudo apt-get update
sudo apt-get -y install kurento-media-server
```

Ubuntu 16.04 LTS Xenial (64 bits)

```bash
sudo echo "deb http://ubuntu.openvidu.io/6.8.1 xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
sudo apt-get update
sudo apt-get -y install kurento-media-server
```

Start and stop the service

```bash
sudo service kurento-media-server start
sudo service kurento-media-server stop
```

[Here](http://doc-kurento.readthedocs.io/en/stable/user/installation.html) you can check Kurento's official documentation.
