(ns lt.plugins.gitbeam.util
  (:require [lt.objs.editor.pool :as pool]
            [lt.objs.proc :as proc]
            [clojure.string :as s]
            [lt.objs.files :as files]))

;; Until lt.objs.proc/exec works
(defn sh
  [cmd & args]
  (let [[args options] (if (map? (last args))
                         [(butlast args) (last args)]
                         [args {}])
        stdout-fn (or (:stdout options)
                      (fn [stdout] (when (seq stdout) (println "STDOUT: " stdout))))]
    (.execFile (js/require "child_process")
           cmd
           (clj->js (or args []))
           (clj->js (dissoc options :stdout))
           (fn [err stdout stderr]

             (stdout-fn stdout)
             (when (seq stderr) (println "STDERR: " stderr)
               (prn "ERR:" err))
             (when (:callback options)
               ((:callback options)))))))


(defn get-git-root [path]
  (files/parent (files/walk-up-find path ".git")))

(defn get-cwd []
  (files/parent
   (-> @(pool/last-active) :info :path)))

(defn capture
  "Same as lt.objs.proc/capture but takes shell options e.g. :cwd and gives back stderr to callback."
  [cmd vars cb sh-opts]
  (.exec (js/require "child_process") (str cmd " && " (proc/var-caps vars))
         (clj->js sh-opts)
         (fn [err out stderr]
           (cb (zipmap vars (s/split out ";")) stderr))))
