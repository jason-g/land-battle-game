#!/bin/bash

WORKDIR=`pwd`
CORDOVADIR=/tmp/cordova
npm install
bower install

cd js/lib/crafty; npm install; grunt; cd $WORKDIR

cordova create --link-to=$WORKDIR /tmp/cordova com.jroid.landwar LandWar; 

cd $CORDOVADIR; cordova platform add android; cd $WORKDIR 
mv $CORDOVADIR $WORKDIR


