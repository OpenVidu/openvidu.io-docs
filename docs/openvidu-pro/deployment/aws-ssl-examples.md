<h2 id="section-title">OpenVidu Pro Domain and SSL Configuration Examples in AWS</h2>
<hr>

- **[Example Scenarios](#example-scenarios)**
    - [Self-signed certificate](#1-self-signed-certificate)
    - [Let's Encrypt certificate](#2-lets-encrypt-certificate)
    - [Custom Certificate (Commercial CA)](#3-custom-certificate-commercial-ca)
- **[Common Problems](#common-problems)**
    
## Example Scenarios

These examples are focusing in the [Domain and SSL certificate configuration](openvidu-pro/deployment/aws#domain-and-ssl-certificate-configuration){:target="_blank"} section of the [Deploying OpenVidu Pro on AWS](openvidu-pro/deployment/aws#deployment-instructions){:target="_blank"} instructions to clarify any doubt on how to configure it.

As OpenVidu Pro is deployed with default sane configuration parameters, the [Domain and SSL certificate configuration](openvidu-pro/deployment/aws#domain-and-ssl-certificate-configuration) are the most important parameters to deploy your stack correctly.

Let's see all different scenarios:

### 1) Self-signed certificate

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        This example should be used only for development environments. <strong>Don't use it in production</strong>.
  </div>
</div>

This scenario is meant for you if you want to:

- Deploy OpenVidu Pro quickly for testing or developing purposes.
- Deploy OpenVidu Pro without a Fully Qualified Domain Name (FQDN).

#### 1.1) Cloudformation parameters 🔗

Let's see an example of this scenario for the Cloudformation parameters section:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-1" href="img/docs/deployment/aws-examples-selfsigned-no-fqdn.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-selfsigned-no-fqdn.png"/></a>
    </div>
</div>

1. Select as Certificate type: **selfsigned**
2. Keep all the parameters in the **Domain and SSL certificate configuration** section empty, because we don't have any Elastic Ip, domain or other SSL configuration to specify in this scenario.

### 2) Let's Encrypt certificate

This scenario is meant for you if you want to:

- Deploy OpenVidu Pro for production or even developing purposes. 
- Deploy OpenVidu Pro with a Fully Qualified Domain Name (FQDN).
- Use a valid SSL certificate.

For this specific scenario you will need to:

#### 2.1) Create an Elastic IP

1. Go to your EC2 AWS section, and click here: 
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-1" href="img/docs/deployment/aws-examples-letsencrypt-1.png"><img width="200px" class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-1.png"/></a>
    </div>
</div>
2. Click on **Allocate Elastic IP address**
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-2" href="img/docs/deployment/aws-examples-letsencrypt-2.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-2.png"/></a>
    </div>
</div>
3. This will generate an Elastic IP that you will be able to use for your OpenVidu Pro deployment with letsencrypt 
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-3" href="img/docs/deployment/aws-examples-letsencrypt-3.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-3.png"/></a>
    </div>
</div>

#### 2.2) Register a FQDN pointing to the Elastic IP

This step will depend of the DNS register you want to use. You need to create a DNS register of **type A pointing to the Elastic IP created before**. For the next steps, let's suppose that our domain is: **example.openvidu.io**.

#### 2.3) Cloudformation parameters
  
Let's see an example of this scenario for the Cloudformation parameters section:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-4" href="img/docs/deployment/aws-examples-letsencrypt-4.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-4.png"/></a>
    </div>
</div>

The important fields of this section are:

- The **AWS Elastic IP (EIP)** with the Elastic IP created in step [2.1](#21-create-an-elastic-ip)
- The **Domain Name pointing to Elastic IP** with the FQDN created at step [2.2](#22-register-a-fqdn-pointing-to-the-elastic-ip)
- The **Email for Let's Encrypt** with the email you want to use for your Let's Encrypt certificate.

### 3) Custom Certificate (Commercial CA)

This scenario is meant for you if you want to:

- Deploy OpenVidu Pro for production.
- Deploy OpenVidu Pro with a Fully Qualified Domain Name (FQDN).
- Use a valid SSL certificate from a **Commercial CA**.

For this specific scenario you will need to:

#### 3.1) Generate certificates files

To use this kind of certificate, you need to generate two files, `certificate.cert` (public keys of the certificate) and `certificate.key` (private key), and upload them to an HTTP server to make it available for the Cloudformation parameters. But first, follow these steps to generate these files: <br><br>

**1)** Create a CSR and a private key. This can be easily done by executing: 
```bash
openssl req -newkey rsa:2048 -nodes -keyout certificate.key -out certificate.csr
```
While executing this command, you will be asked to enter some information to generate the files `certificate.key` and `certificate.csr`. Ensure that all these information are correctly inserted (**Common Name**, **Organization Name**, etc...). The most important parameter is the **Common Name** field which should match the name that you want to use for your certificate.

For example, let's suppose that your domain is **example.openvidu.io**. The parameter **Common Name** could be: **example.openvidu.io** or **www.example.openvidu.io**. Otherwise, if you're using a WildCart certificate, the **Common Name** parameter would be ** *.openvidu.io**.

**2)** The previous command generated the `certificate.key` and `certificate.csr` files. The `certificate.csr` is the one that you need to provide to your CA. Depending of your CA this step can differ. **Check your CA documentation about this topic**.

**3)** Usually the files to generate the `certificate.cert` can be downloaded or are sent via email from the CA. These files are:

- The intermediate certificate. (It usually have more than one key with `---BEGIN CERTIFICATE---` This file will be called as `intermediate.cert` in following steps.
- Your ssl certificate.  An unique certificate key with `---BEGIN CERTIFICATE---`. This file will be called as `public.cert` in following steps.<br>

**4)** You need to concat these two files in an unique `certificate.cert` file in this way:
```bash
cat public.cert intermediate.crt > certificate.cert
```

**5)** Now you have the `certificate.key` generated in step 1) and the `certificate.cert` generated in step 4).

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 10px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
If you're still having doubts about how to generate the certificates files, you can follow this <a href="https://www.digitalocean.com/community/tutorials/how-to-install-an-ssl-certificate-from-a-commercial-certificate-authority" target="_blank">guide</a> for a further understanding.
</div>
</div>

<br><br>

#### 3.2) Upload your certificate files into an HTTP server.

Now that you have both certificate files, you need to make it available via HTTP for the Cloudformation template. Let's suppose that you upload both files and the URLs are:

- `http://example-http-server.io/certificate.cert`
- `http://example-http-server.io/certificate.key`

#### 3.3) Create an Elastic IP and a FQDN pointing to it.

Just follow the same steps of the Let's Encrypt section: [2.1](#21-create-an-elastic-ip) and [2.2](#22-register-a-fqdn-pointing-to-the-elastic-ip)


#### 3.4) Cloudformation parameters

Let's see an example of this scenario for the Cloudformation parameters section:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-own-1" href="img/docs/deployment/aws-examples-owncert-1.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-owncert-1.png"/></a>
    </div>
</div>

These are the important fields of the cloudformation parameters:

- The **AWS Elastic IP (EIP)** with the Elastic IP created in step [2.1](#21-create-an-elastic-ip)
- The **Domain Name pointing to Elastic IP** with the FQDN created at step [2.2](#22-register-a-fqdn-pointing-to-the-elastic-ip)
- The **URL to the CRT file (owncert)** with the URL to the `certificate.cert` file created at step [3.1](#31-generate-the-certificates-files-using-the-commercial-ca-services) and uploaded to an HTTP server in step [3.2](#32-upload-your-certificate-files-into-an-http-server).
- The **URL to the key file (owncert)** with the URL to the `certificate.key` file created at step [3.1](#31-generate-the-certificates-files-using-the-commercial-ca-services) and uploaded to an HTTP server in step [3.2](#32-upload-your-certificate-files-into-an-http-server).

#### 3.5) Remove your certificates files from the HTTP server of step [3.2](#32-upload-your-certificate-files-into-an-http-server)

It is very important after the deployment to invalidate the URLs created at step [3.2](#32-upload-your-certificate-files-into-an-http-server) after the stack is successfully deployed. These files available via HTTP are only necessary for CloudFormation EC2 instances to be able to download the certificate files and configure it into the system and are no longer necessary after the deployment process.

## Common problems

- [Letsencrypt is not working. What can I do?.](/troubleshooting/#14-deployment-with-lets-encrypt-is-not-working)
- [Do I need to update Let's Encrypt certificates?](/troubleshooting/#15-do-i-need-to-update-lets-encrypt-certificates) 
- [My commercial certificate is not working, What can I do?](/troubleshooting/#16-my-commercial-certificate-is-not-working-what-can-i-do)

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox]',
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

<link rel="stylesheet" type="text/css" href="css/downloads/slick-1.6.0.css"/>
<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
<script type="text/javascript" src="js/downloads/slick-1.6.0.min.js"></script>

<script>
    $('.docs-gallery').slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      },
    ]
    });
</script>
