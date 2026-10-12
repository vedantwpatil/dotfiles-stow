"use strict";var k=Object.defineProperty;var ie=Object.getOwnPropertyDescriptor;var oe=Object.getOwnPropertyNames;var se=Object.prototype.hasOwnProperty;var ae=(e,t)=>{for(var r in t)k(e,r,{get:t[r],enumerable:!0})},ce=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of oe(t))!se.call(e,i)&&i!==r&&k(e,i,{get:()=>t[i],enumerable:!(n=ie(t,i))||n.enumerable});return e};var le=e=>ce(k({},"__esModule",{value:!0}),e);var $e={};ae($e,{default:()=>ne});module.exports=le($e);var a=require("@raycast/api"),te=require("@raycast/utils"),re=require("react");var s=require("@raycast/api");var W=require("@raycast/api"),L=require("child_process"),h=require("fs"),H=require("os"),u=require("path");function ue(e){try{return(0,h.statSync)(e).isFile()}catch{return!1}}var f=process.platform==="win32",de="net.imput.helium",pe=[(0,u.join)("imput","Helium"),"Helium"],fe=["chrome.exe","helium.exe"],me=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function E(){let{heliumPath:e}=(0,W.getPreferenceValues)(),t=e?.trim();return t||void 0}function U(e=process.env,t=(0,H.homedir)()){return O([e.LOCALAPPDATA,(0,u.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function we(e=process.env,t=(0,H.homedir)()){return O([(0,u.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function O(e){let t=e.filter(r=>!!r).flatMap(r=>pe.map(n=>(0,u.join)(r,n)));return[...new Set(t)]}function _(e=ge){for(let t of me)for(let r of he(e(t)))if((0,h.existsSync)(r))return r}function ge(e){try{return(0,L.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function he(e){let t=[],r=!1;for(let n of e.split(/\r?\n/)){if(/^HKEY_/.test(n)){r=/StartMenuInternet\\Helium/i.test(n)&&/\\shell\\open\\command$/i.test(n);continue}if(!r)continue;let i=n.split(/REG_SZ\s+/)[1]?.trim();if(!i)continue;let o=i.match(/^"([^"]+)"/);t.push(o?o[1]:i.split(/\s+/)[0])}return t}function N(e={}){let t="override"in e?e.override:E();if(t&&ue(t))return t;for(let n of U(e.env,e.home))for(let i of fe){let o=(0,u.join)(n,"Application",i);if((0,h.existsSync)(o))return o}return(e.registryLookup??(()=>_()))()}var I;function C(){return I||(I={value:N()}),I.value}function F(){let e=C();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:E(),localAppData:process.env.LOCALAPPDATA,roots:U(),registry:_()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function D(){return f?C():E()??de}function A(e={}){let t=e.env??process.env,r="override"in e||e.env?N(e):C(),n=[];r&&n.push((0,u.join)((0,u.dirname)((0,u.dirname)(r)),"User Data"));for(let o of we(t,e.home))n.push((0,u.join)(o,"User Data"));let i=n.find(o=>(0,h.existsSync)(o));return i||n[0]}var B=require("@raycast/utils");async function M(e){let t=e.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),r=`
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
  `;await(0,B.runAppleScript)(r)}var be=require("@raycast/utils"),G=require("child_process"),K=require("fs");function Te(e){let t=F();return new Promise((r,n)=>{let i=(0,G.spawn)(t,[...Se(),...e],{detached:!0,stdio:"ignore",windowsHide:!1});i.once("error",o=>n(new Error(`Could not start Helium at ${t}: ${o.message}`))),i.once("spawn",()=>{i.unref(),r()})})}function Se(){let e=A();return e&&(0,K.existsSync)(e)?[`--user-data-dir=${e}`]:[]}async function q(e){return Te([e])}async function V(e){return f?q(e):M(e)}var b=require("@raycast/api");function d(e,t,r){return{macOS:{modifiers:e,key:r},Windows:{modifiers:t,key:r}}}var T={newTab:d(["cmd"],["ctrl"],"n"),closeTab:d(["cmd","shift"],["ctrl","shift"],"w"),deduplicateTabs:d(["cmd","shift","ctrl"],["ctrl","shift","alt"],"w"),openInNewTab:d(["cmd","shift"],["ctrl","shift"],"o"),openInDefaultBrowser:d(["cmd","opt"],["ctrl","alt"],"o"),copyUrl:d(["cmd"],["ctrl"],"c"),copyTitle:d(["cmd","shift"],["ctrl","shift"],"c"),copyQuery:d(["cmd","shift"],["ctrl","shift"],"c"),copyAsMarkdown:d(["cmd","opt"],["ctrl","alt"],"c"),createQuicklink:d(["cmd","shift"],["ctrl","shift"],"q")};var S=require("react/jsx-runtime");function j({title:e,url:t,icon:r,shortcut:n}){return f?(0,S.jsx)(s.Action,{title:e,icon:r??s.Icon.Globe,shortcut:n,onAction:async()=>{try{await V(t),await(0,s.closeMainWindow)()}catch(i){await(0,s.showToast)({style:s.Toast.Style.Failure,title:"Failed to open in Helium",message:i instanceof Error?i.message:String(i)})}}}):(0,S.jsx)(s.Action.Open,{title:e,target:t,application:D(),icon:r,shortcut:n})}function Q({subject:e="List",revalidate:t}){return(0,S.jsx)(s.Action,{title:`Reload ${e}`,icon:s.Icon.ArrowClockwise,shortcut:s.Keyboard.Shortcut.Common.Refresh,onAction:async()=>{await(0,s.showToast)({style:s.Toast.Style.Animated,title:`Reloading ${e.toLowerCase()}\u2026`});try{await Promise.resolve(t()),await(0,s.showToast)({style:s.Toast.Style.Success,title:`${e} reloaded`})}catch(r){await(0,s.showToast)({style:s.Toast.Style.Failure,title:`Failed to reload ${e.toLowerCase()}`,message:r instanceof Error?r.message:String(r)})}}})}function z({url:e,name:t}){return(0,S.jsx)(s.Action.CreateQuicklink,{quicklink:{link:e,name:t},shortcut:T.createQuicklink})}var X=require("@raycast/utils"),x=require("react");var p=require("fs"),J=require("os"),m=require("path");var Ae=(0,m.join)("Library","Application Support","net.imput.helium");function v(e=(0,J.homedir)()){return f?A()??(0,m.join)(e,"AppData","Local","imput","Helium","User Data"):(0,m.join)(e,Ae)}function xe(e,t=v()){for(let r of ke(t)){let n=(0,m.join)(t,r,e);if((0,p.existsSync)(n))return n}}function ke(e=v()){let t=new Set,r=Ie((0,m.join)(e,"Local State")),n=R(R(r)?.profile),i=He(n?.last_used);i&&t.add(i);for(let c of Ee(n?.last_active_profiles))t.add(c);let o=R(n?.info_cache);if(o)for(let c of Object.keys(o))t.add(c);t.add("Default");try{for(let c of(0,p.readdirSync)(e)){let g=(0,m.join)(e,c);(0,p.statSync)(g).isDirectory()&&(0,p.existsSync)((0,m.join)(g,"Preferences"))&&t.add(c)}}catch{}return[...t]}function Y(e=v()){return xe("History",e)}function Ie(e){if(!(!e||!(0,p.existsSync)(e)))try{return JSON.parse((0,p.readFileSync)(e,"utf8"))}catch{return}}function R(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:void 0}function He(e){return typeof e=="string"?e:void 0}function Ee(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ce(e=10){return`
    SELECT
      id,
      url,
      title,
      datetime(last_visit_time / 1000000 + (strftime('%s', '1601-01-01')), 'unixepoch', 'localtime') AS lastVisitedAt
    FROM urls
    ORDER BY last_visit_time DESC
    LIMIT ${e};
  `}function Re(e,t=25){let r=e.trim().split(/\s+/).filter(o=>o.length>0).map(o=>o.replace(/'/g,"''")),n="";return r.length>0&&(n=`WHERE ${r.map(c=>`(url LIKE '%${c}%' OR title LIKE '%${c}%')`).join(" AND ")}`),`
    SELECT
      id,
      url,
      title,
      datetime(last_visit_time / 1000000 + (strftime('%s', '1601-01-01')), 'unixepoch', 'localtime') AS lastVisitedAt
    FROM urls
    ${n}
    GROUP BY url
    ORDER BY last_visit_time DESC
    LIMIT ${t};
  `}function Z(e,t=25){let r=(0,x.useMemo)(()=>Y(),[]),n=!!r,i=r??__filename,o=(0,x.useMemo)(()=>n?!e||e.trim().length===0?Ce(t):Re(e,t):"",[e,t,n]),{data:c,isLoading:g,permissionView:y,revalidate:P}=(0,X.useSQL)(i,o,{execute:n&&o.trim().length>0,onError(w){console.error("[Helium] History search unavailable:",w)}});return{data:(0,x.useMemo)(()=>c?c.map(w=>({id:`history-${w.id}`,url:w.url,title:w.title||w.url,lastVisitedAt:w.lastVisitedAt})):[],[c]),isLoading:n?g:!1,isAvailable:n,permissionView:y,revalidate:P}}function $(e){let t=e.trim();return/^\S+?:\/\//i.test(t)?t:`https://${t}`}function ee(e){try{let t=$(e);return new URL(t).hostname}catch{return e}}var l=require("react/jsx-runtime");function ne(e){let[t,r]=(0,re.useState)(e.fallbackText??""),{data:n,isAvailable:i,isLoading:o,permissionView:c,revalidate:g}=Z(t,25);if(c)return c;let y=t.trim().length>0;return(0,l.jsxs)(a.List,{isLoading:o,searchText:t,onSearchTextChange:r,searchBarPlaceholder:"Search browsing history...",throttle:!0,children:[!i&&!o&&(0,l.jsx)(a.List.EmptyView,{icon:a.Icon.Clock,title:"History unavailable",description:"No readable Helium History database was found"}),i&&n.length===0&&!o&&y&&(0,l.jsx)(a.List.EmptyView,{icon:a.Icon.Clock,title:"No history found"}),i&&n.length===0&&!o&&!y&&(0,l.jsx)(a.List.EmptyView,{icon:a.Icon.Clock,title:"No recent history"}),n.length>0&&(0,l.jsx)(a.List.Section,{title:y?"History":"Recent History",subtitle:`${n.length} entr${n.length!==1?"ies":"y"}`,children:n.map(P=>(0,l.jsx)(ve,{entry:P,revalidate:g},P.id))})]})}function ve({entry:e,revalidate:t}){let r=ee(e.url);return(0,l.jsx)(a.List.Item,{title:e.title,subtitle:r,keywords:[e.url,e.title],icon:(0,te.getFavicon)(e.url,{fallback:a.Icon.Globe}),accessories:[{text:new Date(e.lastVisitedAt).toLocaleDateString()}],actions:(0,l.jsxs)(a.ActionPanel,{children:[(0,l.jsx)(j,{title:"Open in Helium",url:$(e.url)}),(0,l.jsx)(a.Action.CopyToClipboard,{title:"Copy URL",content:e.url,shortcut:T.copyUrl}),(0,l.jsx)(a.Action.CopyToClipboard,{title:"Copy as Markdown",content:`[${e.title}](${e.url})`,shortcut:T.copyAsMarkdown}),(0,l.jsx)(z,{url:e.url,name:e.title}),(0,l.jsx)(Q,{subject:"History",revalidate:t})]})})}
