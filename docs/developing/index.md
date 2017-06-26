
Developing OpenVidu
===================
<br>
Packages required:

| Dependecy     | Check version | Install                            |
| ------------- | ------------- |----------------------------------- |
| node          | `nodejs -v`   | `sudo apt-get install -g nodejs`   |
| npm           | `npm -v`      | `sudo apt-get install -g npm`      |
| maven         | `mvn -v`      | `sudo apt-get install -g maven`    |
| angular-cli   | `ng -v`       | `sudo npm install -g @angular/cli` |
| typescript    | `tsc -v`      | `sudo npm install -g typescript`   |

---

Setup for development
------------------

Here we show how to develop an Angular app with OpenVidu having all packages linked in your local machine, so you can modify them and check the final result. You will have _openvidu-browser_ and _openvidu-server_ as local dependencies, waiting to be modified as you want.

1) [Install KMS](#installing-kms)

2) [Add Kurento parent Maven dependency to your local repo](#adding-kurento-parent-pom-to-your-local-respository)

3) Clone _openvidu_ repo:

```bash
git clone https://github.com/OpenVidu/openvidu.git
```

4) Start KMS in your machine:

```bash
sudo service kurento-media-server-6.0 start
```

5) `/openvidu/openvidu-browser/src/main/resources`

```bash
npm install
npm run updatetsc
sudo npm link
```

6) `/openvidu`

```bash
mvn compile -DskipTests=true
mvn install -DskipTests=true
```

7) `/openvidu/openvidu-ng-testapp`

```bash
npm install
npm link openvidu-browser
ng serve
```

8) `/openvidu/openvidu-server`

```bash
mvn -DskipTests=true clean compile package -Dopenvidu.security=false exec:java
```

*(or if you prefer you can just run the Java application in your favourite IDE)*


----------


At these point, you can start modifying *openvidu-ng-testapp*, *openvidu-browser* or *openvidu-server*.

 - **_openvidu-ng-testapp_**:  the previous "ng serve" command will take care of refreshing the browser's page whenever any change takes place.

 - **_openvidu-browser_**: after modifying any typescript file, you will need to run the following command to update your changes (*typescript* package is necessary):
 
    **/openvidu/openvidu-browser/src/main/resources** 

    ``` 
    npm run updatetsc
    ```

 - **_openvidu-server_**: after modifying any file, there is no other alternative but to re-launch the java application if you want to update your changes.

    **/openvidu/openvidu-server**

    ``` 
    mvn clean compile package exec:java
    ```

    *(or re-launch the Java application in your IDE. Some IDE's support automatic re-launch in response to changes)*


---

Setup for advanced development: share the app through your network
------------------
You can also use **different machines** in the **same network** to build a more advanced development environment, so you can test the application in different devices at the same time. It's very similar to the process outlined above:

You will need a server for the built app (if you don't have any, we recommend *http-server*):
```npm install -g http-server```

1) [Install KMS](#installing-kms)

2) [Add Kurento parent Maven dependency to your local repo](#adding-kurento-parent-pom-to-your-local-respository)

3) Clone _openvidu_ repo:

```bash
git clone https://github.com/OpenVidu/openvidu.git
```

4) Start KMS in your machine:

```bash
sudo service kurento-media-server-6.0 start
```

5) `/openvidu/openvidu-browser/src/main/resources`

```bash
npm install
npm run updatetsc
sudo npm link
```

6) `/openvidu/openvidu-ng-testapp`

```bash
npm install
npm link openvidu-browser
```

7) `/openvidu`

```bash
mvn compile -DskipTests=true
mvn install -DskipTests=true
```

8) `/openvidu/openvidu-server`

```bash
mvn -DskipTests=true clean compile package -Dopenvidu.security=false exec:java
```

  *(or if you prefer you can just run the Java application in your favourite IDE)*


The following commands will be the ones which you should relaunch to update your changes:
`/openvidu/openvidu-ng-testapp`

```bash
ng build
cd dist
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem  [ACCEPT ALL FIELDS]
http-server -S
```

These commands build the Angular project, generate a self-signed certificate (which unfortunately is a mandatory requirement for http-server SSL) and serves the content in http-server.

Finally, to launch the app connect to `https://127.0.0.1:8080` in the machine running the http-server and to `https://[HOST]:8080` in other devices of the same network ([HOST] the IP of the machine running the http-server).

Don't forget to accept the certificate at `https://[HOST]:8443` !


---

Installing KMS
------------------

How to *install* and *run* KMS in your development machine:

Ubuntu 14.04 LTS Trusty (64 bits)

```bash
echo "deb http://ubuntu.kurento.org trusty kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install kurento-media-server-6.0
```

Ubuntu 16.04 LTS Xenial (64 bits)

```bash
echo "deb http://ubuntu.kurento.org xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install kurento-media-server-6.0
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

You will need development version of Kurento's parent POM in your local repository in order to compile _openvidu-server_. To achieve this, add in your `/home/.m2` a file `settings.xml` with the following content:

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