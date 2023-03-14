import{b as Ee}from"./vendor-31518fed.js";function _t(te){return te&&te.__esModule&&Object.prototype.hasOwnProperty.call(te,"default")?te.default:te}const St="0.17.11";var Se={},kt={get exports(){return Se},set exports(te){Se=te}};(function(te){(Be=>{var be=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,We=Object.getOwnPropertyNames,ze=Object.prototype.hasOwnProperty,Ge=(e,n)=>{for(var r in n)be(e,r,{get:n[r],enumerable:!0})},qe=(e,n,r,h)=>{if(n&&typeof n=="object"||typeof n=="function")for(let g of We(n))!ze.call(e,g)&&g!==r&&be(e,g,{get:()=>n[g],enumerable:!(h=Le(n,g))||h.enumerable});return e},Je=e=>qe(be({},"__esModule",{value:!0}),e),re=(e,n,r)=>new Promise((h,g)=>{var y=d=>{try{x(r.next(d))}catch(S){g(S)}},f=d=>{try{x(r.throw(d))}catch(S){g(S)}},x=d=>d.done?h(d.value):Promise.resolve(d.value).then(y,f);x((r=r.apply(e,n)).next())}),he={};Ge(he,{analyzeMetafile:()=>dt,analyzeMetafileSync:()=>pt,build:()=>at,buildSync:()=>ht,context:()=>ct,default:()=>vt,formatMessages:()=>ft,formatMessagesSync:()=>gt,initialize:()=>yt,transform:()=>ut,transformSync:()=>mt,version:()=>ot}),Be.exports=Je(he);function Te(e){let n=h=>{if(h===null)r.write8(0);else if(typeof h=="boolean")r.write8(1),r.write8(+h);else if(typeof h=="number")r.write8(2),r.write32(h|0);else if(typeof h=="string")r.write8(3),r.write(Z(h));else if(h instanceof Uint8Array)r.write8(4),r.write(h);else if(h instanceof Array){r.write8(5),r.write32(h.length);for(let g of h)n(g)}else{let g=Object.keys(h);r.write8(6),r.write32(g.length);for(let y of g)r.write(Z(y)),n(h[y])}},r=new $e;return r.write32(0),r.write32(e.id<<1|+!e.isRequest),n(e.value),_e(r.buf,r.len-4,0),r.buf.subarray(0,r.len)}function Ye(e){let n=()=>{switch(r.read8()){case 0:return null;case 1:return!!r.read8();case 2:return r.read32();case 3:return le(r.read());case 4:return r.read();case 5:{let f=r.read32(),x=[];for(let d=0;d<f;d++)x.push(n());return x}case 6:{let f=r.read32(),x={};for(let d=0;d<f;d++)x[le(r.read())]=n();return x}default:throw new Error("Invalid packet")}},r=new $e(e),h=r.read32(),g=(h&1)===0;h>>>=1;let y=n();if(r.ptr!==e.length)throw new Error("Invalid packet");return{id:h,isRequest:g,value:y}}var $e=class{constructor(e=new Uint8Array(1024)){this.buf=e,this.len=0,this.ptr=0}_write(e){if(this.len+e>this.buf.length){let n=new Uint8Array((this.len+e)*2);n.set(this.buf),this.buf=n}return this.len+=e,this.len-e}write8(e){let n=this._write(1);this.buf[n]=e}write32(e){let n=this._write(4);_e(this.buf,e,n)}write(e){let n=this._write(4+e.length);_e(this.buf,e.length,n),this.buf.set(e,n+4)}_read(e){if(this.ptr+e>this.buf.length)throw new Error("Invalid packet");return this.ptr+=e,this.ptr-e}read8(){return this.buf[this._read(1)]}read32(){return je(this.buf,this._read(4))}read(){let e=this.read32(),n=new Uint8Array(e),r=this._read(n.length);return n.set(this.buf.subarray(r,r+e)),n}},Z,le,xe;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let e=new TextEncoder,n=new TextDecoder;Z=r=>e.encode(r),le=r=>n.decode(r),xe='new TextEncoder().encode("")'}else if(typeof Ee.Buffer<"u")Z=e=>Ee.Buffer.from(e),le=e=>{let{buffer:n,byteOffset:r,byteLength:h}=e;return Ee.Buffer.from(n,r,h).toString()},xe='Buffer.from("")';else throw new Error("No UTF-8 codec found");if(!(Z("")instanceof Uint8Array))throw new Error(`Invariant violation: "${xe} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);function je(e,n){return e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24}function _e(e,n,r){e[r++]=n,e[r++]=n>>8,e[r++]=n>>16,e[r++]=n>>24}var J=JSON.stringify,Pe="warning",Oe="silent";function Ce(e){if(H(e,"target"),e.indexOf(",")>=0)throw new Error(`Invalid target: ${e}`);return e}var me=()=>null,L=e=>typeof e=="boolean"?null:"a boolean",k=e=>typeof e=="string"?null:"a string",ge=e=>e instanceof RegExp?null:"a RegExp object",oe=e=>typeof e=="number"&&e===(e|0)?null:"an integer",De=e=>typeof e=="function"?null:"a function",G=e=>Array.isArray(e)?null:"an array",ee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"an object",He=e=>typeof e=="object"&&e!==null?null:"an array or an object",Qe=e=>e instanceof WebAssembly.Module?null:"a WebAssembly.Module",Ue=e=>typeof e=="object"&&!Array.isArray(e)?null:"an object or null",Re=e=>typeof e=="string"||typeof e=="boolean"?null:"a string or a boolean",Xe=e=>typeof e=="string"||typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"a string or an object",Ke=e=>typeof e=="string"||Array.isArray(e)?null:"a string or an array",Ae=e=>typeof e=="string"||e instanceof Uint8Array?null:"a string or a Uint8Array",Ze=e=>typeof e=="string"||e instanceof URL?null:"a string or a URL";function i(e,n,r,h){let g=e[r];if(n[r+""]=!0,g===void 0)return;let y=h(g);if(y!==null)throw new Error(`${J(r)} must be ${y}`);return g}function q(e,n,r){for(let h in e)if(!(h in n))throw new Error(`Invalid option ${r}: ${J(h)}`)}function et(e){let n=Object.create(null),r=i(e,n,"wasmURL",Ze),h=i(e,n,"wasmModule",Qe),g=i(e,n,"worker",L);return q(e,n,"in initialize() call"),{wasmURL:r,wasmModule:h,worker:g}}function Ie(e){let n;if(e!==void 0){n=Object.create(null);for(let r in e){let h=e[r];if(typeof h=="string"||h===!1)n[r]=h;else throw new Error(`Expected ${J(r)} in mangle cache to map to either a string or false`)}}return n}function pe(e,n,r,h,g){let y=i(n,r,"color",L),f=i(n,r,"logLevel",k),x=i(n,r,"logLimit",oe);y!==void 0?e.push(`--color=${y}`):h&&e.push("--color=true"),e.push(`--log-level=${f||g}`),e.push(`--log-limit=${x||0}`)}function H(e,n,r){if(typeof e!="string")throw new Error(`Expected value for ${n}${r!==void 0?" "+J(r):""} to be a string, got ${typeof e} instead`);return e}function Me(e,n,r){let h=i(n,r,"legalComments",k),g=i(n,r,"sourceRoot",k),y=i(n,r,"sourcesContent",L),f=i(n,r,"target",Ke),x=i(n,r,"format",k),d=i(n,r,"globalName",k),S=i(n,r,"mangleProps",ge),T=i(n,r,"reserveProps",ge),R=i(n,r,"mangleQuoted",L),N=i(n,r,"minify",L),j=i(n,r,"minifySyntax",L),V=i(n,r,"minifyWhitespace",L),E=i(n,r,"minifyIdentifiers",L),P=i(n,r,"drop",G),I=i(n,r,"charset",k),O=i(n,r,"treeShaking",L),u=i(n,r,"ignoreAnnotations",L),l=i(n,r,"jsx",k),o=i(n,r,"jsxFactory",k),a=i(n,r,"jsxFragment",k),p=i(n,r,"jsxImportSource",k),w=i(n,r,"jsxDev",L),$=i(n,r,"jsxSideEffects",L),t=i(n,r,"define",ee),s=i(n,r,"logOverride",ee),c=i(n,r,"supported",ee),m=i(n,r,"pure",G),_=i(n,r,"keepNames",L),A=i(n,r,"platform",k);if(h&&e.push(`--legal-comments=${h}`),g!==void 0&&e.push(`--source-root=${g}`),y!==void 0&&e.push(`--sources-content=${y}`),f&&(Array.isArray(f)?e.push(`--target=${Array.from(f).map(Ce).join(",")}`):e.push(`--target=${Ce(f)}`)),x&&e.push(`--format=${x}`),d&&e.push(`--global-name=${d}`),A&&e.push(`--platform=${A}`),N&&e.push("--minify"),j&&e.push("--minify-syntax"),V&&e.push("--minify-whitespace"),E&&e.push("--minify-identifiers"),I&&e.push(`--charset=${I}`),O!==void 0&&e.push(`--tree-shaking=${O}`),u&&e.push("--ignore-annotations"),P)for(let b of P)e.push(`--drop:${H(b,"drop")}`);if(S&&e.push(`--mangle-props=${S.source}`),T&&e.push(`--reserve-props=${T.source}`),R!==void 0&&e.push(`--mangle-quoted=${R}`),l&&e.push(`--jsx=${l}`),o&&e.push(`--jsx-factory=${o}`),a&&e.push(`--jsx-fragment=${a}`),p&&e.push(`--jsx-import-source=${p}`),w&&e.push("--jsx-dev"),$&&e.push("--jsx-side-effects"),t)for(let b in t){if(b.indexOf("=")>=0)throw new Error(`Invalid define: ${b}`);e.push(`--define:${b}=${H(t[b],"define",b)}`)}if(s)for(let b in s){if(b.indexOf("=")>=0)throw new Error(`Invalid log override: ${b}`);e.push(`--log-override:${b}=${H(s[b],"log override",b)}`)}if(c)for(let b in c){if(b.indexOf("=")>=0)throw new Error(`Invalid supported: ${b}`);const C=c[b];if(typeof C!="boolean")throw new Error(`Expected value for supported ${J(b)} to be a boolean, got ${typeof C} instead`);e.push(`--supported:${b}=${C}`)}if(m)for(let b of m)e.push(`--pure:${H(b,"pure")}`);_&&e.push("--keep-names")}function tt(e,n,r,h,g){var y;let f=[],x=[],d=Object.create(null),S=null,T=null;pe(f,n,d,r,h),Me(f,n,d);let R=i(n,d,"sourcemap",Re),N=i(n,d,"bundle",L),j=i(n,d,"splitting",L),V=i(n,d,"preserveSymlinks",L),E=i(n,d,"metafile",L),P=i(n,d,"outfile",k),I=i(n,d,"outdir",k),O=i(n,d,"outbase",k),u=i(n,d,"tsconfig",k),l=i(n,d,"resolveExtensions",G),o=i(n,d,"nodePaths",G),a=i(n,d,"mainFields",G),p=i(n,d,"conditions",G),w=i(n,d,"external",G),$=i(n,d,"packages",k),t=i(n,d,"alias",ee),s=i(n,d,"loader",ee),c=i(n,d,"outExtension",ee),m=i(n,d,"publicPath",k),_=i(n,d,"entryNames",k),A=i(n,d,"chunkNames",k),b=i(n,d,"assetNames",k),C=i(n,d,"inject",G),M=i(n,d,"banner",ee),z=i(n,d,"footer",ee),D=i(n,d,"entryPoints",He),F=i(n,d,"absWorkingDir",k),U=i(n,d,"stdin",ee),B=(y=i(n,d,"write",L))!=null?y:g,Y=i(n,d,"allowOverwrite",L),K=i(n,d,"mangleCache",ee);if(d.plugins=!0,q(n,d,`in ${e}() call`),R&&f.push(`--sourcemap${R===!0?"":`=${R}`}`),N&&f.push("--bundle"),Y&&f.push("--allow-overwrite"),j&&f.push("--splitting"),V&&f.push("--preserve-symlinks"),E&&f.push("--metafile"),P&&f.push(`--outfile=${P}`),I&&f.push(`--outdir=${I}`),O&&f.push(`--outbase=${O}`),u&&f.push(`--tsconfig=${u}`),$&&f.push(`--packages=${$}`),l){let v=[];for(let W of l){if(H(W,"resolve extension"),W.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${W}`);v.push(W)}f.push(`--resolve-extensions=${v.join(",")}`)}if(m&&f.push(`--public-path=${m}`),_&&f.push(`--entry-names=${_}`),A&&f.push(`--chunk-names=${A}`),b&&f.push(`--asset-names=${b}`),a){let v=[];for(let W of a){if(H(W,"main field"),W.indexOf(",")>=0)throw new Error(`Invalid main field: ${W}`);v.push(W)}f.push(`--main-fields=${v.join(",")}`)}if(p){let v=[];for(let W of p){if(H(W,"condition"),W.indexOf(",")>=0)throw new Error(`Invalid condition: ${W}`);v.push(W)}f.push(`--conditions=${v.join(",")}`)}if(w)for(let v of w)f.push(`--external:${H(v,"external")}`);if(t)for(let v in t){if(v.indexOf("=")>=0)throw new Error(`Invalid package name in alias: ${v}`);f.push(`--alias:${v}=${H(t[v],"alias",v)}`)}if(M)for(let v in M){if(v.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${v}`);f.push(`--banner:${v}=${H(M[v],"banner",v)}`)}if(z)for(let v in z){if(v.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${v}`);f.push(`--footer:${v}=${H(z[v],"footer",v)}`)}if(C)for(let v of C)f.push(`--inject:${H(v,"inject")}`);if(s)for(let v in s){if(v.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${v}`);f.push(`--loader:${v}=${H(s[v],"loader",v)}`)}if(c)for(let v in c){if(v.indexOf("=")>=0)throw new Error(`Invalid out extension: ${v}`);f.push(`--out-extension:${v}=${H(c[v],"out extension",v)}`)}if(D)if(Array.isArray(D))for(let v=0,W=D.length;v<W;v++){let Q=D[v];if(typeof Q=="object"&&Q!==null){let X=Object.create(null),se=i(Q,X,"in",k),ve=i(Q,X,"out",k);if(q(Q,X,"in entry point at index "+v),se===void 0)throw new Error('Missing property "in" for entry point at index '+v);if(ve===void 0)throw new Error('Missing property "out" for entry point at index '+v);x.push([ve,se])}else x.push(["",H(Q,"entry point at index "+v)])}else for(let v in D)x.push([v,H(D[v],"entry point",v)]);if(U){let v=Object.create(null),W=i(U,v,"contents",Ae),Q=i(U,v,"resolveDir",k),X=i(U,v,"sourcefile",k),se=i(U,v,"loader",k);q(U,v,'in "stdin" object'),X&&f.push(`--sourcefile=${X}`),se&&f.push(`--loader=${se}`),Q&&(T=Q),typeof W=="string"?S=Z(W):W instanceof Uint8Array&&(S=W)}let ue=[];if(o)for(let v of o)v+="",ue.push(v);return{entries:x,flags:f,write:B,stdinContents:S,stdinResolveDir:T,absWorkingDir:F,nodePaths:ue,mangleCache:Ie(K)}}function nt(e,n,r,h){let g=[],y=Object.create(null);pe(g,n,y,r,h),Me(g,n,y);let f=i(n,y,"sourcemap",Re),x=i(n,y,"tsconfigRaw",Xe),d=i(n,y,"sourcefile",k),S=i(n,y,"loader",k),T=i(n,y,"banner",k),R=i(n,y,"footer",k),N=i(n,y,"mangleCache",ee);return q(n,y,`in ${e}() call`),f&&g.push(`--sourcemap=${f===!0?"external":f}`),x&&g.push(`--tsconfig-raw=${typeof x=="string"?x:JSON.stringify(x)}`),d&&g.push(`--sourcefile=${d}`),S&&g.push(`--loader=${S}`),T&&g.push(`--banner=${T}`),R&&g.push(`--footer=${R}`),{flags:g,mangleCache:Ie(N)}}function rt(e){const n={},r={didClose:!1,reason:""};let h={},g=0,y=0,f=new Uint8Array(16*1024),x=0,d=u=>{let l=x+u.length;if(l>f.length){let a=new Uint8Array(l*2);a.set(f),f=a}f.set(u,x),x+=u.length;let o=0;for(;o+4<=x;){let a=je(f,o);if(o+4+a>x)break;o+=4,V(f.subarray(o,o+a)),o+=a}o>0&&(f.copyWithin(0,o,x),x-=o)},S=u=>{r.didClose=!0,u&&(r.reason=": "+(u.message||u));const l="The service was stopped"+r.reason;for(let o in h)h[o](l,null);h={}},T=(u,l,o)=>{if(r.didClose)return o("The service is no longer running"+r.reason,null);let a=g++;h[a]=(p,w)=>{try{o(p,w)}finally{u&&u.unref()}},u&&u.ref(),e.writeToStdin(Te({id:a,isRequest:!0,value:l}))},R=(u,l)=>{if(r.didClose)throw new Error("The service is no longer running"+r.reason);e.writeToStdin(Te({id:u,isRequest:!1,value:l}))},N=(u,l)=>re(this,null,function*(){try{if(l.command==="ping"){R(u,{});return}if(typeof l.key=="number"){const o=n[l.key];if(o){const a=o[l.command];if(a){yield a(u,l);return}}}throw new Error("Invalid command: "+l.command)}catch(o){R(u,{errors:[ie(o,e,null,void 0,"")]})}}),j=!0,V=u=>{if(j){j=!1;let o=String.fromCharCode(...u);if(o!=="0.17.11")throw new Error(`Cannot start service: Host version "0.17.11" does not match binary version ${J(o)}`);return}let l=Ye(u);if(l.isRequest)N(l.id,l.value);else{let o=h[l.id];delete h[l.id],l.value.error?o(l.value.error,{}):o(null,l.value)}};return{readFromStdout:d,afterClose:S,service:{buildOrContext:({callName:u,refs:l,options:o,isTTY:a,defaultWD:p,callback:w})=>{let $=0;const t=y++,s={},c={ref(){++$===1&&l&&l.ref()},unref(){--$===0&&(delete n[t],l&&l.unref())}};n[t]=s,c.ref(),st(u,t,T,R,c,e,s,o,a,p,(m,_)=>{try{w(m,_)}finally{c.unref()}})},transform:({callName:u,refs:l,input:o,options:a,isTTY:p,fs:w,callback:$})=>{const t=Ne();let s=c=>{try{if(typeof o!="string"&&!(o instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:m,mangleCache:_}=nt(u,a,p,Oe),A={command:"transform",flags:m,inputFS:c!==null,input:c!==null?Z(c):typeof o=="string"?Z(o):o};_&&(A.mangleCache=_),T(l,A,(b,C)=>{if(b)return $(new Error(b),null);let M=ae(C.errors,t),z=ae(C.warnings,t),D=1,F=()=>{if(--D===0){let U={warnings:z,code:C.code,map:C.map,mangleCache:void 0,legalComments:void 0};"legalComments"in C&&(U.legalComments=C==null?void 0:C.legalComments),C.mangleCache&&(U.mangleCache=C==null?void 0:C.mangleCache),$(null,U)}};if(M.length>0)return $(fe("Transform failed",M,z),null);C.codeFS&&(D++,w.readFile(C.code,(U,B)=>{U!==null?$(U,null):(C.code=B,F())})),C.mapFS&&(D++,w.readFile(C.map,(U,B)=>{U!==null?$(U,null):(C.map=B,F())})),F()})}catch(m){let _=[];try{pe(_,a,{},p,Oe)}catch{}const A=ie(m,e,t,void 0,"");T(l,{command:"error",flags:_,error:A},()=>{A.detail=t.load(A.detail),$(fe("Transform failed",[A],[]),null)})}};if((typeof o=="string"||o instanceof Uint8Array)&&o.length>1024*1024){let c=s;s=()=>w.writeFile(o,c)}s(null)},formatMessages:({callName:u,refs:l,messages:o,options:a,callback:p})=>{let w=ne(o,"messages",null,"");if(!a)throw new Error(`Missing second argument in ${u}() call`);let $={},t=i(a,$,"kind",k),s=i(a,$,"color",L),c=i(a,$,"terminalWidth",oe);if(q(a,$,`in ${u}() call`),t===void 0)throw new Error(`Missing "kind" in ${u}() call`);if(t!=="error"&&t!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${u}() call`);let m={command:"format-msgs",messages:w,isWarning:t==="warning"};s!==void 0&&(m.color=s),c!==void 0&&(m.terminalWidth=c),T(l,m,(_,A)=>{if(_)return p(new Error(_),null);p(null,A.messages)})},analyzeMetafile:({callName:u,refs:l,metafile:o,options:a,callback:p})=>{a===void 0&&(a={});let w={},$=i(a,w,"color",L),t=i(a,w,"verbose",L);q(a,w,`in ${u}() call`);let s={command:"analyze-metafile",metafile:o};$!==void 0&&(s.color=$),t!==void 0&&(s.verbose=t),T(l,s,(c,m)=>{if(c)return p(new Error(c),null);p(null,m.result)})}}}}function st(e,n,r,h,g,y,f,x,d,S,T){const R=Ne(),N=e==="context",j=(P,I)=>{const O=[];try{pe(O,x,{},d,Pe)}catch{}const u=ie(P,y,R,void 0,I);r(g,{command:"error",flags:O,error:u},()=>{u.detail=R.load(u.detail),T(fe(N?"Context failed":"Build failed",[u],[]),null)})};let V;if(typeof x=="object"){const P=x.plugins;if(P!==void 0){if(!Array.isArray(P))return j(new Error('"plugins" must be an array'),"");V=P}}if(V&&V.length>0){if(y.isSync)return j(new Error("Cannot use plugins in synchronous API calls"),"");it(n,r,h,g,y,f,x,V,R).then(P=>{if(!P.ok)return j(P.error,P.pluginName);try{E(P.requestPlugins,P.runOnEndCallbacks,P.scheduleOnDisposeCallbacks)}catch(I){j(I,"")}},P=>j(P,""));return}try{E(null,(P,I)=>I([],[]),()=>{})}catch(P){j(P,"")}function E(P,I,O){const u=y.hasFS,{entries:l,flags:o,write:a,stdinContents:p,stdinResolveDir:w,absWorkingDir:$,nodePaths:t,mangleCache:s}=tt(e,x,d,Pe,u);if(a&&!y.hasFS)throw new Error('The "write" option is unavailable in this environment');const c={command:"build",key:n,entries:l,flags:o,write:a,stdinContents:p,stdinResolveDir:w,absWorkingDir:$||S,nodePaths:t,context:N};P&&(c.plugins=P),s&&(c.mangleCache=s);const m=(b,C)=>{const M={errors:ae(b.errors,R),warnings:ae(b.warnings,R),outputFiles:void 0,metafile:void 0,mangleCache:void 0},z=M.errors.slice(),D=M.warnings.slice();b.outputFiles&&(M.outputFiles=b.outputFiles.map(lt)),b.metafile&&(M.metafile=JSON.parse(b.metafile)),b.mangleCache&&(M.mangleCache=b.mangleCache),b.writeToStdout!==void 0&&console.log(le(b.writeToStdout).replace(/\n$/,"")),I(M,(F,U)=>{if(z.length>0||F.length>0){const B=fe("Build failed",z.concat(F),D.concat(U));return C(B,null,F,U)}C(null,M,F,U)})};let _,A;N&&(f["on-end"]=(b,C)=>new Promise(M=>{m(C,(z,D,F,U)=>{const B={errors:F,warnings:U};A&&A(z,D),_=void 0,A=void 0,h(b,B),M()})})),r(g,c,(b,C)=>{if(b)return T(new Error(b),null);if(!N)return m(C,(D,F)=>(O(),T(D,F)));if(C.errors.length>0)return T(fe("Context failed",C.errors,C.warnings),null);let M=!1;const z={rebuild:()=>(_||(_=new Promise((D,F)=>{let U;A=(Y,K)=>{U||(U=()=>Y?F(Y):D(K))};const B=()=>{r(g,{command:"rebuild",key:n},(K,ue)=>{K?F(new Error(K)):U?U():B()})};B()})),_),watch:(D={})=>new Promise((F,U)=>{if(!y.hasFS)throw new Error('Cannot use the "watch" API in this environment');q(D,{},"in watch() call"),r(g,{command:"watch",key:n},K=>{K?U(new Error(K)):F(void 0)})}),serve:(D={})=>new Promise((F,U)=>{if(!y.hasFS)throw new Error('Cannot use the "serve" API in this environment');const B={},Y=i(D,B,"port",oe),K=i(D,B,"host",k),ue=i(D,B,"servedir",k),v=i(D,B,"keyfile",k),W=i(D,B,"certfile",k),Q=i(D,B,"onRequest",De);q(D,B,"in serve() call");const X={command:"serve",key:n,onRequest:!!Q};Y!==void 0&&(X.port=Y),K!==void 0&&(X.host=K),ue!==void 0&&(X.servedir=ue),v!==void 0&&(X.keyfile=v),W!==void 0&&(X.certfile=W),r(g,X,(se,ve)=>{if(se)return U(new Error(se));Q&&(f["serve-request"]=(bt,xt)=>{Q(xt.args),h(bt,{})}),F(ve)})}),cancel:()=>new Promise(D=>{if(M)return D();r(g,{command:"cancel",key:n},()=>{D()})}),dispose:()=>new Promise(D=>{if(M)return D();M=!0,r(g,{command:"dispose",key:n},()=>{D(),O(),g.unref()})})};g.ref(),T(null,z)})}}var it=(e,n,r,h,g,y,f,x,d)=>re(void 0,null,function*(){let S=[],T=[],R={},N={},j=[],V=0,E=0,P=[],I=!1;x=[...x];for(let l of x){let o={};if(typeof l!="object")throw new Error(`Plugin at index ${E} must be an object`);const a=i(l,o,"name",k);if(typeof a!="string"||a==="")throw new Error(`Plugin at index ${E} is missing a name`);try{let p=i(l,o,"setup",De);if(typeof p!="function")throw new Error("Plugin is missing a setup function");q(l,o,`on plugin ${J(a)}`);let w={name:a,onStart:!1,onEnd:!1,onResolve:[],onLoad:[]};E++;let t=p({initialOptions:f,resolve:(s,c={})=>{if(!I)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof s!="string")throw new Error("The path to resolve must be a string");let m=Object.create(null),_=i(c,m,"pluginName",k),A=i(c,m,"importer",k),b=i(c,m,"namespace",k),C=i(c,m,"resolveDir",k),M=i(c,m,"kind",k),z=i(c,m,"pluginData",me);return q(c,m,"in resolve() call"),new Promise((D,F)=>{const U={command:"resolve",path:s,key:e,pluginName:a};if(_!=null&&(U.pluginName=_),A!=null&&(U.importer=A),b!=null&&(U.namespace=b),C!=null&&(U.resolveDir=C),M!=null)U.kind=M;else throw new Error('Must specify "kind" when calling "resolve"');z!=null&&(U.pluginData=d.store(z)),n(h,U,(B,Y)=>{B!==null?F(new Error(B)):D({errors:ae(Y.errors,d),warnings:ae(Y.warnings,d),path:Y.path,external:Y.external,sideEffects:Y.sideEffects,namespace:Y.namespace,suffix:Y.suffix,pluginData:d.load(Y.pluginData)})})})},onStart(s){let c='This error came from the "onStart" callback registered here:',m=ye(new Error(c),g,"onStart");S.push({name:a,callback:s,note:m}),w.onStart=!0},onEnd(s){let c='This error came from the "onEnd" callback registered here:',m=ye(new Error(c),g,"onEnd");T.push({name:a,callback:s,note:m}),w.onEnd=!0},onResolve(s,c){let m='This error came from the "onResolve" callback registered here:',_=ye(new Error(m),g,"onResolve"),A={},b=i(s,A,"filter",ge),C=i(s,A,"namespace",k);if(q(s,A,`in onResolve() call for plugin ${J(a)}`),b==null)throw new Error("onResolve() call is missing a filter");let M=V++;R[M]={name:a,callback:c,note:_},w.onResolve.push({id:M,filter:b.source,namespace:C||""})},onLoad(s,c){let m='This error came from the "onLoad" callback registered here:',_=ye(new Error(m),g,"onLoad"),A={},b=i(s,A,"filter",ge),C=i(s,A,"namespace",k);if(q(s,A,`in onLoad() call for plugin ${J(a)}`),b==null)throw new Error("onLoad() call is missing a filter");let M=V++;N[M]={name:a,callback:c,note:_},w.onLoad.push({id:M,filter:b.source,namespace:C||""})},onDispose(s){j.push(s)},esbuild:g.esbuild});t&&(yield t),P.push(w)}catch(p){return{ok:!1,error:p,pluginName:a}}}y["on-start"]=(l,o)=>re(void 0,null,function*(){let a={errors:[],warnings:[]};yield Promise.all(S.map(p=>re(void 0,[p],function*({name:w,callback:$,note:t}){try{let s=yield $();if(s!=null){if(typeof s!="object")throw new Error(`Expected onStart() callback in plugin ${J(w)} to return an object`);let c={},m=i(s,c,"errors",G),_=i(s,c,"warnings",G);q(s,c,`from onStart() callback in plugin ${J(w)}`),m!=null&&a.errors.push(...ne(m,"errors",d,w)),_!=null&&a.warnings.push(...ne(_,"warnings",d,w))}}catch(s){a.errors.push(ie(s,g,d,t&&t(),w))}}))),r(l,a)}),y["on-resolve"]=(l,o)=>re(void 0,null,function*(){let a={},p="",w,$;for(let t of o.ids)try{({name:p,callback:w,note:$}=R[t]);let s=yield w({path:o.path,importer:o.importer,namespace:o.namespace,resolveDir:o.resolveDir,kind:o.kind,pluginData:d.load(o.pluginData)});if(s!=null){if(typeof s!="object")throw new Error(`Expected onResolve() callback in plugin ${J(p)} to return an object`);let c={},m=i(s,c,"pluginName",k),_=i(s,c,"path",k),A=i(s,c,"namespace",k),b=i(s,c,"suffix",k),C=i(s,c,"external",L),M=i(s,c,"sideEffects",L),z=i(s,c,"pluginData",me),D=i(s,c,"errors",G),F=i(s,c,"warnings",G),U=i(s,c,"watchFiles",G),B=i(s,c,"watchDirs",G);q(s,c,`from onResolve() callback in plugin ${J(p)}`),a.id=t,m!=null&&(a.pluginName=m),_!=null&&(a.path=_),A!=null&&(a.namespace=A),b!=null&&(a.suffix=b),C!=null&&(a.external=C),M!=null&&(a.sideEffects=M),z!=null&&(a.pluginData=d.store(z)),D!=null&&(a.errors=ne(D,"errors",d,p)),F!=null&&(a.warnings=ne(F,"warnings",d,p)),U!=null&&(a.watchFiles=we(U,"watchFiles")),B!=null&&(a.watchDirs=we(B,"watchDirs"));break}}catch(s){a={id:t,errors:[ie(s,g,d,$&&$(),p)]};break}r(l,a)}),y["on-load"]=(l,o)=>re(void 0,null,function*(){let a={},p="",w,$;for(let t of o.ids)try{({name:p,callback:w,note:$}=N[t]);let s=yield w({path:o.path,namespace:o.namespace,suffix:o.suffix,pluginData:d.load(o.pluginData)});if(s!=null){if(typeof s!="object")throw new Error(`Expected onLoad() callback in plugin ${J(p)} to return an object`);let c={},m=i(s,c,"pluginName",k),_=i(s,c,"contents",Ae),A=i(s,c,"resolveDir",k),b=i(s,c,"pluginData",me),C=i(s,c,"loader",k),M=i(s,c,"errors",G),z=i(s,c,"warnings",G),D=i(s,c,"watchFiles",G),F=i(s,c,"watchDirs",G);q(s,c,`from onLoad() callback in plugin ${J(p)}`),a.id=t,m!=null&&(a.pluginName=m),_ instanceof Uint8Array?a.contents=_:_!=null&&(a.contents=Z(_)),A!=null&&(a.resolveDir=A),b!=null&&(a.pluginData=d.store(b)),C!=null&&(a.loader=C),M!=null&&(a.errors=ne(M,"errors",d,p)),z!=null&&(a.warnings=ne(z,"warnings",d,p)),D!=null&&(a.watchFiles=we(D,"watchFiles")),F!=null&&(a.watchDirs=we(F,"watchDirs"));break}}catch(s){a={id:t,errors:[ie(s,g,d,$&&$(),p)]};break}r(l,a)});let O=(l,o)=>o([],[]);T.length>0&&(O=(l,o)=>{re(void 0,null,function*(){const a=[],p=[];for(const{name:w,callback:$,note:t}of T){let s,c;try{const m=yield $(l);if(m!=null){if(typeof m!="object")throw new Error(`Expected onEnd() callback in plugin ${J(w)} to return an object`);let _={},A=i(m,_,"errors",G),b=i(m,_,"warnings",G);q(m,_,`from onEnd() callback in plugin ${J(w)}`),A!=null&&(s=ne(A,"errors",d,w)),b!=null&&(c=ne(b,"warnings",d,w))}}catch(m){s=[ie(m,g,d,t&&t(),w)]}if(s){a.push(...s);try{l.errors.push(...s)}catch{}}if(c){p.push(...c);try{l.warnings.push(...c)}catch{}}}o(a,p)})});let u=()=>{for(const l of j)setTimeout(()=>l(),0)};return I=!0,{ok:!0,requestPlugins:P,runOnEndCallbacks:O,scheduleOnDisposeCallbacks:u}});function Ne(){const e=new Map;let n=0;return{load(r){return e.get(r)},store(r){if(r===void 0)return-1;const h=n++;return e.set(h,r),h}}}function ye(e,n,r){let h,g=!1;return()=>{if(g)return h;g=!0;try{let y=(e.stack+"").split(`
`);y.splice(1,1);let f=Fe(n,y,r);if(f)return h={text:e.message,location:f},h}catch{}}}function ie(e,n,r,h,g){let y="Internal error",f=null;try{y=(e&&e.message||e)+""}catch{}try{f=Fe(n,(e.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:g,text:y,location:f,notes:h?[h]:[],detail:r?r.store(e):-1}}function Fe(e,n,r){let h="    at ";if(e.readFileSync&&!n[0].startsWith(h)&&n[1].startsWith(h))for(let g=1;g<n.length;g++){let y=n[g];if(y.startsWith(h))for(y=y.slice(h.length);;){let f=/^(?:new |async )?\S+ \((.*)\)$/.exec(y);if(f){y=f[1];continue}if(f=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(y),f){y=f[1];continue}if(f=/^(\S+):(\d+):(\d+)$/.exec(y),f){let x;try{x=e.readFileSync(f[1],"utf8")}catch{break}let d=x.split(/\r\n|\r|\n|\u2028|\u2029/)[+f[2]-1]||"",S=+f[3]-1,T=d.slice(S,S+r.length)===r?r.length:0;return{file:f[1],namespace:"file",line:+f[2],column:Z(d.slice(0,S)).length,length:Z(d.slice(S,S+T)).length,lineText:d+`
`+n.slice(1).join(`
`),suggestion:""}}break}}return null}function fe(e,n,r){let h=5,g=n.length<1?"":` with ${n.length} error${n.length<2?"":"s"}:`+n.slice(0,h+1).map((f,x)=>{if(x===h)return`
...`;if(!f.location)return`
error: ${f.text}`;let{file:d,line:S,column:T}=f.location,R=f.pluginName?`[plugin: ${f.pluginName}] `:"";return`
${d}:${S}:${T}: ERROR: ${R}${f.text}`}).join(""),y=new Error(`${e}${g}`);return y.errors=n,y.warnings=r,y}function ae(e,n){for(const r of e)r.detail=n.load(r.detail);return e}function Ve(e,n){if(e==null)return null;let r={},h=i(e,r,"file",k),g=i(e,r,"namespace",k),y=i(e,r,"line",oe),f=i(e,r,"column",oe),x=i(e,r,"length",oe),d=i(e,r,"lineText",k),S=i(e,r,"suggestion",k);return q(e,r,n),{file:h||"",namespace:g||"",line:y||0,column:f||0,length:x||0,lineText:d||"",suggestion:S||""}}function ne(e,n,r,h){let g=[],y=0;for(const f of e){let x={},d=i(f,x,"id",k),S=i(f,x,"pluginName",k),T=i(f,x,"text",k),R=i(f,x,"location",Ue),N=i(f,x,"notes",G),j=i(f,x,"detail",me),V=`in element ${y} of "${n}"`;q(f,x,V);let E=[];if(N)for(const P of N){let I={},O=i(P,I,"text",k),u=i(P,I,"location",Ue);q(P,I,V),E.push({text:O||"",location:Ve(u,V)})}g.push({id:d||"",pluginName:S||h,text:T||"",location:Ve(R,V),notes:E,detail:r?r.store(j):-1}),y++}return g}function we(e,n){const r=[];for(const h of e){if(typeof h!="string")throw new Error(`${J(n)} must be an array of strings`);r.push(h)}return r}function lt({path:e,contents:n}){let r=null;return{path:e,contents:n,get text(){const h=this.contents;return(r===null||h!==n)&&(n=h,r=le(h)),r}}}var ot="0.17.11",at=e=>de().build(e),ct=e=>de().context(e),ut=(e,n)=>de().transform(e,n),ft=(e,n)=>de().formatMessages(e,n),dt=(e,n)=>de().analyzeMetafile(e,n),ht=()=>{throw new Error('The "buildSync" API only works in node')},mt=()=>{throw new Error('The "transformSync" API only works in node')},gt=()=>{throw new Error('The "formatMessagesSync" API only works in node')},pt=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},ce,ke,de=()=>{if(ke)return ke;throw ce?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},yt=e=>{e=et(e||{});let n=e.wasmURL,r=e.wasmModule,h=e.worker!==!1;if(!n&&!r)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(ce)throw new Error('Cannot call "initialize" more than once');return ce=wt(n||"",r,h),ce.catch(()=>{ce=void 0}),ce},wt=(e,n,r)=>re(void 0,null,function*(){let h;if(r){let S=new Blob([`onmessage=((postMessage) => {
      // Copyright 2018 The Go Authors. All rights reserved.
      // Use of this source code is governed by a BSD-style
      // license that can be found in the LICENSE file.
      var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = (value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          };
          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
          step((generator = generator.apply(__this, __arguments)).next());
        });
      };
      let onmessage;
      let globalThis = {};
      for (let o = self; o; o = Object.getPrototypeOf(o))
        for (let k of Object.getOwnPropertyNames(o))
          if (!(k in globalThis))
            Object.defineProperty(globalThis, k, { get: () => self[k] });
      "use strict";
      (() => {
        const enosys = () => {
          const err = new Error("not implemented");
          err.code = "ENOSYS";
          return err;
        };
        if (!globalThis.fs) {
          let outputBuf = "";
          globalThis.fs = {
            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
            // unused
            writeSync(fd, buf) {
              outputBuf += decoder.decode(buf);
              const nl = outputBuf.lastIndexOf("\\n");
              if (nl != -1) {
                console.log(outputBuf.substring(0, nl));
                outputBuf = outputBuf.substring(nl + 1);
              }
              return buf.length;
            },
            write(fd, buf, offset, length, position, callback) {
              if (offset !== 0 || length !== buf.length || position !== null) {
                callback(enosys());
                return;
              }
              const n = this.writeSync(fd, buf);
              callback(null, n);
            },
            chmod(path, mode, callback) {
              callback(enosys());
            },
            chown(path, uid, gid, callback) {
              callback(enosys());
            },
            close(fd, callback) {
              callback(enosys());
            },
            fchmod(fd, mode, callback) {
              callback(enosys());
            },
            fchown(fd, uid, gid, callback) {
              callback(enosys());
            },
            fstat(fd, callback) {
              callback(enosys());
            },
            fsync(fd, callback) {
              callback(null);
            },
            ftruncate(fd, length, callback) {
              callback(enosys());
            },
            lchown(path, uid, gid, callback) {
              callback(enosys());
            },
            link(path, link, callback) {
              callback(enosys());
            },
            lstat(path, callback) {
              callback(enosys());
            },
            mkdir(path, perm, callback) {
              callback(enosys());
            },
            open(path, flags, mode, callback) {
              callback(enosys());
            },
            read(fd, buffer, offset, length, position, callback) {
              callback(enosys());
            },
            readdir(path, callback) {
              callback(enosys());
            },
            readlink(path, callback) {
              callback(enosys());
            },
            rename(from, to, callback) {
              callback(enosys());
            },
            rmdir(path, callback) {
              callback(enosys());
            },
            stat(path, callback) {
              callback(enosys());
            },
            symlink(path, link, callback) {
              callback(enosys());
            },
            truncate(path, length, callback) {
              callback(enosys());
            },
            unlink(path, callback) {
              callback(enosys());
            },
            utimes(path, atime, mtime, callback) {
              callback(enosys());
            }
          };
        }
        if (!globalThis.process) {
          globalThis.process = {
            getuid() {
              return -1;
            },
            getgid() {
              return -1;
            },
            geteuid() {
              return -1;
            },
            getegid() {
              return -1;
            },
            getgroups() {
              throw enosys();
            },
            pid: -1,
            ppid: -1,
            umask() {
              throw enosys();
            },
            cwd() {
              throw enosys();
            },
            chdir() {
              throw enosys();
            }
          };
        }
        if (!globalThis.crypto) {
          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
        }
        if (!globalThis.performance) {
          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
        }
        if (!globalThis.TextEncoder) {
          throw new Error("globalThis.TextEncoder is not available, polyfill required");
        }
        if (!globalThis.TextDecoder) {
          throw new Error("globalThis.TextDecoder is not available, polyfill required");
        }
        const encoder = new TextEncoder("utf-8");
        const decoder = new TextDecoder("utf-8");
        globalThis.Go = class {
          constructor() {
            this.argv = ["js"];
            this.env = {};
            this.exit = (code) => {
              if (code !== 0) {
                console.warn("exit code:", code);
              }
            };
            this._exitPromise = new Promise((resolve) => {
              this._resolveExitPromise = resolve;
            });
            this._pendingEvent = null;
            this._scheduledTimeouts = /* @__PURE__ */ new Map();
            this._nextCallbackTimeoutID = 1;
            const setInt64 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
            };
            const getInt64 = (addr) => {
              const low = this.mem.getUint32(addr + 0, true);
              const high = this.mem.getInt32(addr + 4, true);
              return low + high * 4294967296;
            };
            const loadValue = (addr) => {
              const f = this.mem.getFloat64(addr, true);
              if (f === 0) {
                return void 0;
              }
              if (!isNaN(f)) {
                return f;
              }
              const id = this.mem.getUint32(addr, true);
              return this._values[id];
            };
            const storeValue = (addr, v) => {
              const nanHead = 2146959360;
              if (typeof v === "number" && v !== 0) {
                if (isNaN(v)) {
                  this.mem.setUint32(addr + 4, nanHead, true);
                  this.mem.setUint32(addr, 0, true);
                  return;
                }
                this.mem.setFloat64(addr, v, true);
                return;
              }
              if (v === void 0) {
                this.mem.setFloat64(addr, 0, true);
                return;
              }
              let id = this._ids.get(v);
              if (id === void 0) {
                id = this._idPool.pop();
                if (id === void 0) {
                  id = this._values.length;
                }
                this._values[id] = v;
                this._goRefCounts[id] = 0;
                this._ids.set(v, id);
              }
              this._goRefCounts[id]++;
              let typeFlag = 0;
              switch (typeof v) {
                case "object":
                  if (v !== null) {
                    typeFlag = 1;
                  }
                  break;
                case "string":
                  typeFlag = 2;
                  break;
                case "symbol":
                  typeFlag = 3;
                  break;
                case "function":
                  typeFlag = 4;
                  break;
              }
              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
              this.mem.setUint32(addr, id, true);
            };
            const loadSlice = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return new Uint8Array(this._inst.exports.mem.buffer, array, len);
            };
            const loadSliceOfValues = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              const a = new Array(len);
              for (let i = 0; i < len; i++) {
                a[i] = loadValue(array + i * 8);
              }
              return a;
            };
            const loadString = (addr) => {
              const saddr = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
            };
            const timeOrigin = Date.now() - performance.now();
            this.importObject = {
              go: {
                // Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
                // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
                // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
                // This changes the SP, thus we have to update the SP used by the imported function.
                // func wasmExit(code int32)
                "runtime.wasmExit": (sp) => {
                  sp >>>= 0;
                  const code = this.mem.getInt32(sp + 8, true);
                  this.exited = true;
                  delete this._inst;
                  delete this._values;
                  delete this._goRefCounts;
                  delete this._ids;
                  delete this._idPool;
                  this.exit(code);
                },
                // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
                "runtime.wasmWrite": (sp) => {
                  sp >>>= 0;
                  const fd = getInt64(sp + 8);
                  const p = getInt64(sp + 16);
                  const n = this.mem.getInt32(sp + 24, true);
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                // func resetMemoryDataView()
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                // func nanotime1() int64
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                // func walltime() (sec int64, nsec int32)
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = (/* @__PURE__ */ new Date()).getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                },
                // func scheduleTimeoutEvent(delay int64) int32
                "runtime.scheduleTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++;
                  this._scheduledTimeouts.set(id, setTimeout(
                    () => {
                      this._resume();
                      while (this._scheduledTimeouts.has(id)) {
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8) + 1
                    // setTimeout has been seen to fire up to 1 millisecond early
                  ));
                  this.mem.setInt32(sp + 16, id, true);
                },
                // func clearTimeoutEvent(id int32)
                "runtime.clearTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getInt32(sp + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(id));
                  this._scheduledTimeouts.delete(id);
                },
                // func getRandomData(r []byte)
                "runtime.getRandomData": (sp) => {
                  sp >>>= 0;
                  crypto.getRandomValues(loadSlice(sp + 8));
                },
                // func finalizeRef(v ref)
                "syscall/js.finalizeRef": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getUint32(sp + 8, true);
                  this._goRefCounts[id]--;
                  if (this._goRefCounts[id] === 0) {
                    const v = this._values[id];
                    this._values[id] = null;
                    this._ids.delete(v);
                    this._idPool.push(id);
                  }
                },
                // func stringVal(value string) ref
                "syscall/js.stringVal": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, loadString(sp + 8));
                },
                // func valueGet(v ref, p string) ref
                "syscall/js.valueGet": (sp) => {
                  sp >>>= 0;
                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                  sp = this._inst.exports.getsp() >>> 0;
                  storeValue(sp + 32, result);
                },
                // func valueSet(v ref, p string, x ref)
                "syscall/js.valueSet": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                },
                // func valueDelete(v ref, p string)
                "syscall/js.valueDelete": (sp) => {
                  sp >>>= 0;
                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                },
                // func valueIndex(v ref, i int) ref
                "syscall/js.valueIndex": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                },
                // valueSetIndex(v ref, i int, x ref)
                "syscall/js.valueSetIndex": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                },
                // func valueCall(v ref, m string, args []ref) (ref, bool)
                "syscall/js.valueCall": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const m = Reflect.get(v, loadString(sp + 16));
                    const args = loadSliceOfValues(sp + 32);
                    const result = Reflect.apply(m, v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, err);
                    this.mem.setUint8(sp + 64, 0);
                  }
                },
                // func valueInvoke(v ref, args []ref) (ref, bool)
                "syscall/js.valueInvoke": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.apply(v, void 0, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueNew(v ref, args []ref) (ref, bool)
                "syscall/js.valueNew": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.construct(v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueLength(v ref) int
                "syscall/js.valueLength": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                },
                // valuePrepareString(v ref) (ref, int)
                "syscall/js.valuePrepareString": (sp) => {
                  sp >>>= 0;
                  const str = encoder.encode(String(loadValue(sp + 8)));
                  storeValue(sp + 16, str);
                  setInt64(sp + 24, str.length);
                },
                // valueLoadString(v ref, b []byte)
                "syscall/js.valueLoadString": (sp) => {
                  sp >>>= 0;
                  const str = loadValue(sp + 8);
                  loadSlice(sp + 16).set(str);
                },
                // func valueInstanceOf(v ref, t ref) bool
                "syscall/js.valueInstanceOf": (sp) => {
                  sp >>>= 0;
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                },
                // func copyBytesToGo(dst []byte, src ref) (int, bool)
                "syscall/js.copyBytesToGo": (sp) => {
                  sp >>>= 0;
                  const dst = loadSlice(sp + 8);
                  const src = loadValue(sp + 32);
                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                // func copyBytesToJS(dst ref, src []byte) (int, bool)
                "syscall/js.copyBytesToJS": (sp) => {
                  sp >>>= 0;
                  const dst = loadValue(sp + 8);
                  const src = loadSlice(sp + 16);
                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                "debug": (value) => {
                  console.log(value);
                }
              }
            };
          }
          run(instance) {
            return __async(this, null, function* () {
              if (!(instance instanceof WebAssembly.Instance)) {
                throw new Error("Go.run: WebAssembly.Instance expected");
              }
              this._inst = instance;
              this.mem = new DataView(this._inst.exports.mem.buffer);
              this._values = [
                // JS values that Go currently has references to, indexed by reference id
                NaN,
                0,
                null,
                true,
                false,
                globalThis,
                this
              ];
              this._goRefCounts = new Array(this._values.length).fill(Infinity);
              this._ids = /* @__PURE__ */ new Map([
                // mapping from JS values to reference ids
                [0, 1],
                [null, 2],
                [true, 3],
                [false, 4],
                [globalThis, 5],
                [this, 6]
              ]);
              this._idPool = [];
              this.exited = false;
              let offset = 4096;
              const strPtr = (str) => {
                const ptr = offset;
                const bytes = encoder.encode(str + "\\0");
                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                offset += bytes.length;
                if (offset % 8 !== 0) {
                  offset += 8 - offset % 8;
                }
                return ptr;
              };
              const argc = this.argv.length;
              const argvPtrs = [];
              this.argv.forEach((arg) => {
                argvPtrs.push(strPtr(arg));
              });
              argvPtrs.push(0);
              const keys = Object.keys(this.env).sort();
              keys.forEach((key) => {
                argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
              });
              argvPtrs.push(0);
              const argv = offset;
              argvPtrs.forEach((ptr) => {
                this.mem.setUint32(offset, ptr, true);
                this.mem.setUint32(offset + 4, 0, true);
                offset += 8;
              });
              const wasmMinDataAddr = 4096 + 8192;
              if (offset >= wasmMinDataAddr) {
                throw new Error("total length of command line and environment variables exceeds limit");
              }
              this._inst.exports.run(argc, argv);
              if (this.exited) {
                this._resolveExitPromise();
              }
              yield this._exitPromise;
            });
          }
          _resume() {
            if (this.exited) {
              throw new Error("Go program has already exited");
            }
            this._inst.exports.resume();
            if (this.exited) {
              this._resolveExitPromise();
            }
          }
          _makeFuncWrapper(id) {
            const go = this;
            return function() {
              const event = { id, this: this, args: arguments };
              go._pendingEvent = event;
              go._resume();
              return event.result;
            };
          }
        };
      })();
      onmessage = ({ data: wasm }) => {
        let decoder = new TextDecoder();
        let fs = globalThis.fs;
        let stderr = "";
        fs.writeSync = (fd, buffer) => {
          if (fd === 1) {
            postMessage(buffer);
          } else if (fd === 2) {
            stderr += decoder.decode(buffer);
            let parts = stderr.split("\\n");
            if (parts.length > 1)
              console.log(parts.slice(0, -1).join("\\n"));
            stderr = parts[parts.length - 1];
          } else {
            throw new Error("Bad write");
          }
          return buffer.length;
        };
        let stdin = [];
        let resumeStdin;
        let stdinPos = 0;
        onmessage = ({ data }) => {
          if (data.length > 0) {
            stdin.push(data);
            if (resumeStdin)
              resumeStdin();
          }
        };
        fs.read = (fd, buffer, offset, length, position, callback) => {
          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
            throw new Error("Bad read");
          }
          if (stdin.length === 0) {
            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
            return;
          }
          let first = stdin[0];
          let count = Math.max(0, Math.min(length, first.length - stdinPos));
          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
          stdinPos += count;
          if (stdinPos === first.length) {
            stdin.shift();
            stdinPos = 0;
          }
          callback(null, count);
        };
        let go = new globalThis.Go();
        go.argv = ["", \`--service=\${"0.17.11"}\`];
        tryToInstantiateModule(wasm, go).then(
          (instance) => {
            postMessage(null);
            go.run(instance);
          },
          (error) => {
            postMessage(error);
          }
        );
      };
      function tryToInstantiateModule(wasm, go) {
        return __async(this, null, function* () {
          if (wasm instanceof WebAssembly.Module) {
            return WebAssembly.instantiate(wasm, go.importObject);
          }
          const res = yield fetch(wasm);
          if (!res.ok)
            throw new Error(\`Failed to download \${JSON.stringify(wasm)}\`);
          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
            return result2.instance;
          }
          const bytes = yield res.arrayBuffer();
          const result = yield WebAssembly.instantiate(bytes, go.importObject);
          return result.instance;
        });
      }
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});h=new Worker(URL.createObjectURL(S))}else{let S=(T=>{var R=(E,P,I)=>new Promise((O,u)=>{var l=p=>{try{a(I.next(p))}catch(w){u(w)}},o=p=>{try{a(I.throw(p))}catch(w){u(w)}},a=p=>p.done?O(p.value):Promise.resolve(p.value).then(l,o);a((I=I.apply(E,P)).next())});let N,j={};for(let E=self;E;E=Object.getPrototypeOf(E))for(let P of Object.getOwnPropertyNames(E))P in j||Object.defineProperty(j,P,{get:()=>self[P]});(()=>{const E=()=>{const O=new Error("not implemented");return O.code="ENOSYS",O};if(!j.fs){let O="";j.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(u,l){O+=I.decode(l);const o=O.lastIndexOf(`
`);return o!=-1&&(console.log(O.substring(0,o)),O=O.substring(o+1)),l.length},write(u,l,o,a,p,w){if(o!==0||a!==l.length||p!==null){w(E());return}const $=this.writeSync(u,l);w(null,$)},chmod(u,l,o){o(E())},chown(u,l,o,a){a(E())},close(u,l){l(E())},fchmod(u,l,o){o(E())},fchown(u,l,o,a){a(E())},fstat(u,l){l(E())},fsync(u,l){l(null)},ftruncate(u,l,o){o(E())},lchown(u,l,o,a){a(E())},link(u,l,o){o(E())},lstat(u,l){l(E())},mkdir(u,l,o){o(E())},open(u,l,o,a){a(E())},read(u,l,o,a,p,w){w(E())},readdir(u,l){l(E())},readlink(u,l){l(E())},rename(u,l,o){o(E())},rmdir(u,l){l(E())},stat(u,l){l(E())},symlink(u,l,o){o(E())},truncate(u,l,o){o(E())},unlink(u,l){l(E())},utimes(u,l,o,a){a(E())}}}if(j.process||(j.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw E()},pid:-1,ppid:-1,umask(){throw E()},cwd(){throw E()},chdir(){throw E()}}),!j.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!j.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!j.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!j.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");const P=new TextEncoder("utf-8"),I=new TextDecoder("utf-8");j.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=t=>{t!==0&&console.warn("exit code:",t)},this._exitPromise=new Promise(t=>{this._resolveExitPromise=t}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;const O=(t,s)=>{this.mem.setUint32(t+0,s,!0),this.mem.setUint32(t+4,Math.floor(s/4294967296),!0)},u=t=>{const s=this.mem.getUint32(t+0,!0),c=this.mem.getInt32(t+4,!0);return s+c*4294967296},l=t=>{const s=this.mem.getFloat64(t,!0);if(s===0)return;if(!isNaN(s))return s;const c=this.mem.getUint32(t,!0);return this._values[c]},o=(t,s)=>{if(typeof s=="number"&&s!==0){if(isNaN(s)){this.mem.setUint32(t+4,2146959360,!0),this.mem.setUint32(t,0,!0);return}this.mem.setFloat64(t,s,!0);return}if(s===void 0){this.mem.setFloat64(t,0,!0);return}let m=this._ids.get(s);m===void 0&&(m=this._idPool.pop(),m===void 0&&(m=this._values.length),this._values[m]=s,this._goRefCounts[m]=0,this._ids.set(s,m)),this._goRefCounts[m]++;let _=0;switch(typeof s){case"object":s!==null&&(_=1);break;case"string":_=2;break;case"symbol":_=3;break;case"function":_=4;break}this.mem.setUint32(t+4,2146959360|_,!0),this.mem.setUint32(t,m,!0)},a=t=>{const s=u(t+0),c=u(t+8);return new Uint8Array(this._inst.exports.mem.buffer,s,c)},p=t=>{const s=u(t+0),c=u(t+8),m=new Array(c);for(let _=0;_<c;_++)m[_]=l(s+_*8);return m},w=t=>{const s=u(t+0),c=u(t+8);return I.decode(new DataView(this._inst.exports.mem.buffer,s,c))},$=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":t=>{t>>>=0;const s=this.mem.getInt32(t+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(s)},"runtime.wasmWrite":t=>{t>>>=0;const s=u(t+8),c=u(t+16),m=this.mem.getInt32(t+24,!0);j.fs.writeSync(s,new Uint8Array(this._inst.exports.mem.buffer,c,m))},"runtime.resetMemoryDataView":t=>{this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":t=>{t>>>=0,O(t+8,($+performance.now())*1e6)},"runtime.walltime":t=>{t>>>=0;const s=new Date().getTime();O(t+8,s/1e3),this.mem.setInt32(t+16,s%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":t=>{t>>>=0;const s=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(s,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(s);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},u(t+8)+1)),this.mem.setInt32(t+16,s,!0)},"runtime.clearTimeoutEvent":t=>{t>>>=0;const s=this.mem.getInt32(t+8,!0);clearTimeout(this._scheduledTimeouts.get(s)),this._scheduledTimeouts.delete(s)},"runtime.getRandomData":t=>{t>>>=0,crypto.getRandomValues(a(t+8))},"syscall/js.finalizeRef":t=>{t>>>=0;const s=this.mem.getUint32(t+8,!0);if(this._goRefCounts[s]--,this._goRefCounts[s]===0){const c=this._values[s];this._values[s]=null,this._ids.delete(c),this._idPool.push(s)}},"syscall/js.stringVal":t=>{t>>>=0,o(t+24,w(t+8))},"syscall/js.valueGet":t=>{t>>>=0;const s=Reflect.get(l(t+8),w(t+16));t=this._inst.exports.getsp()>>>0,o(t+32,s)},"syscall/js.valueSet":t=>{t>>>=0,Reflect.set(l(t+8),w(t+16),l(t+32))},"syscall/js.valueDelete":t=>{t>>>=0,Reflect.deleteProperty(l(t+8),w(t+16))},"syscall/js.valueIndex":t=>{t>>>=0,o(t+24,Reflect.get(l(t+8),u(t+16)))},"syscall/js.valueSetIndex":t=>{t>>>=0,Reflect.set(l(t+8),u(t+16),l(t+24))},"syscall/js.valueCall":t=>{t>>>=0;try{const s=l(t+8),c=Reflect.get(s,w(t+16)),m=p(t+32),_=Reflect.apply(c,s,m);t=this._inst.exports.getsp()>>>0,o(t+56,_),this.mem.setUint8(t+64,1)}catch(s){t=this._inst.exports.getsp()>>>0,o(t+56,s),this.mem.setUint8(t+64,0)}},"syscall/js.valueInvoke":t=>{t>>>=0;try{const s=l(t+8),c=p(t+16),m=Reflect.apply(s,void 0,c);t=this._inst.exports.getsp()>>>0,o(t+40,m),this.mem.setUint8(t+48,1)}catch(s){t=this._inst.exports.getsp()>>>0,o(t+40,s),this.mem.setUint8(t+48,0)}},"syscall/js.valueNew":t=>{t>>>=0;try{const s=l(t+8),c=p(t+16),m=Reflect.construct(s,c);t=this._inst.exports.getsp()>>>0,o(t+40,m),this.mem.setUint8(t+48,1)}catch(s){t=this._inst.exports.getsp()>>>0,o(t+40,s),this.mem.setUint8(t+48,0)}},"syscall/js.valueLength":t=>{t>>>=0,O(t+16,parseInt(l(t+8).length))},"syscall/js.valuePrepareString":t=>{t>>>=0;const s=P.encode(String(l(t+8)));o(t+16,s),O(t+24,s.length)},"syscall/js.valueLoadString":t=>{t>>>=0;const s=l(t+8);a(t+16).set(s)},"syscall/js.valueInstanceOf":t=>{t>>>=0,this.mem.setUint8(t+24,l(t+8)instanceof l(t+16)?1:0)},"syscall/js.copyBytesToGo":t=>{t>>>=0;const s=a(t+8),c=l(t+32);if(!(c instanceof Uint8Array||c instanceof Uint8ClampedArray)){this.mem.setUint8(t+48,0);return}const m=c.subarray(0,s.length);s.set(m),O(t+40,m.length),this.mem.setUint8(t+48,1)},"syscall/js.copyBytesToJS":t=>{t>>>=0;const s=l(t+8),c=a(t+16);if(!(s instanceof Uint8Array||s instanceof Uint8ClampedArray)){this.mem.setUint8(t+48,0);return}const m=c.subarray(0,s.length);s.set(m),O(t+40,m.length),this.mem.setUint8(t+48,1)},debug:t=>{console.log(t)}}}}run(O){return R(this,null,function*(){if(!(O instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=O,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,j,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[j,5],[this,6]]),this._idPool=[],this.exited=!1;let u=4096;const l=t=>{const s=u,c=P.encode(t+"\0");return new Uint8Array(this.mem.buffer,u,c.length).set(c),u+=c.length,u%8!==0&&(u+=8-u%8),s},o=this.argv.length,a=[];this.argv.forEach(t=>{a.push(l(t))}),a.push(0),Object.keys(this.env).sort().forEach(t=>{a.push(l(`${t}=${this.env[t]}`))}),a.push(0);const w=u;a.forEach(t=>{this.mem.setUint32(u,t,!0),this.mem.setUint32(u+4,0,!0),u+=8});const $=4096+8192;if(u>=$)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(o,w),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(O){const u=this;return function(){const l={id:O,this:this,args:arguments};return u._pendingEvent=l,u._resume(),l.result}}}})(),N=({data:E})=>{let P=new TextDecoder,I=j.fs,O="";I.writeSync=(p,w)=>{if(p===1)T(w);else if(p===2){O+=P.decode(w);let $=O.split(`
`);$.length>1&&console.log($.slice(0,-1).join(`
`)),O=$[$.length-1]}else throw new Error("Bad write");return w.length};let u=[],l,o=0;N=({data:p})=>{p.length>0&&(u.push(p),l&&l())},I.read=(p,w,$,t,s,c)=>{if(p!==0||$!==0||t!==w.length||s!==null)throw new Error("Bad read");if(u.length===0){l=()=>I.read(p,w,$,t,s,c);return}let m=u[0],_=Math.max(0,Math.min(t,m.length-o));w.set(m.subarray(o,o+_),$),o+=_,o===m.length&&(u.shift(),o=0),c(null,_)};let a=new j.Go;a.argv=["","--service=0.17.11"],V(E,a).then(p=>{T(null),a.run(p)},p=>{T(p)})};function V(E,P){return R(this,null,function*(){if(E instanceof WebAssembly.Module)return WebAssembly.instantiate(E,P.importObject);const I=yield fetch(E);if(!I.ok)throw new Error(`Failed to download ${JSON.stringify(E)}`);if("instantiateStreaming"in WebAssembly&&/^application\/wasm($|;)/i.test(I.headers.get("Content-Type")||""))return(yield WebAssembly.instantiateStreaming(I,P.importObject)).instance;const O=yield I.arrayBuffer();return(yield WebAssembly.instantiate(O,P.importObject)).instance})}return E=>N(E)})(T=>h.onmessage({data:T}));h={onmessage:null,postMessage:T=>setTimeout(()=>S({data:T})),terminate(){}}}let g,y;const f=new Promise((S,T)=>{g=S,y=T});h.onmessage=({data:S})=>{h.onmessage=({data:T})=>x(T),S?y(S):g()},h.postMessage(n||new URL(e,location.href).toString());let{readFromStdout:x,service:d}=rt({writeToStdin(S){h.postMessage(S)},isSync:!1,hasFS:!1,esbuild:he});yield f,ke={build:S=>new Promise((T,R)=>d.buildOrContext({callName:"build",refs:null,options:S,isTTY:!1,defaultWD:"/",callback:(N,j)=>N?R(N):T(j)})),context:S=>new Promise((T,R)=>d.buildOrContext({callName:"context",refs:null,options:S,isTTY:!1,defaultWD:"/",callback:(N,j)=>N?R(N):T(j)})),transform:(S,T)=>new Promise((R,N)=>d.transform({callName:"transform",refs:null,input:S,options:T||{},isTTY:!1,fs:{readFile(j,V){V(new Error("Internal error"),null)},writeFile(j,V){V(null)}},callback:(j,V)=>j?N(j):R(V)})),formatMessages:(S,T)=>new Promise((R,N)=>d.formatMessages({callName:"formatMessages",refs:null,messages:S,options:T,callback:(j,V)=>j?N(j):R(V)})),analyzeMetafile:(S,T)=>new Promise((R,N)=>d.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof S=="string"?S:JSON.stringify(S),options:T,callback:(j,V)=>j?N(j):R(V)}))}}),vt=he})(te)})(kt);const Tt=_t(Se),$t=""+new URL("esbuild-c6085909.wasm",import.meta.url).href;export{$t as a,Tt as e,_t as g,St as v};
