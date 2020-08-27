<h2 id="section-title">OpenVidu Domain and SSL Configuration Examples on premises</h2>
<hr>

- **[Example Scenarios](#example-scenarios)**
    - [Self-signed certificate](#1-self-signed-certificate)
    - [Let's Encrypt certificate](#2-lets-encrypt-certificate)
    - [Custom Certificate (Commercial CA)](#3-option-specify-template-amazon-s3-url-with-the-following-url)
- **[Common Problems](#common-problems)**
    
## Example Scenarios

For these examples, all steps from [Deploying OpenVidu on premises](deployment/deploying-on-premises/#deployment-instructions){:target="_blank"} should be followed. These examples are focusing in the Domain and SSL Configuration. The necessary parameters to use are explained in the [Configuration Section](deployment/deploying-on-premises/#deployment-instructions) section. This examples scenarios have the purpose to clarify any doubt on how to configure the Domain and SSL configuration of OpenVidu on premises. 

As OpenVidu is deployed with default sane configuration, the [Domain and SSL certificate configuration](deployment/deploying-aws#domain-and-ssl-certificate-configuration) are the most important parameters to deploy your stack correctly.

### 1) Self-signed certificate

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        This scenerario should be used only for development environments. <strong>Don't use it in production</strong>.
  </div>
</div>

This scenario is meant for you if you want to:

- Deploy OpenVidu quickly for testing or developing purposes.
- Deploy OpenVidu without a Fully Qualified Domain Name (FQDN).

Let's suppose that OpenVidu is installed following the instructions from [here](deployment/deploying-on-premises/#deployment-instructions), and we have, for example, this public IP: `123.12.123.12`

For this specific scenario you will need to:

#### 1.1) Edit `/opt/openvidu/.env`

To make our deployment works with a **self-signed** certificate, you just need to edit the file in `/opt/openvidu/.env` and fill the
next variables:


```
DOMAIN_OR_PUBLIC_IP=123.12.123.12

CERTIFICATE_TYPE=selfsigned

OPENVIDU_SECRET=<YOUR_SECRET>
```

Only these variables are needed to make it works. The rest of the variables in the `/opt/openvidu/.env` are referred to [OpenVidu Configuration parameters](reference-docs/openvidu-config/). 

The variable `LETSENCRYPT_EMAIL` should be empty for this kind of certificate.

Also, if you have a Fully Qualified Domain Name pointing to your IP address, you can use it in the `DOMAIN_OR_PUBLIC_IP`. For example:

```
DOMAIN_OR_PUBLIC_IP=example.openvidu.io
```

### 2) Let's Encrypt certificate

This scenario is meant for you if you want to:

- Deploy OpenVidu for production or even developing purposes. 
- Deploy OpenVidu with a Fully Qualified Domain Name (FQDN).
- Use a valid SSL certificate.

For this specific scenario you will need to:

#### 2.1) Register a FQDN pointing to your public

This depends of the DNS register you want to use. You need to create a DNS register of **type A pointing to the Elastic IP created before**. Let's suppose that our domain is: **example.openvidu.io**.

#### 2.2) Edit `/opt/openvidu/.env` 

To make our deployment works with a **Let's encrypt** certificate, you just need to edit the file in `/opt/openvidu/.env` and fill the next variables:


```
DOMAIN_OR_PUBLIC_IP=example.openvidu.io

CERTIFICATE_TYPE=letsencrypt

OPENVIDU_SECRET=<YOUR_SECRET>

LETSENCRYPT_EMAIL=youremail@youremail.com
```

Only these variables are needed to make it works. The rest of the variables in the `/opt/openvidu/.env` are referred to [OpenVidu Configuration parameters](reference-docs/openvidu-config/).

You must define the `LETSENCRYPT_EMAIL` where you want to register the domain and receive Let's Encrypt notifications

### 3) Custom Certificate (Commercial CA)

This scenario is meant for you if you want to:

- Deploy OpenVidu for production. 
- Deploy OpenVidu with a Fully Qualified Domain Name (FQDN).
- Use a valid SSL certificate from a **Commercial CA**.

To use this kind of certificate, you need to generate two files, `certificate.cert` (public keys of the certificate) and `certificate.key` (private key) and copy them into the `/opt/openvidu/owncert` directory.

#### 3.1) Register a FQDN pointing to your public

This depends of the DNS register you want to use. You need to create a DNS register of **type A pointing to the Elastic IP created before**. Let's suppose that our domain is: **example.openvidu.io**.

#### 3.2) Generate certificates files

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

#### 3.3) Copy `certificate.key` and `certificate.cert`
Now that you have both certificate files, you need to copy the `certificate.key` and the `certificate.cert` into `/opt/openvidu/owncert`

The directory should look like this:

```
/opt/openvidu/owncert
├── certificate.cert
└── certificate.key
```

#### 3.4) Edit `/opt/openvidu/.env` 

To make our deployment works with a **Custom Certificate (Commercial CA)** certificate, you just need to edit the file in `/opt/openvidu/.env` and fill the next variables:

```
DOMAIN_OR_PUBLIC_IP=example.openvidu.io

OPENVIDU_SECRET=<YOUR_SECRET>

CERTIFICATE_TYPE=owncert
```

Only these variables are needed to start OpenVidu. The rest of the variables in the `/opt/openvidu/.env` are referred to [OpenVidu Configuration parameters](reference-docs/openvidu-config/). 

The variable `LETSENCRYPT_EMAIL` should be empty for this kind of certificate.


## Common problems

- [Letsencrypt is not working. What can I do?.](troubleshooting/#14-deployment-with-lets-encrypt-is-not-working)
- [Do I need to update Let's Encrypt certificates?](troubleshooting/#15-do-i-need-to-update-lets-encrypt-certificates) 
- [My commercial certificate is not working, What can I do?](troubleshooting/#16-my-commercial-certificate-is-not-working-what-can-i-do)

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
