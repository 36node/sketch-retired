# @36node/fastman
[![version][0]][1] [![downloads][2]][3]

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

[0]: https://img.shields.io/npm/v/@36node/fastman.svg?style=flat
[1]: https://npmjs.com/package/@36node/fastman
[2]: https://img.shields.io/npm/dm/@36node/fastman.svg?style=flat
[3]: https://npmjs.com/package/@36node/fastman
