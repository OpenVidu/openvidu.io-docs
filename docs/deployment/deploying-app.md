<h2 id="section-title">Deploying your OpenVidu application</h2>
<hr>

Adding your own app to OpenVidu AWS deployment
------------------
In order to show how an application that makes use of OpenVidu might be deployed, here you have a guide to do so in AWS after launching it with [CloudFormation OpenVidu](/deployment/deploying-aws/){:target="_blank"}.

Once you have checked that your AWS OpenVidu Server is up and running, adding your own application to the same instance is not hard. Follow these steps:
  
#### 1. Upload your app to your EC2 instance

In Linux/Mac you can use [scp](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html#AccessingInstancesLinuxSCP){:target="_blank"} command. In Windows (or If you prefer a more friendly GUI) you can use [FileZilla](https://beamtic.com/connect-to-aws-ec2-with-ftp){:target="_blank"}. Furthermore, if your app is stored in a GitHub repo, you can directly clone it once you connect to your instance.

Remember that the key will be the same you indicated when configuring the [CloudFormation fields](/deployment/deploying-aws/#4-complete-the-configuration-fields){:target="_blank"}. 

#### 2. Connect to your EC2 instance through SSH

Remember that the key will be the same you indicated when configuring the [CloudFormation fields](/deployment/deploying-aws/#4-complete-the-configuration-fields){:target="_blank"}. In case of doubt, check [AWS docs](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html){:target="_blank"}.

#### 3. Configure your app

Depending on the framework of your app:

<br>

##### Plain HTML/CSS/JS
  - If your app doesn't have a server-side and it is plain HTML, CSS and JavaScript, you just have to add your web files into `/var/www/html/`. You will have instant access to it through `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN/`

      > If you want to test the deployment of a plain HTML/CSS/JS app, you can use **[openvidu-insecure-js](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-js){:target="_blank"}**

<br>

##### Java
  - Copy your JAR or WAR into `/opt/`

  - Write a script to launch your app with all the parameters it needs, and store it under `/opt/`. For example, a file `/opt/YOUR_LAUNCHER.sh` containing:
        
        cd /opt
        java -jar -Dserver.port=4040 myapp.jar

      > **IMPORTANT 1**: It is crucial to navigate to **/opt** before the launching command. Otherwise, the system will surely have some problems for finding your files

      > **IMPORTANT 2**: Obviously your app will need Java to run. You must install the correct version of Java in your machine (check version: `java -version`)
      
      > **IMPORTANT 3**: Make sure the script you made is executable (`chmod +x YOUR_LAUNCHER.sh `)

  - Configure Nginx: add a new **location** directive to the file `/etc/nginx/sites-enabled/default`, inside the `server { }` group:
        
          location / {
            rewrite /(.*) /$1 break;
            proxy_pass https://localhost:PORT;
          }
          
      For example

          location / {
            rewrite /(.*) /$1 break;
            proxy_pass https://localhost:4040;
          }
            
  - Configure Supervisor: add the script you wrote in the second step to the file `/etc/supervisor/conf.d/openvidu.conf` like this:
            
          [program:YOUR_APP]
          command=/bin/bash /opt/YOUR_LAUNCHER.sh YOUR_APP_PARAM_1 YOUR_APP_PARAM_2 ...
          redirect_stderr=true
          
    Now your `/etc/supervisor/conf.d/openvidu.conf` must look like this:

          [supervisord]
          nodaemon=true
          logfile=/var/log/supervisor/supervisord.log
          pidfile=/var/run/supervisord.pid
          loglevel=debug

          [program:openvidu-server]
          command=java -jar -Dopenvidu.secret="MY_SECRET" -Dserver.ssl.enabled=false -Dopenvidu.pu$

          [program:YOUR_APP]
          command=/bin/bash /opt/YOUR_LAUNCHER.sh YOUR_APP_PARAM_1 YOUR_APP_PARAM_2 ...
          redirect_stderr=true          

      > To connect your Java app to OpenVidu Server in order to get your sessionIds and tokens (whether you use the _[REST API](/reference-docs/REST-API/){:target="_blank"}_ or _[openvidu-java-client](/reference-docs/openvidu-java-client/){:target="_blank"})_, you will need to use the URL `https://localhost:4443`. _localhost_ because in this case both your app and OpenVidu Server run in the same machine. _4443_ because there's where OpenVidu Server listens for petitions. For example, our tutorial _openvidu-js-java_ sets this parameter as an environment variable [right here](https://github.com/OpenVidu/openvidu-tutorials/blob/4ea5f6849762bc7eaa501217b145ede0339092e3/openvidu-js-java/src/main/resources/application.properties#L8){:target="_blank"}
            
  - Restart Nginx: `systemctl restart nginx`
  
  - Restart Supervisor: `systemctl restart supervisor`

  - You will have access to your app through `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN/`

  - Troubleshooting: If your app is not working as expected, there are a few files you should check for debugging: `/var/log/nginx/` (info about the proxy), `/var/log/supervisor/` (output of your app). You can also try to connect to your app directly through the port like `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN:YOUR_APP_PORT`

      > If you want to test the deployment of a Java app, you can use **openvidu-js-java** or **openvidu-mvc-java** ([release here](https://github.com/OpenVidu/openvidu-tutorials/releases){:target="_blank"})

<br>

##### Node
  - Add your web files into `/opt/`

  - Write a script to launch your app with all the parameters it needs, and store it under `/opt/`. For example, a file `/opt/YOUR_LAUNCHER.sh` containing:
        
        cd /opt
        node myserver.js 4040

      > **IMPORTANT 1**: It is crucial to navigate to **/opt** before the launching command. Otherwise, the system will surely have some problems for finding your files

      > **IMPORTANT 2**: Obviously your app will need Node to run. You must install the correct version of Node in your machine (check version: `nodejs -v`)
      
      > **IMPORTANT 3**: Make sure the script you made is executable (`chmod +x YOUR_LAUNCHER.sh `)
  
  - Configure Nginx: add a new **location** directive to the file `/etc/nginx/sites-enabled/default`, inside the `server { }` group::
      
          location / {
            rewrite /(.*) /$1 break;
            proxy_pass https://localhost:PORT;
          }
          
      For example

          location / {
            rewrite /(.*) /$1 break;
            proxy_pass https://localhost:4040;
          }
          
  - Restart Nginx: `systemctl restart nginx`

  - Configure Supervisor: add the script you wrote in the second step to `/etc/supervisor/conf.d/openvidu.conf` like this:
          
          [program:YOUR_APP]
          command=/bin/bash /opt/YOUR_LAUNCHER.sh YOUR_APP_PARAM_1 YOUR_APP_PARAM_2 ...
          redirect_stderr=true
          
    Now your `/etc/supervisor/conf.d/openvidu.conf` must look like this:

          [supervisord]
          nodaemon=true
          logfile=/var/log/supervisor/supervisord.log
          pidfile=/var/run/supervisord.pid
          loglevel=debug

          [program:openvidu-server]
          command=java -jar -Dopenvidu.secret="MY_SECRET" -Dserver.ssl.enabled=false -Dopenvidu.pu$

          [program:YOUR_APP]
          command=/bin/bash /opt/YOUR_LAUNCHER.sh YOUR_APP_PARAM_1 YOUR_APP_PARAM_2 ...
          redirect_stderr=true    

      > To connect your Node app to OpenVidu Server in order to get your sessionIds and tokens (whether you use the _[REST API](/reference-docs/REST-API/){:target="_blank"}_ or _[openvidu-node-client](/reference-docs/openvidu-node-client/){:target="_blank"}_), you will need to use the URL `https://localhost:4443`. _localhost_ because in this case both your app and OpenVidu Server run in the same machine. _4443_ because there's where OpenVidu Server listens for petitions. For example, our tutorial _openvidu-js-node_ expects this parameter as the first argument on launch command [right here](https://github.com/OpenVidu/openvidu-tutorials/blob/4ea5f6849762bc7eaa501217b145ede0339092e3/openvidu-js-node/server.js#L62){:target="_blank"}
          
  - Restart Supervisor: `systemctl restart supervisor`

  - You will have access to your app through `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN/`

  - Troubleshooting: If your app is not working as expected, there are a few files you should check for debugging: `/var/log/nginx/` (info about the proxy), `/var/log/supervisor/` (output of your app). You can also try to connect to your app directly through the port like `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN:YOUR_APP_PORT`

      > If you want to test the deployment of a Node app, you can use **[openvidu-js-node](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-js-node){:target="_blank"}**

<br>

##### PHP, Ruby, Python, .NET...

We are not going to spell out in detail what is to be done with the rest of backend technologies, but you can get the idea from the Java and Node steps above. It is always the same process: take your app to your instance, place it under `/opt/`, configure Nginx and Supervisor (this last with the necessary launching script depending on your technology) and relaunch both services. Be sure that your machine has all the necessary dependencies and technologies to execute your application, depending on the framework (Java for a Java app, Node for a Node app, Ruby for a Ruby app...)

Voilà! It is really this simple.


#### PS: Multiple apps in the same instance

To launch multiple apps in the same instance, just store each one of them inside its own folder under `/opt/`. For example:

  - `/opt/YOUR_APP_1` : will be available at `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN/YOUR_APP_1/`
  - `/opt/YOUR_APP_2` : will be available at `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN/YOUR_APP_2/`

The other steps explained above also need some adjustments related to paths:

  - Configure Nginx: now it would be...

        location /YOUR_APP_1 {
          rewrite /YOUR_APP_1(.*) /$1 break;
          proxy_pass https://localhost:PORT1;
        }

        location /YOUR_APP_2 {
          rewrite /YOUR_APP_2(.*) /$1 break;
          proxy_pass https://localhost:PORT2;
        }

  - Configure Supervisor: now...

          [program:YOUR_APP_1]
          command=/bin/bash /opt/YOUR_APP_1/YOUR_LAUNCHER_1.sh YOUR_APP1_PARAM_1 YOUR_APP1_PARAM_2 ...
          redirect_stderr=true

          [program:YOUR_APP_2]
          command=/bin/bash /opt/YOUR_APP_2/YOUR_LAUNCHER_2.sh YOUR_APP2_PARAM_1 YOUR_APP2_PARAM_2 ...
          redirect_stderr=true

<script src="/js/copy-btn.js"></script>

---

Connecting your external app to OpenVidu
------------------
The best production setup for OpenVidu is having your application deployed in a different dedicated server. That is, not being included in the same host as OpenVidu, which is the scenario explained in the [previous section](#adding-your-own-app-to-openvidu-aws-deployment) (that all-in-one scenario is easier for the first approach to the deployment of your OpenVidu app. Try it if you want detailed instructions on how to deploy your app).

Once you have deployed OpenVidu and checked that it is up and running, and after setting up your own application in its dedicated server:

- Make sure you know your **OpenVidu Server public IP**. That includes the protocol (`https`), the location and the port. For example: `https://OPENVIDUSERVER_PUBLIC_IP:4443/`. Or if you have set up a domain name you can use it instead of the public ip (this is highly recommended for production setups)
- Use it in your application server to perform the **[REST](/reference-docs/REST-API/){:target="_blank"}** operations, or to initialize your OpenVidu object if you are making use of **[openvdiu-java-client](/reference-docs/openvidu-java-client/){:target="_blank"}** or **[openvidu-node-client](/reference-docs/openvidu-node-client/){:target="_blank"}** :
    - _REST_ operations to `https://OPENVIDUSERVER_PUBLIC_IP:4443/api/METHOD` 
    - _openvidu-java-client_ entrypoint is `new OpenVidu(https://OPENVIDUSERVER_PUBLIC_IP:4443/, OPENVIDU_SECRET)`
    - _openvidu-node-client_ entrypoint is `new OpenVidu(https://OPENVIDUSERVER_PUBLIC_IP:4443/, OPENVIDU_SECRET)` 

<br>
> In the one-server-scenario of the [previous section](#adding-your-own-app-to-openvidu-aws-deployment) the OpenVidu Server public IP would be `https://localhost:4443`, as both OpenVidu Server and your app live in the same host.

<br>