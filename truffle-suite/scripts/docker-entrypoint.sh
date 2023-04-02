#!/bin/bash

set -em

# Files created by Elasticsearch should always be group writable too
umask 0002
# npm install

exec /usr/local/bin/default-docker-entrypoint.sh "$@"