#!/bin/bash

gpu="0000:01:00.0"
aud="0000:01:00.1"
gpu_vd="$(cat /sys/bus/pci/devices/$gpu/vendor) $(cat /sys/bus/pci/devices/$gpu/device)"
aud_vd="$(cat /sys/bus/pci/devices/$aud/vendor) $(cat /sys/bus/pci/devices/$aud/device)"

function bind_vfio {
  lsof /dev/nvidia* | awk '{print $2}' | xargs -I {} kill {}
  sleep 0.1
  # rmmod nvidia_uvm nvidia_modeset nvidia nvidia-drm
  echo "$gpu" | tee "/sys/bus/pci/devices/$gpu/driver/unbind"
  echo "$aud" | tee "/sys/bus/pci/devices/$aud/driver/unbind"
  echo "$gpu_vd" | tee /sys/bus/pci/drivers/vfio-pci/new_id
  echo "$aud_vd" | tee /sys/bus/pci/drivers/vfio-pci/new_id
}
 
function unbind_vfio {
  echo "$gpu_vd" | tee "/sys/bus/pci/drivers/vfio-pci/remove_id"
  echo "$aud_vd" | tee "/sys/bus/pci/drivers/vfio-pci/remove_id"
  echo 1 | tee "/sys/bus/pci/devices/$gpu/remove"
  echo 1 | tee "/sys/bus/pci/devices/$aud/remove"
  echo 1 | tee "/sys/bus/pci/rescan"
}

# bind_vfio
# echo "0000:01:00.0" | tee "/sys/bus/pci/devices/0000:01:00.0/driver/unbind"
if [ -f ~/.cache/nvidia-status ]; then 
    if grep -q "enabled" ~/.cache/nvidia-status; then 
        unbind_vfio
    else 
        bind_vfio
    fi
fi
