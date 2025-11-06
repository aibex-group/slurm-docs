# Setting up your Environment

On Slurm, your home directory (`~/`, absolute path: `/HOME/<USER>`) is shared across all nodes of the cluster,
including the login node. This means, that anything you set up on the login node, can be used seamlessly for any jobs
you want to run.

The login node is in essence your development environment, therefore that's where you set up everything, such as cloning
a repository, downloading your data, modifying the code, etc. before submitting it for a job to be run on a more
powerful node.

Any tools you would like to use, can be installed here. Since you do not have admin rights (no `sudo`), you will have to
install everything for your current user, instead of system-wide. If you do need system-wide installations, you should
use Docker images for that.

## Python

When using Python, it is a perfectly reasonable decision to use a Docker image for the jobs, however if you want to do
any development on the login node itself or run some scripts to prepare your data, you still need to have a working
Python environment. It is generally recommended to have virtual environments so that the dependencies across projects do
not clash.

> [!TIP]
> It is highly recommend to use [uv][uv] for any project that uses Python, as it handles the dependencies for you,
> including automatically activating a virtual environment and downloading the desired Python version, and is generally
> much faster.
>
> If you need a system-wide Python or additional non-Python dependencies that are hosted on conda-forge, there is still
> value to have conda installed.

:::tabs key:py
== uv (recommended)

[uv][uv] is a package/project manager for Python that is meant to bring a Cargo-style workflow from Rust to Python. This
includes managing the dependencies with a lockfile to ensure that all builds are reproducible.

While all of this was possible with virtual environments and specific tools, they always needed to be managed manually.
uv will automatically create a virtual environment for the project (in `.venv/`) and can then be used to run any Python
script in this environment without needing to manually activate the environment (but you can still do this if you'd like
to have everything available for your whole system).

### Installing uv

It is recommended to install uv with a standalone installer, as described in the [Docs - Installing uv][uv-install],
using the following command:

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Updating uv

If you used the standalone installer, uv can update itself:

```sh
uv self update
```

== conda

Conda remains a popular solution to install Python and some dependencies, especially if you would otherwise need to
install system-wide dependencies (e.g. specific versions of CUDA).

[Miniforge][miniforge] is the recommended installer for conda, which uses [conda-forge][conda-forge], the community
driven, non-commercial, replacement for anaconda.

### Installing Miniforge

```sh
# Download the Miniforge installer
curl -LO "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-$$(uname)-$$(uname -m).sh"

# Run the installer (follow the instructions)
bash Miniforge3-$$(uname)-$$(uname -m).sh

# Optional: Delete the install script
rm Miniforge3-$$(uname)-$$(uname -m).sh
```

:::

## HuggingFace Cache

> [!WARNING]
>
> There is currently no scratch partition or designated shared directories, therefore this section does not work and you
> **_MUST NOT_** set these variables.

HuggingFace is widely used to download models and datasets. As a lot of people will use the same models, it would be
unnecessary for each of them to download, particularly since the LLMs are quite large and use a lot of disk space. For
this reason, a shared cache is used across all users, which is located in `/scratch/cache/huggingface/`.
You need to make sure that any HuggingFace tool (e.g. transformers) uses the shared cache rather than he default
`~/.cache/huggingface/`.

For this you need to set the following environment variables:

```sh
export HF_HUB_CACHE=/scratch/cache/huggingface/hub
export HF_XET_CACHE=/scratch/cache/huggingface/hub
export HF_ASSETS_CACHE=/scratch/cache/huggingface/assets
```

> [!TIP]
> Put it into your `~/.bashrc` to make it persistent (i.e. set automatically when you log in). The following will append
> it to your `~/.bashrc`:
>
> ```sh
> echo "export HF_HUB_CACHE=/scratch/cache/huggingface/hub" >> ~/.bashrc
> echo "export HF_XET_CACHE=/scratch/cache/huggingface/xet" >> ~/.bashrc
> echo "export HF_ASSETS_CACHE=/scratch/cache/huggingface/assets" >> ~/.bashrc
> ```

[conda-forge]: https://conda-forge.org/
[miniforge]: https://github.com/conda-forge/miniforge
[uv]: https://github.com/astral-sh/uv
[uv-install]: https://docs.astral.sh/uv/getting-started/installation/
