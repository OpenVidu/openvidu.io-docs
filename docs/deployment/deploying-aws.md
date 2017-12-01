<h2 id="section-title">Deploying OpenVidu Server and your app on AWS</h2>
<hr>

Deploying OpenVidu Server on AWS with Cloud Formation
------------------
The deployment of OpenVidu can be a piece of cake if you have an AWS account. Just follow these steps:

#### 1. Access to the console of AWS Cloud Formation

  <p><a href="https://console.aws.amazon.com/cloudformation" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

#### 2. Click on _Create Stack_

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_newstack.png">
  </p>

#### 3. Option _Specify an Amazon S3 template URL_ with the following URL

  <code id="code-2">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-latest.json</code>
  <button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                                title="Copy to Clipboard">Copy</button>

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_url.png">
  </p>

#### 4. Complete the configuration fields

We provide 3 different scenarios: you can use the default **SELF-SIGNED CERTIFICATE** stored in the application (users will need to accept the security alert) or if you have a custom domain, either allow **LET'S ENCRYPT** to automatically generate a valid and free certificate for your domain or use your own **CUSTOM CERTIFICATE** if you already have one.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table">
    <tr>
      <th></th>
      <th>Self-Signed certificate</th>
      <th><em>Let's Encrypt</em> certificate</th>
      <th>Custom certificate</th>
    </tr>
    <tr>
      <td class="first-col">Stack name</td>
      <td><em>Your choice</em></td>
      <td><em>Your choice</em></td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">Type of SSL Certificate</td>
      <td>selfsigned</td>
      <td>letsencrypt</td>
      <td>owncert</td>
    </tr>
    <tr>
      <td class="first-col">Email</td>
      <td></td>
      <td><em>Your choice</em></td>
      <td><em></em></td>
    </tr>
    <tr>
      <td class="first-col">Fully qualified domain name</td>
      <td></td>
      <td><em>Your custom domain</em></br><span class="field-comment">(for example: <em>openvidu.io</em>)</span></td>
      <td><em>Your custom domain</em></br><span class="field-comment">(for example: <em>openvidu.io</em>)</span></td>
    </tr>
    <tr>
      <td class="first-col">Elastic IP</td>
      <td></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
    </tr>
    <tr>
      <td class="first-col">CRT File</td>
      <td></td>
      <td></td>
      <td><em>Content of your <strong>.crt</strong> file</em><br><span class="field-comment">-----BEGIN CERTIFICATE-----<br>fooFOOfooFOOfooFOOfoo...<br>-----END CERTIFICATE-----</span></td>
    </tr>
    <tr>
      <td class="first-col">KEY File</td>
      <td></td>
      <td></td>
      <td><em>Content of your <strong>.key</strong> file</em><br><span class="field-comment">-----BEGIN RSA PRIVATE KEY-----<br>fooFOOfooFOOfooFOOfoo...<br>-----END RSA PRIVATE KEY-----</span></td>
    </tr>
    <tr>
      <td class="first-col">OpenVidu Secret</td>
      <td><em>Your choice</em></td>
      <td><em>Your choice</em></td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">Instance Type</td>
      <td><em>Your choice</em></br><span class="field-comment">(at least <code>t2.medium</code> recommended)</span></td>
      <td><em>Your choice</em></br><span class="field-comment">(at least <code>t2.medium</code> recommended)</span></td>
      <td><em>Your choice</em></br><span class="field-comment">(at least <code>t2.medium</code> recommended)</span></td>
    </tr>
    <tr>
      <td class="first-col">KeyName</td>
      <td><em>Your choice</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
      <td><em>Your choice</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
      <td><em>Your choice</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
    </tr>
  </table>
</div>

#### 5. Create your Stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait for a few minutes.

#### 6. Access and test your OpenVidu Server through your new IP

Go to **_Outputs_** tab to get your brand new IP and click on it (or if you have deployed under your own custom domain, then you should access through it).

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_output.png">
  </p>

You will connect to your OpenVidu Dashboard, where you can test the video transmission. You can now add your own application to your instance. To learn how check the [next section](#adding-your-own-app-to-cloudformation-openvidu-server).

  > **IMPORTANT**: Even though the Status of your new Stack shows "CREATE_COMPLETE", 
  > it will take a bit longer until you can access your OpenVidu Server. Be patient.


Adding your own app to CloudFormation OpenVidu Server
------------------
Once you have deployed your CloudFormation OpenVidu Server and checked that it is up and running, you can easily add your own application to the instance. Follow these steps:
  
#### 1. Upload your app to your EC2 instance

In Linux/Mac you can use [scp](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html#AccessingInstancesLinuxSCP) command. In Windows (or If you prefer a more friendly GUI) you can use [FileZilla](https://beamtic.com/connect-to-aws-ec2-with-ftp). Furthermore, if your app is stored in a GitHub repo, you can directly clone it once you connect to your instance.

Remember that the key will be the same you indicated when configuring the [CloudFormation fields](#4-complete-the-configuration-fields). 

#### 2. Connect to your EC2 instance through SSH

Remember that the key will be the same you indicated when configuring the [CloudFormation fields](#4-complete-the-configuration-fields). In case of doubt, check [AWS docs](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html).

#### 3. Configure your app

Depending on the framework of your app:

<br>

##### Plain HTML/CSS/JS
  - If your app doesn't have a server-side and it is plain HTML, CSS and JavaScript, you just have to add your web files into `/var/www/html/`. You will have instant access to it through `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN/`

      > If you want to test the deployment of a plain HTML/CSS/JS app, you can use **[openvidu-insecure-js](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-js)**

<br>

##### Java
  - Copy your JAR or WAR into `/opt/`

  - Write a script to launch your app with all the parameters it needs, and store it under `/opt/`. For example, a file `/opt/YOUR_LAUNCHER.sh` containing:
        
        cd /opt
        java -jar -Dserver.port=4040 myapp.jar

      > **IMPORTANT 1**: It is crucial to navigate to **/opt** before the launching command. Otherwise, the system will surely have some problems for finding your files

      > **IMPORTANT 2**: Obviously your app will need Java to run. You must install the correct version of Java in your machine (check version: `java -version`)

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

      > To connect your Java app to OpenVidu Server in order to get your sessionIds and tokens (check [Securization](/home/#securization) section), you will need to use the URL `https://localhost:8443`. _localhost_ because both your app and OpenVidu Server run in the same machine. _8443_ because there's where OpenVidu Server listens for petitions. For example, our tutorial _openvidu-js-java_ sets this parameter as an environment variable [right here](https://github.com/OpenVidu/openvidu-tutorials/blob/ba5121c622ea59aa9708021f3635f922acb3ff73/openvidu-js-java/src/main/resources/application.properties#L8).
            
  - Restart Nginx: `systemctl restart nginx`
  
  - Restart Supervisor: `systemctl restart supervisor`

  - You will have access to your app through `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN/`

  - Troubleshooting: If your app is not working as expected, there are a few files you should check for debugging: `/var/log/nginx/` (info about the proxy), `/var/log/supervisor/` (output of your app). You can also try to connect to your app directly through the port like `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN:YOUR_APP_PORT`

      > If you want to test the deployment of a Java app, you can use **openvidu-js-java** or **openvidu-mvc-java** ([release here](https://github.com/OpenVidu/openvidu-tutorials/releases))

<br>

##### Node
  - Add your web files into `/opt/`

  - Write a script to launch your app with all the parameters it needs, and store it under `/opt/`. For example, a file `/opt/YOUR_LAUNCHER.sh` containing:
        
        cd /opt
        node myserver.js 4040

      > **IMPORTANT 1**: It is crucial to navigate to **/opt** before the launching command. Otherwise, the system will surely have some problems for finding your files

      > **IMPORTANT 2**: Obviously your app will need Node to run. You must install the correct version of Node in your machine (check version: `nodejs -v`)
  
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

      > To connect your Node app to OpenVidu Server in order to get your sessionIds and tokens (check [Securization](/home/#securization) section), you will need to use the URL `https://localhost:8443`. _localhost_ because both your app and OpenVidu Server run in the same machine. _8443_ because there's where OpenVidu Server listens for petitions. For example, our tutorial _openvidu-js-node_ expects this parameter as the first argument on launch command [right here](https://github.com/OpenVidu/openvidu-tutorials/blob/ba5121c622ea59aa9708021f3635f922acb3ff73/openvidu-js-node/server.js#L64).
          
  - Restart Supervisor: `systemctl restart supervisor`

  - You will have access to your app through `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN/`

  - Troubleshooting: If your app is not working as expected, there are a few files you should check for debugging: `/var/log/nginx/` (info about the proxy), `/var/log/supervisor/` (output of your app). You can also try to connect to your app directly through the port like `https://AMAZON_URL_OR_YOUR_CUSTOM_DOMAIN:YOUR_APP_PORT`

      > If you want to test the deployment of a Node app, you can use **[openvidu-js-node](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-js-node)**

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