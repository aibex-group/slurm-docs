# Recommended Configs

The following configurations are the recommended options to use based on the desired GPU. These primarily set the
other resources, such as CPU and RAM, proportional to the number of GPUs. For example, if there are 4 GPUs on
a machine, each GPU receives a quarter of the available CPUs and RAM.

Whenever possible the `--*-per-gpu` are used, which means that no matter how many GPUs you request, the resources will
be scaled accordingly.

:::: details RTX 3080 Ti --- 12GB

**Available GPUs: 6**
<small style="margin-left: 3em">Nodes: `diufrd202` (8)</small>

:::tabs key:kind

== CLI (single-line)

```bash
--partition=GPU --gres=gpu:gtx3080:1 --cpus-per-gpu 42 --mem-per-gpu 85000
```

== CLI (multi-line)

```bash
--partition=GPU \
--gres=gpu:gtx3080:1 \
--cpus-per-gpu 42 \
--mem-per-gpu 85000
```

== #SBATCH

```bash
#SBATCH --partition=GPU
#SBATCH --gres=gpu:gtx3080:1
#SBATCH --cpus-per-gpu 42
#SBATCH --mem-per-gpu 85000
```

:::

::::

:::: details V100 --- 32GB

**Available GPUs: 8**
<small style="margin-left: 3em">Nodes: `diufrd204` (8)</small>

:::tabs key:kind

== CLI (single-line)

```bash
--partition=GPU --gres=gpu:v100:1 --cpus-per-gpu 8 --mem-per-gpu 96000
```

== CLI (multi-line)

```bash
--partition=GPU \
--gres=gpu:v100:1 \
--cpus-per-gpu 8 \
--mem-per-gpu 96000
```

== #SBATCH

```bash
#SBATCH --partition=GPU
#SBATCH --gres=gpu:v100:1
#SBATCH --cpus-per-gpu 8
#SBATCH --mem-per-gpu 96000
```

:::

::::

:::: details L40S --- 48GB

**Available GPUs: 4**
<small style="margin-left: 3em">Nodes: `diufrd203` (4)</small>

:::tabs key:kind

== CLI (single-line)

```bash
--partition=GPU --gres=gpu:l40s:1 --cpus-per-gpu 32 --mem-per-gpu 386000
```

== CLI (multi-line)

```bash
--partition=GPU \
--gres=gpu:l40s:1 \
--cpus-per-gpu 32 \
--mem-per-gpu 386000
```

== #SBATCH

```bash
#SBATCH --partition=GPU
#SBATCH --gres=gpu:l40s:1
#SBATCH --cpus-per-gpu 32
#SBATCH --mem-per-gpu 386000
```

:::

::::

:::: details RTX 6000 --- 96GB

**Available GPUs: 18**
<small style="margin-left: 3em">Nodes: `diufrd205` (8) · `diufrd206` (2) · `diufrd207` (8)</small>

:::tabs key:kind

== CLI (single-line)

```bash
--partition=GPU --gres=gpu:rtx6000:1 --cpus-per-gpu 48 --mem-per-gpu 290000
```

== CLI (multi-line)

```bash
--partition=GPU \
--gres=gpu:rtx6000:1 \
--cpus-per-gpu 48 \
--mem-per-gpu 290000
```

== #SBATCH

```bash
#SBATCH --partition=GPU
#SBATCH --gres=gpu:rtx6000:1
#SBATCH --cpus-per-gpu 48
#SBATCH --mem-per-gpu 290000
```

:::

::::
