import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{B as t,M as n,N as r,Y as i,_ as a,b as o,d as s,f as c,g as l,h as u,j as d,m as f,mt as p,nt as m,p as h,q as g,u as _,ut as v,v as y,vt as b}from"./dist-UmdHoCqG.js";import{m as x,n as S,r as C,t as w}from"./vendor-emotion-Cfw8XpNY.js";import{Zt as T}from"./vendor-mui-D7wxsaM1.js";var E=T(),D=e(x(),1),O=(e,t,n,r)=>(0,D.useMemo)(()=>{let t=r||e.vars.colors.primary.main,i={large:`32px`,medium:`20px`,small:`16px`},a=i[n],o=w`
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
    `,spinnerMedium:c,spinnerSmall:s}},[e,t,n,r]),k=({size:e=`medium`,color:t,className:n,style:r})=>{let{theme:i,colorScheme:a}=o(),s=O(i,a,e,t);return(0,E.jsx)(`span`,{className:S(b(g(`spinner`)),s.spinner,e===`small`&&s.spinnerSmall,e===`medium`&&s.spinnerMedium,e===`large`&&s.spinnerLarge,n),style:r,role:`status`,"aria-label":`Loading`})},A=(e,t,n,r,i,a,o,s,c=`square`)=>(0,D.useMemo)(()=>{let t={large:`calc(${e.vars.spacing.unit} * 5)`,medium:`calc(${e.vars.spacing.unit} * 4)`,small:`calc(${e.vars.spacing.unit} * 3)`},l=t[i]||t.medium,u=w`
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
            `:null,size:d[i],spinner:p,startIcon:m,variant:f[`${n}-${r}`]||f[`primary-solid`]}},[e,t,n,r,i,a,o,s]),j=(e,t)=>e===`small`?`calc(${t} * 1.5)`:e===`medium`?`calc(${t} * 2)`:`calc(${t} * 2.5)`,ee=(0,D.forwardRef)(({color:e=`primary`,variant:t=`solid`,size:n=`medium`,fullWidth:r=!1,loading:i=!1,startIcon:a,endIcon:s,children:c,className:l,disabled:u,style:d,shape:f=`square`,...p},m)=>{let{theme:h,colorScheme:_}=o(),v=A(h,_,e,t,n,r,u||!1,i,f),y=t===`icon`,x=j(n,h.vars.spacing.unit);return(0,E.jsxs)(`button`,{ref:m,style:d,className:S(b(g(`button`)),b(g(`button`,t)),b(g(`button`,e)),b(g(`button`,n)),b(g(`button`,f)),r?b(g(`button`,`fullWidth`)):void 0,i?b(g(`button`,`loading`)):void 0,u||i?b(g(`button`,`disabled`)):void 0,v.button,v.size,v.variant,v.fullWidth,v.loading,v.shape,l),disabled:u||i,...p,children:[i&&(0,E.jsx)(`span`,{className:S(b(g(`button`,`spinner`)),v.spinner),children:(0,E.jsx)(k,{size:n,color:`currentColor`,style:{height:x,width:x}})}),!i&&y&&(0,E.jsx)(`span`,{className:S(b(g(`button`,`icon`)),v.icon),children:c||a||s}),!i&&!y&&a&&(0,E.jsx)(`span`,{className:S(b(g(`button`,`start-icon`)),v.startIcon),children:a}),!y&&c&&(0,E.jsx)(`span`,{className:S(b(g(`button`,`content`)),v.content),children:c}),!i&&!y&&s&&(0,E.jsx)(`span`,{className:S(b(g(`button`,`end-icon`)),v.endIcon),children:s})]})});ee.displayName=`Button`;var M=ee,te=e=>(0,E.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,E.jsx)(`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`}),(0,E.jsx)(`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`})]}),ne=e=>(0,E.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,E.jsx)(`path`,{d:`m9 12 2 2 4-4`})]}),N=e=>(0,E.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,E.jsx)(`path`,{d:`M12 16v-4`}),(0,E.jsx)(`path`,{d:`M12 8h.01`})]}),re=e=>(0,E.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,E.jsx)(`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`}),(0,E.jsx)(`path`,{d:`M12 9v4`}),(0,E.jsx)(`path`,{d:`M12 17h.01`})]}),P=(e,t,n)=>(0,D.useMemo)(()=>{let t=w`
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
    `,icon:i,title:o,variant:r[n]}},[e,t,n]),ie=e=>{switch(e){case`success`:return ne;case`error`:return te;case`warning`:return re;case`info`:return N;default:return N}},F=(0,D.createContext)(`info`),I=()=>(0,D.useContext)(F),L=(0,D.forwardRef)(({variant:e=`info`,showIcon:t=!0,children:n,className:r,style:i,...a},s)=>{let{theme:c,colorScheme:l}=o(),u=P(c,l,e),d=ie(e);return(0,E.jsx)(F.Provider,{value:e,children:(0,E.jsxs)(`div`,{ref:s,role:`alert`,style:i,className:S(b(g(`alert`)),u.alert,u.variant,b(g(`alert`,null,e)),r),...a,children:[t&&(0,E.jsx)(`div`,{className:S(b(g(`alert`,`icon`)),u.icon),children:(0,E.jsx)(d,{})}),(0,E.jsx)(`div`,{className:S(b(g(`alert`,`content`)),u.content),children:n})]})})}),R=({children:e,className:t,style:n,...r})=>{let{theme:i,colorScheme:s}=o(),c=P(i,s,I()),{color:l,...u}=r;return(0,E.jsx)(a,{component:`h3`,variant:`h6`,fontWeight:600,style:n,className:S(b(g(`alert`,`title`)),c.title,t),...u,children:e})},z=({children:e,className:t,style:n,...r})=>{let{theme:i,colorScheme:s}=o(),c=P(i,s,I()),{color:l,...u}=r;return(0,E.jsx)(a,{component:`p`,variant:`body2`,style:n,className:S(b(g(`alert`,`description`)),c.description,t),...u,children:e})};L.displayName=`Alert`,R.displayName=`Alert.Title`,z.displayName=`Alert.Description`,L.Title=R,L.Description=z;var ae=L,B=(e,t,n,r)=>(0,D.useMemo)(()=>{let t=w`
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
    `;return{action:l,card:t,clickable:r?a:``,content:u,description:c,footer:d,header:o,title:s,variant:i[n]}},[e,t,n,r]),V=(0,D.forwardRef)(({variant:e=`default`,clickable:t=!1,children:n,className:r,style:i,...a},s)=>{let{theme:c,colorScheme:l}=o(),u=B(c,l,e,t);return(0,E.jsx)(`div`,{ref:s,style:i,className:S(b(g(`card`)),u.card,u.variant,u.clickable,b(g(`card`,null,e)),{[b(g(`card`,null,`clickable`))]:t},r),...a,children:n})}),H=(0,D.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:a,colorScheme:s}=o(),c=B(a,s,`default`,!1);return(0,E.jsx)(`div`,{ref:i,style:n,className:S(b(g(`card`,`header`)),c.header,t),...r,children:e})}),U=({children:e,level:t=3,className:n,style:r,...i})=>{let{theme:s,colorScheme:c}=o(),l=B(s,c,`default`,!1),u=e=>{switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}},d=e=>{switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}},{color:f,...p}=i;return(0,E.jsx)(a,{component:d(t),variant:u(t),style:r,className:S(b(g(`card`,`title`)),l.title,n),fontWeight:600,...p,children:e})},W=({children:e,className:t,style:n,...r})=>{let{theme:i,colorScheme:s}=o(),c=B(i,s,`default`,!1),{color:l,...u}=r;return(0,E.jsx)(a,{component:`p`,variant:`body2`,color:`textSecondary`,style:n,className:S(b(g(`card`,`description`)),c.description,t),...u,children:e})},G=(0,D.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:a,colorScheme:s}=o(),c=B(a,s,`default`,!1);return(0,E.jsx)(`div`,{ref:i,style:n,className:S(b(g(`card`,`action`)),c.action,t),...r,children:e})}),K=(0,D.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:a,colorScheme:s}=o(),c=B(a,s,`default`,!1);return(0,E.jsx)(`div`,{ref:i,style:n,className:S(b(g(`card`,`content`)),c.content,t),...r,children:e})}),q=(0,D.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:a,colorScheme:s}=o(),c=B(a,s,`default`,!1);return(0,E.jsx)(`div`,{ref:i,style:n,className:S(b(g(`card`,`footer`)),c.footer,t),...r,children:e})});V.displayName=`Card`,H.displayName=`Card.Header`,U.displayName=`Card.Title`,W.displayName=`Card.Description`,G.displayName=`Card.Action`,K.displayName=`Card.Content`,q.displayName=`Card.Footer`,V.Header=H,V.Title=U,V.Description=W,V.Action=G,V.Content=K,V.Footer=q;var oe=V,se=e=>(0,D.useMemo)(()=>{let t=w`
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
    `,toggleButton:i,togglePlaceholder:a}},[e.vars.colors.action.hover,e.vars.colors.action.selected,e.vars.colors.background.disabled,e.vars.colors.border,e.vars.colors.primary.main,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.medium,e.vars.borderRadius.small,e.vars.spacing.unit,e.vars.typography.fontFamily]),ce=({rootOuId:e,selectedOuId:t,onSelect:n,fetchChildren:r,pageSize:i=10,className:a})=>{let{theme:s}=o(),c=se(s),[l,u]=(0,D.useState)({}),d=(0,D.useCallback)(async(e,t=0)=>{u(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!0}}));try{let n=await r(e,i,t),a=n.organizationUnits||[];u(r=>{let i=r[e]||{children:[],expanded:!0,hasMore:!1,loading:!1,offset:0,totalResults:0},o=t===0?a:[...i.children,...a],s=t+a.length;return{...r,[e]:{children:o,expanded:!0,hasMore:s<n.totalResults,loading:!1,offset:s,totalResults:n.totalResults}}})}catch{u(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!1}}))}},[r,i]);(0,D.useEffect)(()=>{e&&!l[e]&&d(e)},[e,d,l]);let f=(0,D.useCallback)(e=>{let t=l[e];t?.expanded?u(t=>({...t,[e]:{...t[e],expanded:!1}})):t?.children.length?u(t=>({...t,[e]:{...t[e],expanded:!0}})):d(e)},[l,d]),p=(0,D.useCallback)(e=>{let t=l[e];t&&d(e,t.offset)},[l,d]),m=e=>(0,E.jsx)(E.Fragment,{children:[0,1,2].map(t=>(0,E.jsx)(`div`,{className:c.loadingPlaceholder,style:{paddingLeft:`${(e+1)*20}px`},children:(0,E.jsx)(`div`,{className:c.skeleton,style:{width:`${100-t*20}px`}})},`skeleton-${t}`))}),h=(e,r=0)=>{let i=l[e.id],a=t===e.id,o=i?.expanded||!1,s=i?.loading||!1,u=!i||i.totalResults>0||i.children.length>0;return(0,E.jsxs)(D.Fragment,{children:[(0,E.jsxs)(`div`,{className:S(c.node,a&&c.nodeSelected),style:{paddingLeft:`${r*20+12}px`},role:`treeitem`,"aria-selected":a,"aria-expanded":u?o:void 0,onClick:()=>n(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),n(e.id))},tabIndex:0,children:[u?(0,E.jsx)(`button`,{className:c.toggleButton,onClick:t=>{t.stopPropagation(),f(e.id)},"aria-label":o?`Collapse`:`Expand`,type:`button`,children:o?`▾`:`▸`}):(0,E.jsx)(`span`,{className:c.togglePlaceholder}),(0,E.jsx)(`span`,{className:c.nodeName,children:e.name})]}),o&&s&&!i?.children.length&&m(r),o&&i?.children.map(e=>h(e,r+1)),o&&i?.hasMore&&(0,E.jsx)(`button`,{className:c.loadMoreButton,style:{paddingLeft:`${(r+1)*20+12}px`},onClick:()=>p(e.id),disabled:s,type:`button`,children:s?`Loading...`:`Load more`})]},e.id)},g=l[e],_=g?.loading&&!g?.children.length;return(0,E.jsxs)(`div`,{className:S(c.container,a),role:`tree`,"aria-label":`Organization unit picker`,children:[_&&m(0),g?.children.map(e=>h(e,0)),g?.hasMore&&(0,E.jsx)(`button`,{className:c.loadMoreButton,onClick:()=>p(e),disabled:g?.loading,type:`button`,children:g?.loading?`Loading...`:`Load more`})]})},le=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=y(t?.i18n);return(0,E.jsx)(M,{...r,fullWidth:!0,type:`button`,color:`primary`,variant:`solid`,disabled:e,startIcon:(0,E.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 512 512`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{fill:`#1976D2`,d:`M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z`}),(0,E.jsx)(`path`,{fill:`#FAFAFA`,d:`M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64v176h96V336h48L432,256z`})]}),children:n??i(`elements.buttons.facebook.text`)})},ue=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=y(t?.i18n);return(0,E.jsx)(M,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,E.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 66.233`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsx)(`g`,{transform:`translate(-386.96 658.072)`,children:(0,E.jsx)(`path`,{d:`M420.915-658.072a33.956,33.956,0,0,0-33.955,33.955,33.963,33.963,0,0,0,23.221,32.22c1.7.314,2.32-.737,2.32-1.633,0-.81-.031-3.484-.046-6.322-9.446,2.054-11.44-4.006-11.44-4.006-1.545-3.925-3.77-4.968-3.77-4.968-3.081-2.107.232-2.064.232-2.064,3.41.239,5.205,3.5,5.205,3.5,3.028,5.19,7.943,3.69,9.881,2.822a7.23,7.23,0,0,1,2.156-4.54c-7.542-.859-15.47-3.77-15.47-16.781a13.141,13.141,0,0,1,3.5-9.114,12.2,12.2,0,0,1,.329-8.986s2.851-.913,9.34,3.48a32.545,32.545,0,0,1,8.5-1.143,32.629,32.629,0,0,1,8.506,1.143c6.481-4.393,9.328-3.48,9.328-3.48a12.185,12.185,0,0,1,.333,8.986,13.115,13.115,0,0,1,3.495,9.114c0,13.042-7.943,15.913-15.5,16.754,1.218,1.054,2.3,3.12,2.3,6.288,0,4.543-.039,8.2-.039,9.318,0,.9.611,1.962,2.332,1.629a33.959,33.959,0,0,0,23.2-32.215,33.955,33.955,0,0,0-33.955-33.955`,fill:`#ffffff`})})}),children:n??i(`elements.buttons.github.text`)})},de=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=y(t?.i18n);return(0,E.jsx)(M,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,E.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 67.901`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsxs)(`g`,{transform:`translate(-0.001 -0.001)`,children:[(0,E.jsx)(`path`,{d:`M15.049,160.965l-2.364,8.824-8.639.183a34.011,34.011,0,0,1-.25-31.7h0l7.691,1.41,3.369,7.645a20.262,20.262,0,0,0,.19,13.642Z`,transform:`translate(0 -119.93)`,fill:`#fbbb00`}),(0,E.jsx)(`path`,{d:`M294.24,208.176A33.939,33.939,0,0,1,282.137,241h0l-9.687-.494-1.371-8.559a20.235,20.235,0,0,0,8.706-10.333H261.628V208.176Z`,transform:`translate(-226.93 -180.567)`,fill:`#518ef8`}),(0,E.jsx)(`path`,{d:`M81.668,328.8h0a33.962,33.962,0,0,1-51.161-10.387l11-9.006a20.192,20.192,0,0,0,29.1,10.338Z`,transform:`translate(-26.463 -268.374)`,fill:`#28b446`}),(0,E.jsx)(`path`,{d:`M80.451,7.816l-11,9A20.19,20.19,0,0,0,39.686,27.393l-11.06-9.055h0A33.959,33.959,0,0,1,80.451,7.816Z`,transform:`translate(-24.828)`,fill:`#f14336`})]})}),children:n??i(`elements.buttons.google.text`)})},fe=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=y(t?.i18n);return(0,E.jsx)(M,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,E.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsx)(`path`,{fill:`#0077B5`,d:`M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z`})}),children:n??i(`elements.buttons.linkedin.text`)})},pe=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=y(t?.i18n);return(0,E.jsx)(M,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,E.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 23 23`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{fill:`#f3f3f3`,d:`M0 0h23v23H0z`}),(0,E.jsx)(`path`,{fill:`#f35325`,d:`M1 1h10v10H1z`}),(0,E.jsx)(`path`,{fill:`#81bc06`,d:`M12 1h10v10H12z`}),(0,E.jsx)(`path`,{fill:`#05a6f0`,d:`M1 12h10v10H1z`}),(0,E.jsx)(`path`,{fill:`#ffba08`,d:`M12 12h10v10H12z`})]}),children:n??i(`elements.buttons.microsoft.text`)})},me=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=y(t?.i18n);return(0,E.jsx)(M,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,E.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsx)(`path`,{fill:`#627EEA`,d:`M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z`})}),children:n??i(`elements.buttons.ethereum.text`)})},he=(e,t,n,r)=>(0,D.useMemo)(()=>{let t=w`
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
    `;return{container:t,errorInput:n?a:``,errorLabel:n?s:``,input:i,label:o,required:r?c:``}},[e,t,n,r]),ge=({label:e,error:t,className:n,required:r,helperText:i,style:a={},...s})=>{let{theme:c,colorScheme:l}=o(),d=!!t,p=he(c,l,d,!!r);return(0,E.jsx)(u,{error:t,helperText:i,className:S(b(g(`checkbox`)),n),helperTextMarginLeft:`calc(${c.vars.spacing.unit} * 3.5)`,children:(0,E.jsxs)(`div`,{style:a,className:S(b(g(`checkbox`,`container`)),p.container),children:[(0,E.jsx)(`input`,{type:`checkbox`,className:S(b(g(`checkbox`,`input`)),p.input,p.errorInput,{[b(g(`checkbox`,`input`,`error`))]:d}),"aria-invalid":d,"aria-required":r,...s}),e&&(0,E.jsx)(f,{required:r,error:d,variant:`inline`,className:S(b(g(`checkbox`,`label`)),p.label,p.errorLabel,{[b(g(`checkbox`,`label`,`error`))]:d}),children:e})]})})},_e=(e,t,n,r)=>(0,D.useMemo)(()=>{let t=w`
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
    `;return{disabledInput:r?a:``,errorInput:n?i:``,input:t,label:o}},[e,t,n,r]),J=({label:e,error:t,className:n,required:r,disabled:i,helperText:a,dateFormat:s=`yyyy-MM-dd`,style:c={},...l})=>{let{theme:d,colorScheme:p}=o(),m=!!t,h=_e(d,p,m,!!i);return(0,E.jsxs)(u,{error:t,helperText:a,className:S(b(g(`date-picker`)),n),style:c,children:[e&&(0,E.jsx)(f,{required:r,error:m,className:S(b(g(`date-picker`,`label`)),h.label),children:e}),(0,E.jsx)(`input`,{type:`date`,pattern:`\\d{4}-\\d{2}-\\d{2}`,placeholder:s,className:S(b(g(`date-picker`,`input`)),h.input,h.errorInput,h.disabledInput,{[b(g(`date-picker`,`input`,`error`))]:m,[b(g(`date-picker`,`input`,`disabled`))]:i}),disabled:i,"aria-invalid":m,"aria-required":r,...l})]})},ve=(e,t,n,r,i)=>(0,D.useMemo)(()=>{let t=w`
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
    `,inputError:a}},[e,t,n,r,i]),ye=({label:e,error:t,className:n,required:r,disabled:i,helperText:a,length:s=6,value:c=``,onChange:l,onComplete:d,type:p=`text`,placeholder:m=``,style:h={},autoFocus:_=!1,pattern:v})=>{let{theme:y,colorScheme:x}=o(),C=ve(y,x,!!i,!!t,s),[w,T]=(0,D.useState)(Array(s).fill(``)),O=(0,D.useRef)([]);(0,D.useEffect)(()=>{O.current=O.current.slice(0,s)},[s]),(0,D.useEffect)(()=>{if(c){let e=c.split(``).slice(0,s);for(;e.length<s;)e.push(``);T(e)}else T(Array(s).fill(``))},[c,s]),(0,D.useEffect)(()=>{_&&O.current[0]&&O.current[0].focus()},[_]);let k=(e,t)=>{let n=t.target.value;if(n.length>1||p===`number`&&n&&!/^\d$/.test(n)||v&&n&&!new RegExp(v).test(n))return;let r=[...w];r[e]=n,T(r);let i=r.join(``);l?.({target:{value:i}}),n&&e<s-1&&O.current[e+1]?.focus(),r.every(e=>e!==``)&&d&&d(i)},A=(e,t)=>{if(t.key===`Backspace`){if(!w[e]&&e>0){let t=[...w];t[e-1]=``,T(t),O.current[e-1]?.focus(),l?.({target:{value:t.join(``)}})}else if(w[e]){let t=[...w];t[e]=``,T(t),l?.({target:{value:t.join(``)}})}}else t.key===`ArrowLeft`&&e>0?O.current[e-1]?.focus():t.key===`ArrowRight`&&e<s-1?O.current[e+1]?.focus():t.key===`Enter`&&(t.preventDefault(),w.every(e=>e!==``)&&d&&d(w.join(``)))},j=e=>{e.preventDefault();let t=e.clipboardData.getData(`text`).slice(0,s),n=``;Array.from(t).forEach(e=>{p===`number`&&!/^\d$/.test(e)||v&&!new RegExp(v).test(e)||(n+=e)});let r=Array(s).fill(``);for(let e=0;e<Math.min(n.length,s);e+=1)r[e]=n[e];T(r),l?.({target:{value:r.join(``)}});let i=r.findIndex(e=>e===``),a=i===-1?s-1:i;O.current[a]?.focus(),r.every(e=>e!==``)&&d&&d(r.join(``))};return(0,E.jsxs)(u,{error:t,helperText:a,className:S(b(g(`otp-field`)),n),helperTextAlign:`center`,style:h,children:[e&&(0,E.jsx)(f,{required:r,error:!!t,children:e}),(0,E.jsx)(`div`,{className:S(b(g(`otp-field`,`input-container`)),C.inputContainer),children:Array.from({length:s},(n,a)=>(0,E.jsx)(`input`,{ref:e=>{e&&(O.current[a]=e)},type:p===`password`?`password`:`text`,inputMode:p===`number`?`numeric`:`text`,value:w[a]||``,onChange:e=>k(a,e),onKeyDown:e=>A(a,e),onPaste:j,className:S(b(g(`otp-field`,`input`)),C.input,{[b(g(`otp-field`,`input`,`error`))]:!!t,[C.inputError]:!!t,[b(g(`otp-field`,`input`,`disabled`))]:!!i,[C.inputDisabled]:!!i}),maxLength:1,placeholder:m,disabled:i,"aria-label":`${e||`OTP`} digit ${a+1}`,"aria-invalid":!!t,"aria-required":r,autoComplete:`one-time-code`},a))})]})},be=e=>(0,E.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,E.jsx)(`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`}),(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]}),xe=e=>(0,E.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,E.jsx)(`path`,{d:`M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`}),(0,E.jsx)(`path`,{d:`M14.084 14.158a3 3 0 0 1-4.242-4.242`}),(0,E.jsx)(`path`,{d:`M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`}),(0,E.jsx)(`path`,{d:`m2 2 20 20`})]}),Se=(e,t,n,r,i,a)=>(0,D.useMemo)(()=>{let t=i?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,o=a?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,s=w`
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
    `,icon:d,input:c,inputContainer:s,inputDisabled:u,inputError:l,startIcon:f}},[e,t,n,r,i,a]),Y=({label:e,error:t,required:n,className:r,disabled:i,helperText:a,startIcon:s,endIcon:c,onStartIconClick:l,onEndIconClick:d,type:p=`text`,style:m={},...h})=>{let{theme:_,colorScheme:v}=o(),y=!!t,x=Se(_,v,i??!1,y,!!s,!!c),C=S(b(g(`text-field`,`input`)),x.input,y&&x.inputError,i&&x.inputDisabled),w=S(b(g(`text-field`,`container`)),x.inputContainer),T=S(b(g(`text-field`,`start-icon`)),x.startIcon),D=S(b(g(`text-field`,`end-icon`)),x.endIcon);return(0,E.jsxs)(u,{error:t,helperText:a,className:S(b(g(`text-field`)),r),style:m,children:[e&&(0,E.jsx)(f,{required:n,error:y,children:e}),(0,E.jsxs)(`div`,{className:w,children:[s&&(0,E.jsx)(`div`,{className:T,onClick:l,role:l?`button`:void 0,tabIndex:l&&!i?0:void 0,"aria-label":`Start icon`,children:s}),(0,E.jsx)(`input`,{className:C,type:p,disabled:i,"aria-invalid":y,"aria-required":n,...h}),c&&(0,E.jsx)(`div`,{className:D,onClick:d,role:d?`button`:void 0,tabIndex:d&&!i?0:void 0,"aria-label":`End icon`,children:c})]})]})},Ce=(e,t,n,r,i)=>(0,D.useMemo)(()=>{let t=w`
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
    `,toggleIcon:t,visibleIcon:n}},[e,t,n,r,i]),we=({onChange:e,className:t,disabled:n,error:r,...i})=>{let{theme:a,colorScheme:s}=o(),[c,l]=(0,D.useState)(!1),u=Ce(a,s,c,!!n,!!r),d=()=>{n||l(!c)},f=c?xe:be;return(0,E.jsx)(Y,{...i,className:S(b(g(`password-field`)),t),type:c?`text`:`password`,onChange:t=>e(t.target.value),autoComplete:`current-password`,disabled:n,error:r,endIcon:(0,E.jsx)(f,{width:16,height:16,className:S(b(g(`password-field`,`toggle-icon`)),u.toggleIcon,c?u.visibleIcon:u.hiddenIcon)}),onEndIconClick:d})},Te=(e,t,n,r)=>(0,D.useMemo)(()=>{let t=`data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${e.colors.text.secondary.replace(`#`,``)}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`,i=w`
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
    `,select:i,selectDisabled:o,selectError:a}},[e,t,n,r]),X=({label:e,error:t,className:n,required:r,disabled:i,helperText:a,placeholder:s,options:c,style:l={},...d})=>{let{theme:p,colorScheme:m}=o(),h=!!t,_=Te(p,m,i??!1,h),v=S(b(g(`select`,`input`)),_.select,h&&_.selectError,i&&_.selectDisabled);return(0,E.jsxs)(u,{error:t,helperText:a,className:S(b(g(`select`)),n),style:l,children:[e&&(0,E.jsx)(f,{required:r,error:h,children:e}),(0,E.jsxs)(`select`,{className:v,disabled:i,"aria-invalid":h,"aria-required":r,...d,children:[s&&(0,E.jsx)(`option`,{value:``,disabled:!0,children:s}),c.map(e=>(0,E.jsx)(`option`,{value:e.value,className:_.option,children:e.label},e.value))]})]})},Ee=(e,n,r=!1,i=!1)=>{if(r&&i&&(!e||e.trim()===``))return`This field is required`;if(!e||e.trim()===``)return null;switch(n){case t.Number:{let t=parseInt(e,10);if(Number.isNaN(t))return`Please enter a valid number`;break}default:break}return null},De=e=>{let{name:n,type:r,label:i,required:a,value:o,onChange:s,onBlur:c,disabled:l=!1,error:u,className:d,options:f=[],touched:p=!1,placeholder:m}=e,h=u||Ee(o,r,a,p),g={className:d,"data-testid":`thunderid-signin-${n}`,disabled:l,error:h,label:i,name:n,onBlur:c,placeholder:m,required:a,value:o};switch(r){case t.Password:return(0,E.jsx)(we,{...g,onChange:s});case t.Text:return(0,E.jsx)(Y,{...g,type:`text`,onChange:e=>s(e.target.value),autoComplete:`off`});case t.Email:return(0,E.jsx)(Y,{...g,type:`email`,onChange:e=>s(e.target.value),autoComplete:`email`});case t.Tel:return(0,E.jsx)(Y,{...g,type:`tel`,onChange:e=>s(e.target.value),autoComplete:`tel`});case t.Date:return(0,E.jsx)(J,{...g,onChange:e=>s(e.target.value)});case t.Checkbox:{let e=o===`true`||o===!0;return(0,E.jsx)(ge,{...g,checked:e,onChange:e=>s(e.target.checked.toString())})}case t.Otp:return(0,E.jsx)(ye,{...g,onChange:e=>s(e.target.value)});case t.Number:return(0,E.jsx)(Y,{...g,type:`number`,onChange:e=>s(e.target.value),helperText:`Enter a numeric value`});case t.Select:{let e=f.length>0?f:[];return e.length>0?(0,E.jsx)(X,{...g,options:e,onChange:e=>s(e.target.value),helperText:`Select from available options`}):(0,E.jsx)(Y,{...g,type:`text`,onChange:e=>s(e.target.value),helperText:`Enter multiple values separated by commas (e.g., value1, value2, value3)`,placeholder:`value1, value2, value3`})}default:return(0,E.jsx)(Y,{...g,type:`text`,onChange:e=>s(e.target.value),helperText:`Unknown field type, treating as text`})}},Oe=(e,t,n=[`label`,`placeholder`,`text`,`title`,`subtitle`],r)=>{let i={...e};return n.forEach(e=>{i[e]&&typeof i[e]==`string`&&(i[e]=p(i[e],{meta:r,t}))}),i},ke=(e,t,n,r)=>e.map(e=>{let i=Oe(e,t,n,r);return i.components&&Array.isArray(i.components)&&(i.components=ke(i.components,t,n,r)),i}),Ae=ke,je=e=>{let t=new Map;return e?.data?.inputs&&Array.isArray(e.data.inputs)&&e.data.inputs.forEach(e=>{e.ref&&e.identifier&&t.set(e.ref,e.identifier)}),t},Me=e=>{let t=new Map;return e?.data?.actions&&Array.isArray(e.data.actions)&&e.data.actions.forEach(e=>{e.ref&&e.nextNode&&t.set(e.ref,e.nextNode)}),t},Ne=(e,t,n,r=[])=>e.map(e=>{let i={...e};if(i.ref&&t.has(i.ref)&&(i.ref=t.get(i.ref)),i.type===`SELECT`&&e.id){let t=r.find(t=>t.ref===e.id);t?.options&&(i.options=t.options.map(e=>{if(typeof e==`string`)return{label:e,value:e};let t=typeof e.value==`object`?JSON.stringify(e.value):String(e.value||``);return{label:typeof e.label==`object`?JSON.stringify(e.label):String(e.label||t),value:t}}))}return i.type===`ACTION`&&i.id&&n.has(i.id)&&(i.actionRef=n.get(i.id)),i.components&&Array.isArray(i.components)&&(i.components=Ne(i.components,t,n,r)),i}),Pe=(e,t,n=!0,r)=>{if(!e?.data?.meta?.components)return[];let{components:i}=e.data.meta,a=je(e),o=Me(e),s=e?.data?.inputs||[];return(a.size>0||o.size>0||s.length>0)&&(i=Ne(i,a,o,s)),n?Ae(i,t,void 0,r):i},Fe=(e,t,n=`errors.flow.generic`)=>{if(e&&typeof e==`object`&&e.error){let n=e.error;if(n?.message?.key){let e=t(n.message.key);if(e&&e!==n.message.key)return e;let r=`system.${n.message.key}`,i=t(r);if(i&&i!==r)return i}let r=n?.message?.defaultValue??n?.description?.defaultValue;if(r)return r}return e&&typeof e==`object`&&e.failureReason?e.failureReason:e instanceof Error&&e.message?e.message:t(n)},Ie=(e,t,n=`errors.flow.generic`)=>e?.flowStatus===`ERROR`?Fe(e,t,n):null,Le=(e,t,n={},r)=>{let{throwOnError:i=!0,defaultErrorKey:a=`errors.flow.generic`,resolveTranslations:o=!0}=n;if(Ie(e,t,a)&&i)throw e;let s=e?.data?.additionalData??{};if(typeof s.consentPrompt==`string`)try{let e=JSON.parse(s.consentPrompt);s.consentPrompt={purposes:Array.isArray(e)?e:[]}}catch{}return{additionalData:s,components:Pe(e,t,o,r),executionId:e.executionId}},Re=`4em`,ze=({component:e})=>{let{theme:t}=o(),n=e.config||{},r=n.src||``,i=n.alt||n.label||`Image`,a=n.width||`100%`,s=n.height||`auto`,c=e.variant?.toLowerCase()||`image_block`,l={borderRadius:t.vars.borderRadius.small,display:`block`,margin:c===`image_block`?`1rem auto`:`0`};if(!r)return null;if(v(r)){let t=e=>/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,n=t(a),o=t(s),c=e=>e!==`auto`&&!e.endsWith(`%`),u;return u=c(o)?o:c(n)?n:Re,(0,E.jsx)(`div`,{style:{textAlign:`center`},children:(0,E.jsx)(`span`,{style:{...l,containerType:`size`,display:`inline-grid`,height:u,placeItems:`center`,width:n},children:(0,E.jsx)(`span`,{"aria-label":i,role:`img`,style:{fontSize:`100cqmin`,lineHeight:1},children:m(r)})})},e.id)}return(0,E.jsx)(`div`,{style:{textAlign:`center`},children:(0,E.jsx)(`img`,{src:r,alt:i,height:s,width:a,style:l,onError:e=>{e.currentTarget.style.display=`none`}})},e.id)},Be=({isLoading:e,preferences:t,children:n,...r})=>{let{t:i}=y(t?.i18n);return(0,E.jsx)(M,{...r,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:e,startIcon:(0,E.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsx)(`path`,{fill:`currentColor`,d:`M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z`})}),children:n??i(`elements.buttons.smsotp.text`)})},Ve=e=>(0,D.useMemo)(()=>({container:w`
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
      `}),[e]),He=({label:e,value:t})=>{let{theme:n}=o(),r=Ve(n),{t:i}=y(),[a,s]=(0,D.useState)(!1),c=(0,D.useCallback)(async()=>{try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement(`textarea`);e.value=t,document.body.appendChild(e),e.select(),document.execCommand(`copy`),document.body.removeChild(e)}s(!0),setTimeout(()=>s(!1),3e3)},[t]);return(0,E.jsxs)(`div`,{className:r.container,children:[e&&(0,E.jsx)(`span`,{className:r.label,children:e}),(0,E.jsxs)(`div`,{className:r.valueBox,children:[(0,E.jsx)(`span`,{className:r.valueText,children:t}),(0,E.jsx)(M,{variant:`outline`,size:`small`,className:r.copyButton,onClick:()=>{c().catch(()=>void 0)},children:i(a?`elements.display.copyable_text.copied`:`elements.display.copyable_text.copy`)})]})]})},Ue=({color:e=`currentColor`,size:t=24})=>(0,E.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,E.jsx)(`path`,{d:`M8 3 4 7l4 4`}),(0,E.jsx)(`path`,{d:`M4 7h16`}),(0,E.jsx)(`path`,{d:`m16 21 4-4-4-4`}),(0,E.jsx)(`path`,{d:`M20 17H4`})]});Ue.displayName=`ArrowLeftRight`;var We=Ue,Ge=({color:e=`currentColor`,size:t=24})=>(0,E.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,E.jsx)(`path`,{d:`m16 3 4 4-4 4`}),(0,E.jsx)(`path`,{d:`M20 7H4`}),(0,E.jsx)(`path`,{d:`m8 21-4-4 4-4`}),(0,E.jsx)(`path`,{d:`M4 17h16`})]});Ge.displayName=`ArrowRightLeft`;var Ke={ArrowLeftRight:We,ArrowRightLeft:Ge},Z=i(`@thunderid/react`,`AuthOptionFactory`),qe=w`
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
`,Je=e=>{switch(e){case n.EmailInput:return t.Email;case n.PhoneInput:return t.Tel;case n.PasswordInput:return t.Password;case n.TextInput:default:return t.Text}},Ye=e=>({BODY_1:`body1`,BODY_2:`body2`,BUTTON_TEXT:`button`,CAPTION:`caption`,HEADING_1:`h1`,HEADING_2:`h2`,HEADING_3:`h3`,HEADING_4:`h4`,HEADING_5:`h5`,HEADING_6:`h6`,OVERLINE:`overline`,SUBTITLE_1:`subtitle1`,SUBTITLE_2:`subtitle2`})[e]||`h3`,Q=(e,t,n,r,i,a)=>{let o=`${r}_auth`,s=e===o||t===o;return n.toLowerCase().includes(r)?!0:i===`signup`?s||n.toLowerCase().includes(r):s},$=(e,i,o,u,f,m,g,v,y={})=>{let b=y._theme,x=y._customRenderers??{},S=y.key||e.id,C=x[e.id]??x[e.type];if(C)return C(e,{additionalData:y.additionalData,authType:v,formErrors:u,formValues:i,isFormValid:m,isLoading:f,meta:y.meta,onInputBlur:y.onInputBlur,onInputChange:g,onSubmit:y.onSubmit,touchedFields:o});let w=e=>!e||!y.t&&!y.meta?e||``:p(e,{meta:y.meta,t:y.t||(e=>e)});switch(e.type){case n.TextInput:case n.PasswordInput:case n.EmailInput:case n.PhoneInput:{let t=e.ref,n=i[t]||``,r=o[t]?u[t]:void 0,a=Je(e.type);return(0,D.cloneElement)(De({className:y.inputClassName,error:r,label:w(e.label)||``,name:t,onBlur:()=>y.onInputBlur?.(t),onChange:e=>g(t,e),placeholder:w(e.placeholder)||``,required:e.required||!1,type:a,value:n}),{key:S})}case n.OtpInput:{let n=e.ref,r=i[n]||``,a=o[n]?u[n]:void 0;return(0,D.cloneElement)(De({className:y.inputClassName,error:a,label:w(e.label)||``,name:n,onBlur:()=>y.onInputBlur?.(n),onChange:e=>g(n,e),placeholder:w(e.placeholder)||``,required:e.required||!1,type:t.Otp,value:r}),{key:S})}case n.Action:{let t=e.id,n=e.eventType||``,a=w(e.label),o=e.variant||``,s=n.toUpperCase()===r.Trigger,c=()=>{if(y.onSubmit){let t={};Object.keys(i).forEach(e=>{t[e]=i[e]});let a=y.additionalData?.consentPrompt;if(a&&n.toUpperCase()===r.Submit){let e=o.toLowerCase()!==`primary`,n={purposes:a.purposes.map(t=>({approved:!e,elements:[...t.essential.map(t=>({approved:!e,name:t.name})),...t.optional.map(n=>({approved:e?!1:i[h(t.purposeId,n.name)]!==`false`,name:n.name}))],purposeName:t.purposeName}))};t.consent_decisions=JSON.stringify(n)}y.onSubmit(e,t,s)}};if(Q(t,n,a,`google`,v,o))return(0,E.jsx)(de,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,a,`github`,v,o))return(0,E.jsx)(ue,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,a,`facebook`,v,o))return(0,E.jsx)(le,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,a,`microsoft`,v,o))return(0,E.jsx)(pe,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,a,`linkedin`,v,o))return(0,E.jsx)(fe,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,a,`ethereum`,v,o))return(0,E.jsx)(me,{onClick:c,className:y.buttonClassName},S);if(t===`prompt_mobile`||n===`prompt_mobile`)return(0,E.jsx)(Be,{onClick:c,className:y.buttonClassName},S);let l=e.startIcon?(0,E.jsx)(`img`,{src:e.startIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null,u=e.endIcon?(0,E.jsx)(`img`,{src:e.endIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null;return(0,E.jsx)(M,{fullWidth:!0,onClick:c,disabled:f||!m&&!s||y.isTimeoutDisabled||e.config?.disabled,className:y.buttonClassName,"data-testid":`thunderid-signin-submit`,variant:e.variant?.toLowerCase()===`primary`?`solid`:`outline`,color:e.variant?.toLowerCase()===`primary`?`primary`:`secondary`,startIcon:l,endIcon:u,children:a||`Submit`},S)}case n.Text:return(0,E.jsx)(a,{variant:Ye(e.variant),style:{marginBottom:2,textAlign:typeof e?.align==`string`?e.align:`left`},children:w(e.label)},S);case n.Divider:return(0,E.jsx)(l,{children:w(e.label)||``},S);case n.Select:{let t=e.ref,n=i[t]||``,r=o[t]?u[t]:void 0,a=(e.options||[]).map(e=>({label:typeof e==`string`?e:String(e.label??e.value??``),value:typeof e==`string`?e:String(e.value??``)}));return(0,E.jsx)(X,{name:t,label:w(e.label)||``,placeholder:w(e.placeholder),required:e.required,options:a,value:n,error:r,onChange:e=>g(t,e.target.value),onBlur:()=>y.onInputBlur?.(t),className:y.inputClassName},S)}case n.DateInput:{let t=e.ref,n=i[t]||``,r=o[t]?u[t]:void 0;return(0,E.jsx)(J,{name:t,label:w(e.label)||``,placeholder:w(e.placeholder),required:e.required,dateFormat:e.dateFormat,value:n,error:r,onChange:e=>g(t,e.target.value),onBlur:()=>y.onInputBlur?.(t),className:y.inputClassName},S)}case n.OuSelect:{let t=e.ref??e.id,n=y.additionalData?.rootOuId;return!n||!y.fetchOrganizationUnitChildren?(Z.warn(`OU_SELECT requires additionalData.rootOuId and fetchOrganizationUnitChildren. Skipping render.`),null):(0,E.jsx)(ce,{rootOuId:n,selectedOuId:i[t]||null,onSelect:e=>g(t,e),fetchChildren:y.fetchOrganizationUnitChildren},S)}case n.Block:if(e.components&&e.components.length>0){let t={display:`flex`,flexDirection:`column`,gap:`calc(${b?.vars?.spacing?.unit??`4px`} * 2)`},n=e.components.map((t,n)=>$(t,i,o,u,f,m,g,v,{...y,key:t.id||`${e.id}_${n}`})).filter(Boolean);return(0,E.jsx)(`form`,{id:e.id,style:t,children:n},S)}return null;case n.RichText:return(0,E.jsx)(`div`,{className:qe,dangerouslySetInnerHTML:{__html:_.sanitize(d(w(e.label)))}},S);case n.Image:{let t=w(e.height?.toString()),n=w(e.width?.toString());return(0,E.jsx)(ze,{component:{config:{alt:w(e.alt)||w(e.label)||`Image`,height:t||(y.inStack?`50`:`auto`),src:w(e.src),width:n||(y.inStack?`50`:`100%`)}},formErrors:void 0,formValues:void 0,isFormValid:!1,isLoading:!1,onInputChange:()=>{throw Error(`Function not implemented.`)},touchedFields:void 0},S)}case n.Icon:{let t=e.name||``,n=Ke[t];return n?(0,E.jsx)(n,{size:e.size||24,color:e.color||`currentColor`},S):(Z.warn(`Unknown icon name: "${t}". Skipping render.`),null)}case n.Stack:{let t=e.direction||`row`,n=e.gap??2,r=e.align||`center`,a=e.justify||`flex-start`;return(0,E.jsx)(`div`,{style:{alignItems:r,display:`flex`,flexDirection:t,flexWrap:`wrap`,gap:`${n*.5}rem`,justifyContent:a},children:e.components?e.components.map((t,n)=>$(t,i,o,u,f,m,g,v,{...y,inStack:!0,key:t.id||`${e.id}_${n}`})):[]},S)}case n.Consent:{let e=y.additionalData?.consentPrompt;return(0,E.jsx)(c,{consentData:e,formValues:i,onInputChange:g},S)}case n.Timer:{let t=w(e.label)||`Time remaining: {time}`,n=Number(y.additionalData?.stepTimeout)||0;return(0,E.jsx)(s,{expiresIn:n>0?Math.max(0,Math.floor((n-Date.now())/1e3)):0,textTemplate:t},S)}case n.CopyableText:{let t=e.source,n=t&&y.additionalData?String(y.additionalData[t]??``):``;return(0,E.jsx)(He,{label:w(e.label)||void 0,value:n},S)}default:return Z.warn(`Unsupported component type: ${e.type}. Skipping render.`),null}},Xe=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>$(e,t,n,r,i,a,o,`signin`,{...s,key:e.id||c})).filter(e=>e!==null),Ze=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>$(e,t,n,r,i,a,o,`signup`,{...s,key:e.id||c})).filter(e=>e!==null),Qe=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>$(e,t,n,r,i,a,o,`recovery`,{...s,key:e.id||c})).filter(e=>e!==null),$e=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>$(e,t,n,r,i,a,o,`signup`,{...s,key:e.id||c})).filter(e=>e!==null);export{Fe as a,ae as c,Ze as i,M as l,Qe as n,Le as o,Xe as r,oe as s,$e as t,k as u};