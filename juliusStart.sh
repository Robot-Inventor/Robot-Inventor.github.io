#!/bin/sh

export ALSADEV="plughw:1,0"
julius -C /home/pi/julius-4.5/julius-kit/dictation-kit-v4.3.1-linux/main.jconf -C /home/pi/julius-4.5/julius-kit/dictation-kit-v4.3.1-linux/am-gmm.jconf -module > /dev/null