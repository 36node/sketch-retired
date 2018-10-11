# module

[![NPM version](https://img.shields.io/npm/v/@36node/template-cli.svg?style=flat)](https://npmjs.com/package/@36node/template-cli)
[![NPM downloads](https://img.shields.io/npm/dm/@36node/template-cli.svg?style=flat)](https://npmjs.com/package/@36node/template-cli)
[![CircleCI](https://circleci.com/gh/36node/template-cli/tree/master.svg?style=shield)](https://circleci.com/gh/36node/template-cli/tree/master)
[![codecov](https://codecov.io/gh/36node/template-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/36node/template-cli)
[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/36node/donate)

## Install

```bash
yarn global add @36node/fastman
```

## Usage

### 1. config api key

```sh
$ fastman -h
Usage: cli [options] [command]

Options:
  -V, --version         output the version number
  -h, --help            output usage information

Commands:
  config [options]      config fastman, like postman api key eg..
  ls                    list collections exist in postman
  import [file]         import a collection file to postman
  export [name] [dist]  export collection file with name, saved in dist
```

### 1. Config postman apiKey

You can get your key from the [integrations dashboard](https://go.postman.co/integrations/services/pm_pro_api)

```sh
fastman config -a <your-api-key>
```

### 2. ls collections of postman

```sh
# list collections in postman, display id and name
$ fastman ls
190e1e16-7e25-4be8-97e1-2f012f941ce4 collection1
1f768e27-5f39-4a5f-8ce8-7a028e504fcf collection2
2923edc5-f23c-47f9-b5d4-4657676681d2 collection3
```

### 3. export collection of postman to collection file

```sh
# specify dist
$ fastman export collection1 ./try_collection.json

# empty dist, auto saved in <name>.postman_collection.json
$ fastman export collection1
```

### 4. import collection by collection file

```sh
# if collection name existed in postman, update it, or else create new collection.
$ fastman import ./.try_collection.json
```

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**fastman** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/template-cli/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)
