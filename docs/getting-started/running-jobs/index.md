---
next:
  text: Interactive Jobs with srun
  link: /getting-started/running-jobs/srun
---

# Running Jobs

There are two possible commands to run a job, `srun` and `sbatch`. They serve different purposes and may even be
combined, where `srun` is mostly for _interactive_ jobs, whereas `sbatch` is only for submitting tasks that are run in
the background.

The following two pages walk you through how to use each of them:

- [Interactive Jobs with srun](./srun): Shows how to run interactive jobs that require terminal features such as user
  input (prompt) or terminal control sequences (e.g. for progress bars).
- [Background Jobs with sbatch](./sbatch): Run jobs in the background where the output will be saved to a file.
