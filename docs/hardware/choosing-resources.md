# Choosing Resources

You can find an overview of all available resources in [Available Nodes](./nodes.md). Depending on the job you want to run, you may choose a specific type of GPU, that satisfies the requirements for your specific task. For example, if you want to run a model that requires more than 40GB of VRAM, you would choose a GPU that has more than 40GB, such as the L40S with 48GB. Then you specify that GPU with the `--gres=gpu:l40s_48gb:1` option to either `srun` or `sbatch`.

Also note that you always have to specify the GPU partition when working with GPU cards:

```
srun --partition=GPU --gres=gpu:l40s_48gb:1 <command>
```

For any Machine Learning experiment, **always** specify the exact GPU to use, as you should maximise the GPU usage, i.e.
choose the largest possible batch size that fits into the available VRAM, which changes based on the GPU you request.

It is also recommended to specify the type of GPU, in this case `l40s_48gb`, and not the exact node (e.g. diufrd203), as
there might be multiple nodes with the same GPU and it should not matter which of them you get.

## Syntax

The syntax for the resources is: `--gres=gpu:<gpu-id>:<count>`, where the `<gpu-id>` is the slurm specifier of that GPU
and the `<count>` specifies how many GPUs you need. This is only relevant for nodes that have more than one GPU per
node.

The `<count>` cannot exceed the maximum number of GPUs per node. Therefore it is mostly useful to request fewer GPUs for
nodes with multiple GPUs. For example, if your script does not implement multi-GPU support, you should request a single
GPU rather than all of them, so that someone else could use the other GPUs on that node for another job.

> [!NOTE]
> If you use a subset of GPUs, also specify the other resources, such as CPUs and RAM, in proportion to the ratio of
> GPUs used, such that all GPUs get an equal amount of resources.
>
> See below for more details.

## Managing Multi-GPU Nodes

Whenever you choose a single GPU from a multi-GPU node, e.g. `--gres=gpu:l40s_48gb:1`, you should always specify the
same proportions of the other resources. This can be achieved with the `--mem` and `--cpus-per-task` to request the desired partition of the RAM and CPUs respectively.
It can also be configured per GPU with `--mem-per-gpu` and `--cpus-per-gpu`, respectively, which makes it easier to use
when changing the number of GPUs, as it automatically scales it up.

For example, the machine with the L40S contains 4 GPus, therefore for a single L40S in you should request a quarter of
the CPUs (32) and a quarter of the available RAM (375GB).

```sh
srun --partition=GPU --gres=gpu:l40s_48gb:1 --mem-per-gpu 375000 --cpus-per-gpu 32 <command>
```

`--cpus-per-task` defines how many CPUs you want for the job you run, whereas `--cpus-per-gpu` would specify how many
CPUs you need per GPU. If you run a single job with a single GPU, both of them are equivalent.

## Identifying Available Resources

> [!IMPORTANT]
> Currently, the allocated memory does not seem to be shown correctly, and the GPUs all have the same label, just `gpu`.
>
> It is expected to change, and every time `gpu:l40s_48gb` is mentioned, you will have to use `gpu` instead and specify
> the `--nodelist=diufrd203` option instead.

In cases where you are not required to use a specific GPU and want to use any free node, such that the job can be run
immediately, you should identify which nodes are free and request the given GPU accordingly.

You should still choose a specific GPU in order to optimise your batch size and other parameters for that specific GPU.

To identify the available and occupied resources, you can use the following command:

```sh
sinfo -NO "CPUs:8,CPUsState:16,AllocMem:10,Memory:10,Gres:30,GresUsed:40,NodeList:30"
```

An example output is shown below:

```
CPUS    CPUS(A/I/O/T)   ALLOCMEM  MEMORY    GRES                          GRES_USED                               NODELIST
2       0/2/0/2         0         1         (null)                        gpu:0,mps:0                             diufrd200
250     0/250/0/250     0         1         (null)                        gpu:0,mps:0                             diufrd201
256     44/212/0/256    0         515737    gpu:6,mps:198                 gpu:2,mps:(null):0(0/33,0/33,0/33,0/33,0diufrd202
128     0/128/0/128     0         1547841   gpu:4,mps:100                 gpu:0,mps:(null):0(0/25,0/25,0/25,0/25) diufrd203
64      14/50/0/64      0         772659    gpu:8,mps:96                  gpu:4,mps:(null):0(0/12,0/12,0/12,0/12,0diufrd204
```

Here you can see that the last node (diufrd204) with the `v100_32gb:8` GPUs, has allocated 14 CPUs out of the 64 and uses 4 out of 8 GPUs (the column `GRES_USED` shows `gpu:v100_32gb:4`).

> [!INFO]
> The letters In `CPUS(A/I/O/T)` stand for:
>
> - **A (Allocated)**: How many CPUs are already allocated.
> - **I (Idle)**: How many CPUs are still available.
> - **O (Other)**: Any unforeseen state, usually they are down (e.g. if all are in _Other_, the node is down).
> - **T (Total)**: Total number of CPUs.
