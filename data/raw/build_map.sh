#!/bin/bash -x
# Build svg map from shape files using kartograph
# See more at: http://kartograph.org
# author: ruckuus@gmail.com 

KARTOGRAPH_BIN=`which kartograph`

[ "x$KARTOGRAPH_BIN" == "x" ] && echo "You haven't installed kartograph. Get kartograph from kartograph.org" && exit -99

JSON=`pwd`'/indonesia.json'
SVGMAP=`pwd`'/indonesia.svg'

$KARTOGRAPH_BIN $JSON -o $SVGMAP
