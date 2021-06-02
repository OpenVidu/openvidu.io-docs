# openvidu-classroom

<a href="https://github.com/OpenVidu/classroom-demo" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a fully functional application that makes use of the secure version of OpenVidu to connect teachers and students in video sessions. It has a frontend built with <strong>Angular 7</strong>, a backend built with <strong>Spring Boot</strong> and a <strong>MySQL</strong> database. There are two types of roles: teachers and students. First ones can create/edit/remove lessons and invite students to them. Only when a teacher initialize a lesson authorized students can connect to it.



## Get and execute the code


1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/classroom-demo.git
```
2) You will need node, NPM and angular-cli to execute the app. You can install them with:


```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g @angular/cli
```

3) This demo needs a MySQL database to store the info. Install MySQL:

```bash
sudo apt-get install -y mysql-server
sudo mysql_secure_installation
```
 And create a new database:

```bash
mysql -u root -p
```
(Enter the same password you set during the installation process)

```bash
CREATE DATABASE openvidu_sample_app;
exit
```

4) *openvidu-server* and **Kurento Media Server** must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.18.0
```

5) Install NPM dependencies of frontend:

```bash
cd classroom-demo/src/angular/frontend
npm install
```

6) Build the frontend, exporting the files to the static folder of the Java application:

```bash
ng build --output-path ../../main/resources/static
```

7) Finally run the Spring Boot application:

```bash
cd ../../../
mvn clean package exec:java
```

Go to _[`https://localhost:5000`](https://localhost:5000){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call. To test two users in the same computer, use a standard window and an incognito window.

<div class="row no-margin row-gallery">
  <div class="col-md-4">
    <a data-fancybox="gallery" href="img/demos/openvidu-classroom.png">
      <img class="img-responsive" src="img/demos/openvidu-classroom.png">
    </a>
  </div>
  <div class="col-md-4">
    <a data-fancybox="gallery" href="img/demos/openvidu-classroom-dashboard.png">
      <img class="img-responsive" src="img/demos/openvidu-classroom-dashboard.png">
    </a>
  </div>
  <div class="col-md-4">
    <a data-fancybox="gallery" href="img/demos/openvidu-classroom-video.png">
      <img class="img-responsive" src="img/demos/openvidu-classroom-video.png">
    </a>
  </div>
</div>

<br>

Without going into greater detail, the backend has [one controller](https://github.com/OpenVidu/classroom-demo/blob/master/src/main/java/io/openvidu/classroom/demo/lesson/LessonController.java){:target="_blank"} for the REST operations of the lessons (create new ones or edit/remove existing ones) and [one controller](https://github.com/OpenVidu/classroom-demo/blob/master/src/main/java/io/openvidu/classroom/demo/session_manager/SessionController.java){:target="_blank"} for handling the videoconferences. This controller is pretty similar to the one described in any of the secure tutorials. Basically it listens to the operations of creating a new session (returning a *sessionId* from *openvidu-server*), generating a new user token (returning the *token* from *openvidu-server*) and removing the users when they leave the session.



## Deploy openvidu-classroom

#### Using the OpenVidu Dockerhub image

**1) Redefine the `/opt/openvidu/docker-compose.override.yml`**

As the [deployment docs says](deployment/deploying-openvidu-apps/#with-docker){:target="_blank"}, to make it works with OpenVidu stack, you will need redefine the `/opt/openvidu/docker-compose.override.yml` by the OpenVidu Classroom `docker-compose-override.yml`.

This is how should looks like the `docker-compose-override.yml` after be redefined:

```
version: '3.1'

services:
    app:
        image: openvidu/openvidu-classroom:2.18.0
        restart: on-failure
        network_mode: host
        environment:
            - SERVER_PORT=5442
            - OPENVIDU_URL=http://localhost:5443
            - OPENVIDU_SECRET=${OPENVIDU_SECRET}
```

#### Creating my own docker image

Under the root project folder, you can see the `docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-classroom** docker image.

**1) Run `create_image.sh` script:**

```bash
./create_image.sh
```

This script will create an image named `openvidu/openvidu-classroom-demo:X.Y.Z`. If you want to create a image with another different name, you can do it change the name [here](https://github.com/OpenVidu/classroom-demo/blob/2a931237dc232743fbdb847bc70b93dd0c014d18/docker/create_image.sh#L5-L6). Once the openvidu-classrom image has been created, you will can deploy it.

**2) Redefine the `/opt/openvidu/docker-compose.override.yml`**

The steps are exactly the same as those described above but you have to take account change the image name by your custom name (`openvidu/openvidu-classroom-demo` on this sample).

[Here](https://github.com/OpenVidu/classroom-demo/blob/2a931237dc232743fbdb847bc70b93dd0c014d18/docker/docker-compose.override.yml#L1) it is the `docker-compose-override.yml` used by OpenVidu Classroom application.

```
version: '3.1'

services:
    app:
        image: openvidu/openvidu-classroom-demo:2.18.0
        restart: on-failure
        network_mode: host
        environment:
            - SERVER_PORT=5442
            - OPENVIDU_URL=http://localhost:5443
            - OPENVIDU_SECRET=${OPENVIDU_SECRET}
```


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox="gallery"]',
    infobar : true,
    arrows : false,
    loop: true,
    protect: true,
    transitionEffect: 'slide',
    buttons : [
        'close'
    ],
    clickOutside : 'close',
    clickSlide   : 'close',
  });
</script>
