#!/usr/bin/env bash

git config --local core.hooksPath .githooks/
# აქ ასევე გადმოვა geckodriver და სხვა გარე dependency-ების შემოწმება/გადმოწერა
ls
./scripts/build_all.sh