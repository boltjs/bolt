# Bolt

Bolt is a javascript module system, inspired by, but at this
point (intentionally) not compatible with the AMD specification.
Bolt consists of a runtime framework, compiler and testing tools.

The general philosophy is quick, clean and easy.

Bolt is open source under a [BSD style license](https://raw.github.com/ephox/bolt/master/LICENCE).


# Getting Bolt

## Dependencies

Bolt relies on node.js v0.8+ which can be obtained from [http://nodejs.org](http://nodejs.org/#download)
or your systems package manager.

## Distribution

The latest release tar can be obtained from <https://github.com/ephox/bolt/downloads>.

To start using bolt, unpack the tar and put bolt on the path. For example:

<pre>
tar xfz bolt-*.tar.gz
sudo ln -s `pwd`/bolt-*/bin/bolt /usr/local/bin/bolt
sudo ln -s `pwd`/bolt-*/bin/jsc /usr/local/bin/jsc
</pre>


## Source

Bolt is split into several repositories to assist in structuring the code, however you can
build bolt by just cloning this repository and running make. This will pull down the
required git repositories and produce a local build.

<pre>
git clone https://github.com/ephox/bolt.git
cd bolt
make
</pre>

The distribution tar can then be found in gen/dist/bolt-local.tar.gz, or unpacked in
gen/image/bolt-local.


# Getting Started

Checkout the [github wiki](https://github.com/ephox/bolt/wiki/Home) for some basic documentation on getting started.
