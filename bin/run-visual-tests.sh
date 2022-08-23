#!/usr/bin/env sh

if [ "$CI" = true ]; then
  echo "Running in CI"
  yarn test:visual:internal "${1}"
else
  echo "Running locally"
  if which docker >/dev/null; then
    CID_FILE="/tmp/gitlab_ui_storyshots_$(date +%s).cid"
    PUPPETEER_VERSION="15.5.0"

    docker build -f Dockerfile.puppeteer . -t gitlab-ui-puppeteer &&
      docker build -f Dockerfile.storyshots . -t gitlab-ui-storyshots &&
      docker run \
        --cidfile $CID_FILE \
        -v "$(pwd)/tests":/tests gitlab-ui-storyshots \
        yarn test:visual:internal "${1}"

    echo "Cleaning up..."
    docker rm $(cat $CID_FILE)
    rm $CID_FILE
  else
    echo "Docker must be installed to run this script.\nhttps://www.docker.com/"
    exit 1
  fi
fi
