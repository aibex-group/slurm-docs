> [!INFO]
> This is an _unofficial_ documentation with a focus on Machine Learning for the Aibex group.
>
> The cluster as well as the documentation are still in the _beta_ stage. Expect potential errors and inconsistencies
> with the [official documentation](https://moodle.unifr.ch/course/section.php?id=458779).
>
> For any questions about the cluster please contact [diuf-support@unifr.ch](mailto:diuf-support@unifr.ch).

_Unofficial_ Documentation for the high performance computing (HPC) cluster of DIUF at the UniFR using Slurm.

The cluster includes various compute nodes with GPUs that can be used to run and train Machine Learning models,
including LLMs. These compute nodes are shared with all users of the cluster, but only one user can utilise a specific
node at a time, meaning that you don't need to worry about any interference between users.

In order to maximise utilisation of the compute nodes, Slurm uses a queueing system, where you submit a job, e.g.
a training script, which will then be executed on that node once it is available based on your position in the queue.
