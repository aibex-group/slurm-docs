# Setting up SSH Keys

## Generating an SSH Key

> [!WARNING]
> If you already have an SSH (e.g. `~/.ssh/id_ed25519.pub` exists) **DO NOT** generate a new one, as it will overwrite
> your existing one.

1. Open a terminal.
2. Run the command below, replacing `<DESCRIPTION>` with a meaningful description so you can easily tell which key you
   are using.

```
ssh-keygen -t ed25519 -C "<DESCRIPTION>"
```

3. On the prompt _"Enter file in which to save the key"_, you can press <kbd>Enter</kbd> to accept the default location, or
   change it if you choose to use a custom-named key.
4. Then you will be asked to provide a passphrase to secure the your SSH key. While it might be left empty, it is
   strongly recommended to use a secure passphrase.

> [!TIP]
> Having a unique name for the description that accurately describes the machine it is used on, makes it much simpler to
> manage your SSH keys. For example, if you have a laptop for work, you could call it `laptop-work`. Should anything
> happen to it, you can easily revoke this specific key. See the next section to avoid having to type the passphrase
> each time you use the key.

## Adding your SSH Key to the ssh-agent

`ssh-agent` manages your SSH keys, which allows you to use an SSH key without having to enter the passphrase every time
you use it.

:::tabs key:os
== Linux

1. Start the ssh-agent in the background.

```
eval "$(ssh-agent -s)"
```

2. Add your SSH key to the ssh-agent. \
   If you created your key with a different name, replace `id_ed25519` it with the name you chose.

```
ssh-add ~/.ssh/id_ed25519
```

== macOS

1. Start the ssh-agent in the background.

```
eval "$(ssh-agent -s)"
```

2. You will need to modify your `~/.ssh/config` file to automatically load the keys into the ssh-agent and store the
   passphrase in your keychain. Add the following to the config (replace `id_ed25519` if you chose a different name).

```ssh-config
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

> [!IMPORTANT]
> This applies to **all** hosts, which is usually what you want.

3. Add your SSH key to the ssh-agent. \
   If you created your key with a different name, replace `id_ed25519` with the name you chose.

```
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

== Windows

1. In a Powershell as **Administrator** run the following commands to automatically start the ssh-agent.

```powershell
Get-Service -Name ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
```

2. In a regular terminal (without admin rights), add your SSH key to the ssh-agent. \
   If you created your key with a different name, replace `id_ed25519` it with the name you chose.

```
ssh-add C:\Users\<username>\.ssh\id_ed25519
```

:::

## Registering your SSH Key on Slurm

To be able to authenticate on Slurm with the SSH key you generated, your public key needs to be registered on Slurm.
The utility `ssh-copy-id` handles everything for you. \
If you created your key with a different name, replace `id_ed25519` with the name you chose.

:::tabs key:os
== Linux / macOS

```
ssh-copy-id -i ~/.ssh/id_ed25519.pub slurm
```

== Windows

```
ssh-copy-id -i C:\Users\<username>\.ssh\id_ed25519 slurm
```

:::

If you did not create the alias `slurm`, as described in [Connecting to the Cluster - Create an Alias in your SSH
Config](./connecting#create-an-alias-in-your-ssh-config), replace `slurm` with `<USER>@diufrd200.unifr.ch`
where `<USER>` is your DIUF Linux user.

You need to provide your password to login to Slurm, but once this is done, you should be able to use your SSH key to
connect instead.

> [!INFO]
> The `ssh-copy-id` command copies your public key and adds it to `~/.ssh/authorized_keys` on Slurm. You can modify that
> file manually if you would like check which keys are allowed and also remove any key that should no longer have
> access. Besides copying your public key, it also ensures that the permissions for the `~/.ssh` directory are correct,
> otherwise you would not be allowed to authenticate with an SSH key.

## Testing your SSH Connection

If you connect to Slurm with the same command as before, you should no longer be prompted for your password, as it
should be using your SSH key.

```
ssh slurm
```

If you did not create the alias `slurm`, as described in [Connecting to the Cluster - Create an Alias in your SSH
Config](./connecting#create-an-alias-in-your-ssh-config), replace `slurm` with `<USER>@diufrd200.unifr.ch`
where `<USER>` is your DIUF Linux user.
