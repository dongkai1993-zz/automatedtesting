#!/bin/bash
if [ $TRAVIS_TAG ]; then
  grunt sauce:unit;
fi
