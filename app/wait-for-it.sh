#!/bin/sh

host="$1"
shift

until nc -z ${host%:*} ${host#*:}; do
  echo "Waiting for database..."
  sleep 2
done

exec "$@"
