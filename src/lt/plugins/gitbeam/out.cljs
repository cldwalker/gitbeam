(ns lt.plugins.gitbeam.out
  (:require [lt.plugins.gitbeam.util :as util]
            [lt.plugins.gitbeam.github :as github]
            [clojure.string :as s]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.command :as cmd]
            [lt.objs.files :as files]))

(defn git-remote->base-url [git-remote]
  (-> git-remote
      s/trim-newline
      github/git-remote->url
      (s/replace #"\.git$" "")))

;; OSX-specific for now
(defn open [url]
  (util/sh "open" url))

(defn selected-lines []
  (when-let [ed (pool/last-active)]
    (when (editor/selection? ed)
      (let [selection (editor/selection-bounds ed)
            from (-> selection (get-in [:from :line]) js/parseInt inc)
            to (-> selection (get-in [:to :line]) js/parseInt inc)]
        (github/build-line-selection from to)))))

(defn open-git-remote [git-remote]
  (-> (->> git-remote (re-find #"origin\t(\S+)") second)
      git-remote->base-url
      (github/build-url "master"
                        (str
                         (files/relative
                          (util/get-git-root (util/get-cwd))
                          (-> @(pool/last-active) :info :path))
                         (selected-lines)))
      open))

(defn open-current-file-with-browser []
  ;; don't use `git config --get remote.origin.url` which doesn't
  ;; expand aliased urls
  (util/sh "git" "remote" "-v"
      {:cwd (util/get-git-root (util/get-cwd))
       :stdout open-git-remote}))

(cmd/command {:command :gitbeam.open-current-file-with-browser
              :desc "gitbeam: opens current file on github with external browser"
              :exec open-current-file-with-browser})
