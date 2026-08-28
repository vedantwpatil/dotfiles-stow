"use strict";var me=Object.create;var y=Object.defineProperty;var be=Object.getOwnPropertyDescriptor;var ge=Object.getOwnPropertyNames;var ye=Object.getPrototypeOf,$e=Object.prototype.hasOwnProperty;var we=(e,t)=>{for(var r in t)y(e,r,{get:t[r],enumerable:!0})},N=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of ge(t))!$e.call(e,a)&&a!==r&&y(e,a,{get:()=>t[a],enumerable:!(n=be(t,a))||n.enumerable});return e};var T=(e,t,r)=>(r=e!=null?me(ye(e)):{},N(t||!e||!e.__esModule?y(r,"default",{value:e,enumerable:!0}):r,e)),xe=e=>N(y({},"__esModule",{value:!0}),e);var He={};we(He,{default:()=>de});module.exports=xe(He);var x=require("@raycast/api");var M=require("@raycast/api"),z=require("child_process"),m=require("fs"),A=require("os"),d=require("path");function ke(e){try{return(0,m.statSync)(e).isFile()}catch{return!1}}var F=process.platform==="win32";var ve=[(0,d.join)("imput","Helium"),"Helium"],Se=["chrome.exe","helium.exe"],Ee=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function V(){let{heliumPath:e}=(0,M.getPreferenceValues)(),t=e?.trim();return t||void 0}function j(e=process.env,t=(0,A.homedir)()){return H([e.LOCALAPPDATA,(0,d.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function Te(e=process.env,t=(0,A.homedir)()){return H([(0,d.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function H(e){let t=e.filter(r=>!!r).flatMap(r=>ve.map(n=>(0,d.join)(r,n)));return[...new Set(t)]}function B(e=Pe){for(let t of Ee)for(let r of Ae(e(t)))if((0,m.existsSync)(r))return r}function Pe(e){try{return(0,z.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function Ae(e){let t=[],r=!1;for(let n of e.split(/\r?\n/)){if(/^HKEY_/.test(n)){r=/StartMenuInternet\\Helium/i.test(n)&&/\\shell\\open\\command$/i.test(n);continue}if(!r)continue;let a=n.split(/REG_SZ\s+/)[1]?.trim();if(!a)continue;let s=a.match(/^"([^"]+)"/);t.push(s?s[1]:a.split(/\s+/)[0])}return t}function G(e={}){let t="override"in e?e.override:V();if(t&&ke(t))return t;for(let n of j(e.env,e.home))for(let a of Se){let s=(0,d.join)(n,"Application",a);if((0,m.existsSync)(s))return s}return(e.registryLookup??(()=>B()))()}var P;function K(){return P||(P={value:G()}),P.value}function R(){let e=K();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:V(),localAppData:process.env.LOCALAPPDATA,roots:j(),registry:B()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function q(e={}){let t=e.env??process.env,r="override"in e||e.env?G(e):K(),n=[];r&&n.push((0,d.join)((0,d.dirname)((0,d.dirname)(r)),"User Data"));for(let s of Te(t,e.home))n.push((0,d.join)(s,"User Data"));let a=n.find(s=>(0,m.existsSync)(s));return a||n[0]}var h=T(require("react")),o=require("@raycast/api");var L=T(require("node:child_process")),Y=require("node:buffer"),b=T(require("node:stream")),X=require("node:util");var Q=require("react/jsx-runtime");var I=globalThis;var $=e=>!!e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function",_=Symbol.for("signal-exit emitter"),U=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),I[_])return I[_];Object.defineProperty(I,_,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(t,r){this.listeners[t].push(r)}removeListener(t,r){let n=this.listeners[t],a=n.indexOf(r);a!==-1&&(a===0&&n.length===1?n.length=0:n.splice(a,1))}emit(t,r,n){if(this.emitted[t])return!1;this.emitted[t]=!0;let a=!1;for(let s of this.listeners[t])a=s(r,n)===!0||a;return t==="exit"&&(a=this.emit("afterExit",r,n)||a),a}},W=class{onExit(){return()=>{}}load(){}unload(){}},O=class{#o;#t;#e;#s;#i;#a;#n;#r;constructor(t){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new U,this.#a={},this.#n=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=t,this.#a={};for(let r of this.#r)this.#a[r]=()=>{let n=this.#e.listeners(r),{count:a}=this.#t,s=t;if(typeof s.__signal_exit_emitter__=="object"&&typeof s.__signal_exit_emitter__.count=="number"&&(a+=s.__signal_exit_emitter__.count),n.length===a){this.unload();let i=this.#t.emit("exit",null,r),c=r==="SIGHUP"?this.#o:r;i||t.kill(t.pid,c)}};this.#i=t.reallyExit,this.#s=t.emit}onExit(t,r){if(!$(this.#e))return()=>{};this.#n===!1&&this.load();let n=r?.alwaysLast?"afterExit":"exit";return this.#t.on(n,t),()=>{this.#t.removeListener(n,t),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#n){this.#n=!0,this.#t.count+=1;for(let t of this.#r)try{let r=this.#a[t];r&&this.#e.on(t,r)}catch{}this.#e.emit=(t,...r)=>this.#l(t,...r),this.#e.reallyExit=t=>this.#c(t)}}unload(){this.#n&&(this.#n=!1,this.#r.forEach(t=>{let r=this.#a[t];if(!r)throw new Error("Listener not defined for signal: "+t);try{this.#e.removeListener(t,r)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(t){return $(this.#e)?(this.#e.exitCode=t||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(t,...r){let n=this.#s;if(t==="exit"&&$(this.#e)){typeof r[0]=="number"&&(this.#e.exitCode=r[0]);let a=n.call(this.#e,t,...r);return this.#t.emit("exit",this.#e.exitCode,null),a}else return n.call(this.#e,t,...r)}},C=null,Re=(e,t)=>(C||(C=$(process)?new O(process):new W),C.onExit(e,t));function ee(e,{timeout:t}={}){let r=new Promise((c,l)=>{e.on("exit",(u,f)=>{c({exitCode:u,signal:f,timedOut:!1})}),e.on("error",u=>{l(u)}),e.stdin&&e.stdin.on("error",u=>{l(u)})}),n=Re(()=>{e.kill()});if(t===0||t===void 0)return r.finally(()=>n());let a,s=new Promise((c,l)=>{a=setTimeout(()=>{e.kill("SIGTERM"),l(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},t)}),i=r.finally(()=>{clearTimeout(a)});return Promise.race([s,i]).finally(()=>n())}var D=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function Ie(e){let{encoding:t}=e,r=t==="buffer",n=new b.default.PassThrough({objectMode:!1});t&&t!=="buffer"&&n.setEncoding(t);let a=0,s=[];return n.on("data",i=>{s.push(i),a+=i.length}),n.getBufferedValue=()=>r?Buffer.concat(s,a):s.join(""),n.getBufferedLength=()=>a,n}async function J(e,t){let r=Ie(t);return await new Promise((n,a)=>{let s=i=>{i&&r.getBufferedLength()<=Y.constants.MAX_LENGTH&&(i.bufferedData=r.getBufferedValue()),a(i)};(async()=>{try{await(0,X.promisify)(b.default.pipeline)(e,r),n()}catch(i){s(i)}})(),r.on("data",()=>{r.getBufferedLength()>8e7&&s(new D)})}),r.getBufferedValue()}async function Z(e,t){e.destroy();try{return await t}catch(r){return r.bufferedData}}async function te({stdout:e,stderr:t},{encoding:r},n){let a=J(e,{encoding:r}),s=J(t,{encoding:r});try{return await Promise.all([n,a,s])}catch(i){return Promise.all([{error:i,exitCode:null,signal:i.signal,timedOut:i.timedOut||!1},Z(e,a),Z(t,s)])}}function _e(e){let t=typeof e=="string"?`
`:10,r=typeof e=="string"?"\r":13;return e[e.length-1]===t&&(e=e.slice(0,-1)),e[e.length-1]===r&&(e=e.slice(0,-1)),e}function w(e,t){return e.stripFinalNewline?_e(t):t}function Ce({timedOut:e,timeout:t,signal:r,exitCode:n}){return e?`timed out after ${t} milliseconds`:r!=null?`was killed with ${r}`:n!=null?`failed with exit code ${n}`:"failed"}function Ue({stdout:e,stderr:t,error:r,signal:n,exitCode:a,command:s,timedOut:i,options:c,parentError:l}){let f=`Command ${Ce({timedOut:i,timeout:c?.timeout,signal:n,exitCode:a})}: ${s}`,p=r?`${f}
${r.message}`:f,g=[p,t,e].filter(Boolean).join(`
`);return r?r.originalMessage=r.message:r=l,r.message=g,r.shortMessage=p,r.command=s,r.exitCode=a,r.signal=n,r.stdout=e,r.stderr=t,"bufferedData"in r&&delete r.bufferedData,r}function re({stdout:e,stderr:t,error:r,exitCode:n,signal:a,timedOut:s,command:i,options:c,parentError:l}){if(r||n!==0||a!==null)throw Ue({error:r,exitCode:n,signal:a,stdout:e,stderr:t,command:i,timedOut:s,options:c,parentError:l});return e}var Ze=!!process.env.RAYCASTX;async function ne(e,t,r){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:n,language:a,parseOutput:s,timeout:i,...c}=Array.isArray(t)?r||{}:t||{},l=n!==!1?[]:["-ss"];a==="JavaScript"&&l.push("-l","JavaScript"),Array.isArray(t)&&l.push("-",...t);let u=L.default.spawn("osascript",l,{...c,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),f=i??1e4,p=ee(u,{timeout:f});u.stdin.end(e);let[{error:g,exitCode:k,signal:v,timedOut:S},E,fe]=await te(u,{encoding:"utf8"},p),he=w({stripFinalNewline:!0},E),pe=w({stripFinalNewline:!0},fe);return(s??re)({stdout:he,stderr:pe,error:g,exitCode:k,signal:v,timedOut:S,command:"osascript",options:{humanReadableOutput:n,language:a,...c,timeout:f},parentError:new Error})}async function ae(e,t){if(process.platform!=="win32")throw new Error("PowerShell is only supported on Windows");let{parseOutput:r,timeout:n,...a}=t||{},s=["-NoLogo","-NoProfile","-NonInteractive","-Command","-"],i=L.default.spawn("powershell.exe",s,{...a}),c=n??1e4,l=ee(i,{timeout:c});i.stdin.end(e);let[{error:u,exitCode:f,signal:p,timedOut:g},k,v]=await te(i,{encoding:"utf8"},l),S=w({stripFinalNewline:!0},k),E=w({stripFinalNewline:!0},v);return(r??re)({stdout:S,stderr:E,error:u,exitCode:f,signal:p,timedOut:g,command:"powershell.exe",options:{...a,timeout:c},parentError:new Error})}async function se(){await ne(`
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
  `)}var ie=require("child_process"),oe=require("fs");function Oe(e){let t=R();return new Promise((r,n)=>{let a=(0,ie.spawn)(t,[...De(),...e],{detached:!0,stdio:"ignore",windowsHide:!1});a.once("error",s=>n(new Error(`Could not start Helium at ${t}: ${s.message}`))),a.once("spawn",()=>{a.unref(),r()})})}function De(){let e=q();return e&&(0,oe.existsSync)(e)?[`--user-data-dir=${e}`]:[]}var Le="chrome://new-tab-page/",Ne=`
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
`;function Me(e){return`
    $executable = '${ze(e)}'
    $processIds = @(Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.Path -eq $executable } | ForEach-Object { [uint32]$_.Id })
    if ($processIds.Count -eq 0) { 'not-running'; exit }
  `}function ze(e){return e.replace(/'/g,"''")}async function Fe(e,t){try{let r=(await ae(t,{timeout:8e3})).trim(),n=r.split(/\r?\n/).pop()?.trim()??"";return n!=="ok"&&console.error(`[Helium] ${e} did not complete:`,n||"(no output)","| raw:",r),n}catch(r){return console.error(`[Helium] ${e} failed:`,r),""}}async function ce(){if(!await Ve())return Oe([Le])}async function Ve(){let e=R(),t=`
    Add-Type -AssemblyName System.Windows.Forms
    ${Ne}
    ${Me(e)}

    $windows = [HeliumWindows]::All([uint32[]]$processIds)
    if ($windows.Count -eq 0) { 'no-window'; exit }

    $window = $windows[0]
    [HeliumWindows]::Focus($window)
    Start-Sleep -Milliseconds 150
    if ([HeliumWindows]::GetForegroundWindow() -ne $window) { 'not-focused'; exit }

    [System.Windows.Forms.SendKeys]::SendWait('^t')
    'ok'
  `;return await Fe("New tab keystroke",t)==="ok"}async function le(){return F?ce():se()}function ue(e,t){let r=t instanceof Error?t.message.trim():String(t).trim();return r?`${e}: ${r}`:e}async function de(){try{await le(),await(0,x.closeMainWindow)()}catch(e){await(0,x.showHUD)(ue("Failed opening a new Helium tab",e)),console.error("Error opening new tab:",e)}}
