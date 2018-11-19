# @36node/swagen

[![version][0]][1] [![downloads][2]][3]

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

Usage: sdk [options] [yamlFile] [name] [dist]

Generate code for client sdk

Options:
  -h, --help  output usage information


# example, default name is filename of yaml file or specified by name option
$ swagen sdk ./petstore.yaml ./sdk petstore
```

### Generate koa server api code

```sh
$ swagen koa -h

Usage: koa [options] [yamlFile] [dist]

Generate code for koa server api

Options:
  -h, --help  output usage information


# example, if dist not specified, current dir will be used as default dist
$ swagen koa ./petstore.yaml ./koa
```

### Generate postman collection from openapi

```sh
$ swagen postman -h

Usage: postman [options] [yamlFile] [targetFile]

Transform openapi file to postman collection file

Options:
  -h, --help  output usage information

# example, default targetFile name is the openapi info title properity
$ swagen postman ./petstore.yaml ./petstore.postman_collection.json

# will generate petstore.postman_collection.json in pwd
# then can use fastman to import collection to postman

$ fastman import ./petstore.postman_collection.json
```

### Use remote file

```sh
# set name with 'petstore'
swagen sdk https://api.36node.com/petstore/v0/openapi.yaml . petstore
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/a-new-command`
3. Commit your changes: `git commit -am 'Add a new command'`
4. Push to the branch: `git push origin feature/a-new-command`
5. Submit a pull request :D

## Add new template

1. Add new generator js file in src/generators, filename is the template name.
2. In new generator js file， export default function which generate template.

## Author

**template-cli** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/template-cli/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node) · Twitter [@y](https://twitter.com/y)

[0]: https://img.shields.io/npm/v/@36node/swagen.svg?style=flat
[1]: https://npmjs.com/package/@36node/swagen
[2]: https://img.shields.io/npm/dm/@36node/swagen.svg?style=flat
[3]: https://npmjs.com/package/@36node/swagen
