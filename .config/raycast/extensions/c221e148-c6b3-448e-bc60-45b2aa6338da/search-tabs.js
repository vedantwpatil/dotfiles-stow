"use strict";var W=Object.defineProperty;var Le=Object.getOwnPropertyDescriptor;var Be=Object.getOwnPropertyNames;var Ue=Object.prototype.hasOwnProperty;var De=(e,t)=>{for(var r in t)W(e,r,{get:t[r],enumerable:!0})},_e=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Be(t))!Ue.call(e,o)&&o!==r&&W(e,o,{get:()=>t[o],enumerable:!(n=Le(t,o))||n.enumerable});return e};var Me=e=>_e(W({},"__esModule",{value:!0}),e);var ot={};De(ot,{default:()=>Oe});module.exports=Me(ot);var f=require("@raycast/api"),Ne=require("@raycast/utils"),x=require("react");var be=require("@raycast/utils"),v=require("react");var b=require("@raycast/api");var L=require("@raycast/api"),B=require("child_process"),P=require("fs"),E=require("os"),w=require("path");function Ge(e){try{return(0,P.statSync)(e).isFile()}catch{return!1}}var p=process.platform==="win32",Ke="net.imput.helium",qe=[(0,w.join)("imput","Helium"),"Helium"],je=["chrome.exe","helium.exe"],Qe=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function R(){let{heliumPath:e}=(0,L.getPreferenceValues)(),t=e?.trim();return t||void 0}function U(e=process.env,t=(0,E.homedir)()){return D([e.LOCALAPPDATA,(0,w.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function Ve(e=process.env,t=(0,E.homedir)()){return D([(0,w.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function D(e){let t=e.filter(r=>!!r).flatMap(r=>qe.map(n=>(0,w.join)(r,n)));return[...new Set(t)]}function _(e=Xe){for(let t of Qe)for(let r of ze(e(t)))if((0,P.existsSync)(r))return r}function Xe(e){try{return(0,B.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function ze(e){let t=[],r=!1;for(let n of e.split(/\r?\n/)){if(/^HKEY_/.test(n)){r=/StartMenuInternet\\Helium/i.test(n)&&/\\shell\\open\\command$/i.test(n);continue}if(!r)continue;let o=n.split(/REG_SZ\s+/)[1]?.trim();if(!o)continue;let s=o.match(/^"([^"]+)"/);t.push(s?s[1]:o.split(/\s+/)[0])}return t}function M(e={}){let t="override"in e?e.override:R();if(t&&Ge(t))return t;for(let n of U(e.env,e.home))for(let o of je){let s=(0,w.join)(n,"Application",o);if((0,P.existsSync)(s))return s}return(e.registryLookup??(()=>_()))()}var $;function H(){return $||($={value:M()}),$.value}function C(){let e=H();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:R(),localAppData:process.env.LOCALAPPDATA,roots:U(),registry:_()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function G(){return p?H():R()??Ke}function K(e={}){let t=e.env??process.env,r="override"in e||e.env?M(e):H(),n=[];r&&n.push((0,w.join)((0,w.dirname)((0,w.dirname)(r)),"User Data"));for(let s of Ve(t,e.home))n.push((0,w.join)(s,"User Data"));let o=n.find(s=>(0,P.existsSync)(s));return o||n[0]}var A=require("@raycast/utils");function q(e){return!e||e.trim()===""||e.trim()==="not_running"?[]:e.split("").map(t=>t.split("")).filter(t=>t.length>=2&&t[0]).map(([t,r,n=""])=>({heliumId:t,url:r,title:n}))}function j(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}async function Q(){let t=await(0,A.runAppleScript)(`
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
  `,{timeout:5e3});return q(t)}async function V(e){let r=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${j(e)}" then
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
  `;try{return(await(0,A.runAppleScript)(r,{timeout:5e3})).trim()==="success"}catch(n){return console.error("switchToHeliumTabById error:",n),!1}}async function X(e){let r=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${j(e)}" then
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
  `;try{return(await(0,A.runAppleScript)(r,{timeout:5e3})).trim()==="success"}catch(n){return console.error("closeHeliumTabById error:",n),!1}}async function z(){await(0,A.runAppleScript)(`
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
  `)}async function J(e){let t=e.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),r=`
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
  `;await(0,A.runAppleScript)(r)}var Y=require("@raycast/utils"),Z=require("child_process"),ee=require("fs");function te(e){let t=C();return new Promise((r,n)=>{let o=(0,Z.spawn)(t,[...Ye(),...e],{detached:!0,stdio:"ignore",windowsHide:!1});o.once("error",s=>n(new Error(`Could not start Helium at ${t}: ${s.message}`))),o.once("spawn",()=>{o.unref(),r()})})}function Ye(){let e=K();return e&&(0,ee.existsSync)(e)?[`--user-data-dir=${e}`]:[]}var Ze="chrome://new-tab-page/",re=`
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
`;function ne(e){return`
    $executable = '${ie(e)}'
    $processIds = @(Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.Path -eq $executable } | ForEach-Object { [uint32]$_.Id })
    if ($processIds.Count -eq 0) { 'not-running'; exit }
  `}function ie(e){return e.replace(/'/g,"''")}async function oe(e,t){try{let r=(await(0,Y.runPowerShellScript)(t,{timeout:8e3})).trim(),n=r.split(/\r?\n/).pop()?.trim()??"";return n!=="ok"&&console.error(`[Helium] ${e} did not complete:`,n||"(no output)","| raw:",r),n}catch(r){return console.error(`[Helium] ${e} failed:`,r),""}}async function se(e){return te([e])}async function ae(e){if(!e.trim())return!1;let t=C(),r=`
    Add-Type -AssemblyName UIAutomationClient
    Add-Type -AssemblyName UIAutomationTypes
    ${re}
    ${ne(t)}

    $target = '${ie(e)}'
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
  `;return await oe("Tab switch",r)==="ok"}async function ce(){if(!await et())return te([Ze])}async function et(){let e=C(),t=`
    Add-Type -AssemblyName System.Windows.Forms
    ${re}
    ${ne(e)}

    $windows = [HeliumWindows]::All([uint32[]]$processIds)
    if ($windows.Count -eq 0) { 'no-window'; exit }

    $window = $windows[0]
    [HeliumWindows]::Focus($window)
    Start-Sleep -Milliseconds 150
    if ([HeliumWindows]::GetForegroundWindow() -ne $window) { 'not-focused'; exit }

    [System.Windows.Forms.SendKeys]::SendWait('^t')
    'ok'
  `;return await oe("New tab keystroke",t)==="ok"}var S=!p,rt="Closing Helium tabs is only available on macOS";async function N(e){return p?se(e):J(e)}async function le(){return p?ce():z()}async function ue(){return p?[]:Q()}async function de(e){return p?ae(e.title):V(e.id)}async function O(e){if(p)throw new Error(rt);return X(e)}function pe(e){return e.map(t=>({id:String(t.id),url:t.url,title:t.title||"",favicon:t.favicon}))}function fe(e,t){let r=new Map;for(let n of t)n.favicon&&!r.has(n.url)&&r.set(n.url,n.favicon);return e.map(n=>({id:n.heliumId,url:n.url,title:n.title||"",favicon:r.get(n.url)}))}function me(){return b.environment.canAccess(b.BrowserExtension)}async function k(){if(p)return me()?pe(await b.BrowserExtension.getTabs()):[];let[e,t]=await Promise.all([ue(),me()?nt(b.BrowserExtension.getTabs(),250,[]).catch(()=>[]):Promise.resolve([])]);return fe(e,t)}async function we(){try{return await k()}catch(e){return await(0,b.showToast)({style:b.Toast.Style.Failure,title:"Failed to Get Tabs",message:e instanceof Error?e.message:"Unknown error occurred"}),[]}}async function nt(e,t,r){let n;try{return await Promise.race([e,new Promise(o=>{n=setTimeout(()=>o(r),t)})])}finally{n&&clearTimeout(n)}}function he(){let[e,t]=(0,v.useState)(),r=(0,be.useCachedPromise)(k,[],{initialData:[],keepPreviousData:!0,failureToastOptions:{title:"Failed to Get Tabs"},onData:t}),n=(0,v.useCallback)(async()=>{let o=await k();return t(o),await r.mutate(Promise.resolve(o),{optimisticUpdate:()=>o,rollbackOnError:!1,shouldRevalidateAfter:!1}),o},[r.mutate]);return{data:r.data??[],freshTabs:e,isLoading:r.isLoading,mutate:r.mutate,revalidate:n}}var i=require("@raycast/api");var Te=new Set;function ge(e,t){return t.size===0?e:e.filter(r=>!t.has(r.id))}function ye(e,t){let r=new Set(t.map(o=>o.id)),n=[];for(let o of e)r.has(o)||(e.delete(o),n.push(o));return n}function Pe(e,t){let r=new Set(t.map(n=>n.id));return[...e].filter(n=>r.has(n))}function h(e,t,r){return{macOS:{modifiers:e,key:r},Windows:{modifiers:t,key:r}}}var g={newTab:h(["cmd"],["ctrl"],"n"),closeTab:h(["cmd","shift"],["ctrl","shift"],"w"),deduplicateTabs:h(["cmd","shift","ctrl"],["ctrl","shift","alt"],"w"),openInNewTab:h(["cmd","shift"],["ctrl","shift"],"o"),openInDefaultBrowser:h(["cmd","opt"],["ctrl","alt"],"o"),copyUrl:h(["cmd"],["ctrl"],"c"),copyTitle:h(["cmd","shift"],["ctrl","shift"],"c"),copyQuery:h(["cmd","shift"],["ctrl","shift"],"c"),copyAsMarkdown:h(["cmd","opt"],["ctrl","alt"],"c"),createQuicklink:h(["cmd","shift"],["ctrl","shift"],"q")};var m=require("react/jsx-runtime");function F({title:e,url:t,icon:r,shortcut:n}){return p?(0,m.jsx)(i.Action,{title:e,icon:r??i.Icon.Globe,shortcut:n,onAction:async()=>{try{await N(t),await(0,i.closeMainWindow)()}catch(o){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed to open in Helium",message:o instanceof Error?o.message:String(o)})}}}):(0,m.jsx)(i.Action.Open,{title:e,target:t,application:G(),icon:r,shortcut:n})}function Ae({tab:e}){return(0,m.jsx)(i.Action,{title:"Switch to Tab",icon:i.Icon.ArrowRight,onAction:async()=>{try{if(await de(e)){await(0,i.closeMainWindow)();return}if(p){await N(e.url),await(0,i.closeMainWindow)();return}await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Tab not found",message:"The tab may have been closed"})}catch(t){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed to switch to tab",message:t instanceof Error?t.message:String(t)})}}})}function Se(){return(0,m.jsx)(i.Action,{title:"Open New Tab",icon:i.Icon.PlusCircle,shortcut:g.newTab,onAction:async()=>{try{await le(),await(0,i.closeMainWindow)()}catch(e){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed to open new tab",message:e instanceof Error?e.message:String(e)})}}})}function xe({subject:e="List",revalidate:t}){return(0,m.jsx)(i.Action,{title:`Reload ${e}`,icon:i.Icon.ArrowClockwise,shortcut:i.Keyboard.Shortcut.Common.Refresh,onAction:async()=>{await(0,i.showToast)({style:i.Toast.Style.Animated,title:`Reloading ${e.toLowerCase()}\u2026`});try{await Promise.resolve(t()),await(0,i.showToast)({style:i.Toast.Style.Success,title:`${e} reloaded`})}catch(r){await(0,i.showToast)({style:i.Toast.Style.Failure,title:`Failed to reload ${e.toLowerCase()}`,message:r instanceof Error?r.message:String(r)})}}})}function Ie({tab:e,mutate:t,revalidate:r,pendingCloseIdsRef:n}){return S?(0,m.jsx)(i.Action,{title:"Close Tab",icon:i.Icon.XMarkCircle,shortcut:g.closeTab,onAction:async()=>{n.current.add(e.id),await(0,i.showToast)({style:i.Toast.Style.Animated,title:"Closing tab"});try{if(await t(void 0,{optimisticUpdate(a){return a?a.filter(T=>T.id!==e.id):[]},rollbackOnError:!1,shouldRevalidateAfter:!1}),!await O(e.id))throw new Error("Tab not found or failed to close");let s=await Ee(r,[e.id]);s&&n.current.delete(e.id),await(0,i.showToast)({style:i.Toast.Style.Success,title:s?"Tab closed":"Tab close pending"})}catch(o){n.current.delete(e.id);try{await Promise.resolve(r())}catch{await t(void 0,{optimisticUpdate(s){return s?s.some(a=>a.id===e.id)?s:[e,...s]:[e]},rollbackOnError:!1,shouldRevalidateAfter:!1})}await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed to close tab",message:o instanceof Error?o.message:String(o)})}}}):null}function Ce({tab:e}){return(0,m.jsx)(F,{title:"Open in New Tab",url:e.url,icon:i.Icon.PlusCircle,shortcut:g.openInNewTab})}function ke({tab:e}){return(0,m.jsx)(i.Action.CopyToClipboard,{title:"Copy URL",content:e.url,shortcut:g.copyUrl})}function ve({tab:e}){return(0,m.jsx)(i.Action.CopyToClipboard,{title:"Copy Title",content:e.title||"",shortcut:g.copyTitle})}function We({tabs:e,mutate:t,revalidate:r,pendingCloseIdsRef:n}={}){return S?(0,m.jsx)(i.Action,{title:"Deduplicate Tabs",icon:i.Icon.Filter,shortcut:g.deduplicateTabs,onAction:async()=>{try{let o=e??await we(),s=new Set,a=[];for(let u of o)s.has(u.url)?a.push(u):s.add(u.url);if(a.length===0){await(0,i.showToast)({style:i.Toast.Style.Success,title:"No duplicate tabs"});return}await(0,i.showToast)({style:i.Toast.Style.Animated,title:`Closing ${a.length} duplicate tab${a.length===1?"":"s"}`});let T=a.map(u=>u.id),d=t&&r&&n?{mutate:t,revalidate:r,pendingCloseIdsRef:n}:void 0;if(d)for(let u of T)d.pendingCloseIdsRef.current.add(u);let y=[];try{d&&await d.mutate(void 0,{optimisticUpdate(u){if(!u)return[];let I=new Set(T);return u.filter(Fe=>!I.has(Fe.id))},rollbackOnError:!1,shouldRevalidateAfter:!1});for(let u of a)try{await O(u.id)?y.push(u.id):d&&d.pendingCloseIdsRef.current.delete(u.id)}catch{d&&d.pendingCloseIdsRef.current.delete(u.id)}}finally{if(d&&await Ee(d.revalidate,y))for(let I of y)d.pendingCloseIdsRef.current.delete(I)}let c=y.length;await(0,i.showToast)({style:c===a.length?i.Toast.Style.Success:i.Toast.Style.Failure,title:c>0?`Closed ${c}/${a.length} duplicate tab${a.length===1?"":"s"}`:"Failed to close duplicates"})}catch(o){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed to deduplicate tabs",message:o instanceof Error?o.message:String(o)})}}}):null}function $e({url:e,name:t}){return(0,m.jsx)(i.Action.CreateQuicklink,{quicklink:{link:e,name:t},shortcut:g.createQuicklink})}async function Ee(e,t,r=3,n=150){if(t.length===0)return!0;for(let o=0;o<r;o+=1){try{let s=await Promise.resolve(e());if(Array.isArray(s)&&Pe(t,s).length===0)return!0}catch{return!1}o<r-1&&await it(n)}return!1}function it(e){return new Promise(t=>setTimeout(t,e))}function Re(e,t){if(!t)return e;let r=t.toLowerCase().split(/\s+/).filter(n=>n.length>0);return r.length===0?e:e.filter(n=>{let o=n.title?.toLowerCase(),s=n.url.toLowerCase();return r.every(a=>o&&o.includes(a)||s.includes(a))})}var l=require("react/jsx-runtime"),He="https://www.raycast.com/browser-extension";function Oe(){let[e,t]=(0,x.useState)(""),{data:r,freshTabs:n,isLoading:o,mutate:s,revalidate:a}=he(),T=(0,x.useRef)(Te);(0,x.useEffect)(()=>{n&&ye(T.current,n)},[n]);let d=ge(r,T.current),y=d?Re(d,e):[];return(0,l.jsxs)(f.List,{isLoading:o,searchBarPlaceholder:"Search tabs by title or URL...",searchText:e,onSearchTextChange:t,children:[y.length===0&&!o&&(0,l.jsx)(f.List.EmptyView,{icon:f.Icon.Window,title:"No Tabs Found",description:S?"Make sure your browser is running with open tabs":"On Windows, tabs come from Raycast's browser extension \u2014 install it in Helium and make sure Helium is running. It reports tabs from every browser it is installed in, so tabs from other browsers can appear here too.",actions:S?void 0:(0,l.jsxs)(f.ActionPanel,{children:[(0,l.jsx)(F,{title:"Get Raycast Browser Extension",icon:f.Icon.Download,url:He}),(0,l.jsx)(f.Action.CopyToClipboard,{title:"Copy Link",content:He})]})}),y.map(c=>(0,l.jsx)(f.List.Item,{id:c.id,title:c.title||"Untitled",subtitle:c.url,keywords:[c.url,c.title||""],icon:c.favicon||(0,Ne.getFavicon)(c.url,{fallback:f.Icon.Globe}),actions:(0,l.jsxs)(f.ActionPanel,{children:[(0,l.jsx)(Ae,{tab:c}),(0,l.jsx)(Se,{}),(0,l.jsx)(Ie,{tab:c,mutate:s,revalidate:a,pendingCloseIdsRef:T}),(0,l.jsx)(Ce,{tab:c}),(0,l.jsx)(ke,{tab:c}),(0,l.jsx)(ve,{tab:c}),(0,l.jsx)($e,{url:c.url,name:c.title||"Untitled"}),(0,l.jsx)(xe,{subject:"Tabs",revalidate:a}),(0,l.jsx)(We,{tabs:d,mutate:s,revalidate:a,pendingCloseIdsRef:T})]})},c.id))]})}
