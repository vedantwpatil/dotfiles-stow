"use strict";var Pa=Object.create;var Le=Object.defineProperty;var Ea=Object.getOwnPropertyDescriptor;var Ca=Object.getOwnPropertyNames;var fa=Object.getPrototypeOf,Da=Object.prototype.hasOwnProperty;var nt=(t,a,e)=>()=>{if(e)throw e[0];try{return t&&(a=t(t=0)),a}catch(n){throw e=[n],n}};var ye=(t,a)=>{for(var e in a)Le(t,e,{get:a[e],enumerable:!0})},Oe=(t,a,e,n)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of Ca(a))!Da.call(t,r)&&r!==e&&Le(t,r,{get:()=>a[r],enumerable:!(n=Ea(a,r))||n.enumerable});return t},B=(t,a,e)=>(Oe(t,a,"default"),e&&Oe(e,a,"default")),Q=(t,a,e)=>(e=t!=null?Pa(fa(t)):{},Oe(a||!t||!t.__esModule?Le(e,"default",{value:t,enumerable:!0}):e,t)),xa=t=>Oe(Le({},"__esModule",{value:!0}),t);var O={};ye(O,{default:()=>Mt.default});var Mt,qe=nt(()=>{B(O,require("formdata-polyfill/esm.min.js"));Mt=Q(require("formdata-polyfill/esm.min.js"))});var q={};ye(q,{default:()=>Pt.default});var Pt,it=nt(()=>{B(q,require("fetch-blob/from.js"));Pt=Q(require("fetch-blob/from.js"))});var Ct={};ye(Ct,{toFormData:()=>Ba});function wa(t){let a=t.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);if(!a)return;let e=a[2]||a[3]||"",n=e.slice(e.lastIndexOf("\\")+1);return n=n.replace(/%22/g,'"'),n=n.replace(/&#(\d{4});/g,(r,o)=>String.fromCharCode(o)),n}async function Ba(t,a){if(!/multipart/i.test(a))throw new TypeError("Failed to fetch");let e=a.match(/boundary=(?:"([^"]+)"|([^;]+))/i);if(!e)throw new TypeError("no or bad content-type header, no multipart boundary");let n=new st(e[1]||e[2]),r,o,p,c,s,u,I=[],g=new O.FormData,D=P=>{p+=A.decode(P,{stream:!0})},U=P=>{I.push(P)},y=()=>{let P=new q.File(I,u,{type:s});g.append(c,P)},f=()=>{g.append(c,p)},A=new TextDecoder("utf-8");A.decode(),n.onPartBegin=function(){n.onPartData=D,n.onPartEnd=f,r="",o="",p="",c="",s="",u=null,I.length=0},n.onHeaderField=function(P){r+=A.decode(P,{stream:!0})},n.onHeaderValue=function(P){o+=A.decode(P,{stream:!0})},n.onHeaderEnd=function(){if(o+=A.decode(),r=r.toLowerCase(),r==="content-disposition"){let P=o.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);P&&(c=P[2]||P[3]||""),u=wa(o),u&&(n.onPartData=U,n.onPartEnd=y)}else r==="content-type"&&(s=o);o="",r=""};for await(let P of t)n.write(P);return n.end(),g}var W,C,Et,oe,je,ke,Ua,Pe,_a,va,ha,Ta,se,st,ft=nt(()=>{it();qe();W=0,C={START_BOUNDARY:W++,HEADER_FIELD_START:W++,HEADER_FIELD:W++,HEADER_VALUE_START:W++,HEADER_VALUE:W++,HEADER_VALUE_ALMOST_DONE:W++,HEADERS_ALMOST_DONE:W++,PART_DATA_START:W++,PART_DATA:W++,END:W++},Et=1,oe={PART_BOUNDARY:Et,LAST_BOUNDARY:Et*=2},je=10,ke=13,Ua=32,Pe=45,_a=58,va=97,ha=122,Ta=t=>t|32,se=()=>{},st=class{constructor(a){this.index=0,this.flags=0,this.onHeaderEnd=se,this.onHeaderField=se,this.onHeadersEnd=se,this.onHeaderValue=se,this.onPartBegin=se,this.onPartData=se,this.onPartEnd=se,this.boundaryChars={},a=`\r
--`+a;let e=new Uint8Array(a.length);for(let n=0;n<a.length;n++)e[n]=a.charCodeAt(n),this.boundaryChars[e[n]]=!0;this.boundary=e,this.lookbehind=new Uint8Array(this.boundary.length+8),this.state=C.START_BOUNDARY}write(a){let e=0,n=a.length,r=this.index,{lookbehind:o,boundary:p,boundaryChars:c,index:s,state:u,flags:I}=this,g=this.boundary.length,D=g-1,U=a.length,y,f,A=b=>{this[b+"Mark"]=e},P=b=>{delete this[b+"Mark"]},l=(b,M,E,ne)=>{(M===void 0||M!==E)&&this[b](ne&&ne.subarray(M,E))},S=(b,M)=>{let E=b+"Mark";E in this&&(M?(l(b,this[E],e,a),delete this[E]):(l(b,this[E],a.length,a),this[E]=0))};for(e=0;e<n;e++)switch(y=a[e],u){case C.START_BOUNDARY:if(s===p.length-2){if(y===Pe)I|=oe.LAST_BOUNDARY;else if(y!==ke)return;s++;break}else if(s-1===p.length-2){if(I&oe.LAST_BOUNDARY&&y===Pe)u=C.END,I=0;else if(!(I&oe.LAST_BOUNDARY)&&y===je)s=0,l("onPartBegin"),u=C.HEADER_FIELD_START;else return;break}y!==p[s+2]&&(s=-2),y===p[s+2]&&s++;break;case C.HEADER_FIELD_START:u=C.HEADER_FIELD,A("onHeaderField"),s=0;case C.HEADER_FIELD:if(y===ke){P("onHeaderField"),u=C.HEADERS_ALMOST_DONE;break}if(s++,y===Pe)break;if(y===_a){if(s===1)return;S("onHeaderField",!0),u=C.HEADER_VALUE_START;break}if(f=Ta(y),f<va||f>ha)return;break;case C.HEADER_VALUE_START:if(y===Ua)break;A("onHeaderValue"),u=C.HEADER_VALUE;case C.HEADER_VALUE:y===ke&&(S("onHeaderValue",!0),l("onHeaderEnd"),u=C.HEADER_VALUE_ALMOST_DONE);break;case C.HEADER_VALUE_ALMOST_DONE:if(y!==je)return;u=C.HEADER_FIELD_START;break;case C.HEADERS_ALMOST_DONE:if(y!==je)return;l("onHeadersEnd"),u=C.PART_DATA_START;break;case C.PART_DATA_START:u=C.PART_DATA,A("onPartData");case C.PART_DATA:if(r=s,s===0){for(e+=D;e<U&&!(a[e]in c);)e+=g;e-=D,y=a[e]}if(s<p.length)p[s]===y?(s===0&&S("onPartData",!0),s++):s=0;else if(s===p.length)s++,y===ke?I|=oe.PART_BOUNDARY:y===Pe?I|=oe.LAST_BOUNDARY:s=0;else if(s-1===p.length)if(I&oe.PART_BOUNDARY){if(s=0,y===je){I&=~oe.PART_BOUNDARY,l("onPartEnd"),l("onPartBegin"),u=C.HEADER_FIELD_START;break}}else I&oe.LAST_BOUNDARY&&y===Pe?(l("onPartEnd"),u=C.END,I=0):s=0;if(s>0)o[s-1]=y;else if(r>0){let b=new Uint8Array(o.buffer,o.byteOffset,o.byteLength);l("onPartData",0,r,b),r=0,A("onPartData"),e--}break;case C.END:break;default:throw new Error(`Unexpected state entered: ${u}`)}S("onHeaderField"),S("onHeaderValue"),S("onPartData"),this.index=s,this.state=u,this.flags=I}end(){if(this.state===C.HEADER_FIELD_START&&this.index===0||this.state===C.PART_DATA&&this.index===this.boundary.length)this.onPartEnd();else if(this.state!==C.END)throw new Error("MultipartParser.end(): stream ended unexpectedly")}}});var on={};ye(on,{default:()=>nn});module.exports=xa(on);var Be=require("@raycast/api"),Ia=require("@raycast/utils"),ga=require("react");var Ie=require("@raycast/api");var R=require("@raycast/api"),le=require("@raycast/utils"),ca=require("react");var Qt=require("@octokit/rest"),$t=require("@raycast/api"),Wt=require("@raycast/utils"),Kt=require("graphql-request");var Ft=Q(require("node:http"),1),jt=Q(require("node:https"),1),pe=Q(require("node:zlib"),1),k=Q(require("node:stream"),1),fe=require("node:buffer");var me={};ye(me,{default:()=>Ve.default});B(me,require("data-uri-to-buffer"));var Ve=Q(require("data-uri-to-buffer"));var z=Q(require("node:stream"),1),ee=require("node:util"),F=require("node:buffer");var Re={};ye(Re,{default:()=>Ne.default});B(Re,require("fetch-blob"));var Ne=Q(require("fetch-blob"));qe();var J=class extends Error{constructor(a,e){super(a),Error.captureStackTrace(this,this.constructor),this.type=e}get name(){return this.constructor.name}get[Symbol.toStringTag](){return this.constructor.name}};var L=class extends J{constructor(a,e,n){super(a,e),n&&(this.code=this.errno=n.code,this.erroredSysCall=n.syscall)}};var Fe=Symbol.toStringTag,ot=t=>typeof t=="object"&&typeof t.append=="function"&&typeof t.delete=="function"&&typeof t.get=="function"&&typeof t.getAll=="function"&&typeof t.has=="function"&&typeof t.set=="function"&&typeof t.sort=="function"&&t[Fe]==="URLSearchParams",Ae=t=>t&&typeof t=="object"&&typeof t.arrayBuffer=="function"&&typeof t.type=="string"&&typeof t.stream=="function"&&typeof t.constructor=="function"&&/^(Blob|File)$/.test(t[Fe]),mt=t=>typeof t=="object"&&(t[Fe]==="AbortSignal"||t[Fe]==="EventTarget"),Rt=(t,a)=>{let e=new URL(a).hostname,n=new URL(t).hostname;return e===n||e.endsWith(`.${n}`)},At=(t,a)=>{let e=new URL(a).protocol,n=new URL(t).protocol;return e===n};var Oa=(0,ee.promisify)(z.default.pipeline),V=Symbol("Body internals"),K=class{constructor(a,{size:e=0}={}){let n=null;a===null?a=null:ot(a)?a=F.Buffer.from(a.toString()):Ae(a)||F.Buffer.isBuffer(a)||(ee.types.isAnyArrayBuffer(a)?a=F.Buffer.from(a):ArrayBuffer.isView(a)?a=F.Buffer.from(a.buffer,a.byteOffset,a.byteLength):a instanceof z.default||(a instanceof O.FormData?(a=(0,O.formDataToBlob)(a),n=a.type.split("=")[1]):a=F.Buffer.from(String(a))));let r=a;F.Buffer.isBuffer(a)?r=z.default.Readable.from(a):Ae(a)&&(r=z.default.Readable.from(a.stream())),this[V]={body:a,stream:r,boundary:n,disturbed:!1,error:null},this.size=e,a instanceof z.default&&a.on("error",o=>{let p=o instanceof J?o:new L(`Invalid response body while trying to fetch ${this.url}: ${o.message}`,"system",o);this[V].error=p})}get body(){return this[V].stream}get bodyUsed(){return this[V].disturbed}async arrayBuffer(){let{buffer:a,byteOffset:e,byteLength:n}=await ut(this);return a.slice(e,e+n)}async formData(){let a=this.headers.get("content-type");if(a.startsWith("application/x-www-form-urlencoded")){let n=new O.FormData,r=new URLSearchParams(await this.text());for(let[o,p]of r)n.append(o,p);return n}let{toFormData:e}=await Promise.resolve().then(()=>(ft(),Ct));return e(this.body,a)}async blob(){let a=this.headers&&this.headers.get("content-type")||this[V].body&&this[V].body.type||"",e=await this.arrayBuffer();return new Ne.default([e],{type:a})}async json(){let a=await this.text();return JSON.parse(a)}async text(){let a=await ut(this);return new TextDecoder().decode(a)}buffer(){return ut(this)}};K.prototype.buffer=(0,ee.deprecate)(K.prototype.buffer,"Please use 'response.arrayBuffer()' instead of 'response.buffer()'","node-fetch#buffer");Object.defineProperties(K.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0},data:{get:(0,ee.deprecate)(()=>{},"data doesn't exist, use json(), text(), arrayBuffer(), or body instead","https://github.com/node-fetch/node-fetch/issues/1000 (response)")}});async function ut(t){if(t[V].disturbed)throw new TypeError(`body used already for: ${t.url}`);if(t[V].disturbed=!0,t[V].error)throw t[V].error;let{body:a}=t;if(a===null)return F.Buffer.alloc(0);if(!(a instanceof z.default))return F.Buffer.alloc(0);let e=[],n=0;try{for await(let r of a){if(t.size>0&&n+r.length>t.size){let o=new L(`content size at ${t.url} over limit: ${t.size}`,"max-size");throw a.destroy(o),o}n+=r.length,e.push(r)}}catch(r){throw r instanceof J?r:new L(`Invalid response body while trying to fetch ${t.url}: ${r.message}`,"system",r)}if(a.readableEnded===!0||a._readableState.ended===!0)try{return e.every(r=>typeof r=="string")?F.Buffer.from(e.join("")):F.Buffer.concat(e,n)}catch(r){throw new L(`Could not create Buffer from response body for ${t.url}: ${r.message}`,"system",r)}else throw new L(`Premature close of server response while trying to fetch ${t.url}`)}var de=(t,a)=>{let e,n,{body:r}=t[V];if(t.bodyUsed)throw new Error("cannot clone body after it is used");return r instanceof z.default&&typeof r.getBoundary!="function"&&(e=new z.PassThrough({highWaterMark:a}),n=new z.PassThrough({highWaterMark:a}),r.pipe(e),r.pipe(n),t[V].stream=e,r=n),r},La=(0,ee.deprecate)(t=>t.getBoundary(),"form-data doesn't follow the spec and requires special treatment. Use alternative package","https://github.com/node-fetch/node-fetch/issues/1167"),ze=(t,a)=>t===null?null:typeof t=="string"?"text/plain;charset=UTF-8":ot(t)?"application/x-www-form-urlencoded;charset=UTF-8":Ae(t)?t.type||null:F.Buffer.isBuffer(t)||ee.types.isAnyArrayBuffer(t)||ArrayBuffer.isView(t)?null:t instanceof O.FormData?`multipart/form-data; boundary=${a[V].boundary}`:t&&typeof t.getBoundary=="function"?`multipart/form-data;boundary=${La(t)}`:t instanceof z.default?null:"text/plain;charset=UTF-8",Dt=t=>{let{body:a}=t[V];return a===null?0:Ae(a)?a.size:F.Buffer.isBuffer(a)?a.length:a&&typeof a.getLengthSync=="function"&&a.hasKnownLength&&a.hasKnownLength()?a.getLengthSync():null},xt=async(t,{body:a})=>{a===null?t.end():await Oa(a,t)};var pt=require("node:util"),Ee=Q(require("node:http"),1),Ge=typeof Ee.default.validateHeaderName=="function"?Ee.default.validateHeaderName:t=>{if(!/^[\^`\-\w!#$%&'*+.|~]+$/.test(t)){let a=new TypeError(`Header name must be a valid HTTP token [${t}]`);throw Object.defineProperty(a,"code",{value:"ERR_INVALID_HTTP_TOKEN"}),a}},lt=typeof Ee.default.validateHeaderValue=="function"?Ee.default.validateHeaderValue:(t,a)=>{if(/[^\t\u0020-\u007E\u0080-\u00FF]/.test(a)){let e=new TypeError(`Invalid character in header content ["${t}"]`);throw Object.defineProperty(e,"code",{value:"ERR_INVALID_CHAR"}),e}},j=class t extends URLSearchParams{constructor(a){let e=[];if(a instanceof t){let n=a.raw();for(let[r,o]of Object.entries(n))e.push(...o.map(p=>[r,p]))}else if(a!=null)if(typeof a=="object"&&!pt.types.isBoxedPrimitive(a)){let n=a[Symbol.iterator];if(n==null)e.push(...Object.entries(a));else{if(typeof n!="function")throw new TypeError("Header pairs must be iterable");e=[...a].map(r=>{if(typeof r!="object"||pt.types.isBoxedPrimitive(r))throw new TypeError("Each header pair must be an iterable object");return[...r]}).map(r=>{if(r.length!==2)throw new TypeError("Each header pair must be a name/value tuple");return[...r]})}}else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");return e=e.length>0?e.map(([n,r])=>(Ge(n),lt(n,String(r)),[String(n).toLowerCase(),String(r)])):void 0,super(e),new Proxy(this,{get(n,r,o){switch(r){case"append":case"set":return(p,c)=>(Ge(p),lt(p,String(c)),URLSearchParams.prototype[r].call(n,String(p).toLowerCase(),String(c)));case"delete":case"has":case"getAll":return p=>(Ge(p),URLSearchParams.prototype[r].call(n,String(p).toLowerCase()));case"keys":return()=>(n.sort(),new Set(URLSearchParams.prototype.keys.call(n)).keys());default:return Reflect.get(n,r,o)}}})}get[Symbol.toStringTag](){return this.constructor.name}toString(){return Object.prototype.toString.call(this)}get(a){let e=this.getAll(a);if(e.length===0)return null;let n=e.join(", ");return/^content-encoding$/i.test(a)&&(n=n.toLowerCase()),n}forEach(a,e=void 0){for(let n of this.keys())Reflect.apply(a,e,[this.get(n),n,this])}*values(){for(let a of this.keys())yield this.get(a)}*entries(){for(let a of this.keys())yield[a,this.get(a)]}[Symbol.iterator](){return this.entries()}raw(){return[...this.keys()].reduce((a,e)=>(a[e]=this.getAll(e),a),{})}[Symbol.for("nodejs.util.inspect.custom")](){return[...this.keys()].reduce((a,e)=>{let n=this.getAll(e);return e==="host"?a[e]=n[0]:a[e]=n.length>1?n:n[0],a},{})}};Object.defineProperties(j.prototype,["get","entries","forEach","values"].reduce((t,a)=>(t[a]={enumerable:!0},t),{}));function Ut(t=[]){return new j(t.reduce((a,e,n,r)=>(n%2===0&&a.push(r.slice(n,n+2)),a),[]).filter(([a,e])=>{try{return Ge(a),lt(a,String(e)),!0}catch{return!1}}))}var Va=new Set([301,302,303,307,308]),He=t=>Va.has(t);var $=Symbol("Response internals"),G=class t extends K{constructor(a=null,e={}){super(a,e);let n=e.status!=null?e.status:200,r=new j(e.headers);if(a!==null&&!r.has("Content-Type")){let o=ze(a,this);o&&r.append("Content-Type",o)}this[$]={type:"default",url:e.url,status:n,statusText:e.statusText||"",headers:r,counter:e.counter,highWaterMark:e.highWaterMark}}get type(){return this[$].type}get url(){return this[$].url||""}get status(){return this[$].status}get ok(){return this[$].status>=200&&this[$].status<300}get redirected(){return this[$].counter>0}get statusText(){return this[$].statusText}get headers(){return this[$].headers}get highWaterMark(){return this[$].highWaterMark}clone(){return new t(de(this,this.highWaterMark),{type:this.type,url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected,size:this.size,highWaterMark:this.highWaterMark})}static redirect(a,e=302){if(!He(e))throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');return new t(null,{headers:{location:new URL(a).toString()},status:e})}static error(){let a=new t(null,{status:0,statusText:""});return a[$].type="error",a}static json(a=void 0,e={}){let n=JSON.stringify(a);if(n===void 0)throw new TypeError("data is not JSON serializable");let r=new j(e&&e.headers);return r.has("content-type")||r.set("content-type","application/json"),new t(n,{...e,headers:r})}get[Symbol.toStringTag](){return"Response"}};Object.defineProperties(G.prototype,{type:{enumerable:!0},url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}});var Vt=require("node:url"),Nt=require("node:util");var _t=t=>{if(t.search)return t.search;let a=t.href.length-1,e=t.hash||(t.href[a]==="#"?"#":"");return t.href[a-e.length]==="?"?"?":""};var ht=require("node:net");function vt(t,a=!1){return t==null||(t=new URL(t),/^(about|blob|data):$/.test(t.protocol))?"no-referrer":(t.username="",t.password="",t.hash="",a&&(t.pathname="",t.search=""),t)}var Tt=new Set(["","no-referrer","no-referrer-when-downgrade","same-origin","origin","strict-origin","origin-when-cross-origin","strict-origin-when-cross-origin","unsafe-url"]),wt="strict-origin-when-cross-origin";function Bt(t){if(!Tt.has(t))throw new TypeError(`Invalid referrerPolicy: ${t}`);return t}function Na(t){if(/^(http|ws)s:$/.test(t.protocol))return!0;let a=t.host.replace(/(^\[)|(]$)/g,""),e=(0,ht.isIP)(a);return e===4&&/^127\./.test(a)||e===6&&/^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(a)?!0:t.host==="localhost"||t.host.endsWith(".localhost")?!1:t.protocol==="file:"}function Se(t){return/^about:(blank|srcdoc)$/.test(t)||t.protocol==="data:"||/^(blob|filesystem):$/.test(t.protocol)?!0:Na(t)}function Ot(t,{referrerURLCallback:a,referrerOriginCallback:e}={}){if(t.referrer==="no-referrer"||t.referrerPolicy==="")return null;let n=t.referrerPolicy;if(t.referrer==="about:client")return"no-referrer";let r=t.referrer,o=vt(r),p=vt(r,!0);o.toString().length>4096&&(o=p),a&&(o=a(o)),e&&(p=e(p));let c=new URL(t.url);switch(n){case"no-referrer":return"no-referrer";case"origin":return p;case"unsafe-url":return o;case"strict-origin":return Se(o)&&!Se(c)?"no-referrer":p.toString();case"strict-origin-when-cross-origin":return o.origin===c.origin?o:Se(o)&&!Se(c)?"no-referrer":p;case"same-origin":return o.origin===c.origin?o:"no-referrer";case"origin-when-cross-origin":return o.origin===c.origin?o:p;case"no-referrer-when-downgrade":return Se(o)&&!Se(c)?"no-referrer":o;default:throw new TypeError(`Invalid referrerPolicy: ${n}`)}}function Lt(t){let a=(t.get("referrer-policy")||"").split(/[,\s]+/),e="";for(let n of a)n&&Tt.has(n)&&(e=n);return e}var _=Symbol("Request internals"),Ce=t=>typeof t=="object"&&typeof t[_]=="object",qa=(0,Nt.deprecate)(()=>{},".data is not a valid RequestInit property, use .body instead","https://github.com/node-fetch/node-fetch/issues/1000 (request)"),ue=class t extends K{constructor(a,e={}){let n;if(Ce(a)?n=new URL(a.url):(n=new URL(a),a={}),n.username!==""||n.password!=="")throw new TypeError(`${n} is an url with embedded credentials.`);let r=e.method||a.method||"GET";if(/^(delete|get|head|options|post|put)$/i.test(r)&&(r=r.toUpperCase()),!Ce(e)&&"data"in e&&qa(),(e.body!=null||Ce(a)&&a.body!==null)&&(r==="GET"||r==="HEAD"))throw new TypeError("Request with GET/HEAD method cannot have body");let o=e.body?e.body:Ce(a)&&a.body!==null?de(a):null;super(o,{size:e.size||a.size||0});let p=new j(e.headers||a.headers||{});if(o!==null&&!p.has("Content-Type")){let u=ze(o,this);u&&p.set("Content-Type",u)}let c=Ce(a)?a.signal:null;if("signal"in e&&(c=e.signal),c!=null&&!mt(c))throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");let s=e.referrer==null?a.referrer:e.referrer;if(s==="")s="no-referrer";else if(s){let u=new URL(s);s=/^about:(\/\/)?client$/.test(u)?"client":u}else s=void 0;this[_]={method:r,redirect:e.redirect||a.redirect||"follow",headers:p,parsedURL:n,signal:c,referrer:s},this.follow=e.follow===void 0?a.follow===void 0?20:a.follow:e.follow,this.compress=e.compress===void 0?a.compress===void 0?!0:a.compress:e.compress,this.counter=e.counter||a.counter||0,this.agent=e.agent||a.agent,this.highWaterMark=e.highWaterMark||a.highWaterMark||16384,this.insecureHTTPParser=e.insecureHTTPParser||a.insecureHTTPParser||!1,this.referrerPolicy=e.referrerPolicy||a.referrerPolicy||""}get method(){return this[_].method}get url(){return(0,Vt.format)(this[_].parsedURL)}get headers(){return this[_].headers}get redirect(){return this[_].redirect}get signal(){return this[_].signal}get referrer(){if(this[_].referrer==="no-referrer")return"";if(this[_].referrer==="client")return"about:client";if(this[_].referrer)return this[_].referrer.toString()}get referrerPolicy(){return this[_].referrerPolicy}set referrerPolicy(a){this[_].referrerPolicy=Bt(a)}clone(){return new t(this)}get[Symbol.toStringTag](){return"Request"}};Object.defineProperties(ue.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0},referrer:{enumerable:!0},referrerPolicy:{enumerable:!0}});var qt=t=>{let{parsedURL:a}=t[_],e=new j(t[_].headers);e.has("Accept")||e.set("Accept","*/*");let n=null;if(t.body===null&&/^(post|put)$/i.test(t.method)&&(n="0"),t.body!==null){let c=Dt(t);typeof c=="number"&&!Number.isNaN(c)&&(n=String(c))}n&&e.set("Content-Length",n),t.referrerPolicy===""&&(t.referrerPolicy=wt),t.referrer&&t.referrer!=="no-referrer"?t[_].referrer=Ot(t):t[_].referrer="no-referrer",t[_].referrer instanceof URL&&e.set("Referer",t.referrer),e.has("User-Agent")||e.set("User-Agent","node-fetch"),t.compress&&!e.has("Accept-Encoding")&&e.set("Accept-Encoding","gzip, deflate, br");let{agent:r}=t;typeof r=="function"&&(r=r(a));let o=_t(a),p={path:a.pathname+o,method:t.method,headers:e[Symbol.for("nodejs.util.inspect.custom")](),insecureHTTPParser:t.insecureHTTPParser,agent:r};return{parsedURL:a,options:p}};var Qe=class extends J{constructor(a,e="aborted"){super(a,e)}};qe();it();var Fa=new Set(["data:","http:","https:"]);async function $e(t,a){return new Promise((e,n)=>{let r=new ue(t,a),{parsedURL:o,options:p}=qt(r);if(!Fa.has(o.protocol))throw new TypeError(`node-fetch cannot load ${t}. URL scheme "${o.protocol.replace(/:$/,"")}" is not supported.`);if(o.protocol==="data:"){let y=(0,Ve.default)(r.url),f=new G(y,{headers:{"Content-Type":y.typeFull}});e(f);return}let c=(o.protocol==="https:"?jt.default:Ft.default).request,{signal:s}=r,u=null,I=()=>{let y=new Qe("The operation was aborted.");n(y),r.body&&r.body instanceof k.default.Readable&&r.body.destroy(y),!(!u||!u.body)&&u.body.emit("error",y)};if(s&&s.aborted){I();return}let g=()=>{I(),U()},D=c(o.toString(),p);s&&s.addEventListener("abort",g);let U=()=>{D.abort(),s&&s.removeEventListener("abort",g)};D.on("error",y=>{n(new L(`request to ${r.url} failed, reason: ${y.message}`,"system",y)),U()}),ja(D,y=>{u&&u.body&&u.body.destroy(y)}),process.version<"v14"&&D.on("socket",y=>{let f;y.prependListener("end",()=>{f=y._eventsCount}),y.prependListener("close",A=>{if(u&&f<y._eventsCount&&!A){let P=new Error("Premature close");P.code="ERR_STREAM_PREMATURE_CLOSE",u.body.emit("error",P)}})}),D.on("response",y=>{D.setTimeout(0);let f=Ut(y.rawHeaders);if(He(y.statusCode)){let b=f.get("Location"),M=null;try{M=b===null?null:new URL(b,r.url)}catch{if(r.redirect!=="manual"){n(new L(`uri requested responds with an invalid redirect URL: ${b}`,"invalid-redirect")),U();return}}switch(r.redirect){case"error":n(new L(`uri requested responds with a redirect, redirect mode is set to error: ${r.url}`,"no-redirect")),U();return;case"manual":break;case"follow":{if(M===null)break;if(r.counter>=r.follow){n(new L(`maximum redirect reached at: ${r.url}`,"max-redirect")),U();return}let E={headers:new j(r.headers),follow:r.follow,counter:r.counter+1,agent:r.agent,compress:r.compress,method:r.method,body:de(r),signal:r.signal,size:r.size,referrer:r.referrer,referrerPolicy:r.referrerPolicy};if(!Rt(r.url,M)||!At(r.url,M))for(let Me of["authorization","www-authenticate","cookie","cookie2"])E.headers.delete(Me);if(y.statusCode!==303&&r.body&&a.body instanceof k.default.Readable){n(new L("Cannot follow redirect with body being a readable stream","unsupported-redirect")),U();return}(y.statusCode===303||(y.statusCode===301||y.statusCode===302)&&r.method==="POST")&&(E.method="GET",E.body=void 0,E.headers.delete("content-length"));let ne=Lt(f);ne&&(E.referrerPolicy=ne),e($e(new ue(M,E))),U();return}default:return n(new TypeError(`Redirect option '${r.redirect}' is not a valid value of RequestRedirect`))}}s&&y.once("end",()=>{s.removeEventListener("abort",g)});let A=(0,k.pipeline)(y,new k.PassThrough,b=>{b&&n(b)});process.version<"v12.10"&&y.on("aborted",g);let P={url:r.url,status:y.statusCode,statusText:y.statusMessage,headers:f,size:r.size,counter:r.counter,highWaterMark:r.highWaterMark},l=f.get("Content-Encoding");if(!r.compress||r.method==="HEAD"||l===null||y.statusCode===204||y.statusCode===304){u=new G(A,P),e(u);return}let S={flush:pe.default.Z_SYNC_FLUSH,finishFlush:pe.default.Z_SYNC_FLUSH};if(l==="gzip"||l==="x-gzip"){A=(0,k.pipeline)(A,pe.default.createGunzip(S),b=>{b&&n(b)}),u=new G(A,P),e(u);return}if(l==="deflate"||l==="x-deflate"){let b=(0,k.pipeline)(y,new k.PassThrough,M=>{M&&n(M)});b.once("data",M=>{(M[0]&15)===8?A=(0,k.pipeline)(A,pe.default.createInflate(),E=>{E&&n(E)}):A=(0,k.pipeline)(A,pe.default.createInflateRaw(),E=>{E&&n(E)}),u=new G(A,P),e(u)}),b.once("end",()=>{u||(u=new G(A,P),e(u))});return}if(l==="br"){A=(0,k.pipeline)(A,pe.default.createBrotliDecompress(),b=>{b&&n(b)}),u=new G(A,P),e(u);return}u=new G(A,P),e(u)}),xt(D,r).catch(n)})}function ja(t,a){let e=fe.Buffer.from(`0\r
\r
`),n=!1,r=!1,o;t.on("response",p=>{let{headers:c}=p;n=c["transfer-encoding"]==="chunked"&&!c["content-length"]}),t.on("socket",p=>{let c=()=>{if(n&&!r){let u=new Error("Premature close");u.code="ERR_STREAM_PREMATURE_CLOSE",a(u)}},s=u=>{r=fe.Buffer.compare(u.slice(-5),e)===0,!r&&o&&(r=fe.Buffer.compare(o.slice(-3),e.slice(0,3))===0&&fe.Buffer.compare(u.slice(-2),e.slice(3))===0),o=u};p.prependListener("close",c),p.on("data",s),t.on("close",()=>{p.removeListener("close",c),p.removeListener("data",s)})})}var d=Q(require("graphql-tag")),De=d.default`
  fragment ShortRepositoryFields on Repository {
    id
    defaultBranchRef {
      target {
        oid
      }
    }
    nameWithOwner
    name
    owner {
      login
      avatarUrl(size: 64)
    }
    url
    mergeCommitAllowed
    squashMergeAllowed
    rebaseMergeAllowed
    autoMergeAllowed
  }
`,ka=d.default`
  fragment DiscussionFields on Discussion {
    id
    title
    bodyText
    publishedAt
    repository {
      ...ShortRepositoryFields
    }
    url
    upvoteCount
    category {
      name
      emoji
      emojiHTML
    }
    comments {
      totalCount
    }
    answer {
      bodyText
    }
    author {
      login
      avatarUrl
    }
  }
  ${De}
`,Y=d.default`
  fragment UserFields on User {
    id
    avatarUrl
    name
    login
    isViewer
  }
`,xe=d.default`
  fragment AuthorFields on Actor {
    ... on Bot {
      id
      login
      avatarUrl(size: 64)
    }
    ... on User {
      ...UserFields
    }
    ... on Mannequin {
      id
      login
      avatarUrl(size: 64)
    }
    ... on Organization {
      id
      login
      name
      avatarUrl(size: 64)
    }
    ... on EnterpriseUserAccount {
      id
      login
      name
      avatarUrl(size: 64)
    }
  }
  ${Y}
`,We=d.default`
  fragment IssueFields on Issue {
    id
    url
    title
    number
    closed
    state
    stateReason
    updatedAt
    author {
      ...AuthorFields
    }
    linkedBranches(first: 50) {
      totalCount
      nodes {
        ... on LinkedBranch {
          id
          ref {
            id
            name
          }
        }
      }
    }
    milestone {
      id
      title
    }
    repository {
      ...ShortRepositoryFields
    }
    comments(first: 0) {
      totalCount
    }
    assignees(first: 50) {
      totalCount
      nodes {
        ... on User {
          ...UserFields
        }
      }
    }
  }
  ${xe}
  ${De}
  ${Y}
`,za=d.default`
  fragment IssueDetailFields on Issue {
    id
    url
    title
    body
    number
    closed
    state
    stateReason
    updatedAt
    author {
      ...AuthorFields
    }
    labels(first: 50, orderBy: { field: NAME, direction: ASC }) {
      totalCount
      nodes {
        id
        name
        color
        isDefault
      }
    }
    linkedBranches(first: 50) {
      totalCount
      nodes {
        ... on LinkedBranch {
          id
          ref {
            name
          }
        }
      }
    }
    milestone {
      id
      title
    }
    repository {
      ...ShortRepositoryFields
    }
    assignees(first: 50) {
      totalCount
      nodes {
        ... on User {
          ...UserFields
        }
      }
    }
    projectsV2(first: 25) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
  ${xe}
  ${De}
  ${Y}
`,Ga=d.default`
  fragment ProjectViewerFields on ProjectV2View {
    id
    name
    number
  }
`,kt=d.default`
  fragment ProjectFields on ProjectV2 {
    id
    title
    public
    number
    readme
    closed
    shortDescription
    url
    createdAt
    creator {
      ...AuthorFields
    }
    updatedAt
    views(first: 50) {
      totalCount
      nodes {
        ...ProjectViewerFields
      }
    }
    viewerCanClose
    viewerCanUpdate
    viewerCanReopen
  }
  ${xe}
  ${Ga}
`,zt=d.default`
  fragment PullRequestFields on PullRequest {
    id
    title
    permalink
    merged
    number
    isDraft
    closed
    updatedAt
    mergeable
    milestone {
      id
      title
    }
    reviewDecision
    repository {
      ...ShortRepositoryFields
    }
    headRefName
    headRef {
      name
    }
    author {
      ...AuthorFields
    }
    comments(first: 0) {
      totalCount
    }
    reviewThreads(first: 100) {
      totalCount
      nodes {
        comments(first: 0) {
          totalCount
        }
      }
    }
    reviews(first: 100) {
      totalCount
      nodes {
        bodyText
      }
    }
    commits(last: 1) {
      nodes {
        commit {
          statusCheckRollup {
            state
          }
        }
      }
    }
    assignees(first: 50) {
      totalCount
      nodes {
        ... on User {
          ...UserFields
        }
      }
    }
    isMergeQueueEnabled
    isInMergeQueue
    mergeStateStatus
    autoMergeRequest {
      enabledAt
      mergeMethod
    }
  }
  ${De}
  ${xe}
  ${Y}
`,Ha=d.default`
  fragment PullRequestDetailsFields on PullRequest {
    id
    title
    body
    permalink
    merged
    number
    isDraft
    closed
    createdAt
    updatedAt
    additions
    deletions
    mergeable
    isMergeQueueEnabled
    isInMergeQueue
    mergeStateStatus
    autoMergeRequest {
      enabledAt
      mergeMethod
    }
    milestone {
      id
      title
    }
    repository {
      ...ShortRepositoryFields
    }
    baseRefName
    baseRef {
      name
    }
    headRefName
    headRef {
      name
    }
    labels(first: 50, orderBy: { field: NAME, direction: ASC }) {
      totalCount
      nodes {
        id
        name
        color
      }
    }
    author {
      ...AuthorFields
    }
    comments(first: 0) {
      totalCount
    }
    reviewRequests(first: 50) {
      totalCount
      nodes {
        requestedReviewer {
          ... on Team {
            id
            teamName: name
            teamAvatarURL: avatarUrl(size: 64)
          }
          ... on User {
            id
            githubUsername: login
            userName: name
            userAvatarURL: avatarUrl(size: 64)
          }
          ... on Mannequin {
            id
            githubUsername: login
            userAvatarURL: avatarUrl(size: 64)
          }
        }
      }
    }
    reviews(first: 10, states: [PENDING, APPROVED, CHANGES_REQUESTED]) {
      totalCount
      nodes {
        state
        author {
          ...AuthorFields
        }
      }
    }
    commits(last: 1) {
      nodes {
        commit {
          statusCheckRollup {
            state
          }
        }
      }
    }
    assignees(first: 50) {
      totalCount
      nodes {
        ... on User {
          ...UserFields
        }
      }
    }
    projectsV2(first: 20) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
  ${De}
  ${xe}
  ${Y}
`,Qa=d.default`
  fragment PullRequestCommitFields on PullRequest {
    commits(last: $numberOfItems, before: $before) {
      totalCount
      nodes {
        commit {
          id
          authoredDate
          message
          oid
          abbreviatedOid
          author {
            avatarUrl(size: 64)
            name
          }
          statusCheckRollup {
            state
          }
          url
          treeUrl
        }
      }
      pageInfo {
        hasPreviousPage
        startCursor
      }
    }
  }
`,Gt=d.default`
  fragment CommitFields on Commit {
    authoredDate
    oid
    message
  }
`,ct=d.default`
  fragment ExtendedRepositoryFields on Repository {
    id
    nameWithOwner
    name
    owner {
      login
      avatarUrl(size: 64)
    }
    url
    updatedAt
    pushedAt
    stargazerCount
    isArchived
    isFork
    isPrivate
    viewerHasStarred
    primaryLanguage {
      id
      name
      color
    }
  }
`,$a=d.default`
  fragment ReleaseFields on Release {
    id
    description
    name
    publishedAt
    createdAt
    tagName
    url
  }
`,Wa=d.default`
  mutation createLinkedBranch($input: CreateLinkedBranchInput!) {
    createLinkedBranch(input: $input) {
      clientMutationId
      linkedBranch {
        ref {
          id
          name
        }
      }
    }
  }
`,Ka=d.default`
  mutation createRef($input: CreateRefInput!) {
    createRef(input: $input) {
      clientMutationId
      ref {
        id
        name
      }
    }
  }
`,Ya=d.default`
  mutation deleteLinkedBranch($input: DeleteLinkedBranchInput!) {
    deleteLinkedBranch(input: $input) {
      clientMutationId
    }
  }
`,Za=d.default`
  query searchDiscussions($query: String!, $numberOfItems: Int!, $after: String) {
    searchDiscussions: search(query: $query, type: DISCUSSION, first: $numberOfItems, after: $after) {
      nodes {
        ...DiscussionFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ka}
`,Xa=d.default`
  query getGitHubDiscussionNumber($filter: String!) {
    search(query: $filter, type: DISCUSSION, first: 1) {
      nodes {
        ... on Discussion {
          number
          url
        }
      }
    }
  }
`,Ja=d.default`
  query repositoryCollaboratorsForIssues($owner: String!, $name: String!, $issueNumber: Int!) {
    repository(owner: $owner, name: $name) {
      collaborators(first: 25) {
        totalCount
        nodes {
          ... on User {
            ...UserFields
          }
        }
      }
      issue(number: $issueNumber) {
        assignees(first: 25) {
          totalCount
          nodes {
            id
          }
        }
      }
    }
  }
  ${Y}
`,er=d.default`
  query repositoryProjectsForIssues($owner: String!, $name: String!, $issueNumber: Int!) {
    repository(owner: $owner, name: $name) {
      projectsV2(first: 50, orderBy: { field: TITLE, direction: ASC }) {
        totalCount
        nodes {
          id
          title
          number
        }
      }
      issue(number: $issueNumber) {
        projectsV2(first: 50) {
          totalCount
          nodes {
            id
          }
        }
      }
    }
  }
`,tr=d.default`
  query issueDetails($nodeId: ID!) {
    node(id: $nodeId) {
      ...IssueDetailFields
    }
  }
  ${za}
`,ar=d.default`
  query searchIssues($query: String!, $numberOfItems: Int!, $after: String) {
    search(query: $query, type: ISSUE, first: $numberOfItems, after: $after) {
      nodes {
        ...IssueFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${We}
`,rr=d.default`
  query issueByNumber($owner: String!, $name: String!, $issueNumber: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $issueNumber) {
        ...IssueFields
      }
    }
  }
  ${We}
`,nr=d.default`
  mutation closeIssue($nodeId: ID!, $stateReason: IssueClosedStateReason!) {
    closeIssue(input: { issueId: $nodeId, stateReason: $stateReason }) {
      issue {
        id
      }
    }
  }
`,or=d.default`
  mutation reopenIssue($nodeId: ID!) {
    reopenIssue(input: { issueId: $nodeId }) {
      issue {
        id
      }
    }
  }
`,ir=d.default`
  mutation changeIssueAssignees($issueId: ID!, $assigneeIds: [ID!]) {
    updateIssue(input: { id: $issueId, assigneeIds: $assigneeIds }) {
      clientMutationId
    }
  }
`,sr=d.default`
  mutation changeIssueMilestone($issueId: ID!, $milestoneId: ID) {
    updateIssue(input: { id: $issueId, milestoneId: $milestoneId }) {
      clientMutationId
    }
  }
`,ur=d.default`
  mutation addIssueToProject($issueId: ID!, $projectId: ID!) {
    addProjectV2ItemById(input: { projectId: $projectId, contentId: $issueId }) {
      clientMutationId
    }
  }
`,pr=d.default`
  mutation createIssue(
    $repositoryId: ID!
    $title: String!
    $body: String!
    $assigneeIds: [ID!]!
    $labelIds: [ID!]!
    $milestoneId: ID
    $issueTypeId: ID
  ) {
    createIssue(
      input: {
        repositoryId: $repositoryId
        title: $title
        body: $body
        assigneeIds: $assigneeIds
        labelIds: $labelIds
        milestoneId: $milestoneId
        issueTypeId: $issueTypeId
      }
    ) {
      issue {
        ...IssueFields
      }
    }
  }
  ${We}
`,lr=d.default`
  mutation changeProjectStatus($projectId: ID!, $closed: Boolean!) {
    updateProjectV2(input: { projectId: $projectId, closed: $closed }) {
      clientMutationId
    }
  }
`,cr=d.default`
  query projectDetails($nodeId: ID!) {
    node(id: $nodeId) {
      ...ProjectFields
    }
  }
  ${kt}
`,yr=d.default`
  query searchPullRequests($query: String!, $numberOfItems: Int!, $after: String) {
    search(query: $query, type: ISSUE, first: $numberOfItems, after: $after) {
      edges {
        node {
          ...PullRequestFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${zt}
`,dr=d.default`
  query pullRequestDetails($nodeId: ID!) {
    node(id: $nodeId) {
      ...PullRequestDetailsFields
    }
  }
  ${Ha}
`,Sr=d.default`
  query repositoryCollaboratorsForPullRequests(
    $owner: String!
    $name: String!
    $pullRequestNumber: Int!
    $searchQuery: String
  ) {
    repository(owner: $owner, name: $name) {
      collaborators(first: 25, query: $searchQuery) {
        totalCount
        nodes {
          ... on User {
            ...UserFields
          }
        }
      }
      pullRequest(number: $pullRequestNumber) {
        assignees(first: 25) {
          totalCount
          nodes {
            id
          }
        }
      }
    }
  }
  ${Y}
`,br=d.default`
  query repositoryProjectsForPullRequests($owner: String!, $name: String!, $pullRequestNumber: Int!) {
    repository(owner: $owner, name: $name) {
      projectsV2(first: 50, orderBy: { field: TITLE, direction: ASC }) {
        totalCount
        nodes {
          id
          title
          number
        }
      }
      pullRequest(number: $pullRequestNumber) {
        projectsV2(first: 50) {
          totalCount
          nodes {
            id
          }
        }
      }
    }
  }
`,Ir=d.default`
  query pullRequestCommits($nodeId: ID!, $numberOfItems: Int!, $before: String) {
    node(id: $nodeId) {
      ...PullRequestCommitFields
    }
  }
  ${Qa}
`,gr=d.default`
  mutation closePullRequest($nodeId: ID!) {
    closePullRequest(input: { pullRequestId: $nodeId }) {
      pullRequest {
        id
      }
    }
  }
`,Mr=d.default`
  mutation reopenPullRequest($nodeId: ID!) {
    reopenPullRequest(input: { pullRequestId: $nodeId }) {
      pullRequest {
        id
      }
    }
  }
`,mr=d.default`
  mutation markPullRequestReadyForReview($nodeId: ID!) {
    markPullRequestReadyForReview(input: { pullRequestId: $nodeId }) {
      pullRequest {
        id
      }
    }
  }
`,Rr=d.default`
  mutation addPullRequestReview($nodeId: ID!, $event: PullRequestReviewEvent, $body: String) {
    addPullRequestReview(input: { pullRequestId: $nodeId, event: $event, body: $body }) {
      pullRequestReview {
        id
      }
    }
  }
`,Ar=d.default`
  mutation changePullRequestAssignees($pullRequestId: ID!, $assigneeIds: [ID!]) {
    updatePullRequest(input: { pullRequestId: $pullRequestId, assigneeIds: $assigneeIds }) {
      clientMutationId
    }
  }
`,Pr=d.default`
  mutation changePullRequestMilestone($pullRequestId: ID!, $milestoneId: ID) {
    updatePullRequest(input: { pullRequestId: $pullRequestId, milestoneId: $milestoneId }) {
      clientMutationId
    }
  }
`,Er=d.default`
  mutation addPullRequestToProject($pullRequestId: ID!, $projectId: ID!) {
    addProjectV2ItemById(input: { projectId: $projectId, contentId: $pullRequestId }) {
      clientMutationId
    }
  }
`,Cr=d.default`
  mutation requestReview($pullRequestId: ID!, $collaboratorId: ID!) {
    requestReviews(input: { pullRequestId: $pullRequestId, userIds: [$collaboratorId], union: true }) {
      clientMutationId
    }
  }
`,fr=d.default`
  mutation mergePullRequest($nodeId: ID!, $method: PullRequestMergeMethod!) {
    mergePullRequest(input: { pullRequestId: $nodeId, mergeMethod: $method }) {
      pullRequest {
        nodeId: id
      }
    }
  }
`,Dr=d.default`
  mutation addPullRequestToMergeQueue($nodeId: ID!) {
    enqueuePullRequest(input: { pullRequestId: $nodeId }) {
      __typename
    }
  }
`,xr=d.default`
  mutation removePullRequestFromMergeQueue($nodeId: ID!) {
    dequeuePullRequest(input: { id: $nodeId }) {
      __typename
    }
  }
`,Ur=d.default`
  mutation enablePullRequestAutoMerge($nodeId: ID!, $mergeMethod: PullRequestMergeMethod) {
    enablePullRequestAutoMerge(input: { pullRequestId: $nodeId, mergeMethod: $mergeMethod }) {
      pullRequest {
        id
      }
    }
  }
`,_r=d.default`
  mutation disablePullRequestAutoMerge($nodeId: ID!) {
    disablePullRequestAutoMerge(input: { pullRequestId: $nodeId }) {
      pullRequest {
        id
      }
    }
  }
`,vr=d.default`
  mutation createPullRequest(
    $repositoryId: ID!
    $into: String!
    $from: String!
    $title: String!
    $body: String!
    $isDraft: Boolean!
  ) {
    createPullRequest(
      input: {
        repositoryId: $repositoryId
        baseRefName: $into
        headRefName: $from
        title: $title
        body: $body
        draft: $isDraft
      }
    ) {
      pullRequest {
        id
      }
    }
  }
`,hr=d.default`
  mutation initPullRequest(
    $pullRequestId: ID!
    $reviewersIds: [ID!]!
    $assigneeIds: [ID!]!
    $labelsIds: [ID!]!
    $milestoneId: ID
  ) {
    requestReviews(input: { pullRequestId: $pullRequestId, userIds: $reviewersIds }) {
      pullRequest {
        id
        reviewRequests {
          totalCount
        }
      }
    }
    updatePullRequest(
      input: {
        pullRequestId: $pullRequestId
        assigneeIds: $assigneeIds
        labelIds: $labelsIds
        milestoneId: $milestoneId
      }
    ) {
      pullRequest {
        ...PullRequestFields
      }
    }
  }
  ${zt}
`,Tr=d.default`
  query searchRepositories($query: String!, $numberOfItems: Int!, $after: String) {
    search(query: $query, first: $numberOfItems, after: $after, type: REPOSITORY) {
      nodes {
        ...ExtendedRepositoryFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ct}
`,wr=d.default`
  query myLatestRepositories(
    $numberOfItems: Int!
    $after: String
    $orderByField: RepositoryOrderField!
    $orderByDirection: OrderDirection!
  ) {
    viewer {
      repositories(
        first: $numberOfItems
        after: $after
        orderBy: { field: $orderByField, direction: $orderByDirection }
      ) {
        nodes {
          ...ExtendedRepositoryFields
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${ct}
`,Br=d.default`
  query milestonesForRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      milestones(first: 25, orderBy: { field: DUE_DATE, direction: ASC }) {
        totalCount
        nodes {
          id
          title
          number
        }
      }
    }
  }
`,Or=d.default`
  query commentsForPullRequest($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      pullRequest(number: $number) {
        comments(first: 100) {
          nodes {
            author {
              login
            }
            body
          }
        }
      }
    }
  }
`,Lr=d.default`
  query dataForRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      mergeCommitAllowed
      squashMergeAllowed
      rebaseMergeAllowed
      autoMergeAllowed
      defaultBranchRef {
        id
        name
        target {
          ...CommitFields
        }
      }
      issueTypes(orderBy: { direction: ASC, field: NAME }, first: 50) {
        totalCount
        nodes {
          id
          name
          color
          isEnabled
        }
      }
      refs(refPrefix: "refs/heads/", direction: ASC, first: 50) {
        totalCount
        nodes {
          id
          name
          target {
            ...CommitFields
          }
        }
      }
      collaborators(first: 50) {
        totalCount
        nodes {
          ...UserFields
        }
      }
      labels(first: 50) {
        totalCount
        nodes {
          id
          name
          color
          isDefault
        }
      }
      projectsV2(first: 50) {
        totalCount
        nodes {
          id
          title
        }
      }
      milestones(first: 50, states: OPEN, orderBy: { field: DUE_DATE, direction: ASC }) {
        totalCount
        nodes {
          id
          title
        }
      }
      owner {
        __typename
        ... on Organization {
          projectsV2(first: 50) {
            totalCount
            nodes {
              id
              title
            }
          }
        }
      }
      pullRequestTemplates {
        body
      }
      issueTemplates {
        name
        about
        title
        body
      }
    }
  }
  ${Gt}
  ${Y}
`,Vr=d.default`
  query searchRepositoryBranches($owner: String!, $name: String!, $query: String!) {
    repository(owner: $owner, name: $name) {
      refs(refPrefix: "refs/heads/", direction: ASC, first: 50, query: $query) {
        nodes {
          id
          name
          target {
            ...CommitFields
          }
        }
      }
    }
  }
  ${Gt}
`,Nr=d.default`
  query repositoryIssues($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      url
      defaultBranchRef {
        id
        name
        target {
          oid
        }
      }
      issues(first: 50, states: OPEN, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          ...IssueFields
        }
      }
    }
  }
  ${We}
`,qr=d.default`
  query repositoryReleases($name: String!, $owner: String!, $numberOfItems: Int!, $after: String) {
    repository(name: $name, owner: $owner) {
      ... on Repository {
        releases(first: $numberOfItems, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes {
            ...ReleaseFields
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
  ${$a}
`,Fr=d.default`
  mutation addStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      clientMutationId
    }
  }
`,jr=d.default`
  mutation removeStar($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      clientMutationId
    }
  }
`,kr=d.default`
  query myStarredRepositories(
    $numberOfItems: Int!
    $after: String
    $orderByField: StarOrderField!
    $orderByDirection: OrderDirection!
  ) {
    viewer {
      starredRepositories(
        first: $numberOfItems
        after: $after
        orderBy: { field: $orderByField, direction: $orderByDirection }
      ) {
        nodes {
          ...ExtendedRepositoryFields
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${ct}
`,zr=d.default`
  query getViewer {
    viewer {
      ...UserFields
      organizations(first: 50) {
        totalCount
        nodes {
          avatarUrl
          login
        }
      }
      projectsV2(first: 50) {
        totalCount
        nodes {
          ...ProjectFields
        }
      }
    }
  }
  ${Y}
  ${kt}
`,Gr=d.default`
  query getViewerStats {
    viewer {
      ...UserFields
      bio
      company
      location
      url
      websiteUrl
      createdAt
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      pullRequestsAuthored: pullRequests {
        totalCount
      }
      pullRequestsMerged: pullRequests(states: [MERGED]) {
        totalCount
      }
      pullRequestsOpen: pullRequests(states: [OPEN]) {
        totalCount
      }
      issuesAuthored: issues {
        totalCount
      }
      issuesOpen: issues(states: [OPEN]) {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
      }
      publicRepos: repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
        totalCount
      }
      ownedRepositories: repositories(ownerAffiliations: OWNER) {
        totalCount
      }
    }
    rateLimit {
      remaining
      limit
      used
      resetAt
    }
  }
  ${Y}
`,Hr=d.default`
  query getViewerStatsDetails($repositoriesCount: Int = 100) {
    viewer {
      recentPullRequests: pullRequests(first: 5, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          number
          title
          url
          state
          repository {
            nameWithOwner
          }
        }
      }
      recentOpenPullRequests: pullRequests(first: 5, states: [OPEN], orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          number
          title
          url
          repository {
            nameWithOwner
          }
        }
      }
      recentIssues: issues(first: 5, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          number
          title
          url
          state
          repository {
            nameWithOwner
          }
        }
      }
      recentOpenIssues: issues(first: 5, states: [OPEN], orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          number
          title
          url
          repository {
            nameWithOwner
          }
        }
      }
      ownedRepositories: repositories(
        first: $repositoriesCount
        ownerAffiliations: OWNER
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          id
          nameWithOwner
          url
          stargazerCount
          forkCount
        }
      }
      organizations(first: 20) {
        nodes {
          id
          login
          name
          avatarUrl
          url
        }
      }
    }
  }
`,Qr=(t,a,e,n)=>t();function Ht(t,a=Qr){return{createLinkedBranch(e,n,r){return a(o=>t.request({document:Wa,variables:e,requestHeaders:{...n,...o},signal:r}),"createLinkedBranch","mutation",e)},createRef(e,n,r){return a(o=>t.request({document:Ka,variables:e,requestHeaders:{...n,...o},signal:r}),"createRef","mutation",e)},deleteLinkedBranch(e,n,r){return a(o=>t.request({document:Ya,variables:e,requestHeaders:{...n,...o},signal:r}),"deleteLinkedBranch","mutation",e)},searchDiscussions(e,n,r){return a(o=>t.request({document:Za,variables:e,requestHeaders:{...n,...o},signal:r}),"searchDiscussions","query",e)},getGitHubDiscussionNumber(e,n,r){return a(o=>t.request({document:Xa,variables:e,requestHeaders:{...n,...o},signal:r}),"getGitHubDiscussionNumber","query",e)},repositoryCollaboratorsForIssues(e,n,r){return a(o=>t.request({document:Ja,variables:e,requestHeaders:{...n,...o},signal:r}),"repositoryCollaboratorsForIssues","query",e)},repositoryProjectsForIssues(e,n,r){return a(o=>t.request({document:er,variables:e,requestHeaders:{...n,...o},signal:r}),"repositoryProjectsForIssues","query",e)},issueDetails(e,n,r){return a(o=>t.request({document:tr,variables:e,requestHeaders:{...n,...o},signal:r}),"issueDetails","query",e)},searchIssues(e,n,r){return a(o=>t.request({document:ar,variables:e,requestHeaders:{...n,...o},signal:r}),"searchIssues","query",e)},issueByNumber(e,n,r){return a(o=>t.request({document:rr,variables:e,requestHeaders:{...n,...o},signal:r}),"issueByNumber","query",e)},closeIssue(e,n,r){return a(o=>t.request({document:nr,variables:e,requestHeaders:{...n,...o},signal:r}),"closeIssue","mutation",e)},reopenIssue(e,n,r){return a(o=>t.request({document:or,variables:e,requestHeaders:{...n,...o},signal:r}),"reopenIssue","mutation",e)},changeIssueAssignees(e,n,r){return a(o=>t.request({document:ir,variables:e,requestHeaders:{...n,...o},signal:r}),"changeIssueAssignees","mutation",e)},changeIssueMilestone(e,n,r){return a(o=>t.request({document:sr,variables:e,requestHeaders:{...n,...o},signal:r}),"changeIssueMilestone","mutation",e)},addIssueToProject(e,n,r){return a(o=>t.request({document:ur,variables:e,requestHeaders:{...n,...o},signal:r}),"addIssueToProject","mutation",e)},createIssue(e,n,r){return a(o=>t.request({document:pr,variables:e,requestHeaders:{...n,...o},signal:r}),"createIssue","mutation",e)},changeProjectStatus(e,n,r){return a(o=>t.request({document:lr,variables:e,requestHeaders:{...n,...o},signal:r}),"changeProjectStatus","mutation",e)},projectDetails(e,n,r){return a(o=>t.request({document:cr,variables:e,requestHeaders:{...n,...o},signal:r}),"projectDetails","query",e)},searchPullRequests(e,n,r){return a(o=>t.request({document:yr,variables:e,requestHeaders:{...n,...o},signal:r}),"searchPullRequests","query",e)},pullRequestDetails(e,n,r){return a(o=>t.request({document:dr,variables:e,requestHeaders:{...n,...o},signal:r}),"pullRequestDetails","query",e)},repositoryCollaboratorsForPullRequests(e,n,r){return a(o=>t.request({document:Sr,variables:e,requestHeaders:{...n,...o},signal:r}),"repositoryCollaboratorsForPullRequests","query",e)},repositoryProjectsForPullRequests(e,n,r){return a(o=>t.request({document:br,variables:e,requestHeaders:{...n,...o},signal:r}),"repositoryProjectsForPullRequests","query",e)},pullRequestCommits(e,n,r){return a(o=>t.request({document:Ir,variables:e,requestHeaders:{...n,...o},signal:r}),"pullRequestCommits","query",e)},closePullRequest(e,n,r){return a(o=>t.request({document:gr,variables:e,requestHeaders:{...n,...o},signal:r}),"closePullRequest","mutation",e)},reopenPullRequest(e,n,r){return a(o=>t.request({document:Mr,variables:e,requestHeaders:{...n,...o},signal:r}),"reopenPullRequest","mutation",e)},markPullRequestReadyForReview(e,n,r){return a(o=>t.request({document:mr,variables:e,requestHeaders:{...n,...o},signal:r}),"markPullRequestReadyForReview","mutation",e)},addPullRequestReview(e,n,r){return a(o=>t.request({document:Rr,variables:e,requestHeaders:{...n,...o},signal:r}),"addPullRequestReview","mutation",e)},changePullRequestAssignees(e,n,r){return a(o=>t.request({document:Ar,variables:e,requestHeaders:{...n,...o},signal:r}),"changePullRequestAssignees","mutation",e)},changePullRequestMilestone(e,n,r){return a(o=>t.request({document:Pr,variables:e,requestHeaders:{...n,...o},signal:r}),"changePullRequestMilestone","mutation",e)},addPullRequestToProject(e,n,r){return a(o=>t.request({document:Er,variables:e,requestHeaders:{...n,...o},signal:r}),"addPullRequestToProject","mutation",e)},requestReview(e,n,r){return a(o=>t.request({document:Cr,variables:e,requestHeaders:{...n,...o},signal:r}),"requestReview","mutation",e)},mergePullRequest(e,n,r){return a(o=>t.request({document:fr,variables:e,requestHeaders:{...n,...o},signal:r}),"mergePullRequest","mutation",e)},addPullRequestToMergeQueue(e,n,r){return a(o=>t.request({document:Dr,variables:e,requestHeaders:{...n,...o},signal:r}),"addPullRequestToMergeQueue","mutation",e)},removePullRequestFromMergeQueue(e,n,r){return a(o=>t.request({document:xr,variables:e,requestHeaders:{...n,...o},signal:r}),"removePullRequestFromMergeQueue","mutation",e)},enablePullRequestAutoMerge(e,n,r){return a(o=>t.request({document:Ur,variables:e,requestHeaders:{...n,...o},signal:r}),"enablePullRequestAutoMerge","mutation",e)},disablePullRequestAutoMerge(e,n,r){return a(o=>t.request({document:_r,variables:e,requestHeaders:{...n,...o},signal:r}),"disablePullRequestAutoMerge","mutation",e)},createPullRequest(e,n,r){return a(o=>t.request({document:vr,variables:e,requestHeaders:{...n,...o},signal:r}),"createPullRequest","mutation",e)},initPullRequest(e,n,r){return a(o=>t.request({document:hr,variables:e,requestHeaders:{...n,...o},signal:r}),"initPullRequest","mutation",e)},searchRepositories(e,n,r){return a(o=>t.request({document:Tr,variables:e,requestHeaders:{...n,...o},signal:r}),"searchRepositories","query",e)},myLatestRepositories(e,n,r){return a(o=>t.request({document:wr,variables:e,requestHeaders:{...n,...o},signal:r}),"myLatestRepositories","query",e)},milestonesForRepository(e,n,r){return a(o=>t.request({document:Br,variables:e,requestHeaders:{...n,...o},signal:r}),"milestonesForRepository","query",e)},commentsForPullRequest(e,n,r){return a(o=>t.request({document:Or,variables:e,requestHeaders:{...n,...o},signal:r}),"commentsForPullRequest","query",e)},dataForRepository(e,n,r){return a(o=>t.request({document:Lr,variables:e,requestHeaders:{...n,...o},signal:r}),"dataForRepository","query",e)},searchRepositoryBranches(e,n,r){return a(o=>t.request({document:Vr,variables:e,requestHeaders:{...n,...o},signal:r}),"searchRepositoryBranches","query",e)},repositoryIssues(e,n,r){return a(o=>t.request({document:Nr,variables:e,requestHeaders:{...n,...o},signal:r}),"repositoryIssues","query",e)},repositoryReleases(e,n,r){return a(o=>t.request({document:qr,variables:e,requestHeaders:{...n,...o},signal:r}),"repositoryReleases","query",e)},addStar(e,n,r){return a(o=>t.request({document:Fr,variables:e,requestHeaders:{...n,...o},signal:r}),"addStar","mutation",e)},removeStar(e,n,r){return a(o=>t.request({document:jr,variables:e,requestHeaders:{...n,...o},signal:r}),"removeStar","mutation",e)},myStarredRepositories(e,n,r){return a(o=>t.request({document:kr,variables:e,requestHeaders:{...n,...o},signal:r}),"myStarredRepositories","query",e)},getViewer(e,n,r){return a(o=>t.request({document:zr,variables:e,requestHeaders:{...n,...o},signal:r}),"getViewer","query",e)},getViewerStats(e,n,r){return a(o=>t.request({document:Gr,variables:e,requestHeaders:{...n,...o},signal:r}),"getViewerStats","query",e)},getViewerStatsDetails(e,n,r){return a(o=>t.request({document:Hr,variables:e,requestHeaders:{...n,...o},signal:r}),"getViewerStatsDetails","query",e)}}}var yt=null,dt=null,Yt=null,$r=(0,$t.getPreferenceValues)();function Wr({token:t,type:a}){let e=a==="personal"?`token ${t}`:`bearer ${t}`;Yt=t,yt=Ht(new Kt.GraphQLClient("https://api.github.com/graphql",{headers:{authorization:e}})),dt=new Qt.Octokit({auth:t,request:{fetch:$e}})}var Zt=Wt.OAuthService.github({personalAccessToken:$r.personalAccessToken,scope:"notifications repo project read:org read:user read:packages",onAuthorize:Wr});function T(){if(!yt||!dt)throw new Error("GitHub clients not initialized");return{github:yt,octokit:dt,token:Yt}}var v=require("@raycast/api"),na=require("@raycast/utils"),oa=require("date-fns");var Xt=require("@raycast/api"),Kr=require("lodash");var Ue=require("@raycast/api");function Z(t){return t?{icon:{source:t.avatarUrl??Ue.Icon.Person,mask:Ue.Image.Mask.Circle},text:(t.name?t.name:t.login)??"-"}:{icon:Ue.Icon.Person,text:"Unknown"}}function be(t,a,{suffix:e="s",withNumber:n=!1}={}){let r=`${a}${t!==1?e:""}`;return n?`${t} ${r}`:r}var te=require("@raycast/api");function Ke(t){return t.stateReason==="NOT_PLANNED"?{icon:{source:"skip.svg",tintColor:te.Color.SecondaryText},text:"Closed as not planned",color:te.Color.Purple}:t.stateReason==="COMPLETED"?{icon:{source:"issue-closed.svg",tintColor:te.Color.Purple},text:"Closed as completed",color:te.Color.Purple}:t.closed?{icon:{source:"issue-closed.svg",tintColor:te.Color.Purple},text:"Closed",color:te.Color.Purple}:{icon:{source:"issue-open.svg",tintColor:te.Color.Green},text:"Open",color:te.Color.Green}}function Ye(t){return Z(t.author)}var Jt=[{title:"Newest",value:"sort:created-desc"},{title:"Oldest",value:"sort:created-asc"},{title:"Most Commented",value:"sort:comments-desc"},{title:"Least Commented",value:"sort:comments-asc"},{title:"Recently Updated",value:"sort:updated-desc"},{title:"Least Recently Updated",value:"sort:updated-asc"},{title:"Best Match",value:"sort:relevance-desc"},{title:"\u{1F44D}",value:"sort:reactions-+1-desc"},{title:"\u{1F44E}",value:"sort:reactions--1-desc"},{title:"\u{1F604}",value:"sort:reactions-smile-desc"},{title:"\u{1F389}",value:"sort:reactions-tada-desc"},{title:"\u{1F641}",value:"sort:reactions-thinking_face-desc"},{title:"\u2764\uFE0F",value:"sort:reactions-heart-desc"},{title:"\u{1F680}",value:"sort:reactions-rocket-desc"},{title:"\u{1F440}",value:"sort:reactions-eyes-desc"}],ea="sort:updated-desc";var ta=require("@raycast/utils");function ie(){let{github:t}=T(),{data:a}=(0,ta.useCachedPromise)(async()=>(await t.getViewer()).viewer);return a}var i=require("@raycast/api"),Ze=require("@raycast/utils"),Xe=require("react");function w(t){return t?.response?.errors?t.response.errors[0].message:t instanceof Error?t.message:String(t)}var N=require("@raycast/api"),X=require("react/jsx-runtime"),ra=({sortQuery:t,setSortQuery:a,data:e})=>a?(0,X.jsxs)(N.ActionPanel.Submenu,{title:"Sort by",icon:N.Icon.ArrowUp,shortcut:N.Keyboard.Shortcut.Common.Duplicate,children:[e.filter(({value:n})=>!n.startsWith("sort:reaction")).map(({title:n,value:r})=>(0,X.jsx)(aa,{title:n,value:r,sortQuery:t??"",setSortQuery:a},r||"relevance")),e.some(({value:n})=>n.startsWith("sort:reaction"))&&(0,X.jsx)(N.ActionPanel.Section,{title:"Most Reactions",children:e.filter(({value:n})=>n.startsWith("sort:reaction")).map(({title:n,value:r})=>(0,X.jsx)(aa,{title:n,value:r,sortQuery:t??"",setSortQuery:a},r))})]}):(0,X.jsx)(X.Fragment,{}),aa=({title:t,value:a,sortQuery:e,setSortQuery:n})=>(0,X.jsx)(N.Action,{title:t,icon:e===a?{source:N.Icon.CheckCircle,tintColor:N.Color.Green}:N.Icon.Circle,onAction:()=>n(a)});var m=require("react/jsx-runtime");function _e({issue:t,mutateList:a,mutateDetail:e,children:n,setSortQuery:r,sortQuery:o}){let{github:p}=T(),c=ie();async function s(){a&&await a(),e&&await e()}async function u(){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:`Reopening issue #${t.number}`}),await p.reopenIssue({nodeId:t.id}),await s(),await(0,i.showToast)({style:i.Toast.Style.Success,title:`Issue #${t.number} is now open`})}catch(S){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed reopening issue",message:w(S)})}}async function I(){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:`Closing issue #${t.number} as completed`}),await p.closeIssue({nodeId:t.id,stateReason:"COMPLETED"}),await s(),await(0,i.showToast)({style:i.Toast.Style.Success,title:`Issue #${t.number} closed as completed`})}catch(S){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed closing issue as completed",message:w(S)})}}async function g(){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:`Closing issue #${t.number} as not planned`}),await p.closeIssue({nodeId:t.id,stateReason:"NOT_PLANNED"}),await s(),await(0,i.showToast)({style:i.Toast.Style.Success,title:`Issue #${t.number} closed as not planned`})}catch(S){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed closing issue as not planned",message:w(S)})}}async function D(S){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:"Assigning to me"});let b=t.assignees.nodes?.filter(M=>!!M).map(M=>M?.id)??[];await p.changeIssueAssignees({issueId:t.id,assigneeIds:[...b,S]}),await s(),await(0,i.showToast)({style:i.Toast.Style.Success,title:"Assigned to me"})}catch(b){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed assigning to me",message:w(b)})}}async function U(S){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:"Un-assigning from me"});let b=t.assignees.nodes?.filter(M=>!!M).map(M=>M?.id)??[];await p.changeIssueAssignees({issueId:t.id,assigneeIds:b?.filter(M=>M!==S)}),await s(),await(0,i.showToast)({style:i.Toast.Style.Success,title:"Un-assigned from me"})}catch(b){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed un-assigning from me",message:w(b)})}}async function y(){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:`Creating branch for issue #${t.number}`});let S=t.repository.defaultBranchRef?.target?.oid;if(!S)throw new Error("Repository default branch commit SHA is unavailable");let M=(await p.createLinkedBranch({input:{issueId:t.id,oid:S}})).createLinkedBranch?.linkedBranch?.ref?.name;await s(),M&&await(0,i.showToast)({style:i.Toast.Style.Success,title:`${M} is created`,primaryAction:{title:"Copy Branch Name",shortcut:{modifiers:["shift","cmd"],key:"c"},onAction:()=>i.Clipboard.copy(M)}})}catch(S){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed creating a branch",message:w(S)})}}async function f(S,b){if(await(0,i.confirmAlert)({icon:i.Icon.Trash,title:"Delete the branch",message:`${b} will be deleted. Are you sure you want to proceed with the action?`,primaryAction:{title:"Confirm",style:i.Alert.ActionStyle.Destructive}}))try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:"Deleting a branch"}),await p.deleteLinkedBranch({input:{linkedBranchId:S}}),await s(),await(0,i.showToast)({style:i.Toast.Style.Success,title:"Deleted the branch"})}catch(M){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed deleting the branch",message:w(M)})}}let A=Z(c),P=t.assignees.nodes?.some(S=>S?.isViewer),l=t.linkedBranches?.nodes?.length?t.linkedBranches.nodes[0]:null;return(0,m.jsxs)(i.ActionPanel,{title:`#${t.number} in ${t.repository.nameWithOwner}`,children:[n,(0,m.jsx)(i.Action.OpenInBrowser,{url:t.url}),(0,m.jsxs)(i.ActionPanel.Section,{children:[c?(0,m.jsx)(i.Action,{title:P?"Unassign from Me":"Assign to Me",icon:A.icon,shortcut:{modifiers:["cmd","shift"],key:"i"},onAction:()=>P?U(c.id):D(c.id)}):null,(0,m.jsx)(Yr,{issue:t,mutate:s}),(0,m.jsx)(Zr,{issue:t,mutate:s}),l?null:(0,m.jsx)(i.Action,{title:"Create Issue Branch",icon:{source:"branch.svg",tintColor:i.Color.PrimaryText},shortcut:{modifiers:["cmd","shift"],key:"b"},onAction:()=>y()}),(0,m.jsx)(Xr,{issue:t,mutate:s})]}),(0,m.jsx)(i.ActionPanel.Section,{children:t.closed?(0,m.jsx)(i.Action,{title:"Reopen Issue",icon:{source:"issue-reopened.svg",tintColor:i.Color.Green},onAction:u}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i.Action,{title:"Close Issue as Completed",style:i.Action.Style.Destructive,icon:{source:"issue-closed.svg",tintColor:i.Color.Red},onAction:I}),(0,m.jsx)(i.Action,{title:"Close Issue as Not Planned",style:i.Action.Style.Destructive,icon:{source:"skip.svg",tintColor:i.Color.Red},onAction:g}),l?(0,m.jsx)(i.Action,{title:"Delete Issue Branch",style:i.Action.Style.Destructive,icon:{source:"branch.svg",tintColor:i.Color.Red},onAction:()=>f(l?.id||"",l.ref?.name??"")}):null]})}),(0,m.jsxs)(i.ActionPanel.Section,{children:[(0,m.jsx)(i.Action.CopyToClipboard,{content:t.number,title:"Copy Issue Number",shortcut:{modifiers:["cmd","shift"],key:"."}}),(0,m.jsx)(i.Action.CopyToClipboard,{content:t.url,title:"Copy Issue URL",shortcut:{modifiers:["cmd","shift"],key:","}}),(0,m.jsx)(i.Action.CopyToClipboard,{content:t.title,title:"Copy Issue Title",shortcut:{modifiers:["ctrl","shift"],key:","}}),(0,m.jsx)(i.Action.CopyToClipboard,{content:`[${t.title}](${t.url})`,title:"Copy Markdown URL",shortcut:{modifiers:["cmd","shift"],key:";"}}),l?.ref?.name?(0,m.jsx)(i.Action.CopyToClipboard,{content:l.ref?.name,title:"Copy Branch Name",shortcut:{modifiers:["ctrl","shift"],key:"."}}):null]}),(0,m.jsxs)(i.ActionPanel.Section,{children:[(0,m.jsx)(ra,{data:Jt,sortQuery:o,setSortQuery:r}),(0,m.jsx)(i.Action,{icon:i.Icon.ArrowClockwise,title:"Refresh",onAction:s,shortcut:i.Keyboard.Shortcut.Common.Refresh})]})]})}function Yr({issue:t,mutate:a}){let{github:e}=T(),[n,r]=(0,Xe.useState)(!1),{data:o,isLoading:p}=(0,Ze.useCachedPromise)(async s=>e.repositoryCollaboratorsForIssues({owner:s.repository.owner.login,name:s.repository.name,issueNumber:s.number}),[t],{execute:n});async function c({id:s,text:u}){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:"Adding assignee",message:u});let I=o?.repository?.issue?.assignees.nodes?.filter(g=>!!g).map(g=>g?.id)??[];await e.changeIssueAssignees({issueId:t.id,assigneeIds:[...I,s]}),await a(),await(0,i.showToast)({style:i.Toast.Style.Success,title:"Added assignee",message:u})}catch(I){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed adding assignee",message:w(I)})}}return(0,m.jsx)(i.ActionPanel.Submenu,{title:"Add Assignee",icon:i.Icon.AddPerson,shortcut:{modifiers:["cmd","shift"],key:"a"},onOpen:()=>r(!0),children:p?(0,m.jsx)(i.Action,{title:"Loading\u2026"}):o?.repository?.collaborators?.nodes?.map(s=>{if(!s)return null;let u=Z(s);return(0,m.jsx)(i.Action,{title:u.text,icon:u.icon,onAction:()=>c({id:s.id,text:u.text})},s.id)})})}function Zr({issue:t,mutate:a}){let{github:e}=T(),[n,r]=(0,Xe.useState)(!1),{data:o,isLoading:p}=(0,Ze.useCachedPromise)(async s=>e.repositoryProjectsForIssues({owner:s.repository.owner.login,name:s.repository.name,issueNumber:s.number}),[t],{execute:n});async function c({id:s,text:u}){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:"Adding to project",message:u}),await e.addIssueToProject({issueId:t.id,projectId:s}),await a(),await(0,i.showToast)({style:i.Toast.Style.Success,title:"Added to project",message:u})}catch(I){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed adding to project",message:w(I)})}}return(0,m.jsx)(i.ActionPanel.Submenu,{title:"Add to Project",icon:{source:"project.svg",tintColor:i.Color.PrimaryText},shortcut:{modifiers:["cmd","shift"],key:"p"},onOpen:()=>r(!0),children:p?(0,m.jsx)(i.Action,{title:"Loading\u2026"}):o?.repository?.projectsV2.nodes?.map(s=>s?(0,m.jsx)(i.Action,{title:s.title,onAction:()=>c({id:s.id,text:s.title})},s.id):null)})}function Xr({issue:t,mutate:a}){let{github:e}=T(),[n,r]=(0,Xe.useState)(!1),{data:o,isLoading:p}=(0,Ze.useCachedPromise)(async u=>e.milestonesForRepository({owner:u.repository.owner.login,name:u.repository.name}),[t],{execute:n});async function c(){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:"Removing milestone"}),await e.changeIssueMilestone({issueId:t.id,milestoneId:null}),await a(),await(0,i.showToast)({style:i.Toast.Style.Success,title:"Removed milestone"})}catch(u){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed removing milestone",message:w(u)})}}async function s({id:u,text:I}){try{await(0,i.showToast)({style:i.Toast.Style.Animated,title:"Setting milestone",message:I}),await e.changeIssueMilestone({issueId:t.id,milestoneId:u}),await a(),await(0,i.showToast)({style:i.Toast.Style.Success,title:"Milestone set",message:I})}catch(g){await(0,i.showToast)({style:i.Toast.Style.Failure,title:"Failed setting milestone",message:w(g)})}}return(0,m.jsx)(i.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"milestone.svg",tintColor:i.Color.PrimaryText},shortcut:{modifiers:["cmd","shift"],key:"m"},onOpen:()=>r(!0),children:p?(0,m.jsx)(i.Action,{title:"Loading\u2026"}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i.Action,{title:"No Milestone",onAction:()=>c()}),o?.repository?.milestones?.nodes?.map(u=>u?(0,m.jsx)(i.Action,{title:u.title,onAction:()=>s({id:u.id,text:u.title}),autoFocus:t.milestone?.id===u.id},u.id):null)]})})}var h=require("react/jsx-runtime");function ve({initialIssue:t,mutateList:a}){let{github:e}=T(),n=ie(),{data:r,isLoading:o,mutate:p}=(0,na.useCachedPromise)(async g=>(await e.issueDetails({nodeId:g})).node,[t.id],{initialData:t}),c=`# ${r.title}`;r?.body&&(c+=`

${r.body}`);let s=Ke(r),u=Ye(r),I=r.linkedBranches.nodes?.length?r.linkedBranches.nodes[0]?.ref?.name:null;return(0,h.jsx)(v.Detail,{isLoading:o,markdown:c,navigationTitle:`#${r.number}`,metadata:(0,h.jsxs)(v.Detail.Metadata,{children:[(0,h.jsx)(v.Detail.Metadata.Label,{title:"Repository",text:r.repository.nameWithOwner}),(0,h.jsx)(v.Detail.Metadata.TagList,{title:"Status",children:(0,h.jsx)(v.Detail.Metadata.TagList.Item,{...s})}),I?(0,h.jsx)(v.Detail.Metadata.Label,{title:"Branch",icon:{source:"branch.svg",tintColor:v.Color.PrimaryText},text:I}):null,r.updatedAt?(0,h.jsx)(v.Detail.Metadata.Label,{title:"Updated",text:(0,oa.format)(new Date(r.updatedAt),"dd MMM")}):null,(0,h.jsx)(v.Detail.Metadata.Label,{title:"Author",...u}),r.assignees&&r.assignees.totalCount>0?(0,h.jsx)(v.Detail.Metadata.TagList,{title:be(r.assignees.totalCount,"Assignee"),children:r.assignees.nodes?.map(g=>{if(!g)return null;let D=Z(g);return(0,h.jsx)(v.Detail.Metadata.TagList.Item,{...D},g.id)})}):null,r.labels&&r.labels.totalCount>0?(0,h.jsx)(v.Detail.Metadata.TagList,{title:be(r.labels.totalCount,"Label"),children:r.labels.nodes?.map(g=>g?(0,h.jsx)(v.Detail.Metadata.TagList.Item,{text:g.name,color:g.color},g.id):null)}):null,r.projectsV2&&r.projectsV2.totalCount>0?(0,h.jsx)(v.Detail.Metadata.TagList,{title:be(r.projectsV2.totalCount,"Project"),children:r.projectsV2.nodes?.map(g=>g?(0,h.jsx)(v.Detail.Metadata.TagList.Item,{text:g.title},g.id):null)}):null,r.milestone?(0,h.jsx)(v.Detail.Metadata.Label,{title:"Milestone",text:r.milestone.title}):null]}),actions:(0,h.jsx)(_e,{issue:r,viewer:n,mutateList:a,mutateDetail:p})})}var ia=require("@raycast/utils");var Je=(0,ia.withAccessToken)(Zt);var la=require("@raycast/utils");var et=require("node:child_process");var ua=require("node:util"),H=require("@raycast/api"),Jr=require("@raycast/utils");var ci=[{title:"github.dev",baseUrl:"https://github.dev/",icon:{source:"github-dev.svg",tintColor:H.Color.PrimaryText},shortcut:{modifiers:["cmd"],key:"o"}},{title:"VS Code for the Web",baseUrl:"https://vscode.dev/github/",icon:{source:"vscode.svg",tintColor:H.Color.PrimaryText},shortcut:{modifiers:["cmd"],key:"v"}},{title:"CodeSandbox",baseUrl:"https://codesandbox.io/s/github/",icon:{source:"codesandbox.svg",tintColor:H.Color.PrimaryText}},{title:"Replit",baseUrl:"https://repl.it/github/",icon:{source:"replit.svg",tintColor:H.Color.PrimaryText}},{title:"Gitpod",baseUrl:"https://gitpod.io/#https://github.com/",icon:{source:"gitpod.svg",tintColor:H.Color.PrimaryText}},{title:"Glitch",baseUrl:"https://glitch.com/edit/#!/import/github/",icon:{source:"glitch.svg",tintColor:H.Color.PrimaryText}},{title:"Sourcegraph",baseUrl:"https://sourcegraph.com/github.com/",icon:{source:"sourcegraph.svg",tintColor:H.Color.PrimaryText},shortcut:{modifiers:["cmd"],key:"s"}},{title:"DeepWiki",baseUrl:"https://deepwiki.com/",icon:{source:"deepwiki.png"},shortcut:{modifiers:["cmd"],key:"d"}},{title:"VS Code Remote Repositories",baseUrl:"vscode://GitHub.remotehub/open?url=https://github.com/",icon:{source:"vscode.svg",tintColor:H.Color.PrimaryText}}];var en=[{title:"Relevance",value:""},{title:"Last Update",value:"sort:updated-desc"},{title:"Name",value:"sort:name-asc"},{title:"Stars",value:"sort:stars-desc"},{title:"Forks",value:"sort:forks-desc"}],tn=[{title:"Last Pushed",value:"pushed_at:desc"},{title:"Name",value:"name:asc"},{title:"Stars",value:"stargazers:desc"}],an=[{title:"Recently Starred",value:"starred_at:desc"},{title:"Oldest Starred",value:"starred_at:asc"}],yi=en[0].value,di=tn[0].value,Si=an[0].value;var bi=(0,ua.promisify)(et.execFile);var he="\x1B",sa="\x07",Ii=new RegExp(`${he}][^${sa}${he}]*(?:${sa}|${he}\\\\)`,"g"),gi=new RegExp(`${he}\\[[0-9;?]*[A-Za-z]`,"g"),Mi=new RegExp(`${he}\\([0-9A-Za-z]`,"g");function pa(t,a,e){if(e)return`repo:${e}`;let n=a.filter(Boolean);return t==="all"?"":t==="exclude"?n.map(r=>`-repo:${r}`).join(" "):n.map(r=>`repo:${r}`).join(" ")}function tt(){let{github:t}=T(),n=["user:@me",...ie()?.organizations?.nodes?.flatMap(r=>r?.login?[`org:${r.login}`]:[])??[]].join(" ");return(0,la.useCachedPromise)(async r=>{let p=(await Promise.allSettled(r.split(" ").map(c=>t.searchRepositories({query:`${c} archived:false sort:updated-desc`,numberOfItems:100})))).flatMap(c=>c.status==="fulfilled"?c.value.search.nodes:[]);return[...new Map(p.map(c=>[c.id,c])).values()].sort((c,s)=>new Date(s.updatedAt).getTime()-new Date(c.updatedAt).getTime())},[n])}var x=require("react/jsx-runtime");function St({draftValues:t}){let{push:a}=(0,R.useNavigation)(),{data:e}=tt(),{github:n}=T(),{handleSubmit:r,itemProps:o,values:p,setValue:c,reset:s,focus:u}=(0,le.useForm)({async onSubmit(l){let S=await(0,R.showToast)({style:R.Toast.Style.Animated,title:"Creating issue"});try{let M=(await n.createIssue({repositoryId:l.repository,title:l.title,body:l.description,assigneeIds:l.assignees,labelIds:l.labels,milestoneId:l.milestone||null,issueTypeId:l.issueType||null}))?.createIssue?.issue;M&&(await Promise.all(l.projects.map(E=>n.addIssueToProject({issueId:M.id,projectId:E}))),S.style=R.Toast.Style.Success,S.title="Created issue",S.primaryAction={title:"Open Issue",shortcut:{modifiers:["shift","cmd"],key:"o"},onAction:()=>a((0,x.jsx)(ve,{initialIssue:M}))},S.secondaryAction={title:"Copy URL",shortcut:{modifiers:["shift","cmd"],key:"c"},onAction:()=>R.Clipboard.copy(M.url)}),s({title:"",description:"",reviewers:[],assignees:[],labels:[],projects:[],milestone:"",issueType:""}),u("repository")}catch(b){S.style=R.Toast.Style.Failure,S.title="Failed creating issue",S.message=w(b)}},initialValues:{repository:t?.repository??"",title:t?.title??"",description:t?.description??"",reviewers:t?.reviewers??[],assignees:t?.assignees??[],labels:t?.labels??[],projects:t?.projects??[],milestone:t?.milestone??"",issueType:t?.issueType??""},validation:{repository:le.FormValidation.Required,title:le.FormValidation.Required}}),{data:I}=(0,le.useCachedPromise)(l=>{let S=e?.find(b=>b.id===l);return S?n.dataForRepository({owner:S.owner.login,name:S.name}):Promise.resolve(null)},[p.repository],{execute:!!p.repository}),g=I?.repository?.collaborators?.nodes,D=I?.repository?.labels?.nodes,U=I?.repository?.projectsV2?.nodes??[],y=I?.repository?.owner?.__typename==="Organization"?I.repository.owner.projectsV2?.nodes??[]:[],f=[...U,...y].filter((l,S,b)=>l?b.findIndex(M=>M?.id===l.id)===S:!1),A=I?.repository?.milestones?.nodes,P=I?.repository?.issueTypes?.nodes?.filter(l=>l&&l.isEnabled);return(0,ca.useEffect)(()=>{c("description",""),c("assignees",[]),c("labels",[]),c("projects",[]),c("milestone",""),c("issueType","")},[p.repository]),(0,x.jsxs)(R.Form,{actions:(0,x.jsx)(R.ActionPanel,{children:(0,x.jsx)(R.Action.SubmitForm,{onSubmit:r,title:"Create Issue"})}),enableDrafts:!0,children:[(0,x.jsx)(R.Form.Dropdown,{...o.repository,title:"Repository",storeValue:!0,children:e?.map(l=>(0,x.jsx)(R.Form.Dropdown.Item,{title:l.nameWithOwner,value:l.id,icon:{source:l.owner.avatarUrl,mask:R.Image.Mask.Circle}},l.id))}),(0,x.jsx)(R.Form.Separator,{}),(0,x.jsx)(R.Form.TextField,{...o.title,title:"Title",placeholder:"Issue title"}),(0,x.jsx)(R.Form.TextArea,{...o.description,placeholder:"Issue description (e.g **bold**)",title:"Description",enableMarkdown:!0}),(0,x.jsx)(R.Form.TagPicker,{...o.assignees,title:"Assignees",children:g?.map(l=>{if(!l)return null;let S=Z(l);return(0,x.jsx)(R.Form.TagPicker.Item,{icon:S.icon,title:S.text,value:l.id},l.id)})}),(0,x.jsx)(R.Form.TagPicker,{...o.labels,title:"Labels",children:D?.map(l=>l?(0,x.jsx)(R.Form.TagPicker.Item,{title:l.name,value:l.id,icon:{source:R.Icon.Dot,tintColor:l.color}},l.id):null)}),(0,x.jsx)(R.Form.TagPicker,{...o.projects,title:"Projects",children:f?.map(l=>l?(0,x.jsx)(R.Form.TagPicker.Item,{title:l.title,value:l.id},l.id):null)}),(0,x.jsxs)(R.Form.Dropdown,{...o.issueType,title:"Issue Type",children:[(0,x.jsx)(R.Form.Dropdown.Item,{value:"",title:"None"}),P?.map(l=>l?(0,x.jsx)(R.Form.Dropdown.Item,{icon:{source:R.Icon.Dot,tintColor:l.color},title:l.name,value:l.id},l.id):null)]}),(0,x.jsxs)(R.Form.Dropdown,{...o.milestone,title:"Milestone",children:[(0,x.jsx)(R.Form.Dropdown.Item,{value:"",title:"None"}),A?.map(l=>l?(0,x.jsx)(R.Form.Dropdown.Item,{title:l.title,value:l.id},l.id):null)]})]})}var hi=Je(St);var Te=require("react/jsx-runtime");function bt(){return(0,Te.jsx)(Ie.List.EmptyView,{title:"No issues found",actions:(0,Te.jsx)(Ie.ActionPanel,{children:(0,Te.jsx)(Ie.Action.Push,{title:"Create Issue",target:(0,Te.jsx)(St,{})})})})}var ae=require("@raycast/api"),ya=require("date-fns");var we=require("react/jsx-runtime");function It({issue:t,viewer:a,mutateList:e,sortQuery:n,setSortQuery:r}){let o=new Date(t.updatedAt),p=Ye(t),c=Ke(t),s=[{date:o,tooltip:`Updated: ${(0,ya.format)(o,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:p.icon,tooltip:`Author: ${p.text}`}];t.comments.totalCount>0&&s.unshift({text:`${t.comments.totalCount}`,icon:ae.Icon.Bubble}),t.linkedBranches?.nodes?.length&&s.unshift({icon:{source:"branch.svg",tintColor:ae.Color.SecondaryText},tooltip:t.linkedBranches.nodes[0]?.ref?.name});let u=[`${t.number}`];return t.author?.login&&u.push(t.author.login),(0,we.jsx)(ae.List.Item,{title:t.title,subtitle:{value:`#${t.number}`,tooltip:`Repository: ${t.repository.nameWithOwner}`},icon:{value:c.icon,tooltip:`Status: ${c.text}`},keywords:u,accessories:s,actions:(0,we.jsx)(_e,{issue:t,mutateList:e,viewer:a,sortQuery:n,setSortQuery:r,children:(0,we.jsx)(ae.Action.Push,{title:"Show Details",icon:ae.Icon.Sidebar,target:(0,we.jsx)(ve,{initialIssue:t,viewer:a,mutateList:e})})})},t.id)}var re=require("@raycast/api");var ge=require("react/jsx-runtime");function gt({setSelectedRepository:t,withAllRepositories:a=!0}){let{data:e}=tt();return(0,ge.jsxs)(re.List.Dropdown,{tooltip:"Select Repository",storeValue:!0,onChange:t,children:[a?(0,ge.jsx)(re.List.Dropdown.Item,{value:"",title:"All Repositories",icon:re.Icon.List}):null,e&&e.length>0?(0,ge.jsx)(re.List.Dropdown.Section,{children:e.map(n=>(0,ge.jsx)(re.List.Dropdown.Item,{title:n.nameWithOwner,value:n.nameWithOwner,icon:{source:n.owner.avatarUrl,mask:re.Image.Mask.Circle}},n.id))}):null]})}var da=require("@raycast/utils"),at=require("date-fns"),Sa=require("lodash");function ba({sortQuery:t,repository:a,showCreated:e,showAssigned:n,showMentioned:r,showRecentlyClosed:o,filterMode:p,repositoryList:c}){let{github:s}=T(),{data:u,...I}=(0,da.useCachedPromise)(async(S,b,M,E,ne,Me,Ma,ma)=>{let Ra=`updated:>${(0,at.format)((0,at.subDays)(Date.now(),60),"yyyy-MM-dd")}`,Aa=pa(Ma,ma,S);return(await Promise.all([...M?["is:issue author:@me archived:false is:open"]:[],...Me?["is:issue author:@me archived:false is:closed"]:[],...E?["is:issue assignee:@me archived:false is:open"]:[],...E&&Me?["is:issue assignee:@me archived:false is:closed"]:[],...ne?["is:issue mentions:@me archived:false is:open"]:[],...ne&&Me?["is:issue mentions:@me archived:false is:closed"]:[]].map(rt=>s.searchIssues({query:`${rt} ${b} ${Ra} ${Aa}`,numberOfItems:20})))).map(rt=>rt.search.nodes)},[a,t,e,n,r,o,p,c]),g,D,U,y,f,A;if(u){let S=0;e&&(g=u[S++]),o&&(D=u[S++]),n&&(U=u[S++],o&&(y=u[S++])),r&&(f=u[S++],o&&(A=u[S++]))}let P=(0,Sa.uniqBy)([...D||[],...y||[],...A||[]],"id");return{data:[{title:"Created",issues:g},{title:"Assigned",issues:U},{title:"Mentioned",issues:f},{title:"Recently Closed",issues:P}].filter(S=>S.issues&&S.issues.length>0).map(S=>{let b=be(S.issues?.length??0,"issue",{withNumber:!0});return{...S,subtitle:b}}),...I}}var ce=require("react/jsx-runtime");function rn(){let t=ie(),[a,e]=(0,ga.useState)(null),[n,r]=(0,Ia.useCachedState)("sort-query",ea,{cacheNamespace:"github-my-issue"}),{showCreated:o,showAssigned:p,showMentioned:c,showRecentlyClosed:s,repositoryFilterMode:u,repositoryList:I}=(0,Be.getPreferenceValues)(),{data:g,isLoading:D,mutate:U}=ba({repository:a,sortQuery:n,showCreated:o,showAssigned:p,showMentioned:c,showRecentlyClosed:s,filterMode:u,repositoryList:I?.split(",").map(y=>y.trim())||[]});return(0,ce.jsxs)(Be.List,{isLoading:D,searchBarPlaceholder:"Filter by title, number, or assignee",searchBarAccessory:(0,ce.jsx)(gt,{setSelectedRepository:e}),children:[g.map(y=>(0,ce.jsx)(Be.List.Section,{title:y.title,subtitle:y.subtitle,children:y.issues?.map(f=>(0,ce.jsx)(It,{issue:f,viewer:t,mutateList:U,sortQuery:n,setSortQuery:r},f.id))},y.title)),(0,ce.jsx)(bt,{})]})}var nn=Je(rn);
