#!/usr/bin/env bash

# header
echo "X, Y, Name, Yule, Murray, Ramusio, Pelliot, Haw, Modern, Notes, Type, Identification"

# convert xls to csv including the links, put plain Modern as first column
npx xlsx-cli -z "$1" > dump.json 2>/dev/null &&
jq -r --unbuffered '.Sheets["marco-toponyms"]["!data"][] | {
  name: ("\"" + .[5].v + "\","),
  links: map(
    "\"" + if .l.Target then
      .v + ": " + .l.Target
    else
      .v
    end + "\","
  )
} | flatten | join("")' dump.json | sed '1d' | while read line
do
  # find the same row in GIS export and add the data from above
  name="$(echo "$line" | cut -d, -f 1 | tr -d \")"
  if [ -n "$name" ]; then
    coords="$(grep "$name$" marco-gis.csv | cut -d, -f 1,2 | head -n 1)"
    [ -n "$coords" ] && echo "$coords","$line" || echo >&2 "$name not found in GIS file"
  fi
  unset name
  unset coords
done
rm -f dump.json
