if(!lt.util.load.provided_QMARK_('lt.plugins.gitbeam.util')) {
goog.provide('lt.plugins.gitbeam.util');
goog.require('cljs.core');
goog.require('lt.objs.files');
goog.require('lt.objs.files');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
/**
* @param {...*} var_args
*/
lt.plugins.gitbeam.util.sh = (function() { 
var sh__delegate = function (cmd,args){var vec__8143 = ((cljs.core.map_QMARK_.call(null,cljs.core.last.call(null,args)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.butlast.call(null,args),cljs.core.last.call(null,args)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [args,cljs.core.PersistentArrayMap.EMPTY], null));var args__$1 = cljs.core.nth.call(null,vec__8143,0,null);var options = cljs.core.nth.call(null,vec__8143,1,null);var stdout_fn = (function (){var or__6755__auto__ = new cljs.core.Keyword(null,"stdout","stdout",4416474557).cljs$core$IFn$_invoke$arity$1(options);if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return ((function (or__6755__auto__,vec__8143,args__$1,options){
return (function (stdout){if(cljs.core.seq.call(null,stdout))
{return cljs.core.println.call(null,"STDOUT: ",stdout);
} else
{return null;
}
});
;})(or__6755__auto__,vec__8143,args__$1,options))
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
sh.cljs$lang$applyTo = (function (arglist__8144){
var cmd = cljs.core.first(arglist__8144);
var args = cljs.core.rest(arglist__8144);
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
}
if(!lt.util.load.provided_QMARK_('lt.plugins.gitbeam.in')) {
goog.provide('lt.plugins.gitbeam.in$');
goog.require('cljs.core');
goog.require('lt.objs.files');
goog.require('lt.object');
goog.require('clojure.string');
goog.require('lt.objs.workspace');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.objs.workspace');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('clojure.string');
goog.require('lt.object');
goog.require('lt.plugins.gitbeam.util');
goog.require('lt.plugins.gitbeam.util');
goog.require('lt.objs.command');
lt.plugins.gitbeam.in$.clone_dir = lt.objs.files.home.call(null,".gitbeam");
lt.plugins.gitbeam.in$.add_folder = (function add_folder(repo_dir){return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.folder!","add.folder!",2151595160),repo_dir);
});
lt.plugins.gitbeam.in$.add_repo = (function add_repo(url,repo_dir){if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,repo_dir)))
{return lt.plugins.gitbeam.util.sh.call(null,"git","pull",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cwd","cwd",1014003170),repo_dir,new cljs.core.Keyword(null,"callback","callback",841683895),cljs.core.partial.call(null,lt.plugins.gitbeam.in$.add_folder,repo_dir)], null));
} else
{return lt.plugins.gitbeam.util.sh.call(null,"git","clone",url,repo_dir,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"callback","callback",841683895),cljs.core.partial.call(null,lt.plugins.gitbeam.in$.add_folder,repo_dir)], null));
}
});
lt.plugins.gitbeam.in$.clone_project = (function clone_project(url){if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.plugins.gitbeam.in$.clone_dir)))
{} else
{lt.objs.files.mkdir.call(null,lt.plugins.gitbeam.in$.clone_dir);
}
var temp__4090__auto__ = (function (){var G__8162 = cljs.core.re_find.call(null,/([^\/]+\/[^\/]+)\/?$/,url);var G__8162__$1 = (((G__8162 == null))?null:cljs.core.second.call(null,G__8162));var G__8162__$2 = (((G__8162__$1 == null))?null:clojure.string.replace.call(null,G__8162__$1,"/","_"));return G__8162__$2;
})();if(cljs.core.truth_(temp__4090__auto__))
{var basename = temp__4090__auto__;return lt.plugins.gitbeam.in$.add_repo.call(null,url,lt.objs.files.join.call(null,lt.plugins.gitbeam.in$.clone_dir,basename));
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
goog.require('clojure.string');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('clojure.string');
goog.require('lt.plugins.gitbeam.util');
goog.require('lt.plugins.gitbeam.util');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
lt.plugins.gitbeam.out.git_remote__GT_base_url = (function git_remote__GT_base_url(git_remote){return clojure.string.replace.call(null,clojure.string.replace.call(null,clojure.string.trim_newline.call(null,git_remote),/^git@github.com:/,"https://github.com/"),/\.git$/,"");
});
lt.plugins.gitbeam.out.github_url = (function github_url(base_url,commit,relative_url){return [cljs.core.str(base_url),cljs.core.str("/blob/"),cljs.core.str(commit),cljs.core.str("/"),cljs.core.str(relative_url)].join('');
});
lt.plugins.gitbeam.out.open = (function open(url){return lt.plugins.gitbeam.util.sh.call(null,"open",url);
});
lt.plugins.gitbeam.out.open_git_remote = (function open_git_remote(git_remote){return lt.plugins.gitbeam.out.open.call(null,lt.plugins.gitbeam.out.github_url.call(null,lt.plugins.gitbeam.out.git_remote__GT_base_url.call(null,cljs.core.second.call(null,cljs.core.re_find.call(null,/origin\t(\S+)/,git_remote))),"master",lt.objs.files.relative.call(null,lt.plugins.gitbeam.util.get_git_root.call(null,lt.plugins.gitbeam.util.get_cwd.call(null)),new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.editor.pool.last_active.call(null)))))));
});
lt.plugins.gitbeam.out.system_open_github_url = (function system_open_github_url(){return lt.plugins.gitbeam.util.sh.call(null,"git","remote","-v",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cwd","cwd",1014003170),lt.plugins.gitbeam.util.get_git_root.call(null,lt.plugins.gitbeam.util.get_cwd.call(null)),new cljs.core.Keyword(null,"stdout","stdout",4416474557),lt.plugins.gitbeam.out.open_git_remote], null));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"gitbeam.system-open-github-url","gitbeam.system-open-github-url",4119659977),new cljs.core.Keyword(null,"desc","desc",1016984067),"gitbeam: opens current file on github",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.gitbeam.out.system_open_github_url], null));
}
if(!lt.util.load.provided_QMARK_('lt.plugins.gitbeam')) {
goog.provide('lt.plugins.gitbeam');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
}

//# sourceMappingURL=gitbeam_compiled.js.map