# Background Jobs with `sbatch`

`sbatch [options] script` runs a script as a background job. As opposed to `srun`, it only accepts a script, not any
arbitrary command. Therefore, even if you only want to run a single command, you still need to create a script (or use
Heredoc strings). The primary reason for this, is that it will be run at any time in the background without being tied
to your terminal, which also means that it does not support any interactivity.

Using the `example.sh` from [Interactive Job with `srun`](./srun#interactive-widgets-that-require-a-tty), illustrates
that the interactive part will not work.

::: code-group

```sh:line-numbers [example.sh]
#!/usr/bin/env bash

echo "Hostname: $(hostname)"
echo "Current directory: $(pwd)"

read -p "2 + 2 = " answer
echo "Your answer: ${answer}"
```

:::

Since the job is run in the background, there will be no output shown on the terminal. Instead, all the output will be
written to a file. By default, both stdout and stderr will be redirected to the file `slurm-%j.out` in the current
directory, where `%j` is replaced with the job ID. This can be changed with the `-o` / `--output` option. It is
recommended to use meaningful names for these files, so that you know immediately what you were running.

```
$ sbatch --output output/example-%j.out example.sh
```

> [!TIP]
> Including the job ID (`%j`) in the output file is still helpful, even for clearly defined names, particularly if you
> expect to run it multiple times due to inevitable errors.

After the job finished, `output/example-<job-id>.out` should now contain the following lines:

::: code-group

```[output/example-job-id.out]
Hostname: diufrd201
Current directory: /home/net/<user>
Your answer:
```

:::

## #SBATCH Directives

There is really no difference whether you run the script with `sbatch` or `srun` (besides the interactivity, including
the input/output). However, the scripts run with `sbatch` support a special `#SBATCH` directive, which is a special
comment that allows you to specify options that you would normally pass to the `sbath` command.

For example, the `--output` option that was given above, can be put directly at the top of `example.sh`:

::: code-group

```sh:line-numbers{2} [example.sh]
#!/usr/bin/env bash
#SBATCH --output output/example-%j.out

echo "Hostname: $(hostname)"
echo "Current directory: $(pwd)"

read -p "2 + 2 = " answer
echo "Your answer: ${answer}"
```

:::

The special comments must be at the top of the file and start exactly with `#SBATCH`, followed by any option you would
use at the command line.

Then you can run it with:

```
sbatch example.sh
```

> [!NOTE]
> This is purely for convenience to avoid having to specify the options by hand (or with an additional script wrapping
> the `sbatch` or `srun` commands).
