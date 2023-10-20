#!/bin/bash

# Check if a file path is provided
if [ $# -eq 0 ]
then
  echo "No file path provided. Usage: ./script.sh <filepath>"
  exit 1
fi

# The file to process
file="$1"

# Temporary file for intermediate processing
tempFile="temp.html"

# Counter for the incremental ids
counter=1

# Read the file line by line
while IFS= read -r line
do
  # Check if the line contains the pattern
  if echo "$line" | grep -q 'id="code-' 
  then
    # Replace the pattern with the incremental id
    line=$(echo "$line" | sed "s/id=\"code-[^\"']*/id=\"code-$counter/")
    counter=$((counter+1))
  fi
  if echo "$line" | grep -q 'id="btn-copy-' 
  then
    # Replace the pattern with the incremental id
    line=$(echo "$line" | sed "s/id=\"btn-copy-[^\"']*/id=\"btn-copy-$((counter-1))/")
  fi
  # Write the line to the temporary file
  echo "$line" >> "$tempFile"
done < "$file"

# Replace the original file with the temporary file
mv "$tempFile" "$file"