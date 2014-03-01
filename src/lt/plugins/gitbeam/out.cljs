(ns lt.plugins.gitbeam.out
  (:require [lt.plugins.gitbeam.util :as util]
            [clojure.string :as s]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.files :as files]))

(defn git-remote->base-url [git-remote]
  (-> git-remote
      s/trim-newline
      (s/replace #"^git@github.com:" "https://github.com/")
      (s/replace #"\.git$" "")))


(defn github-url [base-url commit relative-url]
  (str base-url "/blob/" commit "/" relative-url))

;; OSX-specific for now
(defn open [url]
  (util/sh "open" url))

(defn open-git-remote [git-remote]
  (-> (->> git-remote (re-find #"origin\t(\S+)") second)
      git-remote->base-url
      (github-url "master"
                  (files/relative
                   (util/get-git-root (util/get-cwd))
                   (-> @(pool/last-active) :info :path)))
      open))

(defn system-open-github-url []
  ;; don't use `git config --get remote.origin.url` which doesn't
  ;; expand aliased urls
  (util/sh "git" "remote" "-v"
      {:cwd (util/get-git-root (util/get-cwd))
       :stdout open-git-remote}))

(cmd/command {:command :gitbeam.system-open-github-url
              :desc "gitbeam: opens current file on github"
              :exec system-open-github-url})
