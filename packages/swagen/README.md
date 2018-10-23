# module

[![NPM version](https://img.shields.io/npm/v/@36node/template-cli.svg?style=flat)](https://npmjs.com/package/@36node/template-cli)
[![NPM downloads](https://img.shields.io/npm/dm/@36node/template-cli.svg?style=flat)](https://npmjs.com/package/@36node/template-cli)
[![CircleCI](https://circleci.com/gh/36node/template-cli/tree/master.svg?style=shield)](https://circleci.com/gh/36node/template-cli/tree/master)
[![codecov](https://codecov.io/gh/36node/template-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/36node/template-cli)
[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/36node/donate)

## Install

```bash
yarn global add @36node/template-cli
```

## Usage

```sh
$ swagen -h

Usage: swagen [options] [command]

Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  koa [options]      Generate code for koa server api
  sdk [options]      Generate code for client sdk
  postman [options]  Transform openapi file to postman collection file
```

### Generate client sdk code

```sh
$ swagen sdk -h

Usage: sdk [options]

Generate code for client sdk

Options:
  -s, --swagger <file>   swagger file path or url
  -f, --folder [folder]  generate code to folder
  -n, --named [named]    what name
  -h, --help             output usage information


# example, default name is filename of yaml file or specified by --name
$ swagen sdk -s ./petstore.yaml -n petstore
```

### Generate koa server api code

```sh
$ swagen koa -h

Generate code for koa server api

Options:
  -s, --swagger <file>   swagger file path or url
  -f, --folder [folder]  generate code to folder
  -h, --help             output usage information

# example
$ swagen koa -s ./petstore.yaml
```

### Generate post collection from openapi

```sh
$ swagen postman -h

Usage: postman [options]

Transform openapi file to postman collection file

Options:
  -s, --swagger <file>   swagger file path or url
  -f, --folder [folder]  generate code to folder
  -n, --named [named]    what name
  -h, --help             output usage information

# example
$ swagen postman -s ./petstore.yaml

# will generate petstore.postman_collection.json in pwd
# then can use fastman to import collection to postman

$ fastman import ./petstore.postman_collection.json
```

### Use remote file

```sh
# set name with 'petstore'
swagen sdk -s https://api.36node.com/petstore/v0/openapi.yaml -n petstore
```

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Add new template

1. Add new generator js file in src/generators, filename is the template name.
2. In new generator js file， export default function which generate template.

## Author

**template-cli** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/template-cli/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node) · Twitter [@y](https://twitter.com/y)
