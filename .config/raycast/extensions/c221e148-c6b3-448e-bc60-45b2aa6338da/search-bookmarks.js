"use strict";var Ct=Object.create;var J=Object.defineProperty;var It=Object.getOwnPropertyDescriptor;var Ut=Object.getOwnPropertyNames;var _t=Object.getPrototypeOf,Wt=Object.prototype.hasOwnProperty;var ge=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ot=(e,t)=>{for(var r in t)J(e,r,{get:t[r],enumerable:!0})},ye=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Ut(t))!Wt.call(e,a)&&a!==r&&J(e,a,{get:()=>t[a],enumerable:!(n=It(t,a))||n.enumerable});return e};var j=(e,t,r)=>(r=e!=null?Ct(_t(e)):{},ye(t||!e||!e.__esModule?J(r,"default",{value:e,enumerable:!0}):r,e)),Dt=e=>ye(J({},"__esModule",{value:!0}),e);function Z(e,t){var r,n;if(e===t)return!0;if(e&&t&&(r=e.constructor)===t.constructor){if(r===Date)return e.getTime()===t.getTime();if(r===RegExp)return e.toString()===t.toString();if(r===Array){if((n=e.length)===t.length)for(;n--&&Z(e[n],t[n]););return n===-1}if(!r||typeof e=="object"){n=0;for(r in e)if(we.call(e,r)&&++n&&!we.call(t,r)||!(r in t)||!Z(e[r],t[r]))return!1;return Object.keys(t).length===n}}return e!==e&&t!==t}var we,$e=ge(()=>{we=Object.prototype.hasOwnProperty});function Lt(e){let t=(0,h.useRef)(e),r=(0,h.useRef)(0);return Z(e,t.current)||(t.current=e,r.current+=1),(0,h.useMemo)(()=>t.current,[r.current])}function W(e){let t=(0,h.useRef)(e);return t.current=e,t}function Nt(e,t){let r=e instanceof Error?e.message:String(e);return(0,l.showToast)({style:l.Toast.Style.Failure,title:t?.title??"Something went wrong",message:t?.message??r,primaryAction:t?.primaryAction??ke(e),secondaryAction:t?.primaryAction?ke(e):void 0})}function Ee(e,t,r){let n=(0,h.useRef)(0),[a,i]=(0,h.useState)({isLoading:!0}),o=W(e),u=W(r?.abortable),c=W(t||[]),p=W(r?.onError),b=W(r?.onData),f=W(r?.onWillExecute),k=W(r?.failureToastOptions),I=W(a.data),D=(0,h.useRef)(null),y=(0,h.useRef)({page:0}),L=(0,h.useRef)(!1),z=(0,h.useRef)(!0),G=(0,h.useRef)(50),R=(0,h.useCallback)(()=>(u.current&&(u.current.current?.abort(),u.current.current=new AbortController),++n.current),[u]),N=(0,h.useCallback)((...U)=>{let $=R();i(d=>({...d,isLoading:!0}));async function M(d){let w=d instanceof Error?d:new Error(String(d));if(w.name==="AbortError")return w;if($===n.current){if(p.current)try{await p.current(w)}catch(C){console.error("The onError callback failed",C)}else if(l.environment.launchType!==l.LaunchType.Background)try{await Nt(w,{title:"Failed to fetch latest data",primaryAction:{title:"Retry",onAction(C){C.hide(),D.current?.(...c.current||[])}},...k.current})}catch(C){console.error("Failed to show the error toast",C)}$===n.current&&i({error:w,isLoading:!1})}return w}let _;try{f.current?.(U),_=Ft(o.current)(...U)}catch(d){return M(d)}return typeof _=="function"?(L.current=!0,_(y.current).then(({data:d,hasMore:w,cursor:C})=>{if($===n.current){y.current&&(y.current.cursor=C,y.current.lastItem=d?.[d.length-1]);try{let V=b.current?.(d,y.current);Promise.resolve(V).catch(Rt=>console.error("The onData callback failed",Rt))}catch(V){console.error("The onData callback failed",V)}w&&(G.current=d.length),z.current=w,i(V=>y.current.page===0?{data:d,isLoading:!1}:{data:(V.data||[])?.concat(d),isLoading:!1})}return d},d=>(z.current=!1,M(d)))):(L.current=!1,_.then(d=>{if($===n.current){try{let w=b.current?.(d);Promise.resolve(w).catch(C=>console.error("The onData callback failed",C))}catch(w){console.error("The onData callback failed",w)}i({data:d,isLoading:!1})}return d},M))},[b,p,c,o,i,D,f,y,k,R]);D.current=N;let q=(0,h.useCallback)(()=>{y.current={page:0};let U=c.current||[];return N(...U)},[N,c]),Tt=(0,h.useCallback)(async(U,$)=>{let M;try{if($?.optimisticUpdate){R(),typeof $?.rollbackOnError!="function"&&$?.rollbackOnError!==!1&&(M=structuredClone(I.current));let _=$.optimisticUpdate;i(d=>({...d,data:_(d.data)}))}return await U}catch(_){if(typeof $?.rollbackOnError=="function"){let d=$.rollbackOnError;i(w=>({...w,data:d(w.data)}))}else $?.optimisticUpdate&&$?.rollbackOnError!==!1&&i(d=>({...d,data:M}));throw _}finally{$?.shouldRevalidateAfter!==!1&&(l.environment.launchType===l.LaunchType.Background||l.environment.commandMode==="menu-bar"?await q():q())}},[q,I,i,R]),vt=(0,h.useCallback)(()=>{y.current.page+=1;let U=c.current||[];N(...U)},[y,c,N]);(0,h.useEffect)(()=>{y.current={page:0},r?.execute!==!1?N(...t||[]):R()},[Lt([t,r?.execute,N]),u,y]),(0,h.useEffect)(()=>()=>{R()},[R]);let At=r?.execute!==!1?a.isLoading:!1,Pt={...a,isLoading:At},Et=L.current?{pageSize:G.current,hasMore:z.current,onLoadMore:vt}:void 0;return{...Pt,revalidate:q,mutate:Tt,pagination:Et}}function Ft(e){return e===Promise.all||e===Promise.race||e===Promise.resolve||e===Promise.reject?e.bind(Promise):e}function Re(e,{timeout:t}={}){let r=new Promise((u,c)=>{e.on("exit",(p,b)=>{u({exitCode:p,signal:b,timedOut:!1})}),e.on("error",p=>{c(p)}),e.stdin&&e.stdin.on("error",p=>{c(p)})}),n=Mt(()=>{e.kill()});if(t===0||t===void 0)return r.finally(()=>n());let a,i=new Promise((u,c)=>{a=setTimeout(()=>{e.kill("SIGTERM"),c(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},t)}),o=r.finally(()=>{clearTimeout(a)});return Promise.race([i,o]).finally(()=>n())}function Bt(e){let{encoding:t}=e,r=t==="buffer",n=new B.default.PassThrough({objectMode:!1});t&&t!=="buffer"&&n.setEncoding(t);let a=0,i=[];return n.on("data",o=>{i.push(o),a+=o.length}),n.getBufferedValue=()=>r?Buffer.concat(i,a):i.join(""),n.getBufferedLength=()=>a,n}async function xe(e,t){let r=Bt(t);return await new Promise((n,a)=>{let i=o=>{o&&r.getBufferedLength()<=Te.constants.MAX_LENGTH&&(o.bufferedData=r.getBufferedValue()),a(o)};(async()=>{try{await(0,ve.promisify)(B.default.pipeline)(e,r),n()}catch(o){i(o)}})(),r.on("data",()=>{r.getBufferedLength()>8e7&&i(new ce)})}),r.getBufferedValue()}async function Se(e,t){e.destroy();try{return await t}catch(r){return r.bufferedData}}async function Ce({stdout:e,stderr:t},{encoding:r},n){let a=xe(e,{encoding:r}),i=xe(t,{encoding:r});try{return await Promise.all([n,a,i])}catch(o){return Promise.all([{error:o,exitCode:null,signal:o.signal,timedOut:o.timedOut||!1},Se(e,a),Se(t,i)])}}function Ht(e){let t=typeof e=="string"?`
`:10,r=typeof e=="string"?"\r":13;return e[e.length-1]===t&&(e=e.slice(0,-1)),e[e.length-1]===r&&(e=e.slice(0,-1)),e}function Q(e,t){return e.stripFinalNewline?Ht(t):t}function zt({timedOut:e,timeout:t,signal:r,exitCode:n}){return e?`timed out after ${t} milliseconds`:r!=null?`was killed with ${r}`:n!=null?`failed with exit code ${n}`:"failed"}function Vt({stdout:e,stderr:t,error:r,signal:n,exitCode:a,command:i,timedOut:o,options:u,parentError:c}){let b=`Command ${zt({timedOut:o,timeout:u?.timeout,signal:n,exitCode:a})}: ${i}`,f=r?`${b}
${r.message}`:b,k=[f,t,e].filter(Boolean).join(`
`);return r?r.originalMessage=r.message:r=c,r.message=k,r.shortMessage=f,r.command=i,r.exitCode=a,r.signal=n,r.stdout=e,r.stderr=t,"bufferedData"in r&&delete r.bufferedData,r}function Ie({stdout:e,stderr:t,error:r,exitCode:n,signal:a,timedOut:i,command:o,options:u,parentError:c}){if(r||n!==0||a!==null)throw Vt({error:r,exitCode:n,signal:a,stdout:e,stderr:t,command:o,timedOut:i,options:u,parentError:c});return e}function Ue(e,t){try{let r=o=>o.startsWith("http")?o:`https://${o}`,a=(typeof e=="string"?new Pe.URL(r(e)):e).hostname;switch(process.env.FAVICON_PROVIDER??"raycast"){case"none":return{source:t?.fallback??l.Icon.Link,mask:t?.mask};case"apple":return{source:t?.fallback??l.Icon.Link,mask:t?.mask};case"duckduckgo":case"duckDuckGo":return{source:`https://icons.duckduckgo.com/ip3/${a}.ico`,fallback:t?.fallback??l.Icon.Link,mask:t?.mask};case"google":return{source:`https://www.google.com/s2/favicons?sz=${t?.size??64}&domain=${a}`,fallback:t?.fallback??l.Icon.Link,mask:t?.mask};case"legacy":case"raycast":default:return{source:`https://api.ray.so/favicon?url=${a}&size=${t?.size??64}`,fallback:t?.fallback??l.Icon.Link,mask:t?.mask}}}catch(r){return console.error(r),l.Icon.Link}}async function K(e,t,r){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:n,language:a,parseOutput:i,timeout:o,...u}=Array.isArray(t)?r||{}:t||{},c=n!==!1?[]:["-ss"];a==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(t)&&c.push("-",...t);let p=le.default.spawn("osascript",c,{...u,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),b=o??1e4,f=Re(p,{timeout:b});p.stdin.end(e);let[{error:k,exitCode:I,signal:D,timedOut:y},L,z]=await Ce(p,{encoding:"utf8"},f),G=Q({stripFinalNewline:!0},L),R=Q({stripFinalNewline:!0},z);return(i??Ie)({stdout:G,stderr:R,error:k,exitCode:I,signal:D,timedOut:y,command:"osascript",options:{humanReadableOutput:n,language:a,...u,timeout:b},parentError:new Error})}async function _e(e,t){if(process.platform!=="win32")throw new Error("PowerShell is only supported on Windows");let{parseOutput:r,timeout:n,...a}=t||{},i=["-NoLogo","-NoProfile","-NonInteractive","-Command","-"],o=le.default.spawn("powershell.exe",i,{...a}),u=n??1e4,c=Re(o,{timeout:u});o.stdin.end(e);let[{error:p,exitCode:b,signal:f,timedOut:k},I,D]=await Ce(o,{encoding:"utf8"},c),y=Q({stripFinalNewline:!0},I),L=Q({stripFinalNewline:!0},D);return(r??Ie)({stdout:y,stderr:L,error:p,exitCode:b,signal:f,timedOut:k,command:"powershell.exe",options:{...a,timeout:u},parentError:new Error})}var h,l,F,X,le,Te,B,ve,Ae,Pe,re,ke,Y,ne,ie,oe,se,ae,Mt,ce,Ar,ee=ge(()=>{h=j(require("react")),l=require("@raycast/api");$e();F=j(require("node:fs")),X=j(require("node:path")),le=j(require("node:child_process")),Te=require("node:buffer"),B=j(require("node:stream")),ve=require("node:util"),Ae=require("react/jsx-runtime"),Pe=require("node:url"),re=globalThis;ke=e=>{let t=!0,r="[Extension Name]...",n="";try{let o=JSON.parse((0,F.readFileSync)((0,X.join)(l.environment.assetsPath,"..","package.json"),"utf8"));r=`[${o.title}]...`,n=`https://raycast.com/${o.owner||o.author}/${o.name}`,(!o.owner||o.access==="public")&&(t=!1)}catch{}let a=l.environment.isDevelopment||t,i=e instanceof Error?e?.stack||e?.message||"":String(e);return{title:a?"Copy Logs":"Report Error",onAction(o){o.hide(),a?l.Clipboard.copy(i):(0,l.open)(`https://github.com/raycast/extensions/issues/new?&labels=extension%2Cbug&template=extension_bug_report.yml&title=${encodeURIComponent(r)}&extension-url=${encodeURI(n)}&description=${encodeURIComponent(`#### Error:
\`\`\`
${i}
\`\`\`
`)}`)}}};Y=e=>!!e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function",ne=Symbol.for("signal-exit emitter"),ie=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),re[ne])return re[ne];Object.defineProperty(re,ne,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(t,r){this.listeners[t].push(r)}removeListener(t,r){let n=this.listeners[t],a=n.indexOf(r);a!==-1&&(a===0&&n.length===1?n.length=0:n.splice(a,1))}emit(t,r,n){if(this.emitted[t])return!1;this.emitted[t]=!0;let a=!1;for(let i of this.listeners[t])a=i(r,n)===!0||a;return t==="exit"&&(a=this.emit("afterExit",r,n)||a),a}},oe=class{onExit(){return()=>{}}load(){}unload(){}},se=class{#s;#t;#e;#i;#o;#a;#n;#r;constructor(t){this.#s=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new ie,this.#a={},this.#n=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=t,this.#a={};for(let r of this.#r)this.#a[r]=()=>{let n=this.#e.listeners(r),{count:a}=this.#t,i=t;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(a+=i.__signal_exit_emitter__.count),n.length===a){this.unload();let o=this.#t.emit("exit",null,r),u=r==="SIGHUP"?this.#s:r;o||t.kill(t.pid,u)}};this.#o=t.reallyExit,this.#i=t.emit}onExit(t,r){if(!Y(this.#e))return()=>{};this.#n===!1&&this.load();let n=r?.alwaysLast?"afterExit":"exit";return this.#t.on(n,t),()=>{this.#t.removeListener(n,t),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#n){this.#n=!0,this.#t.count+=1;for(let t of this.#r)try{let r=this.#a[t];r&&this.#e.on(t,r)}catch{}this.#e.emit=(t,...r)=>this.#l(t,...r),this.#e.reallyExit=t=>this.#c(t)}}unload(){this.#n&&(this.#n=!1,this.#r.forEach(t=>{let r=this.#a[t];if(!r)throw new Error("Listener not defined for signal: "+t);try{this.#e.removeListener(t,r)}catch{}}),this.#e.emit=this.#i,this.#e.reallyExit=this.#o,this.#t.count-=1)}#c(t){return Y(this.#e)?(this.#e.exitCode=t||0,this.#t.emit("exit",this.#e.exitCode,null),this.#o.call(this.#e,this.#e.exitCode)):0}#l(t,...r){let n=this.#i;if(t==="exit"&&Y(this.#e)){typeof r[0]=="number"&&(this.#e.exitCode=r[0]);let a=n.call(this.#e,t,...r);return this.#t.emit("exit",this.#e.exitCode,null),a}else return n.call(this.#e,t,...r)}},ae=null,Mt=(e,t)=>(ae||(ae=Y(process)?new se(process):new oe),ae.onExit(e,t));ce=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};Ar=!!process.env.RAYCASTX});var xr={};Ot(xr,{default:()=>St});module.exports=Dt(xr);var g=require("@raycast/api");ee();var xt=require("react");var Ve=require("fs");var A=require("fs"),Be=require("os"),O=require("path");var We=require("@raycast/api"),Oe=require("child_process"),H=require("fs"),de=require("os"),T=require("path");function jt(e){try{return(0,H.statSync)(e).isFile()}catch{return!1}}var x=process.platform==="win32",Kt="net.imput.helium",Gt=[(0,T.join)("imput","Helium"),"Helium"],qt=["chrome.exe","helium.exe"],Jt=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function fe(){let{heliumPath:e}=(0,We.getPreferenceValues)(),t=e?.trim();return t||void 0}function De(e=process.env,t=(0,de.homedir)()){return Le([e.LOCALAPPDATA,(0,T.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function Zt(e=process.env,t=(0,de.homedir)()){return Le([(0,T.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function Le(e){let t=e.filter(r=>!!r).flatMap(r=>Gt.map(n=>(0,T.join)(r,n)));return[...new Set(t)]}function Ne(e=Yt){for(let t of Jt)for(let r of Qt(e(t)))if((0,H.existsSync)(r))return r}function Yt(e){try{return(0,Oe.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function Qt(e){let t=[],r=!1;for(let n of e.split(/\r?\n/)){if(/^HKEY_/.test(n)){r=/StartMenuInternet\\Helium/i.test(n)&&/\\shell\\open\\command$/i.test(n);continue}if(!r)continue;let a=n.split(/REG_SZ\s+/)[1]?.trim();if(!a)continue;let i=a.match(/^"([^"]+)"/);t.push(i?i[1]:a.split(/\s+/)[0])}return t}function Fe(e={}){let t="override"in e?e.override:fe();if(t&&jt(t))return t;for(let n of De(e.env,e.home))for(let a of qt){let i=(0,T.join)(n,"Application",a);if((0,H.existsSync)(i))return i}return(e.registryLookup??(()=>Ne()))()}var ue;function he(){return ue||(ue={value:Fe()}),ue.value}function pe(){let e=he();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:fe(),localAppData:process.env.LOCALAPPDATA,roots:De(),registry:Ne()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function Me(){return x?he():fe()??Kt}function te(e={}){let t=e.env??process.env,r="override"in e||e.env?Fe(e):he(),n=[];r&&n.push((0,T.join)((0,T.dirname)((0,T.dirname)(r)),"User Data"));for(let i of Zt(t,e.home))n.push((0,T.join)(i,"User Data"));let a=n.find(i=>(0,H.existsSync)(i));return a||n[0]}var Xt=(0,O.join)("Library","Application Support","net.imput.helium");function He(e=(0,Be.homedir)()){return x?te()??(0,O.join)(e,"AppData","Local","imput","Helium","User Data"):(0,O.join)(e,Xt)}function ze(e,t=He()){for(let r of er(t)){let n=(0,O.join)(t,r,e);if((0,A.existsSync)(n))return n}}function er(e=He()){let t=new Set,r=tr((0,O.join)(e,"Local State")),n=me(me(r)?.profile),a=rr(n?.last_used);a&&t.add(a);for(let o of nr(n?.last_active_profiles))t.add(o);let i=me(n?.info_cache);if(i)for(let o of Object.keys(i))t.add(o);t.add("Default");try{for(let o of(0,A.readdirSync)(e)){let u=(0,O.join)(e,o);(0,A.statSync)(u).isDirectory()&&(0,A.existsSync)((0,O.join)(u,"Preferences"))&&t.add(o)}}catch{}return[...t]}function tr(e){if(!(!e||!(0,A.existsSync)(e)))try{return JSON.parse((0,A.readFileSync)(e,"utf8"))}catch{return}}function me(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:void 0}function rr(e){return typeof e=="string"?e:void 0}function nr(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function je(e,t,r){if(e.type==="url"&&e.url){r.push({id:e.guid??e.id??e.url,url:e.url,title:e.name?.trim()||"Untitled",folder:t||void 0});return}if(Array.isArray(e.children))for(let n of e.children){let a=n.type==="folder"&&n.name?t?`${t}/${n.name}`:n.name:t;je(n,a,r)}}function ar(e){let t=e?.roots;if(!t||typeof t!="object")return[];let r=[];for(let n of Object.values(t))n&&typeof n=="object"&&je(n,"",r);return r}async function Ke(){let e=ze("Bookmarks");if(!e)return[];try{let t=await Ve.promises.readFile(e,"utf8");return ar(JSON.parse(t))}catch(t){throw console.error("Error reading Helium bookmarks file:",t),new Error("Failed to read bookmarks from the Helium profile")}}var s=require("@raycast/api");ee();function Ge(e){return!e||e.trim()===""||e.trim()==="not_running"?[]:e.split("").map(t=>t.split("")).filter(t=>t.length>=2&&t[0]).map(([t,r,n=""])=>({heliumId:t,url:r,title:n}))}function ir(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}async function qe(){let t=await K(`
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
  `,{timeout:5e3});return Ge(t)}async function Je(e){let r=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${ir(e)}" then
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
  `;try{return(await K(r,{timeout:5e3})).trim()==="success"}catch(n){return console.error("closeHeliumTabById error:",n),!1}}async function Ze(){await K(`
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
  `)}async function Ye(e){let t=e.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),r=`
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
          set URL of active tab of window 1 to "${t}"
        on error
          tell window 1
            set newTab to make new tab with properties {URL:"${t}"}
          end tell
        end try
      else
        activate

        tell window 1
          set newTab to make new tab with properties {URL:"${t}"}
        end tell
      end if
    end tell
    return true
  `;await K(r)}ee();var Qe=require("child_process"),Xe=require("fs");function et(e){let t=pe();return new Promise((r,n)=>{let a=(0,Qe.spawn)(t,[...sr(),...e],{detached:!0,stdio:"ignore",windowsHide:!1});a.once("error",i=>n(new Error(`Could not start Helium at ${t}: ${i.message}`))),a.once("spawn",()=>{a.unref(),r()})})}function sr(){let e=te();return e&&(0,Xe.existsSync)(e)?[`--user-data-dir=${e}`]:[]}var cr="chrome://new-tab-page/",lr=`
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
`;function ur(e){return`
    $executable = '${dr(e)}'
    $processIds = @(Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.Path -eq $executable } | ForEach-Object { [uint32]$_.Id })
    if ($processIds.Count -eq 0) { 'not-running'; exit }
  `}function dr(e){return e.replace(/'/g,"''")}async function fr(e,t){try{let r=(await _e(t,{timeout:8e3})).trim(),n=r.split(/\r?\n/).pop()?.trim()??"";return n!=="ok"&&console.error(`[Helium] ${e} did not complete:`,n||"(no output)","| raw:",r),n}catch(r){return console.error(`[Helium] ${e} failed:`,r),""}}async function tt(e){return et([e])}async function rt(){if(!await hr())return et([cr])}async function hr(){let e=pe(),t=`
    Add-Type -AssemblyName System.Windows.Forms
    ${lr}
    ${ur(e)}

    $windows = [HeliumWindows]::All([uint32[]]$processIds)
    if ($windows.Count -eq 0) { 'no-window'; exit }

    $window = $windows[0]
    [HeliumWindows]::Focus($window)
    Start-Sleep -Milliseconds 150
    if ([HeliumWindows]::GetForegroundWindow() -ne $window) { 'not-focused'; exit }

    [System.Windows.Forms.SendKeys]::SendWait('^t')
    'ok'
  `;return await fr("New tab keystroke",t)==="ok"}var nt=!x,mr="Closing Helium tabs is only available on macOS";async function be(e){return x?tt(e):Ye(e)}async function at(){return x?rt():Ze()}async function it(){return x?[]:qe()}async function ot(e){if(x)throw new Error(mr);return Je(e)}var v=require("@raycast/api");function st(e){return e.map(t=>({id:String(t.id),url:t.url,title:t.title||"",favicon:t.favicon}))}function ct(e,t){let r=new Map;for(let n of t)n.favicon&&!r.has(n.url)&&r.set(n.url,n.favicon);return e.map(n=>({id:n.heliumId,url:n.url,title:n.title||"",favicon:r.get(n.url)}))}function lt(){return v.environment.canAccess(v.BrowserExtension)}async function br(){if(x)return lt()?st(await v.BrowserExtension.getTabs()):[];let[e,t]=await Promise.all([it(),lt()?gr(v.BrowserExtension.getTabs(),250,[]).catch(()=>[]):Promise.resolve([])]);return ct(e,t)}async function ut(){try{return await br()}catch(e){return await(0,v.showToast)({style:v.Toast.Style.Failure,title:"Failed to Get Tabs",message:e instanceof Error?e.message:"Unknown error occurred"}),[]}}async function gr(e,t,r){let n;try{return await Promise.race([e,new Promise(a=>{n=setTimeout(()=>a(r),t)})])}finally{n&&clearTimeout(n)}}function dt(e,t){let r=new Set(t.map(n=>n.id));return[...e].filter(n=>r.has(n))}function P(e,t,r){return{macOS:{modifiers:e,key:r},Windows:{modifiers:t,key:r}}}var E={newTab:P(["cmd"],["ctrl"],"n"),closeTab:P(["cmd","shift"],["ctrl","shift"],"w"),deduplicateTabs:P(["cmd","shift","ctrl"],["ctrl","shift","alt"],"w"),openInNewTab:P(["cmd","shift"],["ctrl","shift"],"o"),openInDefaultBrowser:P(["cmd","opt"],["ctrl","alt"],"o"),copyUrl:P(["cmd"],["ctrl"],"c"),copyTitle:P(["cmd","shift"],["ctrl","shift"],"c"),copyQuery:P(["cmd","shift"],["ctrl","shift"],"c"),copyAsMarkdown:P(["cmd","opt"],["ctrl","alt"],"c"),createQuicklink:P(["cmd","shift"],["ctrl","shift"],"q")};var S=require("react/jsx-runtime");function yr({title:e,url:t,icon:r,shortcut:n}){return x?(0,S.jsx)(s.Action,{title:e,icon:r??s.Icon.Globe,shortcut:n,onAction:async()=>{try{await be(t),await(0,s.closeMainWindow)()}catch(a){await(0,s.showToast)({style:s.Toast.Style.Failure,title:"Failed to open in Helium",message:a instanceof Error?a.message:String(a)})}}}):(0,S.jsx)(s.Action.Open,{title:e,target:t,application:Me(),icon:r,shortcut:n})}function ft(){return(0,S.jsx)(s.Action,{title:"Open New Tab",icon:s.Icon.PlusCircle,shortcut:E.newTab,onAction:async()=>{try{await at(),await(0,s.closeMainWindow)()}catch(e){await(0,s.showToast)({style:s.Toast.Style.Failure,title:"Failed to open new tab",message:e instanceof Error?e.message:String(e)})}}})}function ht({subject:e="List",revalidate:t}){return(0,S.jsx)(s.Action,{title:`Reload ${e}`,icon:s.Icon.ArrowClockwise,shortcut:s.Keyboard.Shortcut.Common.Refresh,onAction:async()=>{await(0,s.showToast)({style:s.Toast.Style.Animated,title:`Reloading ${e.toLowerCase()}\u2026`});try{await Promise.resolve(t()),await(0,s.showToast)({style:s.Toast.Style.Success,title:`${e} reloaded`})}catch(r){await(0,s.showToast)({style:s.Toast.Style.Failure,title:`Failed to reload ${e.toLowerCase()}`,message:r instanceof Error?r.message:String(r)})}}})}function pt({tabs:e,mutate:t,revalidate:r,pendingCloseIdsRef:n}={}){return nt?(0,S.jsx)(s.Action,{title:"Deduplicate Tabs",icon:s.Icon.Filter,shortcut:E.deduplicateTabs,onAction:async()=>{try{let a=e??await ut(),i=new Set,o=[];for(let f of a)i.has(f.url)?o.push(f):i.add(f.url);if(o.length===0){await(0,s.showToast)({style:s.Toast.Style.Success,title:"No duplicate tabs"});return}await(0,s.showToast)({style:s.Toast.Style.Animated,title:`Closing ${o.length} duplicate tab${o.length===1?"":"s"}`});let u=o.map(f=>f.id),c=t&&r&&n?{mutate:t,revalidate:r,pendingCloseIdsRef:n}:void 0;if(c)for(let f of u)c.pendingCloseIdsRef.current.add(f);let p=[];try{c&&await c.mutate(void 0,{optimisticUpdate(f){if(!f)return[];let k=new Set(u);return f.filter(I=>!k.has(I.id))},rollbackOnError:!1,shouldRevalidateAfter:!1});for(let f of o)try{await ot(f.id)?p.push(f.id):c&&c.pendingCloseIdsRef.current.delete(f.id)}catch{c&&c.pendingCloseIdsRef.current.delete(f.id)}}finally{if(c&&await wr(c.revalidate,p))for(let k of p)c.pendingCloseIdsRef.current.delete(k)}let b=p.length;await(0,s.showToast)({style:b===o.length?s.Toast.Style.Success:s.Toast.Style.Failure,title:b>0?`Closed ${b}/${o.length} duplicate tab${o.length===1?"":"s"}`:"Failed to close duplicates"})}catch(a){await(0,s.showToast)({style:s.Toast.Style.Failure,title:"Failed to deduplicate tabs",message:a instanceof Error?a.message:String(a)})}}}):null}function mt({bookmark:e}){return(0,S.jsx)(s.Action,{title:"Open Bookmark",icon:s.Icon.ArrowRight,onAction:async()=>{try{await be(e.url),await(0,s.closeMainWindow)()}catch(t){await(0,s.showToast)({style:s.Toast.Style.Failure,title:"Failed to open bookmark",message:t instanceof Error?t.message:String(t)})}}})}function bt({bookmark:e}){return(0,S.jsx)(yr,{title:"Open in New Tab",url:e.url,icon:s.Icon.PlusCircle,shortcut:E.openInNewTab})}function gt({bookmark:e}){return(0,S.jsx)(s.Action.CopyToClipboard,{title:"Copy URL",content:e.url,shortcut:E.copyUrl})}function yt({bookmark:e}){return(0,S.jsx)(s.Action.CopyToClipboard,{title:"Copy Title",content:e.title,shortcut:E.copyTitle})}function wt({bookmark:e}){return(0,S.jsx)(s.Action.CopyToClipboard,{title:"Copy as Markdown",content:`[${e.title}](${e.url})`,shortcut:E.copyAsMarkdown})}function $t({url:e,name:t}){return(0,S.jsx)(s.Action.CreateQuicklink,{quicklink:{link:e,name:t},shortcut:E.createQuicklink})}async function wr(e,t,r=3,n=150){if(t.length===0)return!0;for(let a=0;a<r;a+=1){try{let i=await Promise.resolve(e());if(Array.isArray(i)&&dt(t,i).length===0)return!0}catch{return!1}a<r-1&&await $r(n)}return!1}function $r(e){return new Promise(t=>setTimeout(t,e))}function kt(e,t){if(!t)return e;let r=t.toLowerCase().split(/\s+/).filter(n=>n.length>0);return r.length===0?e:e.filter(n=>{let a=n.title?.toLowerCase(),i=n.url.toLowerCase();return r.every(o=>a&&a.includes(o)||i.includes(o))})}var m=require("react/jsx-runtime");function St(){let[e,t]=(0,xt.useState)(""),{data:r,isLoading:n,error:a,revalidate:i}=Ee(Ke),o=r?kt(r,e):[];return a?(0,m.jsx)(g.List,{children:(0,m.jsx)(g.List.EmptyView,{icon:g.Icon.XMarkCircle,title:"Failed to Load Bookmarks",description:"There was an error reading your bookmarks file. Make sure Helium is installed and you have bookmarks saved."})}):(0,m.jsxs)(g.List,{isLoading:n,searchBarPlaceholder:"Search bookmarks by title or URL...",onSearchTextChange:t,throttle:!0,children:[o.length===0&&!n&&(0,m.jsx)(g.List.EmptyView,{icon:g.Icon.Bookmark,title:e?"No Bookmarks Found":"No Bookmarks",description:e?"Try a different search query":"You don't have any bookmarks yet. Start bookmarking pages in Helium!"}),o.map(u=>(0,m.jsx)(kr,{bookmark:u,revalidate:i},u.id))]})}function kr({bookmark:e,revalidate:t}){let r=[];return e.folder&&r.push({text:e.folder,icon:g.Icon.Folder}),(0,m.jsx)(g.List.Item,{title:e.title||"Untitled",subtitle:e.url,keywords:[e.url,e.title],icon:Ue(e.url,{fallback:g.Icon.Bookmark}),accessories:r,actions:(0,m.jsx)(g.ActionPanel,{children:(0,m.jsxs)(g.ActionPanel.Section,{children:[(0,m.jsx)(mt,{bookmark:e}),(0,m.jsx)(bt,{bookmark:e}),(0,m.jsx)(ft,{}),(0,m.jsx)(gt,{bookmark:e}),(0,m.jsx)(yt,{bookmark:e}),(0,m.jsx)(wt,{bookmark:e}),(0,m.jsx)($t,{url:e.url,name:e.title||"Untitled"}),(0,m.jsx)(g.Action.Open,{title:"Open in Default Browser",target:e.url,icon:g.Icon.Globe,shortcut:E.openInDefaultBrowser}),(0,m.jsx)(ht,{subject:"Bookmarks",revalidate:t}),(0,m.jsx)(pt,{})]})})})}
