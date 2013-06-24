## Bolt

[![Build Status](https://travis-ci.org/boltjs/bolt.png)](https://travis-ci.org/boltjs/bolt)

Bolt is a javascript module system, inspired by, but at this
point (intentionally) not compatible with the
[AMD specification](https://github.com/amdjs/amdjs-api/wiki/AMD).
Bolt consists of a runtime framework, compiler and testing tools.

The general philosophy is quick, clean and easy.

Bolt is open source under a [BSD style license](https://github.com/boltjs/bolt/blob/master/LICENSE).


## Documentation

* [User Docs](http://boltjs.io)
* [Example](https://github.com/boltjs/bolt/tree/master/demo)


## Getting Bolt

* Latest release: <http://dist.boltjs.io/1.4.1.1/bolt-1.4.1.1.tar.gz>
* Runtime script: <http://dist.boltjs.io/1.4.1.1/bolt.js>
* Karma test adapter: <http://dist.boltjs.io/1.4.1.1/bolt-karma.js>

```shell
cd install-dir
curl http://dist.boltjs.io/1.4.1.1/bolt-1.4.1.1.tar.gz | tar xfz -
sudo ln -s `pwd`/bolt-*/bin/bolt /usr/local/bin/bolt
```

Or via npm:

```
npm install -g boltjs
```

## Dependencies

Bolt relies on node.js v0.8+ which can be obtained from [http://nodejs.org](http://nodejs.org/#download)
or your system's package manager.

If you want to run bolt test with [karma](http://karma-runner.github.io), you will also
need to install karma: `npm install -g karma`.

## Source

Bolt is arranged into several modules. All modules can be built and tested _very quickly_ with:

```shell
git clone https://github.com/boltjs/bolt.git
cd bolt
make dist
```

The distribution tar can then be found in gen/dist/bolt-local.tar.gz, or unpacked in
gen/image/bolt-local.

## Development

If you have never pushed a release before, run:

```shell
make release-prep
```

To push a release:

```shell
make release
```


## Provenance

Bolt was initially developed to support products at [Ephox](http://ephox.com).

The library was open-sourced under a [BSD License](https://github.com/boltjs/bolt/blob/master/LICENSE), drawing users, support and improvements from a number of contributors.

The initial developers have since left the employment of Ephox and now maintain this fork `boltjs/bolt`.
