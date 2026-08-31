# vLLM Server with OpenAI Client

The OpenAI REST API has become the standard to communicate with an LLM provider. Many local LLM inference libraries,
including [vLLM][vllm] and [Llama.cpp][llama-cpp], also provide an OpenAI-compatible server, which allows using the same client for local and
remote LLMs.

In this guide, an OpenAI-compatible server is run with [vLLM][vllm] as a job on Slurm and the requests
are then made with the [OpenAI Python library][openai-python] on the same node.

## Why use a specialised inference server?

These specialised servers have many optimisations to accelerate the inference of LLMs, which can speed up the whole
process dramatically. The downside of them is that the start-up time is considerably longer, due to some optimisations
taking, especially related to CUDA graphs.

Additionally, when experimenting with prompts, the overhead of loading an LLM even without any optimisations becomes
a pain point due to the large number of parameters that need to be loaded from disk. Hence, it makes sense to start
a server that loads the model once and then send requests to iterate quickly.

## Setup

> [!NOTE]
> You need to have [uv][uv] installed, as described in [Docs - Installing uv][uv-install].

1. Create a new directory for the project.

```sh
mkdir vllm-example
cd vllm-example
```

2. Initialise the project with uv.

```sh
uv init
```

3. Install vLLM and the OpenAI client.

```sh
uv add vllm openai
```

## Starting the vLLM server

> [!IMPORTANT]
> The server will be started with an interactive Slurm job, i.e. with `srun` instead of `sbatch`, because it runs
> indefinitely until it is cancelled.
>
> If you decide to run it in the background with `sbatch`, make sure to stop it with `scancel` once you are done and
> also set a time limit to avoid occupying unnecessary resources if you forget to stop it manually.
>
> This guide uses a time limit of 8 hours (`--time=08:00:00`) just in case.

This example uses [Qwen/Qwen3.5-4B][qwen3.5-4b] and will be run on the L40S GPU.

The vLLM Python package comes with a CLI, which you can access by running `uv run vllm`, specifically the `vllm serve`
command is used to start the server from the command line.

```sh
srun --partition=GPU --job-name=vllm-example --time=08:00:00 --gres=gpu:l40s:1 --cpus-per-gpu 32 --mem-per-gpu 375000 --pty uv run vllm serve Qwen/Qwen3.5-4B --max-model-len 262144
```

> [!NOTE]
> A known issue, in particular for the RTX 6000, is caused by flashinfer. If you see the error:
>
> ```
> RuntimeError: FlashInfer requires GPUs with sm75 or higher
> ```
>
> you can disable flashinfer with the environment variable `VLLM_USE_FLASHINFER_SAMPLER=0`.
>
> Just put it in front of the `srun` command:
>
> ```
> VLLM_USE_FLASHINFER_SAMPLER=0 srun [...]
> ```

Wait until the server is fully started up, which can take several minutes since it optimises the model (e.g. CUDA
graphs).
You can tell that the server is ready when the following messages appear:

```
(APIServer pid=1001890) INFO:     Started server process [1001890]
(APIServer pid=1001890) INFO:     Waiting for application startup.
(APIServer pid=1001890) INFO:     Application startup complete.
```

## Sending requests with the OpenAI client

### Create the script to run the request

The following snippet is a minimal script to use the OpenAI client in Python.

Save it in a file `request.py`.

The `request-image.py` snippet shows how to include an image in the input (the primary changes are highlighted).

::: code-group

<<< @/snippets/openai-client-minimal.py{python:line-numbers} [request.py]

<<< @/snippets/openai-client-image.py{24-27,34-39 python:line-numbers} [request-image.py]

:::

### Identify the job ID of the vLLM server

In order to send a request to the vLLM server, you need to execute it in the same job, for which you need the Job ID.

```sh
squeue --me
```

Copy the _JOBID_ from the job that started the vLLM server.

### Run the request script

Running `srun --jobid=<JOBID> --overlap` executes a command inside the same Job as the `<JOBID>`.

Replace `<JOBID>` with the ID identified in the previous step and run the `request.py` script.

```sh
srun --partition=GPU --jobid=<JOBID> --overlap --pty uv run request.py
```

## Stop the vLLM server

Once you are done with your experiments and you no longer need to make requests, stop the vLLM server, either with <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal you started the server or by using `scancel <JOBID>`.

[llama-cpp]: https://github.com/ggml-org/llama.cpp
[openai-python]: https://github.com/openai/openai-python
[qwen3.5-4b]: https://huggingface.co/Qwen/Qwen3.5-4B
[uv]: https://github.com/astral-sh/uv
[uv-install]: https://docs.astral.sh/uv/getting-started/installation/
[vllm]: https://docs.vllm.ai/
