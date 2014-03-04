## Description

gitbeam is a Light Table plugin that provides seamless interaction with github. With one command
browse any github url locally and with another command browse the current file on github. These
commands work for any file path and git SHA as well as preserve lines selected in LT or in the
browser.

## Install

Install this plugin with LT's plugin manager or clone this project to your LT plugins directory.

## Usage

gitbeam does not assume any default keybindings for its commands. [See below](#configuration) to configure them.
To access its commands, open the command bar (Ctrl-Space) and type "gitbeam".

gitbeam provides the following URL->file (beam in) commands:

* `:gitbeam.in-with-clipboard` (OSX only) - opens a project using a clipboard url
* `:gitbeam.in-with-current-word` - opens a project for the url under the cursor

These commands clone a project, add it to the current workspace, checkout the specified commit and
optionally open the specified file and highlight selected lines.

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

These commands operate on the url equivalent of a selected file and optionally handle selected
lines.

## Configuration

To map a key to a command, add an entry in user.keymap. For example, under `:editor` add `"alt-g" [:gitbeam.out-with-external-browser]`. For more examples of mapped gitbeam commands, see my [LT files](https://github.com/cldwalker/ltfiles).

Note: when mapping gitbeam.out commands, editor selection *cannot* be detected if using
`lt.plugins.vim/map-keys`.

## Limitations

All commands are known to work with LT 0.6.4 and OSX. As noted in [Usage](#usage), some commands are only supported
in OSX.

## Bugs/Issues

Please report them [on github](http://github.com/cldwalker/gitbeam/issues).

## Contributions

[See here](http://tagaholic.me/contributing.html) for contributing guidelines.

There are a couple of enhancements that would be welcome:

* Importing a project in a new window instead of the current one
* Add support for other git-based sites e.g. bitbucket. Currently there is only [github support](https://github.com/cldwalker/gitbeam/blob/master/src/lt/plugins/gitbeam/github.cljs).
* Add cross-platform support for copying, reading from clipboard and opening a browser. Currently there is only Mac OSX support.

## TODO
* Add tests

## Credits

* @stuartsierra - For [emacs implementation](https://github.com/stuartsierra/dotfiles/blob/master/.emacs.d/local/find-on-github.el) which inspired the first half of this.

## Links
* [open-on-github](https://github.com/atom/open-on-github) - Atom plugin which has the beam out functionality of this plugin.
