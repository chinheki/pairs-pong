import{r as s,j as e}from"./jsx-runtime-56DGgGmo.js";const B=[{id:1,imageUrl:"/assets/cards/1.png",name:"伊布"},{id:2,imageUrl:"/assets/cards/2.png",name:"火伊布"},{id:3,imageUrl:"/assets/cards/3.png",name:"水伊布"},{id:4,imageUrl:"/assets/cards/4.png",name:"电伊布"},{id:5,imageUrl:"/assets/cards/5.png",name:"太阳伊布"},{id:6,imageUrl:"/assets/cards/6.png",name:"月伊布"},{id:7,imageUrl:"/assets/cards/7.png",name:"冰伊布"},{id:8,imageUrl:"/assets/cards/8.png",name:"草伊布"},{id:9,imageUrl:"/assets/cards/9.png",name:"仙子伊布"}],L={player:"玩家",robot:"机器人"};function q(){return{drawCard:()=>{const v=Math.floor(Math.random()*B.length);return B[v]}}}const W=s.createContext(void 0),z=({children:a})=>{const[v,x]=s.useState("player"),[o,g]=s.useState([]),[d,n]=s.useState([]),[b,C]=s.useState("single"),[r,p]=s.useState(void 0),[y,I]=s.useState(!0),S=()=>{x(w=>w==="player"?"robot":"player")},P=()=>{C(w=>w==="single"?"double":"single")},U=(w,j)=>{w==="player"?g(f=>[...f,j]):n(f=>[...f,j])},k=s.useMemo(()=>{const w=o.reduce((f,N)=>f+N,0),j=d.reduce((f,N)=>f+N,0);return w>j?"player":j>w?"robot":null},[o,d]);return e.jsx(W.Provider,{value:{currentPlayer:v,switchPlayer:S,addTrophy:U,playerTrophies:o,robotTrophies:d,winner:k,gameMode:b,switchMode:P,myCard:r,setMyCard:p,gameEnd:y,setGameEnd:I},children:a})},D=()=>{const a=s.useContext(W);if(a===void 0)throw new Error("useGame must be used within a GameProvider");return a},H=()=>{const[x,o]=s.useState(!0),[g,d]=s.useState(Array(9).fill(null)),{currentPlayer:n,switchPlayer:b,addTrophy:C,winner:r,gameEnd:p,setGameEnd:y}=D(),{drawCard:I}=q(),[S,P]=s.useState({cellId:null,player:"player"}),[U,k]=s.useState(null),[w,j]=s.useState(!1),f=s.useCallback(i=>{const c=g.find(l=>l&&l.id===i.id&&l.cellId!=i.cellId);return c==null?void 0:c.cellId},[g]),N=s.useCallback((i,c)=>{d(l=>l.map(t=>t&&(t.cellId===i||t.cellId===c)?null:t))},[]),E=s.useCallback(i=>{i==null||i.preventDefault(),o(!1),console.log("draw card "+L[n]);const c=Array.from({length:9},(h,M)=>M).filter(h=>!g.some(M=>M&&M.cellId===h));if(c.length===0){y(!0);return}const l=Math.floor(Math.random()*c.length),t=c[l],m=I(),u=[...g];u[t]={...m,cellId:t},d(u),P({cellId:t,player:n}),setTimeout(()=>{const h=f(m);if(h!==void 0){k({cellId1:h,cellId2:t}),j(!0);const M=setInterval(()=>{j(R=>!R)},100);setTimeout(()=>{clearInterval(M),j(!1),k(null),N(h,t),C(n,m.id),setTimeout(()=>{b()},1e3)},1e3)}else b()},1e3)},[C,g,f,n,I,N,y,b]);s.useEffect(()=>{n==="robot"?E():o(!0)},[n]);const A=i=>{const c=g[i],l=c&&S.cellId&&i===S.cellId,t=U&&(i===U.cellId1||i===U.cellId2);let m="";return t&&w?m="bg-orange-300":l&&(m=S.player==="player"?"bg-yellow-200":"bg-purple-200"),e.jsx("div",{className:`w-24 h-24 border border-gray-400 flex items-center justify-center relative ${m}`,children:c&&e.jsx("img",{src:c.imageUrl,alt:c.name,className:"max-w-full max-h-full object-contain"})},i)};return e.jsxs("div",{className:"flex flex-col items-center",children:[p?e.jsxs("p",{className:"mt-4",children:["游戏结束！获胜方：",r==="player"?"玩家":"机器人"]}):e.jsxs("p",{className:"mt-4",children:["当前回合: ",n==="player"?"玩家":"机器人"]}),e.jsx("div",{className:"grid grid-cols-3 gap-1 mb-4",children:Array.from({length:3*3},(i,c)=>A(c))}),e.jsx("button",{onClick:E,className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",disabled:p||!x,children:"抽牌"})]})},J=()=>{const[x,o]=s.useState(9),[g,d]=s.useState(!0),[n,b]=s.useState(Array(9).fill(null)),{addTrophy:C,playerTrophies:r,myCard:p,gameEnd:y,setGameEnd:I}=D(),{drawCard:S}=q(),[P,U]=s.useState({cellId:null,player:"player"}),[k,w]=s.useState(null),[j,f]=s.useState(!1),N=s.useCallback(l=>{const t=n.find(m=>m&&m.id===l.id&&m.cellId!=l.cellId);return t==null?void 0:t.cellId},[n]),E=s.useCallback(l=>p!==void 0&&l.id===p,[p]),A=s.useCallback((l,t)=>{b(m=>m.map(u=>u&&(u.cellId===l||u.cellId===t)?null:u))},[]),i=s.useCallback(l=>{l==null||l.preventDefault(),d(!1);const t=Array.from({length:9},(G,T)=>T).filter(G=>!n.some(T=>T&&T.cellId===G));if(t.length===0){I(!0),console.error("棋盘已满，无法放置新卡片");return}const m=Math.floor(Math.random()*t.length),u=t[m],h=S(),M=[...n];M[u]={...h,cellId:u},b(M),o(G=>G-1);let R=x-1;U({cellId:u,player:"player"}),setTimeout(()=>{E(h)&&(o(F=>F+1),R+=1);const T=N(h);if(T!==void 0){w({cellId1:T,cellId2:u}),f(!0);const F=setInterval(()=>{f(_=>!_)},100);setTimeout(()=>{clearInterval(F),f(!1),w(null),A(T,u),C("player",h.id),o(_=>_+1),d(!0)},1e3)}else R===0&&I(!0),d(!0)},1e3)},[C,n,x,N,E,S,A]),c=l=>{const t=n[l],m=t&&P.cellId&&l===P.cellId,u=k&&(l===k.cellId1||l===k.cellId2);let h="";return u&&j?h="bg-orange-300":m&&(h="bg-yellow-200"),e.jsx("div",{className:`w-24 h-24 border border-gray-400 flex items-center justify-center relative ${h}`,children:t&&e.jsx("img",{src:t.imageUrl,alt:t.name,className:"max-w-full max-h-full object-contain"})},l)};return e.jsxs("div",{className:"flex flex-col items-center",children:[y?e.jsxs("p",{className:"mt-4",children:["最终结果：",r.length,"个碰"]}):e.jsxs("p",{className:"mt-4",children:["当前",r.length,"个碰，还有",x,"次抽卡机会"]}),e.jsx("div",{className:"grid grid-cols-3 gap-1 mb-4",children:Array.from({length:3*3},(l,t)=>c(t))}),e.jsx("button",{onClick:i,className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",disabled:y||!g,children:"抽牌"})]})},$=({player:a})=>{const{playerTrophies:x,robotTrophies:o}=D(),g=a==="player"?x:o,d=a==="player"?x.length:o.length,n=Math.max(1,Math.ceil(d/8)),b=r=>{const p=g[r],y=B.find(I=>I.id===p);return e.jsx("div",{className:`w-12 h-12 border border-gray-400 flex items-center justify-center relative ${a==="player"?"bg-yellow-200":"bg-purple-200"}`,children:y&&e.jsx("img",{src:y.imageUrl,alt:y.name,className:"max-w-full max-h-full object-contain"})},r)},C=r=>e.jsx("div",{className:"flex",children:Array.from({length:8},(p,y)=>b(r*8+y))},r);return e.jsxs("div",{className:"inline-block border-2 border-gray-800 p-2",children:[e.jsxs("div",{className:"mb-2 text-center font-bold",children:[L[a],"的对子"]}),Array.from({length:n},(r,p)=>C(p))]})};function K(){const{gameMode:a}=D();return e.jsxs(e.Fragment,{children:[a==="single"?null:e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-700 dark:text-gray-200",children:"对手"}),e.jsx($,{player:"robot"})]}),a==="single"?e.jsx(J,{}):e.jsx(H,{}),e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx($,{player:"player"}),e.jsx("h2",{className:"text-xl font-semibold text-gray-700 dark:text-gray-200",children:"玩家"})]})]})}const O=()=>{const{gameMode:a,switchMode:v,setMyCard:x,gameEnd:o,setGameEnd:g}=D(),[d,n]=s.useState(!1),[b,C]=s.useState(1);return s.useEffect(()=>{x(d?b:void 0)},[b,d]),e.jsx("div",{className:"w-full bg-yellow-100 p-5",children:e.jsxs("div",{className:"container mx-auto flex justify-center items-center gap-5",children:[e.jsx("h1",{className:"text-xl font-bold",children:"对对碰"}),e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("button",{onClick:()=>v(),disabled:a==="single",className:`${a==="single"?"bg-blue-500 text-white":"bg-white text-blue-500"} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`,children:"单人对对碰"}),e.jsx("button",{onClick:()=>v(),disabled:a==="double",className:`${a==="double"?"bg-blue-500 text-white":"bg-white text-blue-500"} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`,children:"人机对战"}),e.jsx("input",{type:"checkbox",checked:d,onChange:()=>n(r=>!r)}),"押宝模式",e.jsxs("select",{onChange:r=>C(Number(r.target.value)),className:"ml-2 p-2 border rounded",value:b,disabled:!d||!o,children:[e.jsx("option",{value:"",children:"选择卡片"}),B.map(r=>e.jsxs("option",{value:r.id,children:[e.jsx("img",{src:r.imageUrl,alt:r.name,className:"w-12 h-12 inline-block mr-2"}),r.name]},r.id))]}),e.jsx("button",{onClick:()=>g(!1),disabled:!o,className:`${o?"bg-blue-500 text-white":"bg-white text-blue-500"} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`,children:"开始游戏"})]})]})})},V=()=>[{title:"New Remix App"},{name:"description",content:"Welcome to Remix!"}];function X(){return e.jsx("div",{className:"flex h-screen w-screen items-center justify-center",children:e.jsx("div",{className:"flex h-screen w-screen flex-col items-center gap-16",children:e.jsxs(z,{children:[e.jsx(O,{}),e.jsx(K,{})]})})})}export{X as default,V as meta};
