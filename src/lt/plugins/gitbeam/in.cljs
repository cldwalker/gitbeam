(ns lt.plugins.gitbeam.in
  (:require [lt.plugins.gitbeam.util :as util]
            [lt.object :as obj]
            [lt.objs.command :as cmd]
            [lt.objs.notifos :as notifos]
            [lt.objs.workspace :as workspace]
            [lt.objs.files :as files]
            [clojure.string :as s]))

(def clone-dir (files/home ".gitbeam"))

(def repo-path-regex "Matches against user/repo and optional path"
  #"github\.com/([^/]+/[^/]+)(.*)?$")

(defn open-path [path]
  (if (files/file? path)
    (cmd/exec! :open-path path)
    (notifos/set-msg! (str path " is not a valid file to open"))))

(defn add-folder [url repo-dir]
  ;; TODO: (cmd/exec! :window.new)
  (obj/raise workspace/current-ws :add.folder! repo-dir)

  (when-let [[_ commit relative-path] (some->> url
                                               (re-find repo-path-regex)
                                               last
                                               (re-find #"/[^/]+/([^/]+)/(.*)"))]
    ;; TODO: distinguish real stderr from "already on master" non-error
    (util/sh "git" "checkout" commit
             {:cwd repo-dir
              :callback (partial open-path
                                 (files/join repo-dir relative-path))})))

(defn add-repo [url basename]
  (let [repo-dir (files/join clone-dir (s/replace basename "/" "_"))]
    (if (files/exists? repo-dir)
      ;; TODO: double check it's the correct repo with remote -v
      (util/sh "git" "pull"
               {:cwd repo-dir
                :callback (partial add-folder url repo-dir)})
      ;; we use :callback here because clone sometimes stderrs
      ;; even when it has succeeded
      (util/sh "git" "clone"
               (re-find (re-pattern (str ".*" basename))
                        url)
               repo-dir
               {:callback (partial add-folder url repo-dir)}))))

(defn clone-project [url]
  (when-not (files/exists? clone-dir)
    (files/mkdir clone-dir))
  (if-let [basename (->> url (re-find repo-path-regex) second)]
    (add-repo url basename)
    (notifos/set-msg! (str url " is not a clonable url. Please try again."))))

(defn clone-project-from-clipboard []
  (util/sh "pbpaste" {:stdout clone-project}))

(cmd/command {:command :gitbeam.clone-project-from-clipboard
              :desc "gitbeam: clones project using clipboard url"
              :exec clone-project-from-clipboard})

(comment
  (util/sh "ls" {:cwd "/Users/gabrielhorner"})
  (clone-project-from-clipboard)
  (defn capture [cmd vars cb]
    (.exec (js/require "child_process") (str cmd " && " (lt.objs.proc/var-caps vars))
           (clj->js {:cwd (get-git-root (get-cwd)) })
           (fn [err out serr]
             (prn out)
             (let [vs (zipmap vars (s/split out ";"))]
               (cb vs)))))
   (capture "REMOTE_URL=`git config --get remote.origin.url`;COMMIT=`git rev-parse HEAD`"
                         ["REMOTE_URL" "COMMIT"] prn)
  (sh "pbpaste")
  (get-git-root (get-cwd))
  (def w (lt.objs.app/open-window))
  (cmd/exec! :window.new)
  (lt.object/raise workspace/current-ws :add.folder! "/Users/me/code/world/fs")
  (-> (lt.object/instances-by-type :lt.objs.sidebar.workspace/workspace.folder)
      (nth 1)
      deref
      :path)
  )
