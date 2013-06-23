## Bolt

[![Build Status](https://travis-ci.org/boltjs/bolt.png)](https://travis-ci.org/boltjs/bolt)

Bolt is a javascript module system, inspired by, but at this
point (intentionally) not compatible with the AMD specification.
Bolt consists of a runtime framework, compiler and testing tools.

The general philosophy is quick, clean and easy.

Bolt is open source under a [BSD style license](https://github.com/boltjs/bolt/blob/master/LICENSE).


## Documentation

* [User Docs](http://boltjs.io)
* [Example](https://github.com/boltjs/bolt/tree/master/demo)


## Getting Bolt

* Latest release: <http://dist.boltjs.io/1.4.0.4/bolt-1.4.0.4.tar.gz>
* Runtime script: <http://dist.boltjs.io/1.4.0.4/bolt.js>
* Karma test adapter: <http://dist.boltjs.io/1.4.0.4/bolt-karma.js>

```shell
cd install-dir
curl http://dist.boltjs.io/1.4.0.4/bolt-1.4.0.4.tar.gz | tar xfz -
sudo ln -s `pwd`/bolt-*/bin/bolt /usr/local/bin/bolt
```

## Dependencies

Bolt relies on node.js v0.8+ which can be obtained from [http://nodejs.org](http://nodejs.org/#download)
or your systems package manager.

If you want to run bolt test with karma, you will also obviously need to install karma: `npm install -g karma`.

## Source

Bolt is arranged into several modules. All modules can be built and tested _very quickly_ with:

```shell
git clone https://github.com/boltjs/bolt.git
cd bolt
make
```

The distribution tar can then be found in gen/dist/bolt-local.tar.gz, or unpacked in
gen/image/bolt-local.

If you want to build the `bolt browser` tool:

```shell
make browser # or, include in distribution with
make browser dist
```

### Development

To push a release:

```shell
make release
```

## Provenance

Bolt was initially developed to support products at [Ephox](http://ephox.com).

The library was open-sourced under a [BSD License](https://github.com/boltjs/bolt/blob/master/LICENSE), drawing users, support and improvements from a number of contributors.

The initial developers have since left the employment of Ephox and now maintain this fork `boltjs/bolt`.
