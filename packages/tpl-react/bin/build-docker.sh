#!/bin/sh

TAG=$1
DOCKER_USER=$2
DOCKER_PASS=$3
DOCKER_REGISTRY=$4
DOCKER_REPO=$5

if ([ -z $TAG ]); then
  echo "env TAG is missing";
  exit 1;
fi

if ([ -z $DOCKER_USER ]); then
  echo "env DOCKER_USER is missing";
  exit 1;
fi

if ([ -z $DOCKER_PASS ]); then
  echo "env DOCKER_PASS is missing";
  exit 1;
fi

if ([ -z $DOCKER_REGISTRY ]); then
  echo "env DOCKER_REGISTRY is missing";
  exit 1;
fi

echo "Starting build image with tag ${TAG}"
unset CI
NODE_ENV=production yarn run build
docker login -u $DOCKER_USER -p $DOCKER_PASS $DOCKER_REGISTRY
docker build --build-arg APP_VERSION=${TAG} -t $DOCKER_REPO:$TAG .
docker push $DOCKER_REPO:$TAG
