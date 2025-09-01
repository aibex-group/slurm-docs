# Interactive Jobs with `srun`

`srun [options] command` lets you run any command you like on the cluster. For example, the following will launch a job
that runs the command `hostname`, which will print out the host name of node it is running on:

```
$ srun hostname
diufrd201
```

In this case, it was assigned to the node `diufrd201` (this will change based on the node your job is assigned to).

> [!IMPORTANT]
> Running `srun` will block the terminal, once you close the terminal the process will be killed, just like with any
> other terminal. This includes getting disconnected from the SSH sessions to the login node. It is your responsibility
> to handle long running processes, just like with any regular SSH connections.

## Multiple Commands

Only a single command is accepted by `srun`. If you want to run multiple commands you need to run it as a script.

Create a script `example.sh` with the following content:

::: code-group

```sh:line-numbers [example.sh]
#!/usr/bin/env bash

echo "Hostname: $(hostname)"
echo "Current directory: $(pwd)"
```

:::

Running the script would look like this:

```
$ srun bash example.sh
Hostname: diufrd201
Current directory: /HOME/<user>
```

> [!NOTE]
> If you need to quickly run a series of commands without wanting to create a script for it, you may also use
> `bash -c "command1 && command2"`. A script is generally more flexible, sometimes it is a single line that uses pipes
> or redirects, in which case it would a nuisance having to create a script for this.

## Interactive Widgets that require a TTY

Some interactive widgets require a TTY to work properly (e.g. progress bars). Even though `srun` prints to your
terminal, as seen in the examples above, interactive terminal features, such as prompting the user or special terminal
control sequences, require a TTY to be available.

As the compute node does not have access to your physical terminal, it needs to be simulated with a pseudo terminal
(PTY). To achieve this, `srun` accepts a `--pty` flag.

For example, when using `read` in bash, the user is asked for an input if TTY is available, otherwise it does nothing.
Try adding the following lines to `example.sh`:

::: code-group

```sh:line-numbers [example.sh]
#!/usr/bin/env bash

echo "Hostname: $(hostname)"
echo "Current directory: $(pwd)"

read -p "2 + 2 = " answer # [!code focus:2]
echo "Your answer: ${answer}"
```

:::

If you run it with `srun --pty` you will be prompted for the answer, otherwise it is skipped entirely.

:::tabs
== srun --pty

```
$ srun --pty bash example.sh
Hostname: diufrd201
Current directory: /home/net/<user>
2 + 2 = 4
Your answer: 4
```

== srun

```
$ srun bash example.sh
Hostname: diufrd201
Current directory: /home/net/<user>
Your answer:
```

:::

Many applications will handle cases without a TTY, but some of them will give you an error. In any case, you should be
aware of this and make sure to run it with the `--pty` flag if you have an interactivity in your code.
