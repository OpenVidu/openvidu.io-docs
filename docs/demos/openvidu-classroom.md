# openvidu-classroom

<a href="https://github.com/OpenVidu/classroom-demo" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a fully functional application that makes use of the secure version of OpenVidu to connect teachers and students in video sessions. It has a frontend built with <strong>Angular</strong>, a backend built with <strong>Spring Boot</strong> and a <strong>MySQL</strong> database. There are two types of roles: teachers and students. First ones can create/edit/remove lessons and invite students to them. Only when a teacher initialize a lesson authorized students can connect to it.


## Get and execute the code


1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/classroom-demo.git
```
2) You will need node, NPM and angular-cli to execute the app. You can install them with:


```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install --location=global @angular/cli
```

3) This demo needs a MySQL database to store the info. We will run it with the official MySQL Docker container:

```bash
docker run --rm -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=openvidu_sample_app mysql
```

4) *openvidu-server* and **Kurento Media Server** must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.29.0
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
    <a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu-classroom.png">
      <img class="img-responsive" src="img/demos/openvidu-classroom.png">
    </a>
  </div>
  <div class="col-md-4">
    <a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu-classroom-dashboard.png">
      <img class="img-responsive" src="img/demos/openvidu-classroom-dashboard.png">
    </a>
  </div>
  <div class="col-md-4">
    <a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu-classroom-video.png">
      <img class="img-responsive" src="img/demos/openvidu-classroom-video.png">
    </a>
  </div>
</div>

<br>

Without going into greater detail, the backend has [one controller](https://github.com/OpenVidu/classroom-demo/blob/master/src/main/java/io/openvidu/classroom/demo/lesson/LessonController.java){:target="_blank"} for the REST operations of the lessons (create new ones or edit/remove existing ones) and [one controller](https://github.com/OpenVidu/classroom-demo/blob/master/src/main/java/io/openvidu/classroom/demo/session_manager/SessionController.java){:target="_blank"} for handling the videoconferences. This controller is pretty similar to the one described in any of the secure tutorials. Basically it listens to the operations of creating a new session (returning a *sessionId* from *openvidu-server*), generating a new user token (returning the *token* from *openvidu-server*) and removing the users when they leave the session.



## Deploying openvidu-classroom

> This tutorial image is **officially released for OpenVidu** under the name `openvidu/openvidu-classroom-demo:X.Y.Z` so you do not need to build it by yourself. However, if you want to deploy a custom version of openvidu-classroom, you will need to build a new one. You can keep reading for more information.

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-classroom/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-classroom** docker image. Under `openvidu-classroom/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the openvidu-classroom server and the static files.


```bash
./create_image.sh openvidu/my-openvidu-classroom-demo:X.Y.Z
```

This script will create an image named `openvidu/my-openvidu-classroom-demo:X.Y.Z`. This name will be used in the next step.


#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>
