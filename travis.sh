#!/bin/bash
if [ $TRAVIS_TAG ]; then
  gulp testKarma;
fi
