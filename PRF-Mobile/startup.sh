#!/bin/bash

chmod -R 777 .
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
npm install --save @ionic-native/geolocation
ionic cordova plugin add cordova-plugin-advanced-http
npm install --save @ionic-native/http
exit