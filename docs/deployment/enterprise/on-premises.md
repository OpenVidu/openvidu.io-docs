<h2 id="section-title">Deploying OpenVidu Enterprise on premises</h2>
<hr>

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 10px 0;
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
<strong>NOTE</strong>: OpenVidu Enterprise is free while in BETA! Check <a href="openvidu-enterprise/" target="_blank">OpenVidu Enterprise</a> for more information. When the beta period officially ends, <strong>you will no longer be able to use your OpenVidu Enterprise cluster</strong>. We will notify through all our official channels before suspending the beta, which will result in the automatic shutdown of any OpenVidu Enterprise cluster running. A final release version of OpenVidu Enterprise edition will replace this beta version.
</div>
</div>

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 10px 0;
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
<strong>NOTE</strong>: <strong>High Availability OpenVidu Enterprise is not compatible with on premises deployments.</strong> To deploy a highly available OpenVidu Enterprise check: <a href="deployment/enterprise/aws/#high-availability-deployment" target="_blank">Deploying OpenVidu Enterprise in AWS</a>
</div>
</div>

<br>

# OpenVidu Enterprise on premises

<br>
OpenVidu Enterprise is very easy to enable. While in beta, you just need an **OpenVidu Pro** cluster up and running. If you don't have a previous **OpenVidu Pro** deployment, follow the instructions to [Deploy OpenVidu Pro on premises](deployment/pro/on-premises).

To change from **OpenVidu Pro** to **OpenVidu Enterprise** you just need to:

1. Configure the following property in the **`.env`** file at your Master Node installation path (default to `/opt/openvidu/`)

        OPENVIDU_EDITION=enterprise

2. Restart OpenVidu as usually

        sudo su
        cd /opt/openvidu
        ./openvidu start
