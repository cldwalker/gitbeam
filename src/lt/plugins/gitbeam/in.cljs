(ns lt.plugins.gitbeam.in
  (:require [lt.plugins.gitbeam.util :as util]
            [lt.object :as obj]
            [lt.objs.command :as cmd]
            [lt.objs.workspace :as workspace]
            [lt.objs.files :as files]))

(def clone-dir (files/home ".gitbeam"))

(defn new-window-and-workspace [repo-dir]
  #_(cmd/exec! :window.new)
  (obj/raise workspace/current-ws :add.folder! repo-dir))

(defn clone-project [url]
  (when-not (files/exists? clone-dir)
    (files/mkdir clone-dir))
  (let [basename (->> url (re-find #"([^/]+)/?$") second)
        repo-dir (files/join clone-dir basename)]
    (util/sh "git" "clone" url repo-dir
        {:callback (partial new-window-and-workspace repo-dir)})))

(defn clone-project-from-clipboard []
  (util/sh "pbpaste" {:stdout clone-project}))

(cmd/command {:command :gitbeam.clone-project-from-clipboard
              :desc "gitbeam: clones project locally from url in clipboar"
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
