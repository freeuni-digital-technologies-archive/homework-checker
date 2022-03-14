#!/usr/bin/env bash
mkdir -p ../data
# requires package.json workspaces to be listed in dependency order
node getList.js | xargs -I {} sh -c "cd {} && yarn build"
sh -c "cd classroom-api && yarn getlist -c \"21f შესავალი ციფრულ ტექნოლოგიებში\""