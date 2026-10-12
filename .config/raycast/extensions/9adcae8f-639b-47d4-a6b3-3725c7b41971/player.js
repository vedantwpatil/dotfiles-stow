"use strict";var D=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var V=Object.prototype.hasOwnProperty;var R=(a,e)=>{for(var i in e)D(a,i,{get:e[i],enumerable:!0})},E=(a,e,i,y)=>{if(e&&typeof e=="object"||typeof e=="function")for(let m of A(e))!V.call(a,m)&&m!==i&&D(a,m,{get:()=>e[m],enumerable:!(y=M(e,m))||y.enumerable});return a};var O=a=>E(D({},"__esModule",{value:!0}),a);var B={};R(B,{default:()=>F});module.exports=O(B);var p=require("@raycast/api");var r=require("@raycast/api");var d=require("react");var S=require("@raycast/api");async function w(a){let e=await S.LocalStorage.getItem(a);return e==null?null:JSON.parse(e)}async function g(a,e){let i=JSON.stringify(e);await S.LocalStorage.setItem(a,i)}function U(){let[a,e]=(0,d.useState)([]),[i,y]=(0,d.useState)([]),[m,f]=(0,d.useState)([]);async function s(o){if(o.type==="team"){let n=a.filter(t=>t.id!==o.value.id);return e([...n,o.value]),g("favoriteTeams",[...n,o.value])}if(o.type==="player"){let n=i.filter(t=>t.id!==o.value.id);return y([...n,o.value]),g("favoritePlayers",[...n,o.value])}if(o.type==="league"){let n=m.filter(t=>t.id!==o.value.id);return f([...n,o.value]),g("favoriteLeagues",[...n,o.value])}}async function h(o,n){if(o==="team"){let t=a.filter(c=>c.id!==n);return e(t),g("favoriteTeams",t)}if(o==="player"){let t=i.filter(c=>c.id!==n);return y(t),g("favoritePlayers",t)}if(o==="league"){let t=m.filter(c=>c.id!==n);return f(t),g("favoriteLeagues",t)}}async function l(){let o=await w("favoriteTeams"),n=await w("favoritePlayers"),t=await w("favoriteLeagues");o&&e(o),n&&y(n),t&&f(t)}return(0,d.useEffect)(()=>{l()},[]),(0,d.useMemo)(()=>({teams:a,players:i,leagues:m,addItems:s,removeItems:h,reloadData:l}),[a,i,m])}var x=require("@raycast/utils");function b(a){return`https://images.fotmob.com/image_resources/playerimages/${a}.png`}function $(a){return`https://www.fotmob.com/teams/${a}`}function N(a){return`https://www.fotmob.com/players/${a}`}async function K(a){return{1113903:["Player Name"]}[a]||[]}function C(a){let{data:e,error:i,isLoading:y,revalidate:m}=(0,x.useCachedPromise)(async s=>{let h=`https://apigw.fotmob.com/searchapi/suggest?term=${s}&lang=en`;try{let l=await fetch(h);if(!l.ok)throw new Error(`Search API failed: ${l.status}`);let o=await l.json(),n=o.squadMemberSuggest?.[0]?.options||[],t=n.find(c=>c.payload.id===s);if(!t&&o.total===0){let c=await K(s);for(let T of c)try{if(h=`https://apigw.fotmob.com/searchapi/suggest?term=${encodeURIComponent(T)}&lang=en`,l=await fetch(h),l.ok&&(o=await l.json(),n=o.squadMemberSuggest?.[0]?.options||[],t=n.find(k=>k.payload.id===s),t))break}catch{}}if(!t)try{let c=`https://www.fotmob.com/players/${s}`;if((await fetch(c,{method:"HEAD"})).ok)return{id:Number(s),name:`Player ${s}`,firstName:"",lastName:"",shortName:"",imageUrl:b(s),birthdate:void 0,meta:{personId:Number(s),position:"Unknown",positionDescription:"",foot:"",height:0,weight:0,country:void 0,nationalTeam:void 0},primaryTeam:void 0,careerHistory:{careerItems:[],careerTitles:[]},statSeasons:[],recentMatches:[],nextMatch:void 0,trophies:[],news:[],marketValue:[],transferHistory:[]}}catch{}if(!t)throw new Error(`Player with ID ${s} not found. Try using the "Search Players" command to find the player by name, which is more reliable than searching by ID.`);if(t){let c=t.text.split("|")[0];return{id:Number(s),name:c,firstName:"",lastName:"",shortName:"",imageUrl:b(s),birthdate:void 0,meta:{personId:Number(s),position:t.payload.isCoach?"Coach":"Player",positionDescription:"",foot:"",height:0,weight:0,country:void 0,nationalTeam:void 0},primaryTeam:t.payload.teamId?{id:t.payload.teamId,name:t.payload.teamName||"",shortName:"",teamColorPrimary:"",teamColorSecondary:"",teamColorText:""}:void 0,careerHistory:{careerItems:[],careerTitles:[]},statSeasons:[],recentMatches:[],nextMatch:void 0,trophies:[],news:[],marketValue:[],transferHistory:[]}}throw new Error(`Player with ID ${s} exists but could not be retrieved from search results. Try using the "Search Players" command to find the player by name instead.`)}catch(l){throw l instanceof Error?l:new Error(`Unable to fetch player data: ${l instanceof Error?l.message:"Unknown error"}`)}},[a],{execute:!!a&&!Number.isNaN(Number(a)),keepPreviousData:!0}),f={id:Number(a)||0,name:"Unknown Player",firstName:"",lastName:"",shortName:"",imageUrl:b(a),birthdate:void 0,meta:{personId:Number(a)||0,position:"Unknown",positionDescription:"",foot:"",height:0,weight:0,country:void 0,nationalTeam:void 0},primaryTeam:void 0,careerHistory:{careerItems:[],careerTitles:[]},statSeasons:[],recentMatches:[],nextMatch:void 0,trophies:[],news:[],marketValue:[],transferHistory:[]};return{playerDetail:e??f,error:i,isLoading:y,revalidate:m}}var P=require("@raycast/api");function L(a){return(0,P.launchCommand)({name:"team",type:P.LaunchType.UserInitiated,arguments:{teamId:a}})}var u=require("react/jsx-runtime");function I({id:a}){let{playerDetail:e,isLoading:i,error:y}=C(a),m=U(),f=m.players.some(n=>n.id===a),s=async()=>{await m.addItems({type:"player",value:{id:a,isCoach:e.meta?.position==="Coach"||!1,name:e.name}}),(0,r.showToast)({style:r.Toast.Style.Success,title:"Added to Favorites",message:`${e.name} has been added to your favorites`})},h=async()=>{await m.removeItems("player",a),(0,r.showToast)({style:r.Toast.Style.Success,title:"Removed from Favorites",message:`${e.name} has been removed from your favorites`})};if(y){let n=y instanceof Error?y.message:"Unknown error occurred";return(0,u.jsx)(r.Detail,{markdown:`# Player Not Found

We couldn't find detailed information for this player.

**Player ID:** ${a}

## Possible reasons:

- The player ID might not exist in the FotMob database
- The player might be from a lower league not covered by FotMob
- The player might be a youth player or reserve team member
- There might be a temporary issue with the data source

## What you can do:

### 1. **Search by Name**
Use the "Search Players" command to find the player by name instead of ID. This is often more reliable.

### 2. **Verify the ID**
Check if the player exists on FotMob's website using the browser link below.

### 3. **Try Alternative Sources**
If the player doesn't exist on FotMob, they might be available on other football databases.

---

**Error Details:** ${n}
`,navigationTitle:"Player Not Found",actions:(0,u.jsxs)(r.ActionPanel,{children:[(0,u.jsx)(r.Action.OpenInBrowser,{title:"Open in Browser",icon:r.Icon.Globe,url:N(a)}),(0,u.jsx)(r.Action.CopyToClipboard,{title:"Copy Player ID",icon:r.Icon.Clipboard,content:a,shortcut:{modifiers:["cmd"],key:"c"}}),(0,u.jsx)(r.Action,{title:"Search Players by Name",icon:r.Icon.MagnifyingGlass,shortcut:{modifiers:["cmd"],key:"s"},onAction:()=>{(0,r.showToast)({style:r.Toast.Style.Success,title:"Tip",message:"Use 'Search Players' command to find the correct player by name"})}})]})})}let l=()=>{let n=e.name===`Player ${e.id}`||e.meta?.position==="Unknown",t=`# ${e.name}

`,c=e.imageUrl||b(e.id);return t+=`![${e.name}](${c})

`,t+=`## Player Information

`,t+=`**Player ID:** ${e.id}

`,e.meta?.position&&e.meta.position!=="Unknown"&&(t+=`**Position:** ${e.meta.position}

`),e.primaryTeam&&(t+=`**Current Team:** ${e.primaryTeam.name}

`),n&&(t+=`---

`,t+=`## \u2139\uFE0F Limited Player Data

`,t+=`This player exists on FotMob but has limited information available through the API. This is common for:

`,t+=`\u2022 Players from lower leagues
`,t+=`\u2022 Youth or reserve team players
`,t+=`\u2022 Recently transferred players
`,t+=`\u2022 Players with updated profiles

`,t+=`**\u{1F4A1} Tip:** Use the "Open in Browser" button below to view complete player information on the FotMob website.

`,t+=`**\u{1F50D} Alternative:** Try searching for the player by name using the "Search Players" command for better results.

`),t},o=e.name===`Player ${e.id}`||e.meta?.position==="Unknown";return(0,u.jsx)(r.Detail,{isLoading:i,markdown:l(),navigationTitle:o?`Player ${e.id} (Limited Data)`:e.name,actions:(0,u.jsxs)(r.ActionPanel,{children:[(0,u.jsx)(r.Action.OpenInBrowser,{title:"Open in Browser",icon:r.Icon.Globe,url:N(e.id)}),o&&(0,u.jsx)(r.Action,{title:"Search Players by Name",icon:r.Icon.MagnifyingGlass,shortcut:{modifiers:["cmd"],key:"s"},onAction:()=>{(0,r.showToast)({style:r.Toast.Style.Success,title:"Tip",message:"Use 'Search Players' command to find more detailed player information by name"})}}),(0,u.jsx)(r.Action,{icon:f?r.Icon.StarDisabled:r.Icon.Star,title:f?"Remove from Favorites":"Add to Favorites",onAction:f?h:s}),e.primaryTeam&&(0,u.jsx)(r.Action,{icon:r.Icon.Person,title:"View Team Details",onAction:()=>L(e.primaryTeam?.id.toString()||"0")}),(0,u.jsx)(r.Action.CopyToClipboard,{title:"Copy Player ID",content:e.id.toString(),shortcut:{modifiers:["cmd"],key:"c"}}),e.primaryTeam&&(0,u.jsx)(r.Action.OpenInBrowser,{title:"Open Team in Browser",icon:r.Icon.Globe,url:$(e.primaryTeam.id)})]})})}var v=require("react/jsx-runtime");function F(a){let{playerId:e}=a.arguments,{pop:i}=(0,p.useNavigation)();return!e||Number.isNaN(Number(e))?((0,p.showToast)({title:"Player ID must be a number",message:"Please enter a valid player ID",style:p.Toast.Style.Failure,primaryAction:{title:"Retry",onAction:()=>{i()}}}),(0,v.jsx)(p.List,{children:(0,v.jsx)(p.List.EmptyView,{icon:p.Icon.XMarkCircleFilled,description:"Player ID must be a number"})})):(0,v.jsx)(I,{id:e})}
