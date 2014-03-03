(ns lt.plugins.gitbeam
  (:require [lt.objs.command :as cmd]
            [lt.plugins.gitbeam.in :as in]
            [lt.plugins.gitbeam.out :as out]))

(cmd/command {:command :gitbeam.in-with-current-word
              :desc "gitbeam: open project using url under cursor"
              :exec in/in-with-current-word})

(cmd/command {:command :gitbeam.in-with-clipboard
              :desc "gitbeam: open project using clipboard url"
              :exec in/in-with-clipboard})

(cmd/command {:command :gitbeam.out-with-external-browser
              :desc "gitbeam: opens current file on github with external browser"
              :exec out/out-with-external-browser})

(cmd/command {:command :gitbeam.out-with-clipboard-copy
              :desc "gitbeam: copies to clipboard github url equivalent of current file"
              :exec out/out-with-clipboard-copy})
