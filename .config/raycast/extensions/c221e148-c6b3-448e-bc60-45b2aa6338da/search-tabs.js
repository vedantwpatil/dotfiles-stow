"use strict";var Ht=Object.create;var re=Object.defineProperty;var Vt=Object.getOwnPropertyDescriptor;var jt=Object.getOwnPropertyNames;var Kt=Object.getPrototypeOf,Gt=Object.prototype.hasOwnProperty;var qt=(e,r)=>{for(var t in r)re(e,t,{get:r[t],enumerable:!0})},Ae=(e,r,t,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of jt(r))!Gt.call(e,a)&&a!==t&&re(e,a,{get:()=>r[a],enumerable:!(n=Vt(r,a))||n.enumerable});return e};var q=(e,r,t)=>(t=e!=null?Ht(Kt(e)):{},Ae(r||!e||!e.__esModule?re(t,"default",{value:e,enumerable:!0}):t,e)),Jt=e=>Ae(re({},"__esModule",{value:!0}),e);var Er={};qt(Er,{default:()=>zt});module.exports=Jt(Er);var I=require("@raycast/api");var h=q(require("react")),p=require("@raycast/api");var Pe=Object.prototype.hasOwnProperty;function ne(e,r){var t,n;if(e===r)return!0;if(e&&r&&(t=e.constructor)===r.constructor){if(t===Date)return e.getTime()===r.getTime();if(t===RegExp)return e.toString()===r.toString();if(t===Array){if((n=e.length)===r.length)for(;n--&&ne(e[n],r[n]););return n===-1}if(!t||typeof e=="object"){n=0;for(t in e)if(Pe.call(e,t)&&++n&&!Pe.call(r,t)||!(t in r)||!ne(e[t],r[t]))return!1;return Object.keys(r).length===n}}return e!==e&&r!==r}var G=q(require("node:fs")),se=q(require("node:path")),ge=q(require("node:crypto")),ye=q(require("node:child_process")),Oe=require("node:buffer"),Z=q(require("node:stream")),De=require("node:util");var Le=require("react/jsx-runtime");var Ne=require("node:url"),ue=globalThis;function Zt(e){let r=(0,h.useRef)(e),t=(0,h.useRef)(0);return ne(e,r.current)||(r.current=e,t.current+=1),(0,h.useMemo)(()=>r.current,[t.current])}function W(e){let r=(0,h.useRef)(e);return r.current=e,r}function Yt(e,r){let t=e instanceof Error?e.message:String(e);return(0,p.showToast)({style:p.Toast.Style.Failure,title:r?.title??"Something went wrong",message:r?.message??t,primaryAction:r?.primaryAction??Ee(e),secondaryAction:r?.primaryAction?Ee(e):void 0})}var Ee=e=>{let r=!0,t="[Extension Name]...",n="";try{let s=JSON.parse((0,G.readFileSync)((0,se.join)(p.environment.assetsPath,"..","package.json"),"utf8"));t=`[${s.title}]...`,n=`https://raycast.com/${s.owner||s.author}/${s.name}`,(!s.owner||s.access==="public")&&(r=!1)}catch{}let a=p.environment.isDevelopment||r,i=e instanceof Error?e?.stack||e?.message||"":String(e);return{title:a?"Copy Logs":"Report Error",onAction(s){s.hide(),a?p.Clipboard.copy(i):(0,p.open)(`https://github.com/raycast/extensions/issues/new?&labels=extension%2Cbug&template=extension_bug_report.yml&title=${encodeURIComponent(t)}&extension-url=${encodeURI(n)}&description=${encodeURIComponent(`#### Error:
\`\`\`
${i}
\`\`\`
`)}`)}}};function Qt(e,r,t){let n=(0,h.useRef)(0),[a,i]=(0,h.useState)({isLoading:!0}),s=W(e),d=W(t?.abortable),o=W(r||[]),u=W(t?.onError),c=W(t?.onData),f=W(t?.onWillExecute),y=W(t?.failureToastOptions),A=W(a.data),E=(0,h.useRef)(null),m=(0,h.useRef)({page:0}),b=(0,h.useRef)(!1),w=(0,h.useRef)(!0),T=(0,h.useRef)(50),k=(0,h.useCallback)(()=>(d.current&&(d.current.current?.abort(),d.current.current=new AbortController),++n.current),[d]),U=(0,h.useCallback)((..._)=>{let $=k();i(g=>({...g,isLoading:!0}));async function M(g){let v=g instanceof Error?g:new Error(String(g));if(v.name==="AbortError")return v;if($===n.current){if(u.current)try{await u.current(v)}catch(F){console.error("The onError callback failed",F)}else if(p.environment.launchType!==p.LaunchType.Background)try{await Yt(v,{title:"Failed to fetch latest data",primaryAction:{title:"Retry",onAction(F){F.hide(),E.current?.(...o.current||[])}},...y.current})}catch(F){console.error("Failed to show the error toast",F)}$===n.current&&i({error:v,isLoading:!1})}return v}let B;try{f.current?.(_),B=Xt(s.current)(..._)}catch(g){return M(g)}return typeof B=="function"?(b.current=!0,B(m.current).then(({data:g,hasMore:v,cursor:F})=>{if($===n.current){m.current&&(m.current.cursor=F,m.current.lastItem=g?.[g.length-1]);try{let te=c.current?.(g,m.current);Promise.resolve(te).catch(Bt=>console.error("The onData callback failed",Bt))}catch(te){console.error("The onData callback failed",te)}v&&(T.current=g.length),w.current=v,i(te=>m.current.page===0?{data:g,isLoading:!1}:{data:(te.data||[])?.concat(g),isLoading:!1})}return g},g=>(w.current=!1,M(g)))):(b.current=!1,B.then(g=>{if($===n.current){try{let v=c.current?.(g);Promise.resolve(v).catch(F=>console.error("The onData callback failed",F))}catch(v){console.error("The onData callback failed",v)}i({data:g,isLoading:!1})}return g},M))},[c,u,o,s,i,E,f,m,y,k]);E.current=U;let P=(0,h.useCallback)(()=>{m.current={page:0};let _=o.current||[];return U(..._)},[U,o]),R=(0,h.useCallback)(async(_,$)=>{let M;try{if($?.optimisticUpdate){k(),typeof $?.rollbackOnError!="function"&&$?.rollbackOnError!==!1&&(M=structuredClone(A.current));let B=$.optimisticUpdate;i(g=>({...g,data:B(g.data)}))}return await _}catch(B){if(typeof $?.rollbackOnError=="function"){let g=$.rollbackOnError;i(v=>({...v,data:g(v.data)}))}else $?.optimisticUpdate&&$?.rollbackOnError!==!1&&i(g=>({...g,data:M}));throw B}finally{$?.shouldRevalidateAfter!==!1&&(p.environment.launchType===p.LaunchType.Background||p.environment.commandMode==="menu-bar"?await P():P())}},[P,A,i,k]),j=(0,h.useCallback)(()=>{m.current.page+=1;let _=o.current||[];U(..._)},[m,o,U]);(0,h.useEffect)(()=>{m.current={page:0},t?.execute!==!1?U(...r||[]):k()},[Zt([r,t?.execute,U]),d,m]),(0,h.useEffect)(()=>()=>{k()},[k]);let K=t?.execute!==!1?a.isLoading:!1,S={...a,isLoading:K},z=b.current?{pageSize:T.current,hasMore:w.current,onLoadMore:j}:void 0;return{...S,revalidate:P,mutate:R,pagination:z}}function Xt(e){return e===Promise.all||e===Promise.race||e===Promise.resolve||e===Promise.reject?e.bind(Promise):e}function Re(e){return typeof e!="function"?!1:/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e))!==null}function er(e){return e instanceof URLSearchParams?e.toString():e}function Me(e,r=[]){function t(n){return"update"in e?e.update(n,"utf8"):e.write(n)}return{dispatch:function(n){n=er(n),n===null?this._null():this["_"+typeof n](n)},_object:function(n){let a=/\[object (.*)\]/i,i=Object.prototype.toString.call(n),s=a.exec(i)?.[1]??"unknown:["+i+"]";s=s.toLowerCase();let d=null;if((d=r.indexOf(n))>=0){this.dispatch("[CIRCULAR:"+d+"]");return}else r.push(n);if(Buffer.isBuffer(n))return t("buffer:"),t(n.toString("base64"));if(s!=="object"&&s!=="function"&&s!=="asyncfunction")if(this["_"+s])this["_"+s](n);else throw new Error('Unknown object type "'+s+'"');else{let o=Object.keys(n);o=o.sort(),Re(n)||o.splice(0,0,"prototype","__proto__","constructor"),t("object:"+o.length+":");let u=this;return o.forEach(function(c){u.dispatch(c),t(":"),u.dispatch(n[c]),t(",")})}},_array:function(n,a){a=typeof a<"u"?a:!1;let i=this;if(t("array:"+n.length+":"),!a||n.length<=1){n.forEach(function(o){i.dispatch(o)});return}let s=[],d=n.map(function(o){let u=tr(),c=r.slice();return Me(u,c).dispatch(o),s=s.concat(c.slice(r.length)),u.read().toString()});r=r.concat(s),d.sort(),this._array(d,!1)},_date:function(n){t("date:"+n.toJSON())},_symbol:function(n){t("symbol:"+n.toString())},_error:function(n){t("error:"+n.toString())},_boolean:function(n){t("bool:"+n.toString())},_string:function(n){t("string:"+n.length+":"),t(n.toString())},_function:function(n){t("fn:"),Re(n)?this.dispatch("[native]"):this.dispatch(n.toString()),this.dispatch("function-name:"+String(n.name)),this._object(n)},_number:function(n){t("number:"+n.toString())},_xml:function(n){t("xml:"+n.toString())},_null:function(){t("Null")},_undefined:function(){t("Undefined")},_regexp:function(n){t("regex:"+n.toString())},_uint8array:function(n){t("uint8array:"),this.dispatch(Array.prototype.slice.call(n))},_uint8clampedarray:function(n){t("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(n))},_int8array:function(n){t("int8array:"),this.dispatch(Array.prototype.slice.call(n))},_uint16array:function(n){t("uint16array:"),this.dispatch(Array.prototype.slice.call(n))},_int16array:function(n){t("int16array:"),this.dispatch(Array.prototype.slice.call(n))},_uint32array:function(n){t("uint32array:"),this.dispatch(Array.prototype.slice.call(n))},_int32array:function(n){t("int32array:"),this.dispatch(Array.prototype.slice.call(n))},_float32array:function(n){t("float32array:"),this.dispatch(Array.prototype.slice.call(n))},_float64array:function(n){t("float64array:"),this.dispatch(Array.prototype.slice.call(n))},_arraybuffer:function(n){t("arraybuffer:"),this.dispatch(new Uint8Array(n))},_url:function(n){t("url:"+n.toString())},_map:function(n){t("map:");let a=Array.from(n);this._array(a,!0)},_set:function(n){t("set:");let a=Array.from(n);this._array(a,!0)},_file:function(n){t("file:"),this.dispatch([n.name,n.size,n.type,n.lastModified])},_blob:function(n){t("blob:"),this.dispatch([n.size,n.type])},_headers:function(n){t("headers:"),this.dispatch(Array.from(n.entries()).sort(([a],[i])=>a.localeCompare(i)))},_request:function(n){t("request:"),this.dispatch({cache:n.cache,credentials:n.credentials,hasBody:n.body!==null,headers:n.headers,integrity:n.integrity,method:n.method,mode:n.mode,redirect:n.redirect,referrer:n.referrer,referrerPolicy:n.referrerPolicy,url:n.url})},_abortsignal:function(n){t("abortsignal:"),this.dispatch([n.aborted,n.aborted?String(n.reason):void 0])},_formdata:function(n){t("formdata:"),this.dispatch(Array.from(n.entries()))},_readablestream:function(){t("readablestream")},_domwindow:function(){t("domwindow")},_bigint:function(n){t("bigint:"+n.toString())},_process:function(){t("process")},_timer:function(){t("timer")},_pipe:function(){t("pipe")},_tcp:function(){t("tcp")},_udp:function(){t("udp")},_tty:function(){t("tty")},_statwatcher:function(){t("statwatcher")},_securecontext:function(){t("securecontext")},_connection:function(){t("connection")},_zlib:function(){t("zlib")},_context:function(){t("context")},_nodescript:function(){t("nodescript")},_httpparser:function(){t("httpparser")},_dataview:function(){t("dataview")},_signal:function(){t("signal")},_fsevent:function(){t("fsevent")},_tlswrap:function(){t("tlswrap")}}}function tr(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}function rr(e,r){let t=this[e];return t instanceof Date?`__raycast_cached_date__${t.toISOString()}`:Buffer.isBuffer(t)?`__raycast_cached_buffer__${t.toString("base64")}`:r}function nr(e,r){return typeof r=="string"&&r.startsWith("__raycast_cached_date__")?new Date(r.replace("__raycast_cached_date__","")):typeof r=="string"&&r.startsWith("__raycast_cached_buffer__")?Buffer.from(r.replace("__raycast_cached_buffer__",""),"base64"):r}function Ce(e){let r=ge.default.createHash("sha1");return Me(r).dispatch(e),r.digest("hex")}var ar=Symbol("cache without namespace"),Ie=new Map,H=Symbol("no optimistic value");function ir(e){if(typeof e>"u")return"undefined";let r=JSON.stringify(e,rr);if(typeof r>"u")throw new Error("Cached state values must be JSON serializable");return r}function Ue(e,r){if(typeof e>"u")return r;if(e!=="undefined")try{return JSON.parse(e,nr)}catch(t){return console.warn("The cached data is corrupted",t),r}}function sr(e,r,t){let n=t?.cacheNamespace||ar,a=Ie.get(n)||Ie.set(n,new p.Cache({namespace:t?.cacheNamespace})).get(n);if(!a)throw new Error("Missing cache");let i=W(e),s=W(r),[d,o]=(0,h.useState)(H),u=(0,h.useRef)(null),c=(0,h.useRef)(null),f=(0,h.useCallback)((m=!0)=>{c.current&&(clearTimeout(c.current),c.current=null);let b=u.current;u.current=null,b&&b.cache.set(b.key,b.serializedValue),m&&o(H)},[]);(0,h.useEffect)(()=>{let m=u.current;m&&(m.cache!==a||m.key!==e||m.debounce!==t?.cacheWriteDebounce)&&f(),o(b=>b!==H&&b.key!==e?H:b)},[a,t?.cacheWriteDebounce,f,e]),(0,h.useEffect)(()=>()=>f(!1),[f]);let y=(0,h.useSyncExternalStore)(a.subscribe,()=>{try{return a.get(i.current)}catch(m){console.error("Could not get Cache data:",m);return}}),A=(0,h.useMemo)(()=>d!==H&&d.key===e?d.value:Ue(y,s.current),[y,s,e,d]),E=(0,h.useCallback)(m=>{let b=e,w=u.current,T;if(w&&w.cache===a&&w.key===b)T=w.value;else try{T=Ue(a.get(b),r)}catch(R){console.error("Could not get Cache data:",R),T=r}let k=typeof m=="function"?m(T):m,U=ir(k);w&&(w.cache!==a||w.key!==b)?f(!1):c.current&&(clearTimeout(c.current),c.current=null,u.current=null);let P=t?.cacheWriteDebounce;if(typeof P>"u"||P===null||P<0)a.set(b,U),o(H);else{let R={cache:a,key:b,serializedValue:U,value:k,debounce:P};u.current=R,o({key:b,value:k}),c.current=setTimeout(()=>{u.current===R&&(u.current=null,c.current=null,a.set(R.key,R.serializedValue),o(j=>j!==H&&j.key===R.key?H:j))},P)}return k},[a,t?.cacheWriteDebounce,f,r,e]);return[A,E]}var J=Symbol();function Fe(e,r,t){let{initialData:n,keepPreviousData:a,internal_cacheKeySuffix:i,cacheWriteDebounce:s,...d}=t||{},o=(0,h.useRef)(null),u=Ce(r||[])+i,[c,f]=sr(u,J,{cacheNamespace:Ce(e),cacheWriteDebounce:s}),y=(0,h.useRef)(c!==J?c:n),A=(0,h.useRef)(void 0),{mutate:E,revalidate:m,...b}=Qt(e,r||[],{...d,onData(K,S){A.current={cacheKey:u,pagination:S};let z=d.onData?.(K,S);return S&&S.page>0||(o.current={cacheKey:u,source:"promise"},y.current=K,f(K)),z}}),w,T=b.pagination,k=A.current?.cacheKey===u?A.current.pagination:void 0,U=o.current?.cacheKey===u?o.current.source:null;k&&k.page>0&&b.data?w=b.data:U==="promise"?w=y.current:a&&c!==J?(w=c,T&&(T.hasMore=!0,T.pageSize=c.length)):a&&c===J?w=y.current:c!==J?(w=c,T&&(T.hasMore=!0,T.pageSize=c.length)):w=n;let P=W(w),R=W(u),j=(0,h.useCallback)(async(K,S)=>{let z,_=P.current;try{if(S?.optimisticUpdate){typeof S?.rollbackOnError!="function"&&S?.rollbackOnError!==!1&&(z=structuredClone(P.current));let $=S.optimisticUpdate(_);_=$,o.current={cacheKey:u,source:"cache"},y.current=$,f($)}return await E(K,{shouldRevalidateAfter:S?.shouldRevalidateAfter})}catch($){if(typeof S?.rollbackOnError=="function"){let M=S.rollbackOnError(_);R.current===u&&(o.current={cacheKey:u,source:"cache"},y.current=M),f(M)}else S?.optimisticUpdate&&S?.rollbackOnError!==!1&&(R.current===u&&(o.current={cacheKey:u,source:"cache"},y.current=z),f(z));throw $}},[u,f,E,P,R,y,o]);return(0,h.useEffect)(()=>{c!==J&&(o.current={cacheKey:u,source:"cache"},y.current=c)},[u,c]),{data:w,isLoading:b.isLoading,error:b.error,mutate:k&&k.page>0?E:j,pagination:T,revalidate:m}}var ae=e=>!!e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function",de=Symbol.for("signal-exit emitter"),he=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),ue[de])return ue[de];Object.defineProperty(ue,de,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(r,t){this.listeners[r].push(t)}removeListener(r,t){let n=this.listeners[r],a=n.indexOf(t);a!==-1&&(a===0&&n.length===1?n.length=0:n.splice(a,1))}emit(r,t,n){if(this.emitted[r])return!1;this.emitted[r]=!0;let a=!1;for(let i of this.listeners[r])a=i(t,n)===!0||a;return r==="exit"&&(a=this.emit("afterExit",t,n)||a),a}},pe=class{onExit(){return()=>{}}load(){}unload(){}},me=class{#o;#t;#e;#i;#s;#a;#n;#r;constructor(r){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new he,this.#a={},this.#n=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=r,this.#a={};for(let t of this.#r)this.#a[t]=()=>{let n=this.#e.listeners(t),{count:a}=this.#t,i=r;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(a+=i.__signal_exit_emitter__.count),n.length===a){this.unload();let s=this.#t.emit("exit",null,t),d=t==="SIGHUP"?this.#o:t;s||r.kill(r.pid,d)}};this.#s=r.reallyExit,this.#i=r.emit}onExit(r,t){if(!ae(this.#e))return()=>{};this.#n===!1&&this.load();let n=t?.alwaysLast?"afterExit":"exit";return this.#t.on(n,r),()=>{this.#t.removeListener(n,r),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#n){this.#n=!0,this.#t.count+=1;for(let r of this.#r)try{let t=this.#a[r];t&&this.#e.on(r,t)}catch{}this.#e.emit=(r,...t)=>this.#l(r,...t),this.#e.reallyExit=r=>this.#c(r)}}unload(){this.#n&&(this.#n=!1,this.#r.forEach(r=>{let t=this.#a[r];if(!t)throw new Error("Listener not defined for signal: "+r);try{this.#e.removeListener(r,t)}catch{}}),this.#e.emit=this.#i,this.#e.reallyExit=this.#s,this.#t.count-=1)}#c(r){return ae(this.#e)?(this.#e.exitCode=r||0,this.#t.emit("exit",this.#e.exitCode,null),this.#s.call(this.#e,this.#e.exitCode)):0}#l(r,...t){let n=this.#i;if(r==="exit"&&ae(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let a=n.call(this.#e,r,...t);return this.#t.emit("exit",this.#e.exitCode,null),a}else return n.call(this.#e,r,...t)}},fe=null,or=(e,r)=>(fe||(fe=ae(process)?new me(process):new pe),fe.onExit(e,r));function ze(e,{timeout:r}={}){let t=new Promise((d,o)=>{e.on("exit",(u,c)=>{d({exitCode:u,signal:c,timedOut:!1})}),e.on("error",u=>{o(u)}),e.stdin&&e.stdin.on("error",u=>{o(u)})}),n=or(()=>{e.kill()});if(r===0||r===void 0)return t.finally(()=>n());let a,i=new Promise((d,o)=>{a=setTimeout(()=>{e.kill("SIGTERM"),o(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},r)}),s=t.finally(()=>{clearTimeout(a)});return Promise.race([i,s]).finally(()=>n())}var be=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function cr(e){let{encoding:r}=e,t=r==="buffer",n=new Z.default.PassThrough({objectMode:!1});r&&r!=="buffer"&&n.setEncoding(r);let a=0,i=[];return n.on("data",s=>{i.push(s),a+=s.length}),n.getBufferedValue=()=>t?Buffer.concat(i,a):i.join(""),n.getBufferedLength=()=>a,n}async function _e(e,r){let t=cr(r);return await new Promise((n,a)=>{let i=s=>{s&&t.getBufferedLength()<=Oe.constants.MAX_LENGTH&&(s.bufferedData=t.getBufferedValue()),a(s)};(async()=>{try{await(0,De.promisify)(Z.default.pipeline)(e,t),n()}catch(s){i(s)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&i(new be)})}),t.getBufferedValue()}async function We(e,r){e.destroy();try{return await r}catch(t){return t.bufferedData}}async function Be({stdout:e,stderr:r},{encoding:t},n){let a=_e(e,{encoding:t}),i=_e(r,{encoding:t});try{return await Promise.all([n,a,i])}catch(s){return Promise.all([{error:s,exitCode:null,signal:s.signal,timedOut:s.timedOut||!1},We(e,a),We(r,i)])}}function lr(e){let r=typeof e=="string"?`
`:10,t=typeof e=="string"?"\r":13;return e[e.length-1]===r&&(e=e.slice(0,-1)),e[e.length-1]===t&&(e=e.slice(0,-1)),e}function ie(e,r){return e.stripFinalNewline?lr(r):r}function ur({timedOut:e,timeout:r,signal:t,exitCode:n}){return e?`timed out after ${r} milliseconds`:t!=null?`was killed with ${t}`:n!=null?`failed with exit code ${n}`:"failed"}function dr({stdout:e,stderr:r,error:t,signal:n,exitCode:a,command:i,timedOut:s,options:d,parentError:o}){let c=`Command ${ur({timedOut:s,timeout:d?.timeout,signal:n,exitCode:a})}: ${i}`,f=t?`${c}
${t.message}`:c,y=[f,r,e].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=o,t.message=y,t.shortMessage=f,t.command=i,t.exitCode=a,t.signal=n,t.stdout=e,t.stderr=r,"bufferedData"in t&&delete t.bufferedData,t}function He({stdout:e,stderr:r,error:t,exitCode:n,signal:a,timedOut:i,command:s,options:d,parentError:o}){if(t||n!==0||a!==null)throw dr({error:t,exitCode:n,signal:a,stdout:e,stderr:r,command:s,timedOut:i,options:d,parentError:o});return e}var Ur=!!process.env.RAYCASTX;function Ve(e,r){try{let t=s=>s.startsWith("http")?s:`https://${s}`,a=(typeof e=="string"?new Ne.URL(t(e)):e).hostname;switch(process.env.FAVICON_PROVIDER??"raycast"){case"none":return{source:r?.fallback??p.Icon.Link,mask:r?.mask};case"apple":return{source:r?.fallback??p.Icon.Link,mask:r?.mask};case"duckduckgo":case"duckDuckGo":return{source:`https://icons.duckduckgo.com/ip3/${a}.ico`,fallback:r?.fallback??p.Icon.Link,mask:r?.mask};case"google":return{source:`https://www.google.com/s2/favicons?sz=${r?.size??64}&domain=${a}`,fallback:r?.fallback??p.Icon.Link,mask:r?.mask};case"legacy":case"raycast":default:return{source:`https://api.ray.so/favicon?url=${a}&size=${r?.size??64}`,fallback:r?.fallback??p.Icon.Link,mask:r?.mask}}}catch(t){return console.error(t),p.Icon.Link}}async function Y(e,r,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:n,language:a,parseOutput:i,timeout:s,...d}=Array.isArray(r)?t||{}:r||{},o=n!==!1?[]:["-ss"];a==="JavaScript"&&o.push("-l","JavaScript"),Array.isArray(r)&&o.push("-",...r);let u=ye.default.spawn("osascript",o,{...d,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),c=s??1e4,f=ze(u,{timeout:c});u.stdin.end(e);let[{error:y,exitCode:A,signal:E,timedOut:m},b,w]=await Be(u,{encoding:"utf8"},f),T=ie({stripFinalNewline:!0},b),k=ie({stripFinalNewline:!0},w);return(i??He)({stdout:T,stderr:k,error:y,exitCode:A,signal:E,timedOut:m,command:"osascript",options:{humanReadableOutput:n,language:a,...d,timeout:c},parentError:new Error})}async function je(e,r){if(process.platform!=="win32")throw new Error("PowerShell is only supported on Windows");let{parseOutput:t,timeout:n,...a}=r||{},i=["-NoLogo","-NoProfile","-NonInteractive","-Command","-"],s=ye.default.spawn("powershell.exe",i,{...a}),d=n??1e4,o=ze(s,{timeout:d});s.stdin.end(e);let[{error:u,exitCode:c,signal:f,timedOut:y},A,E]=await Be(s,{encoding:"utf8"},o),m=ie({stripFinalNewline:!0},A),b=ie({stripFinalNewline:!0},E);return(t??He)({stdout:m,stderr:b,error:u,exitCode:c,signal:f,timedOut:y,command:"powershell.exe",options:{...a,timeout:d},parentError:new Error})}var ee=require("react");var le=require("react");var L=require("@raycast/api");var Ke=require("@raycast/api"),Ge=require("child_process"),Q=require("fs"),$e=require("os"),D=require("path");function fr(e){try{return(0,Q.statSync)(e).isFile()}catch{return!1}}var C=process.platform==="win32",hr="net.imput.helium",pr=[(0,D.join)("imput","Helium"),"Helium"],mr=["chrome.exe","helium.exe"],br=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function ke(){let{heliumPath:e}=(0,Ke.getPreferenceValues)(),r=e?.trim();return r||void 0}function qe(e=process.env,r=(0,$e.homedir)()){return Je([e.LOCALAPPDATA,(0,D.join)(r,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function gr(e=process.env,r=(0,$e.homedir)()){return Je([(0,D.join)(r,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function Je(e){let r=e.filter(t=>!!t).flatMap(t=>pr.map(n=>(0,D.join)(t,n)));return[...new Set(r)]}function Ze(e=yr){for(let r of br)for(let t of wr(e(r)))if((0,Q.existsSync)(t))return t}function yr(e){try{return(0,Ge.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function wr(e){let r=[],t=!1;for(let n of e.split(/\r?\n/)){if(/^HKEY_/.test(n)){t=/StartMenuInternet\\Helium/i.test(n)&&/\\shell\\open\\command$/i.test(n);continue}if(!t)continue;let a=n.split(/REG_SZ\s+/)[1]?.trim();if(!a)continue;let i=a.match(/^"([^"]+)"/);r.push(i?i[1]:a.split(/\s+/)[0])}return r}function Ye(e={}){let r="override"in e?e.override:ke();if(r&&fr(r))return r;for(let n of qe(e.env,e.home))for(let a of mr){let i=(0,D.join)(n,"Application",a);if((0,Q.existsSync)(i))return i}return(e.registryLookup??(()=>Ze()))()}var we;function xe(){return we||(we={value:Ye()}),we.value}function oe(){let e=xe();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:ke(),localAppData:process.env.LOCALAPPDATA,roots:qe(),registry:Ze()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function Qe(){return C?xe():ke()??hr}function Xe(e={}){let r=e.env??process.env,t="override"in e||e.env?Ye(e):xe(),n=[];t&&n.push((0,D.join)((0,D.dirname)((0,D.dirname)(t)),"User Data"));for(let i of gr(r,e.home))n.push((0,D.join)(i,"User Data"));let a=n.find(i=>(0,Q.existsSync)(i));return a||n[0]}function et(e){return!e||e.trim()===""||e.trim()==="not_running"?[]:e.split("").map(r=>r.split("")).filter(r=>r.length>=2&&r[0]).map(([r,t,n=""])=>({heliumId:r,url:t,title:n}))}function tt(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}async function rt(){let r=await Y(`
    set fieldSep to character id 31
    set recordSep to character id 30
    tell application "Helium"
      if not running then return ""
      set output to {}
      repeat with w in windows
        try
          set tabIds to id of tabs of w
          set tabUrls to URL of tabs of w
          set tabTitles to title of tabs of w
          repeat with i from 1 to count of tabIds
            set end of output to (item i of tabIds as text) & fieldSep & (item i of tabUrls as text) & fieldSep & (item i of tabTitles as text)
          end repeat
        end try
      end repeat
      set AppleScript's text item delimiters to recordSep
      set s to output as text
      set AppleScript's text item delimiters to ""
      return s
    end tell
  `,{timeout:5e3});return et(r)}async function nt(e){let t=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${tt(e)}" then
              select t
              set foundTab to true
              exit repeat
            end if
          end try
        end repeat
        if foundTab then exit repeat
      end repeat
      if foundTab then
        return "success"
      else
        return "not_found"
      end if
    end tell
  `;try{return(await Y(t,{timeout:5e3})).trim()==="success"}catch(n){return console.error("switchToHeliumTabById error:",n),!1}}async function at(e){let t=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${tt(e)}" then
              close t
              set foundTab to true
              exit repeat
            end if
          end try
        end repeat
        if foundTab then exit repeat
      end repeat
      if foundTab then
        return "success"
      else
        return "not_found"
      end if
    end tell
  `;try{return(await Y(t,{timeout:5e3})).trim()==="success"}catch(n){return console.error("closeHeliumTabById error:",n),!1}}async function it(){await Y(`
    tell application "Helium"
      if not running then
        activate
        delay 1
      end if

      if (count of windows) is 0 then
        make new window
      else
        tell window 1 to make new tab
      end if

      activate
    end tell
    return true
  `)}async function st(e){let r=e.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),t=`
    tell application "Helium"
      if not running then
        activate
        delay 1
      end if

      set winExists to false
      repeat with w in every window
        if index of w is 1 then
          set winExists to true
          exit repeat
        end if
      end repeat

      if not winExists then
        make new window
        activate
        try
          set URL of active tab of window 1 to "${r}"
        on error
          tell window 1
            set newTab to make new tab with properties {URL:"${r}"}
          end tell
        end try
      else
        activate

        tell window 1
          set newTab to make new tab with properties {URL:"${r}"}
        end tell
      end if
    end tell
    return true
  `;await Y(t)}var ot=require("child_process"),ct=require("fs");function lt(e){let r=oe();return new Promise((t,n)=>{let a=(0,ot.spawn)(r,[...kr(),...e],{detached:!0,stdio:"ignore",windowsHide:!1});a.once("error",i=>n(new Error(`Could not start Helium at ${r}: ${i.message}`))),a.once("spawn",()=>{a.unref(),t()})})}function kr(){let e=Xe();return e&&(0,ct.existsSync)(e)?[`--user-data-dir=${e}`]:[]}var xr="chrome://new-tab-page/",ut=`
  Add-Type -TypeDefinition @"
  using System;
  using System.Collections.Generic;
  using System.Runtime.InteropServices;
  using System.Text;
  public class HeliumWindows {
    public delegate bool EnumProc(IntPtr hWnd, IntPtr lParam);
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc cb, IntPtr lParam);
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
    [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetClassName(IntPtr hWnd, StringBuilder s, int max);
    [DllImport("user32.dll")] public static extern int GetWindowTextLength(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint pid);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int cmd);
    [DllImport("user32.dll")] public static extern bool AttachThreadInput(uint from, uint to, bool attach);
    [DllImport("kernel32.dll")] public static extern uint GetCurrentThreadId();

    public static List<IntPtr> All(uint[] pids) {
      List<IntPtr> found = new List<IntPtr>();
      EnumWindows((hWnd, lParam) => {
        if (!IsWindowVisible(hWnd)) return true;
        StringBuilder cls = new StringBuilder(64);
        GetClassName(hWnd, cls, 64);
        if (cls.ToString() != "Chrome_WidgetWin_1") return true;
        if (GetWindowTextLength(hWnd) == 0) return true;
        uint pid;
        GetWindowThreadProcessId(hWnd, out pid);
        foreach (uint candidate in pids) {
          if (candidate == pid) { found.Add(hWnd); break; }
        }
        return true;
      }, IntPtr.Zero);
      return found;
    }

    public static void Focus(IntPtr hWnd) {
      ShowWindow(hWnd, 9); // SW_RESTORE
      uint foregroundPid;
      uint foregroundThread = GetWindowThreadProcessId(GetForegroundWindow(), out foregroundPid);
      uint self = GetCurrentThreadId();
      AttachThreadInput(self, foregroundThread, true);
      SetForegroundWindow(hWnd);
      AttachThreadInput(self, foregroundThread, false);
    }
  }
"@
`;function dt(e){return`
    $executable = '${ft(e)}'
    $processIds = @(Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.Path -eq $executable } | ForEach-Object { [uint32]$_.Id })
    if ($processIds.Count -eq 0) { 'not-running'; exit }
  `}function ft(e){return e.replace(/'/g,"''")}async function ht(e,r){try{let t=(await je(r,{timeout:8e3})).trim(),n=t.split(/\r?\n/).pop()?.trim()??"";return n!=="ok"&&console.error(`[Helium] ${e} did not complete:`,n||"(no output)","| raw:",t),n}catch(t){return console.error(`[Helium] ${e} failed:`,t),""}}async function pt(e){return lt([e])}async function mt(e){if(!e.trim())return!1;let r=oe(),t=`
    Add-Type -AssemblyName UIAutomationClient
    Add-Type -AssemblyName UIAutomationTypes
    ${ut}
    ${dt(r)}

    $target = '${ft(e)}'
    $condition = New-Object System.Windows.Automation.PropertyCondition(
      [System.Windows.Automation.AutomationElement]::ControlTypeProperty,
      [System.Windows.Automation.ControlType]::TabItem)

    # Collect every tab first so matching can relax progressively. The tab
    # strip's accessible name is usually the document title, but it can carry
    # state prefixes ("Audio playing - ...") or differ in whitespace from what
    # the Browser Extension reported, so an exact-only match is too brittle.
    $candidates = @()
    foreach ($window in [HeliumWindows]::All([uint32[]]$processIds)) {
      $root = [System.Windows.Automation.AutomationElement]::FromHandle($window)
      foreach ($tab in $root.FindAll([System.Windows.Automation.TreeScope]::Descendants, $condition)) {
        $candidates += [pscustomobject]@{ Window = $window; Tab = $tab; Name = $tab.Current.Name }
      }
    }

    if ($candidates.Count -eq 0) { 'no-window'; exit }

    $normalized = $target.Trim()
    $match = $candidates | Where-Object { $_.Name -eq $target } | Select-Object -First 1
    if (-not $match) {
      $match = $candidates | Where-Object { $_.Name.Trim() -eq $normalized } | Select-Object -First 1
    }
    if (-not $match -and $normalized.Length -ge 8) {
      # Escape before using -like: page titles routinely contain [ ] * ?, which
      # would otherwise be read as wildcard syntax and match the wrong tab (or
      # nothing at all, e.g. an unclosed '[').
      $escaped = [System.Management.Automation.WildcardPattern]::Escape($normalized)
      $match = $candidates | Where-Object { $_.Name -like "*$escaped*" } | Select-Object -First 1
    }

    if (-not $match) {
      "wanted: '$target'"
      foreach ($candidate in $candidates) { "found:  '$($candidate.Name)'" }
      'no-match'
      exit
    }

    # .NET exceptions are statement-terminating but not script-terminating, so
    # without this the script would fall through to 'ok' after a failed Select()
    # and the caller would skip its fallback.
    try {
      [HeliumWindows]::Focus($match.Window)
      $pattern = $match.Tab.GetCurrentPattern([System.Windows.Automation.SelectionItemPattern]::Pattern)
      $pattern.Select()
      'ok'
    } catch {
      "select-failed: $($_.Exception.Message)"
      'select-failed'
    }
  `;return await ht("Tab switch",t)==="ok"}async function bt(){if(!await Tr())return lt([xr])}async function Tr(){let e=oe(),r=`
    Add-Type -AssemblyName System.Windows.Forms
    ${ut}
    ${dt(e)}

    $windows = [HeliumWindows]::All([uint32[]]$processIds)
    if ($windows.Count -eq 0) { 'no-window'; exit }

    $window = $windows[0]
    [HeliumWindows]::Focus($window)
    Start-Sleep -Milliseconds 150
    if ([HeliumWindows]::GetForegroundWindow() -ne $window) { 'not-focused'; exit }

    [System.Windows.Forms.SendKeys]::SendWait('^t')
    'ok'
  `;return await ht("New tab keystroke",r)==="ok"}var X=!C,vr="Closing Helium tabs is only available on macOS";async function Te(e){return C?pt(e):st(e)}async function gt(){return C?bt():it()}async function yt(){return C?[]:rt()}async function wt(e){return C?mt(e.title):nt(e.id)}async function Se(e){if(C)throw new Error(vr);return at(e)}function $t(e){return e.map(r=>({id:String(r.id),url:r.url,title:r.title||"",favicon:r.favicon}))}function kt(e,r){let t=new Map;for(let n of r)n.favicon&&!t.has(n.url)&&t.set(n.url,n.favicon);return e.map(n=>({id:n.heliumId,url:n.url,title:n.title||"",favicon:t.get(n.url)}))}function xt(){return L.environment.canAccess(L.BrowserExtension)}async function ce(){if(C)return xt()?$t(await L.BrowserExtension.getTabs()):[];let[e,r]=await Promise.all([yt(),xt()?Ar(L.BrowserExtension.getTabs(),250,[]).catch(()=>[]):Promise.resolve([])]);return kt(e,r)}async function Tt(){try{return await ce()}catch(e){return await(0,L.showToast)({style:L.Toast.Style.Failure,title:"Failed to Get Tabs",message:e instanceof Error?e.message:"Unknown error occurred"}),[]}}async function Ar(e,r,t){let n;try{return await Promise.race([e,new Promise(a=>{n=setTimeout(()=>a(t),r)})])}finally{n&&clearTimeout(n)}}function St(){let[e,r]=(0,le.useState)(),t=Fe(ce,[],{initialData:[],keepPreviousData:!0,failureToastOptions:{title:"Failed to Get Tabs"},onData:r}),n=(0,le.useCallback)(async()=>{let a=await ce();return r(a),await t.mutate(Promise.resolve(a),{optimisticUpdate:()=>a,rollbackOnError:!1,shouldRevalidateAfter:!1}),a},[t.mutate]);return{data:t.data??[],freshTabs:e,isLoading:t.isLoading,mutate:t.mutate,revalidate:n}}var l=require("@raycast/api");var vt=new Set;function At(e,r){return r.size===0?e:e.filter(t=>!r.has(t.id))}function Pt(e,r){let t=new Set(r.map(a=>a.id)),n=[];for(let a of e)t.has(a)||(e.delete(a),n.push(a));return n}function Et(e,r){let t=new Set(r.map(n=>n.id));return[...e].filter(n=>t.has(n))}function N(e,r,t){return{macOS:{modifiers:e,key:t},Windows:{modifiers:r,key:t}}}var V={newTab:N(["cmd"],["ctrl"],"n"),closeTab:N(["cmd","shift"],["ctrl","shift"],"w"),deduplicateTabs:N(["cmd","shift","ctrl"],["ctrl","shift","alt"],"w"),openInNewTab:N(["cmd","shift"],["ctrl","shift"],"o"),openInDefaultBrowser:N(["cmd","opt"],["ctrl","alt"],"o"),copyUrl:N(["cmd"],["ctrl"],"c"),copyTitle:N(["cmd","shift"],["ctrl","shift"],"c"),copyQuery:N(["cmd","shift"],["ctrl","shift"],"c"),copyAsMarkdown:N(["cmd","opt"],["ctrl","alt"],"c"),createQuicklink:N(["cmd","shift"],["ctrl","shift"],"q")};var O=require("react/jsx-runtime");function ve({title:e,url:r,icon:t,shortcut:n}){return C?(0,O.jsx)(l.Action,{title:e,icon:t??l.Icon.Globe,shortcut:n,onAction:async()=>{try{await Te(r),await(0,l.closeMainWindow)()}catch(a){await(0,l.showToast)({style:l.Toast.Style.Failure,title:"Failed to open in Helium",message:a instanceof Error?a.message:String(a)})}}}):(0,O.jsx)(l.Action.Open,{title:e,target:r,application:Qe(),icon:t,shortcut:n})}function Rt({tab:e}){return(0,O.jsx)(l.Action,{title:"Switch to Tab",icon:l.Icon.ArrowRight,onAction:async()=>{try{if(await wt(e)){await(0,l.closeMainWindow)();return}if(C){await Te(e.url),await(0,l.closeMainWindow)();return}await(0,l.showToast)({style:l.Toast.Style.Failure,title:"Tab not found",message:"The tab may have been closed"})}catch(r){await(0,l.showToast)({style:l.Toast.Style.Failure,title:"Failed to switch to tab",message:r instanceof Error?r.message:String(r)})}}})}function Ct(){return(0,O.jsx)(l.Action,{title:"Open New Tab",icon:l.Icon.PlusCircle,shortcut:V.newTab,onAction:async()=>{try{await gt(),await(0,l.closeMainWindow)()}catch(e){await(0,l.showToast)({style:l.Toast.Style.Failure,title:"Failed to open new tab",message:e instanceof Error?e.message:String(e)})}}})}function It({subject:e="List",revalidate:r}){return(0,O.jsx)(l.Action,{title:`Reload ${e}`,icon:l.Icon.ArrowClockwise,shortcut:l.Keyboard.Shortcut.Common.Refresh,onAction:async()=>{await(0,l.showToast)({style:l.Toast.Style.Animated,title:`Reloading ${e.toLowerCase()}\u2026`});try{await Promise.resolve(r()),await(0,l.showToast)({style:l.Toast.Style.Success,title:`${e} reloaded`})}catch(t){await(0,l.showToast)({style:l.Toast.Style.Failure,title:`Failed to reload ${e.toLowerCase()}`,message:t instanceof Error?t.message:String(t)})}}})}function Ut({tab:e,mutate:r,revalidate:t,pendingCloseIdsRef:n}){return X?(0,O.jsx)(l.Action,{title:"Close Tab",icon:l.Icon.XMarkCircle,shortcut:V.closeTab,onAction:async()=>{n.current.add(e.id),await(0,l.showToast)({style:l.Toast.Style.Animated,title:"Closing tab"});try{if(await r(void 0,{optimisticUpdate(s){return s?s.filter(d=>d.id!==e.id):[]},rollbackOnError:!1,shouldRevalidateAfter:!1}),!await Se(e.id))throw new Error("Tab not found or failed to close");let i=await Nt(t,[e.id]);i&&n.current.delete(e.id),await(0,l.showToast)({style:l.Toast.Style.Success,title:i?"Tab closed":"Tab close pending"})}catch(a){n.current.delete(e.id);try{await Promise.resolve(t())}catch{await r(void 0,{optimisticUpdate(i){return i?i.some(s=>s.id===e.id)?i:[e,...i]:[e]},rollbackOnError:!1,shouldRevalidateAfter:!1})}await(0,l.showToast)({style:l.Toast.Style.Failure,title:"Failed to close tab",message:a instanceof Error?a.message:String(a)})}}}):null}function _t({tab:e}){return(0,O.jsx)(ve,{title:"Open in New Tab",url:e.url,icon:l.Icon.PlusCircle,shortcut:V.openInNewTab})}function Wt({tab:e}){return(0,O.jsx)(l.Action.CopyToClipboard,{title:"Copy URL",content:e.url,shortcut:V.copyUrl})}function Ot({tab:e}){return(0,O.jsx)(l.Action.CopyToClipboard,{title:"Copy Title",content:e.title||"",shortcut:V.copyTitle})}function Dt({tabs:e,mutate:r,revalidate:t,pendingCloseIdsRef:n}={}){return X?(0,O.jsx)(l.Action,{title:"Deduplicate Tabs",icon:l.Icon.Filter,shortcut:V.deduplicateTabs,onAction:async()=>{try{let a=e??await Tt(),i=new Set,s=[];for(let f of a)i.has(f.url)?s.push(f):i.add(f.url);if(s.length===0){await(0,l.showToast)({style:l.Toast.Style.Success,title:"No duplicate tabs"});return}await(0,l.showToast)({style:l.Toast.Style.Animated,title:`Closing ${s.length} duplicate tab${s.length===1?"":"s"}`});let d=s.map(f=>f.id),o=r&&t&&n?{mutate:r,revalidate:t,pendingCloseIdsRef:n}:void 0;if(o)for(let f of d)o.pendingCloseIdsRef.current.add(f);let u=[];try{o&&await o.mutate(void 0,{optimisticUpdate(f){if(!f)return[];let y=new Set(d);return f.filter(A=>!y.has(A.id))},rollbackOnError:!1,shouldRevalidateAfter:!1});for(let f of s)try{await Se(f.id)?u.push(f.id):o&&o.pendingCloseIdsRef.current.delete(f.id)}catch{o&&o.pendingCloseIdsRef.current.delete(f.id)}}finally{if(o&&await Nt(o.revalidate,u))for(let y of u)o.pendingCloseIdsRef.current.delete(y)}let c=u.length;await(0,l.showToast)({style:c===s.length?l.Toast.Style.Success:l.Toast.Style.Failure,title:c>0?`Closed ${c}/${s.length} duplicate tab${s.length===1?"":"s"}`:"Failed to close duplicates"})}catch(a){await(0,l.showToast)({style:l.Toast.Style.Failure,title:"Failed to deduplicate tabs",message:a instanceof Error?a.message:String(a)})}}}):null}function Lt({url:e,name:r}){return(0,O.jsx)(l.Action.CreateQuicklink,{quicklink:{link:e,name:r},shortcut:V.createQuicklink})}async function Nt(e,r,t=3,n=150){if(r.length===0)return!0;for(let a=0;a<t;a+=1){try{let i=await Promise.resolve(e());if(Array.isArray(i)&&Et(r,i).length===0)return!0}catch{return!1}a<t-1&&await Pr(n)}return!1}function Pr(e){return new Promise(r=>setTimeout(r,e))}function Mt(e,r){if(!r)return e;let t=r.toLowerCase().split(/\s+/).filter(n=>n.length>0);return t.length===0?e:e.filter(n=>{let a=n.title?.toLowerCase(),i=n.url.toLowerCase();return t.every(s=>a&&a.includes(s)||i.includes(s))})}var x=require("react/jsx-runtime"),Ft="https://www.raycast.com/browser-extension";function zt(){let[e,r]=(0,ee.useState)(""),{data:t,freshTabs:n,isLoading:a,mutate:i,revalidate:s}=St(),d=(0,ee.useRef)(vt);(0,ee.useEffect)(()=>{n&&Pt(d.current,n)},[n]);let o=At(t,d.current),u=o?Mt(o,e):[];return(0,x.jsxs)(I.List,{isLoading:a,searchBarPlaceholder:"Search tabs by title or URL...",searchText:e,onSearchTextChange:r,children:[u.length===0&&!a&&(0,x.jsx)(I.List.EmptyView,{icon:I.Icon.Window,title:"No Tabs Found",description:X?"Make sure your browser is running with open tabs":"On Windows, tabs come from Raycast's browser extension \u2014 install it in Helium and make sure Helium is running. It reports tabs from every browser it is installed in, so tabs from other browsers can appear here too.",actions:X?void 0:(0,x.jsxs)(I.ActionPanel,{children:[(0,x.jsx)(ve,{title:"Get Raycast Browser Extension",icon:I.Icon.Download,url:Ft}),(0,x.jsx)(I.Action.CopyToClipboard,{title:"Copy Link",content:Ft})]})}),u.map(c=>(0,x.jsx)(I.List.Item,{id:c.id,title:c.title||"Untitled",subtitle:c.url,keywords:[c.url,c.title||""],icon:c.favicon||Ve(c.url,{fallback:I.Icon.Globe}),actions:(0,x.jsxs)(I.ActionPanel,{children:[(0,x.jsx)(Rt,{tab:c}),(0,x.jsx)(Ct,{}),(0,x.jsx)(Ut,{tab:c,mutate:i,revalidate:s,pendingCloseIdsRef:d}),(0,x.jsx)(_t,{tab:c}),(0,x.jsx)(Wt,{tab:c}),(0,x.jsx)(Ot,{tab:c}),(0,x.jsx)(Lt,{url:c.url,name:c.title||"Untitled"}),(0,x.jsx)(It,{subject:"Tabs",revalidate:s}),(0,x.jsx)(Dt,{tabs:o,mutate:i,revalidate:s,pendingCloseIdsRef:d})]})},c.id))]})}
