# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "torch",
# ]
# ///

import torch

print(f"PyTorch version: {torch.__version__}")
has_cuda = torch.cuda.is_available()
print(f"CUDA available: {has_cuda}")

if has_cuda:
    num_gpus = torch.cuda.device_count()
    print(f"CUDA version: {torch.version.cuda}")
    print(f"Avilable GPUs ({num_gpus}):")
    for i in range(num_gpus):
        props = torch.cuda.get_device_properties(i)
        memory = props.total_memory / 1024**3
        print(f"    (GPU {i}) {props.name} - Memory: {memory:.2f}GB")
