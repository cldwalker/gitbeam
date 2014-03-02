if(!lt.util.load.provided_QMARK_('lt.plugins.gitbeam.util')) {
goog.provide('lt.plugins.gitbeam.util');
goog.require('cljs.core');
goog.require('lt.objs.files');
goog.require('lt.objs.files');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('lt.objs.proc');
goog.require('lt.objs.proc');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
/**
* @param {...*} var_args
*/
lt.plugins.gitbeam.util.sh = (function() { 
var sh__delegate = function (cmd,args){var vec__8442 = ((cljs.core.map_QMARK_.call(null,cljs.core.last.call(null,args)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.butlast.call(null,args),cljs.core.last.call(null,args)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [args,cljs.core.PersistentArrayMap.EMPTY], null));var args__$1 = cljs.core.nth.call(null,vec__8442,0,null);var options = cljs.core.nth.call(null,vec__8442,1,null);var stdout_fn = (function (){var or__6755__auto__ = new cljs.core.Keyword(null,"stdout","stdout",4416474557).cljs$core$IFn$_invoke$arity$1(options);if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return ((function (or__6755__auto__,vec__8442,args__$1,options){
return (function (stdout){if(cljs.core.seq.call(null,stdout))
{return cljs.core.println.call(null,"STDOUT: ",stdout);
} else
{return null;
}
});
;})(or__6755__auto__,vec__8442,args__$1,options))
}
})();return require("child_process").execFile(cmd,cljs.core.clj__GT_js.call(null,(function (){var or__6755__auto__ = args__$1;if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})()),cljs.core.clj__GT_js.call(null,cljs.core.dissoc.call(null,options,new cljs.core.Keyword(null,"stdout","stdout",4416474557))),(function (err,stdout,stderr){stdout_fn.call(null,stdout);
if(cljs.core.seq.call(null,stderr))
{cljs.core.println.call(null,"STDERR: ",stderr);
cljs.core.prn.call(null,"ERR:",err);
} else
{}
if(cljs.core.truth_(new cljs.core.Keyword(null,"callback","callback",841683895).cljs$core$IFn$_invoke$arity$1(options)))
{return new cljs.core.Keyword(null,"callback","callback",841683895).cljs$core$IFn$_invoke$arity$1(options).call(null);
} else
{return null;
}
}));
};
var sh = function (cmd,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return sh__delegate.call(this,cmd,args);};
sh.cljs$lang$maxFixedArity = 1;
sh.cljs$lang$applyTo = (function (arglist__8443){
var cmd = cljs.core.first(arglist__8443);
var args = cljs.core.rest(arglist__8443);
return sh__delegate(cmd,args);
});
sh.cljs$core$IFn$_invoke$arity$variadic = sh__delegate;
return sh;
})()
;
lt.plugins.gitbeam.util.get_git_root = (function get_git_root(path){return lt.objs.files.parent.call(null,lt.objs.files.walk_up_find.call(null,path,".git"));
});
lt.plugins.gitbeam.util.get_cwd = (function get_cwd(){return lt.objs.files.parent.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.editor.pool.last_active.call(null)))));
});
/**
* Same as lt.objs.proc/capture but takes shell options e.g. :cwd and gives back stderr to callback.
*/
lt.plugins.gitbeam.util.capture = (function capture(cmd,vars,cb,sh_opts){return require("child_process").exec([cljs.core.str(cmd),cljs.core.str(" && "),cljs.core.str(lt.objs.proc.var_caps.call(null,vars))].join(''),cljs.core.clj__GT_js.call(null,sh_opts),(function (err,out,stderr){return cb.call(null,cljs.core.zipmap.call(null,vars,clojure.string.split.call(null,out,";")),stderr);
}));
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.gitbeam.github')) {
goog.provide('lt.plugins.gitbeam.github');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
/**
* Matches against user/repo and optional path
*/
lt.plugins.gitbeam.github.repo_path_regex = /github\.com\/([^\/]+\/[^\/]+)(.*)?$/;
lt.plugins.gitbeam.github.get_path_and_lines = (function get_path_and_lines(path){var vec__8325 = cljs.core.re_find.call(null,/([^#]+)(?:#L(\d+)(?:-L(\d+)|$))?/,path);var _ = cljs.core.nth.call(null,vec__8325,0,null);var path__$1 = cljs.core.nth.call(null,vec__8325,1,null);var from_line = cljs.core.nth.call(null,vec__8325,2,null);var to_line = cljs.core.nth.call(null,vec__8325,3,null);var from_line__$1 = parseInt(from_line);var to_line__$1 = parseInt(to_line);if(cljs.core.truth_((function (){var and__6743__auto__ = from_line__$1;if(cljs.core.truth_(and__6743__auto__))
{return to_line__$1;
} else
{return and__6743__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1017056028),from_line__$1,new cljs.core.Keyword(null,"to","to",1013907949),to_line__$1], null)], null);
} else
{if(cljs.core.truth_(from_line__$1))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1017056028),from_line__$1,new cljs.core.Keyword(null,"to","to",1013907949),from_line__$1], null)], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path__$1,null], null);
} else
{return null;
}
}
}
});
lt.plugins.gitbeam.github.get_commit_and_path = (function get_commit_and_path(url){var G__8327 = url;var G__8327__$1 = (((G__8327 == null))?null:cljs.core.re_find.call(null,lt.plugins.gitbeam.github.repo_path_regex,G__8327));var G__8327__$2 = (((G__8327__$1 == null))?null:cljs.core.last.call(null,G__8327__$1));var G__8327__$3 = (((G__8327__$2 == null))?null:cljs.core.re_find.call(null,/\/[^\/]+\/([^\/]+)\/(.*)/,G__8327__$2));var G__8327__$4 = (((G__8327__$3 == null))?null:cljs.core.rest.call(null,G__8327__$3));return G__8327__$4;
});
lt.plugins.gitbeam.github.get_project_name = (function get_project_name(url){return cljs.core.second.call(null,cljs.core.re_find.call(null,lt.plugins.gitbeam.github.repo_path_regex,url));
});
lt.plugins.gitbeam.github.build_url = (function build_url(base_url,commit,relative_url){return [cljs.core.str(base_url),cljs.core.str("/blob/"),cljs.core.str(commit),cljs.core.str("/"),cljs.core.str(relative_url)].join('');
});
lt.plugins.gitbeam.github.git_remote__GT_url = (function git_remote__GT_url(git_remote){return clojure.string.replace.call(null,git_remote,/^git@github.com:/,"https://github.com/");
});
lt.plugins.gitbeam.github.build_line_selection = (function build_line_selection(from,to){if(cljs.core._EQ_.call(null,from,to))
{return [cljs.core.str("#L"),cljs.core.str(from)].join('');
} else
{return [cljs.core.str("#L"),cljs.core.str(from),cljs.core.str("-"),cljs.core.str("L"),cljs.core.str(to)].join('');
}
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.gitbeam.in')) {
goog.provide('lt.plugins.gitbeam.in$');
goog.require('cljs.core');
goog.require('lt.objs.files');
goog.require('lt.object');
goog.require('lt.plugins.gitbeam.github');
goog.require('clojure.string');
goog.require('lt.objs.workspace');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.objs.workspace');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('lt.plugins.gitbeam.github');
goog.require('clojure.string');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor');
goog.require('lt.plugins.gitbeam.util');
goog.require('lt.plugins.gitbeam.util');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
lt.plugins.gitbeam.in$.clone_dir = lt.objs.files.home.call(null,".gitbeam");
lt.plugins.gitbeam.in$.select_lines = (function select_lines(from,to){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.objs.editor.set_selection.call(null,ed,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(from - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(to - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),lt.objs.editor.line_length.call(null,ed,(to - 1))], null));
} else
{return null;
}
});
lt.plugins.gitbeam.in$.open_path = (function open_path(path){var vec__8329 = lt.plugins.gitbeam.github.get_path_and_lines.call(null,path);var path__$1 = cljs.core.nth.call(null,vec__8329,0,null);var lines = cljs.core.nth.call(null,vec__8329,1,null);if(cljs.core.truth_(lt.objs.files.file_QMARK_.call(null,path__$1)))
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2513940794),path__$1);
if(cljs.core.truth_(lines))
{return lt.plugins.gitbeam.in$.select_lines.call(null,new cljs.core.Keyword(null,"from","from",1017056028).cljs$core$IFn$_invoke$arity$1(lines),new cljs.core.Keyword(null,"to","to",1013907949).cljs$core$IFn$_invoke$arity$1(lines));
} else
{return null;
}
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str(path__$1),cljs.core.str(" is not a valid file to open")].join(''));
}
});
lt.plugins.gitbeam.in$.add_folder = (function add_folder(url,repo_dir){lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.folder!","add.folder!",2151595160),repo_dir);
var temp__4092__auto__ = lt.plugins.gitbeam.github.get_commit_and_path.call(null,url);if(cljs.core.truth_(temp__4092__auto__))
{var vec__8331 = temp__4092__auto__;var commit = cljs.core.nth.call(null,vec__8331,0,null);var relative_path = cljs.core.nth.call(null,vec__8331,1,null);return lt.plugins.gitbeam.util.sh.call(null,"git","checkout",commit,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cwd","cwd",1014003170),repo_dir,new cljs.core.Keyword(null,"callback","callback",841683895),cljs.core.partial.call(null,lt.plugins.gitbeam.in$.open_path,lt.objs.files.join.call(null,repo_dir,relative_path))], null));
} else
{return null;
}
});
lt.plugins.gitbeam.in$.add_repo = (function add_repo(url,basename){var repo_dir = lt.objs.files.join.call(null,lt.plugins.gitbeam.in$.clone_dir,clojure.string.replace.call(null,basename,"/","_"));if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,repo_dir)))
{return lt.plugins.gitbeam.util.sh.call(null,"git","pull",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cwd","cwd",1014003170),repo_dir,new cljs.core.Keyword(null,"callback","callback",841683895),cljs.core.partial.call(null,lt.plugins.gitbeam.in$.add_folder,url,repo_dir)], null));
} else
{return lt.plugins.gitbeam.util.sh.call(null,"git","clone",cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,[cljs.core.str(".*"),cljs.core.str(basename)].join('')),url),repo_dir,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"callback","callback",841683895),cljs.core.partial.call(null,lt.plugins.gitbeam.in$.add_folder,url,repo_dir)], null));
}
});
lt.plugins.gitbeam.in$.clone_project = (function clone_project(url){if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.plugins.gitbeam.in$.clone_dir)))
{} else
{lt.objs.files.mkdir.call(null,lt.plugins.gitbeam.in$.clone_dir);
}
var temp__4090__auto__ = lt.plugins.gitbeam.github.get_project_name.call(null,url);if(cljs.core.truth_(temp__4090__auto__))
{var basename = temp__4090__auto__;return lt.plugins.gitbeam.in$.add_repo.call(null,url,basename);
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str(url),cljs.core.str(" is not a clonable url. Please try again.")].join(''));
}
});
lt.plugins.gitbeam.in$.clone_project_from_clipboard = (function clone_project_from_clipboard(){return lt.plugins.gitbeam.util.sh.call(null,"pbpaste",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stdout","stdout",4416474557),lt.plugins.gitbeam.in$.clone_project], null));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"gitbeam.clone-project-from-clipboard","gitbeam.clone-project-from-clipboard",4800063126),new cljs.core.Keyword(null,"desc","desc",1016984067),"gitbeam: clones project using clipboard url",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.gitbeam.in$.clone_project_from_clipboard], null));
}
if(!lt.util.load.provided_QMARK_('lt.plugins.gitbeam.out')) {
goog.provide('lt.plugins.gitbeam.out');
goog.require('cljs.core');
goog.require('lt.objs.files');
goog.require('lt.plugins.gitbeam.github');
goog.require('clojure.string');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('lt.plugins.gitbeam.github');
goog.require('clojure.string');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.plugins.gitbeam.util');
goog.require('lt.plugins.gitbeam.util');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
lt.plugins.gitbeam.out.git_remote__GT_base_url = (function git_remote__GT_base_url(git_remote){return clojure.string.replace.call(null,lt.plugins.gitbeam.github.git_remote__GT_url.call(null,clojure.string.trim_newline.call(null,git_remote)),/\.git$/,"");
});
lt.plugins.gitbeam.out.open = (function open(url){return lt.plugins.gitbeam.util.sh.call(null,"open",url);
});
lt.plugins.gitbeam.out.selected_lines = (function selected_lines(){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,ed)))
{var selection = lt.objs.editor.selection_bounds.call(null,ed);var from = (parseInt(cljs.core.get_in.call(null,selection,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"from","from",1017056028),new cljs.core.Keyword(null,"line","line",1017226086)], null))) + 1);var to = (parseInt(cljs.core.get_in.call(null,selection,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"to","to",1013907949),new cljs.core.Keyword(null,"line","line",1017226086)], null))) + 1);return lt.plugins.gitbeam.github.build_line_selection.call(null,from,to);
} else
{return null;
}
} else
{return null;
}
});
lt.plugins.gitbeam.out.open_by_remote_and_commit = (function open_by_remote_and_commit(remote,commit){return lt.plugins.gitbeam.out.open.call(null,lt.plugins.gitbeam.github.build_url.call(null,lt.plugins.gitbeam.out.git_remote__GT_base_url.call(null,cljs.core.second.call(null,cljs.core.re_find.call(null,/origin\t(\S+)/,remote))),commit,[cljs.core.str(lt.objs.files.relative.call(null,lt.plugins.gitbeam.util.get_git_root.call(null,lt.plugins.gitbeam.util.get_cwd.call(null)),new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.editor.pool.last_active.call(null)))))),cljs.core.str(lt.plugins.gitbeam.out.selected_lines.call(null))].join('')));
});
lt.plugins.gitbeam.out.process_git_commands = (function process_git_commands(p__8450,stderr){var map__8452 = p__8450;var map__8452__$1 = ((cljs.core.seq_QMARK_.call(null,map__8452))?cljs.core.apply.call(null,cljs.core.hash_map,map__8452):map__8452);var commit = cljs.core.get.call(null,map__8452__$1,"COMMIT");var remote = cljs.core.get.call(null,map__8452__$1,"REMOTE");if(cljs.core.truth_((function (){var and__6743__auto__ = commit;if(cljs.core.truth_(and__6743__auto__))
{return remote;
} else
{return and__6743__auto__;
}
})()))
{return lt.plugins.gitbeam.out.open_by_remote_and_commit.call(null,remote,commit);
} else
{console.log("STDERR:",stderr);
return lt.objs.notifos.set_msg_BANG_.call(null,"Unable to acquire all git information necessary to open a url.");
}
});
lt.plugins.gitbeam.out.open_current_file_with_browser = (function open_current_file_with_browser(){return lt.plugins.gitbeam.util.capture.call(null,"REMOTE=`git remote -v`;COMMIT=`git rev-parse HEAD`",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["REMOTE","COMMIT"], null),lt.plugins.gitbeam.out.process_git_commands,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cwd","cwd",1014003170),lt.plugins.gitbeam.util.get_git_root.call(null,lt.plugins.gitbeam.util.get_cwd.call(null))], null));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"gitbeam.open-current-file-with-browser","gitbeam.open-current-file-with-browser",1401065786),new cljs.core.Keyword(null,"desc","desc",1016984067),"gitbeam: opens current file on github with external browser",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.gitbeam.out.open_current_file_with_browser], null));
}
if(!lt.util.load.provided_QMARK_('lt.plugins.gitbeam')) {
goog.provide('lt.plugins.gitbeam');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
}

//# sourceMappingURL=gitbeam_compiled.js.map