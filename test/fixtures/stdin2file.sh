#!/bin/sh

cd `dirname $0`
cat swagger.json | node ../../bin/sw2dts --output $1
