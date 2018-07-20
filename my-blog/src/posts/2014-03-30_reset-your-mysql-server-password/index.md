---
uuid: 1e2cce9d-4250-415d-b752-8755ca204bdf
layout: post
title: Reset your MySql server password
slug: reset-your-mysql-server-password
subtitle: null
date: 2014-03-30T09:07:56.000Z
updated: 2014-03-30T09:20:07.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: null
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - security
  - mysql
  - server
path: /reset-your-mysql-server-password
---

Few days ago I learned an interesting trick that allows you to reset the password on a MySql server. This trick is pretty useful in case you have lost (or you haven't ever had) the password of your MySql root user.

You just need to throw some commands at the console. Note that I am assuming you are using Ubuntu or some other Debian derivate. Otherwise the commands may change a bit (but not to much I believe).

![Reset your MySql server password](./password_reset.jpg)

#### 1. Stop the mysql daemon

```bash
sudo /etc/init.d/mysql stopRun
```

#### 2. Disable the security checks

```bash
mysqld_safe --skip-grant-tables &
```

The [mysqld_safe](http://dev.mysql.com/doc/refman/5.0/en/mysqld-safe.html) command will essentially restarts your MySql server but with the option `--skip-grant-tables` it also disables the grant tables used for authentication. You might think that this way the MySql server will deny every access attempt, but it will do the very contrary: it will allow any!
That's in fact where the trick lies: this way we are able to login to MySql as root (even if we don't know the password) and edit the MySql users table to reset the root user password.

Yeah, I didn't think this was possible before discovering it. But it is, and, even if it feels "insecure", it might be useful in cases like this.

#### 3. Login as root

```bash
mysql -u root -p mysql
```

It will ask you for a password... Yes, you get it! You can enter whatever you want and it will always grant you access as root!
The last argument (`mysql`) specifies you want to access the MySql internal database (where user credentials are stored).

#### 4. Change the root password

You're using the MySql shell now. Just run:

```mysql
update user set password=PASSWORD("NEW-ROOT-PASSWORD") where User="root";
exit;
```

You need to change the `"NEW-ROOT-PASSWORD"` with a password of your choice (obviously).

#### 5. Restart MySql

You're back in your bash shell:

```bash
sudo service mysql restart
```

This will restart the MySql server and will enable the security checks again.

So that's all! You can now login into your MySql server with the new password! And try to not lose it again, at least for a while ;)
