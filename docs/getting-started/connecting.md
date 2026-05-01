> [!IMPORTANT]
> You need to request access to the _Faith Cluster_ to get an account for it.
>
> Details are given on the official documentation
> [Faith HPC Cluster - Subscription & Account Creation](https://moodle.unifr.ch/course/section.php?id=458779).

# Connecting to the Cluster

To operate on the cluster, you will always connect to the _login node_ over SSH. This will be your work environment
where you set up everything you need to prepare a job, such as cloning a repository, modifying code, preparing data,
etc. Every job is then launched from the login node, therefore it is important that you are able to connect to the login
node and be familiar how to operate over SSH.

## SSH Connection

The SSH connection must be established to the address `diufrd200.unifr.ch` where you authenticate with your Linux
username.

1. Open a terminal.
2. Run the command below, replacing `<USER>` with your DIUF Linux username.

```
ssh <USER>@diufrd200.unifr.ch
```

3. At the prompt, enter the password for your DIUF Linux user.

## Create an Alias in your SSH Config

You can add an alias to your SSH config to avoid having to remember the address or type it out in full.

:::tabs key:os
== Linux / macOS

- If the directory `~/.ssh` does not exist, create it.
- Open the config file `~/.ssh/config`.
- Paste the following (replacing `<USER>` with your DIUF Linux user):

```ssh-config
Host slurm
  HostName diufrd200.unifr.ch
  User <USER>
  Port 22
  ForwardAgent yes
```

== Windows

> [!NOTE]
> If you are using a custom SSH client, such as PuTTY, you will have to open their respective configs.

- If the directory `C:\Users\<username>\.ssh` does not exist, create it.
- Open the config file `C:\Users\<username>\.ssh\config`.
- Paste the following (replacing `<USER>` with your DIUF Linux user):

```ssh-config
Host slurm
  HostName diufrd200.unifr.ch
  User <USER>
  Port 22
  ForwardAgent yes
```

:::

With this configuration, to connect to the Slurm login node you can use `slurm` instead of having to specify the user
and the address:

```
ssh slurm
```

This still prompts you for your password to authenticate. If you want to avoid that, you can use SSH keys instead. See
[Setting up SSH Keys](/getting-started/ssh-keys).

> [!TIP]
> Setting `ForwardAgent yes` allows you to use your local SSH keys on the remote server when connected rather than
> having to create a separate one to use for services such as GitLab.
