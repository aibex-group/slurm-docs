# Testing GPU Support with PyTorch

The Slurm cluster contains various different GPUs. In order to run a job on a GPU node, you can specify which kind of
node should be used for the job with the `--gres=<kind>:<count>` option for either `srun` or `sbatch`.

All machine with GPUs are in the partition `GPU` to ensure that they will not be used for non-GPU tasks by accident,
which means you need to specficy `--partition=GPU` to request them.

For example using one L40S with 48GB of VRAM it would be:

```
srun --partition=GPU --gres=gpu:l40s:1 <command>
```

> [!IMPORTANT]
> For any Machine Learning experiment, **always** specify the exact GPU to use, as you should maximise the GPU usage,
> i.e. choose the largest possible batch size that fits into the available VRAM, which changes based on the GPU you
> request.

## Example with PyTorch

This example shows how to test the availability of a GPU with a simple PyTorch script. The following four variants are
shown here:

- **uv (project)** \
  Creating a project where the dependencies are managed by uv with a script that is meant to run from
  within the virtual environment of the project, which is automatically created and used by uv. \
  _This it the recommended approach for a Machine Learning project_.
- **uv (self-contained script)** \
  A self-contained script which defines the dependencies as with inline metadata, as specified by
  [PEP 723 – Inline script metadata][pep-script]. The dependencies are automatically installed in its
  isolated virtual environment by uv, meaning it is a single script file that can be run directly with uv. \
  _This is the quickest and easiest way to test the GPU support_.
- **conda**\
  Using conda to create a new virtual environment and installing the dependencies.
- **pip (venv)**\
  Using the system-wide installed pip to install dependencies but creating a virtual environment with
  the `venv` module from Python's standard library.

> [!TIP]
> Choose the variant that suits your environment best. If you do not have a preference, use **uv (project)** as this is
> how you can start any Machine Learning project and build on top of it.

:::tabs key:env
== uv (project)

1. Create a new directory for the project.

```sh
mkdir test-gpu
cd test-gpu
```

2. Initialise the project with uv.

```sh
uv init
```

3. Install PyTorch as a dependency.

```sh
uv add torch
```

4. Replace the content of `main.py` with the following snippet:

<<< @/snippets/test-gpu.py{python:line-numbers} [main.py]

_The file `main.py` script was created by `uv init`, but you could use any other file._

5. Run `main.py` _on the login node_ to test that the script works.

```
$ uv run main.py
PyTorch version: 2.8.0+cu128
CUDA available: False
```

Since there is no GPU on the login node, it shows that CUDA is not available.

6. Submit a job with `srun` to execute `main.py` on the GPU node.

```
$ srun --partition=GPU --gres=gpu:l40s:1 --pty uv run main.py
PyTorch version: 2.8.0+cu128
CUDA available: True
CUDA version: 12.8
bfloat16 supported: True
Avilable GPUs (1):
    (GPU 0) NVIDIA L40S - Memory: 44.40GB
```

When it's run on the GPU node, PyTorch has access to the corresponding GPU.

== uv (self-contained script)

1. Create the script `test-gpu.py` with the following code:

<<< @/snippets/test-gpu-script.py{python:line-numbers} [test-gpu.py]

2. Run `test-gpu.py` _on the login node_ to test that the script works.

```
$ uv run test-gpu.py
PyTorch version: 2.8.0+cu128
CUDA available: False
```

Since there is no GPU on the login node, it shows that CUDA is not available.

3. Submit a job with `srun` to execute `test-gpu.py` on the GPU node.

```
$
$ srun --partition=GPU --gres=gpu:l40s:1 --pty uv run test-gpu.py
PyTorch version: 2.8.0+cu128
CUDA available: True
CUDA version: 12.8
Avilable GPUs (1):
    (GPU 0) NVIDIA L40S - Memory: 44.40GB
```

When it's run on the GPU node, PyTorch has access to the corresponding GPU.

== conda

1. Create a new directory for the project.

```sh
mkdir test-gpu
cd test-gpu
```

2. Create and activate a new conda environment

```sh
conda create --name test-gpu
cond activate test-gpu
```

3. Install PyTorch as a dependency.

```sh
pip install torch
```

4. Create the script `main.py` with the following code:

<<< @/snippets/test-gpu.py{python:line-numbers} [main.py]

5. Run `main.py` _on the login node_ to test that the script works.

```
$ python main.py
PyTorch version: 2.8.0+cu128
CUDA available: False
```

Since there is no GPU on the login node, it shows that CUDA is not available.

6. Submit a job with `srun` to execute `main.py` on the GPU node.

```
$ srun --partition=GPU --gres=gpu:l40s:1 --pty python main.py

PyTorch version: 2.8.0+cu128
CUDA available: True
CUDA version: 12.8
Avilable GPUs (1):
    (GPU 0) NVIDIA L40S - Memory: 44.40GB
```

When it's run on the GPU node, PyTorch has access to the corresponding GPU.

== pip (venv)

1. Create a new directory for the project.

```sh
mkdir test-gpu
cd test-gpu
```

2. Create and activate a new virtual environment with `venv`

```sh
python -m venv .venv
source .venv/bin/activate
```

3. Install PyTorch as a dependency.

```sh
pip install torch
```

4. Create the script `main.py` with the following code:

<<< @/snippets/test-gpu.py{python:line-numbers} [main.py]

5. Run `main.py` _on the login node_ to test that the script works.

```
$ python main.py
PyTorch version: 2.8.0+cu128
CUDA available: False
```

Since there is no GPU on the login node, it shows that CUDA is not available.

6. Submit a job with `srun` to execute `main.py` on the GPU node.

```
$ srun --partition=GPU --gres=gpu:l40s:1 --pty python main.py
PyTorch version: 2.8.0+cu128
CUDA available: True
CUDA version: 12.8
Avilable GPUs (1):
    (GPU 0) NVIDIA L40S - Memory: 44.40GB
```

When it's run on the GPU node, PyTorch has access to the corresponding GPU.

:::

[pep-script]: https://peps.python.org/pep-0723/
