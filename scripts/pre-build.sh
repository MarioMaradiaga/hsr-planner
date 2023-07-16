#!/bin/bash
set -o allexport
source .env.local
set +o allexport

FILE=src/data/tier-list.json
echo $TIER_LIST_URL
if [ -f "$FILE" ]; then
  MAXAGE=$(bc <<< '24*60*60') # 24 hours in seconds
  FILEAGE=$(($(date +%s) - $(date -r "$FILE" +%s)))
  test $FILEAGE -lt $MAXAGE && {
    echo "$FILE is less than 24 hours old."
  } || {
    curl "$TIER_LIST_URL" --output "$FILE"
  }
fi

FILE=src/data/hoyolab.json
echo $HOYOLAB_DATA_URL
if [ -f "$FILE" ]; then
  MAXAGE=$(bc <<< '24*60*60') # 24 hours in seconds
  FILEAGE=$(($(date +%s) - $(date -r "$FILE" +%s)))
  test $FILEAGE -lt $MAXAGE && {
    echo "$FILE is less than 24 hours old."
  } || {
    curl --output "$FILE" \
      -H "accept-language: en-GB,en-US;q=0.9,en;q=0.8" \
      -H "accept: application/json, text/plain, */*" \
      -H "ds: $HOYOLAB_DS" \
      -H "cookie: ltoken=$HOYOLAB_TOKEN; ltuid=$HOYOLAB_ACCOUNT_ID;" \
      -H "x-rpc-app_version: 1.5.0" \
      -H "x-rpc-client_type: 5" \
      -H "x-rpc-language: en-us" 
  }
fi 

