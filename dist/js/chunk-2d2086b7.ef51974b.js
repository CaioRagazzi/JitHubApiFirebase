(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(n,a,t){"use strict";t.r(a);var e=function(){var n=this,a=n.$createElement,t=n._self._c||a;return t("div",{staticClass:"row justify-content-center"},[t("div",{staticClass:"col-lg-5 col-md-7"},[t("div",{staticClass:"card bg-secondary shadow border-0"},[t("div",{staticClass:"card-body px-lg-5 py-lg-5"},[t("base-input",{staticClass:"input-group-alternative mb-3",attrs:{placeholder:"CPF","addon-left-icon":"ni ni-email-83"},model:{value:n.login,callback:function(a){n.login=a},expression:"login"}}),t("base-input",{staticClass:"input-group-alternative",attrs:{placeholder:"Senha",type:"password","addon-left-icon":"ni ni-lock-circle-open"},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&n._k(a.keyCode,"enter",13,a.key,"Enter")?null:n.logar(a)}},model:{value:n.senha,callback:function(a){n.senha=a},expression:"senha"}}),t("div",{staticClass:"text-center"},[t("base-button",{staticClass:"my-4",attrs:{type:"primary"},on:{click:n.logar}},[n._v("Entrar")])],1)],1)])])])},s=[],o=(t("a481"),t("8aa5")),i=t.n(o),l=t("b3b3"),r=t("82ea"),c={components:{"base-input":l["a"],"base-button":r["a"]},name:"login",data:function(){return{login:"",senha:""}},methods:{logar:function(){var n=this,a=this.login+"@dominio.com.br";console.log("logando"),i.a.auth().signInWithEmailAndPassword(a,this.senha).then(function(a){n.$router.replace("inventario")},function(n){alert("Oops..."+n.message)})}}},u=c,d=t("2877"),p=Object(d["a"])(u,e,s,!1,null,"12069208",null);a["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d2086b7.ef51974b.js.map