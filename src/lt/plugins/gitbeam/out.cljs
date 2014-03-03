(ns lt.plugins.gitbeam.out
  (:require [lt.plugins.gitbeam.util :as util]
            [lt.plugins.gitbeam.github :as github]
            [clojure.string :as s]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.command :as cmd]
            [lt.objs.notifos :as notifos]
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

(defn open-by-remote-and-commit [remote commit]
  (-> (->> remote (re-find #"origin\t(\S+)") second)
      git-remote->base-url
      (github/build-url commit
                        (str
                         (files/relative
                          (util/get-git-root (util/get-cwd))
                          (-> @(pool/last-active) :info :path))
                         (selected-lines)))
      open))

(defn process-git-commands [{commit "COMMIT" remote "REMOTE"} stderr]
  (if (and commit remote)
    (open-by-remote-and-commit remote commit)
    (do
      (.log js/console "STDERR:" stderr)
      (notifos/set-msg! "Unable to acquire all git information necessary to open a url."))))

(defn out-with-external-browser []
  ;; To figure out remote, don't use `git config --get remote.origin.url`
  ;; which doesn't expand aliased urls
  (util/capture "REMOTE=`git remote -v`;COMMIT=`git rev-parse HEAD`"
                ["REMOTE" "COMMIT"]
                process-git-commands
                {:cwd (util/get-git-root (util/get-cwd))}))
