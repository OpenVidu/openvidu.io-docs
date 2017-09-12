<h2 id="section-title">Using your own certificate</h2>
<hr>

For a JAR binary of OpenVidu Server
------------------

You will need a Java keystore (**.jks**). Check [Get JKS from CRT and KEY](#get-jks-from-crt-and-key) section to see how to get it from your certificate's files.
In order to use your JKS, just set the following values for these properties on launch:

- `server.ssl.key-store`
- `server.ssl.key-store-password`
- `server.ssl.key-alias`

<br>

##### Example

```console
java -jar -Dserver.ssl.key-store=PATH/TO/YOUR/KEYSTORE.jks -Dserver.ssl.key-store-password=YOUR_KEYSTORE_PASSWORD -Dserver.ssl.key-alias=YOUR_KEYSTORE_ALIAS openvidu-server.jar
```

----------

For the Docker container of OpenVidu Server
------------------

You will need a Java keystore (**.jks**). Check [Get JKS from CRT and KEY](#get-jks-from-crt-and-key) section to see how to get it from your certificate's files.
In order to use your JKS, just set the following values for these properties on launch:

- `server.ssl.key-store`
- `server.ssl.key-store-password`
- `server.ssl.key-alias`

You must also indicate the _volume_ flag (-v) to mount your keystore file, letting know Docker the location of the file and that it should be only readable:

- `-v /ABSOLUTE/PATH/TO/YOUR/KEYSTORE.jks:/ABSOLUTE/PATH/TO/YOUR/KEYSTORE.jks:ro`

<br>

##### Example

```console
docker run -d -p 8443:8443 --rm -v /ABSOLUTE/PATH/TO/YOUR/KEYSTORE.jks:/ABSOLUTE/PATH/TO/YOUR/KEYSTORE.jks:ro -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e openvidu.secret=YOUR_SECRET -e server.ssl.key-store=/ABSOLUTE/PATH/TO/YOUR/KEYSTORE.jks -e server.ssl.key-store-password=YOUR_KEYSTORE_PASSWORD -e server.ssl.key-alias=YOUR_KEYSTORE_ALIAS openvidu/openvidu-server-kms
```

----------

For the CloudFormation of OpenVidu Server
------------------

First of all, remember we provide a super simple way of using a **FREE**, **AUTOMATIC** and 100% **VALID** certificate thanks to Let's Encrypt technology: when deploying your CloudFormation Stack, just fill in the form fields with the values from the column **[LET'S ENCRYPT CERTIFICATE](/deployment/deploying-aws#4-complete-the-configuration-fields)**.

If, however, you have already purchased your own certificate and you are determined to use it, you can easily add it to your CloudFormation stack. Just fill in the form fields with the values from the column **[CUSTOM CERTIFICATE](/deployment/deploying-aws#4-complete-the-configuration-fields)**.

----------

Get JKS from CRT and KEY
------------------

OpenVidu Server is a Java application and therefore needs a Java keystore (.jks) for providing security certificates. If you don't have it, you can easily obtain a **.jks** file from your certificate (**.crt**) and private key (**.key**) files by using **_openssl_** and **_keytool_** :

```console
openssl pkcs12 -export -name YOUR_CERT_NAME -in YOUR_CRT.crt -inkey YOUR_PRIVATE_KEY.key -out p12keystore.p12
```

```console
keytool -importkeystore -destkeystore YOUR_KEYSTORE_NAME.jks -srckeystore p12keystore.p12 -srcstoretype pkcs12 -alias YOUR_JKS_ALIAS
```