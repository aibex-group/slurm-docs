# Monitoring Jobs

## List Jobs with `squeue`

To list all jobs that are queued or running, you can use the `squeue` command.

```
$ squeue

JOBID PARTITION      NAME      USER  ST  TIME  NODES  NODELIST(REASON)
 2106       GPU  test-job    jungom   R  0:04      1         diufrd203

```

The column `ST` shows the status of your job, which can be one of the following:

- **R**: Running
- **PD**: Pending
- **CG**: Completing

If you would like to only see your own jobs, add the `--me` flag:

```
squeue --me
```

Use the `JOBID` of your job for any commands that should be applied to it.

## More Detailed View

The output can of squeue can be customised to include more details and adjust the column length, which are otherwise
truncated, see [Slurm Workload Manager - squeue](https://slurm.schedmd.com/squeue.html#OPT_format) for available fields.

The following command shows a more detailed view of the default output:

```sh
squeue -O "JobID:10,Name:60,UserName:12,QOS:12,TimeUsed:12,TimeLeft:14,NumCPUs:8,tres-per-node:30,Partition:10,ReasonList:20,State:8"
```

## Cancel Jobs with `scancel`

If you decide that you want to cancel any of your jobs, you can use `scancel <JOBID>` with the job ID that you
identified as shown in [List Jobs with `squeue`](#list-jobs-with-squeue).

```
scancel 2106
```

## Running a Command on the Job Node

> [!TIP]
> Use this with [`nvtop`](https://github.com/Syllo/nvtop) to monitor the GPU utilisation.

It might be helpful to run a specific command on the node of the job to get specific information about state of the node
the job is running one. Most notably, utilities like `nvtop` allow you to monitor the hardware usage in order to ensure
that everything runs correctly and to maximise the available resources.

This can be achieved by using `srun --jobid=<JOBID>` with the job ID that you identified as shown in
[List Jobs with `squeue`](#list-jobs-with-squeue). It is tied the underlying job, therefore once the original job
finishes, this will also automatically be terminated.

```
srun --jobid=<JOBID> --overlap --pty nvtop
```
