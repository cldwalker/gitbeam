(ns lt.plugins.gitbeam.util
  "Util fns that are useful to any plugin"
  (:require [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.proc :as proc]
            [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd]
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

(defn current-word*
  "Returns current word given string and cursor position in string"
  [string cursor]
  (str
   (re-find #"\S+$" (subs string 0 cursor))
   (re-find #"\S+" (subs string cursor))))

(defn current-word
  "Current word under cursor"
  []
  (when-let [ed (pool/last-active)]
    (let [cursor (editor/->cursor ed)]
      (current-word* (editor/line ed (:line cursor))
                    (:ch cursor)))))

(defn tabset-open
  "Opens url with internal browser in a second tabset"
  [url]
  (let [pre-commands (if (< (-> @tabs/multi :tabsets count) 2)
                       [:tabset.new] [])
        commands (into pre-commands
                       [:add-browser-tab
                        :tabs.move-next-tabset
                        :browser.url-bar.focus
                        [:browser.url-bar.navigate! url]
                        :browser.focus-content])]
    (doseq [c commands]
      (if (coll? c)
        (apply cmd/exec! c)
        (cmd/exec! c)))))

(def clipboard (.Clipboard.get (js/require "nw.gui")))

(defn copy [text]
  (.set clipboard text "text"))

(defn paste []
  (.get clipboard "text"))
