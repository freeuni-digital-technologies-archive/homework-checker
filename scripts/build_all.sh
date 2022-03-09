#!/usr/bin/env bash
mkdir -p ../data
# requires package.json workspaces to be listed in dependency order
node ./scripts/getList.js | xargs -I {} sh -c "cd {} && yarn build"