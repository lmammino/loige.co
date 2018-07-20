---
uuid: 5ad52a4d-18d6-4add-b97b-841aa66187aa
layout: post
title: Backup your server with Dropbox
slug: backup-your-server-with-dropbox
subtitle: null
date: 2014-01-17T03:44:19.000Z
updated: 2014-04-05T16:21:17.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: null
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - backup
  - dropbox
  - server
path: /backup-your-server-with-dropbox
---

In my early days as *CTO* at [Sbaam](http://sbaam.com) I had to setup a web server from the ground up. As it happens in many startups the work had to be done quickly and with an *almost-0-budget*, so it left no space to sophysticated solutions for recurring tasks such as **backup**. I always have been a web developer and focused on coding so, I admit I had really a poor knowledge about how  to setup a remote unix virtual machine.

So, speaking about backups, I needed a solution that would be cost-effective, easy to install and easy to mantain at the same time. I would have loved it if it can be as simple as sharing a [Dropbox](https://db.tt/ref37L7) folder. As this thought crossed my mind I wondered if there was some way to interact with dropbox from a script to create files and folders and started googling about it. Luckily Dropbox offers a good command line client that allows to bring your synced files and folders also on graphic-less machines.

Ultimately my solution was to install the Dropbox command line on the server using a dedicated Dropbox account and backup files by simply copying/linking them on the Dropbox folder. This way I prepared and scheduled a script that simply had to copy the files I wanted to backup on the dropbox folder. Then I have the files backupped in the cloud and automatically synced on my local machine. Furthermore i had chance to share the backup folder with all my collaborators.

This solution works very well for small projects so I will resume  all the steps I followed to install and use dropbox this way. I used an *ubuntu* machine so I suppose the following steps should work on debian machines.

### 1. Prepare the dropbox user
I preferred to have a dedicated user to handle the whole Dropbox daemon and folder so just create it now:

    sudo useradd -d /dropbox -m dropbox

It will have the directory `/dropbox` as home and the name `dropbox`. You can change these values if you like.

Then you have to set the password for the new user:

    sudo passwd dropbox
    
Choose whatever password you like.

**Security concern:** If you have ssh access enabled (obviously it is) it's better to disable the ssh access for the new user. So edit the file `/etc/ssh/sshd_config` and add the rule `DenyUsers dropbox`, the restart ssh with `sudo service ssh restart`.

### 2. Install the dropbox client

First of all you need to switch to the user created in the previous step, so the Dropbox installer will create the Dropbox folder under its home. At the end you will have `/dropbox/Dropbox` as the synced folder:

    su dropbox
    
(enter the password for the user dropbox)

Now you're the *dropbox* user. Be sure to switch to your user folder with `cd ~` and let's download and install the daemon.

    wget -O dropbox.tar.gz "http://www.dropbox.com/download/?plat=lnx.x86"
    
for 32bit or

    wget -O dropbox.tar.gz "http://www.dropbox.com/download/?plat=lnx.x86_64"

for 64bit.

Extract it:

    tar -xvzf dropbox.tar.gz
    
It will extract to the `~/.dropbox-dist.` folder. Now run the client:

    ~/.dropbox-dist/dropbox
    
You will see an output like the following:

> This client is not linked to any account...
> Please visit {SOME_URL} to link this machine. [...]

Copy and paste the provided URL in the browser bar of your local machine and it will ask you to enter the password of your dropbox account. This way it is able to authenticate your command line client and start syncing your files. At this point it should have been started its work but our shell is still locked by the client. We need to kill and daemonize it to being able to manage it as a service. Press `CTRL+C` and get back to your user with the `exit` command.

### 3. Dropbox as a service

At this point we need to define dropbox as a service. So let's create an *etc init script*. Download [my gist](https://gist.github.com/lmammino/8467336)

    wget -O dropbox_init_script "https://gist.github.com/lmammino/8467336/raw/dropbox"
    
and move it in the init folder:

    sudo mv dropbox_init_script /etc/init.d/dropbox
   
Make it executable:

    sudo chmod +x /etc/init.d/dropbox
   
And set it to load at startup:

    sudo update-rc.d dropbox defaults
    
Now it's a service! Run:

    sudo /etc/init.d/dropbox start
    
to start it and feel free to use common service command such as `stop`, `restart` and `status`.

### 4. Enjoy

At this point you have all your dropbox data in the `/dropbox/Dropbox` folder. Feel free to copy all the files you want in there or to schedule jobs that does all the dirty work for you. You can also create symlinks into the dropbox folder to keep files and folders placed in other locations synced.

**Security concerns**: consider that your dropbox folder acts as a normal dropbox folder so it's synced both ways. If someone breaks into your dropbox account (or the account of some collaborator who shares the folder with you) he can use dropbox as an hole to inject malicious files into your server or steal sensible data. So, for example, avoid to have scheduled scripts and unencrypted sensible data in that folder.

### 5. Bonus

Dropbox released the [Dropbox CLI](https://www.dropbox.com/download?dl=packages/dropbox.py), a python command line application that you can use to perform some useful task such as *Selective Sync*, disable the *LAN sync* or retrive public links of your files. I suggest to download it by using the dropbox user and place it under `/dropbox/bin`. So you can simply switch to the dropbox user (again with `su dropbox`), download it and make it executable:

    mkdir ~/bin
    wget -O ~/bin/dropbox.py "https://www.dropbox.com/download?dl=packages/dropbox.py"
    chmod +x ~/bin/dropbox.py
    
At this point you can run the Dropbox CLI. For example if you want to disable the LAN sync (heavily suggested in this case) you can simply do:

    /dropbox/bin/dropbox.py lansync n

---

That's all.
It was a long read but I hope it has been useful ;)


