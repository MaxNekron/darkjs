(()=>{var e={802:e=>{function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((function(n){var i=e[n];"object"!=typeof i||Object.isFrozen(i)||t(i)})),e}var n=t,i=t;n.default=i;class r{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function s(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function a(e,...t){const n=Object.create(null);for(const t in e)n[t]=e[t];return t.forEach((function(e){for(const t in e)n[t]=e[t]})),n}const o=e=>!!e.kind;class l{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=s(e)}openNode(e){if(!o(e))return;let t=e.kind;e.sublanguage||(t=`${this.classPrefix}${t}`),this.span(t)}closeNode(e){o(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}class c{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t={kind:e,children:[]};this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{c._collapse(e)})))}}class u extends c{constructor(e){super(),this.options=e}addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const n=e.root;n.kind=t,n.sublanguage=!0,this.add(n)}toHTML(){return new l(this,this.options).value()}finalize(){return!0}}function d(e){return e?"string"==typeof e?e:e.source:null}const g=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,h="[a-zA-Z]\\w*",p="[a-zA-Z_]\\w*",f="\\b\\d+(\\.\\d+)?",b="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",m="\\b(0b[01]+)",y={begin:"\\\\[\\s\\S]",relevance:0},E={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[y]},v={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[y]},x={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},w=function(e,t,n={}){const i=a({className:"comment",begin:e,end:t,contains:[]},n);return i.contains.push(x),i.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",relevance:0}),i},N=w("//","$"),_=w("/\\*","\\*/"),R=w("#","$"),k={className:"number",begin:f,relevance:0},T={className:"number",begin:b,relevance:0},O={className:"number",begin:m,relevance:0},M={className:"number",begin:f+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},A={begin:/(?=\/[^/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[y,{begin:/\[/,end:/\]/,relevance:0,contains:[y]}]}]},S={className:"title",begin:h,relevance:0},j={className:"title",begin:p,relevance:0};var I=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:h,UNDERSCORE_IDENT_RE:p,NUMBER_RE:f,C_NUMBER_RE:b,BINARY_NUMBER_RE:m,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=function(...e){return e.map((e=>d(e))).join("")}(t,/.*\b/,e.binary,/\b.*/)),a({className:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},BACKSLASH_ESCAPE:y,APOS_STRING_MODE:E,QUOTE_STRING_MODE:v,PHRASAL_WORDS_MODE:x,COMMENT:w,C_LINE_COMMENT_MODE:N,C_BLOCK_COMMENT_MODE:_,HASH_COMMENT_MODE:R,NUMBER_MODE:k,C_NUMBER_MODE:T,BINARY_NUMBER_MODE:O,CSS_NUMBER_MODE:M,REGEXP_MODE:A,TITLE_MODE:S,UNDERSCORE_TITLE_MODE:j,METHOD_GUARD:{begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})}});function C(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function L(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=C,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function D(e,t){Array.isArray(e.illegal)&&(e.illegal=function(...e){return"("+e.map((e=>d(e))).join("|")+")"}(...e.illegal))}function B(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function H(e,t){void 0===e.relevance&&(e.relevance=1)}const P=["of","and","for","in","not","or","if","then","parent","list","value"];function $(e,t,n="keyword"){const i={};return"string"==typeof e?r(n,e.split(" ")):Array.isArray(e)?r(n,e):Object.keys(e).forEach((function(n){Object.assign(i,$(e[n],t,n))})),i;function r(e,n){t&&(n=n.map((e=>e.toLowerCase()))),n.forEach((function(t){const n=t.split("|");i[n[0]]=[e,U(n[0],n[1])]}))}}function U(e,t){return t?Number(t):function(e){return P.includes(e.toLowerCase())}(e)?0:1}function z(e,{plugins:t}){function n(t,n){return new RegExp(d(t),"m"+(e.case_insensitive?"i":"")+(n?"g":""))}class i{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=function(e){return new RegExp(e.toString()+"|").exec("").length-1}(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(function(e,t="|"){let n=0;return e.map((e=>{n+=1;const t=n;let i=d(e),r="";for(;i.length>0;){const e=g.exec(i);if(!e){r+=i;break}r+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?r+="\\"+String(Number(e[1])+t):(r+=e[0],"("===e[0]&&n++)}return r})).map((e=>`(${e})`)).join(t)}(e),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const n=t.findIndex(((e,t)=>t>0&&void 0!==e)),i=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,i)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new i;return this.rules.slice(e).forEach((([e,n])=>t.addRule(e,n))),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=a(e.classNameAliases||{}),function t(i,s){const o=i;if(i.isCompiled)return o;[B].forEach((e=>e(i,s))),e.compilerExtensions.forEach((e=>e(i,s))),i.__beforeBegin=null,[L,D,H].forEach((e=>e(i,s))),i.isCompiled=!0;let l=null;if("object"==typeof i.keywords&&(l=i.keywords.$pattern,delete i.keywords.$pattern),i.keywords&&(i.keywords=$(i.keywords,e.case_insensitive)),i.lexemes&&l)throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");return l=l||i.lexemes||/\w+/,o.keywordPatternRe=n(l,!0),s&&(i.begin||(i.begin=/\B|\b/),o.beginRe=n(i.begin),i.endSameAsBegin&&(i.end=i.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(o.endRe=n(i.end)),o.terminatorEnd=d(i.end)||"",i.endsWithParent&&s.terminatorEnd&&(o.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(o.illegalRe=n(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map((function(e){return function(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return a(e,{variants:null},t)}))),e.cachedVariants?e.cachedVariants:G(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e}("self"===e?i:e)}))),i.contains.forEach((function(e){t(e,o)})),i.starts&&t(i.starts,s),o.matcher=function(e){const t=new r;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(o),o}(e)}function G(e){return!!e&&(e.endsWithParent||G(e.starts))}function K(e){const t={props:["language","code","autodetect"],data:function(){return{detectedLanguage:"",unknownLanguage:!1}},computed:{className(){return this.unknownLanguage?"":"hljs "+this.detectedLanguage},highlighted(){if(!this.autoDetect&&!e.getLanguage(this.language))return console.warn(`The language "${this.language}" you specified could not be found.`),this.unknownLanguage=!0,s(this.code);let t={};return this.autoDetect?(t=e.highlightAuto(this.code),this.detectedLanguage=t.language):(t=e.highlight(this.language,this.code,this.ignoreIllegals),this.detectedLanguage=this.language),t.value},autoDetect(){return!this.language||(e=this.autodetect,Boolean(e||""===e));var e},ignoreIllegals:()=>!0},render(e){return e("pre",{},[e("code",{class:this.className,domProps:{innerHTML:this.highlighted}})])}};return{Component:t,VuePlugin:{install(e){e.component("highlightjs",t)}}}}const F={"after:highlightElement":({el:e,result:t,text:n})=>{const i=q(e);if(!i.length)return;const r=document.createElement("div");r.innerHTML=t.value,t.value=function(e,t,n){let i=0,r="";const a=[];function o(){return e.length&&t.length?e[0].offset!==t[0].offset?e[0].offset<t[0].offset?e:t:"start"===t[0].event?e:t:e.length?e:t}function l(e){r+="<"+Z(e)+[].map.call(e.attributes,(function(e){return" "+e.nodeName+'="'+s(e.value)+'"'})).join("")+">"}function c(e){r+="</"+Z(e)+">"}function u(e){("start"===e.event?l:c)(e.node)}for(;e.length||t.length;){let t=o();if(r+=s(n.substring(i,t[0].offset)),i=t[0].offset,t===e){a.reverse().forEach(c);do{u(t.splice(0,1)[0]),t=o()}while(t===e&&t.length&&t[0].offset===i);a.reverse().forEach(l)}else"start"===t[0].event?a.push(t[0].node):a.pop(),u(t.splice(0,1)[0])}return r+s(n.substr(i))}(i,q(r),n)}};function Z(e){return e.nodeName.toLowerCase()}function q(e){const t=[];return function e(n,i){for(let r=n.firstChild;r;r=r.nextSibling)3===r.nodeType?i+=r.nodeValue.length:1===r.nodeType&&(t.push({event:"start",offset:i,node:r}),i=e(r,i),Z(r).match(/br|hr|img|input/)||t.push({event:"stop",offset:i,node:r}));return i}(e,0),t}const W={},X=e=>{console.error(e)},V=(e,...t)=>{console.log(`WARN: ${e}`,...t)},J=(e,t)=>{W[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),W[`${e}/${t}`]=!0)},Q=s,Y=a,ee=Symbol("nomatch");var te=function(e){const t=Object.create(null),i=Object.create(null),s=[];let a=!0;const o=/(^(<[^>]+>|\t|)+|\n)/gm,l="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let d={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:null,__emitter:u};function g(e){return d.noHighlightRe.test(e)}function h(e,t,n,i){let r="",s="";"object"==typeof t?(r=e,n=t.ignoreIllegals,s=t.language,i=void 0):(J("10.7.0","highlight(lang, code, ...args) has been deprecated."),J("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),s=e,r=t);const a={code:r,language:s};k("before:highlight",a);const o=a.result?a.result:p(a.language,a.code,n,i);return o.code=a.code,k("after:highlight",o),o}function p(e,n,i,o){function c(e,t){const n=v.case_insensitive?t[0].toLowerCase():t[0];return Object.prototype.hasOwnProperty.call(e.keywords,n)&&e.keywords[n]}function u(){null!=_.subLanguage?function(){if(""===T)return;let e=null;if("string"==typeof _.subLanguage){if(!t[_.subLanguage])return void k.addText(T);e=p(_.subLanguage,T,!0,R[_.subLanguage]),R[_.subLanguage]=e.top}else e=f(T,_.subLanguage.length?_.subLanguage:null);_.relevance>0&&(O+=e.relevance),k.addSublanguage(e.emitter,e.language)}():function(){if(!_.keywords)return void k.addText(T);let e=0;_.keywordPatternRe.lastIndex=0;let t=_.keywordPatternRe.exec(T),n="";for(;t;){n+=T.substring(e,t.index);const i=c(_,t);if(i){const[e,r]=i;if(k.addText(n),n="",O+=r,e.startsWith("_"))n+=t[0];else{const n=v.classNameAliases[e]||e;k.addKeyword(t[0],n)}}else n+=t[0];e=_.keywordPatternRe.lastIndex,t=_.keywordPatternRe.exec(T)}n+=T.substr(e),k.addText(n)}(),T=""}function g(e){return e.className&&k.openNode(v.classNameAliases[e.className]||e.className),_=Object.create(e,{parent:{value:_}}),_}function h(e,t,n){let i=function(e,t){const n=e&&e.exec(t);return n&&0===n.index}(e.endRe,n);if(i){if(e["on:end"]){const n=new r(e);e["on:end"](t,n),n.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return h(e.parent,t,n)}function b(e){return 0===_.matcher.regexIndex?(T+=e[0],1):(S=!0,0)}function m(e){const t=e[0],i=n.substr(e.index),r=h(_,e,i);if(!r)return ee;const s=_;s.skip?T+=t:(s.returnEnd||s.excludeEnd||(T+=t),u(),s.excludeEnd&&(T=t));do{_.className&&k.closeNode(),_.skip||_.subLanguage||(O+=_.relevance),_=_.parent}while(_!==r.parent);return r.starts&&(r.endSameAsBegin&&(r.starts.endRe=r.endRe),g(r.starts)),s.returnEnd?0:t.length}let y={};function E(t,s){const o=s&&s[0];if(T+=t,null==o)return u(),0;if("begin"===y.type&&"end"===s.type&&y.index===s.index&&""===o){if(T+=n.slice(s.index,s.index+1),!a){const t=new Error("0 width match regex");throw t.languageName=e,t.badRule=y.rule,t}return 1}if(y=s,"begin"===s.type)return function(e){const t=e[0],n=e.rule,i=new r(n),s=[n.__beforeBegin,n["on:begin"]];for(const n of s)if(n&&(n(e,i),i.isMatchIgnored))return b(t);return n&&n.endSameAsBegin&&(n.endRe=new RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),n.skip?T+=t:(n.excludeBegin&&(T+=t),u(),n.returnBegin||n.excludeBegin||(T=t)),g(n),n.returnBegin?0:t.length}(s);if("illegal"===s.type&&!i){const e=new Error('Illegal lexeme "'+o+'" for mode "'+(_.className||"<unnamed>")+'"');throw e.mode=_,e}if("end"===s.type){const e=m(s);if(e!==ee)return e}if("illegal"===s.type&&""===o)return 1;if(A>1e5&&A>3*s.index)throw new Error("potential infinite loop, way more iterations than matches");return T+=o,o.length}const v=N(e);if(!v)throw X(l.replace("{}",e)),new Error('Unknown language: "'+e+'"');const x=z(v,{plugins:s});let w="",_=o||x;const R={},k=new d.__emitter(d);!function(){const e=[];for(let t=_;t!==v;t=t.parent)t.className&&e.unshift(t.className);e.forEach((e=>k.openNode(e)))}();let T="",O=0,M=0,A=0,S=!1;try{for(_.matcher.considerAll();;){A++,S?S=!1:_.matcher.considerAll(),_.matcher.lastIndex=M;const e=_.matcher.exec(n);if(!e)break;const t=E(n.substring(M,e.index),e);M=e.index+t}return E(n.substr(M)),k.closeAllNodes(),k.finalize(),w=k.toHTML(),{relevance:Math.floor(O),value:w,language:e,illegal:!1,emitter:k,top:_}}catch(t){if(t.message&&t.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:t.message,context:n.slice(M-100,M+100),mode:t.mode},sofar:w,relevance:0,value:Q(n),emitter:k};if(a)return{illegal:!1,relevance:0,value:Q(n),emitter:k,language:e,top:_,errorRaised:t};throw t}}function f(e,n){n=n||d.languages||Object.keys(t);const i=function(e){const t={relevance:0,emitter:new d.__emitter(d),value:Q(e),illegal:!1,top:c};return t.emitter.addText(e),t}(e),r=n.filter(N).filter(R).map((t=>p(t,e,!1)));r.unshift(i);const s=r.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(N(e.language).supersetOf===t.language)return 1;if(N(t.language).supersetOf===e.language)return-1}return 0})),[a,o]=s,l=a;return l.second_best=o,l}const b={"before:highlightElement":({el:e})=>{d.useBR&&(e.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ /]*>/g,"\n"))},"after:highlightElement":({result:e})=>{d.useBR&&(e.value=e.value.replace(/\n/g,"<br>"))}},m=/^(<[^>]+>|\t)+/gm,y={"after:highlightElement":({result:e})=>{d.tabReplace&&(e.value=e.value.replace(m,(e=>e.replace(/\t/g,d.tabReplace))))}};function E(e){let t=null;const n=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const n=d.languageDetectRe.exec(t);if(n){const t=N(n[1]);return t||(V(l.replace("{}",n[1])),V("Falling back to no-highlight mode for this block.",e)),t?n[1]:"no-highlight"}return t.split(/\s+/).find((e=>g(e)||N(e)))}(e);if(g(n))return;k("before:highlightElement",{el:e,language:n}),t=e;const r=t.textContent,s=n?h(r,{language:n,ignoreIllegals:!0}):f(r);k("after:highlightElement",{el:e,result:s,text:r}),e.innerHTML=s.value,function(e,t,n){const r=t?i[t]:n;e.classList.add("hljs"),r&&e.classList.add(r)}(e,n,s.language),e.result={language:s.language,re:s.relevance,relavance:s.relevance},s.second_best&&(e.second_best={language:s.second_best.language,re:s.second_best.relevance,relavance:s.second_best.relevance})}const v=()=>{v.called||(v.called=!0,J("10.6.0","initHighlighting() is deprecated.  Use highlightAll() instead."),document.querySelectorAll("pre code").forEach(E))};let x=!1;function w(){"loading"!==document.readyState?document.querySelectorAll("pre code").forEach(E):x=!0}function N(e){return e=(e||"").toLowerCase(),t[e]||t[i[e]]}function _(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{i[e.toLowerCase()]=t}))}function R(e){const t=N(e);return t&&!t.disableAutodetect}function k(e,t){const n=e;s.forEach((function(e){e[n]&&e[n](t)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){x&&w()}),!1),Object.assign(e,{highlight:h,highlightAuto:f,highlightAll:w,fixMarkup:function(e){return J("10.2.0","fixMarkup will be removed entirely in v11.0"),J("10.2.0","Please see https://github.com/highlightjs/highlight.js/issues/2534"),t=e,d.tabReplace||d.useBR?t.replace(o,(e=>"\n"===e?d.useBR?"<br>":e:d.tabReplace?e.replace(/\t/g,d.tabReplace):e)):t;var t},highlightElement:E,highlightBlock:function(e){return J("10.7.0","highlightBlock will be removed entirely in v12.0"),J("10.7.0","Please use highlightElement now."),E(e)},configure:function(e){e.useBR&&(J("10.3.0","'useBR' will be removed entirely in v11.0"),J("10.3.0","Please see https://github.com/highlightjs/highlight.js/issues/2559")),d=Y(d,e)},initHighlighting:v,initHighlightingOnLoad:function(){J("10.6.0","initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."),x=!0},registerLanguage:function(n,i){let r=null;try{r=i(e)}catch(e){if(X("Language definition for '{}' could not be registered.".replace("{}",n)),!a)throw e;X(e),r=c}r.name||(r.name=n),t[n]=r,r.rawDefinition=i.bind(null,e),r.aliases&&_(r.aliases,{languageName:n})},unregisterLanguage:function(e){delete t[e];for(const t of Object.keys(i))i[t]===e&&delete i[t]},listLanguages:function(){return Object.keys(t)},getLanguage:N,registerAliases:_,requireLanguage:function(e){J("10.4.0","requireLanguage will be removed entirely in v11."),J("10.4.0","Please see https://github.com/highlightjs/highlight.js/pull/2844");const t=N(e);if(t)return t;throw new Error("The '{}' language is required, but not loaded.".replace("{}",e))},autoDetection:R,inherit:Y,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),s.push(e)},vuePlugin:K(e).VuePlugin}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString="10.7.2";for(const e in I)"object"==typeof I[e]&&n(I[e]);return Object.assign(e,I),e.addPlugin(b),e.addPlugin(F),e.addPlugin(y),e}({});e.exports=te},344:e=>{const t="[A-Za-z$_][0-9A-Za-z$_]*",n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],i=["true","false","null","undefined","NaN","Infinity"],r=[].concat(["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],["arguments","this","super","console","window","document","localStorage","module","global"],["Intl","DataView","Number","Math","Date","String","RegExp","Object","Function","Boolean","Error","Symbol","Set","Map","WeakSet","WeakMap","Proxy","Reflect","JSON","Promise","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Float32Array","Array","Uint8Array","Uint8ClampedArray","ArrayBuffer","BigInt64Array","BigUint64Array","BigInt"],["EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"]);function s(e){return a("(?=",e,")")}function a(...e){return e.map((e=>{return(t=e)?"string"==typeof t?t:t.source:null;var t})).join("")}e.exports=function(e){const o=t,l={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,t)=>{const n=e[0].length+e.index,i=e.input[n];"<"!==i?">"===i&&(((e,{after:t})=>{const n="</"+e[0].slice(1);return-1!==e.input.indexOf(n,t)})(e,{after:n})||t.ignoreMatch()):t.ignoreMatch()}},c={$pattern:t,keyword:n,literal:i,built_in:r},u="\\.([0-9](_?[0-9])*)",d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",g={className:"number",variants:[{begin:`(\\b(${d})((${u})|\\.)?|(${u}))[eE][+-]?([0-9](_?[0-9])*)\\b`},{begin:`\\b(${d})\\b((${u})\\b|\\.)?|(${u})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},h={className:"subst",begin:"\\$\\{",end:"\\}",keywords:c,contains:[]},p={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"xml"}},f={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"css"}},b={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,h]},m={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+",contains:[{className:"type",begin:"\\{",end:"\\}",relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},y=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,p,f,b,g,e.REGEXP_MODE];h.contains=y.concat({begin:/\{/,end:/\}/,keywords:c,contains:["self"].concat(y)});const E=[].concat(m,h.contains),v=E.concat([{begin:/\(/,end:/\)/,keywords:c,contains:["self"].concat(E)}]),x={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:c,contains:v};return{name:"Javascript",aliases:["js","jsx","mjs","cjs"],keywords:c,exports:{PARAMS_CONTAINS:v},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,p,f,b,m,g,{begin:a(/[{,\n]\s*/,s(a(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/,o+"\\s*:"))),relevance:0,contains:[{className:"attr",begin:o+s("\\s*:"),relevance:0}]},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[m,e.REGEXP_MODE,{className:"function",begin:"(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:c,contains:v}]}]},{begin:/,/,relevance:0},{className:"",begin:/\s/,end:/\s*/,skip:!0},{variants:[{begin:"<>",end:"</>"},{begin:l.begin,"on:begin":l.isTrulyOpeningTag,end:l.end}],subLanguage:"xml",contains:[{begin:l.begin,end:l.end,skip:!0,contains:["self"]}]}],relevance:0},{className:"function",beginKeywords:"function",end:/[{;]/,excludeEnd:!0,keywords:c,contains:["self",e.inherit(e.TITLE_MODE,{begin:o}),x],illegal:/%/},{beginKeywords:"while if switch catch for"},{className:"function",begin:e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,contains:[x,e.inherit(e.TITLE_MODE,{begin:o})]},{variants:[{begin:"\\."+o},{begin:"\\$"+o}],relevance:0},{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{begin:/\b(?=constructor)/,end:/[{;]/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:o}),"self",x]},{begin:"(get|set)\\s+(?="+o+"\\()",end:/\{/,keywords:"get set",contains:[e.inherit(e.TITLE_MODE,{begin:o}),{begin:/\(\)/},x]},{begin:/\$[(.]/}]}}},157:e=>{function t(e){return e?"string"==typeof e?e:e.source:null}function n(e){return i("(?=",e,")")}function i(...e){return e.map((e=>t(e))).join("")}function r(...e){return"("+e.map((e=>t(e))).join("|")+")"}e.exports=function(e){const t=i(/[A-Z_]/,i("(",/[A-Z0-9_.-]*:/,")?"),/[A-Z0-9_.-]*/),s={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},a={begin:/\s/,contains:[{className:"meta-keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},o=e.inherit(a,{begin:/\(/,end:/\)/}),l=e.inherit(e.APOS_STRING_MODE,{className:"meta-string"}),c=e.inherit(e.QUOTE_STRING_MODE,{className:"meta-string"}),u={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[A-Za-z0-9._:-]+/,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[s]},{begin:/'/,end:/'/,contains:[s]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[a,c,l,o,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[a,o,c,l]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},s,{className:"meta",begin:/<\?xml/,end:/\?>/,relevance:10},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[u],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[u],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:i(/</,n(i(t,r(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:u}]},{className:"tag",begin:i(/<\//,n(i(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}},843:(e,t,n)=>{"use strict";e.exports=n.p+"9a510f558e8f55aa07d9.svg"},726:(e,t,n)=>{"use strict";n(52);const i=function(e){let t=[];return Object.keys(e).forEach((n=>{t.push([(n+"").url_encode(),(e[n]+"").url_encode()].join("="))})),t.join("&")},r={attributes:!0,childList:!0,subtree:!0},s={load:function(e){"img"!=this.getTag()&&window.addEventListener("load",e.bind(this),!1)},modified:function(e){let t,n=function(){t||(setTimeout(e.bind(this),1),t=setTimeout((()=>{t=null}),1))}.bind(this);"undefined"!=typeof MutationObserver?new MutationObserver(n).observe(this,r):this.addEventListener("DOMSubtreeModified",n,!1)}};Element.prototype.setClass=function(e){return this.setAttribute("class",e||""),this},Element.prototype.getClass=function(){return this.getAttribute("class")||""},Element.prototype.hasClass=function(e){return!!this.getClass().match(new RegExp("(\\s|^)"+e+"(\\s|$)"))},Element.prototype.addClass=function(e){return this.hasClass(e)||this.setClass((this.getClass()+" "+e).trim()),this},Element.prototype.removeClass=function(e){var t=new RegExp("(\\s|^)"+e+"(\\s|$)");return this.setClass(this.getClass().replace(t," ").trim()),this},Element.prototype.removeClassMatching=function(e){const t=this.getClass().match(new RegExp(e,"g"))||[];for(var n=0;n<t.length;n++)this.removeClass(t[n]);return this},Element.prototype.toHtml=function(){var e=document.createElement("div");return e.appendChild(this),e.innerHTML},Element.prototype.insert=function(e,t){return this.childNodes.length>0&&t<this.childNodes.length&&"bottom"!==t?("top"===t&&(t=0),this.insertBefore(e,this.childNodes[t])):this.appendChild(e),this},Element.prototype.before=function(e,t){var n=this.parentNode,i=Array.prototype.indexOf.call(n.childNodes,this)-1;return n.insert(e,i),this},Element.prototype.after=function(e,t){var n=this.parentNode,i=Array.prototype.indexOf.call(n.childNodes,this)+1;return n.insert(e,i)},Element.prototype.remove=function(){var e=this.parentNode;e&&e.removeChild(this)},Element.prototype.contains=function(e){return this==e||!!e&&this.contains(e.parentNode)},Element.prototype.getText=function(){return this.innerText},Element.prototype.setText=function(e){return this.innerText=e,this},Element.prototype.addText=function(e){return this.innerText=this.innerText+e,this},Element.prototype.getHtml=function(){return this.innerHTML},Element.prototype.setHtml=function(e){return this.innerHTML=e,this},Element.prototype.addText=function(e){return this.innerHTML=this.innerHTML+e,this},Element.prototype.getTag=function(){return this.tagName.toLowerCase()},Element.prototype.on=function(e,t,n){const i=s[e];return i&&i.bind(this)(t.bind(this)),this.addEventListener(e,t.bind(this),n),this},Window.prototype.on=Element.prototype.on,Element.prototype.styles=null,Element.prototype.addStyle=function(e,t){return this.style[e]=t,this},Element.prototype.setStyle=function(e){return this.setAttribute("style",e),this},Element.prototype.getStyle=function(e){return this.styles||(this.styles=window.getComputedStyle(this,null)),this.styles.getPropertyValue(e)},Element.prototype.getPath=function(){if(""!==this.id)return"#"+this.id;if(this===document.body)return this.getTag();for(var e=1,t=this.parentNode.childNodes,n=0;n<t.length;n++){var i=t[n];if(i===this)return this.parentNode.getPath()+" > "+this.getTag()+":nth-of-type("+e+")";1===i.nodeType&&i.getTag()===this.getTag()&&(e+=1)}};const a=function(e){const t=e.replace(/^(\w+).*/i,"$1"),n=document.createElement(t);var i=e.replace(/\[[^\[\]]+\]/g,"").match(/#[\w-]+/),r=e.replace(/\[[^\[\]]+\]/g,"").match(/\.([\w\-]+)/g),s=e.match(/\[[^\[\]]+\]/g);return i&&(n.id=i.join("").replace("#","")),r&&n.setClass(r.join("").replace(/\./g," ").trim()),s&&s.forEach((e=>{var t=e.replace(/\[|\]/g,"").split("=");n.setAttribute(t[0],t.splice(1).join("="))})),n},o=function(e,t){const n=Object.keys(t);for(let i=0;i<n.length;i++){const r=n[i];e=e.replace(new RegExp("{"+r+"}","g"),t[r])}return e.replace(new RegExp("{\\w+}","g"),"")},l=JSON.parse('{"b":"https://github.com/bogue89/darkjs"}');var c=n(802),u=n.n(c),d=n(344),g=n.n(d),h=n(157),p=n.n(h);u().registerLanguage("javascript",g()),u().registerLanguage("xml",p());const f=location.origin+"/darkjs.js",b="\n\t<script>\n\t\tdarkCallback = function() {\n\t\t\tnew Darkjs(document.body, {});\n\t\t}\n\t<\/script>".replace(/\t/g,"    "),m='<head>\n\t...{callback}\n\t<script src="{url}{params}"><\/script>\n</head>'.replace(/\t/g,"    ");function y(){return a("pre.preview")}const E=function(){return y().setHtml(u().highlightAuto(o(m,{url:f})).value)},v=function(){return y().setHtml(u().highlightAuto(o(m,{url:f,params:"?callback=darkCallback",callback:b})).value)};class x{constructor(e){const t=this.hsla(e);this.hue=t.hue,this.saturation=t.saturation,this.lightness=t.lightness,this.alpha=t.alpha}}x.prototype.toString=function(){return this.toRgba()},x.prototype.toHexa=function(){this.hslToRgb(this.hue%360,this.saturation,this.lightness);var e=this.valToHex(255*this.alpha);return this.toHex()+e},x.prototype.toHex=function(){const e=this.hslToRgb(this.hue%360,this.saturation,this.lightness);return"#"+this.valToHex(e.red)+this.valToHex(e.green)+this.valToHex(e.blue)},x.prototype.toRgba=function(){const e=this.hslToRgb(this.hue%360,this.saturation,this.lightness);return"rgba("+Math.round(e.red)+", "+Math.round(e.green)+", "+Math.round(e.blue)+", "+this.alpha+")"},x.prototype.toHsl=function(){return"hsl("+(this.hue%360||0)+", "+Math.round(100*this.sat)+"%, "+Math.round(100*this.lightness)+"%)"},x.prototype.valToHex=function(e){for(var t=parseInt(e).toString(16);t.length<2;)t="0"+t;return t},x.prototype.hslToRgb=function(e,t,n){var i,r;return e/=60,i=2*n-(r=n<=.5?n*(t+1):n+t-n*t),{red:255*this.hueToRgb(i,r,e+2),green:255*this.hueToRgb(i,r,e),blue:255*this.hueToRgb(i,r,e-2)}},x.prototype.hueToRgb=function(e,t,n){return n<0&&(n+=6),n>=6&&(n-=6),n<1?(t-e)*n+e:n<3?t:n<4?(t-e)*(4-n)+e:e},x.prototype.rgba=function(e){var t=1,n=e.replace(/[^\d\,\.]/g,"").split(",");return n[0]=(parseInt(n[0])||0)/255,n[1]=(parseInt(n[1])||0)/255,n[2]=(parseInt(n[2])||0)/255,void 0!==n[3]&&(t=parseFloat(n[3])),{red:n[0],green:n[1],blue:n[2],alpha:t}},x.prototype.hsla=function(e){const t=this.rgba(e);var n,i,r,s,a,o,l=[];for(l[0]=t.red,l[1]=t.green,l[2]=t.blue,n=l[0],i=l[0],a=0,r=0;r<l.length-1;r++)l[r+1]<=n&&(n=l[r+1]),l[r+1]>=i&&(i=l[r+1],a=r+1);return 0==a&&(o=(l[1]-l[2])/(i-n)),1==a&&(o=2+(l[2]-l[0])/(i-n)),2==a&&(o=4+(l[0]-l[1])/(i-n)),isNaN(o)&&(o=0),(o*=60)<0&&(o+=360),s=(n+i)/2,{hue:o,saturation:n==i?0:s<.5?(i-n)/(i+n):(i-n)/(2-i-n),lightness:s,alpha:t.alpha}};var w=n(843);function N(e,t,n){return a("div.card").insert(a("div.card-body").insert(a("h3").setText(e)).insert(a("div").insert(t))).insert(a("div.card-footer").insert(a("button[type=button].btn.btn-warning").setHtml('<i class="fas fa-'+(n?"check text-success":"times text-danger")+'"></i> Test').on("click",(function(){if("undefined"==typeof Darkjs)return void alert("you need to import the lib");const e=this.parentNode.parentNode;e.darkjs&&e.darkjs.toggle()}))))}const _=[N("Reactive",function(){let e=1;const t=a("div.list.d-flex.justify-content-around");return setInterval((()=>{e>9&&(e=1),t.insert(a("p").setHtml(e++));const n=t.querySelectorAll("*");n.length>4&&n[0].remove()}),1e3),a("div").insert(a("p").setHtml("Changing DOM elements")).insert(t)}(),!0),N("Black logos",function(){const e=a("div");return fetch(w).then((e=>e.text())).then((t=>{e.setHtml(t)})),a("div").insert(a("p").setHtml("On img and svg elements")).insert(a("div.d-flex").insert(a(o("img[src={url}][width=30%]",{url:w}))).insert(e).insert(a("div").setStyle("background: transparent url("+w+") center center repeat-x; background-size:contain; width: 30%; height: 100px;")))}()),N("Equal bright",function(){var e,t;const n=(i=[120,80,270].join(","),new x(i));var i;return n.lightness=.8,e=n.toRgba(),n.hue+=150,t=n.toRgba(),a("div").insert(a("p").setHtml("Colors with same brigtness level")).insert(a("div.d-flex.align-items-center").insert(a("div").setStyle("width:50%; height: 80px;").addStyle("background-color",e)).insert(a("div").setStyle("width:50%; height: 80px;").addStyle("background-color",t)))}(),!0),N("Gradients",a("div").insert(a("p").setHtml("Color gradients as backgrounds")).insert(a("div").addStyle("background","linear-gradient(-90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)").addStyle("height","120px"))),N("Opacity",a("div").insert(a("p").setHtml("Same color, different opacities.")).insert(a("div.position-relative").insert(a("div").setStyle("height: 120px; width: 140px; border-radius: .5rem; position: absolute; top: 0;").addStyle("background","rgba(0,0,0,0.4)")).insert(a("div").setStyle("height: 120px; width: 140px; border-radius: .5rem; position: absolute; top: 20px;").addStyle("background","#000").addStyle("opacity",.4).addStyle("margin","0 0 0 auto").addStyle("right","30px")).insert(a("div").setStyle("height: 120px; width: 140px; border-radius: .5rem; position: absolute; top: 0;").addStyle("background","rgba(0,0,0,0.4)").addStyle("opacity",.4).addStyle("margin","80px 0 0 60px").addStyle("left:60px"))))],R=function(){return a("div.greetings.h-100.d-flex.align-items-center").insert(a("div").insert(a("h1").setText("Dark.js")).insert(a("p.lead").setText("Allow your users to navigate on a dark themed version of your website.")).insert(a("a.btn.btn-primary.w-100[href="+l.b+"][target=_blank]").setHtml('<i class="fab fa-github"></i> Download on Github')))},k=function(){return a("div.card.card-preview").insert(a("h2").setText("How to use")).insert(a("p").setText("You can import the .js file on your <head> with no configuration and it will apply to body")).insert(E()).insert(a("p").setText("... or you can manually target elements")).insert(v()).insert(a("div.text-center").insert(a("button.btn.btn-outline-primary[type=button]").setText("").on("click",(e=>{"undefined"!=typeof Darkjs?(document.body.darkjs||(document.body.darkjs=new Darkjs(document.body)),document.body.darkjs.toggle()):alert("you need to import the lib")}))))},T=function(){const e=a("div.row");return _.forEach((t=>{e.insert(a("div.col-sm-6.col-md-4").insert(t))})),a("div.whatifs").insert(e)};var O;document.body.appendChild(a("main.container").insert(a("div.row").insert(a("div.col-lg-3.col-md-5").insert(R())).insert(a("div.col-lg-8.offset-lg-1.col-md-7").insert(k()))).insert(a("h3.text-center").setText("But what if...")).insert(T())),document.body.appendChild(a("footer.fixed-bottom.text-center").insert(a("p").setText("Make the world a little ").insert(a("a.twitter-share-button[target=_blank][href="+(O=location.href,"https://twitter.com/intent/tweet?"+i({text:"Make the world a little darker",url:O,via:"bogue89"})+"]")).setHtml('darker <i class="fab fa-twitter"></i>')))),window.darkcall=function(){document.querySelectorAll(".whatifs .card").forEach(((e,t)=>{e.darkjs=new Darkjs(e,{storeKey:`darkmode-card-${t}`})})),document.body.darkjs=new Darkjs(document.body)},document.head.append(a(o("script[src={url}{lib}?{query}]",{url:".",lib:"/darkjs@1.0.0.js",query:i({callback:"darkcall"})})))},52:()=>{String.prototype.url_encode=function(){return encodeURIComponent(this)},String.prototype.url_decode=function(){return decodeURIComponent(this)}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n(726)})();