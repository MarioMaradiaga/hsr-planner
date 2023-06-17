#!/bin/bash
FILE=src/data/tier-list.json

set -o allexport
source .env.local
set +o allexport

echo $TIER_LIST_URL

if [ -f "$FILE" ]; then
  MAXAGE=$(bc <<< '24*60*60') # 24 hours in seconds
  FILEAGE=$(($(date +%s) - $(date -r "$FILE" +%s)))
  test $FILEAGE -lt $MAXAGE && {
    echo "$FILE is less than 24 hours old."
    exit 0;
  } 
fi 
    
echo "fetching"

curl "$TIER_LIST_URL" --output "$FILE"
