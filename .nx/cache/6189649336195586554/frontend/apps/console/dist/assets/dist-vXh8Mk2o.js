import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{B as t,H as n,J as r,K as i,L as a,R as o,S as s,V as c,W as l,b as u,d,g as f,k as p,l as m,p as h,r as g,t as _,u as v,w as y,x as b}from"./useThunderID-DnAcXU1-.js";import{t as x}from"./useQuery-D6XciOgd.js";import{_ as S,n as C,r as w,t as T}from"./vendor-emotion-BJbDtNae.js";import{At as E,Ct as D,Nt as O,Ot as k,Q as A,Sn as j,U as M,V as N,X as ee,_ as te,_t as P,a as ne,at as F,b as I,gt as re,ht as L,i as R,it as ie,jt as z,k as B,kt as V,nn as ae,nt as oe,ot as se,q as H,rt as ce,ut as le,w as ue,x as de,y as U}from"./vendor-mui-DfBexhDa.js";import{Dx as fe,UA as pe,Uc as me,XT as he,_c as ge,cE as _e,d as ve,fC as ye,ju as be,kx as xe,m as Se,p as Ce,pd as we,q as Te,ur as Ee}from"./vendor-oxygen-DFNgTxPQ.js";import{i as De,n as Oe,r as ke,t as Ae}from"./getInitials-BpS93xXW.js";import{i as je,r as W}from"./dist-C1_-3XjN.js";import{n as Me}from"./vendor-react-BRrCN599.js";import{i as Ne}from"./useLogger-DgvtF-BW-CNR9g72n.js";import{t as Pe}from"./PageLoadingAnimation-CVoCdtHm.js";import{t as G}from"./vendor-i18n-CV5imxpN.js";import{n as Fe,r as Ie}from"./dist-mirMQsjX.js";import{C as Le,D as Re,E as ze,O as Be,S as Ve,T as He,i as Ue,k as K,w as We}from"./dist-BZRi4M7f.js";import{t as Ge}from"./purify.es-DY32g7DN.js";import{t as Ke}from"./ResourceAvatar-BaWxNqpA.js";import{c as qe,l as Je,n as Ye}from"./chunk-4N6VE7H7--bPOxL5U.js";import{a as Xe,c as Ze,i as Qe,o as $e,s as q}from"./schemas-DAq7cNL2.js";var J=e(S(),1),et=(0,J.createContext)({}),tt=(0,J.createContext)(void 0),nt=e=>{let t=(0,J.useContext)(g),n=(0,J.useContext)(tt)?.i18n;if(!t)throw Error(`useTranslation must be used within an I18nProvider. Make sure your component is wrapped with ThunderIDProvider which includes I18nProvider.`);let r=e??n,{t:i,currentLanguage:a,setLanguage:o,bundles:s,fallbackLanguage:l}=t,u=(0,J.useMemo)(()=>{if(!r?.bundles)return s;let e={};return Object.entries(s).forEach(([t,n])=>{e[t]=n}),Object.entries(r.bundles).forEach(([t,n])=>{let r=c(n.translations);e[t]?e[t]={...e[t],metadata:n.metadata?{...e[t].metadata,...n.metadata}:e[t].metadata,translations:y(e[t].translations,r)}:e[t]={...n,translations:r}}),e},[s,r?.bundles]),d=(0,J.useMemo)(()=>r?.bundles?(e,t)=>{let n,r=u[a];if(r?.translations?.[e]&&(n=r.translations[e]),!n&&a!==l){let t=u[l];t?.translations?.[e]&&(n=t.translations[e])}return n||=e,t&&Object.keys(t).length>0?Object.entries(t).reduce((e,[t,n])=>e.replace(RegExp(`\\{${t}\\}`,`g`),String(n)),n):n}:i,[u,a,l,i,r?.bundles]);return{availableLanguages:Object.keys(u),currentLanguage:a,setLanguage:o,t:d}},rt=(e,t,n,r)=>(0,J.useMemo)(()=>{let t=r||e.vars.colors.primary.main,i={large:`32px`,medium:`20px`,small:`16px`},a=i[n],o=T`
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
    `,spinnerMedium:c,spinnerSmall:s}},[e,t,n,r]),Y=j(),it=({size:e=`medium`,color:t,className:n,style:r})=>{let{theme:i,colorScheme:a}=K(),o=rt(i,a,e,t);return(0,Y.jsx)(`span`,{className:C(l(u(`spinner`)),o.spinner,e===`small`&&o.spinnerSmall,e===`medium`&&o.spinnerMedium,e===`large`&&o.spinnerLarge,n),style:r,role:`status`,"aria-label":`Loading`})},at=(e,t,n,r,i,a,o,s,c=`square`)=>(0,J.useMemo)(()=>{let t={large:`calc(${e.vars.spacing.unit} * 5)`,medium:`calc(${e.vars.spacing.unit} * 4)`,small:`calc(${e.vars.spacing.unit} * 3)`},l=t[i]||t.medium,u=T`
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
            `:null,size:d[i],spinner:p,startIcon:m,variant:f[`${n}-${r}`]||f[`primary-solid`]}},[e,t,n,r,i,a,o,s]),ot=(e,t)=>e===`small`?`calc(${t} * 1.5)`:e===`medium`?`calc(${t} * 2)`:`calc(${t} * 2.5)`,st=(0,J.forwardRef)(({color:e=`primary`,variant:t=`solid`,size:n=`medium`,fullWidth:r=!1,loading:i=!1,startIcon:a,endIcon:o,children:s,className:c,disabled:d,style:f,shape:p=`square`,...m},h)=>{let{theme:g,colorScheme:_}=K(),v=at(g,_,e,t,n,r,d||!1,i,p),y=t===`icon`,b=ot(n,g.vars.spacing.unit);return(0,Y.jsxs)(`button`,{ref:h,style:f,className:C(l(u(`button`)),l(u(`button`,t)),l(u(`button`,e)),l(u(`button`,n)),l(u(`button`,p)),r?l(u(`button`,`fullWidth`)):void 0,i?l(u(`button`,`loading`)):void 0,d||i?l(u(`button`,`disabled`)):void 0,v.button,v.size,v.variant,v.fullWidth,v.loading,v.shape,c),disabled:d||i,...m,children:[i&&(0,Y.jsx)(`span`,{className:C(l(u(`button`,`spinner`)),v.spinner),children:(0,Y.jsx)(it,{size:n,color:`currentColor`,style:{height:b,width:b}})}),!i&&y&&(0,Y.jsx)(`span`,{className:C(l(u(`button`,`icon`)),v.icon),children:s||a||o}),!i&&!y&&a&&(0,Y.jsx)(`span`,{className:C(l(u(`button`,`start-icon`)),v.startIcon),children:a}),!y&&s&&(0,Y.jsx)(`span`,{className:C(l(u(`button`,`content`)),v.content),children:s}),!i&&!y&&o&&(0,Y.jsx)(`span`,{className:C(l(u(`button`,`end-icon`)),v.endIcon),children:o})]})});st.displayName=`Button`;var ct=st,lt=e=>(0,Y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Y.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,Y.jsx)(`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`}),(0,Y.jsx)(`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`})]}),ut=e=>(0,Y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Y.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,Y.jsx)(`path`,{d:`m9 12 2 2 4-4`})]}),dt=e=>(0,Y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Y.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,Y.jsx)(`path`,{d:`M12 16v-4`}),(0,Y.jsx)(`path`,{d:`M12 8h.01`})]}),ft=e=>(0,Y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Y.jsx)(`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`}),(0,Y.jsx)(`path`,{d:`M12 9v4`}),(0,Y.jsx)(`path`,{d:`M12 17h.01`})]}),pt=(e,t,n)=>(0,J.useMemo)(()=>{let t=T`
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
    `,icon:i,title:o,variant:r[n]}},[e,t,n]),mt=e=>{switch(e){case`success`:return ut;case`error`:return lt;case`warning`:return ft;case`info`:return dt;default:return dt}},ht=(0,J.createContext)(`info`),gt=()=>(0,J.useContext)(ht),_t=(0,J.forwardRef)(({variant:e=`info`,showIcon:t=!0,children:n,className:r,style:i,...a},o)=>{let{theme:s,colorScheme:c}=K(),d=pt(s,c,e),f=mt(e);return(0,Y.jsx)(ht.Provider,{value:e,children:(0,Y.jsxs)(`div`,{ref:o,role:`alert`,style:i,className:C(l(u(`alert`)),d.alert,d.variant,l(u(`alert`,null,e)),r),...a,children:[t&&(0,Y.jsx)(`div`,{className:C(l(u(`alert`,`icon`)),d.icon),children:(0,Y.jsx)(f,{})}),(0,Y.jsx)(`div`,{className:C(l(u(`alert`,`content`)),d.content),children:n})]})})}),vt=({children:e,className:t,style:n,...r})=>{let{theme:i,colorScheme:a}=K(),o=pt(i,a,gt()),{color:s,...c}=r;return(0,Y.jsx)(Be,{component:`h3`,variant:`h6`,fontWeight:600,style:n,className:C(l(u(`alert`,`title`)),o.title,t),...c,children:e})},yt=({children:e,className:t,style:n,...r})=>{let{theme:i,colorScheme:a}=K(),o=pt(i,a,gt()),{color:s,...c}=r;return(0,Y.jsx)(Be,{component:`p`,variant:`body2`,style:n,className:C(l(u(`alert`,`description`)),o.description,t),...c,children:e})};_t.displayName=`Alert`,vt.displayName=`Alert.Title`,yt.displayName=`Alert.Description`,_t.Title=vt,_t.Description=yt;var bt=_t,xt=(e,t,n,r)=>(0,J.useMemo)(()=>{let t=T`
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
    `;return{action:l,card:t,clickable:r?a:``,content:u,description:c,footer:d,header:o,title:s,variant:i[n]}},[e,t,n,r]),St=(0,J.forwardRef)(({variant:e=`default`,clickable:t=!1,children:n,className:r,style:i,...a},o)=>{let{theme:s,colorScheme:c}=K(),d=xt(s,c,e,t);return(0,Y.jsx)(`div`,{ref:o,style:i,className:C(l(u(`card`)),d.card,d.variant,d.clickable,l(u(`card`,null,e)),{[l(u(`card`,null,`clickable`))]:t},r),...a,children:n})}),Ct=(0,J.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:a,colorScheme:o}=K(),s=xt(a,o,`default`,!1);return(0,Y.jsx)(`div`,{ref:i,style:n,className:C(l(u(`card`,`header`)),s.header,t),...r,children:e})}),wt=({children:e,level:t=3,className:n,style:r,...i})=>{let{theme:a,colorScheme:o}=K(),s=xt(a,o,`default`,!1),c=e=>{switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}},d=e=>{switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}},{color:f,...p}=i;return(0,Y.jsx)(Be,{component:d(t),variant:c(t),style:r,className:C(l(u(`card`,`title`)),s.title,n),fontWeight:600,...p,children:e})},Tt=({children:e,className:t,style:n,...r})=>{let{theme:i,colorScheme:a}=K(),o=xt(i,a,`default`,!1),{color:s,...c}=r;return(0,Y.jsx)(Be,{component:`p`,variant:`body2`,color:`textSecondary`,style:n,className:C(l(u(`card`,`description`)),o.description,t),...c,children:e})},Et=(0,J.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:a,colorScheme:o}=K(),s=xt(a,o,`default`,!1);return(0,Y.jsx)(`div`,{ref:i,style:n,className:C(l(u(`card`,`action`)),s.action,t),...r,children:e})}),Dt=(0,J.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:a,colorScheme:o}=K(),s=xt(a,o,`default`,!1);return(0,Y.jsx)(`div`,{ref:i,style:n,className:C(l(u(`card`,`content`)),s.content,t),...r,children:e})}),Ot=(0,J.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:a,colorScheme:o}=K(),s=xt(a,o,`default`,!1);return(0,Y.jsx)(`div`,{ref:i,style:n,className:C(l(u(`card`,`footer`)),s.footer,t),...r,children:e})});St.displayName=`Card`,Ct.displayName=`Card.Header`,wt.displayName=`Card.Title`,Tt.displayName=`Card.Description`,Et.displayName=`Card.Action`,Dt.displayName=`Card.Content`,Ot.displayName=`Card.Footer`,St.Header=Ct,St.Title=wt,St.Description=Tt,St.Action=Et,St.Content=Dt,St.Footer=Ot;var kt=St,At=e=>(0,J.useMemo)(()=>{let t=T`
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
    `,toggleButton:i,togglePlaceholder:a}},[e.vars.colors.action.hover,e.vars.colors.action.selected,e.vars.colors.background.disabled,e.vars.colors.border,e.vars.colors.primary.main,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.medium,e.vars.borderRadius.small,e.vars.spacing.unit,e.vars.typography.fontFamily]),jt=({rootOuId:e,selectedOuId:t,onSelect:n,fetchChildren:r,pageSize:i=10,className:a})=>{let{theme:o}=K(),s=At(o),[c,l]=(0,J.useState)({}),u=(0,J.useCallback)(async(e,t=0)=>{l(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!0}}));try{let n=await r(e,i,t),a=n.organizationUnits||[];l(r=>{let i=r[e]||{children:[],expanded:!0,hasMore:!1,loading:!1,offset:0,totalResults:0},o=t===0?a:[...i.children,...a],s=t+a.length;return{...r,[e]:{children:o,expanded:!0,hasMore:s<n.totalResults,loading:!1,offset:s,totalResults:n.totalResults}}})}catch{l(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!1}}))}},[r,i]);(0,J.useEffect)(()=>{e&&!c[e]&&u(e)},[e,u,c]);let d=(0,J.useCallback)(e=>{let t=c[e];t?.expanded?l(t=>({...t,[e]:{...t[e],expanded:!1}})):t?.children.length?l(t=>({...t,[e]:{...t[e],expanded:!0}})):u(e)},[c,u]),f=(0,J.useCallback)(e=>{let t=c[e];t&&u(e,t.offset)},[c,u]),p=e=>(0,Y.jsx)(Y.Fragment,{children:[0,1,2].map(t=>(0,Y.jsx)(`div`,{className:s.loadingPlaceholder,style:{paddingLeft:`${(e+1)*20}px`},children:(0,Y.jsx)(`div`,{className:s.skeleton,style:{width:`${100-t*20}px`}})},`skeleton-${t}`))}),m=(e,r=0)=>{let i=c[e.id],a=t===e.id,o=i?.expanded||!1,l=i?.loading||!1,u=!i||i.totalResults>0||i.children.length>0;return(0,Y.jsxs)(J.Fragment,{children:[(0,Y.jsxs)(`div`,{className:C(s.node,a&&s.nodeSelected),style:{paddingLeft:`${r*20+12}px`},role:`treeitem`,"aria-selected":a,"aria-expanded":u?o:void 0,onClick:()=>n(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),n(e.id))},tabIndex:0,children:[u?(0,Y.jsx)(`button`,{className:s.toggleButton,onClick:t=>{t.stopPropagation(),d(e.id)},"aria-label":o?`Collapse`:`Expand`,type:`button`,children:o?`▾`:`▸`}):(0,Y.jsx)(`span`,{className:s.togglePlaceholder}),(0,Y.jsx)(`span`,{className:s.nodeName,children:e.name})]}),o&&l&&!i?.children.length&&p(r),o&&i?.children.map(e=>m(e,r+1)),o&&i?.hasMore&&(0,Y.jsx)(`button`,{className:s.loadMoreButton,style:{paddingLeft:`${(r+1)*20+12}px`},onClick:()=>f(e.id),disabled:l,type:`button`,children:l?`Loading...`:`Load more`})]},e.id)},h=c[e],g=h?.loading&&!h?.children.length;return(0,Y.jsxs)(`div`,{className:C(s.container,a),role:`tree`,"aria-label":`Organization unit picker`,children:[g&&p(0),h?.children.map(e=>m(e,0)),h?.hasMore&&(0,Y.jsx)(`button`,{className:s.loadMoreButton,onClick:()=>f(e),disabled:h?.loading,type:`button`,children:h?.loading?`Loading...`:`Load more`})]})},Mt=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=nt(t?.i18n);return(0,Y.jsx)(ct,{...r,fullWidth:!0,type:`button`,color:`primary`,variant:`solid`,disabled:e,startIcon:(0,Y.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 512 512`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,Y.jsx)(`path`,{fill:`#1976D2`,d:`M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z`}),(0,Y.jsx)(`path`,{fill:`#FAFAFA`,d:`M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64v176h96V336h48L432,256z`})]}),children:n??i(`elements.buttons.facebook.text`)})},Nt=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=nt(t?.i18n);return(0,Y.jsx)(ct,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,Y.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 66.233`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Y.jsx)(`g`,{transform:`translate(-386.96 658.072)`,children:(0,Y.jsx)(`path`,{d:`M420.915-658.072a33.956,33.956,0,0,0-33.955,33.955,33.963,33.963,0,0,0,23.221,32.22c1.7.314,2.32-.737,2.32-1.633,0-.81-.031-3.484-.046-6.322-9.446,2.054-11.44-4.006-11.44-4.006-1.545-3.925-3.77-4.968-3.77-4.968-3.081-2.107.232-2.064.232-2.064,3.41.239,5.205,3.5,5.205,3.5,3.028,5.19,7.943,3.69,9.881,2.822a7.23,7.23,0,0,1,2.156-4.54c-7.542-.859-15.47-3.77-15.47-16.781a13.141,13.141,0,0,1,3.5-9.114,12.2,12.2,0,0,1,.329-8.986s2.851-.913,9.34,3.48a32.545,32.545,0,0,1,8.5-1.143,32.629,32.629,0,0,1,8.506,1.143c6.481-4.393,9.328-3.48,9.328-3.48a12.185,12.185,0,0,1,.333,8.986,13.115,13.115,0,0,1,3.495,9.114c0,13.042-7.943,15.913-15.5,16.754,1.218,1.054,2.3,3.12,2.3,6.288,0,4.543-.039,8.2-.039,9.318,0,.9.611,1.962,2.332,1.629a33.959,33.959,0,0,0,23.2-32.215,33.955,33.955,0,0,0-33.955-33.955`,fill:`#ffffff`})})}),children:n??i(`elements.buttons.github.text`)})},Pt=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=nt(t?.i18n);return(0,Y.jsx)(ct,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,Y.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 67.901`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Y.jsxs)(`g`,{transform:`translate(-0.001 -0.001)`,children:[(0,Y.jsx)(`path`,{d:`M15.049,160.965l-2.364,8.824-8.639.183a34.011,34.011,0,0,1-.25-31.7h0l7.691,1.41,3.369,7.645a20.262,20.262,0,0,0,.19,13.642Z`,transform:`translate(0 -119.93)`,fill:`#fbbb00`}),(0,Y.jsx)(`path`,{d:`M294.24,208.176A33.939,33.939,0,0,1,282.137,241h0l-9.687-.494-1.371-8.559a20.235,20.235,0,0,0,8.706-10.333H261.628V208.176Z`,transform:`translate(-226.93 -180.567)`,fill:`#518ef8`}),(0,Y.jsx)(`path`,{d:`M81.668,328.8h0a33.962,33.962,0,0,1-51.161-10.387l11-9.006a20.192,20.192,0,0,0,29.1,10.338Z`,transform:`translate(-26.463 -268.374)`,fill:`#28b446`}),(0,Y.jsx)(`path`,{d:`M80.451,7.816l-11,9A20.19,20.19,0,0,0,39.686,27.393l-11.06-9.055h0A33.959,33.959,0,0,1,80.451,7.816Z`,transform:`translate(-24.828)`,fill:`#f14336`})]})}),children:n??i(`elements.buttons.google.text`)})},Ft=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=nt(t?.i18n);return(0,Y.jsx)(ct,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,Y.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Y.jsx)(`path`,{fill:`#0077B5`,d:`M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z`})}),children:n??i(`elements.buttons.linkedin.text`)})},It=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=nt(t?.i18n);return(0,Y.jsx)(ct,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,Y.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 23 23`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,Y.jsx)(`path`,{fill:`#f3f3f3`,d:`M0 0h23v23H0z`}),(0,Y.jsx)(`path`,{fill:`#f35325`,d:`M1 1h10v10H1z`}),(0,Y.jsx)(`path`,{fill:`#81bc06`,d:`M12 1h10v10H12z`}),(0,Y.jsx)(`path`,{fill:`#05a6f0`,d:`M1 12h10v10H1z`}),(0,Y.jsx)(`path`,{fill:`#ffba08`,d:`M12 12h10v10H12z`})]}),children:n??i(`elements.buttons.microsoft.text`)})},Lt=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=nt(t?.i18n);return(0,Y.jsx)(ct,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,Y.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Y.jsx)(`path`,{fill:`#627EEA`,d:`M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z`})}),children:n??i(`elements.buttons.ethereum.text`)})},Rt=(e,t,n,r)=>(0,J.useMemo)(()=>{let t=T`
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
    `;return{container:t,errorInput:n?a:``,errorLabel:n?s:``,input:i,label:o,required:r?c:``}},[e,t,n,r]),zt=({label:e,error:t,className:n,required:r,helperText:i,style:a={},...o})=>{let{theme:s,colorScheme:c}=K(),d=!!t,f=Rt(s,c,d,!!r);return(0,Y.jsx)(ze,{error:t,helperText:i,className:C(l(u(`checkbox`)),n),helperTextMarginLeft:`calc(${s.vars.spacing.unit} * 3.5)`,children:(0,Y.jsxs)(`div`,{style:a,className:C(l(u(`checkbox`,`container`)),f.container),children:[(0,Y.jsx)(`input`,{type:`checkbox`,className:C(l(u(`checkbox`,`input`)),f.input,f.errorInput,{[l(u(`checkbox`,`input`,`error`))]:d}),"aria-invalid":d,"aria-required":r,...o}),e&&(0,Y.jsx)(He,{required:r,error:d,variant:`inline`,className:C(l(u(`checkbox`,`label`)),f.label,f.errorLabel,{[l(u(`checkbox`,`label`,`error`))]:d}),children:e})]})})},Bt=(e,t,n,r)=>(0,J.useMemo)(()=>{let t=T`
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
    `;return{disabledInput:r?a:``,errorInput:n?i:``,input:t,label:o}},[e,t,n,r]),Vt=({label:e,error:t,className:n,required:r,disabled:i,helperText:a,dateFormat:o=`yyyy-MM-dd`,style:s={},...c})=>{let{theme:d,colorScheme:f}=K(),p=!!t,m=Bt(d,f,p,!!i);return(0,Y.jsxs)(ze,{error:t,helperText:a,className:C(l(u(`date-picker`)),n),style:s,children:[e&&(0,Y.jsx)(He,{required:r,error:p,className:C(l(u(`date-picker`,`label`)),m.label),children:e}),(0,Y.jsx)(`input`,{type:`date`,pattern:`\\d{4}-\\d{2}-\\d{2}`,placeholder:o,className:C(l(u(`date-picker`,`input`)),m.input,m.errorInput,m.disabledInput,{[l(u(`date-picker`,`input`,`error`))]:p,[l(u(`date-picker`,`input`,`disabled`))]:i}),disabled:i,"aria-invalid":p,"aria-required":r,...c})]})},Ht=(e,t,n,r,i)=>(0,J.useMemo)(()=>{let t=T`
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
    `,inputError:a}},[e,t,n,r,i]),Ut=({label:e,error:t,className:n,required:r,disabled:i,helperText:a,length:o=6,value:s=``,onChange:c,onComplete:d,type:f=`text`,placeholder:p=``,style:m={},autoFocus:h=!1,pattern:g})=>{let{theme:_,colorScheme:v}=K(),y=Ht(_,v,!!i,!!t,o),[b,x]=(0,J.useState)(Array(o).fill(``)),S=(0,J.useRef)([]);(0,J.useEffect)(()=>{S.current=S.current.slice(0,o)},[o]),(0,J.useEffect)(()=>{if(s){let e=s.split(``).slice(0,o);for(;e.length<o;)e.push(``);x(e)}else x(Array(o).fill(``))},[s,o]),(0,J.useEffect)(()=>{h&&S.current[0]&&S.current[0].focus()},[h]);let w=(e,t)=>{let n=t.target.value;if(n.length>1||f===`number`&&n&&!/^\d$/.test(n)||g&&n&&!new RegExp(g).test(n))return;let r=[...b];r[e]=n,x(r);let i=r.join(``);c?.({target:{value:i}}),n&&e<o-1&&S.current[e+1]?.focus(),r.every(e=>e!==``)&&d&&d(i)},T=(e,t)=>{if(t.key===`Backspace`){if(!b[e]&&e>0){let t=[...b];t[e-1]=``,x(t),S.current[e-1]?.focus(),c?.({target:{value:t.join(``)}})}else if(b[e]){let t=[...b];t[e]=``,x(t),c?.({target:{value:t.join(``)}})}}else t.key===`ArrowLeft`&&e>0?S.current[e-1]?.focus():t.key===`ArrowRight`&&e<o-1?S.current[e+1]?.focus():t.key===`Enter`&&(t.preventDefault(),b.every(e=>e!==``)&&d&&d(b.join(``)))},E=e=>{e.preventDefault();let t=e.clipboardData.getData(`text`).slice(0,o),n=``;Array.from(t).forEach(e=>{f===`number`&&!/^\d$/.test(e)||g&&!new RegExp(g).test(e)||(n+=e)});let r=Array(o).fill(``);for(let e=0;e<Math.min(n.length,o);e+=1)r[e]=n[e];x(r),c?.({target:{value:r.join(``)}});let i=r.findIndex(e=>e===``),a=i===-1?o-1:i;S.current[a]?.focus(),r.every(e=>e!==``)&&d&&d(r.join(``))};return(0,Y.jsxs)(ze,{error:t,helperText:a,className:C(l(u(`otp-field`)),n),helperTextAlign:`center`,style:m,children:[e&&(0,Y.jsx)(He,{required:r,error:!!t,children:e}),(0,Y.jsx)(`div`,{className:C(l(u(`otp-field`,`input-container`)),y.inputContainer),children:Array.from({length:o},(n,a)=>(0,Y.jsx)(`input`,{ref:e=>{e&&(S.current[a]=e)},type:f===`password`?`password`:`text`,inputMode:f===`number`?`numeric`:`text`,value:b[a]||``,onChange:e=>w(a,e),onKeyDown:e=>T(a,e),onPaste:E,className:C(l(u(`otp-field`,`input`)),y.input,{[l(u(`otp-field`,`input`,`error`))]:!!t,[y.inputError]:!!t,[l(u(`otp-field`,`input`,`disabled`))]:!!i,[y.inputDisabled]:!!i}),maxLength:1,placeholder:p,disabled:i,"aria-label":`${e||`OTP`} digit ${a+1}`,"aria-invalid":!!t,"aria-required":r,autoComplete:`one-time-code`},a))})]})},Wt=e=>(0,Y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Y.jsx)(`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`}),(0,Y.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]}),Gt=e=>(0,Y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,Y.jsx)(`path`,{d:`M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`}),(0,Y.jsx)(`path`,{d:`M14.084 14.158a3 3 0 0 1-4.242-4.242`}),(0,Y.jsx)(`path`,{d:`M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`}),(0,Y.jsx)(`path`,{d:`m2 2 20 20`})]}),Kt=(e,t,n,r,i,a)=>(0,J.useMemo)(()=>{let t=i?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,o=a?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,s=T`
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
    `,icon:d,input:c,inputContainer:s,inputDisabled:u,inputError:l,startIcon:f}},[e,t,n,r,i,a]),qt=({label:e,error:t,required:n,className:r,disabled:i,helperText:a,startIcon:o,endIcon:s,onStartIconClick:c,onEndIconClick:d,type:f=`text`,style:p={},...m})=>{let{theme:h,colorScheme:g}=K(),_=!!t,v=Kt(h,g,i??!1,_,!!o,!!s),y=C(l(u(`text-field`,`input`)),v.input,_&&v.inputError,i&&v.inputDisabled),b=C(l(u(`text-field`,`container`)),v.inputContainer),x=C(l(u(`text-field`,`start-icon`)),v.startIcon),S=C(l(u(`text-field`,`end-icon`)),v.endIcon);return(0,Y.jsxs)(ze,{error:t,helperText:a,className:C(l(u(`text-field`)),r),style:p,children:[e&&(0,Y.jsx)(He,{required:n,error:_,children:e}),(0,Y.jsxs)(`div`,{className:b,children:[o&&(0,Y.jsx)(`div`,{className:x,onClick:c,role:c?`button`:void 0,tabIndex:c&&!i?0:void 0,"aria-label":`Start icon`,children:o}),(0,Y.jsx)(`input`,{className:y,type:f,disabled:i,"aria-invalid":_,"aria-required":n,...m}),s&&(0,Y.jsx)(`div`,{className:S,onClick:d,role:d?`button`:void 0,tabIndex:d&&!i?0:void 0,"aria-label":`End icon`,children:s})]})]})},Jt=(e,t,n,r,i)=>(0,J.useMemo)(()=>{let t=T`
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
    `,toggleIcon:t,visibleIcon:n}},[e,t,n,r,i]),Yt=({onChange:e,className:t,disabled:n,error:r,...i})=>{let{theme:a,colorScheme:o}=K(),[s,c]=(0,J.useState)(!1),d=Jt(a,o,s,!!n,!!r),f=()=>{n||c(!s)},p=s?Gt:Wt;return(0,Y.jsx)(qt,{...i,className:C(l(u(`password-field`)),t),type:s?`text`:`password`,onChange:t=>e(t.target.value),autoComplete:`current-password`,disabled:n,error:r,endIcon:(0,Y.jsx)(p,{width:16,height:16,className:C(l(u(`password-field`,`toggle-icon`)),d.toggleIcon,s?d.visibleIcon:d.hiddenIcon)}),onEndIconClick:f})},Xt=(e,t,n,r)=>(0,J.useMemo)(()=>{let t=`data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${e.colors.text.secondary.replace(`#`,``)}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`,i=T`
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
    `,select:i,selectDisabled:o,selectError:a}},[e,t,n,r]),Zt=({label:e,error:t,className:n,required:r,disabled:i,helperText:a,placeholder:o,options:s,style:c={},...d})=>{let{theme:f,colorScheme:p}=K(),m=!!t,h=Xt(f,p,i??!1,m),g=C(l(u(`select`,`input`)),h.select,m&&h.selectError,i&&h.selectDisabled);return(0,Y.jsxs)(ze,{error:t,helperText:a,className:C(l(u(`select`)),n),style:c,children:[e&&(0,Y.jsx)(He,{required:r,error:m,children:e}),(0,Y.jsxs)(`select`,{className:g,disabled:i,"aria-invalid":m,"aria-required":r,...d,children:[o&&(0,Y.jsx)(`option`,{value:``,disabled:!0,children:o}),s.map(e=>(0,Y.jsx)(`option`,{value:e.value,className:h.option,children:e.label},e.value))]})]})},Qt=(e,t,n=!1,r=!1)=>{if(n&&r&&(!e||e.trim()===``))return`This field is required`;if(!e||e.trim()===``)return null;switch(t){case f.Number:{let t=parseInt(e,10);if(Number.isNaN(t))return`Please enter a valid number`;break}default:break}return null},$t=e=>{let{name:t,type:n,label:r,required:i,value:a,onChange:o,onBlur:s,disabled:c=!1,error:l,className:u,options:d=[],touched:p=!1,placeholder:m}=e,h=l||Qt(a,n,i,p),g={className:u,"data-testid":`thunderid-signin-${t}`,disabled:c,error:h,label:r,name:t,onBlur:s,placeholder:m,required:i,value:a};switch(n){case f.Password:return(0,Y.jsx)(Yt,{...g,onChange:o});case f.Text:return(0,Y.jsx)(qt,{...g,type:`text`,onChange:e=>o(e.target.value),autoComplete:`off`});case f.Email:return(0,Y.jsx)(qt,{...g,type:`email`,onChange:e=>o(e.target.value),autoComplete:`email`});case f.Tel:return(0,Y.jsx)(qt,{...g,type:`tel`,onChange:e=>o(e.target.value),autoComplete:`tel`});case f.Date:return(0,Y.jsx)(Vt,{...g,onChange:e=>o(e.target.value)});case f.Checkbox:{let e=a===`true`||a===!0;return(0,Y.jsx)(zt,{...g,checked:e,onChange:e=>o(e.target.checked.toString())})}case f.Otp:return(0,Y.jsx)(Ut,{...g,onChange:e=>o(e.target.value)});case f.Number:return(0,Y.jsx)(qt,{...g,type:`number`,onChange:e=>o(e.target.value),helperText:`Enter a numeric value`});case f.Select:{let e=d.length>0?d:[];return e.length>0?(0,Y.jsx)(Zt,{...g,options:e,onChange:e=>o(e.target.value),helperText:`Select from available options`}):(0,Y.jsx)(qt,{...g,type:`text`,onChange:e=>o(e.target.value),helperText:`Enter multiple values separated by commas (e.g., value1, value2, value3)`,placeholder:`value1, value2, value3`})}default:return(0,Y.jsx)(qt,{...g,type:`text`,onChange:e=>o(e.target.value),helperText:`Unknown field type, treating as text`})}},en=(e,t,r=[`label`,`placeholder`,`text`,`title`,`subtitle`],i)=>{let a={...e};return r.forEach(e=>{a[e]&&typeof a[e]==`string`&&(a[e]=n(a[e],{meta:i,t}))}),a},tn=(e,t,n,r)=>e.map(e=>{let i=en(e,t,n,r);return i.components&&Array.isArray(i.components)&&(i.components=tn(i.components,t,n,r)),i}),nn=tn,rn=e=>{let t=new Map;return e?.data?.inputs&&Array.isArray(e.data.inputs)&&e.data.inputs.forEach(e=>{e.ref&&e.identifier&&t.set(e.ref,e.identifier)}),t},an=e=>{let t=new Map;return e?.data?.actions&&Array.isArray(e.data.actions)&&e.data.actions.forEach(e=>{e.ref&&e.nextNode&&t.set(e.ref,e.nextNode)}),t},on=(e,t,n,r=[])=>e.map(e=>{let i={...e};if(i.ref&&t.has(i.ref)&&(i.ref=t.get(i.ref)),i.type===`SELECT`&&e.id){let t=r.find(t=>t.ref===e.id);t?.options&&(i.options=t.options.map(e=>{if(typeof e==`string`)return{label:e,value:e};let t=typeof e.value==`object`?JSON.stringify(e.value):String(e.value||``);return{label:typeof e.label==`object`?JSON.stringify(e.label):String(e.label||t),value:t}}))}return i.type===`ACTION`&&i.id&&n.has(i.id)&&(i.actionRef=n.get(i.id)),i.components&&Array.isArray(i.components)&&(i.components=on(i.components,t,n,r)),i}),sn=(e,t,n=!0,r)=>{if(!e?.data?.meta?.components)return[];let{components:i}=e.data.meta,a=rn(e),o=an(e),s=e?.data?.inputs||[];return(a.size>0||o.size>0||s.length>0)&&(i=on(i,a,o,s)),n?nn(i,t,void 0,r):i},cn=(e,t,n=`errors.flow.generic`)=>{if(e&&typeof e==`object`&&e.error){let n=e.error;if(n?.message?.key){let e=t(n.message.key);if(e&&e!==n.message.key)return e;let r=`system.${n.message.key}`,i=t(r);if(i&&i!==r)return i}let r=n?.message?.defaultValue??n?.description?.defaultValue;if(r)return r}return e&&typeof e==`object`&&e.failureReason?e.failureReason:e instanceof Error&&e.message?e.message:t(n)},ln=(e,t,n=`errors.flow.generic`)=>e?.flowStatus===`ERROR`?cn(e,t,n):null,un=(e,t,n={},r)=>{let{throwOnError:i=!0,defaultErrorKey:a=`errors.flow.generic`,resolveTranslations:o=!0}=n;if(ln(e,t,a)&&i)throw e;let s=e?.data?.additionalData??{};if(typeof s.consentPrompt==`string`)try{let e=JSON.parse(s.consentPrompt);s.consentPrompt={purposes:Array.isArray(e)?e:[]}}catch{}return{additionalData:s,components:sn(e,t,o,r),executionId:e.executionId}},dn=`4em`,fn=({component:e})=>{let{theme:t}=K(),n=e.config||{},r=n.src||``,i=n.alt||n.label||`Image`,a=n.width||`100%`,s=n.height||`auto`,c=e.variant?.toLowerCase()||`image_block`,l={borderRadius:t.vars.borderRadius.small,display:`block`,margin:c===`image_block`?`1rem auto`:`0`};if(!r)return null;if(o(r)){let t=e=>/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,n=t(a),o=t(s),c=e=>e!==`auto`&&!e.endsWith(`%`),u;return u=c(o)?o:c(n)?n:dn,(0,Y.jsx)(`div`,{style:{textAlign:`center`},children:(0,Y.jsx)(`span`,{style:{...l,containerType:`size`,display:`inline-grid`,height:u,placeItems:`center`,width:n},children:(0,Y.jsx)(`span`,{"aria-label":i,role:`img`,style:{fontSize:`100cqmin`,lineHeight:1},children:p(r)})})},e.id)}return(0,Y.jsx)(`div`,{style:{textAlign:`center`},children:(0,Y.jsx)(`img`,{src:r,alt:i,height:s,width:a,style:l,onError:e=>{e.currentTarget.style.display=`none`}})},e.id)},pn=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=nt(t?.i18n);return(0,Y.jsx)(ct,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,Y.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Y.jsx)(`path`,{fill:`currentColor`,d:`M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z`})}),children:n??i(`elements.buttons.smsotp.text`)})},mn=e=>(0,J.useMemo)(()=>({container:T`
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
      `}),[e]),hn=({label:e,value:t})=>{let{theme:n}=K(),r=mn(n),{t:i}=nt(),[a,o]=(0,J.useState)(!1),s=(0,J.useCallback)(async()=>{try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement(`textarea`);e.value=t,document.body.appendChild(e),e.select(),document.execCommand(`copy`),document.body.removeChild(e)}o(!0),setTimeout(()=>o(!1),3e3)},[t]);return(0,Y.jsxs)(`div`,{className:r.container,children:[e&&(0,Y.jsx)(`span`,{className:r.label,children:e}),(0,Y.jsxs)(`div`,{className:r.valueBox,children:[(0,Y.jsx)(`span`,{className:r.valueText,children:t}),(0,Y.jsx)(ct,{variant:`outline`,size:`small`,className:r.copyButton,onClick:()=>{s().catch(()=>void 0)},children:i(a?`elements.display.copyable_text.copied`:`elements.display.copyable_text.copy`)})]})]})},gn=({color:e=`currentColor`,size:t=24})=>(0,Y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,Y.jsx)(`path`,{d:`M8 3 4 7l4 4`}),(0,Y.jsx)(`path`,{d:`M4 7h16`}),(0,Y.jsx)(`path`,{d:`m16 21 4-4-4-4`}),(0,Y.jsx)(`path`,{d:`M20 17H4`})]});gn.displayName=`ArrowLeftRight`;var _n=gn,vn=({color:e=`currentColor`,size:t=24})=>(0,Y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,Y.jsx)(`path`,{d:`m16 3 4 4-4 4`}),(0,Y.jsx)(`path`,{d:`M20 7H4`}),(0,Y.jsx)(`path`,{d:`m8 21-4-4 4-4`}),(0,Y.jsx)(`path`,{d:`M4 17h16`})]});vn.displayName=`ArrowRightLeft`;var yn={ArrowLeftRight:_n,ArrowRightLeft:vn},bn=s(`@thunderid/react`,`AuthOptionFactory`),xn=T`
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
`,Sn=e=>{switch(e){case v.EmailInput:return f.Email;case v.PhoneInput:return f.Tel;case v.PasswordInput:return f.Password;case v.TextInput:default:return f.Text}},Cn=e=>({BODY_1:`body1`,BODY_2:`body2`,BUTTON_TEXT:`button`,CAPTION:`caption`,HEADING_1:`h1`,HEADING_2:`h2`,HEADING_3:`h3`,HEADING_4:`h4`,HEADING_5:`h5`,HEADING_6:`h6`,OVERLINE:`overline`,SUBTITLE_1:`subtitle1`,SUBTITLE_2:`subtitle2`})[e]||`h3`,wn=(e,t,n,r,i,a)=>{let o=`${r}_auth`,s=e===o||t===o;return n.toLowerCase().includes(r)?!0:i===`signup`?s||n.toLowerCase().includes(r):s},Tn=(e,t,r,i,a,o,s,c,l={})=>{let u=l._theme,p=l._customRenderers??{},h=l.key||e.id,g=p[e.id]??p[e.type];if(g)return g(e,{additionalData:l.additionalData,authType:c,formErrors:i,formValues:t,isFormValid:o,isLoading:a,meta:l.meta,onInputBlur:l.onInputBlur,onInputChange:s,onSubmit:l.onSubmit,touchedFields:r});let _=e=>!e||!l.t&&!l.meta?e||``:n(e,{meta:l.meta,t:l.t||(e=>e)});switch(e.type){case v.TextInput:case v.PasswordInput:case v.EmailInput:case v.PhoneInput:{let n=e.ref,a=t[n]||``,o=r[n]?i[n]:void 0,c=Sn(e.type);return(0,J.cloneElement)($t({className:l.inputClassName,error:o,label:_(e.label)||``,name:n,onBlur:()=>l.onInputBlur?.(n),onChange:e=>s(n,e),placeholder:_(e.placeholder)||``,required:e.required||!1,type:c,value:a}),{key:h})}case v.OtpInput:{let n=e.ref,a=t[n]||``,o=r[n]?i[n]:void 0;return(0,J.cloneElement)($t({className:l.inputClassName,error:o,label:_(e.label)||``,name:n,onBlur:()=>l.onInputBlur?.(n),onChange:e=>s(n,e),placeholder:_(e.placeholder)||``,required:e.required||!1,type:f.Otp,value:a}),{key:h})}case v.Action:{let n=e.id,r=e.eventType||``,i=_(e.label),s=e.variant||``,u=r.toUpperCase()===d.Trigger,f=()=>{if(l.onSubmit){let n={};Object.keys(t).forEach(e=>{n[e]=t[e]});let i=l.additionalData?.consentPrompt;if(i&&r.toUpperCase()===d.Submit){let e=s.toLowerCase()!==`primary`,r={purposes:i.purposes.map(n=>({approved:!e,elements:[...n.essential.map(t=>({approved:!e,name:t.name})),...n.optional.map(r=>({approved:e?!1:t[We(n.purposeId,r.name)]!==`false`,name:r.name}))],purposeName:n.purposeName}))};n.consent_decisions=JSON.stringify(r)}l.onSubmit(e,n,u)}};if(wn(n,r,i,`google`,c,s))return(0,Y.jsx)(Pt,{onClick:f,className:l.buttonClassName},h);if(wn(n,r,i,`github`,c,s))return(0,Y.jsx)(Nt,{onClick:f,className:l.buttonClassName},h);if(wn(n,r,i,`facebook`,c,s))return(0,Y.jsx)(Mt,{onClick:f,className:l.buttonClassName},h);if(wn(n,r,i,`microsoft`,c,s))return(0,Y.jsx)(It,{onClick:f,className:l.buttonClassName},h);if(wn(n,r,i,`linkedin`,c,s))return(0,Y.jsx)(Ft,{onClick:f,className:l.buttonClassName},h);if(wn(n,r,i,`ethereum`,c,s))return(0,Y.jsx)(Lt,{onClick:f,className:l.buttonClassName},h);if(n===`prompt_mobile`||r===`prompt_mobile`)return(0,Y.jsx)(pn,{onClick:f,className:l.buttonClassName},h);let p=e.startIcon?(0,Y.jsx)(`img`,{src:e.startIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null,m=e.endIcon?(0,Y.jsx)(`img`,{src:e.endIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null;return(0,Y.jsx)(ct,{fullWidth:!0,onClick:f,disabled:a||!o&&!u||l.isTimeoutDisabled||e.config?.disabled,className:l.buttonClassName,"data-testid":`thunderid-signin-submit`,variant:e.variant?.toLowerCase()===`primary`?`solid`:`outline`,color:e.variant?.toLowerCase()===`primary`?`primary`:`secondary`,startIcon:p,endIcon:m,children:i||`Submit`},h)}case v.Text:return(0,Y.jsx)(Be,{variant:Cn(e.variant),style:{marginBottom:2,textAlign:typeof e?.align==`string`?e.align:`left`},children:_(e.label)},h);case v.Divider:return(0,Y.jsx)(Re,{children:_(e.label)||``},h);case v.Select:{let n=e.ref,a=t[n]||``,o=r[n]?i[n]:void 0,c=(e.options||[]).map(e=>({label:typeof e==`string`?e:String(e.label??e.value??``),value:typeof e==`string`?e:String(e.value??``)}));return(0,Y.jsx)(Zt,{name:n,label:_(e.label)||``,placeholder:_(e.placeholder),required:e.required,options:c,value:a,error:o,onChange:e=>s(n,e.target.value),onBlur:()=>l.onInputBlur?.(n),className:l.inputClassName},h)}case v.DateInput:{let n=e.ref,a=t[n]||``,o=r[n]?i[n]:void 0;return(0,Y.jsx)(Vt,{name:n,label:_(e.label)||``,placeholder:_(e.placeholder),required:e.required,dateFormat:e.dateFormat,value:a,error:o,onChange:e=>s(n,e.target.value),onBlur:()=>l.onInputBlur?.(n),className:l.inputClassName},h)}case v.OuSelect:{let n=e.ref??e.id,r=l.additionalData?.rootOuId;return!r||!l.fetchOrganizationUnitChildren?(bn.warn(`OU_SELECT requires additionalData.rootOuId and fetchOrganizationUnitChildren. Skipping render.`),null):(0,Y.jsx)(jt,{rootOuId:r,selectedOuId:t[n]||null,onSelect:e=>s(n,e),fetchChildren:l.fetchOrganizationUnitChildren},h)}case v.Block:if(e.components&&e.components.length>0){let n={display:`flex`,flexDirection:`column`,gap:`calc(${u?.vars?.spacing?.unit??`4px`} * 2)`},d=e.components.map((n,u)=>Tn(n,t,r,i,a,o,s,c,{...l,key:n.id||`${e.id}_${u}`})).filter(Boolean);return(0,Y.jsx)(`form`,{id:e.id,style:n,children:d},h)}return null;case v.RichText:return(0,Y.jsx)(`div`,{className:xn,dangerouslySetInnerHTML:{__html:Ge.sanitize(m(_(e.label)))}},h);case v.Image:{let t=_(e.height?.toString()),n=_(e.width?.toString());return(0,Y.jsx)(fn,{component:{config:{alt:_(e.alt)||_(e.label)||`Image`,height:t||(l.inStack?`50`:`auto`),src:_(e.src),width:n||(l.inStack?`50`:`100%`)}},formErrors:void 0,formValues:void 0,isFormValid:!1,isLoading:!1,onInputChange:()=>{throw Error(`Function not implemented.`)},touchedFields:void 0},h)}case v.Icon:{let t=e.name||``,n=yn[t];return n?(0,Y.jsx)(n,{size:e.size||24,color:e.color||`currentColor`},h):(bn.warn(`Unknown icon name: "${t}". Skipping render.`),null)}case v.Stack:{let n=e.direction||`row`,u=e.gap??2,d=e.align||`center`,f=e.justify||`flex-start`;return(0,Y.jsx)(`div`,{style:{alignItems:d,display:`flex`,flexDirection:n,flexWrap:`wrap`,gap:`${u*.5}rem`,justifyContent:f},children:e.components?e.components.map((n,u)=>Tn(n,t,r,i,a,o,s,c,{...l,inStack:!0,key:n.id||`${e.id}_${u}`})):[]},h)}case v.Consent:{let e=l.additionalData?.consentPrompt;return(0,Y.jsx)(Le,{consentData:e,formValues:t,onInputChange:s},h)}case v.Timer:{let t=_(e.label)||`Time remaining: {time}`,n=Number(l.additionalData?.stepTimeout)||0;return(0,Y.jsx)(Ve,{expiresIn:n>0?Math.max(0,Math.floor((n-Date.now())/1e3)):0,textTemplate:t},h)}case v.CopyableText:{let t=e.source,n=t&&l.additionalData?String(l.additionalData[t]??``):``;return(0,Y.jsx)(hn,{label:_(e.label)||void 0,value:n},h)}default:return bn.warn(`Unsupported component type: ${e.type}. Skipping render.`),null}},En=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>Tn(e,t,n,r,i,a,o,`signup`,{...s,key:e.id||c})).filter(e=>e!==null),Dn=(e,t)=>(0,J.useMemo)(()=>{let t=T`
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
    `,title:r}},[e.vars.colors.background.surface,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.large,e.vars.spacing.unit,e.vars.typography.fontFamily,t]),On=({onInitialize:e,onSubmit:n,onError:r,onFlowChange:i,className:a=``,children:o,fetchOrganizationUnitChildren:s,isInitialized:c=!0,preferences:l,size:u=`medium`,variant:d=`outlined`,showTitle:f=!0,showSubtitle:p=!0})=>{let{meta:m,isInitialized:g,getStorageManager:v}=_(),{t:y}=nt(l?.i18n),{theme:x}=K(),S=(0,J.useContext)(et),w=Dn(x,x.vars.colors.text.primary),[T,E]=(0,J.useState)(!1),[D,O]=(0,J.useState)(!1),[k,A]=(0,J.useState)(null),[j,M]=(0,J.useState)(null),[N,ee]=(0,J.useState)({}),[te,P]=(0,J.useState)({}),[ne,F]=(0,J.useState)({}),[I,re]=(0,J.useState)(!0),L=(0,J.useRef)(null);(0,J.useEffect)(()=>{let e=k?.data?.fieldErrors;if(!e||e.length===0)return;let t={},n={};for(let r of e)r.identifier in t||(t[r.identifier]=r.message,n[r.identifier]=!0);P(t),F(e=>({...e,...n}))},[k]);let R=(0,J.useRef)(!1);(0,J.useEffect)(()=>{g&&(async()=>{try{let e=await(await v())?.getTemporaryData();e?.challengeToken&&(L.current=e.challengeToken)}catch{}})()},[g]);let ie=async e=>{L.current=e;try{let t=await v();t&&(e?await t.setTemporaryDataParameter(`challengeToken`,e):await t.removeTemporaryDataParameter(`challengeToken`))}catch{t.warn(`Failed to persist challenge token in storage.`)}},z=(0,J.useCallback)(e=>{let t=cn(e,y,`components.inviteUser.errors.generic`);M(e instanceof Error?e:Error(t)),r?.(e instanceof Error?e:Error(t))},[y,r]),B=(0,J.useCallback)(e=>{if(!e?.data?.meta?.components)return e;try{let{components:t}=un(e,y,{defaultErrorKey:`components.inviteUser.errors.generic`,resolveTranslations:!1},m);return{...e,data:{...e.data,components:t}}}catch{return e}},[y,o]),V=(0,J.useCallback)((e,t)=>{ee(n=>({...n,[e]:t})),P(t=>{let n={...t};return delete n[e],n})},[]),ae=(0,J.useCallback)(e=>{F(t=>({...t,[e]:!0}))},[]),oe=(0,J.useCallback)(e=>{let t={},n=e=>{e.forEach(e=>{if((e.type===`TEXT_INPUT`||e.type===`EMAIL_INPUT`||e.type===`SELECT`||e.type===`PHONE_INPUT`||e.type===`OTP_INPUT`||e.type===`DATE_INPUT`)&&e.ref){let n=N[e.ref];if(e.required&&(!n||n.trim()===``))t[e.ref]=`${e.label||e.ref} is required`;else if(e.type===`EMAIL_INPUT`&&n&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)&&(t[e.ref]=`Please enter a valid email address`),n&&!t[e.ref]){let r=b(e.validation);if(r){let i=r(n);i&&(t[e.ref]=y(i))}}}e.components&&Array.isArray(e.components)&&n(e.components)})};return n(e),{errors:t,isValid:Object.keys(t).length===0}},[N]),se=(0,J.useCallback)(async(e,t)=>{if(!k)return;let r=oe(k.data?.components||[]);if(!r.isValid){P(r.errors),re(!1);let e={};Object.keys(r.errors).forEach(t=>{e[t]=!0}),F(t=>({...t,...e}));return}E(!0),M(null),re(!0);try{let r=t||N,a={executionId:k.executionId,inputs:r,verbose:!0,...L.current?{challengeToken:L.current}:{}};e?.id&&(a.action=e.id);let o=B(await n(a));if(i?.(o),await ie(o.challengeToken??null),o.flowStatus===`ERROR`){z(o);return}A(o),ee({}),P({}),F({}),o?.error&&z(o)}catch(e){z(e)}finally{E(!1)}},[k,N,oe,n,i,z,B]),H=(0,J.useCallback)(()=>{O(!1),A(null),M(null),ee({}),P({}),F({}),R.current=!1},[]);(0,J.useEffect)(()=>{c&&!D&&!R.current&&(R.current=!0,(async()=>{E(!0),M(null);try{let t=B(await e({flowType:h.UserOnboarding,verbose:!0}));await ie(t.challengeToken??null),A(t),O(!0),i?.(t),t.flowStatus===`ERROR`&&z(t)}catch(e){z(e)}finally{E(!1)}})())},[c,D,e,i,z,B]),(0,J.useEffect)(()=>{if(k&&D){let e=k.data?.components||[];e.length>0&&re(oe(e).isValid)}},[N,k,D,oe]);let ce=(0,J.useCallback)(e=>{let t,n;return e.forEach(e=>{e.type===`TEXT`&&(e.variant===`HEADING_1`&&!t?t=e.label:(e.variant===`HEADING_2`||e.variant===`SUBTITLE_1`)&&!n&&(n=e.label))}),{subtitle:n,title:t}},[]),le=(0,J.useCallback)(e=>e.filter(e=>!(e.type===`TEXT`&&(e.variant===`HEADING_1`||e.variant===`HEADING_2`))),[]),ue=(0,J.useCallback)(e=>En(e,N,ne,te,T,I,V,{_customRenderers:S,_theme:x,additionalData:k?.data?.additionalData,fetchOrganizationUnitChildren:s,onInputBlur:ae,onSubmit:se,size:u,variant:d}),[S,k?.data?.additionalData,s,N,ne,te,T,I,V,ae,se,u,x,d]),de=k?.data?.components||k?.data?.meta?.components||[],{title:U,subtitle:fe}=ce(de),pe=le(de),me={additionalData:k?.data?.additionalData,components:de,error:j,executionId:k?.executionId,fieldErrors:te,handleInputBlur:ae,handleInputChange:V,handleSubmit:se,isLoading:T,isValid:I,meta:m,resetFlow:H,subtitle:fe,title:U,touched:ne,values:N};return o?(0,Y.jsx)(`div`,{className:a,children:o(me)}):!c||!D&&T?(0,Y.jsx)(kt,{className:C(a,w.card),variant:d,children:(0,Y.jsx)(kt.Content,{children:(0,Y.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`2rem`},children:(0,Y.jsx)(it,{size:`medium`})})})}):!k&&j?(0,Y.jsx)(kt,{className:C(a,w.card),variant:d,children:(0,Y.jsx)(kt.Content,{children:(0,Y.jsxs)(bt,{variant:`error`,children:[(0,Y.jsx)(bt.Title,{children:`Error`}),(0,Y.jsx)(bt.Description,{children:j.message})]})})}):(0,Y.jsxs)(kt,{className:C(a,w.card),variant:d,children:[(f||p)&&(U||fe)&&(0,Y.jsxs)(kt.Header,{className:w.header,children:[f&&U&&(0,Y.jsx)(kt.Title,{level:2,className:w.title,children:U}),p&&fe&&(0,Y.jsx)(Be,{variant:`body1`,className:w.subtitle,children:fe})]}),(0,Y.jsxs)(kt.Content,{children:[j&&(0,Y.jsx)(`div`,{style:{marginBottom:`1rem`},children:(0,Y.jsx)(bt,{variant:`error`,children:(0,Y.jsx)(bt.Description,{children:j.message})})}),(0,Y.jsxs)(`div`,{children:[pe&&pe.length>0?ue(pe):!T&&(0,Y.jsx)(bt,{variant:`warning`,children:(0,Y.jsx)(Be,{variant:`body1`,children:`No form components available`})}),T&&(0,Y.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`1rem`},children:(0,Y.jsx)(it,{size:`small`})})]})]})]})},kn=({onError:e,onFlowChange:t,className:n,children:r,size:i=`medium`,variant:o=`outlined`,showTitle:s=!0,showSubtitle:c=!0})=>{let{http:l,baseUrl:u,getAccessToken:d,isInitialized:f}=_();return(0,Y.jsx)(On,{onInitialize:async e=>(await l.request({data:{...e,flowType:h.UserOnboarding,verbose:!0},headers:{Accept:`application/json`,"Content-Type":`application/json`},method:`POST`,url:`${u}/flow/execute`})).data,onSubmit:async e=>(await l.request({data:{...e,verbose:!0},headers:{Accept:`application/json`,"Content-Type":`application/json`},method:`POST`,url:`${u}/flow/execute`})).data,onError:e,onFlowChange:t,className:n,fetchOrganizationUnitChildren:(0,J.useCallback)(async(e,t,n)=>a({baseUrl:u,headers:{Authorization:`Bearer ${await d()}`},limit:t,offset:n,organizationUnitId:e}),[u,d]),isInitialized:f,size:i,variant:o,showTitle:s,showSubtitle:c,children:r})},X={USERS:`users`,USER:`user`,USER_TYPES:`userTypes`,USER_TYPE:`userType`},Z=Me();function An(){let e=(0,Z.c)(14),{http:t}=_(),{getServerUrl:n}=W(),a=r(),{t:o}=G(`users`),{showToast:s}=je(),c;e[0]!==n||e[1]!==t?(c=async e=>{let r=n();return(await t.request({url:`${r}/users`,method:`POST`,headers:{"Content-Type":`application/json`},data:e})).data},e[0]=n,e[1]=t,e[2]=c):c=e[2];let l;e[3]!==a||e[4]!==s||e[5]!==o?(l=()=>{a.invalidateQueries({queryKey:[X.USERS]}).catch(jn),s(o(`create.success`),`success`)},e[3]=a,e[4]=s,e[5]=o,e[6]=l):l=e[6];let u;e[7]!==s||e[8]!==o?(u=()=>{s(o(`create.error`),`error`)},e[7]=s,e[8]=o,e[9]=u):u=e[9];let d;return e[10]!==c||e[11]!==l||e[12]!==u?(d={mutationFn:c,onSuccess:l,onError:u},e[10]=c,e[11]=l,e[12]=u,e[13]=d):d=e[13],i(d)}function jn(){}function Mn(){let e=(0,Z.c)(14),{http:t}=_(),{getServerUrl:n}=W(),a=r(),{t:o}=G(`users`),{showToast:s}=je(),c;e[0]!==n||e[1]!==t?(c=async e=>{let r=n();await t.request({url:`${r}/users/${e}`,method:`DELETE`,headers:{"Content-Type":`application/json`}})},e[0]=n,e[1]=t,e[2]=c):c=e[2];let l;e[3]!==a||e[4]!==s||e[5]!==o?(l=(e,t)=>{a.removeQueries({queryKey:[X.USER,t]}),a.invalidateQueries({queryKey:[X.USERS]}).catch(Nn),s(o(`delete.success`),`success`)},e[3]=a,e[4]=s,e[5]=o,e[6]=l):l=e[6];let u;e[7]!==s||e[8]!==o?(u=()=>{s(o(`delete.error`),`error`)},e[7]=s,e[8]=o,e[9]=u):u=e[9];let d;return e[10]!==c||e[11]!==l||e[12]!==u?(d={mutationFn:c,onSuccess:l,onError:u},e[10]=c,e[11]=l,e[12]=u,e[13]=d):d=e[13],i(d)}function Nn(){}function Pn(e){let t=(0,Z.c)(10),{http:n}=_(),{getServerUrl:r}=W(),i;t[0]===e?i=t[1]:(i=[X.USER,e],t[0]=e,t[1]=i);let a;t[2]!==r||t[3]!==n||t[4]!==e?(a=async()=>{let t=r();return(await n.request({url:`${t}/users/${e}?include=display`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[2]=r,t[3]=n,t[4]=e,t[5]=a):a=t[5];let o=!!e,s;return t[6]!==i||t[7]!==a||t[8]!==o?(s={queryKey:i,queryFn:a,enabled:o},t[6]=i,t[7]=a,t[8]=o,t[9]=s):s=t[9],x(s)}function Fn(e){let t=(0,Z.c)(15),{http:n}=_(),{getServerUrl:r}=W(),i;t[0]===e?i=t[1]:(i=e??{},t[0]=e,t[1]=i);let{limit:a,offset:o,filter:s}=i,c;t[2]!==s||t[3]!==a||t[4]!==o?(c=[X.USERS,{limit:a,offset:o,filter:s}],t[2]=s,t[3]=a,t[4]=o,t[5]=c):c=t[5];let l;t[6]!==s||t[7]!==r||t[8]!==n||t[9]!==a||t[10]!==o?(l=async()=>{let e=r(),t=new URLSearchParams;a!==void 0&&t.append(`limit`,String(a)),o!==void 0&&t.append(`offset`,String(o)),s&&t.append(`filter`,s),t.append(`include`,`display`);let i=t.toString();return(await n.request({url:`${e}/users${i?`?${i}`:``}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[6]=s,t[7]=r,t[8]=n,t[9]=a,t[10]=o,t[11]=l):l=t[11];let u;return t[12]!==c||t[13]!==l?(u={queryKey:c,queryFn:l},t[12]=c,t[13]=l,t[14]=u):u=t[14],x(u)}function In(e){let t=(0,Z.c)(10),{http:n}=_(),{getServerUrl:r}=W(),i;t[0]===e?i=t[1]:(i=[X.USER_TYPE,e],t[0]=e,t[1]=i);let a;t[2]!==r||t[3]!==n||t[4]!==e?(a=async()=>{let t=r();return(await n.request({url:`${t}/user-types/${e}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[2]=r,t[3]=n,t[4]=e,t[5]=a):a=t[5];let o=!!e,s;return t[6]!==i||t[7]!==a||t[8]!==o?(s={queryKey:i,queryFn:a,enabled:o},t[6]=i,t[7]=a,t[8]=o,t[9]=s):s=t[9],x(s)}function Ln(e){let t=(0,Z.c)(13),{http:n}=_(),{getServerUrl:r}=W(),i;t[0]===e?i=t[1]:(i=e??{},t[0]=e,t[1]=i);let{limit:a,offset:o}=i,s;t[2]!==a||t[3]!==o?(s=[X.USER_TYPES,{limit:a,offset:o}],t[2]=a,t[3]=o,t[4]=s):s=t[4];let c;t[5]!==r||t[6]!==n||t[7]!==a||t[8]!==o?(c=async()=>{let e=r(),t=new URLSearchParams;a!==void 0&&t.append(`limit`,String(a)),o!==void 0&&t.append(`offset`,String(o));let i=t.toString();return(await n.request({url:`${e}/user-types${i?`?${i}`:``}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},t[5]=r,t[6]=n,t[7]=a,t[8]=o,t[9]=c):c=t[9];let l;return t[10]!==s||t[11]!==c?(l={queryKey:s,queryFn:c},t[10]=s,t[11]=c,t[12]=l):l=t[12],x(l)}function Rn(){let e=(0,Z.c)(14),{http:t}=_(),{getServerUrl:n}=W(),a=r(),{t:o}=G(`users`),{showToast:s}=je(),c;e[0]!==n||e[1]!==t?(c=async e=>{let{userId:r,data:i}=e,a=n();return(await t.request({url:`${a}/users/${r}`,method:`PUT`,headers:{"Content-Type":`application/json`},data:i})).data},e[0]=n,e[1]=t,e[2]=c):c=e[2];let l;e[3]!==a||e[4]!==s||e[5]!==o?(l=(e,t)=>{a.invalidateQueries({queryKey:[X.USER,t.userId]}).catch(Bn),a.invalidateQueries({queryKey:[X.USERS]}).catch(zn),s(o(`update.success`),`success`)},e[3]=a,e[4]=s,e[5]=o,e[6]=l):l=e[6];let u;e[7]!==s||e[8]!==o?(u=()=>{s(o(`update.error`),`error`)},e[7]=s,e[8]=o,e[9]=u):u=e[9];let d;return e[10]!==c||e[11]!==l||e[12]!==u?(d={mutationFn:c,onSuccess:l,onError:u},e[10]=c,e[11]=l,e[12]=u,e[13]=d):d=e[13],i(d)}function zn(){}function Bn(){}function Vn(e){let t=(0,Z.c)(8),{value:n,onChange:r,fieldLabel:i}=e,[a,o]=(0,J.useState)(``),s;if(t[0]!==i||t[1]!==a||t[2]!==r||t[3]!==n){let e=Array.isArray(n)?n:[],c=()=>{a.trim()&&(r([...e,a.trim()]),o(``))},l=t=>{r(e.filter((e,n)=>n!==t))},u;t[5]===c?u=t[6]:(u=e=>{e.key===`Enter`&&(e.preventDefault(),c())},t[5]=c,t[6]=u);let d=u,f;t[7]===Symbol.for(`react.memo_cache_sentinel`)?(f=e=>o(e.target.value),t[7]=f):f=t[7],s=(0,Y.jsxs)(P,{children:[(0,Y.jsxs)(P,{sx:{display:`flex`,gap:1,mb:1},children:[(0,Y.jsx)(R,{value:a,onChange:f,onKeyDown:d,placeholder:`Add ${i.toLowerCase()}`,fullWidth:!0,size:`small`,variant:`outlined`}),(0,Y.jsx)(z,{size:`small`,onClick:c,disabled:!a.trim(),children:(0,Y.jsx)(be,{size:16})})]}),(0,Y.jsx)(P,{sx:{display:`flex`,flexWrap:`wrap`,gap:1},children:e.length>0&&e.map((e,t)=>(0,Y.jsx)(D,{label:String(e),onDelete:()=>l(t),variant:`outlined`,size:`medium`},`chip-${e}`))})]}),t[0]=i,t[1]=a,t[2]=r,t[3]=n,t[4]=s}else s=t[4];return s}var Hn=Vn;function Un({id:e,value:t,placeholder:n,required:r,error:i,helperText:a=void 0,color:o,onChange:s,onBlur:c,inputRef:l,name:u,ariaLabel:d=void 0}){let[f,p]=(0,J.useState)(!1);return(0,Y.jsx)(R,{id:e,name:u,value:t,type:f?`text`:`password`,placeholder:n,fullWidth:!0,required:r,variant:`outlined`,error:i,helperText:a,color:o,onChange:s,onBlur:c,inputRef:l,slotProps:{htmlInput:{"aria-label":d},input:{endAdornment:(0,Y.jsx)(M,{position:`end`,children:(0,Y.jsx)(z,{"aria-label":f?`hide password`:`show password`,onClick:()=>p(e=>!e),edge:`end`,children:f?(0,Y.jsx)(xe,{}):(0,Y.jsx)(fe,{})})})}}})}var Wn=Un;function Gn({open:e,userId:t,onClose:n,onSuccess:r=void 0}){let{t:i}=G(),a=Mn(),[o,s]=(0,J.useState)(null),c=()=>{a.isPending||(s(null),n())};return(0,Y.jsxs)(se,{open:e,onClose:c,maxWidth:`sm`,fullWidth:!0,children:[(0,Y.jsx)(oe,{children:i(`users:delete.title`,`Delete User`)}),(0,Y.jsxs)(ie,{children:[(0,Y.jsx)(ce,{sx:{mb:2},children:i(`users:delete.message`,`Are you sure you want to delete this user? This action cannot be undone.`)}),(0,Y.jsx)(E,{severity:`warning`,sx:{mb:2},children:i(`users:delete.disclaimer`,`All associated data will be permanently removed.`)}),o&&(0,Y.jsx)(E,{severity:`error`,sx:{mt:2},children:o})]}),(0,Y.jsxs)(F,{children:[(0,Y.jsx)(L,{onClick:c,disabled:a.isPending,children:i(`common:actions.cancel`)}),(0,Y.jsx)(L,{onClick:()=>{t&&(s(null),a.mutate(t,{onSuccess:()=>{s(null),n(),r?.()},onError:e=>{s(e.message??i(`users:delete.error`,`Failed to delete user`))}}))},color:`error`,variant:`contained`,disabled:a.isPending||!t,children:a.isPending?i(`common:status.deleting`,`Deleting...`):i(`common:actions.delete`,`Delete`)})]})]})}function Kn(){let e=qe(),{t}=G(),n=Ne(`UsersList`),r=Fe(),{data:i,isLoading:a,error:o}=Fn(),s=Mn(),c=o,[l,u]=(0,J.useState)(!1),[d,f]=(0,J.useState)(null),[p,m]=(0,J.useState)(!1),[h,g]=(0,J.useState)(null);h!==c&&(g(c),c&&u(!0));let _=()=>{u(!1)},v=(0,J.useCallback)(e=>{f(e),m(!0)},[]),y=(0,J.useCallback)(t=>{(async()=>{await e(`/users/${t}`)})().catch(e=>{n.error(`Failed to navigate to user details`,{error:e,userId:t})})},[n,e]),b=()=>{m(!1),f(null)},x=async()=>{if(d)try{await s.mutateAsync(d),m(!1),f(null)}catch(e){m(!1),n.error(`Failed to delete user`,{error:e,userId:d})}},S=(0,J.useMemo)(()=>[{field:`name`,headerName:t(`users:listing.columns.name`,`Name`),flex:1,minWidth:200,renderCell:e=>{let t=e.row.display??e.row.id,n=e.row.attributes?.picture,r=typeof n==`string`?n:void 0;return(0,Y.jsx)(ve.CellIcon,{sx:{width:`100%`},icon:(0,Y.jsx)(Ke,{value:r,size:30,fallback:Ae(t)}),primary:t})}},{field:`id`,headerName:t(`users:listing.columns.userId`,`User ID`),flex:1,minWidth:200,renderCell:e=>(0,Y.jsx)(V,{variant:`body2`,sx:{fontFamily:`monospace`,fontSize:`0.875rem`},children:e.row.id})},{field:`ouHandle`,headerName:t(`users:listing.columns.organizationUnit`,`Organization Unit`),flex:.5,minWidth:150,renderCell:e=>(0,Y.jsx)(V,{variant:`body2`,sx:{fontFamily:`monospace`,fontSize:`0.875rem`},children:e.row.ouHandle??e.row.ouId??`-`})},{field:`actions`,headerName:t(`users:listing.columns.actions`,`Actions`),width:150,align:`center`,headerAlign:`center`,sortable:!1,filterable:!1,hideable:!1,renderCell:e=>(0,Y.jsx)(ve.RowActions,{children:e.row.isReadOnly?(0,Y.jsx)(I,{title:t(`common:status.readOnly`,`Read Only`),children:(0,Y.jsx)(z,{size:`small`,disableRipple:!0,sx:{cursor:`default`},children:(0,Y.jsx)(fe,{size:16})})}):(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(I,{title:t(`common:actions.edit`),children:(0,Y.jsx)(z,{size:`small`,onClick:t=>{t.stopPropagation(),y(e.row.id)},children:(0,Y.jsx)(we,{size:16})})}),(0,Y.jsx)(I,{title:t(`common:actions.delete`),children:(0,Y.jsx)(z,{size:`small`,color:`error`,onClick:t=>{t.stopPropagation(),v(e.row.id)},children:(0,Y.jsx)(Ee,{size:16})})})]})})}],[v,y,t]);return(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(ve.Provider,{variant:`data-grid-card`,loading:a,children:(0,Y.jsx)(ve.Container,{disablePaper:!0,children:(0,Y.jsx)(ve.DataGrid,{rows:i?.users??[],columns:S,getRowId:e=>e.id,onRowClick:e=>{y(e.row.id)},initialState:{pagination:{paginationModel:{pageSize:10}}},pageSizeOptions:[5,10,25,50],disableRowSelectionOnClick:!0,localeText:r,autoHeight:!0,sx:{"& .MuiDataGrid-row":{cursor:`pointer`}}})})}),(0,Y.jsxs)(se,{open:p,onClose:b,children:[(0,Y.jsx)(oe,{children:t(`users:deleteUser`)}),(0,Y.jsxs)(ie,{children:[(0,Y.jsx)(ce,{children:t(`users:confirmDeleteUser`)}),s.error&&(0,Y.jsx)(E,{severity:`error`,sx:{mt:2},children:(0,Y.jsx)(V,{variant:`body2`,sx:{fontWeight:`bold`},children:s.error.message})})]}),(0,Y.jsxs)(F,{children:[(0,Y.jsx)(L,{onClick:b,disabled:s.isPending,children:t(`common:actions.cancel`)}),(0,Y.jsx)(L,{onClick:()=>{x().catch(()=>{})},color:`error`,variant:`contained`,disabled:s.isPending,children:s.isPending?t(`common:status.loading`):t(`common:actions.delete`)})]})]}),(0,Y.jsx)(de,{open:l,autoHideDuration:6e3,onClose:_,anchorOrigin:{vertical:`top`,horizontal:`right`},children:(0,Y.jsx)(E,{onClose:_,severity:`error`,sx:{width:`100%`},children:c?.message??t(`common:messages.saveError`)})})]})}async function qn(e,t,n,r){let i=new URLSearchParams({limit:String(r.limit),offset:String(r.offset)});return(await e.request({url:`${t}/organization-units/${encodeURIComponent(n)}/ous?${i.toString()}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data}async function Jn(e,t,n){let r=new URLSearchParams({limit:String(n.limit),offset:String(n.offset)});return(await e.request({url:`${t}/organization-units?${r.toString()}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data}var Yn={ORGANIZATION_UNITS:`organization-units`,ORGANIZATION_UNIT:`organization-unit`,CHILD_ORGANIZATION_UNITS:`child-organization-units`,ORGANIZATION_UNIT_USERS:`organization-unit-users`,ORGANIZATION_UNIT_GROUPS:`organization-unit-groups`};function Xn(e,t){let n=(0,Z.c)(18),{http:r}=_(),{getServerUrl:i}=W(),a;n[0]===t?a=n[1]:(a=t??{},n[0]=t,n[1]=a);let{limit:o,offset:s}=a,c=o===void 0?30:o,l=s===void 0?0:s,u;n[2]!==c||n[3]!==l?(u={limit:c,offset:l},n[2]=c,n[3]=l,n[4]=u):u=n[4];let d;n[5]!==e||n[6]!==u?(d=[Yn.CHILD_ORGANIZATION_UNITS,e,u],n[5]=e,n[6]=u,n[7]=d):d=n[7];let f;n[8]!==i||n[9]!==r||n[10]!==c||n[11]!==l||n[12]!==e?(f=async()=>qn(r,i(),e,{limit:c,offset:l}),n[8]=i,n[9]=r,n[10]=c,n[11]=l,n[12]=e,n[13]=f):f=n[13];let p=!!e,m;return n[14]!==d||n[15]!==f||n[16]!==p?(m={queryKey:d,queryFn:f,enabled:p},n[14]=d,n[15]=f,n[16]=p,n[17]=m):m=n[17],x(m)}function Zn(e,t){let n=(0,Z.c)(10),r=t===void 0?!0:t,{http:i}=_(),{getServerUrl:a}=W(),o;n[0]===e?o=n[1]:(o=[Yn.ORGANIZATION_UNIT,e],n[0]=e,n[1]=o);let s;n[2]!==a||n[3]!==i||n[4]!==e?(s=async()=>{let t=a();return(await i.request({url:`${t}/organization-units/${encodeURIComponent(e)}`,method:`GET`,headers:{"Content-Type":`application/json`}})).data},n[2]=a,n[3]=i,n[4]=e,n[5]=s):s=n[5];let c=r&&!!e,l;return n[6]!==o||n[7]!==s||n[8]!==c?(l={queryKey:o,queryFn:s,enabled:c},n[6]=o,n[7]=s,n[8]=c,n[9]=l):l=n[9],x(l)}function Qn(e,t){let n=(0,Z.c)(14),r=t===void 0?!0:t,{http:i}=_(),{getServerUrl:a}=W(),o;n[0]===e?o=n[1]:(o=e??{},n[0]=e,n[1]=o);let{limit:s,offset:c}=o,l=s===void 0?30:s,u=c===void 0?0:c,d;n[2]!==l||n[3]!==u?(d=[Yn.ORGANIZATION_UNITS,{limit:l,offset:u}],n[2]=l,n[3]=u,n[4]=d):d=n[4];let f;n[5]!==a||n[6]!==i||n[7]!==l||n[8]!==u?(f=async()=>Jn(i,a(),{limit:l,offset:u}),n[5]=a,n[6]=i,n[7]=l,n[8]=u,n[9]=f):f=n[9];let p;return n[10]!==r||n[11]!==d||n[12]!==f?(p={queryKey:d,queryFn:f,enabled:r},n[10]=r,n[11]=d,n[12]=f,n[13]=p):p=n[13],x(p)}var Q={PLACEHOLDER_SUFFIX:`__placeholder`,EMPTY_SUFFIX:`__empty`,ERROR_SUFFIX:`__error`,ADD_CHILD_SUFFIX:`__addChild`,LOAD_MORE_SUFFIX:`__loadMore`,ROOT_PARENT_ID:`__root`,ROOT_LOAD_MORE_ID:`__root__loadMore`,PAGE_SIZE:30};function $n(e,t,n){return e.map(e=>{if(e.id===t){let t=(e.children??[]).filter(e=>!e.id.endsWith(Q.LOAD_MORE_SUFFIX));return{...e,children:[...t,...n]}}return e.children&&e.children.length>0?{...e,children:$n(e.children,t,n)}:e})}function er(e){let t=new Map,n=e=>{e.forEach(e=>{t.set(e.id,e),e.children&&n(e.children)})};return n(e),t}function tr(e){return e.map(e=>({id:e.id,label:e.name,handle:e.handle,description:e.description,logoUrl:e.logoUrl,isReadOnly:e.isReadOnly,children:[{id:`${e.id}${Q.PLACEHOLDER_SUFFIX}`,label:``,handle:``,isPlaceholder:!0}]}))}function nr(e,t,n){return e.map(e=>e.id===t?{...e,children:n}:e.children&&e.children.length>0?{...e,children:nr(e.children,t,n)}:e)}function rr(){return(0,Y.jsx)(O,{size:16})}function ir(e){let{itemMap:t,loadingItems:n,loadMoreLoadingItems:r,onLoadMore:i,itemId:a,label:o,...s}=e,c={itemId:a,label:o,...s},l=ae(),{t:u}=G(),d=typeof o==`string`?o:``,f=t?.get(a),p=a.endsWith(Q.LOAD_MORE_SUFFIX),m=a.endsWith(Q.EMPTY_SUFFIX),h=!m&&!p&&(f?.isPlaceholder??a.endsWith(Q.PLACEHOLDER_SUFFIX)),g=n?.has(a);if(p){let e=a.replace(Q.LOAD_MORE_SUFFIX,``),t=r?.has(e);return(0,Y.jsx)(De,{...c,sx:{"& > .MuiTreeItem-content":{border:`1px dashed`,borderColor:l.vars?.palette.divider,borderRadius:.5,backgroundColor:`transparent !important`,cursor:t?`default`:`pointer`,transition:`all 0.15s ease-in-out`,"&:hover":{borderColor:t?void 0:l.vars?.palette.primary.main}}},label:(0,Y.jsx)(P,{role:`button`,tabIndex:0,onClick:n=>{n.stopPropagation(),t||i?.(e)},onKeyDown:n=>{(n.key===`Enter`||n.key===` `)&&!t&&(n.preventDefault(),n.stopPropagation(),i?.(e))},sx:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:1,py:.25},children:t?(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(O,{size:14}),(0,Y.jsx)(V,{variant:`caption`,color:`text.secondary`,children:u(`common:status.loading`)})]}):(0,Y.jsx)(V,{variant:`caption`,color:`primary`,sx:{fontWeight:500},children:u(`organizationUnits:listing.treeView.loadMore`)})})})}return m?(0,Y.jsx)(De,{...c,sx:{"& > .MuiTreeItem-content":{border:`none !important`,backgroundColor:`transparent !important`}},label:(0,Y.jsx)(V,{variant:`caption`,color:`text.secondary`,sx:{fontStyle:`italic`,pl:1},children:d})}):h?(0,Y.jsx)(De,{...c,sx:{"& > .MuiTreeItem-content":{border:`none !important`,backgroundColor:`transparent !important`}},label:(0,Y.jsxs)(P,{sx:{display:`flex`,alignItems:`center`,gap:1},children:[(0,Y.jsx)(O,{size:16}),(0,Y.jsx)(V,{variant:`caption`,color:`text.secondary`,sx:{fontStyle:`italic`},children:u(`common:status.loading`)})]})}):(0,Y.jsx)(De,{...c,...g?{slots:{collapseIcon:rr,expandIcon:rr}}:{},label:(0,Y.jsxs)(P,{sx:{display:`flex`,alignItems:`center`,gap:1.5},children:[(0,Y.jsx)(Ke,{value:f?.logoUrl,size:30,fallback:`emoji:🏛️`}),(0,Y.jsxs)(P,{sx:{flexGrow:1,minWidth:0},children:[(0,Y.jsx)(V,{variant:`body2`,sx:{fontWeight:500,lineHeight:1.3},children:d}),f?.handle&&(0,Y.jsx)(V,{variant:`caption`,color:`text.secondary`,sx:{lineHeight:1.2,display:`block`},children:f.handle})]})]})})}function ar({id:e=void 0,value:t,onChange:n,error:i=!1,helperText:a=``,rootOuId:o=void 0,maxHeight:s=300}){let c=ae(),{t:l}=G(),u=Ne(`OrganizationUnitTreePicker`),{http:d}=_(),{getServerUrl:f}=W(),p=r(),{data:m,isLoading:h}=Qn(void 0,!o),{data:g,isLoading:v,error:y}=Zn(o),{data:b,isLoading:x,error:S}=Xn(o),[C,w]=(0,J.useState)([]),[T,E]=(0,J.useState)([]),[D,O]=(0,J.useState)(new Set),[k,A]=(0,J.useState)(new Set),[j,M]=(0,J.useState)(new Set),[N,ee]=(0,J.useState)(new Map),[te,ne]=(0,J.useState)(0),[F,I]=(0,J.useState)(!1),re=(0,J.useRef)(!1);re.current=F;let L=(0,J.useRef)(k);L.current=k;let R=(0,J.useMemo)(()=>er(C),[C]);(0,J.useEffect)(()=>{w([]),E([]),O(new Set),A(new Set),M(new Set),ee(new Map),ne(0),I(!1)},[o]),(0,J.useEffect)(()=>{if(!o&&m?.organizationUnits&&m.organizationUnits.length>0&&C.length===0){let e=tr(m.organizationUnits);m.organizationUnits.length<m.totalResults&&e.push({id:Q.ROOT_LOAD_MORE_ID,label:``,handle:``,isPlaceholder:!0}),ne(m.organizationUnits.length),w(e)}},[o,m,C.length]),(0,J.useEffect)(()=>{if(!o||!g||!b||C.length>0)return;let e=tr(b.organizationUnits);b.organizationUnits.length<b.totalResults&&e.push({id:`${o}${Q.LOAD_MORE_SUFFIX}`,label:``,handle:``,isPlaceholder:!0});let t=b.organizationUnits.length>0?e:[{id:`${o}${Q.EMPTY_SUFFIX}`,label:l(`organizationUnits:listing.treeView.noChildren`),handle:``,isPlaceholder:!0}],n={id:g.id,label:g.name,handle:g.handle,description:g.description??void 0,logoUrl:g.logoUrl,children:t};ee(e=>new Map(e).set(o,b.organizationUnits.length)),O(e=>new Set(e).add(o)),E([o]),w([n])},[o,g,b,C.length,l]);let ie=(0,J.useCallback)(async(e,t)=>p.fetchQuery({queryKey:[Yn.CHILD_ORGANIZATION_UNITS,e,{limit:Q.PAGE_SIZE,offset:t}],queryFn:async()=>qn(d,f(),e,{limit:Q.PAGE_SIZE,offset:t}),staleTime:0}),[f,p,d]),z=(0,J.useCallback)((e,t,n)=>{let r=t.organizationUnits;if(r.length===0&&n===0)return[{id:`${e}${Q.EMPTY_SUFFIX}`,label:l(`organizationUnits:listing.treeView.noChildren`),handle:``,isPlaceholder:!0}];let i=tr(r);return n+r.length<t.totalResults&&i.push({id:`${e}${Q.LOAD_MORE_SUFFIX}`,label:``,handle:``,isPlaceholder:!0}),i},[l]),B=(0,J.useCallback)(async e=>{if(!L.current.has(e)){A(t=>new Set(t).add(e));try{let t=await ie(e,0),n=z(e,t,0);ee(n=>new Map(n).set(e,t.organizationUnits.length)),w(t=>nr(t,e,n)),O(t=>new Set(t).add(e)),E(t=>t.includes(e)?t:[...t,e])}catch(t){u.error(`Failed to load child organization units`,{error:t,parentId:e})}finally{A(t=>{let n=new Set(t);return n.delete(e),n})}}},[ie,z,u]),oe=(0,J.useCallback)(async()=>{if(!re.current){I(!0);try{let e=await p.fetchQuery({queryKey:[Yn.ORGANIZATION_UNITS,{limit:Q.PAGE_SIZE,offset:te}],queryFn:async()=>Jn(d,f(),{limit:Q.PAGE_SIZE,offset:te}),staleTime:0}),t=tr(e.organizationUnits),n=te+e.organizationUnits.length;n<e.totalResults&&t.push({id:Q.ROOT_LOAD_MORE_ID,label:``,handle:``,isPlaceholder:!0}),ne(n),w(e=>[...e.filter(e=>e.id!==Q.ROOT_LOAD_MORE_ID),...t])}catch(e){u.error(`Failed to load more root organization units`,{error:e})}finally{I(!1)}}},[te,f,p,d,u]),se=(0,J.useCallback)(async e=>{if(e===Q.ROOT_PARENT_ID){await oe();return}M(t=>new Set(t).add(e));try{let t=N.get(e)??Q.PAGE_SIZE,n=await ie(e,t),r=z(e,n,t);ee(r=>new Map(r).set(e,t+n.organizationUnits.length)),w(t=>$n(t,e,r))}catch(t){u.error(`Failed to load more child organization units`,{error:t,parentId:e})}finally{M(t=>{let n=new Set(t);return n.delete(e),n})}},[N,ie,z,u,oe]),H=(0,J.useMemo)(()=>{if(!F)return j;let e=new Set(j);return e.add(Q.ROOT_PARENT_ID),e},[j,F]),ce=(0,J.useCallback)((e,t,n)=>{!n||D.has(t)||k.has(t)||B(t).catch(e=>{u.error(`Failed to load child organization units`,{error:e,parentId:t})})},[D,k,B,u]),le=(0,J.useCallback)((e,t)=>{t&&!t.endsWith(Q.PLACEHOLDER_SUFFIX)&&!t.endsWith(Q.EMPTY_SUFFIX)&&!t.endsWith(Q.LOAD_MORE_SUFFIX)&&n(t)},[n]),ue=(0,J.useCallback)((e,t)=>{let n=new Set(T);E(t.filter(e=>n.has(e)||D.has(e)))},[T,D]),de=(0,J.useCallback)(e=>{se(e).catch(t=>{u.error(`Failed to load more child organization units`,{error:t,parentId:e})})},[se,u]),U=o?v||x:h,fe=o?y??S:null;return U?(0,Y.jsx)(Pe,{}):fe?(0,Y.jsx)(V,{variant:`body2`,color:`error`,children:fe.message??l(`organizationUnits:treePicker.error`)}):!o&&m?.organizationUnits.length===0?(0,Y.jsx)(V,{variant:`body2`,color:`text.secondary`,children:l(`organizationUnits:treePicker.empty`)}):(0,Y.jsxs)(P,{children:[(0,Y.jsx)(P,{sx:{maxHeight:s,overflow:`auto`},children:(0,Y.jsx)(ke,{id:e,items:C,expandedItems:T,onExpandedItemsChange:ue,onItemExpansionToggle:ce,selectedItems:t||null,onSelectedItemsChange:le,slots:{item:ir},slotProps:{item:{itemMap:R,loadingItems:k,loadMoreLoadingItems:H,onLoadMore:de}},getItemLabel:e=>e.label,sx:{"& .MuiTreeItem-content":{cursor:`pointer`,border:`1px solid`,borderColor:c.vars?.palette.divider,borderRadius:.5,py:.75,px:1,mb:.5,transition:`all 0.15s ease-in-out`,"&:hover":{backgroundColor:c.vars?.palette.action.hover,borderColor:c.vars?.palette.primary.main}},"& .Mui-selected > .MuiTreeItem-content":{backgroundColor:`${c.vars?.palette.primary.main}14`,borderColor:c.vars?.palette.primary.main},"& .MuiTreeItem-iconContainer":{color:c.vars?.palette.text.secondary,mr:.5},"& .MuiTreeItem-groupTransition":{ml:2,pl:2,borderLeft:`1px dashed`,borderColor:c.vars?.palette.divider}}})}),a&&(0,Y.jsx)(V,{variant:`caption`,color:i?`error`:`text.secondary`,sx:{mt:.5,ml:1.75},children:a})]})}function or({rootOuId:e,selectedOuId:t,onOuIdChange:n,onReadyChange:r=void 0}){let{t:i}=G();return(0,J.useEffect)(()=>{t||n(e)},[t,e,n]),(0,J.useEffect)(()=>{r&&r(t.length>0)},[t,r]),(0,Y.jsxs)(U,{direction:`column`,spacing:4,"data-testid":`configure-organization-unit`,children:[(0,Y.jsx)(V,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.selectOrganizationUnit.title`)}),(0,Y.jsx)(V,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.selectOrganizationUnit.subtitle`)}),(0,Y.jsxs)(A,{fullWidth:!0,required:!0,children:[(0,Y.jsx)(H,{children:i(`users:createWizard.selectOrganizationUnit.fieldLabel`)}),(0,Y.jsx)(ar,{id:`user-create-ou-picker`,rootOuId:e,value:t,onChange:n,maxHeight:500})]})]})}var sr=(e,t,n,r,i)=>{let a=t.required??!1,o=e;if(t.displayName){let e=i?.(t.displayName);o=(e===``?void 0:e)??t.displayName}if(t.type===`string`){let i=t;if(i.enum&&i.enum.length>0){let t=i.enum;return(0,Y.jsxs)(A,{children:[(0,Y.jsxs)(H,{htmlFor:e,children:[o,a&&(0,Y.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,Y.jsx)(q,{name:e,control:n,rules:{required:a?`${o} is required`:!1},render:({field:n})=>(0,Y.jsxs)(ue,{...n,value:n.value??``,id:e,fullWidth:!0,required:a,error:!!r[e],displayEmpty:!0,children:[(0,Y.jsx)(B,{value:``,children:(0,Y.jsxs)(`em`,{children:[`Select `,o]})}),t.map(e=>(0,Y.jsx)(B,{value:e,children:e.charAt(0).toUpperCase()+e.slice(1)},e))]})}),r[e]&&(0,Y.jsx)(V,{variant:`caption`,color:`error`,sx:{mt:.5,ml:1.75},children:r[e]?.message})]},e)}let s;return i.regex&&(s={value:new RegExp(i.regex),message:`${o} format is invalid`}),(0,Y.jsxs)(A,{children:[(0,Y.jsxs)(H,{htmlFor:e,children:[o,a&&(0,Y.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,Y.jsx)(q,{name:e,control:n,rules:{required:a?`${o} is required`:!1,pattern:s},render:({field:t})=>i.credential?(0,Y.jsx)(Wn,{id:e,name:t.name,value:t.value??``,placeholder:`Enter ${o.toLowerCase()}`,required:a,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:t.onChange,onBlur:t.onBlur,inputRef:t.ref}):(0,Y.jsx)(R,{...t,value:t.value??``,id:e,type:`text`,placeholder:`Enter ${o.toLowerCase()}`,fullWidth:!0,required:a,variant:`outlined`,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`})})]},e)}if(t.type===`number`){let i=t;return(0,Y.jsxs)(A,{children:[(0,Y.jsxs)(H,{htmlFor:e,children:[o,a&&(0,Y.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,Y.jsx)(q,{name:e,control:n,rules:{required:a?`${o} is required`:!1},render:({field:t})=>i.credential?(0,Y.jsx)(Wn,{id:e,name:t.name,value:String(t.value??``),placeholder:`Enter ${o.toLowerCase()}`,required:a,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:e=>{let{value:n}=e.target,r=Number(n);t.onChange(n&&!Number.isNaN(r)?r:``)},onBlur:t.onBlur,inputRef:t.ref}):(0,Y.jsx)(R,{...t,value:t.value??``,id:e,type:`number`,placeholder:`Enter ${o.toLowerCase()}`,fullWidth:!0,required:a,variant:`outlined`,error:!!r[e],helperText:r[e]?.message,color:r[e]?`error`:`primary`,onChange:e=>{let{value:n}=e.target;t.onChange(n?Number(n):``)}})})]},e)}return t.type===`boolean`?(0,Y.jsx)(A,{children:(0,Y.jsx)(q,{name:e,control:n,render:({field:t})=>(0,Y.jsx)(P,{sx:{display:`flex`,alignItems:`center`,py:1},children:(0,Y.jsx)(ee,{control:(0,Y.jsx)(le,{id:e,name:t.name,checked:!!t.value,onChange:e=>t.onChange(e.target.checked),onBlur:t.onBlur,ref:t.ref}),required:a,label:o,sx:{mb:2}})})})},e):t.type===`array`?(0,Y.jsxs)(A,{fullWidth:!0,children:[(0,Y.jsxs)(H,{htmlFor:e,children:[o,a&&(0,Y.jsx)(`span`,{style:{color:`red`},children:` *`})]}),(0,Y.jsx)(q,{name:e,control:n,rules:{required:a?`${o} is required`:!1,validate:e=>a&&(!Array.isArray(e)||e.length===0)?`${o} must have at least one value`:!0},render:({field:t})=>(0,Y.jsxs)(P,{children:[(0,Y.jsx)(Hn,{value:Array.isArray(t.value)?t.value:[],onChange:t.onChange,fieldLabel:o}),r[e]&&(0,Y.jsx)(V,{variant:`caption`,color:`error`,sx:{mt:.5,ml:1.75},children:r[e]?.message})]})})]},e):null};function cr({schema:e,defaultValues:t,onFormValuesChange:n,onReadyChange:r=void 0}){let{t:i}=G(),{resolveDisplayName:a}=Ie({handlers:{t:i}}),{control:o,watch:s,formState:{errors:c,isValid:l}}=Ze({defaultValues:t,mode:`onChange`});return(0,J.useEffect)(()=>{let e=s(e=>{n(e)});return()=>e.unsubscribe()},[s,n]),(0,J.useEffect)(()=>{r&&r(l)},[l,r]),(0,Y.jsxs)(U,{direction:`column`,spacing:4,"data-testid":`configure-user-details`,children:[(0,Y.jsx)(V,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.userDetails.title`)}),(0,Y.jsx)(V,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.userDetails.subtitle`)}),(0,Y.jsx)(P,{sx:{display:`flex`,flexDirection:`column`,gap:2},children:e.schema&&Object.entries(e.schema).map(([e,t])=>sr(e,t,o,c,a))})]})}function lr({schemas:e,selectedSchema:t,onSchemaChange:n,onReadyChange:r=void 0}){let{t:i}=G();return(0,J.useEffect)(()=>{r&&r(t!==null)},[t,r]),(0,Y.jsxs)(U,{direction:`column`,spacing:4,"data-testid":`configure-user-type`,children:[(0,Y.jsx)(V,{variant:`h1`,gutterBottom:!0,children:i(`users:createWizard.selectUserType.title`)}),(0,Y.jsx)(V,{variant:`body1`,color:`text.secondary`,children:i(`users:createWizard.selectUserType.subtitle`)}),(0,Y.jsxs)(A,{fullWidth:!0,required:!0,children:[(0,Y.jsx)(H,{htmlFor:`user-type-select`,children:i(`users:createWizard.selectUserType.fieldLabel`)}),(0,Y.jsxs)(ue,{id:`user-type-select`,value:t?.id??``,onChange:t=>{n(e.find(e=>e.id===t.target.value)??null)},displayEmpty:!0,"data-testid":`user-type-select`,children:[(0,Y.jsx)(B,{value:``,disabled:!0,children:(0,Y.jsx)(`em`,{children:i(`users:createWizard.selectUserType.placeholder`)})}),e.map(e=>(0,Y.jsx)(B,{value:e.id,children:e.name},e.id))]})]})]})}function ur(e){let t=(0,Z.c)(8),{user:n,copiedField:r,onCopyToClipboard:i}=e,{t:a}=G(),o;if(t[0]!==r||t[1]!==i||t[2]!==a||t[3]!==n.id){let e;t[5]!==i||t[6]!==n.id?(e=()=>{i(n.id,`userId`).catch(dr)},t[5]=i,t[6]=n.id,t[7]=e):e=t[7],o=(0,Y.jsx)(Oe,{title:a(`users:manageUser.sections.quickCopy.title`,`Quick Copy`),description:a(`users:manageUser.sections.quickCopy.description`,`Copy user identifiers for use in your application.`),children:(0,Y.jsx)(U,{spacing:3,children:(0,Y.jsxs)(A,{fullWidth:!0,children:[(0,Y.jsx)(H,{htmlFor:`user-id-input`,children:a(`users:manageUser.sections.quickCopy.userId`,`User ID`)}),(0,Y.jsx)(R,{fullWidth:!0,id:`user-id-input`,value:n.id,InputProps:{readOnly:!0,endAdornment:(0,Y.jsx)(M,{position:`end`,children:(0,Y.jsx)(I,{title:r===`userId`?a(`common:actions.copied`,`Copied`):a(`users:manageUser.sections.quickCopy.copyUserId`,`Copy User ID`),children:(0,Y.jsx)(z,{"aria-label":r===`userId`?a(`common:actions.copied`,`Copied`):a(`users:manageUser.sections.quickCopy.copyUserId`,`Copy User ID`),onClick:e,edge:`end`,children:r===`userId`?(0,Y.jsx)(_e,{size:16}):(0,Y.jsx)(ye,{size:16})})})})},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]})})}),t[0]=r,t[1]=i,t[2]=a,t[3]=n.id,t[4]=o}else o=t[4];return o}function dr(){return null}var fr=(0,J.createContext)(void 0),$={USER_TYPE:`USER_TYPE`,ORGANIZATION_UNIT:`ORGANIZATION_UNIT`,USER_DETAILS:`USER_DETAILS`},pr={currentStep:$.USER_TYPE,selectedSchema:null,selectedOuId:null,formValues:{},error:null};function mr({children:e}){let[t,n]=(0,J.useState)(pr.currentStep),[r,i]=(0,J.useState)(pr.selectedSchema),[a,o]=(0,J.useState)(pr.selectedOuId),[s,c]=(0,J.useState)(pr.formValues),[l,u]=(0,J.useState)(pr.error),d=(0,J.useCallback)(()=>{n(pr.currentStep),i(pr.selectedSchema),o(pr.selectedOuId),c(pr.formValues),u(pr.error)},[]),f=(0,J.useMemo)(()=>({currentStep:t,setCurrentStep:n,selectedSchema:r,setSelectedSchema:i,selectedOuId:a,setSelectedOuId:o,formValues:s,setFormValues:c,error:l,setError:u,reset:d}),[t,r,a,s,l,d]);return(0,Y.jsx)(fr.Provider,{value:f,children:e})}function hr(){let e=(0,J.useContext)(fr);if(!e)throw Error(`useUserCreate must be used within a UserCreateProvider`);return e}function gr(){let{t:e}=G(),t=qe(),n=Ne(`UserCreatePage`),r=An(),{currentStep:i,setCurrentStep:a,selectedSchema:o,setSelectedSchema:s,selectedOuId:c,setSelectedOuId:l,formValues:u,setFormValues:d,error:f,setError:p}=hr(),{data:m}=Ln(),{data:h,isLoading:g}=In(o?.id),{data:v,isLoading:y,error:b}=Xn(o?.ouId,{limit:1,offset:0}),x=_().user?.ouId??null,S=b?.response?.status===403,C=!!b&&!S,w=(0,J.useMemo)(()=>m?.types??[],[m]),T=!y&&!b&&(v?.totalResults??0)>0,D=(0,J.useMemo)(()=>{let e=[$.USER_TYPE];return T&&e.push($.ORGANIZATION_UNIT),e.push($.USER_DETAILS),e},[T]),O=(0,J.useMemo)(()=>{let t={USER_TYPE:{label:e(`users:createWizard.steps.userType`)}};return T&&(t.ORGANIZATION_UNIT={label:e(`users:createWizard.steps.organizationUnit`)}),t.USER_DETAILS={label:e(`users:createWizard.steps.userDetails`)},t},[e,T]),[k,A]=(0,J.useState)(null),[j,M]=(0,J.useState)(!1),[ee,te]=(0,J.useState)({USER_TYPE:!1,ORGANIZATION_UNIT:!1,USER_DETAILS:!1}),ne=()=>{r.isPending||Promise.resolve(t(`/users`)).catch(e=>{n.error(`Failed to navigate to users page`,{error:e})})},F=(0,J.useCallback)((e,t)=>{te(n=>({...n,[e]:t}))},[]),I=(0,J.useCallback)(e=>{F($.USER_TYPE,e)},[F]),R=(0,J.useCallback)(e=>{F($.ORGANIZATION_UNIT,e)},[F]),ie=(0,J.useCallback)(e=>{F($.USER_DETAILS,e)},[F]),B=(0,J.useCallback)(e=>{e?.id!==o?.id&&(d({}),l(null),te(e=>({...e,ORGANIZATION_UNIT:!1,USER_DETAILS:!1}))),s(e)},[o,s,l,d]),ae=async()=>{if(A(null),p(null),!o){A(e(`users:createWizard.validationErrors.userTypeRequired`)),M(!0);return}let i=(c??o.ouId)?.trim();if(!i){A(e(`users:createWizard.validationErrors.ouIdMissing`)),M(!0);return}let a=Object.fromEntries(Object.entries(u).filter(([,e])=>e!==``&&e!=null)),s={ouId:i,type:o.name,attributes:a};try{await r.mutateAsync(s),await t(`/users`)}catch(e){n.error(`Failed to create user or navigate`,{error:e})}},oe=()=>{switch(i){case $.USER_TYPE:if(o?.ouId&&y)return;if(C){p(e(`users:createWizard.errors.childOuProbeFailed`));return}T?a($.ORGANIZATION_UNIT):S?x?(l(x),a($.USER_DETAILS)):p(e(`users:createWizard.errors.noOuAccess`)):(l(o?.ouId??null),a($.USER_DETAILS));break;case $.ORGANIZATION_UNIT:a($.USER_DETAILS);break;case $.USER_DETAILS:ae().catch(()=>{});break;default:break}},se=()=>{switch(i){case $.ORGANIZATION_UNIT:a($.USER_TYPE);break;case $.USER_DETAILS:a(T?$.ORGANIZATION_UNIT:$.USER_TYPE);break;default:break}},H=()=>{switch(i){case $.USER_TYPE:return(0,Y.jsx)(lr,{schemas:w,selectedSchema:o,onSchemaChange:B,onReadyChange:I});case $.ORGANIZATION_UNIT:return o?.ouId?(0,Y.jsx)(or,{rootOuId:o.ouId,selectedOuId:c??``,onOuIdChange:l,onReadyChange:R},o.ouId):(a($.USER_TYPE),null);case $.USER_DETAILS:return g?(0,Y.jsx)(P,{sx:{textAlign:`center`,py:4},children:(0,Y.jsx)(V,{variant:`body2`,color:`text.secondary`,children:e(`common:status.loading`)})}):h?(0,Y.jsx)(cr,{schema:h,defaultValues:u,onFormValuesChange:d,onReadyChange:ie},o?.id):null;default:return null}},ce=()=>(D.indexOf(i)+1)/D.length*100,le=()=>{let e=D.indexOf(i);return D.slice(0,e+1)},ue=()=>{M(!1)},fe=i===D[D.length-1];return(0,Y.jsxs)(P,{sx:{minHeight:`100vh`,display:`flex`,flexDirection:`column`},children:[(0,Y.jsx)(N,{variant:`determinate`,value:ce(),sx:{height:6}}),(0,Y.jsxs)(P,{sx:{flex:1,display:`flex`,flexDirection:`column`},children:[(0,Y.jsx)(P,{sx:{p:4,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:(0,Y.jsxs)(U,{direction:`row`,alignItems:`center`,spacing:2,children:[(0,Y.jsx)(z,{"aria-label":e(`common:actions.close`),onClick:ne,sx:{bgcolor:`background.paper`,"&:hover":{bgcolor:`action.hover`},boxShadow:1},children:(0,Y.jsx)(Te,{size:24})}),(0,Y.jsx)(re,{separator:(0,Y.jsx)(he,{size:16}),"aria-label":`breadcrumb`,children:le().map((e,t,n)=>t===n.length-1?(0,Y.jsx)(V,{variant:`h5`,color:`text.primary`,children:O[e]?.label},e):(0,Y.jsx)(V,{variant:`h5`,color:`inherit`,role:`button`,tabIndex:0,onClick:()=>a(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),a(e))},sx:{cursor:`pointer`,"&:hover":{textDecoration:`underline`}},children:O[e]?.label},e))})]})}),(0,Y.jsx)(P,{sx:{flex:1,display:`flex`,minHeight:0},children:(0,Y.jsx)(P,{sx:{flex:1,display:`flex`,flexDirection:`column`,py:8,px:20,mx:i===$.USER_DETAILS?0:`auto`,alignItems:`flex-start`},children:(0,Y.jsxs)(P,{sx:{width:`100%`,maxWidth:800,display:`flex`,flexDirection:`column`},children:[f&&(0,Y.jsx)(E,{severity:`error`,sx:{my:3},onClose:()=>p(null),children:f}),r.error&&(0,Y.jsx)(E,{severity:`error`,sx:{mb:3},children:(0,Y.jsx)(V,{variant:`body2`,sx:{fontWeight:`bold`,mb:.5},children:r.error.message})}),H(),(0,Y.jsxs)(U,{direction:`row`,justifyContent:`flex-end`,alignItems:`center`,spacing:2,sx:{mt:4},children:[i!==$.USER_TYPE&&(0,Y.jsx)(L,{variant:`text`,onClick:se,disabled:r.isPending,children:e(`common:actions.back`)}),(0,Y.jsx)(L,{variant:`contained`,disabled:!ee[i]||r.isPending||i===$.USER_TYPE&&!!o?.ouId&&y,sx:{minWidth:140},onClick:oe,children:fe?r.isPending?e(`common:status.saving`):e(`users:createUser.title`):e(`common:actions.continue`)})]})]})})})]}),(0,Y.jsx)(de,{open:j,autoHideDuration:6e3,onClose:ue,anchorOrigin:{vertical:`top`,horizontal:`right`},children:(0,Y.jsx)(E,{onClose:ue,severity:`error`,sx:{width:`100%`},children:k})})]})}function _r({children:e=null,value:t,index:n,...r}){return(0,Y.jsx)(`div`,{role:`tabpanel`,hidden:t!==n,id:`user-tabpanel-${n}`,"aria-labelledby":`user-tab-${n}`,...r,children:t===n&&(0,Y.jsx)(P,{sx:{py:3},children:e})})}function vr(){let e=qe(),{t}=G(),n=Ne(`UserEditPage`),{resolveDisplayName:r}=Ie({handlers:{t}}),{userId:i}=Je(),[a,o]=(0,J.useState)(0),[s,c]=(0,J.useState)(!1),[l,u]=(0,J.useState)(!1),[d,f]=(0,J.useState)(!1),[p,m]=(0,J.useState)(null),h=(0,J.useRef)(null),{data:g,isLoading:_,error:v}=Pn(i),y=Rn(),{data:b}=Ln(),x=(0,J.useMemo)(()=>{if(!(!g?.type||!b?.types))return b.types.find(e=>e.name===g.type)},[g?.type,b?.types]),S=x?.id,C=x?.ouId?.trim(),w=C===``?void 0:C,{data:T,isLoading:O,error:k}=In(S),j=(0,J.useMemo)(()=>T?.schema?Object.entries(T.schema).some(([,e])=>!((e.type===`string`||e.type===`number`)&&e.credential)):!1,[T]),N=g?.display??g?.id??``,{control:ee,handleSubmit:F,setValue:re,formState:{errors:ie}}=Ze({defaultValues:{}});(0,J.useEffect)(()=>{g?.attributes&&T?.schema&&Object.entries(g.attributes).forEach(([e,t])=>{re(e,t)})},[g,T,re]),(0,J.useEffect)(()=>()=>{h.current&&clearTimeout(h.current)},[]);let B=(0,J.useCallback)(async(e,t)=>{await navigator.clipboard.writeText(e),m(t),h.current&&clearTimeout(h.current),h.current=setTimeout(()=>{m(null)},2e3)},[]),ae=(e,t)=>{o(t)},oe=async e=>{let t=w??g?.ouId;if(!(!i||!t||!g?.type))try{u(!0);let n={ouId:t,type:g.type,attributes:e};await y.mutateAsync({userId:i,data:n}),c(!1)}catch(e){n.error(`Failed to update user`,{error:e})}finally{u(!1)}},se=()=>{c(!1),y.reset(),g?.attributes&&T?.schema&&Object.entries(g.attributes).forEach(([e,t])=>{re(e,t)})},ce=async()=>{await e(`/users`)},le=()=>{(async()=>{await e(`/users`)})().catch(e=>{n.error(`Failed to navigate after deleting user`,{error:e})})};if(_||O)return(0,Y.jsx)(Pe,{});if(v??k)return(0,Y.jsxs)(Ce,{children:[(0,Y.jsx)(E,{severity:`error`,sx:{mb:2},children:v?.message??k?.message??`Failed to load user information`}),(0,Y.jsx)(L,{onClick:()=>{ce().catch(()=>null)},startIcon:(0,Y.jsx)(pe,{size:16}),children:t(`users:manageUser.back`)})]});if(!g)return(0,Y.jsxs)(Ce,{children:[(0,Y.jsx)(E,{severity:`warning`,sx:{mb:2},children:t(`users:manageUser.notFound`,`User not found`)}),(0,Y.jsx)(L,{onClick:()=>{ce().catch(()=>null)},startIcon:(0,Y.jsx)(pe,{size:16}),children:t(`users:manageUser.back`)})]});let ue=g.attributes?.picture;return(0,Y.jsxs)(Ce,{children:[g.isReadOnly&&(0,Y.jsx)(E,{severity:`info`,sx:{mb:2},children:t(`common:messages.readOnlyResource`,`This resource is read-only and cannot be modified.`)}),(0,Y.jsxs)(Se,{children:[(0,Y.jsx)(Se.BackButton,{component:(0,Y.jsx)(Ye,{to:`/users`}),children:t(`users:manageUser.back`,`Back to Users`)}),(0,Y.jsx)(Se.Avatar,{children:(0,Y.jsx)(Ke,{value:ue,fallback:Ae(N),size:55})}),(0,Y.jsx)(Se.Header,{children:(0,Y.jsx)(V,{variant:`h3`,children:N})}),(0,Y.jsx)(Se.SubHeader,{children:(0,Y.jsx)(U,{direction:`row`,alignItems:`center`,spacing:1,children:(0,Y.jsx)(D,{label:g.type,size:`small`,sx:{px:.5}})})})]}),(0,Y.jsx)(ne,{value:a,onChange:ae,"aria-label":`user settings tabs`,children:(0,Y.jsx)(te,{label:t(`users:manageUser.tabs.general`,`General`),id:`user-tab-0`,"aria-controls":`user-tabpanel-0`,sx:{textTransform:`none`}})}),(0,Y.jsx)(Y.Fragment,{children:(0,Y.jsx)(_r,{value:a,index:0,children:(0,Y.jsxs)(U,{spacing:3,children:[(0,Y.jsx)(ur,{user:g,copiedField:p,onCopyToClipboard:B}),(0,Y.jsx)(Oe,{title:t(`users:manageUser.sections.attributes.title`,`User Attributes`),description:t(`users:manageUser.sections.attributes.description`,`View and manage user attribute values.`),headerAction:!s&&j&&!g.isReadOnly?(0,Y.jsx)(L,{variant:`outlined`,size:`small`,onClick:()=>c(!0),children:t(`common:actions.edit`,`Edit`)}):void 0,children:s?(0,Y.jsxs)(P,{component:`form`,onSubmit:e=>{F(oe)(e).catch(()=>null)},noValidate:!0,sx:{display:`flex`,flexDirection:`column`,gap:2},children:[T?.schema?Object.entries(T.schema).filter(([,e])=>!((e.type===`string`||e.type===`number`)&&e.credential)).map(([e,t])=>sr(e,t,ee,ie,r)):(0,Y.jsx)(V,{variant:`body2`,color:`text.secondary`,children:t(`users:manageUser.sections.attributes.noSchema`,`No schema available for editing`)}),y.error&&(0,Y.jsx)(E,{severity:`error`,sx:{mt:2},children:(0,Y.jsx)(V,{variant:`body2`,sx:{fontWeight:`bold`,mb:.5},children:y.error.message})}),(0,Y.jsxs)(U,{direction:`row`,spacing:2,justifyContent:`flex-end`,sx:{mt:2},children:[(0,Y.jsx)(L,{variant:`outlined`,onClick:se,disabled:l,startIcon:(0,Y.jsx)(Te,{size:16}),children:t(`common:actions.cancel`,`Cancel`)}),(0,Y.jsx)(L,{type:`submit`,variant:`contained`,startIcon:l?null:(0,Y.jsx)(me,{size:16}),disabled:l,children:l?t(`common:status.saving`,`Saving...`):t(`common:actions.save`,`Save Changes`)})]})]}):(0,Y.jsx)(U,{spacing:2,children:g.attributes&&Object.keys(g.attributes).length>0?Object.entries(g.attributes).map(([e,n])=>{let i;i=n==null?`-`:typeof n==`boolean`?t(n?`common:actions.yes`:`common:actions.no`):Array.isArray(n)?n.join(`, `):typeof n==`object`?JSON.stringify(n):typeof n==`string`||typeof n==`number`?String(n):`-`;let a=T?.schema?.[e],o=e;return a?.displayName&&(o=r(a.displayName)||e),(0,Y.jsxs)(P,{children:[(0,Y.jsx)(V,{variant:`caption`,color:`text.secondary`,children:o}),(0,Y.jsx)(V,{variant:`body1`,children:i})]},e)}):(0,Y.jsx)(V,{variant:`body2`,color:`text.secondary`,children:t(`users:manageUser.sections.attributes.empty`,`No attributes available`)})})}),(0,Y.jsx)(Oe,{title:t(`users:manageUser.sections.organizationUnit.title`,`Organization Unit`),description:t(`users:manageUser.sections.organizationUnit.description`,`The organization unit this user belongs to.`),children:(0,Y.jsxs)(U,{spacing:2,children:[(0,Y.jsxs)(A,{fullWidth:!0,children:[(0,Y.jsx)(H,{htmlFor:`ou-handle-input`,children:t(`users:manageUser.sections.organizationUnit.handleLabel`,`Handle`)}),(0,Y.jsx)(R,{id:`ou-handle-input`,value:g.ouHandle??`-`,fullWidth:!0,size:`small`,slotProps:{input:{readOnly:!0,endAdornment:g.ouHandle?(0,Y.jsx)(M,{position:`end`,children:(0,Y.jsx)(I,{title:p===`ouHandle`?t(`common:actions.copied`):t(`users:manageUser.sections.organizationUnit.copyHandle`,`Copy Organization Unit Handle`),children:(0,Y.jsx)(z,{"aria-label":t(`users:manageUser.sections.organizationUnit.copyHandle`,`Copy Organization Unit Handle`),onClick:()=>{B(g.ouHandle,`ouHandle`).catch(()=>null)},edge:`end`,children:p===`ouHandle`?(0,Y.jsx)(_e,{size:16}):(0,Y.jsx)(ye,{size:16})})})}):void 0}},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]}),(0,Y.jsxs)(A,{fullWidth:!0,children:[(0,Y.jsx)(H,{htmlFor:`ou-id-input`,children:t(`users:manageUser.sections.organizationUnit.idLabel`,`ID`)}),(0,Y.jsx)(R,{id:`ou-id-input`,value:g.ouId,fullWidth:!0,size:`small`,slotProps:{input:{readOnly:!0,endAdornment:(0,Y.jsx)(M,{position:`end`,children:(0,Y.jsx)(I,{title:p===`ouId`?t(`common:actions.copied`):t(`users:manageUser.sections.organizationUnit.copyId`,`Copy Organization Unit ID`),children:(0,Y.jsx)(z,{"aria-label":t(`users:manageUser.sections.organizationUnit.copyId`,`Copy Organization Unit ID`),onClick:()=>{B(g.ouId,`ouId`).catch(()=>null)},edge:`end`,children:p===`ouId`?(0,Y.jsx)(_e,{size:16}):(0,Y.jsx)(ye,{size:16})})})})}},sx:{"& input":{fontFamily:`monospace`,fontSize:`0.875rem`}}})]})]})}),!g.isReadOnly&&(0,Y.jsxs)(Oe,{title:t(`users:manageUser.sections.dangerZone.title`,`Danger Zone`),description:t(`users:manageUser.sections.dangerZone.description`,`Irreversible and destructive actions.`),children:[(0,Y.jsx)(V,{variant:`h6`,gutterBottom:!0,color:`error`,children:t(`users:manageUser.sections.dangerZone.deleteUser`,`Delete User`)}),(0,Y.jsx)(V,{variant:`body2`,color:`text.secondary`,sx:{mb:3},children:t(`users:manageUser.sections.dangerZone.deleteUserDescription`,`Once deleted, this user cannot be recovered. All associated data will be permanently removed.`)}),(0,Y.jsx)(L,{variant:`contained`,color:`error`,onClick:()=>f(!0),children:t(`common:actions.delete`,`Delete`)})]})]})})}),(0,Y.jsx)(Gn,{open:d,userId:i??null,onClose:()=>f(!1),onSuccess:le})]})}function yr(e,t,n){let r=e.find(e=>(String(e.type)===String(v.Text)||e.type===`TEXT`)&&e.variant===`HEADING_1`&&typeof e.label==`string`);return r&&typeof r.label==`string`?n(t(r.label)??r.label):``}var br=`FLM-1003`;function xr(e){return e?.toLowerCase().includes(`flow not found`)??!1}function Sr(e){if(!e||typeof e!=`object`)return!1;let t=e,{response:n}=t,r=n?.data;return r?.code===br||t.code===br||t.error?.code===br||xr(r?.message)||xr(r?.description)||xr(t.message)||xr(t.error?.message?.defaultValue)||xr(t.error?.description?.defaultValue)}var Cr=e=>{if(typeof e==`string`)return e;if(typeof e==`object`&&e&&`value`in e){let{value:t}=e;return typeof t==`string`?t:JSON.stringify(t??e)}return JSON.stringify(e)};function wr(e){return e.some(e=>e.ref!=null||e.eventType!=null||Array.isArray(e.components)&&wr(e.components))}var Tr=e=>{if(typeof e==`string`)return e;if(typeof e==`object`&&e&&`label`in e){let{label:t}=e;return typeof t==`string`?t:JSON.stringify(t??e)}return JSON.stringify(e)};function Er({renderProps:e,flowError:t,handleClose:n,onResetLocalState:r}){let{additionalData:i,values:a,error:o,isLoading:s,components:c,handleInputChange:l,handleSubmit:u,resetFlow:f,isValid:p}=e,{resolveFlowTemplateLiterals:m}=_(),h=(0,J.useCallback)(e=>e?m(e):void 0,[m]),{t:g}=G(),[y,b]=(0,J.useState)(null),x=(0,J.useMemo)(()=>e=>{let t={},n=e=>{e.forEach(e=>{if((String(e.type)===String(v.Block)||e.type===`BLOCK`)&&e.components)n(e.components);else if((String(e.type)===String(v.TextInput)||e.type===`TEXT_INPUT`||e.type===`EMAIL_INPUT`||e.type===`PHONE_INPUT`||e.type===`PASSWORD_INPUT`||e.type===`SELECT`||e.type===`OU_SELECT`)&&e.ref){let n=Xe();e.type===`EMAIL_INPUT`?n=Xe().email(`Please enter a valid email address`):e.type===`PHONE_INPUT`?n=Xe().regex(/^\+?[0-9\s\-().]{7,20}$/,`Please enter a valid phone number`):e.type===`PASSWORD_INPUT`&&(n=Xe());let r=typeof e.label==`string`?e.label:e.ref;n=e.required?n.min(1,`${g(h(r)??r)??e.ref} is required`):n.optional(),t[e.ref]=n}})};return n(e),Qe(t)},[g,h]),S=(0,J.useMemo)(()=>c?.length?x(c):Qe({}),[c,x]),C=(e,t,n,r,a,o)=>{let{type:s,ref:c,label:l,placeholder:u,required:d,options:f,hint:p}=e;if(!c)return null;let m=typeof l==`string`?l:``,g=typeof u==`string`?u:``;return String(s)===String(v.TextInput)||s===`TEXT_INPUT`?(0,Y.jsxs)(A,{required:d,children:[(0,Y.jsx)(H,{htmlFor:c,children:h(m)??m}),(0,Y.jsx)(q,{name:c,control:n,rules:{required:d?`${h(m)??m} is required`:!1},render:({field:e})=>(0,Y.jsx)(R,{...e,fullWidth:!0,size:`small`,id:c,type:`text`,placeholder:h(g)??g,autoComplete:`off`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`EMAIL_INPUT`?(0,Y.jsxs)(A,{required:d,children:[(0,Y.jsx)(H,{htmlFor:c,children:h(m)??m}),(0,Y.jsx)(q,{name:c,control:n,rules:{required:d?`${h(m)??m} is required`:!1,pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:`Please enter a valid email address`}},render:({field:e})=>(0,Y.jsx)(R,{...e,fullWidth:!0,size:`small`,id:c,type:`email`,placeholder:h(g)??g,autoComplete:`email`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`PHONE_INPUT`?(0,Y.jsxs)(A,{required:d,children:[(0,Y.jsx)(H,{htmlFor:c,children:h(m)??m}),(0,Y.jsx)(q,{name:c,control:n,rules:{required:d?`${h(m)??m} is required`:!1},render:({field:e})=>(0,Y.jsx)(R,{...e,fullWidth:!0,size:`small`,id:c,type:`tel`,placeholder:h(g)??g,autoComplete:`tel`,required:d,variant:`outlined`,disabled:a,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,onChange:t=>{e.onChange(t),o(c,t.target.value)}})})]},e.id??t):s===`PASSWORD_INPUT`?(0,Y.jsxs)(A,{required:d,children:[(0,Y.jsx)(H,{htmlFor:c,children:h(m)??m}),(0,Y.jsx)(q,{name:c,control:n,rules:{required:d?`${h(m)??m} is required`:!1},render:({field:e})=>(0,Y.jsx)(Wn,{id:c,name:e.name,value:e.value??``,placeholder:h(g)??g,required:d??!1,error:!!r[c],helperText:r[c]?.message,color:r[c]?`error`:`primary`,ariaLabel:h(m)??m,onChange:t=>{e.onChange(t),o(c,t.target.value)},onBlur:e.onBlur,inputRef:e.ref})})]},e.id??t):s===`OU_SELECT`?(0,Y.jsxs)(A,{fullWidth:!0,required:d,children:[(0,Y.jsx)(H,{htmlFor:c,children:h(m)??m}),(0,Y.jsx)(q,{name:c,control:n,rules:{required:d?`${h(m)??m} is required`:!1},render:({field:e})=>(0,Y.jsx)(ar,{value:e.value??``,onChange:t=>{e.onChange(t),o(c,t)},rootOuId:i?.rootOuId})}),r[c]&&(0,Y.jsx)(V,{variant:`caption`,color:`error`,children:r[c]?.message})]},e.id??t):s===`SELECT`&&f?(0,Y.jsxs)(A,{fullWidth:!0,required:d,children:[(0,Y.jsx)(H,{htmlFor:c,children:h(m)??m}),(0,Y.jsx)(q,{name:c,control:n,rules:{required:d?`${h(m)??m} is required`:!1},render:({field:e})=>(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsxs)(ue,{...e,value:e.value??``,displayEmpty:!0,size:`small`,id:c,required:d,fullWidth:!0,disabled:a,error:!!r[c],onChange:t=>{e.onChange(t),o(c,String(t.target.value))},renderValue:e=>{if(!e||e===``)return(0,Y.jsx)(V,{sx:{color:`text.secondary`},children:h(g)??`Select an option`});let t=f.find(t=>Cr(t)===e);return t?Tr(t):String(e)},children:[(0,Y.jsx)(B,{value:``,disabled:!0,children:h(g)??`Select an option`}),f.map(e=>(0,Y.jsx)(B,{value:Cr(e),children:Tr(e)},Cr(e)))]}),r[c]&&(0,Y.jsx)(V,{variant:`caption`,color:`error.main`,sx:{mt:.5},children:r[c]?.message}),p&&(0,Y.jsx)(V,{variant:`caption`,color:`text.secondary`,children:p})]})})]},e.id??t):null},{control:w,formState:{errors:T,isValid:D},reset:j,setValue:M}=Ze({resolver:$e(S),mode:`onChange`,defaultValues:a??{}});if((0,J.useEffect)(()=>{!c?.length&&Object.keys(a??{}).length===0&&j({})},[c,a,j]),(0,J.useEffect)(()=>{let e=i?.rootOuId;if(!e||!c?.length)return;let t=e=>{for(let n of e){if(n.type===`OU_SELECT`&&n.ref)return n.ref;if(n.components){let e=t(n.components);if(e)return e}}return null},n=t(c);n&&!a?.[n]&&(M(n,e,{shouldValidate:!0}),l(n,e))},[i,c,a,M,l]),s&&!c?.length)return(0,Y.jsx)(Pe,{});if(o&&!c?.length)return(0,Y.jsxs)(P,{children:[(0,Y.jsxs)(E,{severity:`error`,sx:{mb:2},children:[(0,Y.jsx)(k,{children:g(`users:errors.failed.title`,`Error`)}),o.message??g(`users:errors.failed.description`,`An error occurred.`)]}),(0,Y.jsx)(P,{sx:{display:`flex`,justifyContent:`flex-end`},children:(0,Y.jsx)(L,{variant:`outlined`,onClick:n,children:g(`common:actions.close`,`Close`)})})]});if(!c?.length)return(0,Y.jsx)(Pe,{});let N=wr(c);return(0,Y.jsxs)(Y.Fragment,{children:[(t??o)&&(0,Y.jsxs)(E,{severity:`error`,sx:{mb:2},children:[(0,Y.jsx)(k,{children:g(`users:errors.failed.title`,`Error`)}),t??o?.message??g(`users:errors.failed.description`,`An error occurred.`)]}),(0,Y.jsx)(U,{direction:`column`,spacing:4,children:c.map((e,t)=>{if(String(e.type)===String(v.Text)||e.type===`TEXT`){let n=typeof e.variant==`string`?e.variant:void 0,r=typeof e.label==`string`?e.label:``,i=typeof e.align==`string`?e.align:void 0;return n===`HEADING_1`?(0,Y.jsx)(V,{variant:`h1`,gutterBottom:!0,textAlign:i,children:h(r)??r},e.id??t):(0,Y.jsx)(V,{variant:n===`HEADING_2`?`h2`:`body1`,color:`text.secondary`,textAlign:i,children:h(r)??r},e.id??t)}if(e.type===`COPYABLE_TEXT`)return(0,Y.jsx)(Ue,{component:e,resolve:h,additionalData:i},e.id??t);if(String(e.type)===String(v.Block)||e.type===`BLOCK`){let n=e.components??[],r=e=>(String(e.type)===String(v.Action)||e.type===`ACTION`)&&(String(e.eventType)===String(d.Submit)||e.eventType===`SUBMIT`),i=n.filter(r),o=n.flatMap(e=>e.type===`STACK`?(e.components??[]).filter(r):[]),c=i[0]??o[0];if(!c)return null;let f=s||!D||p!==void 0&&!p;return(0,Y.jsx)(P,{component:`form`,onSubmit:e=>{e.preventDefault(),f||u(c,a).catch(()=>void 0)},noValidate:!0,sx:{display:`flex`,flexDirection:`column`,width:`100%`,gap:2},children:n.map((e,t)=>{let n=C(e,t,w,T,s,l);if(n)return n;if(e.type===`STACK`){let n=(e.components??[]).filter(r);return(0,Y.jsx)(U,{direction:e.direction??`row`,spacing:2,justifyContent:e.justify??`center`,flexWrap:`wrap`,sx:{mt:2},children:n.map((e,t)=>{let n=e.id??String(t),r=typeof e.label==`string`?e.label:``,i=s&&y===n;return(0,Y.jsx)(L,{type:`button`,variant:e.variant===`PRIMARY`?`contained`:`outlined`,disabled:f,sx:{px:4,py:1.5},onClick:()=>{f||(b(n),u(e,a).catch(()=>void 0))},children:i?(0,Y.jsx)(O,{size:16,color:`inherit`}):h(r)??r},n)})},e.id??t)}if(!r(e))return null;let i=typeof e.label==`string`?e.label:``;return(0,Y.jsx)(U,{direction:`row`,spacing:2,justifyContent:`flex-end`,sx:{mt:4},children:(0,Y.jsx)(L,{type:`button`,variant:e.variant===`PRIMARY`?`contained`:`outlined`,disabled:f,sx:{minWidth:140},onClick:()=>{f||u(e,a).catch(()=>void 0)},children:s?(0,Y.jsx)(O,{size:20,color:`inherit`}):h(i)??i})},e.id??t)})},e.id??t)}return null})}),!N&&(0,Y.jsxs)(U,{direction:`row`,spacing:2,justifyContent:`center`,sx:{mt:4},children:[(0,Y.jsx)(L,{variant:`outlined`,onClick:n,children:g(`common:actions.close`,`Close`)}),(0,Y.jsx)(L,{variant:`contained`,onClick:()=>{f(),r()},children:g(`users:addAnother`,`Add Another User`)})]})]})}function Dr(e){let t=(0,Z.c)(25),{renderProps:n,flowError:r,handleClose:i,onStepLabelChange:a,onInviteComplete:o,onOuStepDetected:s,onResetLocalState:c}=e,{resolveFlowTemplateLiterals:l}=_(),u;t[0]===l?u=t[1]:(u=e=>e?l(e):void 0,t[0]=l,t[1]=u);let d=u,{t:f}=G(),p=n.components,m;t[2]!==p||t[3]!==d||t[4]!==f?(m=p?.length?yr(p,d,f):``,t[2]=p,t[3]=d,t[4]=f,t[5]=m):m=t[5];let h=m,g=!!p?.length&&!wr(p),v;t[6]===p?v=t[7]:(v=p?.some(Or)??!1,t[6]=p,t[7]=v);let y=v,b,x;t[8]!==y||t[9]!==s?(b=()=>{y&&s()},x=[y,s],t[8]=y,t[9]=s,t[10]=b,t[11]=x):(b=t[10],x=t[11]),(0,J.useEffect)(b,x);let S,C;t[12]!==h||t[13]!==a?(S=()=>{h&&a(h)},C=[h,a],t[12]=h,t[13]=a,t[14]=S,t[15]=C):(S=t[14],C=t[15]),(0,J.useEffect)(S,C);let w,T;t[16]!==g||t[17]!==o?(w=()=>{g&&o()},T=[g,o],t[16]=g,t[17]=o,t[18]=w,t[19]=T):(w=t[18],T=t[19]),(0,J.useEffect)(w,T);let E;return t[20]!==r||t[21]!==i||t[22]!==c||t[23]!==n?(E=(0,Y.jsx)(Er,{renderProps:n,flowError:r,handleClose:i,onResetLocalState:c}),t[20]=r,t[21]=i,t[22]=c,t[23]=n,t[24]=E):E=t[24],E}function Or(e){return e.type===`OU_SELECT`||e.components?.some(kr)}function kr(e){return e.type===`OU_SELECT`}function Ar(){let{t:e}=G(),t=qe(),n=Ne(`UserInvitePage`),[r,i]=(0,J.useState)(null),[a,o]=(0,J.useState)([]),s=(0,J.useRef)(``),[c,l]=(0,J.useState)(!1),u=(0,J.useCallback)(()=>{(async()=>{await t(`/users`)})().catch(e=>{n.error(`Failed to navigate to users page`,{error:e})})},[t,n]),d=(0,J.useCallback)(()=>{n.info(`Falling back to manual user creation because the onboarding flow is unavailable`),(async()=>{await t(`/users/create`)})().catch(e=>{n.error(`Failed to navigate to fallback user creation page`,{error:e})})},[t,n]),f=(0,J.useCallback)(e=>{e!==s.current&&(s.current=e,o(t=>{let n=t.indexOf(e);return n>=0?t.slice(0,n+1):[...t,e]}))},[o]),p=(0,J.useCallback)(()=>{s.current!==`complete`&&(s.current=`complete`,o(t=>[...t,e(`users:invite.steps.complete`,`Complete`)]))},[o,e]),m=(0,J.useCallback)(()=>{l(!0)},[]),h=(0,J.useCallback)(()=>{o([]),s.current=``,l(!1),i(null)},[]),g=c?5:4;return(0,Y.jsxs)(P,{sx:{minHeight:`100vh`,display:`flex`,flexDirection:`column`},children:[(0,Y.jsx)(N,{variant:`determinate`,value:Math.min(a.length/g*100,100),sx:{height:6}}),(0,Y.jsxs)(P,{sx:{flex:1,display:`flex`,flexDirection:`column`},children:[(0,Y.jsx)(P,{sx:{p:4,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:(0,Y.jsxs)(U,{direction:`row`,alignItems:`center`,spacing:2,children:[(0,Y.jsx)(z,{"aria-label":e(`common:actions.close`,`Close`),onClick:u,sx:{bgcolor:`background.paper`,"&:hover":{bgcolor:`action.hover`},boxShadow:1},children:(0,Y.jsx)(Te,{size:24})}),(0,Y.jsxs)(re,{separator:(0,Y.jsx)(he,{size:16}),"aria-label":`breadcrumb`,children:[a.map((e,t)=>(0,Y.jsx)(V,{variant:`h5`,color:t===a.length-1?`text.primary`:`inherit`,children:e},e)),a.length===0&&(0,Y.jsx)(V,{variant:`h5`,color:`text.primary`,children:e(`users:addUser`,`Add User`)})]})]})}),(0,Y.jsx)(P,{sx:{flex:1,display:`flex`,minHeight:0},children:(0,Y.jsx)(P,{sx:{flex:1,display:`flex`,flexDirection:`column`,py:8,px:20,mx:`auto`,alignItems:`center`},children:(0,Y.jsx)(P,{sx:{width:`100%`,maxWidth:800,flex:1,display:`flex`,flexDirection:`column`},children:(0,Y.jsx)(kn,{onError:e=>{if(Sr(e)){d();return}n.error(`User onboarding error`,{error:e})},onFlowChange:t=>{if(Sr(t)){d();return}let n=t?.error?.message?.key;if(n){let t=e(n);if(t!==n){i(t);return}}i(t?.error?.message?.defaultValue??t?.error?.description?.defaultValue??null)},children:e=>(0,Y.jsx)(Dr,{renderProps:e,flowError:r,handleClose:u,onStepLabelChange:f,onInviteComplete:p,onOuStepDetected:m,onResetLocalState:h})})})})})]})]})}function jr(){let e=(0,Z.c)(7),t=qe(),{t:n}=G(),r=Ne(`UsersListPage`),i;if(e[0]!==r||e[1]!==t||e[2]!==n){let a;e[4]!==r||e[5]!==t?(a=()=>{(async()=>{await t(`/users/invite`)})().catch(e=>{r.error(`Failed to navigate to add user page`,{error:e})})},e[4]=r,e[5]=t,e[6]=a):a=e[6],i=(0,Y.jsxs)(Ce,{children:[(0,Y.jsxs)(Se,{children:[(0,Y.jsx)(Se.Header,{children:n(`users:title`)}),(0,Y.jsx)(Se.SubHeader,{children:n(`users:subtitle`)}),(0,Y.jsx)(Se.Actions,{children:(0,Y.jsx)(L,{variant:`contained`,startIcon:(0,Y.jsx)(be,{size:20}),onClick:a,children:n(`users:addUser`)})})]}),(0,Y.jsx)(U,{direction:`row`,spacing:2,mb:4,flexWrap:`wrap`,useFlexGap:!0,children:(0,Y.jsx)(R,{placeholder:n(`users:searchUsers`),size:`small`,sx:{flexGrow:1,minWidth:300},InputProps:{startAdornment:(0,Y.jsx)(M,{position:`start`,children:(0,Y.jsx)(ge,{size:16})})}})}),(0,Y.jsx)(Kn,{})]}),e[0]=r,e[1]=t,e[2]=n,e[3]=i}else i=e[3];return i}export{Mn as C,nt as D,ct as E,et as O,Pn as S,X as T,Hn as _,hr as a,In as b,fr as c,cr as d,sr as f,Wn as g,Gn as h,gr as i,ur as l,Kn as m,Ar as n,mr as o,or as p,vr as r,$ as s,jr as t,lr as u,Rn as v,An as w,Fn as x,Ln as y};