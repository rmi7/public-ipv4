#!/usr/bin/env bash

#################################
# usage: ./example.bash 8.8.8.8 #
#################################

# if ip valid, ping it, otherwise show date
# this is just for demonstrating the use of return code,
# invalid ip is error return code (1)
# valid ip is success return code (0)
public-ipv4 --verify "$1" > /dev/null \
    && echo "$1" | xargs ping -nc 1 \
    || date
