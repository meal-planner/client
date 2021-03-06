# Meal Planner Client 
[![Build Status](https://travis-ci.org/meal-planner/client.svg?branch=master)](https://travis-ci.org/meal-planner/client)
[![Code Climate](https://codeclimate.com/github/meal-planner/client/badges/gpa.svg)](https://codeclimate.com/github/meal-planner/client)
[![Codacy Badge](https://api.codacy.com/project/badge/02fb63e9d2e848a7b0263b6af19e4881)](https://www.codacy.com/app/anatoliy-yastreb/client)
[![Dependency Status](https://gemnasium.com/badges/github.com/meal-planner/client.svg)](https://gemnasium.com/github.com/meal-planner/client)
[![Join the chat at https://gitter.im/meal-planner/public](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/meal-planner/public?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Meal Planner is an open source recipe recommendation and nutrition balancing service.

Alpha version is hosted at https://meal-planner.org/

This repository contains client app implementation.
It is a Single Page Application (SPA) built with [AngularJS](https://github.com/angular/angular.js) and [Angular Material](https://github.com/angular/material)

## Requirements
This application requires NodeJS and Bower for development.

Install development dependencies:

  ```
  npm install
  ```

Install fronted dependencies:
  ```
  bower install
  ```

Run client app locally:
  ```
  grunt serve
  ```

Run tests:
  ```
  grunt test
  ```

## Deployment

This client application is completely static and hosted at GitHub Pages.

`grunt deploy` is used to deploy latest master to https://app.meal-planner.org
 It builds the app with `grunt build` and pushes the changes to `gh-pages` branch automatically.
