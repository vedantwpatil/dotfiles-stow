"use strict";var l=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var L=Object.prototype.hasOwnProperty;var _=(e,t)=>{for(var n in t)l(e,n,{get:t[n],enumerable:!0})},D=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of C(t))!L.call(e,i)&&i!==n&&l(e,i,{get:()=>t[i],enumerable:!(r=R(t,i))||r.enumerable});return e};var k=e=>D(l({},"__esModule",{value:!0}),e);var te={};_(te,{default:()=>v});module.exports=k(te);var c=require("@raycast/api");var m=require("@raycast/api"),f=require("child_process"),a=require("fs"),d=require("os"),s=require("path");function U(e){try{return(0,a.statSync)(e).isFile()}catch{return!1}}var w=process.platform==="win32";var O=[(0,s.join)("imput","Helium"),"Helium"],F=["chrome.exe","helium.exe"],G=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function h(){let{heliumPath:e}=(0,m.getPreferenceValues)(),t=e?.trim();return t||void 0}function b(e=process.env,t=(0,d.homedir)()){return g([e.LOCALAPPDATA,(0,s.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function B(e=process.env,t=(0,d.homedir)()){return g([(0,s.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function g(e){let t=e.filter(n=>!!n).flatMap(n=>O.map(r=>(0,s.join)(n,r)));return[...new Set(t)]}function y(e=M){for(let t of G)for(let n of j(e(t)))if((0,a.existsSync)(n))return n}function M(e){try{return(0,f.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function j(e){let t=[],n=!1;for(let r of e.split(/\r?\n/)){if(/^HKEY_/.test(r)){n=/StartMenuInternet\\Helium/i.test(r)&&/\\shell\\open\\command$/i.test(r);continue}if(!n)continue;let i=r.split(/REG_SZ\s+/)[1]?.trim();if(!i)continue;let o=i.match(/^"([^"]+)"/);t.push(o?o[1]:i.split(/\s+/)[0])}return t}function T(e={}){let t="override"in e?e.override:h();if(t&&U(t))return t;for(let r of b(e.env,e.home))for(let i of F){let o=(0,s.join)(r,"Application",i);if((0,a.existsSync)(o))return o}return(e.registryLookup??(()=>y()))()}var u;function x(){return u||(u={value:T()}),u.value}function p(){let e=x();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:h(),localAppData:process.env.LOCALAPPDATA,roots:b(),registry:y()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function P(e={}){let t=e.env??process.env,n="override"in e||e.env?T(e):x(),r=[];n&&r.push((0,s.join)((0,s.dirname)((0,s.dirname)(n)),"User Data"));for(let o of B(t,e.home))r.push((0,s.join)(o,"User Data"));let i=r.find(o=>(0,a.existsSync)(o));return i||r[0]}var S=require("@raycast/utils");async function I(){await(0,S.runAppleScript)(`
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
  `)}var W=require("@raycast/utils"),$=require("child_process"),A=require("fs");function K(e){let t=p();return new Promise((n,r)=>{let i=(0,$.spawn)(t,[...V(),...e],{detached:!0,stdio:"ignore",windowsHide:!1});i.once("error",o=>r(new Error(`Could not start Helium at ${t}: ${o.message}`))),i.once("spawn",()=>{i.unref(),n()})})}function V(){let e=P();return e&&(0,A.existsSync)(e)?[`--user-data-dir=${e}`]:[]}var z="chrome://new-tab-page/",X=`
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
`;function J(e){return`
    $executable = '${Y(e)}'
    $processIds = @(Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.Path -eq $executable } | ForEach-Object { [uint32]$_.Id })
    if ($processIds.Count -eq 0) { 'not-running'; exit }
  `}function Y(e){return e.replace(/'/g,"''")}async function Z(e,t){try{let n=(await(0,W.runPowerShellScript)(t,{timeout:8e3})).trim(),r=n.split(/\r?\n/).pop()?.trim()??"";return r!=="ok"&&console.error(`[Helium] ${e} did not complete:`,r||"(no output)","| raw:",n),r}catch(n){return console.error(`[Helium] ${e} failed:`,n),""}}async function H(){if(!await Q())return K([z])}async function Q(){let e=p(),t=`
    Add-Type -AssemblyName System.Windows.Forms
    ${X}
    ${J(e)}

    $windows = [HeliumWindows]::All([uint32[]]$processIds)
    if ($windows.Count -eq 0) { 'no-window'; exit }

    $window = $windows[0]
    [HeliumWindows]::Focus($window)
    Start-Sleep -Milliseconds 150
    if ([HeliumWindows]::GetForegroundWindow() -ne $window) { 'not-focused'; exit }

    [System.Windows.Forms.SendKeys]::SendWait('^t')
    'ok'
  `;return await Z("New tab keystroke",t)==="ok"}async function E(){return w?H():I()}function N(e,t){let n=t instanceof Error?t.message.trim():String(t).trim();return n?`${e}: ${n}`:e}async function v(){try{await E(),await(0,c.closeMainWindow)()}catch(e){await(0,c.showHUD)(N("Failed opening a new Helium tab",e)),console.error("Error opening new tab:",e)}}
