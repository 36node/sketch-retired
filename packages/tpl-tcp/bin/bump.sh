#!/bin/bash

set -e

BRANCH=${CIRCLE_BRANCH:=master}

{
  git describe --tags --exact-match > /dev/null 2>&1 && {
    echo "Release is already associated to a tag. Skipping..."
    exit 0
  }
} || {
  echo "Running new release on $BRANCH"
  npm run release && {
    git push --follow-tags origin $BRANCH
  } || {
    echo "Release aborted as $BRANCH was updated during build."
  }
}

exit 0