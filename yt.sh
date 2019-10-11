#!/bin/bash

list=list.txt

# read first entry
yt=$(head -n 1 $list)

if [ ${#yt} -eq 0 ]; then
  url="https://www.youtube.com/watch?v=QH2-TGUlwu4"
else
  url="https://www.youtube.com/watch?v=${yt}"
fi

xdg-open $url

# remove first entry
sed -i -n '1d' $list
