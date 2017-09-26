
Developing OpenVidu
===================
<br>
This documentation is suitable for **Ubuntu 14.04** or **Ubuntu 16.04**. Packages required:

| Dependecy     | Check version   | Install                               |
| ------------- | --------------- |-------------------------------------- |
| java 8 JDK    | `java -version` | `sudo apt-get install -y default-jdk` |
| node          | `node -v`       | `sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -`<br>`sudo apt-get install -y nodejs` |
| maven         | `mvn -v`        | `sudo apt-get install -y maven`       |
| angular-cli   | `ng -v`         | `sudo npm install -g @angular/cli`    |


Setup for development
------------------

Here we show how to develop an Angular app (_openvidu-insecure-angular_ tutorial) with ***openvidu-browser*** and ***openvidu-server*** as local dependencies, waiting to be modified as you want.

1) [Install KMS](#installing-kms)

2) [Add Kurento parent Maven dependency to your local repo](#adding-kurento-parent-pom-to-your-local-respository)

3) Clone repos:

```bash
git clone https://github.com/OpenVidu/openvidu.git
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

4) `openvidu/openvidu-browser/`

```bash
npm install
npm run updatetsc
sudo npm link
```

5) `openvidu/`

```bash
mvn compile && mvn install
```

6) `openvidu-tutorials/openvidu-insecure-angular/`

```bash
npm install
npm link openvidu-browser
ng serve
```

7) Start KMS in your machine:

```bash
sudo service kurento-media-server-6.0 restart
```

8) `openvidu/openvidu-server/`

```bash
mvn package exec:java
```

*(or if you prefer you can just run the Java application in your favourite IDE)*


----------


At these point, you can start modifying *openvidu-ng-testapp*, *openvidu-browser* or *openvidu-server*.

 - **_openvidu-insecure-angular_**:  the previous "ng serve" command will take care of refreshing the browser's page whenever any change takes place.

 - **_openvidu-browser_**: after modifying any typescript file, you will need to run the following command to update your changes:
 
    **/openvidu/openvidu-browser** 

    ``` 
    npm run updatetsc
    ```

 - **_openvidu-server_**: after modifying any file, there is no other alternative but to re-launch the java application if you want to update your changes.

    **/openvidu/openvidu-server**

    ``` 
    mvn clean package exec:java
    ```

    *(or re-launch the Java application in your IDE. Some IDE's support automatic re-launch in response to changes)*

---

Setup for advanced development: share the app through your network
------------------
You can also use **different machines** in the **same network** to build a more advanced development environment, so you can test the application in different devices at the same time. It's very similar to the process outlined above:

You will need a server for the built app (if you don't have any, we recommend *http-server*):
```npm install -g http-server```

Run exactly the same commands as the process above, but on step **6)** skip `ng serve`. We don't want Angular-CLI to serve our app. Instead, these commands will be the ones which you should launch (and relaunch to update your changes):

`openvidu-tutorials/openvidu-insecure-angular/`

```bash
ng build -op ./dist
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
echo "deb http://ubuntu.kurento.org trusty kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y kurento-media-server-6.0
```

Ubuntu 16.04 LTS Xenial (64 bits)

```bash
echo "deb http://ubuntu.kurento.org xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y kurento-media-server-6.0
```

Start and stop the service

```bash
sudo service kurento-media-server-6.0 start
sudo service kurento-media-server-6.0 stop
```

[Here](http://doc-kurento.readthedocs.io/en/stable/installation_guide.html) you can check Kurento's official documentation.

---

Adding Kurento parent POM to your local respository
------------------

You will need development version of Kurento's parent POM in your local repository in order to compile the development version of _openvidu-server_. To achieve this, add a file `~/.m2/settings.xml` with the following content (if it doesn't exist, create it on that exact path):

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <localRepository/>
    <interactiveMode/>
    <usePluginRegistry/>
    <offline/>
    <pluginGroups/>
    <mirrors/>
    <proxies/>

   <profiles>
        <profile>
            <id>kurento-develop</id>
            <activation>
              <activeByDefault>true</activeByDefault>
            </activation>

            <repositories>
              <repository>
                  <id>kurento-snapshots</id>
                  <name>Kurento Snapshot Repository</name>
                  <url>http://maven.kurento.org/snapshots/</url>
                  <releases>
                      <enabled>false</enabled>
                  </releases>
                  <snapshots>
                      <enabled>true</enabled>
                  </snapshots>
              </repository>
            </repositories>
            <pluginRepositories>
              <pluginRepository>
                  <id>kurento-snapshots</id>
                  <name>Kurento Snapshot Repository</name>
                  <url>http://maven.kurento.org/snapshots/</url>
                  <releases>
                    <enabled>false</enabled>
                  </releases>
                  <snapshots>
                    <enabled>true</enabled>
                  </snapshots>
              </pluginRepository>
            </pluginRepositories>

       </profile>
    </profiles>
    <activeProfiles/>
</settings>
```