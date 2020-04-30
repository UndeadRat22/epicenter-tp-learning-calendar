#!/bin/bash

sudo BROWSER=none NODE_ENV=production BABEL_ENV=production PORT=80 DEBUG=false CDN_URL=http://sasyska.lt:3200/ node server.js
