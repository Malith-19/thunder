import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{$ as t,D as n,E as r,G as i,H as a,K as o,P as s,U as c,Y as l,Z as u,g as d,h as f,k as p,p as m,q as h,r as g,t as _,v,x as y}from"./useThunderID-C3gWshdm.js";import{t as b}from"./useQuery-CWCwOHyx.js";import{_ as x,n as S,r as C,t as w}from"./vendor-emotion-BJbDtNae.js";import{At as T,Ct as E,Nt as D,Ot as O,Q as k,Sn as A,U as j,V as M,X as N,_ as ee,_t as P,a as te,at as F,b as I,gt as ne,ht as L,i as R,it as re,jt as z,k as B,kt as V,nn as ie,nt as H,ot as ae,q as U,rt as oe,ut as se,w as ce,x as le,y as W}from"./vendor-mui-DfBexhDa.js";import{Dx as ue,UA as de,Uc as fe,XT as pe,_c as me,cE as he,d as ge,fC as _e,ju as ve,kx as ye,m as be,p as xe,pd as Se,q as Ce,ur as we}from"./vendor-oxygen-DFNgTxPQ.js";import{i as Te,n as Ee,r as De,t as Oe}from"./getInitials-BpS93xXW.js";import{i as ke,r as G}from"./dist-C1_-3XjN.js";import{n as Ae}from"./vendor-react-BRrCN599.js";import{i as je}from"./useLogger-DgvtF-BW-CNR9g72n.js";import{t as Me}from"./PageLoadingAnimation-CVoCdtHm.js";import{t as K}from"./vendor-i18n-CV5imxpN.js";import{n as Ne,r as Pe}from"./dist-mirMQsjX.js";import{C as Fe,D as Ie,E as Le,O as q,S as Re,T as ze,i as Be,w as Ve,x as He}from"./dist-DDJhqe5k.js";import{t as Ue}from"./purify.es-DY32g7DN.js";import{t as We}from"./ResourceAvatar-BaWxNqpA.js";import{c as Ge,l as Ke,n as qe}from"./chunk-4N6VE7H7--bPOxL5U.js";import{a as Je,c as Ye,i as Xe,o as Ze,s as J}from"./schemas-DAq7cNL2.js";var Y=e(x(),1),Qe=(0,Y.createContext)({}),$e=(0,Y.createContext)(void 0),et=e=>{let t=(0,Y.useContext)(g),n=(0,Y.useContext)($e)?.i18n;if(!t)throw Error(`useTranslation must be used within an I18nProvider. Make sure your component is wrapped with ThunderIDProvider which includes I18nProvider.`);let r=e??n,{t:i,currentLanguage:a,setLanguage:s,bundles:c,fallbackLanguage:l}=t,u=(0,Y.useMemo)(()=>{if(!r?.bundles)return c;let e={};return Object.entries(c).forEach(([t,n])=>{e[t]=n}),Object.entries(r.bundles).forEach(([t,n])=>{let r=o(n.translations);e[t]?e[t]={...e[t],metadata:n.metadata?{...e[t].metadata,...n.metadata}:e[t].metadata,translations:p(e[t].translations,r)}:e[t]={...n,translations:r}}),e},[c,r?.bundles]),d=(0,Y.useMemo)(()=>r?.bundles?(e,t)=>{let n,r=u[a];if(r?.translations?.[e]&&(n=r.translations[e]),!n&&a!==l){let t=u[l];t?.translations?.[e]&&(n=t.translations[e])}return n||=e,t&&Object.keys(t).length>0?Object.entries(t).reduce((e,[t,n])=>e.replace(RegExp(`\\{${t}\\}`,`g`),String(n)),n):n}:i,[u,a,l,i,r?.bundles]);return{availableLanguages:Object.keys(u),currentLanguage:a,setLanguage:s,t:d}},tt=(e,t,n,r)=>(0,Y.useMemo)(()=>{let t=r||e.vars.colors.primary.main,i={large:`32px`,medium:`20px`,small:`16px`},a=i[n],o=w`
      width: ${a};
      height: ${a};
      border: 2px solid transparent;
      border-top: 2px solid ${t};
      border-radius: 50%;
      animation: ${C`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `} 1s linear infinite;
      display: inline-block;
    `,s=w`
      width: ${i.small};
      height: ${i.small};
    `,c=w`
      width: ${i.medium};
      height: ${i.medium};
    `;return{spinner:o,spinnerLarge:w`
      width: ${i.large};
      height: ${i.large};
    `,spinnerMedium:c,spinnerSmall:s}},[e,t,n,r]),X=A(),nt=({size:e=`medium`,color:t,className:n,style:i})=>{let{theme:a,colorScheme:o}=q(),s=tt(a,o,e,t);return(0,X.jsx)(`span`,{className:S(l(r(`spinner`)),s.spinner,e===`small`&&s.spinnerSmall,e===`medium`&&s.spinnerMedium,e===`large`&&s.spinnerLarge,n),style:i,role:`status`,"aria-label":`Loading`})},rt=(e,t,n,r,i,a,o,s,c=`square`)=>(0,Y.useMemo)(()=>{let t={large:`calc(${e.vars.spacing.unit} * 5)`,medium:`calc(${e.vars.spacing.unit} * 4)`,small:`calc(${e.vars.spacing.unit} * 3)`},l=t[i]||t.medium,u=w`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: calc(${e.vars.spacing.unit} * 1);
      border-radius: ${c===`round`?`50%`:e.vars.components?.Button?.root?.borderRadius||e.vars.borderRadius.medium};
      font-weight: 500;
      cursor: ${o||s?`not-allowed`:`pointer`};
      outline: none;
      text-decoration: none;
      white-space: nowrap;
      width: ${a?`100%`:`auto`};
      opacity: ${o||s?.6:1};
      font-family: ${e.vars.typography.fontFamily};
      border-width: 1px;
      border-style: solid;
      ${r===`icon`?`
        padding: 0;
        min-width: unset;
        min-height: unset;
        width: ${l};
        height: ${l};
        justify-content: center;
        align-items: center;
      `:``}
    `,d={large:w`
        ${r===`icon`?`font-size: ${e.vars.typography.fontSizes.lg};`:`padding: calc(${e.vars.spacing.unit} * 1.5) calc(${e.vars.spacing.unit} * 3);
             font-size: ${e.vars.typography.fontSizes.lg};
             min-height: calc(${e.vars.spacing.unit} * 5);`}
      `,medium:w`
        ${r===`icon`?`font-size: ${e.vars.typography.fontSizes.md};`:`padding: calc(${e.vars.spacing.unit} * 1) calc(${e.vars.spacing.unit} * 2);
             font-size: ${e.vars.typography.fontSizes.md};
             min-height: calc(${e.vars.spacing.unit} * 4);`}
      `,small:w`
        ${r===`icon`?`font-size: ${e.vars.typography.fontSizes.sm};`:`padding: calc(${e.vars.spacing.unit} * 0.5) calc(${e.vars.spacing.unit} * 1);
             font-size: ${e.vars.typography.fontSizes.sm};
             min-height: calc(${e.vars.spacing.unit} * 3);`}
      `},f={"primary-icon":w`
        background-color: transparent;
        color: ${e.vars.colors.primary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.hover};
          color: ${e.vars.colors.primary.dark};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.selected};
          color: ${e.vars.colors.primary.dark};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.focus};
          color: ${e.vars.colors.primary.dark};
          outline: none;
        }
      `,"primary-outline":w`
        background-color: transparent;
        color: ${e.vars.colors.primary.main};
        border-color: ${e.vars.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${e.vars.colors.primary.main};
          color: ${e.vars.colors.primary.contrastText};
        }
        &:active:not(:disabled) {
          background-color: ${e.vars.colors.primary.main};
          color: ${e.vars.colors.primary.contrastText};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${e.vars.colors.primary.main};
          color: ${e.vars.colors.primary.contrastText};
          opacity: 0.9;
        }
      `,"primary-solid":w`
        background-color: ${e.vars.colors.primary.main};
        color: ${e.vars.colors.primary.contrastText};
        border-color: ${e.vars.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${e.vars.colors.primary.main};
          opacity: 0.9;
        }
        &:active:not(:disabled) {
          background-color: ${e.vars.colors.primary.main};
          opacity: 0.8;
        }
        &:focus:not(:disabled) {
          background-color: ${e.vars.colors.primary.main};
          opacity: 0.8;
        }
      `,"primary-text":w`
        background-color: transparent;
        color: ${e.vars.colors.primary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.hover};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.selected};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.focus};
          outline: none;
        }
      `,"secondary-icon":w`
        background-color: transparent;
        color: ${e.vars.colors.secondary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.hover};
          color: ${e.vars.colors.secondary.dark};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.selected};
          color: ${e.vars.colors.secondary.dark};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.focus};
          color: ${e.vars.colors.secondary.dark};
          outline: none;
        }
      `,"secondary-outline":w`
        background-color: transparent;
        color: ${e.vars.colors.secondary.main};
        border-color: ${e.vars.colors.secondary.main};
        &:hover:not(:disabled) {
          background-color: ${e.vars.colors.secondary.main};
          color: ${e.vars.colors.secondary.contrastText};
        }
        &:active:not(:disabled) {
          background-color: ${e.vars.colors.secondary.main};
          color: ${e.vars.colors.secondary.contrastText};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${e.vars.colors.secondary.main};
          color: ${e.vars.colors.secondary.contrastText};
          opacity: 0.9;
        }
      `,"secondary-solid":w`
        background-color: ${e.vars.colors.secondary.main};
        color: ${e.vars.colors.secondary.contrastText};
        border-color: ${e.vars.colors.secondary.main};
        &:hover:not(:disabled) {
          background-color: ${e.vars.colors.secondary.main};
          opacity: 0.9;
        }
        &:active:not(:disabled) {
          background-color: ${e.vars.colors.secondary.main};
          opacity: 0.8;
        }
        &:focus:not(:disabled) {
          background-color: ${e.vars.colors.secondary.main};
          opacity: 0.8;
        }
      `,"secondary-text":w`
        background-color: transparent;
        color: ${e.vars.colors.secondary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.hover};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.selected};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.focus};
          outline: none;
        }
      `,"tertiary-icon":w`
        background-color: transparent;
        color: ${e.vars.colors.text.secondary};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.hover};
          color: ${e.vars.colors.text.primary};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.selected};
          color: ${e.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.focus};
          color: ${e.vars.colors.text.primary};
          outline: none;
        }
      `,"tertiary-outline":w`
        background-color: transparent;
        color: ${e.vars.colors.text.secondary};
        border-color: ${e.vars.colors.border};
        &:hover:not(:disabled) {
          background-color: ${e.vars.colors.action.hover};
          border-color: ${e.vars.colors.text.secondary};
        }
        &:active:not(:disabled) {
          background-color: ${e.vars.colors.action.selected};
          border-color: ${e.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          background-color: ${e.vars.colors.action.focus};
          border-color: ${e.vars.colors.text.primary};
        }
      `,"tertiary-solid":w`
        background-color: ${e.vars.colors.text.secondary};
        color: ${e.vars.colors.background.surface};
        border-color: ${e.vars.colors.text.secondary};
        &:hover:not(:disabled) {
          background-color: ${e.vars.colors.text.primary};
          color: ${e.vars.colors.background.surface};
        }
        &:active:not(:disabled) {
          background-color: ${e.vars.colors.text.primary};
          color: ${e.vars.colors.background.surface};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${e.vars.colors.text.primary};
          color: ${e.vars.colors.background.surface};
          opacity: 0.9;
        }
      `,"tertiary-text":w`
        background-color: transparent;
        color: ${e.vars.colors.text.secondary};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.hover};
          color: ${e.vars.colors.text.primary};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.selected};
          color: ${e.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${e.vars.colors.action.focus};
          color: ${e.vars.colors.text.primary};
          outline: none;
        }
      `},p=w`
      display: flex;
      align-items: center;
      justify-content: center;
    `,m=w`
      display: flex;
      align-items: center;
      justify-content: center;
    `;return{button:u,content:w`
      display: flex;
      align-items: center;
      justify-content: center;
    `,endIcon:m,fullWidth:a?w`
            width: 100%;
          `:null,icon:m,loading:s?w`
            pointer-events: none;
          `:null,shape:c===`round`?w`
              border-radius: 50%;
            `:null,size:d[i],spinner:p,startIcon:m,variant:f[`${n}-${r}`]||f[`primary-solid`]}},[e,t,n,r,i,a,o,s]),it=(e,t)=>e===`small`?`calc(${t} * 1.5)`:e===`medium`?`calc(${t} * 2)`:`calc(${t} * 2.5)`,at=(0,Y.forwardRef)(({color:e=`primary`,variant:t=`solid`,size:n=`medium`,fullWidth:i=!1,loading:a=!1,startIcon:o,endIcon:s,children:c,className:u,disabled:d,style:f,shape:p=`square`,...m},h)=>{let{theme:g,colorScheme:_}=q(),v=rt(g,_,e,t,n,i,d||!1,a,p),y=t===`icon`,b=it(n,g.vars.spacing.unit);return(0,X.jsxs)(`button`,{ref:h,style:f,className:S(l(r(`button`)),l(r(`button`,t)),l(r(`button`,e)),l(r(`button`,n)),l(r(`button`,p)),i?l(r(`button`,`fullWidth`)):void 0,a?l(r(`button`,`loading`)):void 0,d||a?l(r(`button`,`disabled`)):void 0,v.button,v.size,v.variant,v.fullWidth,v.loading,v.shape,u),disabled:d||a,...m,children:[a&&(0,X.jsx)(`span`,{className:S(l(r(`button`,`spinner`)),v.spinner),children:(0,X.jsx)(nt,{size:n,color:`currentColor`,style:{height:b,width:b}})}),!a&&y&&(0,X.jsx)(`span`,{className:S(l(r(`button`,`icon`)),v.icon),children:c||o||s}),!a&&!y&&o&&(0,X.jsx)(`span`,{className:S(l(r(`button`,`start-icon`)),v.startIcon),children:o}),!y&&c&&(0,X.jsx)(`span`,{className:S(l(r(`button`,`content`)),v.content),children:c}),!a&&!y&&s&&(0,X.jsx)(`span`,{className:S(l(r(`button`,`end-icon`)),v.endIcon),children:s})]})});at.displayName=`Button`;var ot=at,st=(e,t,n,r)=>(0,Y.useMemo)(()=>{let t=w`
      display: flex;
      align-items: center;
    `,i=w`
      width: calc(${e.vars.spacing.unit} * 2.5);
      height: calc(${e.vars.spacing.unit} * 2.5);
      margin-inline-end: ${e.vars.spacing.unit};
      accent-color: ${e.vars.colors.primary.main};
      cursor: pointer;

      &:focus {
        outline: 2px solid ${e.vars.colors.primary.main};
        outline-offset: 2px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `,a=w`
      accent-color: ${e.vars.colors.error.main};

      &:focus {
        outline-color: ${e.vars.colors.error.main};
      }
    `,o=w`
      color: ${e.vars.colors.text.primary};
      font-size: ${e.vars.typography.fontSizes.sm};
      font-family: ${e.vars.typography.fontFamily};
      cursor: pointer;

      &:hover {
        color: ${e.vars.colors.text.primary};
      }
    `,s=w`
      color: ${e.vars.colors.error.main};
    `,c=w`
      /* Required indicator styles will be handled by InputLabel */
    `;return{container:t,errorInput:n?a:``,errorLabel:n?s:``,input:i,label:o,required:r?c:``}},[e,t,n,r]),ct=({label:e,error:t,className:n,required:i,helperText:a,style:o={},...s})=>{let{theme:c,colorScheme:u}=q(),d=!!t,f=st(c,u,d,!!i);return(0,X.jsx)(Le,{error:t,helperText:a,className:S(l(r(`checkbox`)),n),helperTextMarginLeft:`calc(${c.vars.spacing.unit} * 3.5)`,children:(0,X.jsxs)(`div`,{style:o,className:S(l(r(`checkbox`,`container`)),f.container),children:[(0,X.jsx)(`input`,{type:`checkbox`,className:S(l(r(`checkbox`,`input`)),f.input,f.errorInput,{[l(r(`checkbox`,`input`,`error`))]:d}),"aria-invalid":d,"aria-required":i,...s}),e&&(0,X.jsx)(ze,{required:i,error:d,variant:`inline`,className:S(l(r(`checkbox`,`label`)),f.label,f.errorLabel,{[l(r(`checkbox`,`label`,`error`))]:d}),children:e})]})})},lt=(e,t,n,r)=>(0,Y.useMemo)(()=>{let t=w`
      width: 100%;
      padding: ${e.vars.spacing.unit} calc(${e.vars.spacing.unit} * 1.5);
      border: 1px solid ${e.vars.colors.border};
      border-radius: ${e.vars.components?.Field?.root?.borderRadius||e.vars.borderRadius.medium};
      font-size: 1rem;
      font-family: ${e.vars.typography.fontFamily};
      color: ${e.vars.colors.text.primary};
      background-color: ${e.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        border-color: ${e.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.primary.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${e.vars.colors.primary.main};
      }

      &::placeholder {
        color: ${e.vars.colors.text.secondary};
      }
    `,i=w`
      border-color: ${e.vars.colors.error.main};

      &:focus {
        border-color: ${e.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${e.vars.colors.error.main};
      }
    `,a=w`
      background-color: ${e.vars.colors.background.disabled};
      color: ${e.vars.colors.text.secondary};
      cursor: not-allowed;
      opacity: 0.6;

      &:hover,
      &:focus {
        border-color: ${e.vars.colors.border};
        box-shadow: none;
      }
    `,o=w`
      /* Label styles will be handled by InputLabel component */
    `;return{disabledInput:r?a:``,errorInput:n?i:``,input:t,label:o}},[e,t,n,r]),ut=({label:e,error:t,className:n,required:i,disabled:a,helperText:o,dateFormat:s=`yyyy-MM-dd`,style:c={},...u})=>{let{theme:d,colorScheme:f}=q(),p=!!t,m=lt(d,f,p,!!a);return(0,X.jsxs)(Le,{error:t,helperText:o,className:S(l(r(`date-picker`)),n),style:c,children:[e&&(0,X.jsx)(ze,{required:i,error:p,className:S(l(r(`date-picker`,`label`)),m.label),children:e}),(0,X.jsx)(`input`,{type:`date`,pattern:`\\d{4}-\\d{2}-\\d{2}`,placeholder:s,className:S(l(r(`date-picker`,`input`)),m.input,m.errorInput,m.disabledInput,{[l(r(`date-picker`,`input`,`error`))]:p,[l(r(`date-picker`,`input`,`disabled`))]:a}),disabled:a,"aria-invalid":p,"aria-required":i,...u})]})},dt=(e,t,n,r,i)=>(0,Y.useMemo)(()=>{let t=w`
      display: flex;
      gap: ${e.vars.spacing.unit};
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    `,i=w`
      width: calc(${e.vars.spacing.unit} * 6);
      height: calc(${e.vars.spacing.unit} * 6);
      text-align: center;
      font-size: ${e.vars.typography.fontSizes.xl};
      font-family: ${e.vars.typography.fontFamily};
      font-weight: 500;
      border: 2px solid ${r?e.vars.colors.error.main:e.vars.colors.border};
      border-radius: ${e.vars.components?.Field?.root?.borderRadius||e.vars.borderRadius.medium};
      color: ${e.vars.colors.text.primary};
      background-color: ${n?e.vars.colors.background.disabled:e.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        border-color: ${r?e.vars.colors.error.main:e.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${r?`${e.vars.colors.error.main}20`:`${e.vars.colors.primary.main}20`};
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      &::placeholder {
        color: ${e.vars.colors.text.secondary};
        opacity: 0.7;
      }
    `,a=w`
      border-color: ${e.vars.colors.error.main};

      &:focus {
        border-color: ${e.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.error.main}20;
      }
    `;return{input:i,inputContainer:t,inputDisabled:w`
      background-color: ${e.vars.colors.background.disabled};
      cursor: not-allowed;
      opacity: 0.6;
    `,inputError:a}},[e,t,n,r,i]),ft=({label:e,error:t,className:n,required:i,disabled:a,helperText:o,length:s=6,value:c=``,onChange:u,onComplete:d,type:f=`text`,placeholder:p=``,style:m={},autoFocus:h=!1,pattern:g})=>{let{theme:_,colorScheme:v}=q(),y=dt(_,v,!!a,!!t,s),[b,x]=(0,Y.useState)(Array(s).fill(``)),C=(0,Y.useRef)([]);(0,Y.useEffect)(()=>{C.current=C.current.slice(0,s)},[s]),(0,Y.useEffect)(()=>{if(c){let e=c.split(``).slice(0,s);for(;e.length<s;)e.push(``);x(e)}else x(Array(s).fill(``))},[c,s]),(0,Y.useEffect)(()=>{h&&C.current[0]&&C.current[0].focus()},[h]);let w=(e,t)=>{let n=t.target.value;if(n.length>1||f===`number`&&n&&!/^\d$/.test(n)||g&&n&&!new RegExp(g).test(n))return;let r=[...b];r[e]=n,x(r);let i=r.join(``);u?.({target:{value:i}}),n&&e<s-1&&C.current[e+1]?.focus(),r.every(e=>e!==``)&&d&&d(i)},T=(e,t)=>{if(t.key===`Backspace`){if(!b[e]&&e>0){let t=[...b];t[e-1]=``,x(t),C.current[e-1]?.focus(),u?.({target:{value:t.join(``)}})}else if(b[e]){let t=[...b];t[e]=``,x(t),u?.({target:{value:t.join(``)}})}}else t.key===`ArrowLeft`&&e>0?C.current[e-1]?.focus():t.key===`ArrowRight`&&e<s-1?C.current[e+1]?.focus():t.key===`Enter`&&(t.preventDefault(),b.every(e=>e!==``)&&d&&d(b.join(``)))},E=e=>{e.preventDefault();let t=e.clipboardData.getData(`text`).slice(0,s),n=``;Array.from(t).forEach(e=>{f===`number`&&!/^\d$/.test(e)||g&&!new RegExp(g).test(e)||(n+=e)});let r=Array(s).fill(``);for(let e=0;e<Math.min(n.length,s);e+=1)r[e]=n[e];x(r),u?.({target:{value:r.join(``)}});let i=r.findIndex(e=>e===``),a=i===-1?s-1:i;C.current[a]?.focus(),r.every(e=>e!==``)&&d&&d(r.join(``))};return(0,X.jsxs)(Le,{error:t,helperText:o,className:S(l(r(`otp-field`)),n),helperTextAlign:`center`,style:m,children:[e&&(0,X.jsx)(ze,{required:i,error:!!t,children:e}),(0,X.jsx)(`div`,{className:S(l(r(`otp-field`,`input-container`)),y.inputContainer),children:Array.from({length:s},(n,o)=>(0,X.jsx)(`input`,{ref:e=>{e&&(C.current[o]=e)},type:f===`password`?`password`:`text`,inputMode:f===`number`?`numeric`:`text`,value:b[o]||``,onChange:e=>w(o,e),onKeyDown:e=>T(o,e),onPaste:E,className:S(l(r(`otp-field`,`input`)),y.input,{[l(r(`otp-field`,`input`,`error`))]:!!t,[y.inputError]:!!t,[l(r(`otp-field`,`input`,`disabled`))]:!!a,[y.inputDisabled]:!!a}),maxLength:1,placeholder:p,disabled:a,"aria-label":`${e||`OTP`} digit ${o+1}`,"aria-invalid":!!t,"aria-required":i,autoComplete:`one-time-code`},o))})]})},pt=e=>(0,X.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,X.jsx)(`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`}),(0,X.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]}),mt=e=>(0,X.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,X.jsx)(`path`,{d:`M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`}),(0,X.jsx)(`path`,{d:`M14.084 14.158a3 3 0 0 1-4.242-4.242`}),(0,X.jsx)(`path`,{d:`M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`}),(0,X.jsx)(`path`,{d:`m2 2 20 20`})]}),ht=(e,t,n,r,i,a)=>(0,Y.useMemo)(()=>{let t=i?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,o=a?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,s=w`
      position: relative;
      display: flex;
      align-items: center;
    `,c=w`
      width: 100%;
      padding-block: ${e.vars.spacing.unit};
      padding-inline-start: ${t};
      padding-inline-end: ${o};
      border: 1px solid ${r?e.vars.colors.error.main:e.vars.colors.border};
      border-radius: ${e.vars.components?.Field?.root?.borderRadius||e.vars.borderRadius.medium};
      font-size: ${e.vars.typography.fontSizes.md};
      font-family: ${e.vars.typography.fontFamily};
      color: ${e.vars.colors.text.primary};
      background-color: ${n?e.vars.colors.background.disabled:e.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        border-color: ${r?e.vars.colors.error.main:e.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${r?`${e.vars.colors.error.main}20`:`${e.vars.colors.primary.main}20`};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        border-color: ${r?e.vars.colors.error.main:e.vars.colors.primary.main};
      }

      &::placeholder {
        color: ${e.vars.colors.text.secondary};
        opacity: 0.7;
      }
    `,l=w`
      border-color: ${e.vars.colors.error.main};

      &:focus {
        border-color: ${e.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${e.vars.colors.error.main};
      }
    `,u=w`
      background-color: ${e.vars.colors.background.disabled};
      opacity: 0.6;
      cursor: not-allowed;
    `,d=w`
      position: absolute;
      background: none;
      border: none;
      cursor: ${n?`not-allowed`:`pointer`};
      padding: calc(${e.vars.spacing.unit} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${e.vars.colors.text.secondary};
      opacity: ${n?.5:1};
      top: 50%;
      transform: translateY(-50%);
      transition:
        color 0.2s ease,
        opacity 0.2s ease;

      &:hover:not(:disabled) {
        color: ${e.vars.colors.text.primary};
      }

      &:focus {
        outline: 2px solid ${e.vars.colors.primary.main};
        outline-offset: 2px;
      }
    `,f=w`
      ${d};
      inset-inline-start: ${e.vars.spacing.unit};
    `;return{endIcon:w`
      ${d};
      inset-inline-end: ${e.vars.spacing.unit};
    `,icon:d,input:c,inputContainer:s,inputDisabled:u,inputError:l,startIcon:f}},[e,t,n,r,i,a]),gt=({label:e,error:t,required:n,className:i,disabled:a,helperText:o,startIcon:s,endIcon:c,onStartIconClick:u,onEndIconClick:d,type:f=`text`,style:p={},...m})=>{let{theme:h,colorScheme:g}=q(),_=!!t,v=ht(h,g,a??!1,_,!!s,!!c),y=S(l(r(`text-field`,`input`)),v.input,_&&v.inputError,a&&v.inputDisabled),b=S(l(r(`text-field`,`container`)),v.inputContainer),x=S(l(r(`text-field`,`start-icon`)),v.startIcon),C=S(l(r(`text-field`,`end-icon`)),v.endIcon);return(0,X.jsxs)(Le,{error:t,helperText:o,className:S(l(r(`text-field`)),i),style:p,children:[e&&(0,X.jsx)(ze,{required:n,error:_,children:e}),(0,X.jsxs)(`div`,{className:b,children:[s&&(0,X.jsx)(`div`,{className:x,onClick:u,role:u?`button`:void 0,tabIndex:u&&!a?0:void 0,"aria-label":`Start icon`,children:s}),(0,X.jsx)(`input`,{className:y,type:f,disabled:a,"aria-invalid":_,"aria-required":n,...m}),c&&(0,X.jsx)(`div`,{className:C,onClick:d,role:d?`button`:void 0,tabIndex:d&&!a?0:void 0,"aria-label":`End icon`,children:c})]})]})},_t=(e,t,n,r,i)=>(0,Y.useMemo)(()=>{let t=w`
      cursor: ${r?`not-allowed`:`pointer`};
      color: ${e.vars.colors.text.secondary};
      opacity: ${r?.6:1};
      transition: color 0.2s ease;

      &:hover {
        color: ${r?e.vars.colors.text.secondary:e.vars.colors.text.primary};
      }
    `,n=w`
      color: ${e.vars.colors.primary.main};
    `;return{hiddenIcon:w`
      color: ${e.vars.colors.text.secondary};
    `,toggleIcon:t,visibleIcon:n}},[e,t,n,r,i]),vt=({onChange:e,className:t,disabled:n,error:i,...a})=>{let{theme:o,colorScheme:s}=q(),[c,u]=(0,Y.useState)(!1),d=_t(o,s,c,!!n,!!i),f=()=>{n||u(!c)},p=c?mt:pt;return(0,X.jsx)(gt,{...a,className:S(l(r(`password-field`)),t),type:c?`text`:`password`,onChange:t=>e(t.target.value),autoComplete:`current-password`,disabled:n,error:i,endIcon:(0,X.jsx)(p,{width:16,height:16,className:S(l(r(`password-field`,`toggle-icon`)),d.toggleIcon,c?d.visibleIcon:d.hiddenIcon)}),onEndIconClick:f})},yt=(e,t,n,r)=>(0,Y.useMemo)(()=>{let t=`data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${e.colors.text.secondary.replace(`#`,``)}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`,i=w`
      width: 100%;
      padding: ${e.vars.spacing.unit} calc(${e.vars.spacing.unit} * 1.5);
      border: 1px solid ${r?e.vars.colors.error.main:e.vars.colors.border};
      border-radius: ${e.vars.components?.Field?.root?.borderRadius||e.vars.borderRadius.medium};
      font-size: ${e.vars.typography.fontSizes.md};
      font-family: ${e.vars.typography.fontFamily};
      color: ${e.vars.colors.text.primary};
      background-color: ${n?e.vars.colors.background.disabled:e.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
      appearance: none;
      background-image: url('${t}');
      background-repeat: no-repeat;
      background-position: right 0.7em top 50%;
      background-size: 0.65em auto;
      cursor: ${n?`not-allowed`:`pointer`};

      &:focus {
        border-color: ${r?e.vars.colors.error.main:e.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${r?`${e.vars.colors.error.main}20`:`${e.vars.colors.primary.main}20`};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        border-color: ${r?e.vars.colors.error.main:e.vars.colors.primary.main};
      }
    `,a=w`
      border-color: ${e.vars.colors.error.main};

      &:focus {
        border-color: ${e.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${e.vars.colors.error.main};
      }
    `,o=w`
      background-color: ${e.vars.colors.background.disabled};
      opacity: 0.6;
      cursor: not-allowed;
    `;return{option:w`
      padding: calc(${e.vars.spacing.unit} / 2) ${e.vars.spacing.unit};
      color: ${e.vars.colors.text.primary};
      background-color: ${e.vars.colors.background.surface};

      &:hover {
        background-color: ${e.vars.colors.action.hover};
      }

      &:checked {
        background-color: ${e.vars.colors.primary.main};
        color: ${e.vars.colors.primary.contrastText};
      }
    `,select:i,selectDisabled:o,selectError:a}},[e,t,n,r]),bt=({label:e,error:t,className:n,required:i,disabled:a,helperText:o,placeholder:s,options:c,style:u={},...d})=>{let{theme:f,colorScheme:p}=q(),m=!!t,h=yt(f,p,a??!1,m),g=S(l(r(`select`,`input`)),h.select,m&&h.selectError,a&&h.selectDisabled);return(0,X.jsxs)(Le,{error:t,helperText:o,className:S(l(r(`select`)),n),style:u,children:[e&&(0,X.jsx)(ze,{required:i,error:m,children:e}),(0,X.jsxs)(`select`,{className:g,disabled:a,"aria-invalid":m,"aria-required":i,...d,children:[s&&(0,X.jsx)(`option`,{value:``,disabled:!0,children:s}),c.map(e=>(0,X.jsx)(`option`,{value:e.value,className:h.option,children:e.label},e.value))]})]})},xt=(e,t,n=!1,r=!1)=>{if(n&&r&&(!e||e.trim()===``))return`This field is required`;if(!e||e.trim()===``)return null;switch(t){case y.Number:{let t=parseInt(e,10);if(Number.isNaN(t))return`Please enter a valid number`;break}default:break}return null},St=e=>{let{name:t,type:n,label:r,required:i,value:a,onChange:o,onBlur:s,disabled:c=!1,error:l,className:u,options:d=[],touched:f=!1,placeholder:p}=e,m=l||xt(a,n,i,f),h={className:u,"data-testid":`thunderid-signin-${t}`,disabled:c,error:m,label:r,name:t,onBlur:s,placeholder:p,required:i,value:a};switch(n){case y.Password:return(0,X.jsx)(vt,{...h,onChange:o});case y.Text:return(0,X.jsx)(gt,{...h,type:`text`,onChange:e=>o(e.target.value),autoComplete:`off`});case y.Email:return(0,X.jsx)(gt,{...h,type:`email`,onChange:e=>o(e.target.value),autoComplete:`email`});case y.Tel:return(0,X.jsx)(gt,{...h,type:`tel`,onChange:e=>o(e.target.value),autoComplete:`tel`});case y.Date:return(0,X.jsx)(ut,{...h,onChange:e=>o(e.target.value)});case y.Checkbox:{let e=a===`true`||a===!0;return(0,X.jsx)(ct,{...h,checked:e,onChange:e=>o(e.target.checked.toString())})}case y.Otp:return(0,X.jsx)(ft,{...h,onChange:e=>o(e.target.value)});case y.Number:return(0,X.jsx)(gt,{...h,type:`number`,onChange:e=>o(e.target.value),helperText:`Enter a numeric value`});case y.Select:{let e=d.length>0?d:[];return e.length>0?(0,X.jsx)(bt,{...h,options:e,onChange:e=>o(e.target.value),helperText:`Select from available options`}):(0,X.jsx)(gt,{...h,type:`text`,onChange:e=>o(e.target.value),helperText:`Enter multiple values separated by commas (e.g., value1, value2, value3)`,placeholder:`value1, value2, value3`})}default:return(0,X.jsx)(gt,{...h,type:`text`,onChange:e=>o(e.target.value),helperText:`Unknown field type, treating as text`})}},Ct=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=et(t?.i18n);return(0,X.jsx)(ot,{...r,fullWidth:!0,type:`button`,color:`primary`,variant:`solid`,disabled:e,startIcon:(0,X.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 512 512`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,X.jsx)(`path`,{fill:`#1976D2`,d:`M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z`}),(0,X.jsx)(`path`,{fill:`#FAFAFA`,d:`M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64v176h96V336h48L432,256z`})]}),children:n??i(`elements.buttons.facebook.text`)})},wt=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=et(t?.i18n);return(0,X.jsx)(ot,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,X.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 66.233`,xmlns:`http://www.w3.org/2000/svg`,children:(0,X.jsx)(`g`,{transform:`translate(-386.96 658.072)`,children:(0,X.jsx)(`path`,{d:`M420.915-658.072a33.956,33.956,0,0,0-33.955,33.955,33.963,33.963,0,0,0,23.221,32.22c1.7.314,2.32-.737,2.32-1.633,0-.81-.031-3.484-.046-6.322-9.446,2.054-11.44-4.006-11.44-4.006-1.545-3.925-3.77-4.968-3.77-4.968-3.081-2.107.232-2.064.232-2.064,3.41.239,5.205,3.5,5.205,3.5,3.028,5.19,7.943,3.69,9.881,2.822a7.23,7.23,0,0,1,2.156-4.54c-7.542-.859-15.47-3.77-15.47-16.781a13.141,13.141,0,0,1,3.5-9.114,12.2,12.2,0,0,1,.329-8.986s2.851-.913,9.34,3.48a32.545,32.545,0,0,1,8.5-1.143,32.629,32.629,0,0,1,8.506,1.143c6.481-4.393,9.328-3.48,9.328-3.48a12.185,12.185,0,0,1,.333,8.986,13.115,13.115,0,0,1,3.495,9.114c0,13.042-7.943,15.913-15.5,16.754,1.218,1.054,2.3,3.12,2.3,6.288,0,4.543-.039,8.2-.039,9.318,0,.9.611,1.962,2.332,1.629a33.959,33.959,0,0,0,23.2-32.215,33.955,33.955,0,0,0-33.955-33.955`,fill:`#ffffff`})})}),children:n??i(`elements.buttons.github.text`)})},Tt=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=et(t?.i18n);return(0,X.jsx)(ot,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,X.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 67.901`,xmlns:`http://www.w3.org/2000/svg`,children:(0,X.jsxs)(`g`,{transform:`translate(-0.001 -0.001)`,children:[(0,X.jsx)(`path`,{d:`M15.049,160.965l-2.364,8.824-8.639.183a34.011,34.011,0,0,1-.25-31.7h0l7.691,1.41,3.369,7.645a20.262,20.262,0,0,0,.19,13.642Z`,transform:`translate(0 -119.93)`,fill:`#fbbb00`}),(0,X.jsx)(`path`,{d:`M294.24,208.176A33.939,33.939,0,0,1,282.137,241h0l-9.687-.494-1.371-8.559a20.235,20.235,0,0,0,8.706-10.333H261.628V208.176Z`,transform:`translate(-226.93 -180.567)`,fill:`#518ef8`}),(0,X.jsx)(`path`,{d:`M81.668,328.8h0a33.962,33.962,0,0,1-51.161-10.387l11-9.006a20.192,20.192,0,0,0,29.1,10.338Z`,transform:`translate(-26.463 -268.374)`,fill:`#28b446`}),(0,X.jsx)(`path`,{d:`M80.451,7.816l-11,9A20.19,20.19,0,0,0,39.686,27.393l-11.06-9.055h0A33.959,33.959,0,0,1,80.451,7.816Z`,transform:`translate(-24.828)`,fill:`#f14336`})]})}),children:n??i(`elements.buttons.google.text`)})},Et=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=et(t?.i18n);return(0,X.jsx)(ot,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,X.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,X.jsx)(`path`,{fill:`#0077B5`,d:`M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z`})}),children:n??i(`elements.buttons.linkedin.text`)})},Dt=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=et(t?.i18n);return(0,X.jsx)(ot,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,X.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 23 23`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,X.jsx)(`path`,{fill:`#f3f3f3`,d:`M0 0h23v23H0z`}),(0,X.jsx)(`path`,{fill:`#f35325`,d:`M1 1h10v10H1z`}),(0,X.jsx)(`path`,{fill:`#81bc06`,d:`M12 1h10v10H12z`}),(0,X.jsx)(`path`,{fill:`#05a6f0`,d:`M1 12h10v10H1z`}),(0,X.jsx)(`path`,{fill:`#ffba08`,d:`M12 12h10v10H12z`})]}),children:n??i(`elements.buttons.microsoft.text`)})},Ot=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=et(t?.i18n);return(0,X.jsx)(ot,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,X.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,X.jsx)(`path`,{fill:`#627EEA`,d:`M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z`})}),children:n??i(`elements.buttons.ethereum.text`)})},kt=e=>(0,X.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,X.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,X.jsx)(`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`}),(0,X.jsx)(`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`})]}),At=e=>(0,X.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,X.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,X.jsx)(`path`,{d:`m9 12 2 2 4-4`})]}),jt=e=>(0,X.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,X.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,X.jsx)(`path`,{d:`M12 16v-4`}),(0,X.jsx)(`path`,{d:`M12 8h.01`})]}),Mt=e=>(0,X.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,X.jsx)(`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`}),(0,X.jsx)(`path`,{d:`M12 9v4`}),(0,X.jsx)(`path`,{d:`M12 17h.01`})]}),Nt=(e,t,n)=>(0,Y.useMemo)(()=>{let t=w`
      padding: calc(${e.vars.spacing.unit} * 2);
      border-radius: ${e.vars.borderRadius.medium};
      border: 1px solid;
      font-family: ${e.vars.typography.fontFamily};
      display: flex;
      gap: calc(${e.vars.spacing.unit} * 1.5);
      align-items: flex-start;
    `,r={error:w`
        background-color: color-mix(in srgb, ${e.vars.colors.error.main} 20%, white);
        border-color: ${e.vars.colors.error.main};
        color: ${e.vars.colors.error.main};
      `,info:w`
        background-color: color-mix(in srgb, ${e.vars.colors.info.main} 20%, white);
        border-color: ${e.vars.colors.info.main};
        color: ${e.vars.colors.info.main};
      `,success:w`
        background-color: color-mix(in srgb, ${e.vars.colors.success.main} 20%, white);
        border-color: ${e.vars.colors.success.main};
        color: ${e.vars.colors.success.main};
      `,warning:w`
        background-color: color-mix(in srgb, ${e.vars.colors.warning.main} 20%, white);
        border-color: ${e.vars.colors.warning.main};
        color: ${e.vars.colors.warning.main};
      `},i=w`
      flex-shrink: 0;
      margin-top: calc(${e.vars.spacing.unit} * 0.25);
      width: calc(${e.vars.spacing.unit} * 2.5);
      height: calc(${e.vars.spacing.unit} * 2.5);
      color: ${e.vars.colors[n]?.contrastText};
    `,a=w`
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${e.vars.spacing.unit};
    `,o=w`
      margin: 0;
      font-size: ${e.vars.typography.fontSizes.sm};
      font-weight: 600;
      line-height: 1.4;
      color: ${e.vars.colors[n]?.contrastText};
    `;return{alert:t,content:a,description:w`
      margin: 0;
      font-size: ${e.vars.typography.fontSizes.sm};
      line-height: 1.4;
      color: ${e.vars.colors.text.secondary};
    `,icon:i,title:o,variant:r[n]}},[e,t,n]),Pt=e=>{switch(e){case`success`:return At;case`error`:return kt;case`warning`:return Mt;case`info`:return jt;default:return jt}},Ft=(0,Y.createContext)(`info`),It=()=>(0,Y.useContext)(Ft),Lt=(0,Y.forwardRef)(({variant:e=`info`,showIcon:t=!0,children:n,className:i,style:a,...o},s)=>{let{theme:c,colorScheme:u}=q(),d=Nt(c,u,e),f=Pt(e);return(0,X.jsx)(Ft.Provider,{value:e,children:(0,X.jsxs)(`div`,{ref:s,role:`alert`,style:a,className:S(l(r(`alert`)),d.alert,d.variant,l(r(`alert`,null,e)),i),...o,children:[t&&(0,X.jsx)(`div`,{className:S(l(r(`alert`,`icon`)),d.icon),children:(0,X.jsx)(f,{})}),(0,X.jsx)(`div`,{className:S(l(r(`alert`,`content`)),d.content),children:n})]})})}),Rt=({children:e,className:t,style:n,...i})=>{let{theme:a,colorScheme:o}=q(),s=Nt(a,o,It()),{color:c,...u}=i;return(0,X.jsx)(Ie,{component:`h3`,variant:`h6`,fontWeight:600,style:n,className:S(l(r(`alert`,`title`)),s.title,t),...u,children:e})},zt=({children:e,className:t,style:n,...i})=>{let{theme:a,colorScheme:o}=q(),s=Nt(a,o,It()),{color:c,...u}=i;return(0,X.jsx)(Ie,{component:`p`,variant:`body2`,style:n,className:S(l(r(`alert`,`description`)),s.description,t),...u,children:e})};Lt.displayName=`Alert`,Rt.displayName=`Alert.Title`,zt.displayName=`Alert.Description`,Lt.Title=Rt,Lt.Description=zt;var Bt=Lt,Vt=(e,t,n,r)=>(0,Y.useMemo)(()=>{let t=w`
      border-radius: ${e.vars.borderRadius.medium};
      background-color: ${e.vars.colors.background.surface};
      font-family: ${e.vars.typography.fontFamily};
      transition: all 0.2s ease-in-out;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: calc(${e.vars.spacing.unit} * 2);
    `,i={default:w`
        /* Base styles only */
      `,elevated:w`
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: none;
      `,outlined:w`
        border: 1px solid ${e.vars.colors.border};
      `},a=w`
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `,o=w`
      padding: 0 calc(${e.vars.spacing.unit} * 2);
      margin-top: calc(${e.vars.spacing.unit} * 2);
      display: flex;
      flex-direction: column;
      gap: ${e.vars.spacing.unit};
    `,s=w`
      margin: 0;
      /* Typography component will handle color, fontSize, fontWeight, lineHeight */
    `,c=w`
      margin: 0;
      color: ${e.vars.colors.text.secondary};
      font-size: ${e.vars.typography.fontSizes.sm};
      line-height: 1.5;
    `,l=w`
      margin-top: ${e.vars.spacing.unit};
    `,u=w`
      padding: 0 calc(${e.vars.spacing.unit} * 2);
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
      flex: 1;
    `,d=w`
      padding: 0 calc(${e.vars.spacing.unit} * 2) calc(${e.vars.spacing.unit} * 2);
      display: flex;
      align-items: center;
      gap: ${e.vars.spacing.unit};
    `;return{action:l,card:t,clickable:r?a:``,content:u,description:c,footer:d,header:o,title:s,variant:i[n]}},[e,t,n,r]),Ht=(0,Y.forwardRef)(({variant:e=`default`,clickable:t=!1,children:n,className:i,style:a,...o},s)=>{let{theme:c,colorScheme:u}=q(),d=Vt(c,u,e,t);return(0,X.jsx)(`div`,{ref:s,style:a,className:S(l(r(`card`)),d.card,d.variant,d.clickable,l(r(`card`,null,e)),{[l(r(`card`,null,`clickable`))]:t},i),...o,children:n})}),Ut=(0,Y.forwardRef)(({children:e,className:t,style:n,...i},a)=>{let{theme:o,colorScheme:s}=q(),c=Vt(o,s,`default`,!1);return(0,X.jsx)(`div`,{ref:a,style:n,className:S(l(r(`card`,`header`)),c.header,t),...i,children:e})}),Wt=({children:e,level:t=3,className:n,style:i,...a})=>{let{theme:o,colorScheme:s}=q(),c=Vt(o,s,`default`,!1),u=e=>{switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}},d=e=>{switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}},{color:f,...p}=a;return(0,X.jsx)(Ie,{component:d(t),variant:u(t),style:i,className:S(l(r(`card`,`title`)),c.title,n),fontWeight:600,...p,children:e})},Gt=({children:e,className:t,style:n,...i})=>{let{theme:a,colorScheme:o}=q(),s=Vt(a,o,`default`,!1),{color:c,...u}=i;return(0,X.jsx)(Ie,{component:`p`,variant:`body2`,color:`textSecondary`,style:n,className:S(l(r(`card`,`description`)),s.description,t),...u,children:e})},Kt=(0,Y.forwardRef)(({children:e,className:t,style:n,...i},a)=>{let{theme:o,colorScheme:s}=q(),c=Vt(o,s,`default`,!1);return(0,X.jsx)(`div`,{ref:a,style:n,className:S(l(r(`card`,`action`)),c.action,t),...i,children:e})}),qt=(0,Y.forwardRef)(({children:e,className:t,style:n,...i},a)=>{let{theme:o,colorScheme:s}=q(),c=Vt(o,s,`default`,!1);return(0,X.jsx)(`div`,{ref:a,style:n,className:S(l(r(`card`,`content`)),c.content,t),...i,children:e})}),Jt=(0,Y.forwardRef)(({children:e,className:t,style:n,...i},a)=>{let{theme:o,colorScheme:s}=q(),c=Vt(o,s,`default`,!1);return(0,X.jsx)(`div`,{ref:a,style:n,className:S(l(r(`card`,`footer`)),c.footer,t),...i,children:e})});Ht.displayName=`Card`,Ut.displayName=`Card.Header`,Wt.displayName=`Card.Title`,Gt.displayName=`Card.Description`,Kt.displayName=`Card.Action`,qt.displayName=`Card.Content`,Jt.displayName=`Card.Footer`,Ht.Header=Ut,Ht.Title=Wt,Ht.Description=Gt,Ht.Action=Kt,Ht.Content=qt,Ht.Footer=Jt;var Yt=Ht,Xt=e=>(0,Y.useMemo)(()=>{let t=w`
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      border: 1px solid ${e.vars.colors.border};
      border-radius: ${e.vars.borderRadius.medium};
      font-family: ${e.vars.typography.fontFamily};
    `,n=w`
      display: flex;
      align-items: center;
      padding: calc(${e.vars.spacing.unit} * 1) calc(${e.vars.spacing.unit} * 1.5);
      cursor: pointer;
      user-select: none;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: ${e.vars.colors.action.hover};
      }
    `,r=w`
      background-color: ${e.vars.colors.action.selected};

      &:hover {
        background-color: ${e.vars.colors.action.selected};
      }
    `,i=w`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      margin-right: calc(${e.vars.spacing.unit} * 0.5);
      color: ${e.vars.colors.text.secondary};
      font-size: 12px;
      flex-shrink: 0;
    `,a=w`
      width: 20px;
      height: 20px;
      margin-right: calc(${e.vars.spacing.unit} * 0.5);
      flex-shrink: 0;
    `,o=w`
      font-size: 14px;
      color: ${e.vars.colors.text.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;return{container:t,loadMoreButton:w`
      display: flex;
      align-items: center;
      padding: calc(${e.vars.spacing.unit} * 0.75) calc(${e.vars.spacing.unit} * 1.5);
      border: none;
      background: none;
      cursor: pointer;
      color: ${e.vars.colors.primary.main};
      font-size: 13px;
      font-family: ${e.vars.typography.fontFamily};

      &:hover {
        text-decoration: underline;
      }
    `,loadingPlaceholder:w`
      display: flex;
      align-items: center;
      padding: calc(${e.vars.spacing.unit} * 1) calc(${e.vars.spacing.unit} * 1.5);
      gap: calc(${e.vars.spacing.unit} * 1);
    `,node:n,nodeName:o,nodeSelected:r,skeleton:w`
      height: 14px;
      border-radius: ${e.vars.borderRadius.small};
      background-color: ${e.vars.colors.background.disabled};
      animation: pulse 1.5s ease-in-out infinite;

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }
    `,toggleButton:i,togglePlaceholder:a}},[e.vars.colors.action.hover,e.vars.colors.action.selected,e.vars.colors.background.disabled,e.vars.colors.border,e.vars.colors.primary.main,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.medium,e.vars.borderRadius.small,e.vars.spacing.unit,e.vars.typography.fontFamily]),Zt=({rootOuId:e,selectedOuId:t,onSelect:n,fetchChildren:r,pageSize:i=10,className:a})=>{let{theme:o}=q(),s=Xt(o),[c,l]=(0,Y.useState)({}),u=(0,Y.useCallback)(async(e,t=0)=>{l(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!0}}));try{let n=await r(e,i,t),a=n.organizationUnits||[];l(r=>{let i=r[e]||{children:[],expanded:!0,hasMore:!1,loading:!1,offset:0,totalResults:0},o=t===0?a:[...i.children,...a],s=t+a.length;return{...r,[e]:{children:o,expanded:!0,hasMore:s<n.totalResults,loading:!1,offset:s,totalResults:n.totalResults}}})}catch{l(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!1}}))}},[r,i]);(0,Y.useEffect)(()=>{e&&!c[e]&&u(e)},[e,u,c]);let d=(0,Y.useCallback)(e=>{let t=c[e];t?.expanded?l(t=>({...t,[e]:{...t[e],expanded:!1}})):t?.children.length?l(t=>({...t,[e]:{...t[e],expanded:!0}})):u(e)},[c,u]),f=(0,Y.useCallback)(e=>{let t=c[e];t&&u(e,t.offset)},[c,u]),p=e=>(0,X.jsx)(X.Fragment,{children:[0,1,2].map(t=>(0,X.jsx)(`div`,{className:s.loadingPlaceholder,style:{paddingLeft:`${(e+1)*20}px`},children:(0,X.jsx)(`div`,{className:s.skeleton,style:{width:`${100-t*20}px`}})},`skeleton-${t}`))}),m=(e,r=0)=>{let i=c[e.id],a=t===e.id,o=i?.expanded||!1,l=i?.loading||!1,u=!i||i.totalResults>0||i.children.length>0;return(0,X.jsxs)(Y.Fragment,{children:[(0,X.jsxs)(`div`,{className:S(s.node,a&&s.nodeSelected),style:{paddingLeft:`${r*20+12}px`},role:`treeitem`,"aria-selected":a,"aria-expanded":u?o:void 0,onClick:()=>n(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),n(e.id))},tabIndex:0,children:[u?(0,X.jsx)(`button`,{className:s.toggleButton,onClick:t=>{t.stopPropagation(),d(e.id)},"aria-label":o?`Collapse`:`Expand`,type:`button`,children:o?`▾`:`▸`}):(0,X.jsx)(`span`,{className:s.togglePlaceholder}),(0,X.jsx)(`span`,{className:s.nodeName,children:e.name})]}),o&&l&&!i?.children.length&&p(r),o&&i?.children.map(e=>m(e,r+1)),o&&i?.hasMore&&(0,X.jsx)(`button`,{className:s.loadMoreButton,style:{paddingLeft:`${(r+1)*20+12}px`},onClick:()=>f(e.id),disabled:l,type:`button`,children:l?`Loading...`:`Load more`})]},e.id)},h=c[e],g=h?.loading&&!h?.children.length;return(0,X.jsxs)(`div`,{className:S(s.container,a),role:`tree`,"aria-label":`Organization unit picker`,children:[g&&p(0),h?.children.map(e=>m(e,0)),h?.hasMore&&(0,X.jsx)(`button`,{className:s.loadMoreButton,onClick:()=>f(e),disabled:h?.loading,type:`button`,children:h?.loading?`Loading...`:`Load more`})]})},Qt=(e,t,n=[`label`,`placeholder`,`text`,`title`,`subtitle`],r)=>{let i={...e};return n.forEach(e=>{i[e]&&typeof i[e]==`string`&&(i[e]=h(i[e],{meta:r,t}))}),i},$t=(e,t,n,r)=>e.map(e=>{let i=Qt(e,t,n,r);return i.components&&Array.isArray(i.components)&&(i.components=$t(i.components,t,n,r)),i}),en=$t,tn=e=>{let t=new Map;return e?.data?.inputs&&Array.isArray(e.data.inputs)&&e.data.inputs.forEach(e=>{e.ref&&e.identifier&&t.set(e.ref,e.identifier)}),t},nn=e=>{let t=new Map;return e?.data?.actions&&Array.isArray(e.data.actions)&&e.data.actions.forEach(e=>{e.ref&&e.nextNode&&t.set(e.ref,e.nextNode)}),t},rn=(e,t,n,r=[])=>e.map(e=>{let i={...e};if(i.ref&&t.has(i.ref)&&(i.ref=t.get(i.ref)),i.type===`SELECT`&&e.id){let t=r.find(t=>t.ref===e.id);t?.options&&(i.options=t.options.map(e=>{if(typeof e==`string`)return{label:e,value:e};let t=typeof e.value==`object`?JSON.stringify(e.value):String(e.value||``);return{label:typeof e.label==`object`?JSON.stringify(e.label):String(e.label||t),value:t}}))}return i.type===`ACTION`&&i.id&&n.has(i.id)&&(i.actionRef=n.get(i.id)),i.components&&Array.isArray(i.components)&&(i.components=rn(i.components,t,n,r)),i}),an=(e,t,n=!0,r)=>{if(!e?.data?.meta?.components)return[];let{components:i}=e.data.meta,a=tn(e),o=nn(e),s=e?.data?.inputs||[];return(a.size>0||o.size>0||s.length>0)&&(i=rn(i,a,o,s)),n?en(i,t,void 0,r):i},on=(e,t,n=`errors.flow.generic`)=>{if(e&&typeof e==`object`&&e.error){let n=e.error;if(n?.message?.key){let e=t(n.message.key);if(e&&e!==n.message.key)return e;let r=`system.${n.message.key}`,i=t(r);if(i&&i!==r)return i}let r=n?.message?.defaultValue??n?.description?.defaultValue;if(r)return r}return e&&typeof e==`object`&&e.failureReason?e.failureReason:e instanceof Error&&e.message?e.message:t(n)},sn=(e,t,n=`errors.flow.generic`)=>e?.flowStatus===`ERROR`?on(e,t,n):null,cn=(e,t,n={},r)=>{let{throwOnError:i=!0,defaultErrorKey:a=`errors.flow.generic`,resolveTranslations:o=!0}=n;if(sn(e,t,a)&&i)throw e;let s=e?.data?.additionalData??{};if(typeof s.consentPrompt==`string`)try{let e=JSON.parse(s.consentPrompt);s.consentPrompt={purposes:Array.isArray(e)?e:[]}}catch{}return{additionalData:s,components:an(e,t,o,r),executionId:e.executionId}},ln=`4em`,un=({component:e})=>{let{theme:t}=q(),n=e.config||{},r=n.src||``,i=n.alt||n.label||`Image`,a=n.width||`100%`,o=n.height||`auto`,l=e.variant?.toLowerCase()||`image_block`,u={borderRadius:t.vars.borderRadius.small,display:`block`,margin:l===`image_block`?`1rem auto`:`0`};if(!r)return null;if(c(r)){let t=e=>/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,n=t(a),c=t(o),l=e=>e!==`auto`&&!e.endsWith(`%`),d;return d=l(c)?c:l(n)?n:ln,(0,X.jsx)(`div`,{style:{textAlign:`center`},children:(0,X.jsx)(`span`,{style:{...u,containerType:`size`,display:`inline-grid`,height:d,placeItems:`center`,width:n},children:(0,X.jsx)(`span`,{"aria-label":i,role:`img`,style:{fontSize:`100cqmin`,lineHeight:1},children:s(r)})})},e.id)}return(0,X.jsx)(`div`,{style:{textAlign:`center`},children:(0,X.jsx)(`img`,{src:r,alt:i,height:o,width:a,style:u,onError:e=>{e.currentTarget.style.display=`none`}})},e.id)},dn=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=et(t?.i18n);return(0,X.jsx)(ot,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,X.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,X.jsx)(`path`,{fill:`currentColor`,d:`M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z`})}),children:n??i(`elements.buttons.smsotp.text`)})},fn=e=>(0,Y.useMemo)(()=>({container:w`
        display: flex;
        flex-direction: column;
        gap: calc(${e.vars.spacing.unit} * 0.5);
        width: 100%;
      `,copyButton:w`
        flex-shrink: 0;
        white-space: nowrap;
      `,label:w`
        color: ${e.vars.colors.text.secondary};
        font-size: 0.875rem;
        font-weight: 500;
      `,valueBox:w`
        align-items: center;
        background-color: ${e.vars.colors.background.surface};
        border: 1px solid ${e.vars.colors.border};
        border-radius: ${e.vars.borderRadius.small};
        display: flex;
        gap: calc(${e.vars.spacing.unit} * 1);
        padding: calc(${e.vars.spacing.unit} * 0.75) calc(${e.vars.spacing.unit} * 1);
      `,valueText:w`
        color: ${e.vars.colors.text.primary};
        flex: 1;
        font-family: monospace;
        font-size: 0.85rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      `}),[e]),pn=({label:e,value:t})=>{let{theme:n}=q(),r=fn(n),{t:i}=et(),[a,o]=(0,Y.useState)(!1),s=(0,Y.useCallback)(async()=>{try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement(`textarea`);e.value=t,document.body.appendChild(e),e.select(),document.execCommand(`copy`),document.body.removeChild(e)}o(!0),setTimeout(()=>o(!1),3e3)},[t]);return(0,X.jsxs)(`div`,{className:r.container,children:[e&&(0,X.jsx)(`span`,{className:r.label,children:e}),(0,X.jsxs)(`div`,{className:r.valueBox,children:[(0,X.jsx)(`span`,{className:r.valueText,children:t}),(0,X.jsx)(ot,{variant:`outline`,size:`small`,className:r.copyButton,onClick:()=>{s().catch(()=>void 0)},children:i(a?`elements.display.copyable_text.copied`:`elements.display.copyable_text.copy`)})]})]})},mn=({color:e=`currentColor`,size:t=24})=>(0,X.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,X.jsx)(`path`,{d:`M8 3 4 7l4 4`}),(0,X.jsx)(`path`,{d:`M4 7h16`}),(0,X.jsx)(`path`,{d:`m16 21 4-4-4-4`}),(0,X.jsx)(`path`,{d:`M20 17H4`})]});mn.displayName=`ArrowLeftRight`;var hn=mn,gn=({color:e=`currentColor`,size:t=24})=>(0,X.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,X.jsx)(`path`,{d:`m16 3 4 4-4 4`}),(0,X.jsx)(`path`,{d:`M20 7H4`}),(0,X.jsx)(`path`,{d:`m8 21-4-4 4-4`}),(0,X.jsx)(`path`,{d:`M4 17h16`})]});gn.displayName=`ArrowRightLeft`;var _n={ArrowLeftRight:hn,ArrowRightLeft:gn},vn=n(`@thunderid/react`,`AuthOptionFactory`),yn=w`
  overflow-wrap: anywhere;
  & * {
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  & .rich-text-align-left {
    text-align: left;
  }
  & .rich-text-align-center {
    text-align: center;
  }
  & .rich-text-align-right {
    text-align: right;
  }
  & .rich-text-align-justify {
    text-align: justify;
  }
  & a,
  & .rich-text-link {
    text-decoration: underline;
  }
  & span[role='img'] {
    display: inline-block;
  }
`,bn=e=>{switch(e){case f.EmailInput:return y.Email;case f.PhoneInput:return y.Tel;case f.PasswordInput:return y.Password;case f.TextInput:default:return y.Text}},xn=e=>({BODY_1:`body1`,BODY_2:`body2`,BUTTON_TEXT:`button`,CAPTION:`caption`,HEADING_1:`h1`,HEADING_2:`h2`,HEADING_3:`h3`,HEADING_4:`h4`,HEADING_5:`h5`,HEADING_6:`h6`,OVERLINE:`overline`,SUBTITLE_1:`subtitle1`,SUBTITLE_2:`subtitle2`})[e]||`h3`,Sn=(e,t,n,r,i,a)=>{let o=`${r}_auth`,s=e===o||t===o;return n.toLowerCase().includes(r)?!0:i===`signup`?s||n.toLowerCase().includes(r):s},Cn=(e,t,n,r,i,a,o,s,c={})=>{let l=c._theme,u=c._customRenderers??{},p=c.key||e.id,g=u[e.id]??u[e.type];if(g)return g(e,{additionalData:c.additionalData,authType:s,formErrors:r,formValues:t,isFormValid:a,isLoading:i,meta:c.meta,onInputBlur:c.onInputBlur,onInputChange:o,onSubmit:c.onSubmit,touchedFields:n});let _=e=>!e||!c.t&&!c.meta?e||``:h(e,{meta:c.meta,t:c.t||(e=>e)});switch(e.type){case f.TextInput:case f.PasswordInput:case f.EmailInput:case f.PhoneInput:{let i=e.ref,a=t[i]||``,s=n[i]?r[i]:void 0,l=bn(e.type);return(0,Y.cloneElement)(St({className:c.inputClassName,error:s,label:_(e.label)||``,name:i,onBlur:()=>c.onInputBlur?.(i),onChange:e=>o(i,e),placeholder:_(e.placeholder)||``,required:e.required||!1,type:l,value:a}),{key:p})}case f.OtpInput:{let i=e.ref,a=t[i]||``,s=n[i]?r[i]:void 0;return(0,Y.cloneElement)(St({className:c.inputClassName,error:s,label:_(e.label)||``,name:i,onBlur:()=>c.onInputBlur?.(i),onChange:e=>o(i,e),placeholder:_(e.placeholder)||``,required:e.required||!1,type:y.Otp,value:a}),{key:p})}case f.Action:{let n=e.id,r=e.eventType||``,o=_(e.label),l=e.variant||``,u=r.toUpperCase()===d.Trigger,f=()=>{if(c.onSubmit){let n={};Object.keys(t).forEach(e=>{n[e]=t[e]});let i=c.additionalData?.consentPrompt;if(i&&r.toUpperCase()===d.Submit){let e=l.toLowerCase()!==`primary`,r={purposes:i.purposes.map(n=>({approved:!e,elements:[...n.essential.map(t=>({approved:!e,name:t.name})),...n.optional.map(r=>({approved:e?!1:t[Fe(n.purposeId,r.name)]!==`false`,name:r.name}))],purposeName:n.purposeName}))};n.consent_decisions=JSON.stringify(r)}c.onSubmit(e,n,u)}};if(Sn(n,r,o,`google`,s,l))return(0,X.jsx)(Tt,{onClick:f,className:c.buttonClassName},p);if(Sn(n,r,o,`github`,s,l))return(0,X.jsx)(wt,{onClick:f,className:c.buttonClassName},p);if(Sn(n,r,o,`facebook`,s,l))return(0,X.jsx)(Ct,{onClick:f,className:c.buttonClassName},p);if(Sn(n,r,o,`microsoft`,s,l))return(0,X.jsx)(Dt,{onClick:f,className:c.buttonClassName},p);if(Sn(n,r,o,`linkedin`,s,l))return(0,X.jsx)(Et,{onClick:f,className:c.buttonClassName},p);if(Sn(n,r,o,`ethereum`,s,l))return(0,X.jsx)(Ot,{onClick:f,className:c.buttonClassName},p);if(n===`prompt_mobile`||r===`prompt_mobile`)return(0,X.jsx)(dn,{onClick:f,className:c.buttonClassName},p);let m=e.startIcon?(0,X.jsx)(`img`,{src:e.startIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null,h=e.endIcon?(0,X.jsx)(`img`,{src:e.endIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null;return(0,X.jsx)(ot,{fullWidth:!0,onClick:f,disabled:i||!a&&!u||c.isTimeoutDisabled||e.config?.disabled,className:c.buttonClassName,"data-testid":`thunderid-signin-submit`,variant:e.variant?.toLowerCase()===`primary`?`solid`:`outline`,color:e.variant?.toLowerCase()===`primary`?`primary`:`secondary`,startIcon:m,endIcon:h,children:o||`Submit`},p)}case f.Text:return(0,X.jsx)(Ie,{variant:xn(e.variant),style:{marginBottom:2,textAlign:typeof e?.align==`string`?e.align:`left`},children:_(e.label)},p);case f.Divider:return(0,X.jsx)(Ve,{children:_(e.label)||``},p);case f.Select:{let i=e.ref,a=t[i]||``,s=n[i]?r[i]:void 0,l=(e.options||[]).map(e=>({label:typeof e==`string`?e:String(e.label??e.value??``),value:typeof e==`string`?e:String(e.value??``)}));return(0,X.jsx)(bt,{name:i,label:_(e.label)||``,placeholder:_(e.placeholder),required:e.required,options:l,value:a,error:s,onChange:e=>o(i,e.target.value),onBlur:()=>c.onInputBlur?.(i),className:c.inputClassName},p)}case f.OuSelect:{let n=e.ref??e.id,r=c.additionalData?.rootOuId;return!r||!c.fetchOrganizationUnitChildren?(vn.warn(`OU_SELECT requires additionalData.rootOuId and fetchOrganizationUnitChildren. Skipping render.`),null):(0,X.jsx)(Zt,{rootOuId:r,selectedOuId:t[n]||null,onSelect:e=>o(n,e),fetchChildren:c.fetchOrganizationUnitChildren},p)}case f.Block:if(e.components&&e.components.length>0){let u={display:`flex`,flexDirection:`column`,gap:`calc(${l?.vars?.spacing?.unit??`4px`} * 2)`},d=e.components.map((l,u)=>Cn(l,t,n,r,i,a,o,s,{...c,key:l.id||`${e.id}_${u}`})).filter(Boolean);return(0,X.jsx)(`form`,{id:e.id,style:u,children:d},p)}return null;case f.RichText:return(0,X.jsx)(`div`,{className:yn,dangerouslySetInnerHTML:{__html:Ue.sanitize(m(_(e.label)))}},p);case f.Image:{let t=_(e.height?.toString()),n=_(e.width?.toString());return(0,X.jsx)(un,{component:{config:{alt:_(e.alt)||_(e.label)||`Image`,height:t||(c.inStack?`50`:`auto`),src:_(e.src),width:n||(c.inStack?`50`:`100%`)}},formErrors:void 0,formValues:void 0,isFormValid:!1,isLoading:!1,onInputChange:()=>{throw Error(`Function not implemented.`)},touchedFields:void 0},p)}case f.Icon:{let t=e.name||``,n=_n[t];return n?(0,X.jsx)(n,{size:e.size||24,color:e.color||`currentColor`},p):(vn.warn(`Unknown icon name: "${t}". Skipping render.`),null)}case f.Stack:{let l=e.direction||`row`,u=e.gap??2,d=e.align||`center`,f=e.justify||`flex-start`;return(0,X.jsx)(`div`,{style:{alignItems:d,display:`flex`,flexDirection:l,flexWrap:`wrap`,gap:`${u*.5}rem`,justifyContent:f},children:e.components?e.components.map((l,u)=>Cn(l,t,n,r,i,a,o,s,{...c,inStack:!0,key:l.id||`${e.id}_${u}`})):[]},p)}case f.Consent:{let e=c.additionalData?.consentPrompt;return(0,X.jsx)(Re,{consentData:e,formValues:t,onInputChange:o},p)}case f.Timer:{let t=_(e.label)||`Time remaining: {time}`,n=Number(c.additionalData?.stepTimeout)||0;return(0,X.jsx)(He,{expiresIn:n>0?Math.max(0,Math.floor((n-Date.now())/1e3)):0,textTemplate:t},p)}case f.CopyableText:{let t=e.source,n=t&&c.additionalData?String(c.additionalData[t]??``):``;return(0,X.jsx)(pn,{label:_(e.label)||void 0,value:n},p)}default:return vn.warn(`Unsupported component type: ${e.type}. Skipping render.`),null}},wn=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>Cn(e,t,n,r,i,a,o,`signup`,{...s,key:e.id||c})).filter(e=>e!==null),Tn=(e,t)=>(0,Y.useMemo)(()=>{let t=w`
      background: ${e.vars.colors.background.surface};
      border-radius: ${e.vars.borderRadius.large};
      gap: calc(${e.vars.spacing.unit} * 2);
      min-width: 420px;
      font-family: ${e.vars.typography.fontFamily};
    `,n=w`
      gap: 0;
      align-items: center;
    `,r=w`
      margin: 0 0 calc(${e.vars.spacing.unit} * 1) 0;
      color: ${e.vars.colors.text.primary};
    `;return{card:t,header:n,subtitle:w`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
      color: ${e.vars.colors.text.secondary};
    `,title:r}},[e.vars.colors.background.surface,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.large,e.vars.spacing.unit,e.vars.typography.fontFamily,t]),En=({onInitialize:e,onSubmit:t,onError:n,onFlowChange:r,className:a=``,children:o,fetchOrganizationUnitChildren:s,isInitialized:c=!0,preferences:l,size:u=`medium`,variant:d=`outlined`,showTitle:f=!0,showSubtitle:p=!0})=>{let{meta:m,isInitialized:h,getStorageManager:g}=_(),{t:y}=et(l?.i18n),{theme:b}=q(),x=(0,Y.useContext)(Qe),C=Tn(b,b.vars.colors.text.primary),[w,T]=(0,Y.useState)(!1),[E,D]=(0,Y.useState)(!1),[O,k]=(0,Y.useState)(null),[A,j]=(0,Y.useState)(null),[M,N]=(0,Y.useState)({}),[ee,P]=(0,Y.useState)({}),[te,F]=(0,Y.useState)({}),[I,ne]=(0,Y.useState)(!0),L=(0,Y.useRef)(null),R=(0,Y.useRef)(!1);(0,Y.useEffect)(()=>{h&&(async()=>{try{let e=await(await g())?.getTemporaryData();e?.challengeToken&&(L.current=e.challengeToken)}catch{}})()},[h]);let re=async e=>{L.current=e;try{let t=await g();t&&(e?await t.setTemporaryDataParameter(`challengeToken`,e):await t.removeTemporaryDataParameter(`challengeToken`))}catch{i.warn(`Failed to persist challenge token in storage.`)}},z=(0,Y.useCallback)(e=>{let t=on(e,y,`components.inviteUser.errors.generic`);j(e instanceof Error?e:Error(t)),n?.(e instanceof Error?e:Error(t))},[y,n]),B=(0,Y.useCallback)(e=>{if(!e?.data?.meta?.components)return e;try{let{components:t}=cn(e,y,{defaultErrorKey:`components.inviteUser.errors.generic`,resolveTranslations:!1},m);return{...e,data:{...e.data,components:t}}}catch{return e}},[y,o]),V=(0,Y.useCallback)((e,t)=>{N(n=>({...n,[e]:t})),P(t=>{let n={...t};return delete n[e],n})},[]),ie=(0,Y.useCallback)(e=>{F(t=>({...t,[e]:!0}))},[]),H=(0,Y.useCallback)(e=>{let t={},n=e=>{e.forEach(e=>{if((e.type===`TEXT_INPUT`||e.type===`EMAIL_INPUT`||e.type===`SELECT`||e.type===`PHONE_INPUT`||e.type===`OTP_INPUT`)&&e.required&&e.ref){let n=M[e.ref];(!n||n.trim()===``)&&(t[e.ref]=`${e.label||e.ref} is required`),e.type===`EMAIL_INPUT`&&n&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)&&(t[e.ref]=`Please enter a valid email address`)}e.components&&Array.isArray(e.components)&&n(e.components)})};return n(e),{errors:t,isValid:Object.keys(t).length===0}},[M]),ae=(0,Y.useCallback)(async(e,n)=>{if(!O)return;let i=H(O.data?.components||[]);if(!i.isValid){P(i.errors),ne(!1);let e={};Object.keys(i.errors).forEach(t=>{e[t]=!0}),F(t=>({...t,...e}));return}T(!0),j(null),ne(!0);try{let i=n||M,a={executionId:O.executionId,inputs:i,verbose:!0,...L.current?{challengeToken:L.current}:{}};e?.id&&(a.action=e.id);let o=B(await t(a));if(r?.(o),await re(o.challengeToken??null),o.flowStatus===`ERROR`){z(o);return}k(o),N({}),P({}),F({}),o?.error&&z(o)}catch(e){z(e)}finally{T(!1)}},[O,M,H,t,r,z,B]),U=(0,Y.useCallback)(()=>{D(!1),k(null),j(null),N({}),P({}),F({}),R.current=!1},[]);(0,Y.useEffect)(()=>{c&&!E&&!R.current&&(R.current=!0,(async()=>{T(!0),j(null);try{let t=B(await e({flowType:v.UserOnboarding,verbose:!0}));await re(t.challengeToken??null),k(t),D(!0),r?.(t),t.flowStatus===`ERROR`&&z(t)}catch(e){z(e)}finally{T(!1)}})())},[c,E,e,r,z,B]),(0,Y.useEffect)(()=>{if(O&&E){let e=O.data?.components||[];e.length>0&&ne(H(e).isValid)}},[M,O,E,H]);let oe=(0,Y.useCallback)(e=>{let t,n;return e.forEach(e=>{e.type===`TEXT`&&(e.variant===`HEADING_1`&&!t?t=e.label:(e.variant===`HEADING_2`||e.variant===`SUBTITLE_1`)&&!n&&(n=e.label))}),{subtitle:n,title:t}},[]),se=(0,Y.useCallback)(e=>e.filter(e=>!(e.type===`TEXT`&&(e.variant===`HEADING_1`||e.variant===`HEADING_2`))),[]),ce=(0,Y.useCallback)(e=>wn(e,M,te,ee,w,I,V,{_customRenderers:x,_theme:b,additionalData:O?.data?.additionalData,fetchOrganizationUnitChildren:s,onInputBlur:ie,onSubmit:ae,size:u,variant:d}),[x,O?.data?.additionalData,s,M,te,ee,w,I,V,ie,ae,u,b,d]),le=O?.data?.components||O?.data?.meta?.components||[],{title:W,subtitle:ue}=oe(le),de=se(le),fe={additionalData:O?.data?.additionalData,components:le,error:A,executionId:O?.executionId,fieldErrors:ee,handleInputBlur:ie,handleInputChange:V,handleSubmit:ae,isLoading:w,isValid:I,meta:m,resetFlow:U,subtitle:ue,title:W,touched:te,values:M};return o?(0,X.jsx)(`div`,{className:a,children:o(fe)}):!c||!E&&w?(0,X.jsx)(Yt,{className:S(a,C.card),variant:d,children:(0,X.jsx)(Yt.Content,{children:(0,X.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`2rem`},children:(0,X.jsx)(nt,{size:`medium`})})})}):!O&&A?(0,X.jsx)(Yt,{className:S(a,C.card),variant:d,children:(0,X.jsx)(Yt.Content,{children:(0,X.jsxs)(Bt,{variant:`error`,children:[(0,X.jsx)(Bt.Title,{children:`Error`}),(0,X.jsx)(Bt.Description,{children:A.message})]})})}):(0,X.jsxs)(Yt,{className:S(a,C.card),variant:d,children:[(f||p)&&(W||ue)&&(0,X.jsxs)(Yt.Header,{className:C.header,children:[f&&W&&(0,X.jsx)(Yt.Title,{level:2,className:C.title,children:W}),p&&ue&&(0,X.jsx)(Ie,{variant:`body1`,className:C.subtitle,children:ue})]}),(0,X.jsxs)(Yt.Content,{children:[A&&(0,X.jsx)(`div`,{style:{marginBottom:`1rem`},children:(0,X.jsx)(Bt,{variant:`error`,children:(0,X.jsx)(Bt.Description,{children:A.message})})}),(0,X.jsxs)(`div`,{children:[de&&de.length>0?ce(de):!w&&(0,X.jsx)(Bt,{variant:`warning`,children:(0,X.jsx)(Ie,{variant:`body1`,children:`No form components available`})}),w&&(0,X.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`1rem`},children:(0,X.jsx)(nt,{size:`small`})})]})]})]})},Dn=({onError:e,onFlowChange:t,className:n,children:r,size:i=`medium`,variant:o=`outlined`,showTitle:s=!0,showSubtitle:c=!0})=>{let{http:l,baseUrl:u,getAccessToken:d,isInitialized:f}=_();return(0,X.jsx)(En,{onInitialize:async e=>(await l.request({data:{...e,flowType:v.UserOnboarding,verbose:!0},headers:{Accept:`application/json`,"Content-Type":`application/json`},method:`POST`,url:`${u}/flow/execute`})).data,onSubmit:async e=>(await l.request({data:{...e,verbose:!0},headers:{Accept:`application/json`,"Content-Type":`application/json`},method:`POST`,url:`${u}/flow/execute`})).data,onError:e,onFlowChange:t,className:n,fetchOrganizationUnitChildren:(0,Y.useCallback)(async(e,t,n)=>a({baseUrl:u,headers:{Authorization:`Bearer ${await d()}`},limit:t,offset:n,organizationUnitId:e}),[u,d]),isInitialized:f,size:i,variant:o,showTitle:s,showSubtitle:c,children:r})},On={USERS:`users`,USER:`user`,USER_TYPES:`userTypes`,USER_TYPE:`userType`},Z=Ae();function kn(){let e=(0,Z.c)(14),{http:n}=_(),{getServerUrl:r}=G(),i=t(),{t:a}=K(`users`),{showToast:o}=ke(),s;e[0]!==r||e[1]!==n?(s=async e=>{let t=r();return(await n.request({url:`${t}/users`,method:`POST`,headers:{"Content-Type":`application/json`},data:e})).data},e[0]=r,e[1]=n,e[2]=s):s=e[2];let c;e[3]!==i||e[4]!==o||e[5]!==a?(c=()=>{i.invalidateQueries({queryKey:[On.USERS]}).catch(An),o(a(`create.success`),`success`)},e[3]=i,e[4]=o,e[5]=a,e[6]=c):c=e[6];let l;e[7]!==o||e[8]!==a?(l=()=>{o(a(`create.error`),`error`)},e[7]=o,e[8]=a,e[9]=l):l=e[9];let d;return e[10]!==s||e[11]!==c||e[12]!==l?(d={mutationFn:s,onSuccess:c,onError:l},e[10]=s,e[11]=c,e[12]=l,e[13]=d):d=e[13],u(d)}function An(){}function jn(){let e=(0,Z.c)(14),{http:n}=_(),{getServerUrl:r}=G(),i=t(),{t:a}=K(`users`),{showToast:o}=ke(),s;e[0]!==r||e[1]!==n?(s=async e=>{let t=r();await n.request({url:`${t}/users/${e}`,method:`DELETE`,headers:{"Content-Type":`application/json`}})},e[0]=r,e[1]=n,e[2]=s):s=e[2];let c;e[3]!==i||e[4]!==o||e[5]!==a?(c=(e,t)=>{i.removeQueries({queryKey:[On.USER,t]}),i.invalidateQueries({queryKey:[On.USERS]}).catch(Mn),o(a(`delete.success`),`success`)},e[3]=i,e[4]=o,e[5]=a,e[6]=c):c=e[6];let l;e[7]!==o||e[8]!==a?(l=()=>{o(a(`delete.error`),`error`)},e[7]=o,e[8]=a,e[9]=l):l=e[9];let d;return e[10]!==s||e[11]!==c||e[12]!==l?(d={mutationFn:s,onSuccess:c,onError:l},e[10]=s,e[11]=c,e[12]=l,e[13]=d):d=e[13],u(d)}function Mn(){}function Nn(e){let t=(0,Z.c)(10),{http:n}=_(),{getServerUrl:r}=G(),i;t[0]===e?i=t[1]:(i=[On.USER,e],t[0]=e,t[1]=i);let a;t[2]!==r||t[3]!==n||t[4]!==e?(a=async()=>{let t=r();return(await n.request({url:`${t}/users/${e}?include=display`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[2]=r,t[3]=n,t[4]=e,t[5]=a):a=t[5];let o=!!e,s;return t[6]!==i||t[7]!==a||t[8]!==o?(s={queryKey:i,queryFn:a,enabled:o},t[6]=i,t[7]=a,t[8]=o,t[9]=s):s=t[9],b(s)}function Pn(e){let t=(0,Z.c)(15),{http:n}=_(),{getServerUrl:r}=G(),i;t[0]===e?i=t[1]:(i=e??{},t[0]=e,t[1]=i);let{limit:a,offset:o,filter:s}=i,c;t[2]!==s||t[3]!==a||t[4]!==o?(c=[On.USERS,{limit:a,offset:o,filter:s}],t[2]=s,t[3]=a,t[4]=o,t[5]=c):c=t[5];let l;t[6]!==s||t[7]!==r||t[8]!==n||t[9]!==a||t[10]!==o?(l=async()=>{let e=r(),t=new URLSearchParams;a!==void 0&&t.append(`limit`,String(a)),o!==void 0&&t.append(`offset`,String(o)),s&&t.append(`filter`,s),t.append(`include`,`display`);let i=t.toString();return(await n.request({url:`${e}/users${i?`?${i}`:``}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[6]=s,t[7]=r,t[8]=n,t[9]=a,t[10]=o,t[11]=l):l=t[11];let u;return t[12]!==c||t[13]!==l?(u={queryKey:c,queryFn:l},t[12]=c,t[13]=l,t[14]=u):u=t[14],b(u)}function Fn(e){let t=(0,Z.c)(10),{http:n}=_(),{getServerUrl:r}=G(),i;t[0]===e?i=t[1]:(i=[On.USER_TYPE,e],t[0]=e,t[1]=i);let a;t[2]!==r||t[3]!==n||t[4]!==e?(a=async()=>{let t=r();return(await n.request({url:`${t}/user-types/${e}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[2]=r,t[3]=n,t[4]=e,t[5]=a):a=t[5];let o=!!e,s;return t[6]!==i||t[7]!==a||t[8]!==o?(s={queryKey:i,queryFn:a,enabled:o},t[6]=i,t[7]=a,t[8]=o,t[9]=s):s=t[9],b(s)}function In(e){let t=(0,Z.c)(13),{http:n}=_(),{getServerUrl:r}=G(),i;t[0]===e?i=t[1]:(i=e??{},t[0]=e,t[1]=i);let{limit:a,offset:o}=i,s;t[2]!==a||t[3]!==o?(s=[On.USER_TYPES,{limit:a,offset:o}],t[2]=a,t[3]=o,t[4]=s):s=t[4];let c;t[5]!==r||t[6]!==n||t[7]!==a||t[8]!==o?(c=async()=>{let e=r(),t=new URLSearchParams;a!==void 0&&t.append(`limit`,String(a)),o!==void 0&&t.append(`offset`,String(o));let i=t.toString();return(await n.request({url:`${e}/user-types${i?`?${i}`:``}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[5]=r,t[6]=n,t[7]=a,t[8]=o,t[9]=c):c=t[9];let l;return t[10]!==s||t[11]!==c?(l={queryKey:s,queryFn:c},t[10]=s,t[11]=c,t[12]=l):l=t[12],b(l)}function Ln(){let e=(0,Z.c)(14),{http:n}=_(),{getServerUrl:r}=G(),i=t(),{t:a}=K(`users`),{showToast:o}=ke(),s;e[0]!==r||e[1]!==n?(s=async e=>{let{userId:t,data:i}=e,a=r();return(await n.request({url:`${a}/users/${t}`,method:`PUT`,headers:{"Content-Type":`application/json`},data:i})).data},e[0]=r,e[1]=n,e[2]=s):s=e[2];let c;e[3]!==i||e[4]!==o||e[5]!==a?(c=(e,t)=>{i.invalidateQueries({queryKey:[On.USER,t.userId]}).catch(zn),i.invalidateQueries({queryKey:[On.USERS]}).catch(Rn),o(a(`update.success`),`success`)},e[3]=i,e[4]=o,e[5]=a,e[6]=c):c=e[6];let l;e[7]!==o||e[8]!==a?(l=()=>{o(a(`update.error`),`error`)},e[7]=o,e[8]=a,e[9]=l):l=e[9];let d;return e[10]!==s||e[11]!==c||e[12]!==l?(d={mutationFn:s,onSuccess:c,onError:l},e[10]=s,e[11]=c,e[12]=l,e[13]=d):d=e[13],u(d)}function Rn(){}function zn(){}function Bn(e){let t=(0,Z.c)(8),{value:n,onChange:r,fieldLabel:i}=e,[a,o]=(0,Y.useState)(``),s;if(t[0]!==i||t[1]!==a||t[2]!==r||t[3]!==n){let e=Array.isArray(n)?n:[],c=()=>{a.trim()&&(r([...e,a.trim()]),o(``))},l=t=>{r(e.filter((e,n)=>n!==t))},u;t[5]===c?u=t[6]:(u=e=>{e.key===`Enter`&&(e.preventDefault(),c())},t[5]=c,t[6]=u);let d=u,f;t[7]===Symbol.for(`react.memo_cache_sentinel`)?(f=e=>o(e.target.value),t[7]=f):f=t[7],s=(0,X.jsxs)(P,{children:[(0,X.jsxs)(P,{sx:{display:`flex`,gap:1,mb:1},children:[(0,X.jsx)(R,{value:a,onChange:f,onKeyDown:d,placeholder:`Add ${i.toLowerCase()}`,fullWidth:!0,size:`small`,variant:`outlined`}),(0,X.jsx)(z,{size:`small`,onClick:c,disabled:!a.trim(),children:(0,X.jsx)(ve,{size:16})})]}),(0,X.jsx)(P,{sx:{display:`flex`,flexWrap:`wrap`,gap:1},children:e.length>0&&e.map((e,t)=>(0,X.jsx)(E,{label:String(e),onDelete:()=>l(t),variant:`outlined`,size:`medium`},`chip-${e}`))})]}),t[0]=i,t[1]=a,t[2]=r,t[3]=n,t[4]=s}else s=t[4];return s}var Vn=Bn;function Hn({id:e,value:t,placeholder:n,required:r,error:i,helperText:a=void 0,color:o,onChange:s,onBlur:c,inputRef:l,name:u,ariaLabel:d=void 0}){let[f,p]=(0,Y.useState)(!1);return(0,X.jsx)(R,{id:e,name:u,value:t,type:f?`text`:`password`,placeholder:n,fullWidth:!0,required:r,variant:`outlined`,error:i,helperText:a,color:o,onChange:s,onBlur:c,inputRef:l,slotProps:{htmlInput:{"aria-label":d},input:{endAdornment:(0,X.jsx)(j,{position:`end`,children:(0,X.jsx)(z,{"aria-label":f?`hide password`:`show password`,onClick:()=>p(e=>!e),edge:`end`,children:f?(0,X.jsx)(ye,{}):(0,X.jsx)(ue,{})})})}}})}var Un=Hn;function Wn({open:e,userId:t,onClose:n,onSuccess:r=void 0}){let{t:i}=K(),a=jn(),[o,s]=(0,Y.useState)(null),c=()=>{a.isPending||(s(null),n())};return(0,X.jsxs)(ae,{open:e,onClose:c,maxWidth:`sm`,fullWidth:!0,children:[(0,X.jsx)(H,{children:i(`users:delete.title`,`Delete User`)}),(0,X.jsxs)(re,{children:[(0,X.jsx)(oe,{sx:{mb:2},children:i(`users:delete.message`,`Are you sure you want to delete this user? This action cannot be undone.`)}),(0,X.jsx)(T,{severity:`warning`,sx:{mb:2},children:i(`users:delete.disclaimer`,`All associated data will be permanently removed.`)}),o&&(0,X.jsx)(T,{severity:`error`,sx:{mt:2},children:o})]}),(0,X.jsxs)(F,{children:[(0,X.jsx)(L,{onClick:c,disabled:a.isPending,children:i(`common:actions.cancel`)}),(0,X.jsx)(L,{onClick:()=>{t&&(s(null),a.mutate(t,{onSuccess:()=>{s(null),n(),r?.()},onError:e=>{s(e.message??i(`users:delete.error`,`Failed to delete user`))}}))},color:`error`,variant:`contained`,disabled:a.isPending||!t,children:a.isPending?i(`common:status.deleting`,`Deleting...`):i(`common:actions.delete`,`Delete`)})]})]})}function Gn(){let e=Ge(),{t}=K(),n=je(`UsersList`),r=Ne(),{data:i,isLoading:a,error:o}=Pn(),s=jn(),c=o,[l,u]=(0,Y.useState)(!1),[d,f]=(0,Y.useState)(null),[p,m]=(0,Y.useState)(!1),[h,g]=(0,Y.useState)(null);h!==c&&(g(c),c&&u(!0));let _=()=>{u(!1)},v=(0,Y.useCallback)(e=>{f(e),m(!0)},[]),y=(0,Y.useCallback)(t=>{(async()=>{await e(`/users/${t}`)})().catch(e=>{n.error(`Failed to navigate to user details`,{error:e,userId:t})})},[n,e]),b=()=>{m(!1),f(null)},x=async()=>{if(d)try{await s.mutateAsync(d),m(!1),f(null)}catch(e){m(!1),n.error(`Failed to delete user`,{error:e,userId:d})}},S=(0,Y.useMemo)(()=>[{field:`name`,headerName:t(`users:listing.columns.name`,`Name`),flex:1,minWidth:200,renderCell:e=>{let t=e.row.display??e.row.id,n=e.row.attributes?.picture,r=typeof n==`string`?n:void 0;return(0,X.jsx)(ge.CellIcon,{sx:{width:`100%`},icon:(0,X.jsx)(We,{value:r,size:30,fallback:Oe(t)}),primary:t})}},{field:`id`,headerName:t(`users:listing.columns.userId`,`User ID`),flex:1,minWidth:200,renderCell:e=>(0,X.jsx)(V,{variant:`body2`,sx:{fontFamily:`monospace`,fontSize:`0.875rem`},children:e.row.id})},{field:`ouHandle`,headerName:t(`users:listing.columns.organizationUnit`,`Organization Unit`),flex:.5,minWidth:150,renderCell:e=>(0,X.jsx)(V,{variant:`body2`,sx:{fontFamily:`monospace`,fontSize:`0.875rem`},children:e.row.ouHandle??e.row.ouId??`-`})},{field:`actions`,headerName:t(`users:listing.columns.actions`,`Actions`),width:150,align:`center`,headerAlign:`center`,sortable:!1,filterable:!1,hideable:!1,renderCell:e=>(0,X.jsx)(ge.RowActions,{children:e.row.isReadOnly?(0,X.jsx)(I,{title:t(`common:status.readOnly`,`Read Only`),children:(0,X.jsx)(z,{size:`small`,disableRipple:!0,sx:{cursor:`default`},children:(0,X.jsx)(ue,{size:16})})}):(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(I,{title:t(`common:actions.edit`),children:(0,X.jsx)(z,{size:`small`,onClick:t=>{t.stopPropagation(),y(e.row.id)},children:(0,X.jsx)(Se,{size:16})})}),(0,X.jsx)(I,{title:t(`common:actions.delete`),children:(0,X.jsx)(z,{size:`small`,color:`error`,onClick:t=>{t.stopPropagation(),v(e.row.id)},children:(0,X.jsx)(we,{size:16})})})]})})}],[v,y,t]);return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(ge.Provider,{variant:`data-grid-card`,loading:a,children:(0,X.jsx)(ge.Container,{disablePaper:!0,children:(0,X.jsx)(ge.DataGrid,{rows:i?.users??[],columns:S,getRowId:e=>e.id,onRowClick:e=>{y(e.row.id)},initialState:{pagination:{paginationModel:{pageSize:10}}},pageSizeOptions:[5,10,25,50],disableRowSelectionOnClick:!0,localeText:r,autoHeight:!0,sx:{"& .MuiDataGrid-row":{cursor:`pointer`}}})})}),(0,X.jsxs)(ae,{open:p,onClose:b,children:[(0,X.jsx)(H,{children:t(`users:deleteUser`)}),(0,X.jsxs)(re,{children:[(0,X.jsx)(oe,{children:t(`users:confirmDeleteUser`)}),s.error&&(0,X.jsx)(T,{severity:`error`,sx:{mt:2},children:(0,X.jsx)(V,{variant:`body2`,sx:{fontWeight:`bold`},children:s.error.message})})]}),(0,X.jsxs)(F,{children:[(0,X.jsx)(L,{onClick:b,disabled:s.isPending,children:t(`common:actions.cancel`)}),(0,X.jsx)(L,{onClick:()=>{x().catch(()=>{})},color:`error`,variant:`contained`,disabled:s.isPending,children:s.isPending?t(`common:status.loading`):t(`common:actions.delete`)})]})]}),(0,X.jsx)(le,{open:l,autoHideDuration:6e3,onClose:_,anchorOrigin:{vertical:`top`,horizontal:`right`},children:(0,X.jsx)(T,{onClose:_,severity:`error`,sx:{width:`100%`},children:c?.message??t(`common:messages.saveError`)})})]})}async function Kn(e,t,n,r){let i=new URLSearchParams({limit:String(r.limit),offset:String(r.offset)});return(await e.request({url:`${t}/organization-units/${encodeURIComponent(n)}/ous?${i.toString()}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data}async function qn(e,t,n){let r=new URLSearchParams({limit:String(n.limit),offset:String(n.offset)});return(await e.request({url:`${t}/organization-units?${r.toString()}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data}var Jn={ORGANIZATION_UNITS:`organization-units`,ORGANIZATION_UNIT:`organization-unit`,CHILD_ORGANIZATION_UNITS:`child-organization-units`,ORGANIZATION_UNIT_USERS:`organization-unit-users`,ORGANIZATION_UNIT_GROUPS:`organization-unit-groups`};function Yn(e,t){let n=(0,Z.c)(18),{http:r}=_(),{getServerUrl:i}=G(),a;n[0]===t?a=n[1]:(a=t??{},n[0]=t,n[1]=a);let{limit:o,offset:s}=a,c=o===void 0?30:o,l=s===void 0?0:s,u;n[2]!==c||n[3]!==l?(u={limit:c,offset:l},n[2]=c,n[3]=l,n[4]=u):u=n[4];let d;n[5]!==e||n[6]!==u?(d=[Jn.CHILD_ORGANIZATION_UNITS,e,u],n[5]=e,n[6]=u,n[7]=d):d=n[7];let f;n[8]!==i||n[9]!==r||n[10]!==c||n[11]!==l||n[12]!==e?(f=async()=>Kn(r,i(),e,{limit:c,offset:l}),n[8]=i,n[9]=r,n[10]=c,n[11]=l,n[12]=e,n[13]=f):f=n[13];let p=!!e,m;return n[14]!==d||n[15]!==f||n[16]!==p?(m={queryKey:d,queryFn:f,enabled:p},n[14]=d,n[15]=f,n[16]=p,n[17]=m):m=n[17],b(m)}function Xn(e,t){let n=(0,Z.c)(10),r=t===void 0?!0:t,{http:i}=_(),{getServerUrl:a}=G(),o;n[0]===e?o=n[1]:(o=[Jn.ORGANIZATION_UNIT,e],n[0]=e,n[1]=o);let s;n[2]!==a||n[3]!==i||n[4]!==e?(s=async()=>{let t=a();return(await i.request({url:`${t}/organization-units/${encodeURIComponent(e)}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},n[2]=a,n[3]=i,n[4]=e,n[5]=s):s=n[5];let c=r&&!!e,l;return n[6]!==o||n[7]!==s||n[8]!==c?(l={queryKey:o,queryFn:s,enabled:c},n[6]=o,n[7]=s,n[8]=c,n[9]=l):l=n[9],b(l)}function Zn(e,t){let n=(0,Z.c)(14),r=t===void 0?!0:t,{http:i}=_(),{getServerUrl:a}=G(),o;n[0]===e?o=n[1]:(o=e??{},n[0]=e,n[1]=o);let{limit:s,offset:c}=o,l=s===void 0?30:s,u=c===void 0?0:c,d;n[2]!==l||n[3]!==u?(d=[Jn.ORGANIZATION_UNITS,{limit:l,offset:u}],n[2]=l,n[3]=u,n[4]=d):d=n[4];let f;n[5]!==a||n[6]!==i||n[7]!==l||n[8]!==u?(f=async()=>qn(i,a(),{limit:l,offset:u}),n[5]=a,n[6]=i,n[7]=l,n[8]=u,n[9]=f):f=n[9];let p;return n[10]!==r||n[11]!==d||n[12]!==f?(p={queryKey:d,queryFn:f,enabled:r},n[10]=r,n[11]=d,n[12]=f,n[13]=p):p=n[13],b(p)}var Q={PLACEHOLDER_SUFFIX:`__placeholder`,EMPTY_SUFFIX:`__empty`,ERROR_SUFFIX:`__error`,ADD_CHILD_SUFFIX:`__addChild`,LOAD_MORE_SUFFIX:`__loadMore`,ROOT_PARENT_ID:`__root`,ROOT_LOAD_MORE_ID:`__root__loadMore`,PAGE_SIZE:30};function Qn(e,t,n){return e.map(e=>{if(e.id===t){let t=(e.children??[]).filter(e=>!e.id.endsWith(Q.LOAD_MORE_SUFFIX));return{...e,children:[...t,...n]}}return e.children&&e.children.length>0?{...e,children:Qn(e.children,t,n)}:e})}function $n(e){let t=new Map,n=e=>{e.forEach(e=>{t.set(e.id,e),e.children&&n(e.children)})};return n(e),t}function er(e){return e.map(e=>({id:e.id,label:e.name,handle:e.handle,description:e.description,logoUrl:e.logoUrl,isReadOnly:e.isReadOnly,children:[{id:`${e.id}${Q.PLACEHOLDER_SUFFIX}`,label:``,handle:``,isPlaceholder:!0}]}))}function tr(e,t,n){return e.map(e=>e.id===t?{...e,children:n}:e.children&&e.children.length>0?{...e,children:tr(e.children,t,n)}:e)}function nr(){return(0,X.jsx)(D,{size:16})}function rr(e){let{itemMap:t,loadingItems:n,loadMoreLoadingItems:r,onLoadMore:i,itemId:a,label:o,...s}=e,c={itemId:a,label:o,...s},l=ie(),{t:u}=K(),d=typeof o==`string`?o:``,f=t?.get(a),p=a.endsWith(Q.LOAD_MORE_SUFFIX),m=a.endsWith(Q.EMPTY_SUFFIX),h=!m&&!p&&(f?.isPlaceholder??a.endsWith(Q.PLACEHOLDER_SUFFIX)),g=n?.has(a);if(p){let e=a.replace(Q.LOAD_MORE_SUFFIX,``),t=r?.has(e);return(0,X.jsx)(Te,{...c,sx:{"& > .MuiTreeItem-content":{border:`1px dashed`,borderColor:l.vars?.palette.divider,borderRadius:.5,backgroundColor:`transparent !important`,cursor:t?`default`:`pointer`,transition:`all 0.15s ease-in-out`,"&:hover":{borderColor:t?void 0:l.vars?.palette.primary.main}}},label:(0,X.jsx)(P,{role:`button`,tabIndex:0,onClick:n=>{n.stopPropagation(),t||i?.(e)},onKeyDown:n=>{(n.key===`Enter`||n.key===` `)&&!t&&(n.preventDefault(),n.stopPropagation(),i?.(e))},sx:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:1,py:.25},children:t?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(D,{size:14}),(0,X.jsx)(V,{variant:`caption`,color:`text.secondary`,children:u(`common:status.loading`)})]}):(0,X.jsx)(V,{variant:`caption`,color:`primary`,sx:{fontWeight:500},children:u(`organizationUnits:listing.treeView.loadMore`)})})})}return m?(0,X.jsx)(Te,{...c,sx:{"& > .MuiTreeItem-content":{border:`none !important`,backgroundColor:`transparent !important`}},label:(0,X.jsx)(V,{variant:`caption`,color:`text.secondary`,sx:{fontStyle:`italic`,pl:1},children:d})}):h?(0,X.jsx)(Te,{...c,sx:{"& > .MuiTreeItem-content":{border:`none !important`,backgroundColor:`transparent !important`}},label:(0,X.jsxs)(P,{sx:{display:`flex`,alignItems:`center`,gap:1},children:[(0,X.jsx)(D,{size:16}),(0,X.jsx)(V,{variant:`caption`,color:`text.secondary`,sx:{fontStyle:`italic`},children:u(`common:status.loading`)})]})}):(0,X.jsx)(Te,{...c,...g?{slots:{collapseIcon:nr,expandIcon:nr}}:{},label:(0,X.jsxs)(P,{sx:{display:`flex`,alignItems:`center`,gap:1.5},children:[(0,X.jsx)(We,{value:f?.logoUrl,size:30,fallback:`emoji:🏛️`}),(0,X.jsxs)(P,{sx:{flexGrow:1,minWidth:0},children:[(0,X.jsx)(V,{variant:`body2`,sx:{fontWeight:500,lineHeight:1.3},children:d}),f?.handle&&(0,X.jsx)(V,{variant:`caption`,color:`text.secondary`,sx:{lineHeight:1.2,display:`block`},children:f.handle})]})]})})}function ir({id:e=void 0,value:n,onChange:r,error:i=!1,helperText:a=``,rootOuId:o=void 0,maxHeight:s=300}){let c=ie(),{t:l}=K(),u=je(`OrganizationUnitTreePicker`),{http:d}=_(),{getServerUrl:f}=G(),p=t(),{data:m,isLoading:h}=Zn(void 0,!o),{data:g,isLoading:v,error:y}=Xn(o),{data:b,isLoading:x,error:S}=Yn(o),[C,w]=(0,Y.useState)([]),[T,E]=(0,Y.useState)([]),[D,O]=(0,Y.useState)(new Set),[k,A]=(0,Y.useState)(new Set),[j,M]=(0,Y.useState)(new Set),[N,ee]=(0,Y.useState)(new Map),[te,F]=(0,Y.useState)(0),[I,ne]=(0,Y.useState)(!1),L=(0,Y.useRef)(!1);L.current=I;let R=(0,Y.useRef)(k);R.current=k;let re=(0,Y.useMemo)(()=>$n(C),[C]);(0,Y.useEffect)(()=>{w([]),E([]),O(new Set),A(new Set),M(new Set),ee(new Map),F(0),ne(!1)},[o]),(0,Y.useEffect)(()=>{if(!o&&m?.organizationUnits&&m.organizationUnits.length>0&&C.length===0){let e=er(m.organizationUnits);m.organizationUnits.length<m.totalResults&&e.push({id:Q.ROOT_LOAD_MORE_ID,label:``,handle:``,isPlaceholder:!0}),F(m.organizationUnits.length),w(e)}},[o,m,C.length]),(0,Y.useEffect)(()=>{if(!o||!g||!b||C.length>0)return;let e=er(b.organizationUnits);b.organizationUnits.length<b.totalResults&&e.push({id:`${o}${Q.LOAD_MORE_SUFFIX}`,label:``,handle:``,isPlaceholder:!0});let t=b.organizationUnits.length>0?e:[{id:`${o}${Q.EMPTY_SUFFIX}`,label:l(`organizationUnits:listing.treeView.noChildren`),handle:``,isPlaceholder:!0}],n={id:g.id,label:g.name,handle:g.handle,description:g.description??void 0,logoUrl:g.logoUrl,children:t};ee(e=>new Map(e).set(o,b.organizationUnits.length)),O(e=>new Set(e).add(o)),E([o]),w([n])},[o,g,b,C.length,l]);let z=(0,Y.useCallback)(async(e,t)=>p.fetchQuery({queryKey:[Jn.CHILD_ORGANIZATION_UNITS,e,{limit:Q.PAGE_SIZE,offset:t}],queryFn:async()=>Kn(d,f(),e,{limit:Q.PAGE_SIZE,offset:t}),staleTime:0}),[f,p,d]),B=(0,Y.useCallback)((e,t,n)=>{let r=t.organizationUnits;if(r.length===0&&n===0)return[{id:`${e}${Q.EMPTY_SUFFIX}`,label:l(`organizationUnits:listing.treeView.noChildren`),handle:``,isPlaceholder:!0}];let i=er(r);return n+r.length<t.totalResults&&i.push({id:`${e}${Q.LOAD_MORE_SUFFIX}`,label:``,handle:``,isPlaceholder:!0}),i},[l]),H=(0,Y.useCallback)(async e=>{if(!R.current.has(e)){A(t=>new Set(t).add(e));try{let t=await z(e,0),n=B(e,t,0);ee(n=>new Map(n).set(e,t.organizationUnits.length)),w(t=>tr(t,e,n)),O(t=>new Set(t).add(e)),E(t=>t.includes(e)?t:[...t,e])}catch(t){u.error(`Failed to load child organization units`,{error:t,parentId:e})}finally{A(t=>{let n=new Set(t);return n.delete(e),n})}}},[z,B,u]),ae=(0,Y.useCallback)(async()=>{if(!L.current){ne(!0);try{let e=await p.fetchQuery({queryKey:[Jn.ORGANIZATION_UNITS,{limit:Q.PAGE_SIZE,offset:te}],queryFn:async()=>qn(d,f(),{limit:Q.PAGE_SIZE,offset:te}),staleTime:0}),t=er(e.organizationUnits),n=te+e.organizationUnits.length;n<e.totalResults&&t.push({id:Q.ROOT_LOAD_MORE_ID,label:``,handle:``,isPlaceholder:!0}),F(n),w(e=>[...e.filter(e=>e.id!==Q.ROOT_LOAD_MORE_ID),...t])}catch(e){u.error(`Failed to load more root organization units`,{error:e})}finally{ne(!1)}}},[te,f,p,d,u]),U=(0,Y.useCallback)(async e=>{if(e===Q.ROOT_PARENT_ID){await ae();return}M(t=>new Set(t).add(e));try{let t=N.get(e)??Q.PAGE_SIZE,n=await z(e,t),r=B(e,n,t);ee(r=>new Map(r).set(e,t+n.organizationUnits.length)),w(t=>Qn(t,e,r))}catch(t){u.error(`Failed to load more child organization units`,{error:t,parentId:e})}finally{M(t=>{let n=new Set(t);return n.delete(e),n})}},[N,z,B,u,ae]),oe=(0,Y.useMemo)(()=>{if(!I)return j;let e=new Set(j);return e.add(Q.ROOT_PARENT_ID),e},[j,I]),se=(0,Y.useCallback)((e,t,n)=>{!n||D.has(t)||k.has(t)||H(t).catch(e=>{u.error(`Failed to load child organization units`,{error:e,parentId:t})})},[D,k,H,u]),ce=(0,Y.useCallback)((e,t)=>{t&&!t.endsWith(Q.PLACEHOLDER_SUFFIX)&&!t.endsWith(Q.EMPTY_SUFFIX)&&!t.endsWith(Q.LOAD_MORE_SUFFIX)&&r(t)},[r]),le=(0,Y.useCallback)((e,t)=>{let n=new Set(T);E(t.filter(e=>n.has(e)||D.has(e)))},[T,D]),W=(0,Y.useCallback)(e=>{U(e).catch(t=>{u.error(`Failed to load more child organization units`,{error:t,parentId:e})})},[U,u]),ue=o?v||x:h,de=o?y??S:null;return ue?(0,X.jsx)(Me,{}):de?(0,X.jsx)(V,{variant:`body2`,color:`error`,children:de.message??l(`organizationUnits:treePicker.error`)}):!o&&m?.organizationUnits.length===0?(0,X.jsx)(V,{variant:`body2`,color:`text.secondary`,children:l(`organizationUnits:treePicker.empty`)}):(0,X.jsxs)(P,{children:[(0,X.jsx)(P,{sx:{maxHeight:s,overflow:`auto`},children:(0,X.jsx)(De,{id:e,items:C,expandedItems:T,onExpandedItemsChange:le,onItemExpansionToggle:se,selectedItems:n||null,onSelectedItemsChange:ce,slots:{item:rr},slotProps:{item:{itemMap:re,loadingItems:k,loadMoreLoadingItems:oe,onLoadMore:W}},getItemLabel:e=>e.label,sx:{"& .MuiTreeItem-content":{cursor:`pointer`,border:`1px solid`,borderColor:c.vars?.palette.divider,borderRadius:.5,py:.75,px:1,mb:.5,transition:`all 0.15s ease-in-out`,"&:hover":{backgroundColor:c.vars?.palette.action.hover,borderColor:c.vars?.palette.primary.main}},"& .Mui-selected > .MuiTreeItem-content":{backgroundColor:`${c.vars?.palette.primary.main}14`,borderColor:c.vars?.palette.primary.main},"& .MuiTreeItem-iconContainer":{color:c.vars?.palette.text.secondary,mr:.5},"& .MuiTreeItem-groupTransition":{ml:2,pl:2,borderLeft:`1px dashed`,borderColor:c.vars?.palette.divider}}})}),a&&(0,X.jsx)(V,{variant:`caption`,color:i?`error`:`text.secondary`,sx:{mt:.5,ml:1.75},children:a})]})}function ar({rootOuId:e,selectedOuId:t,onOuIdChange:n,onReadyChange:r=void 0}){let{t:i}=K();return(0,Y.useEffect)(()=>{t||n(e)},[t,e,n]),(0,Y.useEffect)(()=>{r&&r(t.length>0)},[t,r]),(0,X.jsxs)(W,{direction:`column`,spacing:4,"data-testid":`configure-organization-unit`,children:[(0,X.jsx)(V,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.selectOrganizationUnit.title`)}),(0,X.jsx)(V,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.selectOrganizationUnit.subtitle`)}),(0,X.jsxs)(k,{fullWidth:!0,required:!0,children:[(0,X.jsx)(U,{children:i(`users:createWizard.selectOrganizationUnit.fieldLabel`)}),(0,X.jsx)(ir,{id:`user-create-ou-picker`,rootOuId:e,value:t,onChange:n,maxHeight:500})]})]})}var or=(e,t,n,r,i)=>{let a=t.required??!1,o=e;if(t.displayName){let e=i?.(t.displayName);o=(e===``?void 0:e)??t.displayName}if(t.type===`string`){let i=t;if(i.enum&&i.enum.length>0){let t=i.enum;return(0,X.jsxs)(k,{children:[(0,X.jsxs)(U,{htmlFor:e,children:[o,a&&(0,X.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,X.jsx)(J,{name:e,control:n,rules:{required:a?`${o} is required`:!1},render:({field:n})=>(0,X.jsxs)(ce,{...n,value:n.value??``,id:e,fullWidth:!0,required:a,error:!!r[e],displayEmpty:!0,children:[(0,X.jsx)(B,{value:``,children:(0,X.jsxs)(`em`,{children:[`Select `,o]})}),t.map(e=>(0,X.jsx)(B,{value:e,children:e.charAt(0).toUpperCase()+e.slice(1)},e))]})}),r[e]&&(0,X.jsx)(V,{variant:`caption`,color:`error`,sx:{mt:.5,ml:1.75},children:r[e]?.message})]},e)}let s;return i.regex&&(s={value:new RegExp(i.regex),message:`${o} format is invalid`}),(0,X.jsxs)(k,{children:[(0,X.jsxs)(U,{htmlFor:e,children:[o,a&&(0,X.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,X.jsx)(J,{name:e,control:n,rules:{required:a?`${o} is required`:!1,pattern:s},render:({field:t})=>i.credential?(0,X.jsx)(Un,{id:e,name:t.name,value:t.value??``,placeholder:`Enter ${o.toLowerCase()}`,required:a,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:t.onChange,onBlur:t.onBlur,inputRef:t.ref}):(0,X.jsx)(R,{...t,value:t.value??``,id:e,type:`text`,placeholder:`Enter ${o.toLowerCase()}`,fullWidth:!0,required:a,variant:`outlined`,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`})})]},e)}if(t.type===`number`){let i=t;return(0,X.jsxs)(k,{children:[(0,X.jsxs)(U,{htmlFor:e,children:[o,a&&(0,X.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,X.jsx)(J,{name:e,control:n,rules:{required:a?`${o} is required`:!1},render:({field:t})=>i.credential?(0,X.jsx)(Un,{id:e,name:t.name,value:String(t.value??``),placeholder:`Enter ${o.toLowerCase()}`,required:a,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:e=>{let{value:n}=e.target,r=Number(n);t.onChange(n&&!Number.isNaN(r)?r:``)},onBlur:t.onBlur,inputRef:t.ref}):(0,X.jsx)(R,{...t,value:t.value??``,id:e,type:`number`,placeholder:`Enter ${o.toLowerCase()}`,fullWidth:!0,required:a,variant:`outlined`,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:e=>{let{value:n}=e.target;t.onChange(n?Number(n):``)}})})]},e)}return t.type===`boolean`?(0,X.jsx)(k,{children:(0,X.jsx)(J,{name:e,control:n,render:({field:t})=>(0,X.jsx)(P,{sx:{display:`flex`,alignItems:`center`,py:1},children:(0,X.jsx)(N,{control:(0,X.jsx)(se,{id:e,name:t.name,checked:!!t.value,onChange:e=>t.onChange(e.target.checked),onBlur:t.onBlur,ref:t.ref}),required:a,label:o,sx:{mb:2}})})})},e):t.type===`array`?(0,X.jsxs)(k,{fullWidth:!0,children:[(0,X.jsxs)(U,{htmlFor:e,children:[o,a&&(0,X.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,X.jsx)(J,{name:e,control:n,rules:{required:a?`${o} is required`:!1,validate:e=>a&&(!Array.isArray(e)||e.length===0)?`${o} must have at least one value`:!0},render:({field:t})=>(0,X.jsxs)(P,{children:[(0,X.jsx)(Vn,{value:Array.isArray(t.value)?t.value:[],onChange:t.onChange,fieldLabel:o}),r[e]&&(0,X.jsx)(V,{variant:`caption`,color:`error`,sx:{mt:.5,ml:1.75},children:r[e]?.message})]})})]},e):null};function sr({schema:e,defaultValues:t,onFormValuesChange:n,onReadyChange:r=void 0}){let{t:i}=K(),{resolveDisplayName:a}=Pe({handlers:{t:i}}),{control:o,watch:s,formState:{errors:c,isValid:l}}=Ye({defaultValues:t,mode:`onChange`});return(0,Y.useEffect)(()=>{let e=s(e=>{n(e)});return()=>e.unsubscribe()},[s,n]),(0,Y.useEffect)(()=>{r&&r(l)},[l,r]),(0,X.jsxs)(W,{direction:`column`,spacing:4,"data-testid":`configure-user-details`,children:[(0,X.jsx)(V,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.userDetails.title`)}),(0,X.jsx)(V,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.userDetails.subtitle`)}),(0,X.jsx)(P,{sx:{display:`flex`,flexDirection:`column`,gap:2},children:e.schema&&Object.entries(e.schema).map(([e,t])=>or(e,t,o,c,a))})]})}function cr({schemas:e,selectedSchema:t,onSchemaChange:n,onReadyChange:r=void 0}){let{t:i}=K();return(0,Y.useEffect)(()=>{r&&r(t!==null)},[t,r]),(0,X.jsxs)(W,{direction:`column`,spacing:4,"data-testid":`configure-user-type`,children:[(0,X.jsx)(V,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.selectUserType.title`)}),(0,X.jsx)(V,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.selectUserType.subtitle`)}),(0,X.jsxs)(k,{fullWidth:!0,required:!0,children:[(0,X.jsx)(U,{htmlFor:`user-type-select`,children:i(`users:createWizard.selectUserType.fieldLabel`)}),(0,X.jsxs)(ce,{id:`user-type-select`,value:t?.id??``,onChange:t=>{n(e.find(e=>e.id===t.target.value)??null)},displayEmpty:!0,"data-testid":`user-type-select`,children:[(0,X.jsx)(B,{value:``,disabled:!0,children:(0,X.jsx)(`em`,{children:i(`users:createWizard.selectUserType.placeholder`)})}),e.map(e=>(0,X.jsx)(B,{value:e.id,children:e.name},e.id))]})]})]})}function lr(e){let t=(0,Z.c)(8),{user:n,copiedField:r,onCopyToClipboard:i}=e,{t:a}=K(),o;if(t[0]!==r||t[1]!==i||t[2]!==a||t[3]!==n.id){let e;t[5]!==i||t[6]!==n.id?(e=()=>{i(n.id,`userId`).catch(ur)},t[5]=i,t[6]=n.id,t[7]=e):e=t[7],o=(0,X.jsx)(Ee,{title:a(`users:manageUser.sections.quickCopy.title`,`Quick Copy`),description:a(`users:manageUser.sections.quickCopy.description`,`Copy user identifiers for use in your application.`),children:(0,X.jsx)(W,{spacing:3,children:(0,X.jsxs)(k,{fullWidth:!0,children:[(0,X.jsx)(U,{htmlFor:`user-id-input`,children:a(`users:manageUser.sections.quickCopy.userId`,`User ID`)}),(0,X.jsx)(R,{fullWidth:!0,id:`user-id-input`,value:n.id,InputProps:{readOnly:!0,endAdornment:(0,X.jsx)(j,{position:`end`,children:(0,X.jsx)(I,{title:r===`userId`?a(`common:actions.copied`,`Copied`):a(`users:manageUser.sections.quickCopy.copyUserId`,`Copy User ID`),children:(0,X.jsx)(z,{"aria-label":r===`userId`?a(`common:actions.copied`,`Copied`):a(`users:manageUser.sections.quickCopy.copyUserId`,`Copy User ID`),onClick:e,edge:`end`,children:r===`userId`?(0,X.jsx)(he,{size:16}):(0,X.jsx)(_e,{size:16})})})})},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]})})}),t[0]=r,t[1]=i,t[2]=a,t[3]=n.id,t[4]=o}else o=t[4];return o}function ur(){return null}var dr=(0,Y.createContext)(void 0),$={USER_TYPE:`USER_TYPE`,ORGANIZATION_UNIT:`ORGANIZATION_UNIT`,USER_DETAILS:`USER_DETAILS`},fr={currentStep:$.USER_TYPE,selectedSchema:null,selectedOuId:null,formValues:{},error:null};function pr({children:e}){let[t,n]=(0,Y.useState)(fr.currentStep),[r,i]=(0,Y.useState)(fr.selectedSchema),[a,o]=(0,Y.useState)(fr.selectedOuId),[s,c]=(0,Y.useState)(fr.formValues),[l,u]=(0,Y.useState)(fr.error),d=(0,Y.useCallback)(()=>{n(fr.currentStep),i(fr.selectedSchema),o(fr.selectedOuId),c(fr.formValues),u(fr.error)},[]),f=(0,Y.useMemo)(()=>({currentStep:t,setCurrentStep:n,selectedSchema:r,setSelectedSchema:i,selectedOuId:a,setSelectedOuId:o,formValues:s,setFormValues:c,error:l,setError:u,reset:d}),[t,r,a,s,l,d]);return(0,X.jsx)(dr.Provider,{value:f,children:e})}function mr(){let e=(0,Y.useContext)(dr);if(!e)throw Error(`useUserCreate must be used within a UserCreateProvider`);return e}function hr(){let{t:e}=K(),t=Ge(),n=je(`UserCreatePage`),r=kn(),{currentStep:i,setCurrentStep:a,selectedSchema:o,setSelectedSchema:s,selectedOuId:c,setSelectedOuId:l,formValues:u,setFormValues:d,error:f,setError:p}=mr(),{data:m}=In(),{data:h,isLoading:g}=Fn(o?.id),{data:v,isLoading:y,error:b}=Yn(o?.ouId,{limit:1,offset:0}),x=_().user?.ouId??null,S=b?.response?.status===403,C=!!b&&!S,w=(0,Y.useMemo)(()=>m?.types??[],[m]),E=!y&&!b&&(v?.totalResults??0)>0,D=(0,Y.useMemo)(()=>{let e=[$.USER_TYPE];return E&&e.push($.ORGANIZATION_UNIT),e.push($.USER_DETAILS),e},[E]),O=(0,Y.useMemo)(()=>{let t={USER_TYPE:{label:e(`users:createWizard.steps.userType`)}};return E&&(t.ORGANIZATION_UNIT={label:e(`users:createWizard.steps.organizationUnit`)}),t.USER_DETAILS={label:e(`users:createWizard.steps.userDetails`)},t},[e,E]),[k,A]=(0,Y.useState)(null),[j,N]=(0,Y.useState)(!1),[ee,te]=(0,Y.useState)({USER_TYPE:!1,ORGANIZATION_UNIT:!1,USER_DETAILS:!1}),F=()=>{r.isPending||Promise.resolve(t(`/users`)).catch(e=>{n.error(`Failed to navigate to users page`,{error:e})})},I=(0,Y.useCallback)((e,t)=>{te(n=>({...n,[e]:t}))},[]),R=(0,Y.useCallback)(e=>{I($.USER_TYPE,e)},[I]),re=(0,Y.useCallback)(e=>{I($.ORGANIZATION_UNIT,e)},[I]),B=(0,Y.useCallback)(e=>{I($.USER_DETAILS,e)},[I]),ie=(0,Y.useCallback)(e=>{e?.id!==o?.id&&(d({}),l(null),te(e=>({...e,ORGANIZATION_UNIT:!1,USER_DETAILS:!1}))),s(e)},[o,s,l,d]),H=async()=>{if(A(null),p(null),!o){A(e(`users:createWizard.validationErrors.userTypeRequired`)),N(!0);return}let i=(c??o.ouId)?.trim();if(!i){A(e(`users:createWizard.validationErrors.ouIdMissing`)),N(!0);return}let a=Object.fromEntries(Object.entries(u).filter(([,e])=>e!==``&&e!=null)),s={ouId:i,type:o.name,attributes:a};try{await r.mutateAsync(s),await t(`/users`)}catch(e){n.error(`Failed to create user or navigate`,{error:e})}},ae=()=>{switch(i){case $.USER_TYPE:if(o?.ouId&&y)return;if(C){p(e(`users:createWizard.errors.childOuProbeFailed`));return}E?a($.ORGANIZATION_UNIT):S?x?(l(x),a($.USER_DETAILS)):p(e(`users:createWizard.errors.noOuAccess`)):(l(o?.ouId??null),a($.USER_DETAILS));break;case $.ORGANIZATION_UNIT:a($.USER_DETAILS);break;case $.USER_DETAILS:H().catch(()=>{});break;default:break}},U=()=>{switch(i){case $.ORGANIZATION_UNIT:a($.USER_TYPE);break;case $.USER_DETAILS:a(E?$.ORGANIZATION_UNIT:$.USER_TYPE);break;default:break}},oe=()=>{switch(i){case $.USER_TYPE:return(0,X.jsx)(cr,{schemas:w,selectedSchema:o,onSchemaChange:ie,onReadyChange:R});case $.ORGANIZATION_UNIT:return o?.ouId?(0,X.jsx)(ar,{rootOuId:o.ouId,selectedOuId:c??``,onOuIdChange:l,onReadyChange:re},o.ouId):(a($.USER_TYPE),null);case $.USER_DETAILS:return g?(0,X.jsx)(P,{sx:{textAlign:`center`,py:4},children:(0,X.jsx)(V,{variant:`body2`,color:`text.secondary`,children:e(`common:status.loading`)})}):h?(0,X.jsx)(sr,{schema:h,defaultValues:u,onFormValuesChange:d,onReadyChange:B},o?.id):null;default:return null}},se=()=>(D.indexOf(i)+1)/D.length*100,ce=()=>{let e=D.indexOf(i);return D.slice(0,e+1)},ue=()=>{N(!1)},de=i===D[D.length-1];return(0,X.jsxs)(P,{sx:{minHeight:`100vh`,display:`flex`,flexDirection:`column`},children:[(0,X.jsx)(M,{variant:`determinate`,value:se(),sx:{height:6}}),(0,X.jsxs)(P,{sx:{flex:1,display:`flex`,flexDirection:`column`},children:[(0,X.jsx)(P,{sx:{p:4,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:(0,X.jsxs)(W,{direction:`row`,alignItems:`center`,spacing:2,children:[(0,X.jsx)(z,{"aria-label":e(`common:actions.close`),onClick:F,sx:{bgcolor:`background.paper`,"&:hover":{bgcolor:`action.hover`},boxShadow:1},children:(0,X.jsx)(Ce,{size:24})}),(0,X.jsx)(ne,{separator:(0,X.jsx)(pe,{size:16}),"aria-label":`breadcrumb`,children:ce().map((e,t,n)=>t===n.length-1?(0,X.jsx)(V,{variant:`h5`,color:`text.primary`,children:O[e]?.label},e):(0,X.jsx)(V,{variant:`h5`,color:`inherit`,role:`button`,tabIndex:0,onClick:()=>a(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),a(e))},sx:{cursor:`pointer`,"&:hover":{textDecoration:`underline`}},children:O[e]?.label},e))})]})}),(0,X.jsx)(P,{sx:{flex:1,display:`flex`,minHeight:0},children:(0,X.jsx)(P,{sx:{flex:1,display:`flex`,flexDirection:`column`,py:8,px:20,mx:i===$.USER_DETAILS?0:`auto`,alignItems:`flex-start`},children:(0,X.jsxs)(P,{sx:{width:`100%`,maxWidth:800,display:`flex`,flexDirection:`column`},children:[f&&(0,X.jsx)(T,{severity:`error`,sx:{my:3},onClose:()=>p(null),children:f}),r.error&&(0,X.jsx)(T,{severity:`error`,sx:{mb:3},children:(0,X.jsx)(V,{variant:`body2`,sx:{fontWeight:`bold`,mb:.5},children:r.error.message})}),oe(),(0,X.jsxs)(W,{direction:`row`,justifyContent:`flex-end`,alignItems:`center`,spacing:2,sx:{mt:4},children:[i!==$.USER_TYPE&&(0,X.jsx)(L,{variant:`text`,onClick:U,disabled:r.isPending,children:e(`common:actions.back`)}),(0,X.jsx)(L,{variant:`contained`,disabled:!ee[i]||r.isPending||i===$.USER_TYPE&&!!o?.ouId&&y,sx:{minWidth:140},onClick:ae,children:de?r.isPending?e(`common:status.saving`):e(`users:createUser.title`):e(`common:actions.continue`)})]})]})})})]}),(0,X.jsx)(le,{open:j,autoHideDuration:6e3,onClose:ue,anchorOrigin:{vertical:`top`,horizontal:`right`},children:(0,X.jsx)(T,{onClose:ue,severity:`error`,sx:{width:`100%`},children:k})})]})}function gr({children:e=null,value:t,index:n,...r}){return(0,X.jsx)(`div`,{role:`tabpanel`,hidden:t!==n,id:`user-tabpanel-${n}`,"aria-labelledby":`user-tab-${n}`,...r,children:t===n&&(0,X.jsx)(P,{sx:{py:3},children:e})})}function _r(){let e=Ge(),{t}=K(),n=je(`UserEditPage`),{resolveDisplayName:r}=Pe({handlers:{t}}),{userId:i}=Ke(),[a,o]=(0,Y.useState)(0),[s,c]=(0,Y.useState)(!1),[l,u]=(0,Y.useState)(!1),[d,f]=(0,Y.useState)(!1),[p,m]=(0,Y.useState)(null),h=(0,Y.useRef)(null),{data:g,isLoading:_,error:v}=Nn(i),y=Ln(),{data:b}=In(),x=(0,Y.useMemo)(()=>{if(!(!g?.type||!b?.types))return b.types.find(e=>e.name===g.type)},[g?.type,b?.types]),S=x?.id,C=x?.ouId?.trim(),w=C===``?void 0:C,{data:D,isLoading:O,error:A}=Fn(S),M=(0,Y.useMemo)(()=>D?.schema?Object.entries(D.schema).some(([,e])=>!((e.type===`string`||e.type===`number`)&&e.credential)):!1,[D]),N=g?.display??g?.id??``,{control:F,handleSubmit:ne,setValue:re,formState:{errors:B}}=Ye({defaultValues:{}});(0,Y.useEffect)(()=>{g?.attributes&&D?.schema&&Object.entries(g.attributes).forEach(([e,t])=>{re(e,t)})},[g,D,re]),(0,Y.useEffect)(()=>()=>{h.current&&clearTimeout(h.current)},[]);let ie=(0,Y.useCallback)(async(e,t)=>{await navigator.clipboard.writeText(e),m(t),h.current&&clearTimeout(h.current),h.current=setTimeout(()=>{m(null)},2e3)},[]),H=(e,t)=>{o(t)},ae=async e=>{let t=w??g?.ouId;if(!(!i||!t||!g?.type))try{u(!0);let n={ouId:t,type:g.type,attributes:e};await y.mutateAsync({userId:i,data:n}),c(!1)}catch(e){n.error(`Failed to update user`,{error:e})}finally{u(!1)}},oe=()=>{c(!1),y.reset(),g?.attributes&&D?.schema&&Object.entries(g.attributes).forEach(([e,t])=>{re(e,t)})},se=async()=>{await e(`/users`)},ce=()=>{(async()=>{await e(`/users`)})().catch(e=>{n.error(`Failed to navigate after deleting user`,{error:e})})};if(_||O)return(0,X.jsx)(Me,{});if(v??A)return(0,X.jsxs)(xe,{children:[(0,X.jsx)(T,{severity:`error`,sx:{mb:2},children:v?.message??A?.message??`Failed to load user information`}),(0,X.jsx)(L,{onClick:()=>{se().catch(()=>null)},startIcon:(0,X.jsx)(de,{size:16}),children:t(`users:manageUser.back`)})]});if(!g)return(0,X.jsxs)(xe,{children:[(0,X.jsx)(T,{severity:`warning`,sx:{mb:2},children:t(`users:manageUser.notFound`,`User not found`)}),(0,X.jsx)(L,{onClick:()=>{se().catch(()=>null)},startIcon:(0,X.jsx)(de,{size:16}),children:t(`users:manageUser.back`)})]});let le=g.attributes?.picture;return(0,X.jsxs)(xe,{children:[g.isReadOnly&&(0,X.jsx)(T,{severity:`info`,sx:{mb:2},children:t(`common:messages.readOnlyResource`,`This resource is read-only and cannot be modified.`)}),(0,X.jsxs)(be,{children:[(0,X.jsx)(be.BackButton,{component:(0,X.jsx)(qe,{to:`/users`}),children:t(`users:manageUser.back`,`Back to Users`)}),(0,X.jsx)(be.Avatar,{children:(0,X.jsx)(We,{value:le,fallback:Oe(N),size:55})}),(0,X.jsx)(be.Header,{children:(0,X.jsx)(V,{variant:`h3`,children:N})}),(0,X.jsx)(be.SubHeader,{children:(0,X.jsx)(W,{direction:`row`,alignItems:`center`,spacing:1,children:(0,X.jsx)(E,{label:g.type,size:`small`,sx:{px:.5}})})})]}),(0,X.jsx)(te,{value:a,onChange:H,"aria-label":`user settings tabs`,children:(0,X.jsx)(ee,{label:t(`users:manageUser.tabs.general`,`General`),id:`user-tab-0`,"aria-controls":`user-tabpanel-0`,sx:{textTransform:`none`}})}),(0,X.jsx)(X.Fragment,{children:(0,X.jsx)(gr,{value:a,index:0,children:(0,X.jsxs)(W,{spacing:3,children:[(0,X.jsx)(lr,{user:g,copiedField:p,onCopyToClipboard:ie}),(0,X.jsx)(Ee,{title:t(`users:manageUser.sections.attributes.title`,`User Attributes`),description:t(`users:manageUser.sections.attributes.description`,`View and manage user attribute values.`),headerAction:!s&&M&&!g.isReadOnly?(0,X.jsx)(L,{variant:`outlined`,size:`small`,onClick:()=>c(!0),children:t(`common:actions.edit`,`Edit`)}):void 0,children:s?(0,X.jsxs)(P,{component:`form`,onSubmit:e=>{ne(ae)(e).catch(()=>null)},noValidate:!0,sx:{display:`flex`,flexDirection:`column`,gap:2},children:[D?.schema?Object.entries(D.schema).filter(([,e])=>!((e.type===`string`||e.type===`number`)&&e.credential)).map(([e,t])=>or(e,t,F,B,r)):(0,X.jsx)(V,{variant:`body2`,color:`text.secondary`,children:t(`users:manageUser.sections.attributes.noSchema`,`No schema available for editing`)}),y.error&&(0,X.jsx)(T,{severity:`error`,sx:{mt:2},children:(0,X.jsx)(V,{variant:`body2`,sx:{fontWeight:`bold`,mb:.5},children:y.error.message})}),(0,X.jsxs)(W,{direction:`row`,spacing:2,justifyContent:`flex-end`,sx:{mt:2},children:[(0,X.jsx)(L,{variant:`outlined`,onClick:oe,disabled:l,startIcon:(0,X.jsx)(Ce,{size:16}),children:t(`common:actions.cancel`,`Cancel`)}),(0,X.jsx)(L,{type:`submit`,variant:`contained`,startIcon:l?null:(0,X.jsx)(fe,{size:16}),disabled:l,children:l?t(`common:status.saving`,`Saving...`):t(`common:actions.save`,`Save Changes`)})]})]}):(0,X.jsx)(W,{spacing:2,children:g.attributes&&Object.keys(g.attributes).length>0?Object.entries(g.attributes).map(([e,n])=>{let i;i=n==null?`-`:typeof n==`boolean`?t(n?`common:actions.yes`:`common:actions.no`):Array.isArray(n)?n.join(`, `):typeof n==`object`?JSON.stringify(n):typeof n==`string`||typeof n==`number`?String(n):`-`;let a=D?.schema?.[e],o=e;return a?.displayName&&(o=r(a.displayName)||e),(0,X.jsxs)(P,{children:[(0,X.jsx)(V,{variant:`caption`,color:`text.secondary`,children:o}),(0,X.jsx)(V,{variant:`body1`,children:i})]},e)}):(0,X.jsx)(V,{variant:`body2`,color:`text.secondary`,children:t(`users:manageUser.sections.attributes.empty`,`No attributes available`)})})}),(0,X.jsx)(Ee,{title:t(`users:manageUser.sections.organizationUnit.title`,`Organization Unit`),description:t(`users:manageUser.sections.organizationUnit.description`,`The organization unit this user belongs to.`),children:(0,X.jsxs)(W,{spacing:2,children:[(0,X.jsxs)(k,{fullWidth:!0,children:[(0,X.jsx)(U,{htmlFor:`ou-handle-input`,children:t(`users:manageUser.sections.organizationUnit.handleLabel`,`Handle`)}),(0,X.jsx)(R,{id:`ou-handle-input`,value:g.ouHandle??`-`,fullWidth:!0,size:`small`,slotProps:{input:{readOnly:!0,endAdornment:g.ouHandle?(0,X.jsx)(j,{position:`end`,children:(0,X.jsx)(I,{title:p===`ouHandle`?t(`common:actions.copied`):t(`users:manageUser.sections.organizationUnit.copyHandle`,`Copy Organization Unit Handle`),children:(0,X.jsx)(z,{"aria-label":t(`users:manageUser.sections.organizationUnit.copyHandle`,`Copy Organization Unit Handle`),onClick:()=>{ie(g.ouHandle,`ouHandle`).catch(()=>null)},edge:`end`,children:p===`ouHandle`?(0,X.jsx)(he,{size:16}):(0,X.jsx)(_e,{size:16})})})}):void 0}},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]}),(0,X.jsxs)(k,{fullWidth:!0,children:[(0,X.jsx)(U,{htmlFor:`ou-id-input`,children:t(`users:manageUser.sections.organizationUnit.idLabel`,`ID`)}),(0,X.jsx)(R,{id:`ou-id-input`,value:g.ouId,fullWidth:!0,size:`small`,slotProps:{input:{readOnly:!0,endAdornment:(0,X.jsx)(j,{position:`end`,children:(0,X.jsx)(I,{title:p===`ouId`?t(`common:actions.copied`):t(`users:manageUser.sections.organizationUnit.copyId`,`Copy Organization Unit ID`),children:(0,X.jsx)(z,{"aria-label":t(`users:manageUser.sections.organizationUnit.copyId`,`Copy Organization Unit ID`),onClick:()=>{ie(g.ouId,`ouId`).catch(()=>null)},edge:`end`,children:p===`ouId`?(0,X.jsx)(he,{size:16}):(0,X.jsx)(_e,{size:16})})})})}},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]})]})}),!g.isReadOnly&&(0,X.jsxs)(Ee,{title:t(`users:manageUser.sections.dangerZone.title`,`Danger Zone`),description:t(`users:manageUser.sections.dangerZone.description`,`Irreversible and destructive actions.`),children:[(0,X.jsx)(V,{variant:`h6`,gutterBottom:!0,color:`error`,children:t(`users:manageUser.sections.dangerZone.deleteUser`,`Delete User`)}),(0,X.jsx)(V,{variant:`body2`,color:`text.secondary`,sx:{mb:3},children:t(`users:manageUser.sections.dangerZone.deleteUserDescription`,`Once deleted, this user cannot be recovered. All associated data will be permanently removed.`)}),(0,X.jsx)(L,{variant:`contained`,color:`error`,onClick:()=>f(!0),children:t(`common:actions.delete`,`Delete`)})]})]})})}),(0,X.jsx)(Wn,{open:d,userId:i??null,onClose:()=>f(!1),onSuccess:ce})]})}function vr(e,t,n){let r=e.find(e=>(String(e.type)===String(f.Text)||e.type===`TEXT`)&&e.variant===`HEADING_1`&&typeof e.label==`string`);return r&&typeof r.label==`string`?n(t(r.label)??r.label):``}var yr=`FLM-1003`;function br(e){return e?.toLowerCase().includes(`flow not found`)??!1}function xr(e){if(!e||typeof e!=`object`)return!1;let t=e,{response:n}=t,r=n?.data;return r?.code===yr||t.code===yr||t.error?.code===yr||br(r?.message)||br(r?.description)||br(t.message)||br(t.error?.message?.defaultValue)||br(t.error?.description?.defaultValue)}var Sr=e=>{if(typeof e==`string`)return e;if(typeof e==`object`&&e&&`value`in e){let{value:t}=e;return typeof t==`string`?t:JSON.stringify(t??e)}return JSON.stringify(e)};function Cr(e){return e.some(e=>e.ref!=null||e.eventType!=null||Array.isArray(e.components)&&Cr(e.components))}var wr=e=>{if(typeof e==`string`)return e;if(typeof e==`object`&&e&&`label`in e){let{label:t}=e;return typeof t==`string`?t:JSON.stringify(t??e)}return JSON.stringify(e)};function Tr({renderProps:e,flowError:t,handleClose:n,onResetLocalState:r}){let{additionalData:i,values:a,error:o,isLoading:s,components:c,handleInputChange:l,handleSubmit:u,resetFlow:p,isValid:m}=e,{resolveFlowTemplateLiterals:h}=_(),g=(0,Y.useCallback)(e=>e?h(e):void 0,[h]),{t:v}=K(),[y,b]=(0,Y.useState)(null),x=(0,Y.useMemo)(()=>e=>{let t={},n=e=>{e.forEach(e=>{if((String(e.type)===String(f.Block)||e.type===`BLOCK`)&&e.components)n(e.components);else if((String(e.type)===String(f.TextInput)||e.type===`TEXT_INPUT`||e.type===`EMAIL_INPUT`||e.type===`PHONE_INPUT`||e.type===`PASSWORD_INPUT`||e.type===`SELECT`||e.type===`OU_SELECT`)&&e.ref){let n=Je();e.type===`EMAIL_INPUT`?n=Je().email(`Please enter a valid email address`):e.type===`PHONE_INPUT`?n=Je().regex(/^\+?[0-9\s\-().]{7,20}$/,`Please enter a valid phone number`):e.type===`PASSWORD_INPUT`&&(n=Je());let r=typeof e.label==`string`?e.label:e.ref;n=e.required?n.min(1,`${v(g(r)??r)??e.ref} is required`):n.optional(),t[e.ref]=n}})};return n(e),Xe(t)},[v,g]),S=(0,Y.useMemo)(()=>c?.length?x(c):Xe({}),[c,x]),C=(e,t,n,r,a,o)=>{let{type:s,ref:c,label:l,placeholder:u,required:d,options:p,hint:m}=e;if(!c)return null;let h=typeof l==`string`?l:``,_=typeof u==`string`?u:``;return String(s)===String(f.TextInput)||s===`TEXT_INPUT`?(0,X.jsxs)(k,{required:d,children:[(0,X.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,X.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,X.jsx)(R,{...e,fullWidth:!0,size:`small`,id:c,type:`text`,placeholder:g(_)??_,autoComplete:`off`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`EMAIL_INPUT`?(0,X.jsxs)(k,{required:d,children:[(0,X.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,X.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1,pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:`Please enter a valid email address`}},render:({field:e})=>(0,X.jsx)(R,{...e,fullWidth:!0,size:`small`,id:c,type:`email`,placeholder:g(_)??_,autoComplete:`email`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`PHONE_INPUT`?(0,X.jsxs)(k,{required:d,children:[(0,X.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,X.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,X.jsx)(R,{...e,fullWidth:!0,size:`small`,id:c,type:`tel`,placeholder:g(_)??_,autoComplete:`tel`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`PASSWORD_INPUT`?(0,X.jsxs)(k,{required:d,children:[(0,X.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,X.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,X.jsx)(Un,{id:c,name:e.name,value:e.value??``,placeholder:g(_)??_,required:d??!1,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,ariaLabel:g(h)??h,onChange:t=>{e.onChange(t),o(c,t.target.value)},onBlur:e.onBlur,inputRef:e.ref})})]},e.id??t):s===`OU_SELECT`?(0,X.jsxs)(k,{fullWidth:!0,required:d,children:[(0,X.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,X.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,X.jsx)(ir,{value:e.value??``,onChange:t=>{e.onChange(t),o(c,t)},rootOuId:i?.rootOuId})}),r[c]&&(0,X.jsx)(V,{variant:`caption`,color:`error`,children:r[c]?.message})]},e.id??t):s===`SELECT`&&p?(0,X.jsxs)(k,{fullWidth:!0,required:d,children:[(0,X.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,X.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(ce,{...e,value:e.value??``,displayEmpty:!0,size:`small`,id:c,required:d,fullWidth:!0,disabled:a,error:!!r[c],onChange:t=>{e.onChange(t),o(c,String(t.target.value))},renderValue:e=>{if(!e||e===``)return(0,X.jsx)(V,{sx:{color:`text.secondary`},children:g(_)??`Select an option`});let t=p.find(t=>Sr(t)===e);return t?wr(t):String(e)},children:[(0,X.jsx)(B,{value:``,disabled:!0,children:g(_)??`Select an option`}),p.map(e=>(0,X.jsx)(B,{value:Sr(e),children:wr(e)},Sr(e)))]}),r[c]&&(0,X.jsx)(V,{variant:`caption`,color:`error.main`,sx:{mt:.5},children:r[c]?.message}),m&&(0,X.jsx)(V,{variant:`caption`,color:`text.secondary`,children:m})]})})]},e.id??t):null},{control:w,formState:{errors:E,isValid:A},reset:j,setValue:M}=Ye({resolver:Ze(S),mode:`onChange`,defaultValues:a??{}});if((0,Y.useEffect)(()=>{!c?.length&&Object.keys(a??{}).length===0&&j({})},[c,a,j]),(0,Y.useEffect)(()=>{let e=i?.rootOuId;if(!e||!c?.length)return;let t=e=>{for(let n of e){if(n.type===`OU_SELECT`&&n.ref)return n.ref;if(n.components){let e=t(n.components);if(e)return e}}return null},n=t(c);n&&!a?.[n]&&(M(n,e,{shouldValidate:!0}),l(n,e))},[i,c,a,M,l]),s&&!c?.length)return(0,X.jsx)(Me,{});if(o&&!c?.length)return(0,X.jsxs)(P,{children:[(0,X.jsxs)(T,{severity:`error`,sx:{mb:2},children:[(0,X.jsx)(O,{children:v(`users:errors.failed.title`,`Error`)}),o.message??v(`users:errors.failed.description`,`An error occurred.`)]}),(0,X.jsx)(P,{sx:{display:`flex`,justifyContent:`flex-end`},children:(0,X.jsx)(L,{variant:`outlined`,onClick:n,children:v(`common:actions.close`,`Close`)})})]});if(!c?.length)return(0,X.jsx)(Me,{});let N=Cr(c);return(0,X.jsxs)(X.Fragment,{children:[(t??o)&&(0,X.jsxs)(T,{severity:`error`,sx:{mb:2},children:[(0,X.jsx)(O,{children:v(`users:errors.failed.title`,`Error`)}),t??o?.message??v(`users:errors.failed.description`,`An error occurred.`)]}),(0,X.jsx)(W,{direction:`column`,spacing:4,children:c.map((e,t)=>{if(String(e.type)===String(f.Text)||e.type===`TEXT`){let n=typeof e.variant==`string`?e.variant:void 0,r=typeof e.label==`string`?e.label:``,i=typeof e.align==`string`?e.align:void 0;return n===`HEADING_1`?(0,X.jsx)(V,{variant:`h1`,gutterBottom:!0,textAlign:i,children:g(r)??r},e.id??t):(0,X.jsx)(V,{variant:n===`HEADING_2`?`h2`:`body1`,color:`text.secondary`,textAlign:i,children:g(r)??r},e.id??t)}if(e.type===`COPYABLE_TEXT`)return(0,X.jsx)(Be,{component:e,resolve:g,additionalData:i},e.id??t);if(String(e.type)===String(f.Block)||e.type===`BLOCK`){let n=e.components??[],r=e=>(String(e.type)===String(f.Action)||e.type===`ACTION`)&&(String(e.eventType)===String(d.Submit)||e.eventType===`SUBMIT`),i=n.filter(r),o=n.flatMap(e=>e.type===`STACK`?(e.components??[]).filter(r):[]),c=i[0]??o[0];if(!c)return null;let p=s||!A||m!==void 0&&!m;return(0,X.jsx)(P,{component:`form`,onSubmit:e=>{e.preventDefault(),p||u(c,a).catch(()=>void 0)},noValidate:!0,sx:{display:`flex`,flexDirection:`column`,width:`100%`,gap:2},children:n.map((e,t)=>{let n=C(e,t,w,E,s,l);if(n)return n;if(e.type===`STACK`){let n=(e.components??[]).filter(r);return(0,X.jsx)(W,{direction:e.direction??`row`,spacing:2,justifyContent:e.justify??`center`,flexWrap:`wrap`,sx:{mt:2},children:n.map((e,t)=>{let n=e.id??String(t),r=typeof e.label==`string`?e.label:``,i=s&&y===n;return(0,X.jsx)(L,{type:`button`,variant:e.variant===`PRIMARY`?`contained`:`outlined`,disabled:p,sx:{px:4,py:1.5},onClick:()=>{p||(b(n),u(e,a).catch(()=>void 0))},children:i?(0,X.jsx)(D,{size:16,color:`inherit`}):g(r)??r},n)})},e.id??t)}if(!r(e))return null;let i=typeof e.label==`string`?e.label:``;return(0,X.jsx)(W,{direction:`row`,spacing:2,justifyContent:`flex-end`,sx:{mt:4},children:(0,X.jsx)(L,{type:`button`,variant:e.variant===`PRIMARY`?`contained`:`outlined`,disabled:p,sx:{minWidth:140},onClick:()=>{p||u(e,a).catch(()=>void 0)},children:s?(0,X.jsx)(D,{size:20,color:`inherit`}):g(i)??i})},e.id??t)})},e.id??t)}return null})}),!N&&(0,X.jsxs)(W,{direction:`row`,spacing:2,justifyContent:`center`,sx:{mt:4},children:[(0,X.jsx)(L,{variant:`outlined`,onClick:n,children:v(`common:actions.close`,`Close`)}),(0,X.jsx)(L,{variant:`contained`,onClick:()=>{p(),r()},children:v(`users:addAnother`,`Add Another User`)})]})]})}function Er(e){let t=(0,Z.c)(25),{renderProps:n,flowError:r,handleClose:i,onStepLabelChange:a,onInviteComplete:o,onOuStepDetected:s,onResetLocalState:c}=e,{resolveFlowTemplateLiterals:l}=_(),u;t[0]===l?u=t[1]:(u=e=>e?l(e):void 0,t[0]=l,t[1]=u);let d=u,{t:f}=K(),p=n.components,m;t[2]!==p||t[3]!==d||t[4]!==f?(m=p?.length?vr(p,d,f):``,t[2]=p,t[3]=d,t[4]=f,t[5]=m):m=t[5];let h=m,g=!!p?.length&&!Cr(p),v;t[6]===p?v=t[7]:(v=p?.some(Dr)??!1,t[6]=p,t[7]=v);let y=v,b,x;t[8]!==y||t[9]!==s?(b=()=>{y&&s()},x=[y,s],t[8]=y,t[9]=s,t[10]=b,t[11]=x):(b=t[10],x=t[11]),(0,Y.useEffect)(b,x);let S,C;t[12]!==h||t[13]!==a?(S=()=>{h&&a(h)},C=[h,a],t[12]=h,t[13]=a,t[14]=S,t[15]=C):(S=t[14],C=t[15]),(0,Y.useEffect)(S,C);let w,T;t[16]!==g||t[17]!==o?(w=()=>{g&&o()},T=[g,o],t[16]=g,t[17]=o,t[18]=w,t[19]=T):(w=t[18],T=t[19]),(0,Y.useEffect)(w,T);let E;return t[20]!==r||t[21]!==i||t[22]!==c||t[23]!==n?(E=(0,X.jsx)(Tr,{renderProps:n,flowError:r,handleClose:i,onResetLocalState:c}),t[20]=r,t[21]=i,t[22]=c,t[23]=n,t[24]=E):E=t[24],E}function Dr(e){return e.type===`OU_SELECT`||e.components?.some(Or)}function Or(e){return e.type===`OU_SELECT`}function kr(){let{t:e}=K(),t=Ge(),n=je(`UserInvitePage`),[r,i]=(0,Y.useState)(null),[a,o]=(0,Y.useState)([]),s=(0,Y.useRef)(``),[c,l]=(0,Y.useState)(!1),u=(0,Y.useCallback)(()=>{(async()=>{await t(`/users`)})().catch(e=>{n.error(`Failed to navigate to users page`,{error:e})})},[t,n]),d=(0,Y.useCallback)(()=>{n.info(`Falling back to manual user creation because the onboarding flow is unavailable`),(async()=>{await t(`/users/create`)})().catch(e=>{n.error(`Failed to navigate to fallback user creation page`,{error:e})})},[t,n]),f=(0,Y.useCallback)(e=>{e!==s.current&&(s.current=e,o(t=>{let n=t.indexOf(e);return n>=0?t.slice(0,n+1):[...t,e]}))},[o]),p=(0,Y.useCallback)(()=>{s.current!==`complete`&&(s.current=`complete`,o(t=>[...t,e(`users:invite.steps.complete`,`Complete`)]))},[o,e]),m=(0,Y.useCallback)(()=>{l(!0)},[]),h=(0,Y.useCallback)(()=>{o([]),s.current=``,l(!1),i(null)},[]),g=c?5:4;return(0,X.jsxs)(P,{sx:{minHeight:`100vh`,display:`flex`,flexDirection:`column`},children:[(0,X.jsx)(M,{variant:`determinate`,value:Math.min(a.length/g*100,100),sx:{height:6}}),(0,X.jsxs)(P,{sx:{flex:1,display:`flex`,flexDirection:`column`},children:[(0,X.jsx)(P,{sx:{p:4,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:(0,X.jsxs)(W,{direction:`row`,alignItems:`center`,spacing:2,children:[(0,X.jsx)(z,{"aria-label":e(`common:actions.close`,`Close`),onClick:u,sx:{bgcolor:`background.paper`,"&:hover":{bgcolor:`action.hover`},boxShadow:1},children:(0,X.jsx)(Ce,{size:24})}),(0,X.jsxs)(ne,{separator:(0,X.jsx)(pe,{size:16}),"aria-label":`breadcrumb`,children:[a.map((e,t)=>(0,X.jsx)(V,{variant:`h5`,color:t===a.length-1?`text.primary`:`inherit`,children:e},e)),a.length===0&&(0,X.jsx)(V,{variant:`h5`,color:`text.primary`,children:e(`users:addUser`,`Add User`)})]})]})}),(0,X.jsx)(P,{sx:{flex:1,display:`flex`,minHeight:0},children:(0,X.jsx)(P,{sx:{flex:1,display:`flex`,flexDirection:`column`,py:8,px:20,mx:`auto`,alignItems:`center`},children:(0,X.jsx)(P,{sx:{width:`100%`,maxWidth:800,flex:1,display:`flex`,flexDirection:`column`},children:(0,X.jsx)(Dn,{onError:e=>{if(xr(e)){d();return}n.error(`User onboarding error`,{error:e})},onFlowChange:t=>{if(xr(t)){d();return}let n=t?.error?.message?.key;if(n){let t=e(n);if(t!==n){i(t);return}}i(t?.error?.message?.defaultValue??t?.error?.description?.defaultValue??null)},children:e=>(0,X.jsx)(Er,{renderProps:e,flowError:r,handleClose:u,onStepLabelChange:f,onInviteComplete:p,onOuStepDetected:m,onResetLocalState:h})})})})})]})]})}function Ar(){let e=(0,Z.c)(7),t=Ge(),{t:n}=K(),r=je(`UsersListPage`),i;if(e[0]!==r||e[1]!==t||e[2]!==n){let a;e[4]!==r||e[5]!==t?(a=()=>{(async()=>{await t(`/users/invite`)})().catch(e=>{r.error(`Failed to navigate to add user page`,{error:e})})},e[4]=r,e[5]=t,e[6]=a):a=e[6],i=(0,X.jsxs)(xe,{children:[(0,X.jsxs)(be,{children:[(0,X.jsx)(be.Header,{children:n(`users:title`)}),(0,X.jsx)(be.SubHeader,{children:n(`users:subtitle`)}),(0,X.jsx)(be.Actions,{children:(0,X.jsx)(L,{variant:`contained`,startIcon:(0,X.jsx)(ve,{size:20}),onClick:a,children:n(`users:addUser`)})})]}),(0,X.jsx)(W,{direction:`row`,spacing:2,mb:4,flexWrap:`wrap`,useFlexGap:!0,children:(0,X.jsx)(R,{placeholder:n(`users:searchUsers`),size:`small`,sx:{flexGrow:1,minWidth:300},InputProps:{startAdornment:(0,X.jsx)(j,{position:`start`,children:(0,X.jsx)(me,{size:16})})}})}),(0,X.jsx)(Gn,{})]}),e[0]=r,e[1]=t,e[2]=n,e[3]=i}else i=e[3];return i}export{jn as C,et as D,ot as E,Qe as O,Nn as S,On as T,Vn as _,mr as a,Fn as b,dr as c,sr as d,or as f,Un as g,Wn as h,hr as i,lr as l,Gn as m,kr as n,pr as o,ar as p,_r as r,$ as s,Ar as t,cr as u,Ln as v,kn as w,Pn as x,In as y};