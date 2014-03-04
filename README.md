## Description

This Light Table plugin provides commands to jump from a git-based file to its equivalent github url.
It also provides the inverse - jump from a github url to a local git-cloned file.
This works for any file path and git SHA as well as preserves line selected in LT or in the browser.


## Usage

gitbeam does not assume any default keybindings for its commands. [See below](#configuration) to configure them.
To access its commands, open the command bar (Ctrl-Space) and type "gitbeam".

gitbeam provides the following URL->file (beam in) commands:

* `:gitbeam.in-with-clipboard` (OSX only) - opens a project using a clipboard url
* `:gitbeam.in-with-current-word` - opens a project for the url under the cursor

Examples:

* private url e.g. `git@github.com:user/my-project.git`
* public url e.g. `https://github.com/cldwalker/gitbeam`
* url with path e.g. `https://github.com/technomancy/leiningen/blob/master/sample.project.clj`
* url with a specific SHA/branch e.g. `https://github.com/technomancy/leiningen/blob/3.x/sample.project.clj`
* url with lines selected e.g. `https://github.com/technomancy/leiningen/blob/a5cf442cf3c6db0f9d0bf272942d5fb7fb90173c/sample.project.clj#L152-L157`


gitbeam provides the following file->URL (beam out) commands:

* `:gitbeam.out-with-external-browser` (OSX only) - opens current file on github with external browser
* `:gitbeam.out-with-internal-browser` - opens current file on github with LT's browser
* `:gitbeam.out-with-clipboard-copy` (OSX only) - copies github url of current file to clipboard

## Configuration

TODO


## Limitations

All commands are known to work in OSX. As noted in the usage section, some will

## Bugs/Issues

Please report them [on github](http://github.com/cldwalker/gitbeam/issues).

## Contributions

[See here](http://tagaholic.me/contributing.html) for contributing guidelines.

There are a couple of enhancements that would be welcome:

* Importing a project in a new window instead of the current one
* Add support for other git-based sites e.g. bitbucket. Currently there is only [github support](https://github.com/cldwalker/gitbeam/blob/master/src/lt/plugins/gitbeam/github.cljs).
* Add cross-platform support for copying, reading from clipboard and opening a browser. Currently there is only Mac OSX support.



## Links
* [open-on-github](https://github.com/atom/open-on-github) - Atom plugin which has the first half of this functionality's plugin.
