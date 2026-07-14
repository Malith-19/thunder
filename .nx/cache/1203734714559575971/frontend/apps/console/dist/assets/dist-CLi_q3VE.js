import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{A as t,D as n,E as r,F as i,J as a,K as o,O as s,Q as c,U as l,W as u,X as d,et as f,g as p,h as m,p as h,q as g,r as _,t as v,v as y,x as b}from"./useThunderID-Bvz8PnCN.js";import{t as x}from"./useQuery-DYWE3pa_.js";import{_ as S,n as C,r as w,t as T}from"./vendor-emotion-BJbDtNae.js";import{At as E,Ct as D,Nt as O,Ot as k,Q as A,Sn as j,U as M,V as N,X as P,_ as ee,_t as F,a as te,at as I,b as L,gt as ne,ht as R,i as z,it as re,jt as B,k as V,kt as H,nn as ie,nt as ae,ot as oe,q as U,rt as se,ut as ce,w as le,x as ue,y as W}from"./vendor-mui-DfBexhDa.js";import{Dx as de,UA as fe,Uc as pe,XT as me,_c as he,cE as ge,d as _e,fC as ve,ju as ye,kx as be,m as xe,p as Se,pd as Ce,q as we,ur as Te}from"./vendor-oxygen-DFNgTxPQ.js";import{i as Ee,n as De,r as Oe,t as ke}from"./getInitials-BpS93xXW.js";import{i as Ae,r as G}from"./dist-C1_-3XjN.js";import{n as je}from"./vendor-react-BRrCN599.js";import{i as Me}from"./useLogger-DgvtF-BW-CNR9g72n.js";import{t as Ne}from"./PageLoadingAnimation-CVoCdtHm.js";import{t as K}from"./vendor-i18n-CV5imxpN.js";import{n as Pe,r as Fe}from"./dist-mirMQsjX.js";import{C as Ie,D as Le,E as Re,O as q,S as ze,T as Be,i as Ve,w as He,x as Ue}from"./dist-DkjPoP7P.js";import{t as We}from"./purify.es-C0DBpM5B.js";import{t as Ge}from"./ResourceAvatar-BaWxNqpA.js";import{c as Ke,l as qe,n as Je}from"./chunk-4N6VE7H7--bPOxL5U.js";import{a as Ye,c as Xe,i as Ze,o as Qe,s as J}from"./schemas-DAq7cNL2.js";var Y=je(),X=e(S(),1),$e=(0,X.createContext)({}),et=(0,X.createContext)(void 0),tt=e=>{let n=(0,X.useContext)(_),r=(0,X.useContext)(et)?.i18n;if(!n)throw Error(`useTranslation must be used within an I18nProvider. Make sure your component is wrapped with ThunderIDProvider which includes I18nProvider.`);let i=e??r,{t:a,currentLanguage:o,setLanguage:s,bundles:c,fallbackLanguage:l}=n,u=(0,X.useMemo)(()=>{if(!i?.bundles)return c;let e={};return Object.entries(c).forEach(([t,n])=>{e[t]=n}),Object.entries(i.bundles).forEach(([n,r])=>{let i=g(r.translations);e[n]?e[n]={...e[n],metadata:r.metadata?{...e[n].metadata,...r.metadata}:e[n].metadata,translations:t(e[n].translations,i)}:e[n]={...r,translations:i}}),e},[c,i?.bundles]),d=(0,X.useMemo)(()=>i?.bundles?(e,t)=>{let n,r=u[o];if(r?.translations?.[e]&&(n=r.translations[e]),!n&&o!==l){let t=u[l];t?.translations?.[e]&&(n=t.translations[e])}return n||=e,t&&Object.keys(t).length>0?Object.entries(t).reduce((e,[t,n])=>e.replace(RegExp(`\\{${t}\\}`,`g`),String(n)),n):n}:a,[u,o,l,a,i?.bundles]);return{availableLanguages:Object.keys(u),currentLanguage:o,setLanguage:s,t:d}},nt=(e,t,n,r)=>(0,X.useMemo)(()=>{let t=r||e.vars.colors.primary.main,i={large:`32px`,medium:`20px`,small:`16px`},a=i[n],o=T`
      width: ${a};
      height: ${a};
      border: 2px solid transparent;
      border-top: 2px solid ${t};
      border-radius: 50%;
      animation: ${w`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `} 1s linear infinite;
      display: inline-block;
    `,s=T`
      width: ${i.small};
      height: ${i.small};
    `,c=T`
      width: ${i.medium};
      height: ${i.medium};
    `;return{spinner:o,spinnerLarge:T`
      width: ${i.large};
      height: ${i.large};
    `,spinnerMedium:c,spinnerSmall:s}},[e,t,n,r]),Z=j(),rt=e=>{let t=(0,Y.c)(7),{size:n,color:i,className:a,style:o}=e,s=n===void 0?`medium`:n,{theme:c,colorScheme:l}=q(),u;if(t[0]!==a||t[1]!==i||t[2]!==l||t[3]!==s||t[4]!==o||t[5]!==c){let e=nt(c,l,s,i);u=(0,Z.jsx)(`span`,{className:C(d(r(`spinner`)),e.spinner,s===`small`&&e.spinnerSmall,s===`medium`&&e.spinnerMedium,s===`large`&&e.spinnerLarge,a),style:o,role:`status`,"aria-label":`Loading`}),t[0]=a,t[1]=i,t[2]=l,t[3]=s,t[4]=o,t[5]=c,t[6]=u}else u=t[6];return u},it=(e,t,n,r,i,a,o,s,c=`square`)=>(0,X.useMemo)(()=>{let t={large:`calc(${e.vars.spacing.unit} * 5)`,medium:`calc(${e.vars.spacing.unit} * 4)`,small:`calc(${e.vars.spacing.unit} * 3)`},l=t[i]||t.medium,u=T`
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
    `,d={large:T`
        ${r===`icon`?`font-size: ${e.vars.typography.fontSizes.lg};`:`padding: calc(${e.vars.spacing.unit} * 1.5) calc(${e.vars.spacing.unit} * 3);
             font-size: ${e.vars.typography.fontSizes.lg};
             min-height: calc(${e.vars.spacing.unit} * 5);`}
      `,medium:T`
        ${r===`icon`?`font-size: ${e.vars.typography.fontSizes.md};`:`padding: calc(${e.vars.spacing.unit} * 1) calc(${e.vars.spacing.unit} * 2);
             font-size: ${e.vars.typography.fontSizes.md};
             min-height: calc(${e.vars.spacing.unit} * 4);`}
      `,small:T`
        ${r===`icon`?`font-size: ${e.vars.typography.fontSizes.sm};`:`padding: calc(${e.vars.spacing.unit} * 0.5) calc(${e.vars.spacing.unit} * 1);
             font-size: ${e.vars.typography.fontSizes.sm};
             min-height: calc(${e.vars.spacing.unit} * 3);`}
      `},f={"primary-icon":T`
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
      `,"primary-outline":T`
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
      `,"primary-solid":T`
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
      `,"primary-text":T`
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
      `,"secondary-icon":T`
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
      `,"secondary-outline":T`
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
      `,"secondary-solid":T`
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
      `,"secondary-text":T`
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
      `,"tertiary-icon":T`
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
      `,"tertiary-outline":T`
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
      `,"tertiary-solid":T`
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
      `,"tertiary-text":T`
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
      `},p=T`
      display: flex;
      align-items: center;
      justify-content: center;
    `,m=T`
      display: flex;
      align-items: center;
      justify-content: center;
    `;return{button:u,content:T`
      display: flex;
      align-items: center;
      justify-content: center;
    `,endIcon:m,fullWidth:a?T`
            width: 100%;
          `:null,icon:m,loading:s?T`
            pointer-events: none;
          `:null,shape:c===`round`?T`
              border-radius: 50%;
            `:null,size:d[i],spinner:p,startIcon:m,variant:f[`${n}-${r}`]||f[`primary-solid`]}},[e,t,n,r,i,a,o,s]),at=(e,t)=>e===`small`?`calc(${t} * 1.5)`:e===`medium`?`calc(${t} * 2)`:`calc(${t} * 2.5)`,ot=(0,X.forwardRef)(({color:e=`primary`,variant:t=`solid`,size:n=`medium`,fullWidth:i=!1,loading:a=!1,startIcon:o,endIcon:s,children:c,className:l,disabled:u,style:f,shape:p=`square`,...m},h)=>{let{theme:g,colorScheme:_}=q(),v=it(g,_,e,t,n,i,u||!1,a,p),y=t===`icon`,b=at(n,g.vars.spacing.unit);return(0,Z.jsxs)(`button`,{ref:h,style:f,className:C(d(r(`button`)),d(r(`button`,t)),d(r(`button`,e)),d(r(`button`,n)),d(r(`button`,p)),i?d(r(`button`,`fullWidth`)):void 0,a?d(r(`button`,`loading`)):void 0,u||a?d(r(`button`,`disabled`)):void 0,v.button,v.size,v.variant,v.fullWidth,v.loading,v.shape,l),disabled:u||a,...m,children:[a&&(0,Z.jsx)(`span`,{className:C(d(r(`button`,`spinner`)),v.spinner),children:(0,Z.jsx)(rt,{size:n,color:`currentColor`,style:{height:b,width:b}})}),!a&&y&&(0,Z.jsx)(`span`,{className:C(d(r(`button`,`icon`)),v.icon),children:c||o||s}),!a&&!y&&o&&(0,Z.jsx)(`span`,{className:C(d(r(`button`,`start-icon`)),v.startIcon),children:o}),!y&&c&&(0,Z.jsx)(`span`,{className:C(d(r(`button`,`content`)),v.content),children:c}),!a&&!y&&s&&(0,Z.jsx)(`span`,{className:C(d(r(`button`,`end-icon`)),v.endIcon),children:s})]})});ot.displayName=`Button`;var st=ot,ct=(e,t,n,r)=>(0,X.useMemo)(()=>{let t=T`
      display: flex;
      align-items: center;
    `,i=T`
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
    `,a=T`
      accent-color: ${e.vars.colors.error.main};

      &:focus {
        outline-color: ${e.vars.colors.error.main};
      }
    `,o=T`
      color: ${e.vars.colors.text.primary};
      font-size: ${e.vars.typography.fontSizes.sm};
      font-family: ${e.vars.typography.fontFamily};
      cursor: pointer;

      &:hover {
        color: ${e.vars.colors.text.primary};
      }
    `,s=T`
      color: ${e.vars.colors.error.main};
    `,c=T`
      /* Required indicator styles will be handled by InputLabel */
    `;return{container:t,errorInput:n?a:``,errorLabel:n?s:``,input:i,label:o,required:r?c:``}},[e,t,n,r]),lt=({label:e,error:t,className:n,required:i,helperText:a,style:o={},...s})=>{let{theme:c,colorScheme:l}=q(),u=!!t,f=ct(c,l,u,!!i);return(0,Z.jsx)(Re,{error:t,helperText:a,className:C(d(r(`checkbox`)),n),helperTextMarginLeft:`calc(${c.vars.spacing.unit} * 3.5)`,children:(0,Z.jsxs)(`div`,{style:o,className:C(d(r(`checkbox`,`container`)),f.container),children:[(0,Z.jsx)(`input`,{type:`checkbox`,className:C(d(r(`checkbox`,`input`)),f.input,f.errorInput,{[d(r(`checkbox`,`input`,`error`))]:u}),"aria-invalid":u,"aria-required":i,...s}),e&&(0,Z.jsx)(Be,{required:i,error:u,variant:`inline`,className:C(d(r(`checkbox`,`label`)),f.label,f.errorLabel,{[d(r(`checkbox`,`label`,`error`))]:u}),children:e})]})})},ut=(e,t,n,r)=>(0,X.useMemo)(()=>{let t=T`
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
    `,i=T`
      border-color: ${e.vars.colors.error.main};

      &:focus {
        border-color: ${e.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${e.vars.colors.error.main};
      }
    `,a=T`
      background-color: ${e.vars.colors.background.disabled};
      color: ${e.vars.colors.text.secondary};
      cursor: not-allowed;
      opacity: 0.6;

      &:hover,
      &:focus {
        border-color: ${e.vars.colors.border};
        box-shadow: none;
      }
    `,o=T`
      /* Label styles will be handled by InputLabel component */
    `;return{disabledInput:r?a:``,errorInput:n?i:``,input:t,label:o}},[e,t,n,r]),dt=({label:e,error:t,className:n,required:i,disabled:a,helperText:o,dateFormat:s=`yyyy-MM-dd`,style:c={},...l})=>{let{theme:u,colorScheme:f}=q(),p=!!t,m=ut(u,f,p,!!a);return(0,Z.jsxs)(Re,{error:t,helperText:o,className:C(d(r(`date-picker`)),n),style:c,children:[e&&(0,Z.jsx)(Be,{required:i,error:p,className:C(d(r(`date-picker`,`label`)),m.label),children:e}),(0,Z.jsx)(`input`,{type:`date`,pattern:`\\d{4}-\\d{2}-\\d{2}`,placeholder:s,className:C(d(r(`date-picker`,`input`)),m.input,m.errorInput,m.disabledInput,{[d(r(`date-picker`,`input`,`error`))]:p,[d(r(`date-picker`,`input`,`disabled`))]:a}),disabled:a,"aria-invalid":p,"aria-required":i,...l})]})},ft=(e,t,n,r,i)=>(0,X.useMemo)(()=>{let t=T`
      display: flex;
      gap: ${e.vars.spacing.unit};
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    `,i=T`
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
    `,a=T`
      border-color: ${e.vars.colors.error.main};

      &:focus {
        border-color: ${e.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.error.main}20;
      }
    `;return{input:i,inputContainer:t,inputDisabled:T`
      background-color: ${e.vars.colors.background.disabled};
      cursor: not-allowed;
      opacity: 0.6;
    `,inputError:a}},[e,t,n,r,i]),pt=({label:e,error:t,className:n,required:i,disabled:a,helperText:o,length:s=6,value:c=``,onChange:l,onComplete:u,type:f=`text`,placeholder:p=``,style:m={},autoFocus:h=!1,pattern:g})=>{let{theme:_,colorScheme:v}=q(),y=ft(_,v,!!a,!!t,s),[b,x]=(0,X.useState)(Array(s).fill(``)),S=(0,X.useRef)([]);(0,X.useEffect)(()=>{S.current=S.current.slice(0,s)},[s]),(0,X.useEffect)(()=>{if(c){let e=c.split(``).slice(0,s);for(;e.length<s;)e.push(``);x(e)}else x(Array(s).fill(``))},[c,s]),(0,X.useEffect)(()=>{h&&S.current[0]&&S.current[0].focus()},[h]);let w=(e,t)=>{let n=t.target.value;if(n.length>1||f===`number`&&n&&!/^\d$/.test(n)||g&&n&&!new RegExp(g).test(n))return;let r=[...b];r[e]=n,x(r);let i=r.join(``);l?.({target:{value:i}}),n&&e<s-1&&S.current[e+1]?.focus(),r.every(e=>e!==``)&&u&&u(i)},T=(e,t)=>{if(t.key===`Backspace`){if(!b[e]&&e>0){let t=[...b];t[e-1]=``,x(t),S.current[e-1]?.focus(),l?.({target:{value:t.join(``)}})}else if(b[e]){let t=[...b];t[e]=``,x(t),l?.({target:{value:t.join(``)}})}}else t.key===`ArrowLeft`&&e>0?S.current[e-1]?.focus():t.key===`ArrowRight`&&e<s-1?S.current[e+1]?.focus():t.key===`Enter`&&(t.preventDefault(),b.every(e=>e!==``)&&u&&u(b.join(``)))},E=e=>{e.preventDefault();let t=e.clipboardData.getData(`text`).slice(0,s),n=``;Array.from(t).forEach(e=>{f===`number`&&!/^\d$/.test(e)||g&&!new RegExp(g).test(e)||(n+=e)});let r=Array(s).fill(``);for(let e=0;e<Math.min(n.length,s);e+=1)r[e]=n[e];x(r),l?.({target:{value:r.join(``)}});let i=r.findIndex(e=>e===``),a=i===-1?s-1:i;S.current[a]?.focus(),r.every(e=>e!==``)&&u&&u(r.join(``))};return(0,Z.jsxs)(Re,{error:t,helperText:o,className:C(d(r(`otp-field`)),n),helperTextAlign:`center`,style:m,children:[e&&(0,Z.jsx)(Be,{required:i,error:!!t,children:e}),(0,Z.jsx)(`div`,{className:C(d(r(`otp-field`,`input-container`)),y.inputContainer),children:Array.from({length:s},(n,o)=>(0,Z.jsx)(`input`,{ref:e=>{e&&(S.current[o]=e)},type:f===`password`?`password`:`text`,inputMode:f===`number`?`numeric`:`text`,value:b[o]||``,onChange:e=>w(o,e),onKeyDown:e=>T(o,e),onPaste:E,className:C(d(r(`otp-field`,`input`)),y.input,{[d(r(`otp-field`,`input`,`error`))]:!!t,[y.inputError]:!!t,[d(r(`otp-field`,`input`,`disabled`))]:!!a,[y.inputDisabled]:!!a}),maxLength:1,placeholder:p,disabled:a,"aria-label":`${e||`OTP`} digit ${o+1}`,"aria-invalid":!!t,"aria-required":i,autoComplete:`one-time-code`},o))})]})},mt=e=>(0,Z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Z.jsx)(`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`}),(0,Z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]}),ht=e=>(0,Z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Z.jsx)(`path`,{d:`M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`}),(0,Z.jsx)(`path`,{d:`M14.084 14.158a3 3 0 0 1-4.242-4.242`}),(0,Z.jsx)(`path`,{d:`M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`}),(0,Z.jsx)(`path`,{d:`m2 2 20 20`})]}),gt=(e,t,n,r,i,a)=>(0,X.useMemo)(()=>{let t=i?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,o=a?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,s=T`
      position: relative;
      display: flex;
      align-items: center;
    `,c=T`
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
    `,l=T`
      border-color: ${e.vars.colors.error.main};

      &:focus {
        border-color: ${e.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${e.vars.colors.error.main};
      }
    `,u=T`
      background-color: ${e.vars.colors.background.disabled};
      opacity: 0.6;
      cursor: not-allowed;
    `,d=T`
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
    `,f=T`
      ${d};
      inset-inline-start: ${e.vars.spacing.unit};
    `;return{endIcon:T`
      ${d};
      inset-inline-end: ${e.vars.spacing.unit};
    `,icon:d,input:c,inputContainer:s,inputDisabled:u,inputError:l,startIcon:f}},[e,t,n,r,i,a]),_t=e=>{let{label:t,error:n,required:i,className:a,disabled:o,helperText:s,startIcon:c,endIcon:l,onStartIconClick:u,onEndIconClick:f,type:p,style:m,...h}=e,g=p===void 0?`text`:p,_=m===void 0?{}:m,{theme:v,colorScheme:y}=q(),b=!!n,x=gt(v,y,o??!1,b,!!c,!!l),S=C(d(r(`text-field`,`input`)),x.input,b&&x.inputError,o&&x.inputDisabled),w=C(d(r(`text-field`,`container`)),x.inputContainer),T=C(d(r(`text-field`,`start-icon`)),x.startIcon),E=C(d(r(`text-field`,`end-icon`)),x.endIcon);return(0,Z.jsxs)(Re,{error:n,helperText:s,className:C(d(r(`text-field`)),a),style:_,children:[t&&(0,Z.jsx)(Be,{required:i,error:b,children:t}),(0,Z.jsxs)(`div`,{className:w,children:[c&&(0,Z.jsx)(`div`,{className:T,onClick:u,role:u?`button`:void 0,tabIndex:u&&!o?0:void 0,"aria-label":`Start icon`,children:c}),(0,Z.jsx)(`input`,{className:S,type:g,disabled:o,"aria-invalid":b,"aria-required":i,...h}),l&&(0,Z.jsx)(`div`,{className:E,onClick:f,role:f?`button`:void 0,tabIndex:f&&!o?0:void 0,"aria-label":`End icon`,children:l})]})]})},vt=(e,t,n,r,i)=>(0,X.useMemo)(()=>{let t=T`
      cursor: ${r?`not-allowed`:`pointer`};
      color: ${e.vars.colors.text.secondary};
      opacity: ${r?.6:1};
      transition: color 0.2s ease;

      &:hover {
        color: ${r?e.vars.colors.text.secondary:e.vars.colors.text.primary};
      }
    `,n=T`
      color: ${e.vars.colors.primary.main};
    `;return{hiddenIcon:T`
      color: ${e.vars.colors.text.secondary};
    `,toggleIcon:t,visibleIcon:n}},[e,t,n,r,i]),yt=e=>{let t=(0,Y.c)(5),{onChange:n,className:i,disabled:a,error:o,...s}=e,{theme:c,colorScheme:l}=q(),[u,f]=(0,X.useState)(!1),p=vt(c,l,u,!!a,!!o),m;t[0]!==a||t[1]!==u?(m=()=>{a||f(!u)},t[0]=a,t[1]=u,t[2]=m):m=t[2];let h=m,g=u?ht:mt,_;return t[3]===n?_=t[4]:(_=e=>n(e.target.value),t[3]=n,t[4]=_),(0,Z.jsx)(_t,{...s,className:C(d(r(`password-field`)),i),type:u?`text`:`password`,onChange:_,autoComplete:`current-password`,disabled:a,error:o,endIcon:(0,Z.jsx)(g,{width:16,height:16,className:C(d(r(`password-field`,`toggle-icon`)),p.toggleIcon,u?p.visibleIcon:p.hiddenIcon)}),onEndIconClick:h})},bt=(e,t,n,r)=>(0,X.useMemo)(()=>{let t=`data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${e.colors.text.secondary.replace(`#`,``)}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`,i=T`
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
    `,a=T`
      border-color: ${e.vars.colors.error.main};

      &:focus {
        border-color: ${e.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${e.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${e.vars.colors.error.main};
      }
    `,o=T`
      background-color: ${e.vars.colors.background.disabled};
      opacity: 0.6;
      cursor: not-allowed;
    `;return{option:T`
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
    `,select:i,selectDisabled:o,selectError:a}},[e,t,n,r]),xt=e=>{let{label:t,error:n,className:i,required:a,disabled:o,helperText:s,placeholder:c,options:l,style:u,...f}=e,p=u===void 0?{}:u,{theme:m,colorScheme:h}=q(),g=!!n,_=bt(m,h,o??!1,g),v=C(d(r(`select`,`input`)),_.select,g&&_.selectError,o&&_.selectDisabled);return(0,Z.jsxs)(Re,{error:n,helperText:s,className:C(d(r(`select`)),i),style:p,children:[t&&(0,Z.jsx)(Be,{required:a,error:g,children:t}),(0,Z.jsxs)(`select`,{className:v,disabled:o,"aria-invalid":g,"aria-required":a,...f,children:[c&&(0,Z.jsx)(`option`,{value:``,disabled:!0,children:c}),l.map(e=>(0,Z.jsx)(`option`,{value:e.value,className:_.option,children:e.label},e.value))]})]})},St=(e,t,n=!1,r=!1)=>{if(n&&r&&(!e||e.trim()===``))return`This field is required`;if(!e||e.trim()===``)return null;switch(t){case b.Number:{let t=parseInt(e,10);if(Number.isNaN(t))return`Please enter a valid number`;break}default:break}return null},Ct=e=>{let{name:t,type:n,label:r,required:i,value:a,onChange:o,onBlur:s,disabled:c=!1,error:l,className:u,options:d=[],touched:f=!1,placeholder:p}=e,m=l||St(a,n,i,f),h={className:u,"data-testid":`thunderid-signin-${t}`,disabled:c,error:m,label:r,name:t,onBlur:s,placeholder:p,required:i,value:a};switch(n){case b.Password:return(0,Z.jsx)(yt,{...h,onChange:o});case b.Text:return(0,Z.jsx)(_t,{...h,type:`text`,onChange:e=>o(e.target.value),autoComplete:`off`});case b.Email:return(0,Z.jsx)(_t,{...h,type:`email`,onChange:e=>o(e.target.value),autoComplete:`email`});case b.Tel:return(0,Z.jsx)(_t,{...h,type:`tel`,onChange:e=>o(e.target.value),autoComplete:`tel`});case b.Date:return(0,Z.jsx)(dt,{...h,onChange:e=>o(e.target.value)});case b.Checkbox:{let e=a===`true`||a===!0;return(0,Z.jsx)(lt,{...h,checked:e,onChange:e=>o(e.target.checked.toString())})}case b.Otp:return(0,Z.jsx)(pt,{...h,onChange:e=>o(e.target.value)});case b.Number:return(0,Z.jsx)(_t,{...h,type:`number`,onChange:e=>o(e.target.value),helperText:`Enter a numeric value`});case b.Select:{let e=d.length>0?d:[];return e.length>0?(0,Z.jsx)(xt,{...h,options:e,onChange:e=>o(e.target.value),helperText:`Select from available options`}):(0,Z.jsx)(_t,{...h,type:`text`,onChange:e=>o(e.target.value),helperText:`Enter multiple values separated by commas (e.g., value1, value2, value3)`,placeholder:`value1, value2, value3`})}default:return(0,Z.jsx)(_t,{...h,type:`text`,onChange:e=>o(e.target.value),helperText:`Unknown field type, treating as text`})}},wt=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=tt(n?.i18n);return(0,Z.jsx)(st,{...i,fullWidth:!0,type:`button`,color:`primary`,variant:`solid`,disabled:t,startIcon:(0,Z.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 512 512`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,Z.jsx)(`path`,{fill:`#1976D2`,d:`M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z`}),(0,Z.jsx)(`path`,{fill:`#FAFAFA`,d:`M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64v176h96V336h48L432,256z`})]}),children:r??a(`elements.buttons.facebook.text`)})},Tt=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=tt(n?.i18n);return(0,Z.jsx)(st,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,Z.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 66.233`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Z.jsx)(`g`,{transform:`translate(-386.96 658.072)`,children:(0,Z.jsx)(`path`,{d:`M420.915-658.072a33.956,33.956,0,0,0-33.955,33.955,33.963,33.963,0,0,0,23.221,32.22c1.7.314,2.32-.737,2.32-1.633,0-.81-.031-3.484-.046-6.322-9.446,2.054-11.44-4.006-11.44-4.006-1.545-3.925-3.77-4.968-3.77-4.968-3.081-2.107.232-2.064.232-2.064,3.41.239,5.205,3.5,5.205,3.5,3.028,5.19,7.943,3.69,9.881,2.822a7.23,7.23,0,0,1,2.156-4.54c-7.542-.859-15.47-3.77-15.47-16.781a13.141,13.141,0,0,1,3.5-9.114,12.2,12.2,0,0,1,.329-8.986s2.851-.913,9.34,3.48a32.545,32.545,0,0,1,8.5-1.143,32.629,32.629,0,0,1,8.506,1.143c6.481-4.393,9.328-3.48,9.328-3.48a12.185,12.185,0,0,1,.333,8.986,13.115,13.115,0,0,1,3.495,9.114c0,13.042-7.943,15.913-15.5,16.754,1.218,1.054,2.3,3.12,2.3,6.288,0,4.543-.039,8.2-.039,9.318,0,.9.611,1.962,2.332,1.629a33.959,33.959,0,0,0,23.2-32.215,33.955,33.955,0,0,0-33.955-33.955`,fill:`#ffffff`})})}),children:r??a(`elements.buttons.github.text`)})},Et=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=tt(n?.i18n);return(0,Z.jsx)(st,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,Z.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 67.901`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Z.jsxs)(`g`,{transform:`translate(-0.001 -0.001)`,children:[(0,Z.jsx)(`path`,{d:`M15.049,160.965l-2.364,8.824-8.639.183a34.011,34.011,0,0,1-.25-31.7h0l7.691,1.41,3.369,7.645a20.262,20.262,0,0,0,.19,13.642Z`,transform:`translate(0 -119.93)`,fill:`#fbbb00`}),(0,Z.jsx)(`path`,{d:`M294.24,208.176A33.939,33.939,0,0,1,282.137,241h0l-9.687-.494-1.371-8.559a20.235,20.235,0,0,0,8.706-10.333H261.628V208.176Z`,transform:`translate(-226.93 -180.567)`,fill:`#518ef8`}),(0,Z.jsx)(`path`,{d:`M81.668,328.8h0a33.962,33.962,0,0,1-51.161-10.387l11-9.006a20.192,20.192,0,0,0,29.1,10.338Z`,transform:`translate(-26.463 -268.374)`,fill:`#28b446`}),(0,Z.jsx)(`path`,{d:`M80.451,7.816l-11,9A20.19,20.19,0,0,0,39.686,27.393l-11.06-9.055h0A33.959,33.959,0,0,1,80.451,7.816Z`,transform:`translate(-24.828)`,fill:`#f14336`})]})}),children:r??a(`elements.buttons.google.text`)})},Dt=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=tt(n?.i18n);return(0,Z.jsx)(st,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,Z.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Z.jsx)(`path`,{fill:`#0077B5`,d:`M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z`})}),children:r??a(`elements.buttons.linkedin.text`)})},Ot=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=tt(n?.i18n);return(0,Z.jsx)(st,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,Z.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 23 23`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,Z.jsx)(`path`,{fill:`#f3f3f3`,d:`M0 0h23v23H0z`}),(0,Z.jsx)(`path`,{fill:`#f35325`,d:`M1 1h10v10H1z`}),(0,Z.jsx)(`path`,{fill:`#81bc06`,d:`M12 1h10v10H12z`}),(0,Z.jsx)(`path`,{fill:`#05a6f0`,d:`M1 12h10v10H1z`}),(0,Z.jsx)(`path`,{fill:`#ffba08`,d:`M12 12h10v10H12z`})]}),children:r??a(`elements.buttons.microsoft.text`)})},kt=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=tt(n?.i18n);return(0,Z.jsx)(st,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,Z.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Z.jsx)(`path`,{fill:`#627EEA`,d:`M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z`})}),children:r??a(`elements.buttons.ethereum.text`)})},At=e=>(0,Z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,Z.jsx)(`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`}),(0,Z.jsx)(`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`})]}),jt=e=>(0,Z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,Z.jsx)(`path`,{d:`m9 12 2 2 4-4`})]}),Mt=e=>(0,Z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,Z.jsx)(`path`,{d:`M12 16v-4`}),(0,Z.jsx)(`path`,{d:`M12 8h.01`})]}),Nt=e=>(0,Z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Z.jsx)(`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`}),(0,Z.jsx)(`path`,{d:`M12 9v4`}),(0,Z.jsx)(`path`,{d:`M12 17h.01`})]}),Pt=(e,t,n)=>(0,X.useMemo)(()=>{let t=T`
      padding: calc(${e.vars.spacing.unit} * 2);
      border-radius: ${e.vars.borderRadius.medium};
      border: 1px solid;
      font-family: ${e.vars.typography.fontFamily};
      display: flex;
      gap: calc(${e.vars.spacing.unit} * 1.5);
      align-items: flex-start;
    `,r={error:T`
        background-color: color-mix(in srgb, ${e.vars.colors.error.main} 20%, white);
        border-color: ${e.vars.colors.error.main};
        color: ${e.vars.colors.error.main};
      `,info:T`
        background-color: color-mix(in srgb, ${e.vars.colors.info.main} 20%, white);
        border-color: ${e.vars.colors.info.main};
        color: ${e.vars.colors.info.main};
      `,success:T`
        background-color: color-mix(in srgb, ${e.vars.colors.success.main} 20%, white);
        border-color: ${e.vars.colors.success.main};
        color: ${e.vars.colors.success.main};
      `,warning:T`
        background-color: color-mix(in srgb, ${e.vars.colors.warning.main} 20%, white);
        border-color: ${e.vars.colors.warning.main};
        color: ${e.vars.colors.warning.main};
      `},i=T`
      flex-shrink: 0;
      margin-top: calc(${e.vars.spacing.unit} * 0.25);
      width: calc(${e.vars.spacing.unit} * 2.5);
      height: calc(${e.vars.spacing.unit} * 2.5);
      color: ${e.vars.colors[n]?.contrastText};
    `,a=T`
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${e.vars.spacing.unit};
    `,o=T`
      margin: 0;
      font-size: ${e.vars.typography.fontSizes.sm};
      font-weight: 600;
      line-height: 1.4;
      color: ${e.vars.colors[n]?.contrastText};
    `;return{alert:t,content:a,description:T`
      margin: 0;
      font-size: ${e.vars.typography.fontSizes.sm};
      line-height: 1.4;
      color: ${e.vars.colors.text.secondary};
    `,icon:i,title:o,variant:r[n]}},[e,t,n]),Ft=e=>{switch(e){case`success`:return jt;case`error`:return At;case`warning`:return Nt;case`info`:return Mt;default:return Mt}},It=(0,X.createContext)(`info`),Lt=()=>(0,X.useContext)(It),Rt=(0,X.forwardRef)(({variant:e=`info`,showIcon:t=!0,children:n,className:i,style:a,...o},s)=>{let{theme:c,colorScheme:l}=q(),u=Pt(c,l,e),f=Ft(e);return(0,Z.jsx)(It.Provider,{value:e,children:(0,Z.jsxs)(`div`,{ref:s,role:`alert`,style:a,className:C(d(r(`alert`)),u.alert,u.variant,d(r(`alert`,null,e)),i),...o,children:[t&&(0,Z.jsx)(`div`,{className:C(d(r(`alert`,`icon`)),u.icon),children:(0,Z.jsx)(f,{})}),(0,Z.jsx)(`div`,{className:C(d(r(`alert`,`content`)),u.content),children:n})]})})}),zt=e=>{let{children:t,className:n,style:i,...a}=e,{theme:o,colorScheme:s}=q(),c=Pt(o,s,Lt()),{color:l,...u}=a;return(0,Z.jsx)(Le,{component:`h3`,variant:`h6`,fontWeight:600,style:i,className:C(d(r(`alert`,`title`)),c.title,n),...u,children:t})},Bt=e=>{let{children:t,className:n,style:i,...a}=e,{theme:o,colorScheme:s}=q(),c=Pt(o,s,Lt()),{color:l,...u}=a;return(0,Z.jsx)(Le,{component:`p`,variant:`body2`,style:i,className:C(d(r(`alert`,`description`)),c.description,n),...u,children:t})};Rt.displayName=`Alert`,zt.displayName=`Alert.Title`,Bt.displayName=`Alert.Description`,Rt.Title=zt,Rt.Description=Bt;var Vt=Rt,Ht=(e,t,n,r)=>(0,X.useMemo)(()=>{let t=T`
      border-radius: ${e.vars.borderRadius.medium};
      background-color: ${e.vars.colors.background.surface};
      font-family: ${e.vars.typography.fontFamily};
      transition: all 0.2s ease-in-out;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: calc(${e.vars.spacing.unit} * 2);
    `,i={default:T`
        /* Base styles only */
      `,elevated:T`
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: none;
      `,outlined:T`
        border: 1px solid ${e.vars.colors.border};
      `},a=T`
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `,o=T`
      padding: 0 calc(${e.vars.spacing.unit} * 2);
      margin-top: calc(${e.vars.spacing.unit} * 2);
      display: flex;
      flex-direction: column;
      gap: ${e.vars.spacing.unit};
    `,s=T`
      margin: 0;
      /* Typography component will handle color, fontSize, fontWeight, lineHeight */
    `,c=T`
      margin: 0;
      color: ${e.vars.colors.text.secondary};
      font-size: ${e.vars.typography.fontSizes.sm};
      line-height: 1.5;
    `,l=T`
      margin-top: ${e.vars.spacing.unit};
    `,u=T`
      padding: 0 calc(${e.vars.spacing.unit} * 2);
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
      flex: 1;
    `,d=T`
      padding: 0 calc(${e.vars.spacing.unit} * 2) calc(${e.vars.spacing.unit} * 2);
      display: flex;
      align-items: center;
      gap: ${e.vars.spacing.unit};
    `;return{action:l,card:t,clickable:r?a:``,content:u,description:c,footer:d,header:o,title:s,variant:i[n]}},[e,t,n,r]),Ut=(0,X.forwardRef)(({variant:e=`default`,clickable:t=!1,children:n,className:i,style:a,...o},s)=>{let{theme:c,colorScheme:l}=q(),u=Ht(c,l,e,t);return(0,Z.jsx)(`div`,{ref:s,style:a,className:C(d(r(`card`)),u.card,u.variant,u.clickable,d(r(`card`,null,e)),{[d(r(`card`,null,`clickable`))]:t},i),...o,children:n})}),Wt=(0,X.forwardRef)(({children:e,className:t,style:n,...i},a)=>{let{theme:o,colorScheme:s}=q(),c=Ht(o,s,`default`,!1);return(0,Z.jsx)(`div`,{ref:a,style:n,className:C(d(r(`card`,`header`)),c.header,t),...i,children:e})}),Gt=e=>{let{children:t,level:n,className:i,style:a,...o}=e,s=n===void 0?3:n,{theme:c,colorScheme:l}=q(),u=Ht(c,l,`default`,!1),f=Zt,p=Qt,{color:m,...h}=o;return(0,Z.jsx)(Le,{component:p(s),variant:f(s),style:a,className:C(d(r(`card`,`title`)),u.title,i),fontWeight:600,...h,children:t})},Kt=e=>{let{children:t,className:n,style:i,...a}=e,{theme:o,colorScheme:s}=q(),c=Ht(o,s,`default`,!1),{color:l,...u}=a;return(0,Z.jsx)(Le,{component:`p`,variant:`body2`,color:`textSecondary`,style:i,className:C(d(r(`card`,`description`)),c.description,n),...u,children:t})},qt=(0,X.forwardRef)(({children:e,className:t,style:n,...i},a)=>{let{theme:o,colorScheme:s}=q(),c=Ht(o,s,`default`,!1);return(0,Z.jsx)(`div`,{ref:a,style:n,className:C(d(r(`card`,`action`)),c.action,t),...i,children:e})}),Jt=(0,X.forwardRef)(({children:e,className:t,style:n,...i},a)=>{let{theme:o,colorScheme:s}=q(),c=Ht(o,s,`default`,!1);return(0,Z.jsx)(`div`,{ref:a,style:n,className:C(d(r(`card`,`content`)),c.content,t),...i,children:e})}),Yt=(0,X.forwardRef)(({children:e,className:t,style:n,...i},a)=>{let{theme:o,colorScheme:s}=q(),c=Ht(o,s,`default`,!1);return(0,Z.jsx)(`div`,{ref:a,style:n,className:C(d(r(`card`,`footer`)),c.footer,t),...i,children:e})});Ut.displayName=`Card`,Wt.displayName=`Card.Header`,Gt.displayName=`Card.Title`,Kt.displayName=`Card.Description`,qt.displayName=`Card.Action`,Jt.displayName=`Card.Content`,Yt.displayName=`Card.Footer`,Ut.Header=Wt,Ut.Title=Gt,Ut.Description=Kt,Ut.Action=qt,Ut.Content=Jt,Ut.Footer=Yt;var Xt=Ut;function Zt(e){switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}}function Qt(e){switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}}var $t=e=>(0,X.useMemo)(()=>{let t=T`
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      border: 1px solid ${e.vars.colors.border};
      border-radius: ${e.vars.borderRadius.medium};
      font-family: ${e.vars.typography.fontFamily};
    `,n=T`
      display: flex;
      align-items: center;
      padding: calc(${e.vars.spacing.unit} * 1) calc(${e.vars.spacing.unit} * 1.5);
      cursor: pointer;
      user-select: none;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: ${e.vars.colors.action.hover};
      }
    `,r=T`
      background-color: ${e.vars.colors.action.selected};

      &:hover {
        background-color: ${e.vars.colors.action.selected};
      }
    `,i=T`
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
    `,a=T`
      width: 20px;
      height: 20px;
      margin-right: calc(${e.vars.spacing.unit} * 0.5);
      flex-shrink: 0;
    `,o=T`
      font-size: 14px;
      color: ${e.vars.colors.text.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;return{container:t,loadMoreButton:T`
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
    `,loadingPlaceholder:T`
      display: flex;
      align-items: center;
      padding: calc(${e.vars.spacing.unit} * 1) calc(${e.vars.spacing.unit} * 1.5);
      gap: calc(${e.vars.spacing.unit} * 1);
    `,node:n,nodeName:o,nodeSelected:r,skeleton:T`
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
    `,toggleButton:i,togglePlaceholder:a}},[e.vars.colors.action.hover,e.vars.colors.action.selected,e.vars.colors.background.disabled,e.vars.colors.border,e.vars.colors.primary.main,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.medium,e.vars.borderRadius.small,e.vars.spacing.unit,e.vars.typography.fontFamily]),en=({rootOuId:e,selectedOuId:t,onSelect:n,fetchChildren:r,pageSize:i=10,className:a})=>{let{theme:o}=q(),s=$t(o),[c,l]=(0,X.useState)({}),u=(0,X.useCallback)(async(e,t=0)=>{l(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!0}}));try{let n=await r(e,i,t),a=n.organizationUnits||[];l(r=>{let i=r[e]||{children:[],expanded:!0,hasMore:!1,loading:!1,offset:0,totalResults:0},o=t===0?a:[...i.children,...a],s=t+a.length;return{...r,[e]:{children:o,expanded:!0,hasMore:s<n.totalResults,loading:!1,offset:s,totalResults:n.totalResults}}})}catch{l(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!1}}))}},[r,i]);(0,X.useEffect)(()=>{e&&!c[e]&&u(e)},[e,u,c]);let d=(0,X.useCallback)(e=>{let t=c[e];t?.expanded?l(t=>({...t,[e]:{...t[e],expanded:!1}})):t?.children.length?l(t=>({...t,[e]:{...t[e],expanded:!0}})):u(e)},[c,u]),f=(0,X.useCallback)(e=>{let t=c[e];t&&u(e,t.offset)},[c,u]),p=e=>(0,Z.jsx)(Z.Fragment,{children:[0,1,2].map(t=>(0,Z.jsx)(`div`,{className:s.loadingPlaceholder,style:{paddingLeft:`${(e+1)*20}px`},children:(0,Z.jsx)(`div`,{className:s.skeleton,style:{width:`${100-t*20}px`}})},`skeleton-${t}`))}),m=(e,r=0)=>{let i=c[e.id],a=t===e.id,o=i?.expanded||!1,l=i?.loading||!1,u=!i||i.totalResults>0||i.children.length>0;return(0,Z.jsxs)(X.Fragment,{children:[(0,Z.jsxs)(`div`,{className:C(s.node,a&&s.nodeSelected),style:{paddingLeft:`${r*20+12}px`},role:`treeitem`,"aria-selected":a,"aria-expanded":u?o:void 0,onClick:()=>n(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),n(e.id))},tabIndex:0,children:[u?(0,Z.jsx)(`button`,{className:s.toggleButton,onClick:t=>{t.stopPropagation(),d(e.id)},"aria-label":o?`Collapse`:`Expand`,type:`button`,children:o?`▾`:`▸`}):(0,Z.jsx)(`span`,{className:s.togglePlaceholder}),(0,Z.jsx)(`span`,{className:s.nodeName,children:e.name})]}),o&&l&&!i?.children.length&&p(r),o&&i?.children.map(e=>m(e,r+1)),o&&i?.hasMore&&(0,Z.jsx)(`button`,{className:s.loadMoreButton,style:{paddingLeft:`${(r+1)*20+12}px`},onClick:()=>f(e.id),disabled:l,type:`button`,children:l?`Loading...`:`Load more`})]},e.id)},h=c[e],g=h?.loading&&!h?.children.length;return(0,Z.jsxs)(`div`,{className:C(s.container,a),role:`tree`,"aria-label":`Organization unit picker`,children:[g&&p(0),h?.children.map(e=>m(e,0)),h?.hasMore&&(0,Z.jsx)(`button`,{className:s.loadMoreButton,onClick:()=>f(e),disabled:h?.loading,type:`button`,children:h?.loading?`Loading...`:`Load more`})]})},tn=(e,t,n=[`label`,`placeholder`,`text`,`title`,`subtitle`],r)=>{let i={...e};return n.forEach(e=>{i[e]&&typeof i[e]==`string`&&(i[e]=a(i[e],{meta:r,t}))}),i},nn=(e,t,n,r)=>e.map(e=>{let i=tn(e,t,n,r);return i.components&&Array.isArray(i.components)&&(i.components=nn(i.components,t,n,r)),i}),rn=nn,an=e=>{let t=new Map;return e?.data?.inputs&&Array.isArray(e.data.inputs)&&e.data.inputs.forEach(e=>{e.ref&&e.identifier&&t.set(e.ref,e.identifier)}),t},on=e=>{let t=new Map;return e?.data?.actions&&Array.isArray(e.data.actions)&&e.data.actions.forEach(e=>{e.ref&&e.nextNode&&t.set(e.ref,e.nextNode)}),t},sn=(e,t,n,r=[])=>e.map(e=>{let i={...e};if(i.ref&&t.has(i.ref)&&(i.ref=t.get(i.ref)),i.type===`SELECT`&&e.id){let t=r.find(t=>t.ref===e.id);t?.options&&(i.options=t.options.map(e=>{if(typeof e==`string`)return{label:e,value:e};let t=typeof e.value==`object`?JSON.stringify(e.value):String(e.value||``);return{label:typeof e.label==`object`?JSON.stringify(e.label):String(e.label||t),value:t}}))}return i.type===`ACTION`&&i.id&&n.has(i.id)&&(i.actionRef=n.get(i.id)),i.components&&Array.isArray(i.components)&&(i.components=sn(i.components,t,n,r)),i}),cn=(e,t,n=!0,r)=>{if(!e?.data?.meta?.components)return[];let{components:i}=e.data.meta,a=an(e),o=on(e),s=e?.data?.inputs||[];return(a.size>0||o.size>0||s.length>0)&&(i=sn(i,a,o,s)),n?rn(i,t,void 0,r):i},ln=(e,t,n=`errors.flow.generic`)=>{if(e&&typeof e==`object`&&e.error){let n=e.error;if(n?.message?.key){let e=t(n.message.key);if(e&&e!==n.message.key)return e;let r=`system.${n.message.key}`,i=t(r);if(i&&i!==r)return i}let r=n?.message?.defaultValue??n?.description?.defaultValue;if(r)return r}return e&&typeof e==`object`&&e.failureReason?e.failureReason:e instanceof Error&&e.message?e.message:t(n)},un=(e,t,n=`errors.flow.generic`)=>e?.flowStatus===`ERROR`?ln(e,t,n):null,dn=(e,t,n={},r)=>{let{throwOnError:i=!0,defaultErrorKey:a=`errors.flow.generic`,resolveTranslations:o=!0}=n;if(un(e,t,a)&&i)throw e;let s=e?.data?.additionalData??{};if(typeof s.consentPrompt==`string`)try{let e=JSON.parse(s.consentPrompt);s.consentPrompt={purposes:Array.isArray(e)?e:[]}}catch{}return{additionalData:s,components:cn(e,t,o,r),executionId:e.executionId}},fn=`4em`,pn=e=>{let t=(0,Y.c)(6),{component:n}=e,{theme:r}=q(),a,o;if(t[0]!==n.config||t[1]!==n.id||t[2]!==n.variant||t[3]!==r.vars.borderRadius.small){o=Symbol.for(`react.early_return_sentinel`);bb0:{let e=n.config||{},t=e.src||``,s=e.alt||e.label||`Image`,c=e.width||`100%`,l=e.height||`auto`,d=n.variant?.toLowerCase()||`image_block`,f={borderRadius:r.vars.borderRadius.small,display:`block`,margin:d===`image_block`?`1rem auto`:`0`};if(!t){o=null;break bb0}if(u(t)){let e=mn,r=e(c),a=e(l),u=hn,d;d=u(a)?a:u(r)?r:fn,o=(0,Z.jsx)(`div`,{style:{textAlign:`center`},children:(0,Z.jsx)(`span`,{style:{...f,containerType:`size`,display:`inline-grid`,height:d,placeItems:`center`,width:r},children:(0,Z.jsx)(`span`,{"aria-label":s,role:`img`,style:{fontSize:`100cqmin`,lineHeight:1},children:i(t)})})},n.id);break bb0}a=(0,Z.jsx)(`div`,{style:{textAlign:`center`},children:(0,Z.jsx)(`img`,{src:t,alt:s,height:l,width:c,style:f,onError:gn})},n.id)}t[0]=n.config,t[1]=n.id,t[2]=n.variant,t[3]=r.vars.borderRadius.small,t[4]=a,t[5]=o}else a=t[4],o=t[5];return o===Symbol.for(`react.early_return_sentinel`)?a:o};function mn(e){return/^\d+(\.\d+)?$/.test(e)?`${e}px`:e}function hn(e){return e!==`auto`&&!e.endsWith(`%`)}function gn(e){e.currentTarget.style.display=`none`}var _n=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=tt(n?.i18n);return(0,Z.jsx)(st,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,Z.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Z.jsx)(`path`,{fill:`currentColor`,d:`M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z`})}),children:r??a(`elements.buttons.smsotp.text`)})},vn=e=>(0,X.useMemo)(()=>({container:T`
        display: flex;
        flex-direction: column;
        gap: calc(${e.vars.spacing.unit} * 0.5);
        width: 100%;
      `,copyButton:T`
        flex-shrink: 0;
        white-space: nowrap;
      `,label:T`
        color: ${e.vars.colors.text.secondary};
        font-size: 0.875rem;
        font-weight: 500;
      `,valueBox:T`
        align-items: center;
        background-color: ${e.vars.colors.background.surface};
        border: 1px solid ${e.vars.colors.border};
        border-radius: ${e.vars.borderRadius.small};
        display: flex;
        gap: calc(${e.vars.spacing.unit} * 1);
        padding: calc(${e.vars.spacing.unit} * 0.75) calc(${e.vars.spacing.unit} * 1);
      `,valueText:T`
        color: ${e.vars.colors.text.primary};
        flex: 1;
        font-family: monospace;
        font-size: 0.85rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      `}),[e]),yn=e=>{let t=(0,Y.c)(4),{label:n,value:r}=e,{theme:i}=q(),a=vn(i),{t:o}=tt(),[s,c]=(0,X.useState)(!1),l;t[0]===r?l=t[1]:(l=async()=>{try{await navigator.clipboard.writeText(r)}catch{let e=document.createElement(`textarea`);e.value=r,document.body.appendChild(e),e.select(),document.execCommand(`copy`),document.body.removeChild(e)}c(!0),setTimeout(()=>c(!1),3e3)},t[0]=r,t[1]=l);let u=l,d;return t[2]===u?d=t[3]:(d=()=>{u().catch(bn)},t[2]=u,t[3]=d),(0,Z.jsxs)(`div`,{className:a.container,children:[n&&(0,Z.jsx)(`span`,{className:a.label,children:n}),(0,Z.jsxs)(`div`,{className:a.valueBox,children:[(0,Z.jsx)(`span`,{className:a.valueText,children:r}),(0,Z.jsx)(st,{variant:`outline`,size:`small`,className:a.copyButton,onClick:d,children:o(s?`elements.display.copyable_text.copied`:`elements.display.copyable_text.copy`)})]})]})};function bn(){}var xn=({color:e=`currentColor`,size:t=24})=>(0,Z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,Z.jsx)(`path`,{d:`M8 3 4 7l4 4`}),(0,Z.jsx)(`path`,{d:`M4 7h16`}),(0,Z.jsx)(`path`,{d:`m16 21 4-4-4-4`}),(0,Z.jsx)(`path`,{d:`M20 17H4`})]});xn.displayName=`ArrowLeftRight`;var Sn=xn,Cn=({color:e=`currentColor`,size:t=24})=>(0,Z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,Z.jsx)(`path`,{d:`m16 3 4 4-4 4`}),(0,Z.jsx)(`path`,{d:`M20 7H4`}),(0,Z.jsx)(`path`,{d:`m8 21-4-4 4-4`}),(0,Z.jsx)(`path`,{d:`M4 17h16`})]});Cn.displayName=`ArrowRightLeft`;var wn={ArrowLeftRight:Sn,ArrowRightLeft:Cn},Tn=s(`@thunderid/react`,`AuthOptionFactory`),En=T`
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
`,Dn=e=>{switch(e){case m.EmailInput:return b.Email;case m.PhoneInput:return b.Tel;case m.PasswordInput:return b.Password;case m.TextInput:default:return b.Text}},On=e=>({BODY_1:`body1`,BODY_2:`body2`,BUTTON_TEXT:`button`,CAPTION:`caption`,HEADING_1:`h1`,HEADING_2:`h2`,HEADING_3:`h3`,HEADING_4:`h4`,HEADING_5:`h5`,HEADING_6:`h6`,OVERLINE:`overline`,SUBTITLE_1:`subtitle1`,SUBTITLE_2:`subtitle2`})[e]||`h3`,kn=(e,t,n,r,i,a)=>{let o=`${r}_auth`,s=e===o||t===o;return n.toLowerCase().includes(r)?!0:i===`signup`?s||n.toLowerCase().includes(r):s},An=(e,t,n,r,i,o,s,c,l={})=>{let u=l._theme,d=l._customRenderers??{},f=l.key||e.id,g=d[e.id]??d[e.type];if(g)return g(e,{additionalData:l.additionalData,authType:c,formErrors:r,formValues:t,isFormValid:o,isLoading:i,meta:l.meta,onInputBlur:l.onInputBlur,onInputChange:s,onSubmit:l.onSubmit,touchedFields:n});let _=e=>!e||!l.t&&!l.meta?e||``:a(e,{meta:l.meta,t:l.t||(e=>e)});switch(e.type){case m.TextInput:case m.PasswordInput:case m.EmailInput:case m.PhoneInput:{let i=e.ref,a=t[i]||``,o=n[i]?r[i]:void 0,c=Dn(e.type);return(0,X.cloneElement)(Ct({className:l.inputClassName,error:o,label:_(e.label)||``,name:i,onBlur:()=>l.onInputBlur?.(i),onChange:e=>s(i,e),placeholder:_(e.placeholder)||``,required:e.required||!1,type:c,value:a}),{key:f})}case m.OtpInput:{let i=e.ref,a=t[i]||``,o=n[i]?r[i]:void 0;return(0,X.cloneElement)(Ct({className:l.inputClassName,error:o,label:_(e.label)||``,name:i,onBlur:()=>l.onInputBlur?.(i),onChange:e=>s(i,e),placeholder:_(e.placeholder)||``,required:e.required||!1,type:b.Otp,value:a}),{key:f})}case m.Action:{let n=e.id,r=e.eventType||``,a=_(e.label),s=e.variant||``,u=r.toUpperCase()===p.Trigger,d=()=>{if(l.onSubmit){let n={};Object.keys(t).forEach(e=>{n[e]=t[e]});let i=l.additionalData?.consentPrompt;if(i&&r.toUpperCase()===p.Submit){let e=s.toLowerCase()!==`primary`,r={purposes:i.purposes.map(n=>({approved:!e,elements:[...n.essential.map(t=>({approved:!e,name:t.name})),...n.optional.map(r=>({approved:e?!1:t[Ie(n.purposeId,r.name)]!==`false`,name:r.name}))],purposeName:n.purposeName}))};n.consent_decisions=JSON.stringify(r)}l.onSubmit(e,n,u)}};if(kn(n,r,a,`google`,c,s))return(0,Z.jsx)(Et,{onClick:d,className:l.buttonClassName},f);if(kn(n,r,a,`github`,c,s))return(0,Z.jsx)(Tt,{onClick:d,className:l.buttonClassName},f);if(kn(n,r,a,`facebook`,c,s))return(0,Z.jsx)(wt,{onClick:d,className:l.buttonClassName},f);if(kn(n,r,a,`microsoft`,c,s))return(0,Z.jsx)(Ot,{onClick:d,className:l.buttonClassName},f);if(kn(n,r,a,`linkedin`,c,s))return(0,Z.jsx)(Dt,{onClick:d,className:l.buttonClassName},f);if(kn(n,r,a,`ethereum`,c,s))return(0,Z.jsx)(kt,{onClick:d,className:l.buttonClassName},f);if(n===`prompt_mobile`||r===`prompt_mobile`)return(0,Z.jsx)(_n,{onClick:d,className:l.buttonClassName},f);let m=e.startIcon?(0,Z.jsx)(`img`,{src:e.startIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null,h=e.endIcon?(0,Z.jsx)(`img`,{src:e.endIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null;return(0,Z.jsx)(st,{fullWidth:!0,onClick:d,disabled:i||!o&&!u||l.isTimeoutDisabled||e.config?.disabled,className:l.buttonClassName,"data-testid":`thunderid-signin-submit`,variant:e.variant?.toLowerCase()===`primary`?`solid`:`outline`,color:e.variant?.toLowerCase()===`primary`?`primary`:`secondary`,startIcon:m,endIcon:h,children:a||`Submit`},f)}case m.Text:return(0,Z.jsx)(Le,{variant:On(e.variant),style:{marginBottom:2,textAlign:typeof e?.align==`string`?e.align:`left`},children:_(e.label)},f);case m.Divider:return(0,Z.jsx)(He,{children:_(e.label)||``},f);case m.Select:{let i=e.ref,a=t[i]||``,o=n[i]?r[i]:void 0,c=(e.options||[]).map(e=>({label:typeof e==`string`?e:String(e.label??e.value??``),value:typeof e==`string`?e:String(e.value??``)}));return(0,Z.jsx)(xt,{name:i,label:_(e.label)||``,placeholder:_(e.placeholder),required:e.required,options:c,value:a,error:o,onChange:e=>s(i,e.target.value),onBlur:()=>l.onInputBlur?.(i),className:l.inputClassName},f)}case m.DateInput:{let i=e.ref,a=t[i]||``,o=n[i]?r[i]:void 0;return(0,Z.jsx)(dt,{name:i,label:_(e.label)||``,placeholder:_(e.placeholder),required:e.required,dateFormat:e.dateFormat,value:a,error:o,onChange:e=>s(i,e.target.value),onBlur:()=>l.onInputBlur?.(i),className:l.inputClassName},f)}case m.OuSelect:{let n=e.ref??e.id,r=l.additionalData?.rootOuId;return!r||!l.fetchOrganizationUnitChildren?(Tn.warn(`OU_SELECT requires additionalData.rootOuId and fetchOrganizationUnitChildren. Skipping render.`),null):(0,Z.jsx)(en,{rootOuId:r,selectedOuId:t[n]||null,onSelect:e=>s(n,e),fetchChildren:l.fetchOrganizationUnitChildren},f)}case m.Block:if(e.components&&e.components.length>0){let a={display:`flex`,flexDirection:`column`,gap:`calc(${u?.vars?.spacing?.unit??`4px`} * 2)`},d=e.components.map((a,u)=>An(a,t,n,r,i,o,s,c,{...l,key:a.id||`${e.id}_${u}`})).filter(Boolean);return(0,Z.jsx)(`form`,{id:e.id,style:a,children:d},f)}return null;case m.RichText:return(0,Z.jsx)(`div`,{className:En,dangerouslySetInnerHTML:{__html:We.sanitize(h(_(e.label)))}},f);case m.Image:{let t=_(e.height?.toString()),n=_(e.width?.toString());return(0,Z.jsx)(pn,{component:{config:{alt:_(e.alt)||_(e.label)||`Image`,height:t||(l.inStack?`50`:`auto`),src:_(e.src),width:n||(l.inStack?`50`:`100%`)}},formErrors:void 0,formValues:void 0,isFormValid:!1,isLoading:!1,onInputChange:()=>{throw Error(`Function not implemented.`)},touchedFields:void 0},f)}case m.Icon:{let t=e.name||``,n=wn[t];return n?(0,Z.jsx)(n,{size:e.size||24,color:e.color||`currentColor`},f):(Tn.warn(`Unknown icon name: "${t}". Skipping render.`),null)}case m.Stack:{let a=e.direction||`row`,u=e.gap??2,d=e.align||`center`,p=e.justify||`flex-start`;return(0,Z.jsx)(`div`,{style:{alignItems:d,display:`flex`,flexDirection:a,flexWrap:`wrap`,gap:`${u*.5}rem`,justifyContent:p},children:e.components?e.components.map((a,u)=>An(a,t,n,r,i,o,s,c,{...l,inStack:!0,key:a.id||`${e.id}_${u}`})):[]},f)}case m.Consent:{let e=l.additionalData?.consentPrompt;return(0,Z.jsx)(ze,{consentData:e,formValues:t,onInputChange:s},f)}case m.Timer:{let t=_(e.label)||`Time remaining: {time}`,n=Number(l.additionalData?.stepTimeout)||0;return(0,Z.jsx)(Ue,{expiresIn:n>0?Math.max(0,Math.floor((n-Date.now())/1e3)):0,textTemplate:t},f)}case m.CopyableText:{let t=e.source,n=t&&l.additionalData?String(l.additionalData[t]??``):``;return(0,Z.jsx)(yn,{label:_(e.label)||void 0,value:n},f)}default:return Tn.warn(`Unsupported component type: ${e.type}. Skipping render.`),null}},jn=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>An(e,t,n,r,i,a,o,`signup`,{...s,key:e.id||c})).filter(e=>e!==null),Mn=(e,t)=>(0,X.useMemo)(()=>{let t=T`
      background: ${e.vars.colors.background.surface};
      border-radius: ${e.vars.borderRadius.large};
      gap: calc(${e.vars.spacing.unit} * 2);
      min-width: 420px;
      font-family: ${e.vars.typography.fontFamily};
    `,n=T`
      gap: 0;
      align-items: center;
    `,r=T`
      margin: 0 0 calc(${e.vars.spacing.unit} * 1) 0;
      color: ${e.vars.colors.text.primary};
    `;return{card:t,header:n,subtitle:T`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
      color: ${e.vars.colors.text.secondary};
    `,title:r}},[e.vars.colors.background.surface,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.large,e.vars.spacing.unit,e.vars.typography.fontFamily,t]),Nn=({onInitialize:e,onSubmit:t,onError:r,onFlowChange:i,className:a=``,children:s,fetchOrganizationUnitChildren:c,isInitialized:l=!0,preferences:u,size:d=`medium`,variant:f=`outlined`,showTitle:p=!0,showSubtitle:m=!0})=>{let{meta:h,isInitialized:g,getStorageManager:_}=v(),{t:b}=tt(u?.i18n),{theme:x}=q(),S=(0,X.useContext)($e),w=Mn(x,x.vars.colors.text.primary),[T,E]=(0,X.useState)(!1),[D,O]=(0,X.useState)(!1),[k,A]=(0,X.useState)(null),[j,M]=(0,X.useState)(null),[N,P]=(0,X.useState)({}),[ee,F]=(0,X.useState)({}),[te,I]=(0,X.useState)({}),[L,ne]=(0,X.useState)(!0),R=(0,X.useRef)(null);(0,X.useEffect)(()=>{let e=k?.data?.fieldErrors;if(!e||e.length===0)return;let t={},n={};for(let r of e)r.identifier in t||(t[r.identifier]=r.message,n[r.identifier]=!0);F(t),I(e=>({...e,...n}))},[k]);let z=(0,X.useRef)(!1);(0,X.useEffect)(()=>{g&&(async()=>{try{let e=await(await _())?.getTemporaryData();e?.challengeToken&&(R.current=e.challengeToken)}catch{}})()},[g]);let re=async e=>{R.current=e;try{let t=await _();t&&(e?await t.setTemporaryDataParameter(`challengeToken`,e):await t.removeTemporaryDataParameter(`challengeToken`))}catch{o.warn(`Failed to persist challenge token in storage.`)}},B=(0,X.useCallback)(e=>{let t=ln(e,b,`components.inviteUser.errors.generic`);M(e instanceof Error?e:Error(t)),r?.(e instanceof Error?e:Error(t))},[b,r]),V=(0,X.useCallback)(e=>{if(!e?.data?.meta?.components)return e;try{let{components:t}=dn(e,b,{defaultErrorKey:`components.inviteUser.errors.generic`,resolveTranslations:!1},h);return{...e,data:{...e.data,components:t}}}catch{return e}},[b,s]),H=(0,X.useCallback)((e,t)=>{P(n=>({...n,[e]:t})),F(t=>{let n={...t};return delete n[e],n})},[]),ie=(0,X.useCallback)(e=>{I(t=>({...t,[e]:!0}))},[]),ae=(0,X.useCallback)(e=>{let t={},r=e=>{e.forEach(e=>{if((e.type===`TEXT_INPUT`||e.type===`EMAIL_INPUT`||e.type===`SELECT`||e.type===`PHONE_INPUT`||e.type===`OTP_INPUT`||e.type===`DATE_INPUT`)&&e.ref){let r=N[e.ref];if(e.required&&(!r||r.trim()===``))t[e.ref]=`${e.label||e.ref} is required`;else if(e.type===`EMAIL_INPUT`&&r&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)&&(t[e.ref]=`Please enter a valid email address`),r&&!t[e.ref]){let i=n(e.validation);if(i){let n=i(r);n&&(t[e.ref]=b(n))}}}e.components&&Array.isArray(e.components)&&r(e.components)})};return r(e),{errors:t,isValid:Object.keys(t).length===0}},[N]),oe=(0,X.useCallback)(async(e,n)=>{if(!k)return;let r=ae(k.data?.components||[]);if(!r.isValid){F(r.errors),ne(!1);let e={};Object.keys(r.errors).forEach(t=>{e[t]=!0}),I(t=>({...t,...e}));return}E(!0),M(null),ne(!0);try{let r=n||N,a={executionId:k.executionId,inputs:r,verbose:!0,...R.current?{challengeToken:R.current}:{}};e?.id&&(a.action=e.id);let o=V(await t(a));if(i?.(o),await re(o.challengeToken??null),o.flowStatus===`ERROR`){B(o);return}A(o),P({}),F({}),I({}),o?.error&&B(o)}catch(e){B(e)}finally{E(!1)}},[k,N,ae,t,i,B,V]),U=(0,X.useCallback)(()=>{O(!1),A(null),M(null),P({}),F({}),I({}),z.current=!1},[]);(0,X.useEffect)(()=>{l&&!D&&!z.current&&(z.current=!0,(async()=>{E(!0),M(null);try{let t=V(await e({flowType:y.UserOnboarding,verbose:!0}));await re(t.challengeToken??null),A(t),O(!0),i?.(t),t.flowStatus===`ERROR`&&B(t)}catch(e){B(e)}finally{E(!1)}})())},[l,D,e,i,B,V]),(0,X.useEffect)(()=>{if(k&&D){let e=k.data?.components||[];e.length>0&&ne(ae(e).isValid)}},[N,k,D,ae]);let se=(0,X.useCallback)(e=>{let t,n;return e.forEach(e=>{e.type===`TEXT`&&(e.variant===`HEADING_1`&&!t?t=e.label:(e.variant===`HEADING_2`||e.variant===`SUBTITLE_1`)&&!n&&(n=e.label))}),{subtitle:n,title:t}},[]),ce=(0,X.useCallback)(e=>e.filter(e=>!(e.type===`TEXT`&&(e.variant===`HEADING_1`||e.variant===`HEADING_2`))),[]),le=(0,X.useCallback)(e=>jn(e,N,te,ee,T,L,H,{_customRenderers:S,_theme:x,additionalData:k?.data?.additionalData,fetchOrganizationUnitChildren:c,onInputBlur:ie,onSubmit:oe,size:d,variant:f}),[S,k?.data?.additionalData,c,N,te,ee,T,L,H,ie,oe,d,x,f]),ue=k?.data?.components||k?.data?.meta?.components||[],{title:W,subtitle:de}=se(ue),fe=ce(ue),pe={additionalData:k?.data?.additionalData,components:ue,error:j,executionId:k?.executionId,fieldErrors:ee,handleInputBlur:ie,handleInputChange:H,handleSubmit:oe,isLoading:T,isValid:L,meta:h,resetFlow:U,subtitle:de,title:W,touched:te,values:N};return s?(0,Z.jsx)(`div`,{className:a,children:s(pe)}):!l||!D&&T?(0,Z.jsx)(Xt,{className:C(a,w.card),variant:f,children:(0,Z.jsx)(Xt.Content,{children:(0,Z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`2rem`},children:(0,Z.jsx)(rt,{size:`medium`})})})}):!k&&j?(0,Z.jsx)(Xt,{className:C(a,w.card),variant:f,children:(0,Z.jsx)(Xt.Content,{children:(0,Z.jsxs)(Vt,{variant:`error`,children:[(0,Z.jsx)(Vt.Title,{children:`Error`}),(0,Z.jsx)(Vt.Description,{children:j.message})]})})}):(0,Z.jsxs)(Xt,{className:C(a,w.card),variant:f,children:[(p||m)&&(W||de)&&(0,Z.jsxs)(Xt.Header,{className:w.header,children:[p&&W&&(0,Z.jsx)(Xt.Title,{level:2,className:w.title,children:W}),m&&de&&(0,Z.jsx)(Le,{variant:`body1`,className:w.subtitle,children:de})]}),(0,Z.jsxs)(Xt.Content,{children:[j&&(0,Z.jsx)(`div`,{style:{marginBottom:`1rem`},children:(0,Z.jsx)(Vt,{variant:`error`,children:(0,Z.jsx)(Vt.Description,{children:j.message})})}),(0,Z.jsxs)(`div`,{children:[fe&&fe.length>0?le(fe):!T&&(0,Z.jsx)(Vt,{variant:`warning`,children:(0,Z.jsx)(Le,{variant:`body1`,children:`No form components available`})}),T&&(0,Z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`1rem`},children:(0,Z.jsx)(rt,{size:`small`})})]})]})]})},Pn=e=>{let t=(0,Y.c)(22),{onError:n,onFlowChange:r,className:i,children:a,size:o,variant:s,showTitle:c,showSubtitle:u}=e,d=o===void 0?`medium`:o,f=s===void 0?`outlined`:s,p=c===void 0?!0:c,m=u===void 0?!0:u,{http:h,baseUrl:g,getAccessToken:_,isInitialized:b}=v(),x;t[0]!==g||t[1]!==h?(x=async e=>(await h.request({data:{...e,flowType:y.UserOnboarding,verbose:!0},headers:{Accept:`application/json`,"Content-Type":`application/json`},method:`POST`,url:`${g}/flow/execute`})).data,t[0]=g,t[1]=h,t[2]=x):x=t[2];let S=x,C;t[3]!==g||t[4]!==h?(C=async e=>(await h.request({data:{...e,verbose:!0},headers:{Accept:`application/json`,"Content-Type":`application/json`},method:`POST`,url:`${g}/flow/execute`})).data,t[3]=g,t[4]=h,t[5]=C):C=t[5];let w=C,T;t[6]!==g||t[7]!==_?(T=async(e,t,n)=>l({baseUrl:g,headers:{Authorization:`Bearer ${await _()}`},limit:t,offset:n,organizationUnitId:e}),t[6]=g,t[7]=_,t[8]=T):T=t[8];let E=T,D;return t[9]!==a||t[10]!==i||t[11]!==S||t[12]!==w||t[13]!==b||t[14]!==n||t[15]!==r||t[16]!==m||t[17]!==p||t[18]!==d||t[19]!==E||t[20]!==f?(D=(0,Z.jsx)(Nn,{onInitialize:S,onSubmit:w,onError:n,onFlowChange:r,className:i,fetchOrganizationUnitChildren:E,isInitialized:b,size:d,variant:f,showTitle:p,showSubtitle:m,children:a}),t[9]=a,t[10]=i,t[11]=S,t[12]=w,t[13]=b,t[14]=n,t[15]=r,t[16]=m,t[17]=p,t[18]=d,t[19]=E,t[20]=f,t[21]=D):D=t[21],D},Fn={USERS:`users`,USER:`user`,USER_TYPES:`userTypes`,USER_TYPE:`userType`};function In(){let e=(0,Y.c)(14),{http:t}=v(),{getServerUrl:n}=G(),r=f(),{t:i}=K(`users`),{showToast:a}=Ae(),o;e[0]!==n||e[1]!==t?(o=async e=>{let r=n();return(await t.request({url:`${r}/users`,method:`POST`,headers:{"Content-Type":`application/json`},data:e})).data},e[0]=n,e[1]=t,e[2]=o):o=e[2];let s;e[3]!==r||e[4]!==a||e[5]!==i?(s=()=>{r.invalidateQueries({queryKey:[Fn.USERS]}).catch(Ln),a(i(`create.success`),`success`)},e[3]=r,e[4]=a,e[5]=i,e[6]=s):s=e[6];let l;e[7]!==a||e[8]!==i?(l=()=>{a(i(`create.error`),`error`)},e[7]=a,e[8]=i,e[9]=l):l=e[9];let u;return e[10]!==o||e[11]!==s||e[12]!==l?(u={mutationFn:o,onSuccess:s,onError:l},e[10]=o,e[11]=s,e[12]=l,e[13]=u):u=e[13],c(u)}function Ln(){}function Rn(){let e=(0,Y.c)(14),{http:t}=v(),{getServerUrl:n}=G(),r=f(),{t:i}=K(`users`),{showToast:a}=Ae(),o;e[0]!==n||e[1]!==t?(o=async e=>{let r=n();await t.request({url:`${r}/users/${e}`,method:`DELETE`,headers:{"Content-Type":`application/json`}})},e[0]=n,e[1]=t,e[2]=o):o=e[2];let s;e[3]!==r||e[4]!==a||e[5]!==i?(s=(e,t)=>{r.removeQueries({queryKey:[Fn.USER,t]}),r.invalidateQueries({queryKey:[Fn.USERS]}).catch(zn),a(i(`delete.success`),`success`)},e[3]=r,e[4]=a,e[5]=i,e[6]=s):s=e[6];let l;e[7]!==a||e[8]!==i?(l=()=>{a(i(`delete.error`),`error`)},e[7]=a,e[8]=i,e[9]=l):l=e[9];let u;return e[10]!==o||e[11]!==s||e[12]!==l?(u={mutationFn:o,onSuccess:s,onError:l},e[10]=o,e[11]=s,e[12]=l,e[13]=u):u=e[13],c(u)}function zn(){}function Bn(e){let t=(0,Y.c)(10),{http:n}=v(),{getServerUrl:r}=G(),i;t[0]===e?i=t[1]:(i=[Fn.USER,e],t[0]=e,t[1]=i);let a;t[2]!==r||t[3]!==n||t[4]!==e?(a=async()=>{let t=r();return(await n.request({url:`${t}/users/${e}?include=display`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[2]=r,t[3]=n,t[4]=e,t[5]=a):a=t[5];let o=!!e,s;return t[6]!==i||t[7]!==a||t[8]!==o?(s={queryKey:i,queryFn:a,enabled:o},t[6]=i,t[7]=a,t[8]=o,t[9]=s):s=t[9],x(s)}function Vn(e){let t=(0,Y.c)(15),{http:n}=v(),{getServerUrl:r}=G(),i;t[0]===e?i=t[1]:(i=e??{},t[0]=e,t[1]=i);let{limit:a,offset:o,filter:s}=i,c;t[2]!==s||t[3]!==a||t[4]!==o?(c=[Fn.USERS,{limit:a,offset:o,filter:s}],t[2]=s,t[3]=a,t[4]=o,t[5]=c):c=t[5];let l;t[6]!==s||t[7]!==r||t[8]!==n||t[9]!==a||t[10]!==o?(l=async()=>{let e=r(),t=new URLSearchParams;a!==void 0&&t.append(`limit`,String(a)),o!==void 0&&t.append(`offset`,String(o)),s&&t.append(`filter`,s),t.append(`include`,`display`);let i=t.toString();return(await n.request({url:`${e}/users${i?`?${i}`:``}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[6]=s,t[7]=r,t[8]=n,t[9]=a,t[10]=o,t[11]=l):l=t[11];let u;return t[12]!==c||t[13]!==l?(u={queryKey:c,queryFn:l},t[12]=c,t[13]=l,t[14]=u):u=t[14],x(u)}function Hn(e){let t=(0,Y.c)(10),{http:n}=v(),{getServerUrl:r}=G(),i;t[0]===e?i=t[1]:(i=[Fn.USER_TYPE,e],t[0]=e,t[1]=i);let a;t[2]!==r||t[3]!==n||t[4]!==e?(a=async()=>{let t=r();return(await n.request({url:`${t}/user-types/${e}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[2]=r,t[3]=n,t[4]=e,t[5]=a):a=t[5];let o=!!e,s;return t[6]!==i||t[7]!==a||t[8]!==o?(s={queryKey:i,queryFn:a,enabled:o},t[6]=i,t[7]=a,t[8]=o,t[9]=s):s=t[9],x(s)}function Un(e){let t=(0,Y.c)(13),{http:n}=v(),{getServerUrl:r}=G(),i;t[0]===e?i=t[1]:(i=e??{},t[0]=e,t[1]=i);let{limit:a,offset:o}=i,s;t[2]!==a||t[3]!==o?(s=[Fn.USER_TYPES,{limit:a,offset:o}],t[2]=a,t[3]=o,t[4]=s):s=t[4];let c;t[5]!==r||t[6]!==n||t[7]!==a||t[8]!==o?(c=async()=>{let e=r(),t=new URLSearchParams;a!==void 0&&t.append(`limit`,String(a)),o!==void 0&&t.append(`offset`,String(o));let i=t.toString();return(await n.request({url:`${e}/user-types${i?`?${i}`:``}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[5]=r,t[6]=n,t[7]=a,t[8]=o,t[9]=c):c=t[9];let l;return t[10]!==s||t[11]!==c?(l={queryKey:s,queryFn:c},t[10]=s,t[11]=c,t[12]=l):l=t[12],x(l)}function Wn(){let e=(0,Y.c)(14),{http:t}=v(),{getServerUrl:n}=G(),r=f(),{t:i}=K(`users`),{showToast:a}=Ae(),o;e[0]!==n||e[1]!==t?(o=async e=>{let{userId:r,data:i}=e,a=n();return(await t.request({url:`${a}/users/${r}`,method:`PUT`,headers:{"Content-Type":`application/json`},data:i})).data},e[0]=n,e[1]=t,e[2]=o):o=e[2];let s;e[3]!==r||e[4]!==a||e[5]!==i?(s=(e,t)=>{r.invalidateQueries({queryKey:[Fn.USER,t.userId]}).catch(Kn),r.invalidateQueries({queryKey:[Fn.USERS]}).catch(Gn),a(i(`update.success`),`success`)},e[3]=r,e[4]=a,e[5]=i,e[6]=s):s=e[6];let l;e[7]!==a||e[8]!==i?(l=()=>{a(i(`update.error`),`error`)},e[7]=a,e[8]=i,e[9]=l):l=e[9];let u;return e[10]!==o||e[11]!==s||e[12]!==l?(u={mutationFn:o,onSuccess:s,onError:l},e[10]=o,e[11]=s,e[12]=l,e[13]=u):u=e[13],c(u)}function Gn(){}function Kn(){}function qn(e){let t=(0,Y.c)(8),{value:n,onChange:r,fieldLabel:i}=e,[a,o]=(0,X.useState)(``),s;if(t[0]!==i||t[1]!==a||t[2]!==r||t[3]!==n){let e=Array.isArray(n)?n:[],c=()=>{a.trim()&&(r([...e,a.trim()]),o(``))},l=t=>{r(e.filter((e,n)=>n!==t))},u;t[5]===c?u=t[6]:(u=e=>{e.key===`Enter`&&(e.preventDefault(),c())},t[5]=c,t[6]=u);let d=u,f;t[7]===Symbol.for(`react.memo_cache_sentinel`)?(f=e=>o(e.target.value),t[7]=f):f=t[7],s=(0,Z.jsxs)(F,{children:[(0,Z.jsxs)(F,{sx:{display:`flex`,gap:1,mb:1},children:[(0,Z.jsx)(z,{value:a,onChange:f,onKeyDown:d,placeholder:`Add ${i.toLowerCase()}`,fullWidth:!0,size:`small`,variant:`outlined`}),(0,Z.jsx)(B,{size:`small`,onClick:c,disabled:!a.trim(),children:(0,Z.jsx)(ye,{size:16})})]}),(0,Z.jsx)(F,{sx:{display:`flex`,flexWrap:`wrap`,gap:1},children:e.length>0&&e.map((e,t)=>(0,Z.jsx)(D,{label:String(e),onDelete:()=>l(t),variant:`outlined`,size:`medium`},`chip-${e}`))})]}),t[0]=i,t[1]=a,t[2]=r,t[3]=n,t[4]=s}else s=t[4];return s}var Jn=qn;function Yn({id:e,value:t,placeholder:n,required:r,error:i,helperText:a=void 0,color:o,onChange:s,onBlur:c,inputRef:l,name:u,ariaLabel:d=void 0}){let[f,p]=(0,X.useState)(!1);return(0,Z.jsx)(z,{id:e,name:u,value:t,type:f?`text`:`password`,placeholder:n,fullWidth:!0,required:r,variant:`outlined`,error:i,helperText:a,color:o,onChange:s,onBlur:c,inputRef:l,slotProps:{htmlInput:{"aria-label":d},input:{endAdornment:(0,Z.jsx)(M,{position:`end`,children:(0,Z.jsx)(B,{"aria-label":f?`hide password`:`show password`,onClick:()=>p(e=>!e),edge:`end`,children:f?(0,Z.jsx)(be,{}):(0,Z.jsx)(de,{})})})}}})}var Xn=Yn;function Zn({open:e,userId:t,onClose:n,onSuccess:r=void 0}){let{t:i}=K(),a=Rn(),[o,s]=(0,X.useState)(null),c=()=>{a.isPending||(s(null),n())};return(0,Z.jsxs)(oe,{open:e,onClose:c,maxWidth:`sm`,fullWidth:!0,children:[(0,Z.jsx)(ae,{children:i(`users:delete.title`,`Delete User`)}),(0,Z.jsxs)(re,{children:[(0,Z.jsx)(se,{sx:{mb:2},children:i(`users:delete.message`,`Are you sure you want to delete this user? This action cannot be undone.`)}),(0,Z.jsx)(E,{severity:`warning`,sx:{mb:2},children:i(`users:delete.disclaimer`,`All associated data will be permanently removed.`)}),o&&(0,Z.jsx)(E,{severity:`error`,sx:{mt:2},children:o})]}),(0,Z.jsxs)(I,{children:[(0,Z.jsx)(R,{onClick:c,disabled:a.isPending,children:i(`common:actions.cancel`)}),(0,Z.jsx)(R,{onClick:()=>{t&&(s(null),a.mutate(t,{onSuccess:()=>{s(null),n(),r?.()},onError:e=>{s(e.message??i(`users:delete.error`,`Failed to delete user`))}}))},color:`error`,variant:`contained`,disabled:a.isPending||!t,children:a.isPending?i(`common:status.deleting`,`Deleting...`):i(`common:actions.delete`,`Delete`)})]})]})}function Qn(){let e=Ke(),{t}=K(),n=Me(`UsersList`),r=Pe(),{data:i,isLoading:a,error:o}=Vn(),s=Rn(),c=o,[l,u]=(0,X.useState)(!1),[d,f]=(0,X.useState)(null),[p,m]=(0,X.useState)(!1),[h,g]=(0,X.useState)(null);h!==c&&(g(c),c&&u(!0));let _=()=>{u(!1)},v=(0,X.useCallback)(e=>{f(e),m(!0)},[]),y=(0,X.useCallback)(t=>{(async()=>{await e(`/users/${t}`)})().catch(e=>{n.error(`Failed to navigate to user details`,{error:e,userId:t})})},[n,e]),b=()=>{m(!1),f(null)},x=async()=>{if(d)try{await s.mutateAsync(d),m(!1),f(null)}catch(e){m(!1),n.error(`Failed to delete user`,{error:e,userId:d})}},S=(0,X.useMemo)(()=>[{field:`name`,headerName:t(`users:listing.columns.name`,`Name`),flex:1,minWidth:200,renderCell:e=>{let t=e.row.display??e.row.id,n=e.row.attributes?.picture,r=typeof n==`string`?n:void 0;return(0,Z.jsx)(_e.CellIcon,{sx:{width:`100%`},icon:(0,Z.jsx)(Ge,{value:r,size:30,fallback:ke(t)}),primary:t})}},{field:`id`,headerName:t(`users:listing.columns.userId`,`User ID`),flex:1,minWidth:200,renderCell:e=>(0,Z.jsx)(H,{variant:`body2`,sx:{fontFamily:`monospace`,fontSize:`0.875rem`},children:e.row.id})},{field:`ouHandle`,headerName:t(`users:listing.columns.organizationUnit`,`Organization Unit`),flex:.5,minWidth:150,renderCell:e=>(0,Z.jsx)(H,{variant:`body2`,sx:{fontFamily:`monospace`,fontSize:`0.875rem`},children:e.row.ouHandle??e.row.ouId??`-`})},{field:`actions`,headerName:t(`users:listing.columns.actions`,`Actions`),width:150,align:`center`,headerAlign:`center`,sortable:!1,filterable:!1,hideable:!1,renderCell:e=>(0,Z.jsx)(_e.RowActions,{children:e.row.isReadOnly?(0,Z.jsx)(L,{title:t(`common:status.readOnly`,`Read Only`),children:(0,Z.jsx)(B,{size:`small`,disableRipple:!0,sx:{cursor:`default`},children:(0,Z.jsx)(de,{size:16})})}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(L,{title:t(`common:actions.edit`),children:(0,Z.jsx)(B,{size:`small`,onClick:t=>{t.stopPropagation(),y(e.row.id)},children:(0,Z.jsx)(Ce,{size:16})})}),(0,Z.jsx)(L,{title:t(`common:actions.delete`),children:(0,Z.jsx)(B,{size:`small`,color:`error`,onClick:t=>{t.stopPropagation(),v(e.row.id)},children:(0,Z.jsx)(Te,{size:16})})})]})})}],[v,y,t]);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(_e.Provider,{variant:`data-grid-card`,loading:a,children:(0,Z.jsx)(_e.Container,{disablePaper:!0,children:(0,Z.jsx)(_e.DataGrid,{rows:i?.users??[],columns:S,getRowId:e=>e.id,onRowClick:e=>{y(e.row.id)},initialState:{pagination:{paginationModel:{pageSize:10}}},pageSizeOptions:[5,10,25,50],disableRowSelectionOnClick:!0,localeText:r,autoHeight:!0,sx:{"& .MuiDataGrid-row":{cursor:`pointer`}}})})}),(0,Z.jsxs)(oe,{open:p,onClose:b,children:[(0,Z.jsx)(ae,{children:t(`users:deleteUser`)}),(0,Z.jsxs)(re,{children:[(0,Z.jsx)(se,{children:t(`users:confirmDeleteUser`)}),s.error&&(0,Z.jsx)(E,{severity:`error`,sx:{mt:2},children:(0,Z.jsx)(H,{variant:`body2`,sx:{fontWeight:`bold`},children:s.error.message})})]}),(0,Z.jsxs)(I,{children:[(0,Z.jsx)(R,{onClick:b,disabled:s.isPending,children:t(`common:actions.cancel`)}),(0,Z.jsx)(R,{onClick:()=>{x().catch(()=>{})},color:`error`,variant:`contained`,disabled:s.isPending,children:s.isPending?t(`common:status.loading`):t(`common:actions.delete`)})]})]}),(0,Z.jsx)(ue,{open:l,autoHideDuration:6e3,onClose:_,anchorOrigin:{vertical:`top`,horizontal:`right`},children:(0,Z.jsx)(E,{onClose:_,severity:`error`,sx:{width:`100%`},children:c?.message??t(`common:messages.saveError`)})})]})}async function $n(e,t,n,r){let i=new URLSearchParams({limit:String(r.limit),offset:String(r.offset)});return(await e.request({url:`${t}/organization-units/${encodeURIComponent(n)}/ous?${i.toString()}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data}async function er(e,t,n){let r=new URLSearchParams({limit:String(n.limit),offset:String(n.offset)});return(await e.request({url:`${t}/organization-units?${r.toString()}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data}var tr={ORGANIZATION_UNITS:`organization-units`,ORGANIZATION_UNIT:`organization-unit`,CHILD_ORGANIZATION_UNITS:`child-organization-units`,ORGANIZATION_UNIT_USERS:`organization-unit-users`,ORGANIZATION_UNIT_GROUPS:`organization-unit-groups`};function nr(e,t){let n=(0,Y.c)(18),{http:r}=v(),{getServerUrl:i}=G(),a;n[0]===t?a=n[1]:(a=t??{},n[0]=t,n[1]=a);let{limit:o,offset:s}=a,c=o===void 0?30:o,l=s===void 0?0:s,u;n[2]!==c||n[3]!==l?(u={limit:c,offset:l},n[2]=c,n[3]=l,n[4]=u):u=n[4];let d;n[5]!==e||n[6]!==u?(d=[tr.CHILD_ORGANIZATION_UNITS,e,u],n[5]=e,n[6]=u,n[7]=d):d=n[7];let f;n[8]!==i||n[9]!==r||n[10]!==c||n[11]!==l||n[12]!==e?(f=async()=>$n(r,i(),e,{limit:c,offset:l}),n[8]=i,n[9]=r,n[10]=c,n[11]=l,n[12]=e,n[13]=f):f=n[13];let p=!!e,m;return n[14]!==d||n[15]!==f||n[16]!==p?(m={queryKey:d,queryFn:f,enabled:p},n[14]=d,n[15]=f,n[16]=p,n[17]=m):m=n[17],x(m)}function rr(e,t){let n=(0,Y.c)(10),r=t===void 0?!0:t,{http:i}=v(),{getServerUrl:a}=G(),o;n[0]===e?o=n[1]:(o=[tr.ORGANIZATION_UNIT,e],n[0]=e,n[1]=o);let s;n[2]!==a||n[3]!==i||n[4]!==e?(s=async()=>{let t=a();return(await i.request({url:`${t}/organization-units/${encodeURIComponent(e)}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},n[2]=a,n[3]=i,n[4]=e,n[5]=s):s=n[5];let c=r&&!!e,l;return n[6]!==o||n[7]!==s||n[8]!==c?(l={queryKey:o,queryFn:s,enabled:c},n[6]=o,n[7]=s,n[8]=c,n[9]=l):l=n[9],x(l)}function ir(e,t){let n=(0,Y.c)(14),r=t===void 0?!0:t,{http:i}=v(),{getServerUrl:a}=G(),o;n[0]===e?o=n[1]:(o=e??{},n[0]=e,n[1]=o);let{limit:s,offset:c}=o,l=s===void 0?30:s,u=c===void 0?0:c,d;n[2]!==l||n[3]!==u?(d=[tr.ORGANIZATION_UNITS,{limit:l,offset:u}],n[2]=l,n[3]=u,n[4]=d):d=n[4];let f;n[5]!==a||n[6]!==i||n[7]!==l||n[8]!==u?(f=async()=>er(i,a(),{limit:l,offset:u}),n[5]=a,n[6]=i,n[7]=l,n[8]=u,n[9]=f):f=n[9];let p;return n[10]!==r||n[11]!==d||n[12]!==f?(p={queryKey:d,queryFn:f,enabled:r},n[10]=r,n[11]=d,n[12]=f,n[13]=p):p=n[13],x(p)}var Q={PLACEHOLDER_SUFFIX:`__placeholder`,EMPTY_SUFFIX:`__empty`,ERROR_SUFFIX:`__error`,ADD_CHILD_SUFFIX:`__addChild`,LOAD_MORE_SUFFIX:`__loadMore`,ROOT_PARENT_ID:`__root`,ROOT_LOAD_MORE_ID:`__root__loadMore`,PAGE_SIZE:30};function ar(e,t,n){return e.map(e=>{if(e.id===t){let t=(e.children??[]).filter(e=>!e.id.endsWith(Q.LOAD_MORE_SUFFIX));return{...e,children:[...t,...n]}}return e.children&&e.children.length>0?{...e,children:ar(e.children,t,n)}:e})}function or(e){let t=new Map,n=e=>{e.forEach(e=>{t.set(e.id,e),e.children&&n(e.children)})};return n(e),t}function sr(e){return e.map(e=>({id:e.id,label:e.name,handle:e.handle,description:e.description,logoUrl:e.logoUrl,isReadOnly:e.isReadOnly,children:[{id:`${e.id}${Q.PLACEHOLDER_SUFFIX}`,label:``,handle:``,isPlaceholder:!0}]}))}function cr(e,t,n){return e.map(e=>e.id===t?{...e,children:n}:e.children&&e.children.length>0?{...e,children:cr(e.children,t,n)}:e)}function lr(){return(0,Z.jsx)(O,{size:16})}function ur(e){let{itemMap:t,loadingItems:n,loadMoreLoadingItems:r,onLoadMore:i,itemId:a,label:o,...s}=e,c={itemId:a,label:o,...s},l=ie(),{t:u}=K(),d=typeof o==`string`?o:``,f=t?.get(a),p=a.endsWith(Q.LOAD_MORE_SUFFIX),m=a.endsWith(Q.EMPTY_SUFFIX),h=!m&&!p&&(f?.isPlaceholder??a.endsWith(Q.PLACEHOLDER_SUFFIX)),g=n?.has(a);if(p){let e=a.replace(Q.LOAD_MORE_SUFFIX,``),t=r?.has(e);return(0,Z.jsx)(Ee,{...c,sx:{"& > .MuiTreeItem-content":{border:`1px dashed`,borderColor:l.vars?.palette.divider,borderRadius:.5,backgroundColor:`transparent !important`,cursor:t?`default`:`pointer`,transition:`all 0.15s ease-in-out`,"&:hover":{borderColor:t?void 0:l.vars?.palette.primary.main}}},label:(0,Z.jsx)(F,{role:`button`,tabIndex:0,onClick:n=>{n.stopPropagation(),t||i?.(e)},onKeyDown:n=>{(n.key===`Enter`||n.key===` `)&&!t&&(n.preventDefault(),n.stopPropagation(),i?.(e))},sx:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:1,py:.25},children:t?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(O,{size:14}),(0,Z.jsx)(H,{variant:`caption`,color:`text.secondary`,children:u(`common:status.loading`)})]}):(0,Z.jsx)(H,{variant:`caption`,color:`primary`,sx:{fontWeight:500},children:u(`organizationUnits:listing.treeView.loadMore`)})})})}return m?(0,Z.jsx)(Ee,{...c,sx:{"& > .MuiTreeItem-content":{border:`none !important`,backgroundColor:`transparent !important`}},label:(0,Z.jsx)(H,{variant:`caption`,color:`text.secondary`,sx:{fontStyle:`italic`,pl:1},children:d})}):h?(0,Z.jsx)(Ee,{...c,sx:{"& > .MuiTreeItem-content":{border:`none !important`,backgroundColor:`transparent !important`}},label:(0,Z.jsxs)(F,{sx:{display:`flex`,alignItems:`center`,gap:1},children:[(0,Z.jsx)(O,{size:16}),(0,Z.jsx)(H,{variant:`caption`,color:`text.secondary`,sx:{fontStyle:`italic`},children:u(`common:status.loading`)})]})}):(0,Z.jsx)(Ee,{...c,...g?{slots:{collapseIcon:lr,expandIcon:lr}}:{},label:(0,Z.jsxs)(F,{sx:{display:`flex`,alignItems:`center`,gap:1.5},children:[(0,Z.jsx)(Ge,{value:f?.logoUrl,size:30,fallback:`emoji:🏛️`}),(0,Z.jsxs)(F,{sx:{flexGrow:1,minWidth:0},children:[(0,Z.jsx)(H,{variant:`body2`,sx:{fontWeight:500,lineHeight:1.3},children:d}),f?.handle&&(0,Z.jsx)(H,{variant:`caption`,color:`text.secondary`,sx:{lineHeight:1.2,display:`block`},children:f.handle})]})]})})}function dr({id:e=void 0,value:t,onChange:n,error:r=!1,helperText:i=``,rootOuId:a=void 0,maxHeight:o=300}){let s=ie(),{t:c}=K(),l=Me(`OrganizationUnitTreePicker`),{http:u}=v(),{getServerUrl:d}=G(),p=f(),{data:m,isLoading:h}=ir(void 0,!a),{data:g,isLoading:_,error:y}=rr(a),{data:b,isLoading:x,error:S}=nr(a),[C,w]=(0,X.useState)([]),[T,E]=(0,X.useState)([]),[D,O]=(0,X.useState)(new Set),[k,A]=(0,X.useState)(new Set),[j,M]=(0,X.useState)(new Set),[N,P]=(0,X.useState)(new Map),[ee,te]=(0,X.useState)(0),[I,L]=(0,X.useState)(!1),ne=(0,X.useRef)(!1);ne.current=I;let R=(0,X.useRef)(k);R.current=k;let z=(0,X.useMemo)(()=>or(C),[C]);(0,X.useEffect)(()=>{w([]),E([]),O(new Set),A(new Set),M(new Set),P(new Map),te(0),L(!1)},[a]),(0,X.useEffect)(()=>{if(!a&&m?.organizationUnits&&m.organizationUnits.length>0&&C.length===0){let e=sr(m.organizationUnits);m.organizationUnits.length<m.totalResults&&e.push({id:Q.ROOT_LOAD_MORE_ID,label:``,handle:``,isPlaceholder:!0}),te(m.organizationUnits.length),w(e)}},[a,m,C.length]),(0,X.useEffect)(()=>{if(!a||!g||!b||C.length>0)return;let e=sr(b.organizationUnits);b.organizationUnits.length<b.totalResults&&e.push({id:`${a}${Q.LOAD_MORE_SUFFIX}`,label:``,handle:``,isPlaceholder:!0});let t=b.organizationUnits.length>0?e:[{id:`${a}${Q.EMPTY_SUFFIX}`,label:c(`organizationUnits:listing.treeView.noChildren`),handle:``,isPlaceholder:!0}],n={id:g.id,label:g.name,handle:g.handle,description:g.description??void 0,logoUrl:g.logoUrl,children:t};P(e=>new Map(e).set(a,b.organizationUnits.length)),O(e=>new Set(e).add(a)),E([a]),w([n])},[a,g,b,C.length,c]);let re=(0,X.useCallback)(async(e,t)=>p.fetchQuery({queryKey:[tr.CHILD_ORGANIZATION_UNITS,e,{limit:Q.PAGE_SIZE,offset:t}],queryFn:async()=>$n(u,d(),e,{limit:Q.PAGE_SIZE,offset:t}),staleTime:0}),[d,p,u]),B=(0,X.useCallback)((e,t,n)=>{let r=t.organizationUnits;if(r.length===0&&n===0)return[{id:`${e}${Q.EMPTY_SUFFIX}`,label:c(`organizationUnits:listing.treeView.noChildren`),handle:``,isPlaceholder:!0}];let i=sr(r);return n+r.length<t.totalResults&&i.push({id:`${e}${Q.LOAD_MORE_SUFFIX}`,label:``,handle:``,isPlaceholder:!0}),i},[c]),V=(0,X.useCallback)(async e=>{if(!R.current.has(e)){A(t=>new Set(t).add(e));try{let t=await re(e,0),n=B(e,t,0);P(n=>new Map(n).set(e,t.organizationUnits.length)),w(t=>cr(t,e,n)),O(t=>new Set(t).add(e)),E(t=>t.includes(e)?t:[...t,e])}catch(t){l.error(`Failed to load child organization units`,{error:t,parentId:e})}finally{A(t=>{let n=new Set(t);return n.delete(e),n})}}},[re,B,l]),ae=(0,X.useCallback)(async()=>{if(!ne.current){L(!0);try{let e=await p.fetchQuery({queryKey:[tr.ORGANIZATION_UNITS,{limit:Q.PAGE_SIZE,offset:ee}],queryFn:async()=>er(u,d(),{limit:Q.PAGE_SIZE,offset:ee}),staleTime:0}),t=sr(e.organizationUnits),n=ee+e.organizationUnits.length;n<e.totalResults&&t.push({id:Q.ROOT_LOAD_MORE_ID,label:``,handle:``,isPlaceholder:!0}),te(n),w(e=>[...e.filter(e=>e.id!==Q.ROOT_LOAD_MORE_ID),...t])}catch(e){l.error(`Failed to load more root organization units`,{error:e})}finally{L(!1)}}},[ee,d,p,u,l]),oe=(0,X.useCallback)(async e=>{if(e===Q.ROOT_PARENT_ID){await ae();return}M(t=>new Set(t).add(e));try{let t=N.get(e)??Q.PAGE_SIZE,n=await re(e,t),r=B(e,n,t);P(r=>new Map(r).set(e,t+n.organizationUnits.length)),w(t=>ar(t,e,r))}catch(t){l.error(`Failed to load more child organization units`,{error:t,parentId:e})}finally{M(t=>{let n=new Set(t);return n.delete(e),n})}},[N,re,B,l,ae]),U=(0,X.useMemo)(()=>{if(!I)return j;let e=new Set(j);return e.add(Q.ROOT_PARENT_ID),e},[j,I]),se=(0,X.useCallback)((e,t,n)=>{!n||D.has(t)||k.has(t)||V(t).catch(e=>{l.error(`Failed to load child organization units`,{error:e,parentId:t})})},[D,k,V,l]),ce=(0,X.useCallback)((e,t)=>{t&&!t.endsWith(Q.PLACEHOLDER_SUFFIX)&&!t.endsWith(Q.EMPTY_SUFFIX)&&!t.endsWith(Q.LOAD_MORE_SUFFIX)&&n(t)},[n]),le=(0,X.useCallback)((e,t)=>{let n=new Set(T);E(t.filter(e=>n.has(e)||D.has(e)))},[T,D]),ue=(0,X.useCallback)(e=>{oe(e).catch(t=>{l.error(`Failed to load more child organization units`,{error:t,parentId:e})})},[oe,l]),W=a?_||x:h,de=a?y??S:null;return W?(0,Z.jsx)(Ne,{}):de?(0,Z.jsx)(H,{variant:`body2`,color:`error`,children:de.message??c(`organizationUnits:treePicker.error`)}):!a&&m?.organizationUnits.length===0?(0,Z.jsx)(H,{variant:`body2`,color:`text.secondary`,children:c(`organizationUnits:treePicker.empty`)}):(0,Z.jsxs)(F,{children:[(0,Z.jsx)(F,{sx:{maxHeight:o,overflow:`auto`},children:(0,Z.jsx)(Oe,{id:e,items:C,expandedItems:T,onExpandedItemsChange:le,onItemExpansionToggle:se,selectedItems:t||null,onSelectedItemsChange:ce,slots:{item:ur},slotProps:{item:{itemMap:z,loadingItems:k,loadMoreLoadingItems:U,onLoadMore:ue}},getItemLabel:e=>e.label,sx:{"& .MuiTreeItem-content":{cursor:`pointer`,border:`1px solid`,borderColor:s.vars?.palette.divider,borderRadius:.5,py:.75,px:1,mb:.5,transition:`all 0.15s ease-in-out`,"&:hover":{backgroundColor:s.vars?.palette.action.hover,borderColor:s.vars?.palette.primary.main}},"& .Mui-selected > .MuiTreeItem-content":{backgroundColor:`${s.vars?.palette.primary.main}14`,borderColor:s.vars?.palette.primary.main},"& .MuiTreeItem-iconContainer":{color:s.vars?.palette.text.secondary,mr:.5},"& .MuiTreeItem-groupTransition":{ml:2,pl:2,borderLeft:`1px dashed`,borderColor:s.vars?.palette.divider}}})}),i&&(0,Z.jsx)(H,{variant:`caption`,color:r?`error`:`text.secondary`,sx:{mt:.5,ml:1.75},children:i})]})}function fr({rootOuId:e,selectedOuId:t,onOuIdChange:n,onReadyChange:r=void 0}){let{t:i}=K();return(0,X.useEffect)(()=>{t||n(e)},[t,e,n]),(0,X.useEffect)(()=>{r&&r(t.length>0)},[t,r]),(0,Z.jsxs)(W,{direction:`column`,spacing:4,"data-testid":`configure-organization-unit`,children:[(0,Z.jsx)(H,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.selectOrganizationUnit.title`)}),(0,Z.jsx)(H,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.selectOrganizationUnit.subtitle`)}),(0,Z.jsxs)(A,{fullWidth:!0,required:!0,children:[(0,Z.jsx)(U,{children:i(`users:createWizard.selectOrganizationUnit.fieldLabel`)}),(0,Z.jsx)(dr,{id:`user-create-ou-picker`,rootOuId:e,value:t,onChange:n,maxHeight:500})]})]})}var pr=(e,t,n,r,i)=>{let a=t.required??!1,o=e;if(t.displayName){let e=i?.(t.displayName);o=(e===``?void 0:e)??t.displayName}if(t.type===`string`){let i=t;if(i.enum&&i.enum.length>0){let t=i.enum;return(0,Z.jsxs)(A,{children:[(0,Z.jsxs)(U,{htmlFor:e,children:[o,a&&(0,Z.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,Z.jsx)(J,{name:e,control:n,rules:{required:a?`${o} is required`:!1},render:({field:n})=>(0,Z.jsxs)(le,{...n,value:n.value??``,id:e,fullWidth:!0,required:a,error:!!r[e],displayEmpty:!0,children:[(0,Z.jsx)(V,{value:``,children:(0,Z.jsxs)(`em`,{children:[`Select `,o]})}),t.map(e=>(0,Z.jsx)(V,{value:e,children:e.charAt(0).toUpperCase()+e.slice(1)},e))]})}),r[e]&&(0,Z.jsx)(H,{variant:`caption`,color:`error`,sx:{mt:.5,ml:1.75},children:r[e]?.message})]},e)}let s;return i.regex&&(s={value:new RegExp(i.regex),message:`${o} format is invalid`}),(0,Z.jsxs)(A,{children:[(0,Z.jsxs)(U,{htmlFor:e,children:[o,a&&(0,Z.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,Z.jsx)(J,{name:e,control:n,rules:{required:a?`${o} is required`:!1,pattern:s},render:({field:t})=>i.credential?(0,Z.jsx)(Xn,{id:e,name:t.name,value:t.value??``,placeholder:`Enter ${o.toLowerCase()}`,required:a,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:t.onChange,onBlur:t.onBlur,inputRef:t.ref}):(0,Z.jsx)(z,{...t,value:t.value??``,id:e,type:`text`,placeholder:`Enter ${o.toLowerCase()}`,fullWidth:!0,required:a,variant:`outlined`,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`})})]},e)}if(t.type===`number`){let i=t;return(0,Z.jsxs)(A,{children:[(0,Z.jsxs)(U,{htmlFor:e,children:[o,a&&(0,Z.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,Z.jsx)(J,{name:e,control:n,rules:{required:a?`${o} is required`:!1},render:({field:t})=>i.credential?(0,Z.jsx)(Xn,{id:e,name:t.name,value:String(t.value??``),placeholder:`Enter ${o.toLowerCase()}`,required:a,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:e=>{let{value:n}=e.target,r=Number(n);t.onChange(n&&!Number.isNaN(r)?r:``)},onBlur:t.onBlur,inputRef:t.ref}):(0,Z.jsx)(z,{...t,value:t.value??``,id:e,type:`number`,placeholder:`Enter ${o.toLowerCase()}`,fullWidth:!0,required:a,variant:`outlined`,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:e=>{let{value:n}=e.target;t.onChange(n?Number(n):``)}})})]},e)}return t.type===`boolean`?(0,Z.jsx)(A,{children:(0,Z.jsx)(J,{name:e,control:n,render:({field:t})=>(0,Z.jsx)(F,{sx:{display:`flex`,alignItems:`center`,py:1},children:(0,Z.jsx)(P,{control:(0,Z.jsx)(ce,{id:e,name:t.name,checked:!!t.value,onChange:e=>t.onChange(e.target.checked),onBlur:t.onBlur,ref:t.ref}),required:a,label:o,sx:{mb:2}})})})},e):t.type===`array`?(0,Z.jsxs)(A,{fullWidth:!0,children:[(0,Z.jsxs)(U,{htmlFor:e,children:[o,a&&(0,Z.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,Z.jsx)(J,{name:e,control:n,rules:{required:a?`${o} is required`:!1,validate:e=>a&&(!Array.isArray(e)||e.length===0)?`${o} must have at least one value`:!0},render:({field:t})=>(0,Z.jsxs)(F,{children:[(0,Z.jsx)(Jn,{value:Array.isArray(t.value)?t.value:[],onChange:t.onChange,fieldLabel:o}),r[e]&&(0,Z.jsx)(H,{variant:`caption`,color:`error`,sx:{mt:.5,ml:1.75},children:r[e]?.message})]})})]},e):null};function mr({schema:e,defaultValues:t,onFormValuesChange:n,onReadyChange:r=void 0}){let{t:i}=K(),{resolveDisplayName:a}=Fe({handlers:{t:i}}),{control:o,watch:s,formState:{errors:c,isValid:l}}=Xe({defaultValues:t,mode:`onChange`});return(0,X.useEffect)(()=>{let e=s(e=>{n(e)});return()=>e.unsubscribe()},[s,n]),(0,X.useEffect)(()=>{r&&r(l)},[l,r]),(0,Z.jsxs)(W,{direction:`column`,spacing:4,"data-testid":`configure-user-details`,children:[(0,Z.jsx)(H,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.userDetails.title`)}),(0,Z.jsx)(H,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.userDetails.subtitle`)}),(0,Z.jsx)(F,{sx:{display:`flex`,flexDirection:`column`,gap:2},children:e.schema&&Object.entries(e.schema).map(([e,t])=>pr(e,t,o,c,a))})]})}function hr({schemas:e,selectedSchema:t,onSchemaChange:n,onReadyChange:r=void 0}){let{t:i}=K();return(0,X.useEffect)(()=>{r&&r(t!==null)},[t,r]),(0,Z.jsxs)(W,{direction:`column`,spacing:4,"data-testid":`configure-user-type`,children:[(0,Z.jsx)(H,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.selectUserType.title`)}),(0,Z.jsx)(H,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.selectUserType.subtitle`)}),(0,Z.jsxs)(A,{fullWidth:!0,required:!0,children:[(0,Z.jsx)(U,{htmlFor:`user-type-select`,children:i(`users:createWizard.selectUserType.fieldLabel`)}),(0,Z.jsxs)(le,{id:`user-type-select`,value:t?.id??``,onChange:t=>{n(e.find(e=>e.id===t.target.value)??null)},displayEmpty:!0,"data-testid":`user-type-select`,children:[(0,Z.jsx)(V,{value:``,disabled:!0,children:(0,Z.jsx)(`em`,{children:i(`users:createWizard.selectUserType.placeholder`)})}),e.map(e=>(0,Z.jsx)(V,{value:e.id,children:e.name},e.id))]})]})]})}function gr(e){let t=(0,Y.c)(8),{user:n,copiedField:r,onCopyToClipboard:i}=e,{t:a}=K(),o;if(t[0]!==r||t[1]!==i||t[2]!==a||t[3]!==n.id){let e;t[5]!==i||t[6]!==n.id?(e=()=>{i(n.id,`userId`).catch(_r)},t[5]=i,t[6]=n.id,t[7]=e):e=t[7],o=(0,Z.jsx)(De,{title:a(`users:manageUser.sections.quickCopy.title`,`Quick Copy`),description:a(`users:manageUser.sections.quickCopy.description`,`Copy user identifiers for use in your application.`),children:(0,Z.jsx)(W,{spacing:3,children:(0,Z.jsxs)(A,{fullWidth:!0,children:[(0,Z.jsx)(U,{htmlFor:`user-id-input`,children:a(`users:manageUser.sections.quickCopy.userId`,`User ID`)}),(0,Z.jsx)(z,{fullWidth:!0,id:`user-id-input`,value:n.id,InputProps:{readOnly:!0,endAdornment:(0,Z.jsx)(M,{position:`end`,children:(0,Z.jsx)(L,{title:r===`userId`?a(`common:actions.copied`,`Copied`):a(`users:manageUser.sections.quickCopy.copyUserId`,`Copy User ID`),children:(0,Z.jsx)(B,{"aria-label":r===`userId`?a(`common:actions.copied`,`Copied`):a(`users:manageUser.sections.quickCopy.copyUserId`,`Copy User ID`),onClick:e,edge:`end`,children:r===`userId`?(0,Z.jsx)(ge,{size:16}):(0,Z.jsx)(ve,{size:16})})})})},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]})})}),t[0]=r,t[1]=i,t[2]=a,t[3]=n.id,t[4]=o}else o=t[4];return o}function _r(){return null}var vr=(0,X.createContext)(void 0),$={USER_TYPE:`USER_TYPE`,ORGANIZATION_UNIT:`ORGANIZATION_UNIT`,USER_DETAILS:`USER_DETAILS`},yr={currentStep:$.USER_TYPE,selectedSchema:null,selectedOuId:null,formValues:{},error:null};function br({children:e}){let[t,n]=(0,X.useState)(yr.currentStep),[r,i]=(0,X.useState)(yr.selectedSchema),[a,o]=(0,X.useState)(yr.selectedOuId),[s,c]=(0,X.useState)(yr.formValues),[l,u]=(0,X.useState)(yr.error),d=(0,X.useCallback)(()=>{n(yr.currentStep),i(yr.selectedSchema),o(yr.selectedOuId),c(yr.formValues),u(yr.error)},[]),f=(0,X.useMemo)(()=>({currentStep:t,setCurrentStep:n,selectedSchema:r,setSelectedSchema:i,selectedOuId:a,setSelectedOuId:o,formValues:s,setFormValues:c,error:l,setError:u,reset:d}),[t,r,a,s,l,d]);return(0,Z.jsx)(vr.Provider,{value:f,children:e})}function xr(){let e=(0,X.useContext)(vr);if(!e)throw Error(`useUserCreate must be used within a UserCreateProvider`);return e}function Sr(){let{t:e}=K(),t=Ke(),n=Me(`UserCreatePage`),r=In(),{currentStep:i,setCurrentStep:a,selectedSchema:o,setSelectedSchema:s,selectedOuId:c,setSelectedOuId:l,formValues:u,setFormValues:d,error:f,setError:p}=xr(),{data:m}=Un(),{data:h,isLoading:g}=Hn(o?.id),{data:_,isLoading:y,error:b}=nr(o?.ouId,{limit:1,offset:0}),x=v().user?.ouId??null,S=b?.response?.status===403,C=!!b&&!S,w=(0,X.useMemo)(()=>m?.types??[],[m]),T=!y&&!b&&(_?.totalResults??0)>0,D=(0,X.useMemo)(()=>{let e=[$.USER_TYPE];return T&&e.push($.ORGANIZATION_UNIT),e.push($.USER_DETAILS),e},[T]),O=(0,X.useMemo)(()=>{let t={USER_TYPE:{label:e(`users:createWizard.steps.userType`)}};return T&&(t.ORGANIZATION_UNIT={label:e(`users:createWizard.steps.organizationUnit`)}),t.USER_DETAILS={label:e(`users:createWizard.steps.userDetails`)},t},[e,T]),[k,A]=(0,X.useState)(null),[j,M]=(0,X.useState)(!1),[P,ee]=(0,X.useState)({USER_TYPE:!1,ORGANIZATION_UNIT:!1,USER_DETAILS:!1}),te=()=>{r.isPending||Promise.resolve(t(`/users`)).catch(e=>{n.error(`Failed to navigate to users page`,{error:e})})},I=(0,X.useCallback)((e,t)=>{ee(n=>({...n,[e]:t}))},[]),L=(0,X.useCallback)(e=>{I($.USER_TYPE,e)},[I]),z=(0,X.useCallback)(e=>{I($.ORGANIZATION_UNIT,e)},[I]),re=(0,X.useCallback)(e=>{I($.USER_DETAILS,e)},[I]),V=(0,X.useCallback)(e=>{e?.id!==o?.id&&(d({}),l(null),ee(e=>({...e,ORGANIZATION_UNIT:!1,USER_DETAILS:!1}))),s(e)},[o,s,l,d]),ie=async()=>{if(A(null),p(null),!o){A(e(`users:createWizard.validationErrors.userTypeRequired`)),M(!0);return}let i=(c??o.ouId)?.trim();if(!i){A(e(`users:createWizard.validationErrors.ouIdMissing`)),M(!0);return}let a=Object.fromEntries(Object.entries(u).filter(([,e])=>e!==``&&e!=null)),s={ouId:i,type:o.name,attributes:a};try{await r.mutateAsync(s),await t(`/users`)}catch(e){n.error(`Failed to create user or navigate`,{error:e})}},ae=()=>{switch(i){case $.USER_TYPE:if(o?.ouId&&y)return;if(C){p(e(`users:createWizard.errors.childOuProbeFailed`));return}T?a($.ORGANIZATION_UNIT):S?x?(l(x),a($.USER_DETAILS)):p(e(`users:createWizard.errors.noOuAccess`)):(l(o?.ouId??null),a($.USER_DETAILS));break;case $.ORGANIZATION_UNIT:a($.USER_DETAILS);break;case $.USER_DETAILS:ie().catch(()=>{});break;default:break}},oe=()=>{switch(i){case $.ORGANIZATION_UNIT:a($.USER_TYPE);break;case $.USER_DETAILS:a(T?$.ORGANIZATION_UNIT:$.USER_TYPE);break;default:break}},U=()=>{switch(i){case $.USER_TYPE:return(0,Z.jsx)(hr,{schemas:w,selectedSchema:o,onSchemaChange:V,onReadyChange:L});case $.ORGANIZATION_UNIT:return o?.ouId?(0,Z.jsx)(fr,{rootOuId:o.ouId,selectedOuId:c??``,onOuIdChange:l,onReadyChange:z},o.ouId):(a($.USER_TYPE),null);case $.USER_DETAILS:return g?(0,Z.jsx)(F,{sx:{textAlign:`center`,py:4},children:(0,Z.jsx)(H,{variant:`body2`,color:`text.secondary`,children:e(`common:status.loading`)})}):h?(0,Z.jsx)(mr,{schema:h,defaultValues:u,onFormValuesChange:d,onReadyChange:re},o?.id):null;default:return null}},se=()=>(D.indexOf(i)+1)/D.length*100,ce=()=>{let e=D.indexOf(i);return D.slice(0,e+1)},le=()=>{M(!1)},de=i===D[D.length-1];return(0,Z.jsxs)(F,{sx:{minHeight:`100vh`,display:`flex`,flexDirection:`column`},children:[(0,Z.jsx)(N,{variant:`determinate`,value:se(),sx:{height:6}}),(0,Z.jsxs)(F,{sx:{flex:1,display:`flex`,flexDirection:`column`},children:[(0,Z.jsx)(F,{sx:{p:4,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:(0,Z.jsxs)(W,{direction:`row`,alignItems:`center`,spacing:2,children:[(0,Z.jsx)(B,{"aria-label":e(`common:actions.close`),onClick:te,sx:{bgcolor:`background.paper`,"&:hover":{bgcolor:`action.hover`},boxShadow:1},children:(0,Z.jsx)(we,{size:24})}),(0,Z.jsx)(ne,{separator:(0,Z.jsx)(me,{size:16}),"aria-label":`breadcrumb`,children:ce().map((e,t,n)=>t===n.length-1?(0,Z.jsx)(H,{variant:`h5`,color:`text.primary`,children:O[e]?.label},e):(0,Z.jsx)(H,{variant:`h5`,color:`inherit`,role:`button`,tabIndex:0,onClick:()=>a(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),a(e))},sx:{cursor:`pointer`,"&:hover":{textDecoration:`underline`}},children:O[e]?.label},e))})]})}),(0,Z.jsx)(F,{sx:{flex:1,display:`flex`,minHeight:0},children:(0,Z.jsx)(F,{sx:{flex:1,display:`flex`,flexDirection:`column`,py:8,px:20,mx:i===$.USER_DETAILS?0:`auto`,alignItems:`flex-start`},children:(0,Z.jsxs)(F,{sx:{width:`100%`,maxWidth:800,display:`flex`,flexDirection:`column`},children:[f&&(0,Z.jsx)(E,{severity:`error`,sx:{my:3},onClose:()=>p(null),children:f}),r.error&&(0,Z.jsx)(E,{severity:`error`,sx:{mb:3},children:(0,Z.jsx)(H,{variant:`body2`,sx:{fontWeight:`bold`,mb:.5},children:r.error.message})}),U(),(0,Z.jsxs)(W,{direction:`row`,justifyContent:`flex-end`,alignItems:`center`,spacing:2,sx:{mt:4},children:[i!==$.USER_TYPE&&(0,Z.jsx)(R,{variant:`text`,onClick:oe,disabled:r.isPending,children:e(`common:actions.back`)}),(0,Z.jsx)(R,{variant:`contained`,disabled:!P[i]||r.isPending||i===$.USER_TYPE&&!!o?.ouId&&y,sx:{minWidth:140},onClick:ae,children:de?r.isPending?e(`common:status.saving`):e(`users:createUser.title`):e(`common:actions.continue`)})]})]})})})]}),(0,Z.jsx)(ue,{open:j,autoHideDuration:6e3,onClose:le,anchorOrigin:{vertical:`top`,horizontal:`right`},children:(0,Z.jsx)(E,{onClose:le,severity:`error`,sx:{width:`100%`},children:k})})]})}function Cr({children:e=null,value:t,index:n,...r}){return(0,Z.jsx)(`div`,{role:`tabpanel`,hidden:t!==n,id:`user-tabpanel-${n}`,"aria-labelledby":`user-tab-${n}`,...r,children:t===n&&(0,Z.jsx)(F,{sx:{py:3},children:e})})}function wr(){let e=Ke(),{t}=K(),n=Me(`UserEditPage`),{resolveDisplayName:r}=Fe({handlers:{t}}),{userId:i}=qe(),[a,o]=(0,X.useState)(0),[s,c]=(0,X.useState)(!1),[l,u]=(0,X.useState)(!1),[d,f]=(0,X.useState)(!1),[p,m]=(0,X.useState)(null),h=(0,X.useRef)(null),{data:g,isLoading:_,error:v}=Bn(i),y=Wn(),{data:b}=Un(),x=(0,X.useMemo)(()=>{if(!(!g?.type||!b?.types))return b.types.find(e=>e.name===g.type)},[g?.type,b?.types]),S=x?.id,C=x?.ouId?.trim(),w=C===``?void 0:C,{data:T,isLoading:O,error:k}=Hn(S),j=(0,X.useMemo)(()=>T?.schema?Object.entries(T.schema).some(([,e])=>!((e.type===`string`||e.type===`number`)&&e.credential)):!1,[T]),N=g?.display??g?.id??``,{control:P,handleSubmit:I,setValue:ne,formState:{errors:re}}=Xe({defaultValues:{}});(0,X.useEffect)(()=>{g?.attributes&&T?.schema&&Object.entries(g.attributes).forEach(([e,t])=>{ne(e,t)})},[g,T,ne]),(0,X.useEffect)(()=>()=>{h.current&&clearTimeout(h.current)},[]);let V=(0,X.useCallback)(async(e,t)=>{await navigator.clipboard.writeText(e),m(t),h.current&&clearTimeout(h.current),h.current=setTimeout(()=>{m(null)},2e3)},[]),ie=(e,t)=>{o(t)},ae=async e=>{let t=w??g?.ouId;if(!(!i||!t||!g?.type))try{u(!0);let n={ouId:t,type:g.type,attributes:e};await y.mutateAsync({userId:i,data:n}),c(!1)}catch(e){n.error(`Failed to update user`,{error:e})}finally{u(!1)}},oe=()=>{c(!1),y.reset(),g?.attributes&&T?.schema&&Object.entries(g.attributes).forEach(([e,t])=>{ne(e,t)})},se=async()=>{await e(`/users`)},ce=()=>{(async()=>{await e(`/users`)})().catch(e=>{n.error(`Failed to navigate after deleting user`,{error:e})})};if(_||O)return(0,Z.jsx)(Ne,{});if(v??k)return(0,Z.jsxs)(Se,{children:[(0,Z.jsx)(E,{severity:`error`,sx:{mb:2},children:v?.message??k?.message??`Failed to load user information`}),(0,Z.jsx)(R,{onClick:()=>{se().catch(()=>null)},startIcon:(0,Z.jsx)(fe,{size:16}),children:t(`users:manageUser.back`)})]});if(!g)return(0,Z.jsxs)(Se,{children:[(0,Z.jsx)(E,{severity:`warning`,sx:{mb:2},children:t(`users:manageUser.notFound`,`User not found`)}),(0,Z.jsx)(R,{onClick:()=>{se().catch(()=>null)},startIcon:(0,Z.jsx)(fe,{size:16}),children:t(`users:manageUser.back`)})]});let le=g.attributes?.picture;return(0,Z.jsxs)(Se,{children:[g.isReadOnly&&(0,Z.jsx)(E,{severity:`info`,sx:{mb:2},children:t(`common:messages.readOnlyResource`,`This resource is read-only and cannot be modified.`)}),(0,Z.jsxs)(xe,{children:[(0,Z.jsx)(xe.BackButton,{component:(0,Z.jsx)(Je,{to:`/users`}),children:t(`users:manageUser.back`,`Back to Users`)}),(0,Z.jsx)(xe.Avatar,{children:(0,Z.jsx)(Ge,{value:le,fallback:ke(N),size:55})}),(0,Z.jsx)(xe.Header,{children:(0,Z.jsx)(H,{variant:`h3`,children:N})}),(0,Z.jsx)(xe.SubHeader,{children:(0,Z.jsx)(W,{direction:`row`,alignItems:`center`,spacing:1,children:(0,Z.jsx)(D,{label:g.type,size:`small`,sx:{px:.5}})})})]}),(0,Z.jsx)(te,{value:a,onChange:ie,"aria-label":`user settings tabs`,children:(0,Z.jsx)(ee,{label:t(`users:manageUser.tabs.general`,`General`),id:`user-tab-0`,"aria-controls":`user-tabpanel-0`,sx:{textTransform:`none`}})}),(0,Z.jsx)(Z.Fragment,{children:(0,Z.jsx)(Cr,{value:a,index:0,children:(0,Z.jsxs)(W,{spacing:3,children:[(0,Z.jsx)(gr,{user:g,copiedField:p,onCopyToClipboard:V}),(0,Z.jsx)(De,{title:t(`users:manageUser.sections.attributes.title`,`User Attributes`),description:t(`users:manageUser.sections.attributes.description`,`View and manage user attribute values.`),headerAction:!s&&j&&!g.isReadOnly?(0,Z.jsx)(R,{variant:`outlined`,size:`small`,onClick:()=>c(!0),children:t(`common:actions.edit`,`Edit`)}):void 0,children:s?(0,Z.jsxs)(F,{component:`form`,onSubmit:e=>{I(ae)(e).catch(()=>null)},noValidate:!0,sx:{display:`flex`,flexDirection:`column`,gap:2},children:[T?.schema?Object.entries(T.schema).filter(([,e])=>!((e.type===`string`||e.type===`number`)&&e.credential)).map(([e,t])=>pr(e,t,P,re,r)):(0,Z.jsx)(H,{variant:`body2`,color:`text.secondary`,children:t(`users:manageUser.sections.attributes.noSchema`,`No schema available for editing`)}),y.error&&(0,Z.jsx)(E,{severity:`error`,sx:{mt:2},children:(0,Z.jsx)(H,{variant:`body2`,sx:{fontWeight:`bold`,mb:.5},children:y.error.message})}),(0,Z.jsxs)(W,{direction:`row`,spacing:2,justifyContent:`flex-end`,sx:{mt:2},children:[(0,Z.jsx)(R,{variant:`outlined`,onClick:oe,disabled:l,startIcon:(0,Z.jsx)(we,{size:16}),children:t(`common:actions.cancel`,`Cancel`)}),(0,Z.jsx)(R,{type:`submit`,variant:`contained`,startIcon:l?null:(0,Z.jsx)(pe,{size:16}),disabled:l,children:l?t(`common:status.saving`,`Saving...`):t(`common:actions.save`,`Save Changes`)})]})]}):(0,Z.jsx)(W,{spacing:2,children:g.attributes&&Object.keys(g.attributes).length>0?Object.entries(g.attributes).map(([e,n])=>{let i;i=n==null?`-`:typeof n==`boolean`?t(n?`common:actions.yes`:`common:actions.no`):Array.isArray(n)?n.join(`, `):typeof n==`object`?JSON.stringify(n):typeof n==`string`||typeof n==`number`?String(n):`-`;let a=T?.schema?.[e],o=e;return a?.displayName&&(o=r(a.displayName)||e),(0,Z.jsxs)(F,{children:[(0,Z.jsx)(H,{variant:`caption`,color:`text.secondary`,children:o}),(0,Z.jsx)(H,{variant:`body1`,children:i})]},e)}):(0,Z.jsx)(H,{variant:`body2`,color:`text.secondary`,children:t(`users:manageUser.sections.attributes.empty`,`No attributes available`)})})}),(0,Z.jsx)(De,{title:t(`users:manageUser.sections.organizationUnit.title`,`Organization Unit`),description:t(`users:manageUser.sections.organizationUnit.description`,`The organization unit this user belongs to.`),children:(0,Z.jsxs)(W,{spacing:2,children:[(0,Z.jsxs)(A,{fullWidth:!0,children:[(0,Z.jsx)(U,{htmlFor:`ou-handle-input`,children:t(`users:manageUser.sections.organizationUnit.handleLabel`,`Handle`)}),(0,Z.jsx)(z,{id:`ou-handle-input`,value:g.ouHandle??`-`,fullWidth:!0,size:`small`,slotProps:{input:{readOnly:!0,endAdornment:g.ouHandle?(0,Z.jsx)(M,{position:`end`,children:(0,Z.jsx)(L,{title:p===`ouHandle`?t(`common:actions.copied`):t(`users:manageUser.sections.organizationUnit.copyHandle`,`Copy Organization Unit Handle`),children:(0,Z.jsx)(B,{"aria-label":t(`users:manageUser.sections.organizationUnit.copyHandle`,`Copy Organization Unit Handle`),onClick:()=>{V(g.ouHandle,`ouHandle`).catch(()=>null)},edge:`end`,children:p===`ouHandle`?(0,Z.jsx)(ge,{size:16}):(0,Z.jsx)(ve,{size:16})})})}):void 0}},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]}),(0,Z.jsxs)(A,{fullWidth:!0,children:[(0,Z.jsx)(U,{htmlFor:`ou-id-input`,children:t(`users:manageUser.sections.organizationUnit.idLabel`,`ID`)}),(0,Z.jsx)(z,{id:`ou-id-input`,value:g.ouId,fullWidth:!0,size:`small`,slotProps:{input:{readOnly:!0,endAdornment:(0,Z.jsx)(M,{position:`end`,children:(0,Z.jsx)(L,{title:p===`ouId`?t(`common:actions.copied`):t(`users:manageUser.sections.organizationUnit.copyId`,`Copy Organization Unit ID`),children:(0,Z.jsx)(B,{"aria-label":t(`users:manageUser.sections.organizationUnit.copyId`,`Copy Organization Unit ID`),onClick:()=>{V(g.ouId,`ouId`).catch(()=>null)},edge:`end`,children:p===`ouId`?(0,Z.jsx)(ge,{size:16}):(0,Z.jsx)(ve,{size:16})})})})}},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]})]})}),!g.isReadOnly&&(0,Z.jsxs)(De,{title:t(`users:manageUser.sections.dangerZone.title`,`Danger Zone`),description:t(`users:manageUser.sections.dangerZone.description`,`Irreversible and destructive actions.`),children:[(0,Z.jsx)(H,{variant:`h6`,gutterBottom:!0,color:`error`,children:t(`users:manageUser.sections.dangerZone.deleteUser`,`Delete User`)}),(0,Z.jsx)(H,{variant:`body2`,color:`text.secondary`,sx:{mb:3},children:t(`users:manageUser.sections.dangerZone.deleteUserDescription`,`Once deleted, this user cannot be recovered. All associated data will be permanently removed.`)}),(0,Z.jsx)(R,{variant:`contained`,color:`error`,onClick:()=>f(!0),children:t(`common:actions.delete`,`Delete`)})]})]})})}),(0,Z.jsx)(Zn,{open:d,userId:i??null,onClose:()=>f(!1),onSuccess:ce})]})}function Tr(e,t,n){let r=e.find(e=>(String(e.type)===String(m.Text)||e.type===`TEXT`)&&e.variant===`HEADING_1`&&typeof e.label==`string`);return r&&typeof r.label==`string`?n(t(r.label)??r.label):``}var Er=`FLM-1003`;function Dr(e){return e?.toLowerCase().includes(`flow not found`)??!1}function Or(e){if(!e||typeof e!=`object`)return!1;let t=e,{response:n}=t,r=n?.data;return r?.code===Er||t.code===Er||t.error?.code===Er||Dr(r?.message)||Dr(r?.description)||Dr(t.message)||Dr(t.error?.message?.defaultValue)||Dr(t.error?.description?.defaultValue)}var kr=e=>{if(typeof e==`string`)return e;if(typeof e==`object`&&e&&`value`in e){let{value:t}=e;return typeof t==`string`?t:JSON.stringify(t??e)}return JSON.stringify(e)};function Ar(e){return e.some(e=>e.ref!=null||e.eventType!=null||Array.isArray(e.components)&&Ar(e.components))}var jr=e=>{if(typeof e==`string`)return e;if(typeof e==`object`&&e&&`label`in e){let{label:t}=e;return typeof t==`string`?t:JSON.stringify(t??e)}return JSON.stringify(e)};function Mr({renderProps:e,flowError:t,handleClose:n,onResetLocalState:r}){let{additionalData:i,values:a,error:o,isLoading:s,components:c,handleInputChange:l,handleSubmit:u,resetFlow:d,isValid:f}=e,{resolveFlowTemplateLiterals:h}=v(),g=(0,X.useCallback)(e=>e?h(e):void 0,[h]),{t:_}=K(),[y,b]=(0,X.useState)(null),x=(0,X.useMemo)(()=>e=>{let t={},n=e=>{e.forEach(e=>{if((String(e.type)===String(m.Block)||e.type===`BLOCK`)&&e.components)n(e.components);else if((String(e.type)===String(m.TextInput)||e.type===`TEXT_INPUT`||e.type===`EMAIL_INPUT`||e.type===`PHONE_INPUT`||e.type===`PASSWORD_INPUT`||e.type===`SELECT`||e.type===`OU_SELECT`)&&e.ref){let n=Ye();e.type===`EMAIL_INPUT`?n=Ye().email(`Please enter a valid email address`):e.type===`PHONE_INPUT`?n=Ye().regex(/^\+?[0-9\s\-().]{7,20}$/,`Please enter a valid phone number`):e.type===`PASSWORD_INPUT`&&(n=Ye());let r=typeof e.label==`string`?e.label:e.ref;n=e.required?n.min(1,`${_(g(r)??r)??e.ref} is required`):n.optional(),t[e.ref]=n}})};return n(e),Ze(t)},[_,g]),S=(0,X.useMemo)(()=>c?.length?x(c):Ze({}),[c,x]),C=(e,t,n,r,a,o)=>{let{type:s,ref:c,label:l,placeholder:u,required:d,options:f,hint:p}=e;if(!c)return null;let h=typeof l==`string`?l:``,_=typeof u==`string`?u:``;return String(s)===String(m.TextInput)||s===`TEXT_INPUT`?(0,Z.jsxs)(A,{required:d,children:[(0,Z.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,Z.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,Z.jsx)(z,{...e,fullWidth:!0,size:`small`,id:c,type:`text`,placeholder:g(_)??_,autoComplete:`off`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`EMAIL_INPUT`?(0,Z.jsxs)(A,{required:d,children:[(0,Z.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,Z.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1,pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:`Please enter a valid email address`}},render:({field:e})=>(0,Z.jsx)(z,{...e,fullWidth:!0,size:`small`,id:c,type:`email`,placeholder:g(_)??_,autoComplete:`email`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`PHONE_INPUT`?(0,Z.jsxs)(A,{required:d,children:[(0,Z.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,Z.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,Z.jsx)(z,{...e,fullWidth:!0,size:`small`,id:c,type:`tel`,placeholder:g(_)??_,autoComplete:`tel`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`PASSWORD_INPUT`?(0,Z.jsxs)(A,{required:d,children:[(0,Z.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,Z.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,Z.jsx)(Xn,{id:c,name:e.name,value:e.value??``,placeholder:g(_)??_,required:d??!1,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,ariaLabel:g(h)??h,onChange:t=>{e.onChange(t),o(c,t.target.value)},onBlur:e.onBlur,inputRef:e.ref})})]},e.id??t):s===`OU_SELECT`?(0,Z.jsxs)(A,{fullWidth:!0,required:d,children:[(0,Z.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,Z.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,Z.jsx)(dr,{value:e.value??``,onChange:t=>{e.onChange(t),o(c,t)},rootOuId:i?.rootOuId})}),r[c]&&(0,Z.jsx)(H,{variant:`caption`,color:`error`,children:r[c]?.message})]},e.id??t):s===`SELECT`&&f?(0,Z.jsxs)(A,{fullWidth:!0,required:d,children:[(0,Z.jsx)(U,{htmlFor:c,children:g(h)??h}),(0,Z.jsx)(J,{name:c,control:n,rules:{required:d?`${g(h)??h} is required`:!1},render:({field:e})=>(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(le,{...e,value:e.value??``,displayEmpty:!0,size:`small`,id:c,required:d,fullWidth:!0,disabled:a,error:!!r[c],onChange:t=>{e.onChange(t),o(c,String(t.target.value))},renderValue:e=>{if(!e||e===``)return(0,Z.jsx)(H,{sx:{color:`text.secondary`},children:g(_)??`Select an option`});let t=f.find(t=>kr(t)===e);return t?jr(t):String(e)},children:[(0,Z.jsx)(V,{value:``,disabled:!0,children:g(_)??`Select an option`}),f.map(e=>(0,Z.jsx)(V,{value:kr(e),children:jr(e)},kr(e)))]}),r[c]&&(0,Z.jsx)(H,{variant:`caption`,color:`error.main`,sx:{mt:.5},children:r[c]?.message}),p&&(0,Z.jsx)(H,{variant:`caption`,color:`text.secondary`,children:p})]})})]},e.id??t):null},{control:w,formState:{errors:T,isValid:D},reset:j,setValue:M}=Xe({resolver:Qe(S),mode:`onChange`,defaultValues:a??{}});if((0,X.useEffect)(()=>{!c?.length&&Object.keys(a??{}).length===0&&j({})},[c,a,j]),(0,X.useEffect)(()=>{let e=i?.rootOuId;if(!e||!c?.length)return;let t=e=>{for(let n of e){if(n.type===`OU_SELECT`&&n.ref)return n.ref;if(n.components){let e=t(n.components);if(e)return e}}return null},n=t(c);n&&!a?.[n]&&(M(n,e,{shouldValidate:!0}),l(n,e))},[i,c,a,M,l]),s&&!c?.length)return(0,Z.jsx)(Ne,{});if(o&&!c?.length)return(0,Z.jsxs)(F,{children:[(0,Z.jsxs)(E,{severity:`error`,sx:{mb:2},children:[(0,Z.jsx)(k,{children:_(`users:errors.failed.title`,`Error`)}),o.message??_(`users:errors.failed.description`,`An error occurred.`)]}),(0,Z.jsx)(F,{sx:{display:`flex`,justifyContent:`flex-end`},children:(0,Z.jsx)(R,{variant:`outlined`,onClick:n,children:_(`common:actions.close`,`Close`)})})]});if(!c?.length)return(0,Z.jsx)(Ne,{});let N=Ar(c);return(0,Z.jsxs)(Z.Fragment,{children:[(t??o)&&(0,Z.jsxs)(E,{severity:`error`,sx:{mb:2},children:[(0,Z.jsx)(k,{children:_(`users:errors.failed.title`,`Error`)}),t??o?.message??_(`users:errors.failed.description`,`An error occurred.`)]}),(0,Z.jsx)(W,{direction:`column`,spacing:4,children:c.map((e,t)=>{if(String(e.type)===String(m.Text)||e.type===`TEXT`){let n=typeof e.variant==`string`?e.variant:void 0,r=typeof e.label==`string`?e.label:``,i=typeof e.align==`string`?e.align:void 0;return n===`HEADING_1`?(0,Z.jsx)(H,{variant:`h1`,gutterBottom:!0,textAlign:i,children:g(r)??r},e.id??t):(0,Z.jsx)(H,{variant:n===`HEADING_2`?`h2`:`body1`,color:`text.secondary`,textAlign:i,children:g(r)??r},e.id??t)}if(e.type===`COPYABLE_TEXT`)return(0,Z.jsx)(Ve,{component:e,resolve:g,additionalData:i},e.id??t);if(String(e.type)===String(m.Block)||e.type===`BLOCK`){let n=e.components??[],r=e=>(String(e.type)===String(m.Action)||e.type===`ACTION`)&&(String(e.eventType)===String(p.Submit)||e.eventType===`SUBMIT`),i=n.filter(r),o=n.flatMap(e=>e.type===`STACK`?(e.components??[]).filter(r):[]),c=i[0]??o[0];if(!c)return null;let d=s||!D||f!==void 0&&!f;return(0,Z.jsx)(F,{component:`form`,onSubmit:e=>{e.preventDefault(),d||u(c,a).catch(()=>void 0)},noValidate:!0,sx:{display:`flex`,flexDirection:`column`,width:`100%`,gap:2},children:n.map((e,t)=>{let n=C(e,t,w,T,s,l);if(n)return n;if(e.type===`STACK`){let n=(e.components??[]).filter(r);return(0,Z.jsx)(W,{direction:e.direction??`row`,spacing:2,justifyContent:e.justify??`center`,flexWrap:`wrap`,sx:{mt:2},children:n.map((e,t)=>{let n=e.id??String(t),r=typeof e.label==`string`?e.label:``,i=s&&y===n;return(0,Z.jsx)(R,{type:`button`,variant:e.variant===`PRIMARY`?`contained`:`outlined`,disabled:d,sx:{px:4,py:1.5},onClick:()=>{d||(b(n),u(e,a).catch(()=>void 0))},children:i?(0,Z.jsx)(O,{size:16,color:`inherit`}):g(r)??r},n)})},e.id??t)}if(!r(e))return null;let i=typeof e.label==`string`?e.label:``;return(0,Z.jsx)(W,{direction:`row`,spacing:2,justifyContent:`flex-end`,sx:{mt:4},children:(0,Z.jsx)(R,{type:`button`,variant:e.variant===`PRIMARY`?`contained`:`outlined`,disabled:d,sx:{minWidth:140},onClick:()=>{d||u(e,a).catch(()=>void 0)},children:s?(0,Z.jsx)(O,{size:20,color:`inherit`}):g(i)??i})},e.id??t)})},e.id??t)}return null})}),!N&&(0,Z.jsxs)(W,{direction:`row`,spacing:2,justifyContent:`center`,sx:{mt:4},children:[(0,Z.jsx)(R,{variant:`outlined`,onClick:n,children:_(`common:actions.close`,`Close`)}),(0,Z.jsx)(R,{variant:`contained`,onClick:()=>{d(),r()},children:_(`users:addAnother`,`Add Another User`)})]})]})}function Nr(e){let t=(0,Y.c)(25),{renderProps:n,flowError:r,handleClose:i,onStepLabelChange:a,onInviteComplete:o,onOuStepDetected:s,onResetLocalState:c}=e,{resolveFlowTemplateLiterals:l}=v(),u;t[0]===l?u=t[1]:(u=e=>e?l(e):void 0,t[0]=l,t[1]=u);let d=u,{t:f}=K(),p=n.components,m;t[2]!==p||t[3]!==d||t[4]!==f?(m=p?.length?Tr(p,d,f):``,t[2]=p,t[3]=d,t[4]=f,t[5]=m):m=t[5];let h=m,g=!!p?.length&&!Ar(p),_;t[6]===p?_=t[7]:(_=p?.some(Pr)??!1,t[6]=p,t[7]=_);let y=_,b,x;t[8]!==y||t[9]!==s?(b=()=>{y&&s()},x=[y,s],t[8]=y,t[9]=s,t[10]=b,t[11]=x):(b=t[10],x=t[11]),(0,X.useEffect)(b,x);let S,C;t[12]!==h||t[13]!==a?(S=()=>{h&&a(h)},C=[h,a],t[12]=h,t[13]=a,t[14]=S,t[15]=C):(S=t[14],C=t[15]),(0,X.useEffect)(S,C);let w,T;t[16]!==g||t[17]!==o?(w=()=>{g&&o()},T=[g,o],t[16]=g,t[17]=o,t[18]=w,t[19]=T):(w=t[18],T=t[19]),(0,X.useEffect)(w,T);let E;return t[20]!==r||t[21]!==i||t[22]!==c||t[23]!==n?(E=(0,Z.jsx)(Mr,{renderProps:n,flowError:r,handleClose:i,onResetLocalState:c}),t[20]=r,t[21]=i,t[22]=c,t[23]=n,t[24]=E):E=t[24],E}function Pr(e){return e.type===`OU_SELECT`||e.components?.some(Fr)}function Fr(e){return e.type===`OU_SELECT`}function Ir(){let{t:e}=K(),t=Ke(),n=Me(`UserInvitePage`),[r,i]=(0,X.useState)(null),[a,o]=(0,X.useState)([]),s=(0,X.useRef)(``),[c,l]=(0,X.useState)(!1),u=(0,X.useCallback)(()=>{(async()=>{await t(`/users`)})().catch(e=>{n.error(`Failed to navigate to users page`,{error:e})})},[t,n]),d=(0,X.useCallback)(()=>{n.info(`Falling back to manual user creation because the onboarding flow is unavailable`),(async()=>{await t(`/users/create`)})().catch(e=>{n.error(`Failed to navigate to fallback user creation page`,{error:e})})},[t,n]),f=(0,X.useCallback)(e=>{e!==s.current&&(s.current=e,o(t=>{let n=t.indexOf(e);return n>=0?t.slice(0,n+1):[...t,e]}))},[o]),p=(0,X.useCallback)(()=>{s.current!==`complete`&&(s.current=`complete`,o(t=>[...t,e(`users:invite.steps.complete`,`Complete`)]))},[o,e]),m=(0,X.useCallback)(()=>{l(!0)},[]),h=(0,X.useCallback)(()=>{o([]),s.current=``,l(!1),i(null)},[]),g=c?5:4;return(0,Z.jsxs)(F,{sx:{minHeight:`100vh`,display:`flex`,flexDirection:`column`},children:[(0,Z.jsx)(N,{variant:`determinate`,value:Math.min(a.length/g*100,100),sx:{height:6}}),(0,Z.jsxs)(F,{sx:{flex:1,display:`flex`,flexDirection:`column`},children:[(0,Z.jsx)(F,{sx:{p:4,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:(0,Z.jsxs)(W,{direction:`row`,alignItems:`center`,spacing:2,children:[(0,Z.jsx)(B,{"aria-label":e(`common:actions.close`,`Close`),onClick:u,sx:{bgcolor:`background.paper`,"&:hover":{bgcolor:`action.hover`},boxShadow:1},children:(0,Z.jsx)(we,{size:24})}),(0,Z.jsxs)(ne,{separator:(0,Z.jsx)(me,{size:16}),"aria-label":`breadcrumb`,children:[a.map((e,t)=>(0,Z.jsx)(H,{variant:`h5`,color:t===a.length-1?`text.primary`:`inherit`,children:e},e)),a.length===0&&(0,Z.jsx)(H,{variant:`h5`,color:`text.primary`,children:e(`users:addUser`,`Add User`)})]})]})}),(0,Z.jsx)(F,{sx:{flex:1,display:`flex`,minHeight:0},children:(0,Z.jsx)(F,{sx:{flex:1,display:`flex`,flexDirection:`column`,py:8,px:20,mx:`auto`,alignItems:`center`},children:(0,Z.jsx)(F,{sx:{width:`100%`,maxWidth:800,flex:1,display:`flex`,flexDirection:`column`},children:(0,Z.jsx)(Pn,{onError:e=>{if(Or(e)){d();return}n.error(`User onboarding error`,{error:e})},onFlowChange:t=>{if(Or(t)){d();return}let n=t?.error?.message?.key;if(n){let t=e(n);if(t!==n){i(t);return}}i(t?.error?.message?.defaultValue??t?.error?.description?.defaultValue??null)},children:e=>(0,Z.jsx)(Nr,{renderProps:e,flowError:r,handleClose:u,onStepLabelChange:f,onInviteComplete:p,onOuStepDetected:m,onResetLocalState:h})})})})})]})]})}function Lr(){let e=(0,Y.c)(7),t=Ke(),{t:n}=K(),r=Me(`UsersListPage`),i;if(e[0]!==r||e[1]!==t||e[2]!==n){let a;e[4]!==r||e[5]!==t?(a=()=>{(async()=>{await t(`/users/invite`)})().catch(e=>{r.error(`Failed to navigate to add user page`,{error:e})})},e[4]=r,e[5]=t,e[6]=a):a=e[6],i=(0,Z.jsxs)(Se,{children:[(0,Z.jsxs)(xe,{children:[(0,Z.jsx)(xe.Header,{children:n(`users:title`)}),(0,Z.jsx)(xe.SubHeader,{children:n(`users:subtitle`)}),(0,Z.jsx)(xe.Actions,{children:(0,Z.jsx)(R,{variant:`contained`,startIcon:(0,Z.jsx)(ye,{size:20}),onClick:a,children:n(`users:addUser`)})})]}),(0,Z.jsx)(W,{direction:`row`,spacing:2,mb:4,flexWrap:`wrap`,useFlexGap:!0,children:(0,Z.jsx)(z,{placeholder:n(`users:searchUsers`),size:`small`,sx:{flexGrow:1,minWidth:300},InputProps:{startAdornment:(0,Z.jsx)(M,{position:`start`,children:(0,Z.jsx)(he,{size:16})})}})}),(0,Z.jsx)(Qn,{})]}),e[0]=r,e[1]=t,e[2]=n,e[3]=i}else i=e[3];return i}export{Rn as C,tt as D,st as E,$e as O,Bn as S,Fn as T,Jn as _,xr as a,Hn as b,vr as c,mr as d,pr as f,Xn as g,Zn as h,Sr as i,gr as l,Qn as m,Ir as n,br as o,fr as p,wr as r,$ as s,Lr as t,hr as u,Wn as v,In as w,Vn as x,Un as y};