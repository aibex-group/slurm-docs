# Available Nodes

There are currently two partitions, _CPU_ and _GPU_, which separates the GPUs such that the GPU nodes are not
accidentally used by a job that does not require a GPU.

Since there are many big nodes, which contain multiple GPUs, it is expected that you request individual GPUs in most
cases. Keep the other resources, such as CPUs and RAM, proportional to the ratio of GPUs used. This is explained in more
detail in [Choosing Resources - Managing Multi-GPU Nodes](./choosing-resources.md#managing-multi-gpu-nodes).

## CPU Partition

Accessible with `--partition=CPU` (default).

| Node ID   | CPU           | #CPU | RAM |
| --------- | ------------- | ---: | --: |
| diufrd201 | AMD Epyc 7763 |  256 | 1TB |

## GPU Partition

Accessible with `--partition=GPU`.

| Node ID   | CPU                        | #CPU |   RAM | GPU                                          | #GPU | VRAM |
| --------- | -------------------------- | ---: | ----: | -------------------------------------------- | ---: | ---: |
| diufrd202 | AMD Epyc 7742              |  256 | 512GB | NVIDIA GeForce RTX 3080 Ti                   |    6 | 12GB |
| diufrd203 | AMD Epyc 9554              |  128 | 1.5TB | NVIDIA L40S                                  |    4 | 48GB |
| diufrd204 | Intel(R) Xeon(R) Gold 6142 |   64 | 768GB | NVIDIA Tesla V100 SXM2 32GB                  |    8 | 32GB |
| diufrd205 | AMD EPYC 9654              |  384 | 2.3TB | NVIDIA RTX PRO 6000 Blackwell Server Edition |    8 | 96GB |
| diufrd206 | AMD EPYC 9654              |  384 | 2.3TB | NVIDIA RTX PRO 6000 Blackwell Server Edition |    2 | 96GB |
| diufrd207 | AMD EPYC 9654              |  384 | 2.3TB | NVIDIA RTX PRO 6000 Blackwell Server Edition |    8 | 96GB |
