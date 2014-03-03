(ns lt.plugins.gitbeam.in
  (:require [lt.plugins.gitbeam.util :as util]
            [lt.plugins.gitbeam.github :as github]
            [lt.object :as obj]
            [lt.objs.command :as cmd]
            [lt.objs.notifos :as notifos]
            [lt.objs.workspace :as workspace]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [clojure.string :as s]))

(def clone-dir (files/home ".gitbeam"))

(defn select-lines [from to]
  (when-let [ed (pool/last-active)]
    (editor/set-selection
     ed
     {:line (dec from) :ch 0}
     {:line (dec to) :ch (editor/line-length ed (dec to))})))

(defn open-path [path]
  (let [[path lines] (github/get-path-and-lines path)]
    (if (files/file? path)
      (do (cmd/exec! :open-path path)
        (when lines
          (select-lines (:from lines) (:to lines))))
      (notifos/set-msg! (str path " is not a valid file to open")))))

(defn add-folder [url repo-dir]
  ;; TODO: (cmd/exec! :window.new)
  (obj/raise workspace/current-ws :add.folder! repo-dir)

  (when-let [[commit relative-path] (github/get-commit-and-path url)]
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
  (if-let [basename (github/get-project-name url)]
    (add-repo url basename)
    (notifos/set-msg! (str url " is not a clonable url. Please try again."))))

(defn in-with-clipboard []
  (util/sh "pbpaste" {:stdout clone-project}))

(defn in-with-current-word []
  (clone-project (util/current-word)))
