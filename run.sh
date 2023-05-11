#!/bin/bash
if [ $# -ne 1 ]
then
    echo "Usage: "
    echo "./run.sh 0 - list"
    echo "./run.sh 1 - start"
    echo "./run.sh 2 - stop"
    echo "./run.sh 3 - reload"
    echo "./run.sh 4 - delete"
    echo "./run.sh 5 - log"
    echo "./run.sh 6 - monitor"
    exit
fi

if [ $1 -eq 0 ]
then
    pm2 list
fi

if [ $1 -eq 1 ]
then
    pm2 start "npm start" --name "prodfrontend"
fi

if [ $1 -eq 2 ]
then
    pm2 stop prodfrontend
fi

if [ $1 -eq 3 ]
then
    pm2 reload prodfrontend
fi

if [ $1 -eq 4 ]
then
    pm2 delete prodfrontend
fi

if [ $1 -eq 5 ]
then
    pm2 log prodfrontend
fi

if [ $1 -eq 6 ]
then
    pm2 monit
fi

