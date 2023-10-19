<h2 id="section-title">Upgrading OpenVidu CE deployment</h2>
<hr>

- **[Upgrading OpenVidu CE deployment (AWS Cloudformation)](#upgrading-openvidu-ce-deployment-aws-cloudformations)**
- **[Upgrading OpenVidu CE deployment (On premises)](#upgrading-openvidu-ce-deployment-on-premises)**

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 10px 0 0 0;
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
      Be careful when upgrading your version of OpenVidu:
      <ul>
        <li style="color: inherit">Never upgrade across <strong>multiple major versions</strong>: to upgrade from 2.13.0 to 2.15.0, you must first go through 2.14.0.</li>
        <li style="color: inherit">Read carefully the <a href="releases/"><strong>Release Notes</strong></a> of any new version you plan to upgrade. Sometimes there are <strong>breaking changes</strong> that will require you to update your application.</li>
      </ul>
</div>
</div>

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 10px 0 10px 0;
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
      <strong>Instructions below are only suitable for OpenVidu CE >= 2.13.0</strong>. Unfortunately upgrading OpenVidu CE to 2.13.0 from any past version will require you to completely wipe out your past version, as the installation procedure has completely changed to a Docker deployment. If you are going to install 2.13.0 in the same machine, make sure to backup any data you want to keep (basically the recordings folder) and uninstall all of OpenVidu services before installing 2.13.0.
</div>
</div>

---

## Upgrading OpenVidu CE deployment (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend to update by deploying a brandly new [OpenVidu Cloudformation template](deployment/ce/aws/#3-option-specify-template-amazon-s3-url-with-the-following-url){target: "_blank"}** corresponding to the version you want to update.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:
- Deploy the OpenVidu Cloudformation template of the version you want to deploy.
- If you have recordings, move the recording at `/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.

However, if you don't want to deploy a new Cloudformation, you can follow the [next section](#upgrading-openvidu-ce-deployment-on-premises) with instructions to upgrade OpenVidu CE _On premises_ deployments if you wish, but you should know that the upgrading process may have some breaking changes if something in the Cloudformation template has changed between versions.

## Upgrading OpenVidu CE deployment (On premises)

Connect to the server hosting OpenVidu CE through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`. From this point, instructions will assume the installation path of OpenVidu CE is `/opt/openvidu`.

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with the following command. Change the desired version in the URL: instead of <code>install_openvidu_<strong>VERSION</strong>.sh</code> use for example <code>install_openvidu_<strong>2.29.0</strong>.sh</code>

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_VERSION.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version VERSION
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu VERSION services.

2. The previous file '.env' remains intact, but a new file '.env-VERSION' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-VERSION'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-VERSION'.

3. If you were using Openvidu Call application, it has been automatically updated in file
'docker-compose.override.yml'. However, if you were using your own application, a file called
'docker-compose.override.yml-VERSION' has been created with the latest version of Openvidu Call.
If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.28.0'

For further information, check readme.md
```
<br>

#### Some notes on upgrading OpenVidu CE

- The upgrade process will restart all OpenVidu services. That means that **all ongoing sessions will be destroyed**.
- Persistent data is preserved when upgrading. This means that all of your recordings will be available in the new version.
- Old Docker images will take up valuable disk space of your machine. If you don't plan to reuse them again, delete them to reclaim your GBs. [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"} command is very useful for doing so.
- Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to [Releases](releases/) page.
- In case you have **mobile applications**: the previous minor version of openvidu-browser is always compatible with the next minor version of openvidu-server. This way you can upgrade your openvidu-server while giving your clients time to update their applications. Applications using the previous and the new version of openvidu-browser can coexist in the new openvidu-server version. For example, if you upgrade openvidu-server to 2.16.0, it will work fine with applications using both openvidu-browser 2.15.0 and 2.16.0. Of course, you must notify your users to update their applications until all of them are using openvidu-browser 2.16.0.

<br><br>

<script src="js/copy-btn.js"></script>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/brands.css" integrity="sha384-Px1uYmw7+bCkOsNAiAV5nxGKJ0Ixn5nChyW8lCK1Li1ic9nbO5pC/iXaq27X5ENt" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/fontawesome.css" integrity="sha384-BzCy2fixOYd0HObpx3GMefNqdbA7Qjcc91RgYeDjrHTIEXqiF00jKvgQG0+zY/7I" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="css/downloads/slick-1.6.0.css"/>
<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
<script type="text/javascript" src="js/downloads/slick-1.6.0.min.js"></script>

<script>
    $('.slick-captions').slick({
      asNavFor: '.upgrade-cf-steps',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.upgrade-cf-steps').slick({
      asNavFor: '.slick-captions',
      autoplay: false,
      arrows: true,
      prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      infinite: false,
      dots: true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      },
    ]
    });
</script>
