# openvidu-classroom

<a href="https://github.com/OpenVidu/classroom-demo" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a fully functional application that makes use of the secure version of OpenVidu to connect teachers and students in video sessions. It has a frontend built with <strong>Angular 7</strong>, a backend built with <strong>Spring Boot</strong> and a <strong>MySQL</strong> database. There are two types of roles: teachers and students. First ones can create/edit/remove lessons and invite students to them. Only when a teacher initialize a lesson authorized students can connect to it.



## Running this demo


1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/classroom-demo.git
```
2) You will need node, NPM and angular-cli to execute the app. You can install them with:


```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
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
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.11.0
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

Go to [https://localhost:5000](https://localhost:5000){:target="_blank"} to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of <i>openvidu-server</i> when you first try to join a video-call. To test two users in the same computer, use a standard window and an incognito window.

<div class="row no-margin row-gallery">
  <div class="col-md-4">
    <a data-fancybox="gallery" href="/img/demos/openvidu-classroom.png">
      <img class="img-responsive" src="/img/demos/openvidu-classroom.png">
    </a>
  </div>
  <div class="col-md-4">
    <a data-fancybox="gallery" href="/img/demos/openvidu-classroom-dashboard.png">
      <img class="img-responsive" src="/img/demos/openvidu-classroom-dashboard.png">
    </a>
  </div>
  <div class="col-md-4">
    <a data-fancybox="gallery" href="/img/demos/openvidu-classroom-video.png">
      <img class="img-responsive" src="/img/demos/openvidu-classroom-video.png">
    </a>
  </div>
</div>

<br>

Without going into greater detail, the backend has [one controller](https://github.com/OpenVidu/classroom-demo/blob/master/src/main/java/io/openvidu/classroom/demo/lesson/LessonController.java){:target="_blank"} for the REST operations of the lessons (create new ones or edit/remove existing ones) and [one controller](https://github.com/OpenVidu/classroom-demo/blob/master/src/main/java/io/openvidu/classroom/demo/session_manager/SessionController.java){:target="_blank"} for handling the videoconferences. This controller is pretty similar to the one described in any of the secure tutorials. Basically it listens to the operations of creating a new session (returning a *sessionId* from *openvidu-server*), generating a new user token (returning the *token* from *openvidu-server*) and removing the users when they leave the session.


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
