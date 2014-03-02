(ns lt.plugins.gitbeam.github
  (:require [clojure.string :as s]))

;; beam in
;; -------
(def repo-path-regex "Matches against user/repo and optional path"
  #"github\.com/([^/]+/[^/]+)(.*)?$")

(defn get-path-and-lines [path]
  (let [[_ path from-line to-line] (re-find #"([^#]+)(?:#L(\d+)(?:-L(\d+)|$))?" path)
        from-line (js/parseInt from-line)
        to-line (js/parseInt to-line)]
    (cond
     (and from-line to-line) [path {:from from-line :to to-line}]
     from-line [path {:from from-line :to from-line}]
     :else [path nil])))


(defn get-commit-and-path [url]
  (some->> url
           (re-find repo-path-regex)
           last
           (re-find #"/[^/]+/([^/]+)/(.*)")
           rest))

(defn get-project-name [url]
  (->> url (re-find repo-path-regex) second))



;; beam out
;; --------
(defn build-url [base-url commit relative-url]
  (str base-url "/blob/" commit "/" relative-url))

(defn git-remote->url [git-remote]
  (s/replace git-remote #"^git@github.com:" "https://github.com/"))
