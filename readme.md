# Autoversion [![Build Status](https://travis-ci.com/YOUR-GITHUB-USERNAME/unicorn-fun.svg?branch=master)](https://travis-ci.com/YOUR-GITHUB-USERNAME/unicorn-fun)

> Display Version on your websites using github releases / commits 

## Getting started

## Install

```
$ npm install autoversion-git
```

## Usage - Require (Node)

```js
const autoversion = require('autoversion-git');

let owner = 'getredash'
let repo = 'redash'
let shaOrBranch = 'master'
// Create version based on latest release
const version = autoversion.getReleaseVersion(owner, repo, shaOrBranch);

// Create version based on number of getCommitVersion
let digits = 3
const version = autoversion.getCommitVersion(owner, repo, shaOrBranch, digits);
```

## Usage - VueJS/React 

```js
import {getCommitVersion, getReleaseVersion} from 'autoversion';

let owner = 'getredash'
let repo = 'redash'
let shaOrBranch = 'master'
// Create version based on latest release
const version = autoversion.getReleaseVersion(owner, repo, shaOrBranch);

// Create version based on number of getCommitVersion
let digits = 3
const version = autoversion.getCommitVersion(owner, repo, shaOrBranch, digits);
```


## API

### getReleaseVersion(owner, repo)

#### owner

Type: `string`

Owner of the github repository

#### repo

Type: `string`

Repository Name


### getCommitVersion(owner, repo, shaOrBranch, digits)

#### owner

Type: `string`

Owner of the github repository

#### repo

Type: `string`

Repository Name

#### shaOrBranch

Type: `string`

The option can take either sha - `6351cf255a30d166376737e831dea2cb4a1c39f9` or branch - `master`

#### digits

Type: `int`
Default: `3`

The number of digits to show
ex: 1234 commits and digits=3 => returns 1.2.3
