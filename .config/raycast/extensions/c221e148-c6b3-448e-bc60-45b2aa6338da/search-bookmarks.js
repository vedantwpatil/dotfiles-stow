"use strict";var H=Object.defineProperty;var He=Object.getOwnPropertyDescriptor;var Ee=Object.getOwnPropertyNames;var ve=Object.prototype.hasOwnProperty;var Re=(e,t)=>{for(var n in t)H(e,n,{get:t[n],enumerable:!0})},We=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Ee(t))!ve.call(e,i)&&i!==n&&H(e,i,{get:()=>t[i],enumerable:!(r=He(t,i))||r.enumerable});return e};var $e=e=>We(H({},"__esModule",{value:!0}),e);var dt={};Re(dt,{default:()=>Ie});module.exports=$e(dt);var l=require("@raycast/api"),I=require("@raycast/utils"),xe=require("react");var q=require("fs");var g=require("fs"),G=require("os"),T=require("path");var F=require("@raycast/api"),N=require("child_process"),k=require("fs"),v=require("os"),m=require("path");function Be(e){try{return(0,k.statSync)(e).isFile()}catch{return!1}}var d=process.platform==="win32",Ue="net.imput.helium",Fe=[(0,m.join)("imput","Helium"),"Helium"],Ne=["chrome.exe","helium.exe"],Le=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function R(){let{heliumPath:e}=(0,F.getPreferenceValues)(),t=e?.trim();return t||void 0}function L(e=process.env,t=(0,v.homedir)()){return O([e.LOCALAPPDATA,(0,m.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function Oe(e=process.env,t=(0,v.homedir)()){return O([(0,m.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function O(e){let t=e.filter(n=>!!n).flatMap(n=>Fe.map(r=>(0,m.join)(n,r)));return[...new Set(t)]}function _(e=_e){for(let t of Le)for(let n of De(e(t)))if((0,k.existsSync)(n))return n}function _e(e){try{return(0,N.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function De(e){let t=[],n=!1;for(let r of e.split(/\r?\n/)){if(/^HKEY_/.test(r)){n=/StartMenuInternet\\Helium/i.test(r)&&/\\shell\\open\\command$/i.test(r);continue}if(!n)continue;let i=r.split(/REG_SZ\s+/)[1]?.trim();if(!i)continue;let s=i.match(/^"([^"]+)"/);t.push(s?s[1]:i.split(/\s+/)[0])}return t}function D(e={}){let t="override"in e?e.override:R();if(t&&Be(t))return t;for(let r of L(e.env,e.home))for(let i of Ne){let s=(0,m.join)(r,"Application",i);if((0,k.existsSync)(s))return s}return(e.registryLookup??(()=>_()))()}var E;function W(){return E||(E={value:D()}),E.value}function $(){let e=W();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:R(),localAppData:process.env.LOCALAPPDATA,roots:L(),registry:_()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function M(){return d?W():R()??Ue}function x(e={}){let t=e.env??process.env,n="override"in e||e.env?D(e):W(),r=[];n&&r.push((0,m.join)((0,m.dirname)((0,m.dirname)(n)),"User Data"));for(let s of Oe(t,e.home))r.push((0,m.join)(s,"User Data"));let i=r.find(s=>(0,k.existsSync)(s));return i||r[0]}var Me=(0,T.join)("Library","Application Support","net.imput.helium");function K(e=(0,G.homedir)()){return d?x()??(0,T.join)(e,"AppData","Local","imput","Helium","User Data"):(0,T.join)(e,Me)}function j(e,t=K()){for(let n of Ge(t)){let r=(0,T.join)(t,n,e);if((0,g.existsSync)(r))return r}}function Ge(e=K()){let t=new Set,n=Ke((0,T.join)(e,"Local State")),r=B(B(n)?.profile),i=je(r?.last_used);i&&t.add(i);for(let a of qe(r?.last_active_profiles))t.add(a);let s=B(r?.info_cache);if(s)for(let a of Object.keys(s))t.add(a);t.add("Default");try{for(let a of(0,g.readdirSync)(e)){let y=(0,T.join)(e,a);(0,g.statSync)(y).isDirectory()&&(0,g.existsSync)((0,T.join)(y,"Preferences"))&&t.add(a)}}catch{}return[...t]}function Ke(e){if(!(!e||!(0,g.existsSync)(e)))try{return JSON.parse((0,g.readFileSync)(e,"utf8"))}catch{return}}function B(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:void 0}function je(e){return typeof e=="string"?e:void 0}function qe(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Q(e,t,n){if(e.type==="url"&&e.url){n.push({id:e.guid??e.id??e.url,url:e.url,title:e.name?.trim()||"Untitled",folder:t||void 0});return}if(Array.isArray(e.children))for(let r of e.children){let i=r.type==="folder"&&r.name?t?`${t}/${r.name}`:r.name:t;Q(r,i,n)}}function Qe(e){let t=e?.roots;if(!t||typeof t!="object")return[];let n=[];for(let r of Object.values(t))r&&typeof r=="object"&&Q(r,"",n);return n}async function V(){let e=j("Bookmarks");if(!e)return[];try{let t=await q.promises.readFile(e,"utf8");return Qe(JSON.parse(t))}catch(t){throw console.error("Error reading Helium bookmarks file:",t),new Error("Failed to read bookmarks from the Helium profile")}}var o=require("@raycast/api");var S=require("@raycast/utils");function J(e){return!e||e.trim()===""||e.trim()==="not_running"?[]:e.split("").map(t=>t.split("")).filter(t=>t.length>=2&&t[0]).map(([t,n,r=""])=>({heliumId:t,url:n,title:r}))}function Ve(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}async function X(){let t=await(0,S.runAppleScript)(`
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
  `,{timeout:5e3});return J(t)}async function z(e){let n=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${Ve(e)}" then
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
  `;try{return(await(0,S.runAppleScript)(n,{timeout:5e3})).trim()==="success"}catch(r){return console.error("closeHeliumTabById error:",r),!1}}async function Y(){await(0,S.runAppleScript)(`
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
  `)}async function Z(e){let t=e.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),n=`
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
  `;await(0,S.runAppleScript)(n)}var ee=require("@raycast/utils"),te=require("child_process"),re=require("fs");function ne(e){let t=$();return new Promise((n,r)=>{let i=(0,te.spawn)(t,[...Xe(),...e],{detached:!0,stdio:"ignore",windowsHide:!1});i.once("error",s=>r(new Error(`Could not start Helium at ${t}: ${s.message}`))),i.once("spawn",()=>{i.unref(),n()})})}function Xe(){let e=x();return e&&(0,re.existsSync)(e)?[`--user-data-dir=${e}`]:[]}var ze="chrome://new-tab-page/",Ye=`
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
`;function Ze(e){return`
    $executable = '${et(e)}'
    $processIds = @(Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.Path -eq $executable } | ForEach-Object { [uint32]$_.Id })
    if ($processIds.Count -eq 0) { 'not-running'; exit }
  `}function et(e){return e.replace(/'/g,"''")}async function tt(e,t){try{let n=(await(0,ee.runPowerShellScript)(t,{timeout:8e3})).trim(),r=n.split(/\r?\n/).pop()?.trim()??"";return r!=="ok"&&console.error(`[Helium] ${e} did not complete:`,r||"(no output)","| raw:",n),r}catch(n){return console.error(`[Helium] ${e} failed:`,n),""}}async function oe(e){return ne([e])}async function ie(){if(!await rt())return ne([ze])}async function rt(){let e=$(),t=`
    Add-Type -AssemblyName System.Windows.Forms
    ${Ye}
    ${Ze(e)}

    $windows = [HeliumWindows]::All([uint32[]]$processIds)
    if ($windows.Count -eq 0) { 'no-window'; exit }

    $window = $windows[0]
    [HeliumWindows]::Focus($window)
    Start-Sleep -Milliseconds 150
    if ([HeliumWindows]::GetForegroundWindow() -ne $window) { 'not-focused'; exit }

    [System.Windows.Forms.SendKeys]::SendWait('^t')
    'ok'
  `;return await tt("New tab keystroke",t)==="ok"}var se=!d,ot="Closing Helium tabs is only available on macOS";async function U(e){return d?oe(e):Z(e)}async function ae(){return d?ie():Y()}async function ce(){return d?[]:X()}async function le(e){if(d)throw new Error(ot);return z(e)}var w=require("@raycast/api");function ue(e){return e.map(t=>({id:String(t.id),url:t.url,title:t.title||"",favicon:t.favicon}))}function de(e,t){let n=new Map;for(let r of t)r.favicon&&!n.has(r.url)&&n.set(r.url,r.favicon);return e.map(r=>({id:r.heliumId,url:r.url,title:r.title||"",favicon:n.get(r.url)}))}function fe(){return w.environment.canAccess(w.BrowserExtension)}async function it(){if(d)return fe()?ue(await w.BrowserExtension.getTabs()):[];let[e,t]=await Promise.all([ce(),fe()?st(w.BrowserExtension.getTabs(),250,[]).catch(()=>[]):Promise.resolve([])]);return de(e,t)}async function pe(){try{return await it()}catch(e){return await(0,w.showToast)({style:w.Toast.Style.Failure,title:"Failed to Get Tabs",message:e instanceof Error?e.message:"Unknown error occurred"}),[]}}async function st(e,t,n){let r;try{return await Promise.race([e,new Promise(i=>{r=setTimeout(()=>i(n),t)})])}finally{r&&clearTimeout(r)}}function me(e,t){let n=new Set(t.map(r=>r.id));return[...e].filter(r=>n.has(r))}function h(e,t,n){return{macOS:{modifiers:e,key:n},Windows:{modifiers:t,key:n}}}var b={newTab:h(["cmd"],["ctrl"],"n"),closeTab:h(["cmd","shift"],["ctrl","shift"],"w"),deduplicateTabs:h(["cmd","shift","ctrl"],["ctrl","shift","alt"],"w"),openInNewTab:h(["cmd","shift"],["ctrl","shift"],"o"),openInDefaultBrowser:h(["cmd","opt"],["ctrl","alt"],"o"),copyUrl:h(["cmd"],["ctrl"],"c"),copyTitle:h(["cmd","shift"],["ctrl","shift"],"c"),copyQuery:h(["cmd","shift"],["ctrl","shift"],"c"),copyAsMarkdown:h(["cmd","opt"],["ctrl","alt"],"c"),createQuicklink:h(["cmd","shift"],["ctrl","shift"],"q")};var f=require("react/jsx-runtime");function at({title:e,url:t,icon:n,shortcut:r}){return d?(0,f.jsx)(o.Action,{title:e,icon:n??o.Icon.Globe,shortcut:r,onAction:async()=>{try{await U(t),await(0,o.closeMainWindow)()}catch(i){await(0,o.showToast)({style:o.Toast.Style.Failure,title:"Failed to open in Helium",message:i instanceof Error?i.message:String(i)})}}}):(0,f.jsx)(o.Action.Open,{title:e,target:t,application:M(),icon:n,shortcut:r})}function we(){return(0,f.jsx)(o.Action,{title:"Open New Tab",icon:o.Icon.PlusCircle,shortcut:b.newTab,onAction:async()=>{try{await ae(),await(0,o.closeMainWindow)()}catch(e){await(0,o.showToast)({style:o.Toast.Style.Failure,title:"Failed to open new tab",message:e instanceof Error?e.message:String(e)})}}})}function ge({subject:e="List",revalidate:t}){return(0,f.jsx)(o.Action,{title:`Reload ${e}`,icon:o.Icon.ArrowClockwise,shortcut:o.Keyboard.Shortcut.Common.Refresh,onAction:async()=>{await(0,o.showToast)({style:o.Toast.Style.Animated,title:`Reloading ${e.toLowerCase()}\u2026`});try{await Promise.resolve(t()),await(0,o.showToast)({style:o.Toast.Style.Success,title:`${e} reloaded`})}catch(n){await(0,o.showToast)({style:o.Toast.Style.Failure,title:`Failed to reload ${e.toLowerCase()}`,message:n instanceof Error?n.message:String(n)})}}})}function he({tabs:e,mutate:t,revalidate:n,pendingCloseIdsRef:r}={}){return se?(0,f.jsx)(o.Action,{title:"Deduplicate Tabs",icon:o.Icon.Filter,shortcut:b.deduplicateTabs,onAction:async()=>{try{let i=e??await pe(),s=new Set,a=[];for(let u of i)s.has(u.url)?a.push(u):s.add(u.url);if(a.length===0){await(0,o.showToast)({style:o.Toast.Style.Success,title:"No duplicate tabs"});return}await(0,o.showToast)({style:o.Toast.Style.Animated,title:`Closing ${a.length} duplicate tab${a.length===1?"":"s"}`});let y=a.map(u=>u.id),p=t&&n&&r?{mutate:t,revalidate:n,pendingCloseIdsRef:r}:void 0;if(p)for(let u of y)p.pendingCloseIdsRef.current.add(u);let A=[];try{p&&await p.mutate(void 0,{optimisticUpdate(u){if(!u)return[];let P=new Set(y);return u.filter(Ce=>!P.has(Ce.id))},rollbackOnError:!1,shouldRevalidateAfter:!1});for(let u of a)try{await le(u.id)?A.push(u.id):p&&p.pendingCloseIdsRef.current.delete(u.id)}catch{p&&p.pendingCloseIdsRef.current.delete(u.id)}}finally{if(p&&await ct(p.revalidate,A))for(let P of A)p.pendingCloseIdsRef.current.delete(P)}let C=A.length;await(0,o.showToast)({style:C===a.length?o.Toast.Style.Success:o.Toast.Style.Failure,title:C>0?`Closed ${C}/${a.length} duplicate tab${a.length===1?"":"s"}`:"Failed to close duplicates"})}catch(i){await(0,o.showToast)({style:o.Toast.Style.Failure,title:"Failed to deduplicate tabs",message:i instanceof Error?i.message:String(i)})}}}):null}function be({bookmark:e}){return(0,f.jsx)(o.Action,{title:"Open Bookmark",icon:o.Icon.ArrowRight,onAction:async()=>{try{await U(e.url),await(0,o.closeMainWindow)()}catch(t){await(0,o.showToast)({style:o.Toast.Style.Failure,title:"Failed to open bookmark",message:t instanceof Error?t.message:String(t)})}}})}function ye({bookmark:e}){return(0,f.jsx)(at,{title:"Open in New Tab",url:e.url,icon:o.Icon.PlusCircle,shortcut:b.openInNewTab})}function Te({bookmark:e}){return(0,f.jsx)(o.Action.CopyToClipboard,{title:"Copy URL",content:e.url,shortcut:b.copyUrl})}function ke({bookmark:e}){return(0,f.jsx)(o.Action.CopyToClipboard,{title:"Copy Title",content:e.title,shortcut:b.copyTitle})}function Se({bookmark:e}){return(0,f.jsx)(o.Action.CopyToClipboard,{title:"Copy as Markdown",content:`[${e.title}](${e.url})`,shortcut:b.copyAsMarkdown})}function Ae({url:e,name:t}){return(0,f.jsx)(o.Action.CreateQuicklink,{quicklink:{link:e,name:t},shortcut:b.createQuicklink})}async function ct(e,t,n=3,r=150){if(t.length===0)return!0;for(let i=0;i<n;i+=1){try{let s=await Promise.resolve(e());if(Array.isArray(s)&&me(t,s).length===0)return!0}catch{return!1}i<n-1&&await lt(r)}return!1}function lt(e){return new Promise(t=>setTimeout(t,e))}function Pe(e,t){if(!t)return e;let n=t.toLowerCase().split(/\s+/).filter(r=>r.length>0);return n.length===0?e:e.filter(r=>{let i=r.title?.toLowerCase(),s=r.url.toLowerCase();return n.every(a=>i&&i.includes(a)||s.includes(a))})}var c=require("react/jsx-runtime");function Ie(){let[e,t]=(0,xe.useState)(""),{data:n,isLoading:r,error:i,revalidate:s}=(0,I.usePromise)(V),a=n?Pe(n,e):[];return i?(0,c.jsx)(l.List,{children:(0,c.jsx)(l.List.EmptyView,{icon:l.Icon.XMarkCircle,title:"Failed to Load Bookmarks",description:"There was an error reading your bookmarks file. Make sure Helium is installed and you have bookmarks saved."})}):(0,c.jsxs)(l.List,{isLoading:r,searchBarPlaceholder:"Search bookmarks by title or URL...",onSearchTextChange:t,throttle:!0,children:[a.length===0&&!r&&(0,c.jsx)(l.List.EmptyView,{icon:l.Icon.Bookmark,title:e?"No Bookmarks Found":"No Bookmarks",description:e?"Try a different search query":"You don't have any bookmarks yet. Start bookmarking pages in Helium!"}),a.map(y=>(0,c.jsx)(ut,{bookmark:y,revalidate:s},y.id))]})}function ut({bookmark:e,revalidate:t}){let n=[];return e.folder&&n.push({text:e.folder,icon:l.Icon.Folder}),(0,c.jsx)(l.List.Item,{title:e.title||"Untitled",subtitle:e.url,keywords:[e.url,e.title],icon:(0,I.getFavicon)(e.url,{fallback:l.Icon.Bookmark}),accessories:n,actions:(0,c.jsx)(l.ActionPanel,{children:(0,c.jsxs)(l.ActionPanel.Section,{children:[(0,c.jsx)(be,{bookmark:e}),(0,c.jsx)(ye,{bookmark:e}),(0,c.jsx)(we,{}),(0,c.jsx)(Te,{bookmark:e}),(0,c.jsx)(ke,{bookmark:e}),(0,c.jsx)(Se,{bookmark:e}),(0,c.jsx)(Ae,{url:e.url,name:e.title||"Untitled"}),(0,c.jsx)(l.Action.Open,{title:"Open in Default Browser",target:e.url,icon:l.Icon.Globe,shortcut:b.openInDefaultBrowser}),(0,c.jsx)(ge,{subject:"Bookmarks",revalidate:t}),(0,c.jsx)(he,{})]})})})}
