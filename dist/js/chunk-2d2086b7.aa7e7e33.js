(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(a,n,t){"use strict";t.r(n);var e=function(){var a=this,n=a.$createElement,t=a._self._c||n;return t("div",{staticClass:"row justify-content-center"},[t("div",{staticClass:"col-lg-5 col-md-7"},[t("div",{staticClass:"card bg-secondary shadow border-0"},[t("div",{staticClass:"card-body px-lg-5 py-lg-5"},[t("base-input",{staticClass:"input-group-alternative mb-3",attrs:{placeholder:"CPF","addon-left-icon":"ni ni-email-83"},model:{value:a.login,callback:function(n){a.login=n},expression:"login"}}),t("base-input",{staticClass:"input-group-alternative",attrs:{placeholder:"Senha",type:"password","addon-left-icon":"ni ni-lock-circle-open"},model:{value:a.senha,callback:function(n){a.senha=n},expression:"senha"}}),t("div",{staticClass:"text-center"},[t("base-button",{staticClass:"my-4",attrs:{type:"primary"},on:{click:a.logar}},[a._v("Sign in")])],1)],1)])])])},s=[],o=(t("a481"),t("8aa5")),i=t.n(o),l=t("b3b3"),c=t("82ea"),r={components:{"base-input":l["a"],"base-button":c["a"]},name:"login",data:function(){return{login:"",senha:""}},methods:{logar:function(){var a=this,n=this.login+"@dominio.com.br";console.log("logando"),i.a.auth().signInWithEmailAndPassword(n,this.senha).then(function(n){localStorage.user=n,a.$router.replace("dashboard")},function(a){alert("Oops..."+a.message)})}}},d=r,u=t("2877"),p=Object(u["a"])(d,e,s,!1,null,"18599d36",null);n["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d2086b7.aa7e7e33.js.map