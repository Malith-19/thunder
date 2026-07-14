import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{At as t,B as n,Et as r,I as i,Pt as a,V as o,_ as s,b as c,d as l,dt as u,f as d,g as f,h as p,lt as m,m as h,p as g,tt as _,u as v,v as y,vt as b}from"./dist-DtPdpvxz.js";import{m as x,n as S,r as C,t as w}from"./vendor-emotion-Cfw8XpNY.js";import{Zt as T}from"./vendor-mui-D7wxsaM1.js";import{n as E}from"./vendor-react-CgxZC2_u.js";var D=T(),O=E(),k=e(x(),1),A=(e,t,n,r)=>(0,k.useMemo)(()=>{let t=r||e.vars.colors.primary.main,i={large:`32px`,medium:`20px`,small:`16px`},a=i[n],o=w`
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
    `,spinnerMedium:c,spinnerSmall:s}},[e,t,n,r]),j=e=>{let t=(0,O.c)(7),{size:n,color:r,className:i,style:o}=e,s=n===void 0?`medium`:n,{theme:l,colorScheme:u}=c(),d;if(t[0]!==i||t[1]!==r||t[2]!==u||t[3]!==s||t[4]!==o||t[5]!==l){let e=A(l,u,s,r);d=(0,D.jsx)(`span`,{className:S(a(m(`spinner`)),e.spinner,s===`small`&&e.spinnerSmall,s===`medium`&&e.spinnerMedium,s===`large`&&e.spinnerLarge,i),style:o,role:`status`,"aria-label":`Loading`}),t[0]=i,t[1]=r,t[2]=u,t[3]=s,t[4]=o,t[5]=l,t[6]=d}else d=t[6];return d},ee=(e,t,n,r,i,a,o,s,c=`square`)=>(0,k.useMemo)(()=>{let t={large:`calc(${e.vars.spacing.unit} * 5)`,medium:`calc(${e.vars.spacing.unit} * 4)`,small:`calc(${e.vars.spacing.unit} * 3)`},l=t[i]||t.medium,u=w`
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
            `:null,size:d[i],spinner:p,startIcon:m,variant:f[`${n}-${r}`]||f[`primary-solid`]}},[e,t,n,r,i,a,o,s]),te=(e,t)=>e===`small`?`calc(${t} * 1.5)`:e===`medium`?`calc(${t} * 2)`:`calc(${t} * 2.5)`,M=(0,k.forwardRef)(({color:e=`primary`,variant:t=`solid`,size:n=`medium`,fullWidth:r=!1,loading:i=!1,startIcon:o,endIcon:s,children:l,className:u,disabled:d,style:f,shape:p=`square`,...h},g)=>{let{theme:_,colorScheme:v}=c(),y=ee(_,v,e,t,n,r,d||!1,i,p),b=t===`icon`,x=te(n,_.vars.spacing.unit);return(0,D.jsxs)(`button`,{ref:g,style:f,className:S(a(m(`button`)),a(m(`button`,t)),a(m(`button`,e)),a(m(`button`,n)),a(m(`button`,p)),r?a(m(`button`,`fullWidth`)):void 0,i?a(m(`button`,`loading`)):void 0,d||i?a(m(`button`,`disabled`)):void 0,y.button,y.size,y.variant,y.fullWidth,y.loading,y.shape,u),disabled:d||i,...h,children:[i&&(0,D.jsx)(`span`,{className:S(a(m(`button`,`spinner`)),y.spinner),children:(0,D.jsx)(j,{size:n,color:`currentColor`,style:{height:x,width:x}})}),!i&&b&&(0,D.jsx)(`span`,{className:S(a(m(`button`,`icon`)),y.icon),children:l||o||s}),!i&&!b&&o&&(0,D.jsx)(`span`,{className:S(a(m(`button`,`start-icon`)),y.startIcon),children:o}),!b&&l&&(0,D.jsx)(`span`,{className:S(a(m(`button`,`content`)),y.content),children:l}),!i&&!b&&s&&(0,D.jsx)(`span`,{className:S(a(m(`button`,`end-icon`)),y.endIcon),children:s})]})});M.displayName=`Button`;var N=M,ne=(e,t,n,r)=>(0,k.useMemo)(()=>{let t=w`
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
    `;return{container:t,errorInput:n?a:``,errorLabel:n?s:``,input:i,label:o,required:r?c:``}},[e,t,n,r]),re=({label:e,error:t,className:n,required:r,helperText:i,style:o={},...s})=>{let{theme:l,colorScheme:u}=c(),d=!!t,h=ne(l,u,d,!!r);return(0,D.jsx)(f,{error:t,helperText:i,className:S(a(m(`checkbox`)),n),helperTextMarginLeft:`calc(${l.vars.spacing.unit} * 3.5)`,children:(0,D.jsxs)(`div`,{style:o,className:S(a(m(`checkbox`,`container`)),h.container),children:[(0,D.jsx)(`input`,{type:`checkbox`,className:S(a(m(`checkbox`,`input`)),h.input,h.errorInput,{[a(m(`checkbox`,`input`,`error`))]:d}),"aria-invalid":d,"aria-required":r,...s}),e&&(0,D.jsx)(p,{required:r,error:d,variant:`inline`,className:S(a(m(`checkbox`,`label`)),h.label,h.errorLabel,{[a(m(`checkbox`,`label`,`error`))]:d}),children:e})]})})},ie=(e,t,n,r)=>(0,k.useMemo)(()=>{let t=w`
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
    `;return{disabledInput:r?a:``,errorInput:n?i:``,input:t,label:o}},[e,t,n,r]),ae=({label:e,error:t,className:n,required:r,disabled:i,helperText:o,dateFormat:s=`yyyy-MM-dd`,style:l={},...u})=>{let{theme:d,colorScheme:h}=c(),g=!!t,_=ie(d,h,g,!!i);return(0,D.jsxs)(f,{error:t,helperText:o,className:S(a(m(`date-picker`)),n),style:l,children:[e&&(0,D.jsx)(p,{required:r,error:g,className:S(a(m(`date-picker`,`label`)),_.label),children:e}),(0,D.jsx)(`input`,{type:`date`,pattern:`\\d{4}-\\d{2}-\\d{2}`,placeholder:s,className:S(a(m(`date-picker`,`input`)),_.input,_.errorInput,_.disabledInput,{[a(m(`date-picker`,`input`,`error`))]:g,[a(m(`date-picker`,`input`,`disabled`))]:i}),disabled:i,"aria-invalid":g,"aria-required":r,...u})]})},oe=(e,t,n,r,i)=>(0,k.useMemo)(()=>{let t=w`
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
    `,inputError:a}},[e,t,n,r,i]),P=({label:e,error:t,className:n,required:r,disabled:i,helperText:o,length:s=6,value:l=``,onChange:u,onComplete:d,type:h=`text`,placeholder:g=``,style:_={},autoFocus:v=!1,pattern:y})=>{let{theme:b,colorScheme:x}=c(),C=oe(b,x,!!i,!!t,s),[w,T]=(0,k.useState)(Array(s).fill(``)),E=(0,k.useRef)([]);(0,k.useEffect)(()=>{E.current=E.current.slice(0,s)},[s]),(0,k.useEffect)(()=>{if(l){let e=l.split(``).slice(0,s);for(;e.length<s;)e.push(``);T(e)}else T(Array(s).fill(``))},[l,s]),(0,k.useEffect)(()=>{v&&E.current[0]&&E.current[0].focus()},[v]);let O=(e,t)=>{let n=t.target.value;if(n.length>1||h===`number`&&n&&!/^\d$/.test(n)||y&&n&&!new RegExp(y).test(n))return;let r=[...w];r[e]=n,T(r);let i=r.join(``);u?.({target:{value:i}}),n&&e<s-1&&E.current[e+1]?.focus(),r.every(e=>e!==``)&&d&&d(i)},A=(e,t)=>{if(t.key===`Backspace`){if(!w[e]&&e>0){let t=[...w];t[e-1]=``,T(t),E.current[e-1]?.focus(),u?.({target:{value:t.join(``)}})}else if(w[e]){let t=[...w];t[e]=``,T(t),u?.({target:{value:t.join(``)}})}}else t.key===`ArrowLeft`&&e>0?E.current[e-1]?.focus():t.key===`ArrowRight`&&e<s-1?E.current[e+1]?.focus():t.key===`Enter`&&(t.preventDefault(),w.every(e=>e!==``)&&d&&d(w.join(``)))},j=e=>{e.preventDefault();let t=e.clipboardData.getData(`text`).slice(0,s),n=``;Array.from(t).forEach(e=>{h===`number`&&!/^\d$/.test(e)||y&&!new RegExp(y).test(e)||(n+=e)});let r=Array(s).fill(``);for(let e=0;e<Math.min(n.length,s);e+=1)r[e]=n[e];T(r),u?.({target:{value:r.join(``)}});let i=r.findIndex(e=>e===``),a=i===-1?s-1:i;E.current[a]?.focus(),r.every(e=>e!==``)&&d&&d(r.join(``))};return(0,D.jsxs)(f,{error:t,helperText:o,className:S(a(m(`otp-field`)),n),helperTextAlign:`center`,style:_,children:[e&&(0,D.jsx)(p,{required:r,error:!!t,children:e}),(0,D.jsx)(`div`,{className:S(a(m(`otp-field`,`input-container`)),C.inputContainer),children:Array.from({length:s},(n,o)=>(0,D.jsx)(`input`,{ref:e=>{e&&(E.current[o]=e)},type:h===`password`?`password`:`text`,inputMode:h===`number`?`numeric`:`text`,value:w[o]||``,onChange:e=>O(o,e),onKeyDown:e=>A(o,e),onPaste:j,className:S(a(m(`otp-field`,`input`)),C.input,{[a(m(`otp-field`,`input`,`error`))]:!!t,[C.inputError]:!!t,[a(m(`otp-field`,`input`,`disabled`))]:!!i,[C.inputDisabled]:!!i}),maxLength:1,placeholder:g,disabled:i,"aria-label":`${e||`OTP`} digit ${o+1}`,"aria-invalid":!!t,"aria-required":r,autoComplete:`one-time-code`},o))})]})},se=e=>(0,D.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,D.jsx)(`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`}),(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]}),ce=e=>(0,D.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,D.jsx)(`path`,{d:`M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`}),(0,D.jsx)(`path`,{d:`M14.084 14.158a3 3 0 0 1-4.242-4.242`}),(0,D.jsx)(`path`,{d:`M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`}),(0,D.jsx)(`path`,{d:`m2 2 20 20`})]}),le=(e,t,n,r,i,a)=>(0,k.useMemo)(()=>{let t=i?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,o=a?`calc(${e.vars.spacing.unit} * 5)`:`calc(${e.vars.spacing.unit} * 1.5)`,s=w`
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
    `,icon:d,input:c,inputContainer:s,inputDisabled:u,inputError:l,startIcon:f}},[e,t,n,r,i,a]),F=e=>{let{label:t,error:n,required:r,className:i,disabled:o,helperText:s,startIcon:l,endIcon:u,onStartIconClick:d,onEndIconClick:h,type:g,style:_,...v}=e,y=g===void 0?`text`:g,b=_===void 0?{}:_,{theme:x,colorScheme:C}=c(),w=!!n,T=le(x,C,o??!1,w,!!l,!!u),E=S(a(m(`text-field`,`input`)),T.input,w&&T.inputError,o&&T.inputDisabled),O=S(a(m(`text-field`,`container`)),T.inputContainer),k=S(a(m(`text-field`,`start-icon`)),T.startIcon),A=S(a(m(`text-field`,`end-icon`)),T.endIcon);return(0,D.jsxs)(f,{error:n,helperText:s,className:S(a(m(`text-field`)),i),style:b,children:[t&&(0,D.jsx)(p,{required:r,error:w,children:t}),(0,D.jsxs)(`div`,{className:O,children:[l&&(0,D.jsx)(`div`,{className:k,onClick:d,role:d?`button`:void 0,tabIndex:d&&!o?0:void 0,"aria-label":`Start icon`,children:l}),(0,D.jsx)(`input`,{className:E,type:y,disabled:o,"aria-invalid":w,"aria-required":r,...v}),u&&(0,D.jsx)(`div`,{className:A,onClick:h,role:h?`button`:void 0,tabIndex:h&&!o?0:void 0,"aria-label":`End icon`,children:u})]})]})},ue=(e,t,n,r,i)=>(0,k.useMemo)(()=>{let t=w`
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
    `,toggleIcon:t,visibleIcon:n}},[e,t,n,r,i]),de=e=>{let t=(0,O.c)(5),{onChange:n,className:r,disabled:i,error:o,...s}=e,{theme:l,colorScheme:u}=c(),[d,f]=(0,k.useState)(!1),p=ue(l,u,d,!!i,!!o),h;t[0]!==i||t[1]!==d?(h=()=>{i||f(!d)},t[0]=i,t[1]=d,t[2]=h):h=t[2];let g=h,_=d?ce:se,v;return t[3]===n?v=t[4]:(v=e=>n(e.target.value),t[3]=n,t[4]=v),(0,D.jsx)(F,{...s,className:S(a(m(`password-field`)),r),type:d?`text`:`password`,onChange:v,autoComplete:`current-password`,disabled:i,error:o,endIcon:(0,D.jsx)(_,{width:16,height:16,className:S(a(m(`password-field`,`toggle-icon`)),p.toggleIcon,d?p.visibleIcon:p.hiddenIcon)}),onEndIconClick:g})},fe=(e,t,n,r)=>(0,k.useMemo)(()=>{let t=`data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${e.colors.text.secondary.replace(`#`,``)}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`,i=w`
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
    `,select:i,selectDisabled:o,selectError:a}},[e,t,n,r]),I=e=>{let{label:t,error:n,className:r,required:i,disabled:o,helperText:s,placeholder:l,options:u,style:d,...h}=e,g=d===void 0?{}:d,{theme:_,colorScheme:v}=c(),y=!!n,b=fe(_,v,o??!1,y),x=S(a(m(`select`,`input`)),b.select,y&&b.selectError,o&&b.selectDisabled);return(0,D.jsxs)(f,{error:n,helperText:s,className:S(a(m(`select`)),r),style:g,children:[t&&(0,D.jsx)(p,{required:i,error:y,children:t}),(0,D.jsxs)(`select`,{className:x,disabled:o,"aria-invalid":y,"aria-required":i,...h,children:[l&&(0,D.jsx)(`option`,{value:``,disabled:!0,children:l}),u.map(e=>(0,D.jsx)(`option`,{value:e.value,className:b.option,children:e.label},e.value))]})]})},pe=(e,t,n=!1,r=!1)=>{if(n&&r&&(!e||e.trim()===``))return`This field is required`;if(!e||e.trim()===``)return null;switch(t){case _.Number:{let t=parseInt(e,10);if(Number.isNaN(t))return`Please enter a valid number`;break}default:break}return null},L=e=>{let{name:t,type:n,label:r,required:i,value:a,onChange:o,onBlur:s,disabled:c=!1,error:l,className:u,options:d=[],touched:f=!1,placeholder:p}=e,m=l||pe(a,n,i,f),h={className:u,"data-testid":`thunderid-signin-${t}`,disabled:c,error:m,label:r,name:t,onBlur:s,placeholder:p,required:i,value:a};switch(n){case _.Password:return(0,D.jsx)(de,{...h,onChange:o});case _.Text:return(0,D.jsx)(F,{...h,type:`text`,onChange:e=>o(e.target.value),autoComplete:`off`});case _.Email:return(0,D.jsx)(F,{...h,type:`email`,onChange:e=>o(e.target.value),autoComplete:`email`});case _.Tel:return(0,D.jsx)(F,{...h,type:`tel`,onChange:e=>o(e.target.value),autoComplete:`tel`});case _.Date:return(0,D.jsx)(ae,{...h,onChange:e=>o(e.target.value)});case _.Checkbox:{let e=a===`true`||a===!0;return(0,D.jsx)(re,{...h,checked:e,onChange:e=>o(e.target.checked.toString())})}case _.Otp:return(0,D.jsx)(P,{...h,onChange:e=>o(e.target.value)});case _.Number:return(0,D.jsx)(F,{...h,type:`number`,onChange:e=>o(e.target.value),helperText:`Enter a numeric value`});case _.Select:{let e=d.length>0?d:[];return e.length>0?(0,D.jsx)(I,{...h,options:e,onChange:e=>o(e.target.value),helperText:`Select from available options`}):(0,D.jsx)(F,{...h,type:`text`,onChange:e=>o(e.target.value),helperText:`Enter multiple values separated by commas (e.g., value1, value2, value3)`,placeholder:`value1, value2, value3`})}default:return(0,D.jsx)(F,{...h,type:`text`,onChange:e=>o(e.target.value),helperText:`Unknown field type, treating as text`})}},R=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=y(n?.i18n);return(0,D.jsx)(N,{...i,fullWidth:!0,type:`button`,color:`primary`,variant:`solid`,disabled:t,startIcon:(0,D.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 512 512`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,D.jsx)(`path`,{fill:`#1976D2`,d:`M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z`}),(0,D.jsx)(`path`,{fill:`#FAFAFA`,d:`M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64v176h96V336h48L432,256z`})]}),children:r??a(`elements.buttons.facebook.text`)})},z=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=y(n?.i18n);return(0,D.jsx)(N,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,D.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 66.233`,xmlns:`http://www.w3.org/2000/svg`,children:(0,D.jsx)(`g`,{transform:`translate(-386.96 658.072)`,children:(0,D.jsx)(`path`,{d:`M420.915-658.072a33.956,33.956,0,0,0-33.955,33.955,33.963,33.963,0,0,0,23.221,32.22c1.7.314,2.32-.737,2.32-1.633,0-.81-.031-3.484-.046-6.322-9.446,2.054-11.44-4.006-11.44-4.006-1.545-3.925-3.77-4.968-3.77-4.968-3.081-2.107.232-2.064.232-2.064,3.41.239,5.205,3.5,5.205,3.5,3.028,5.19,7.943,3.69,9.881,2.822a7.23,7.23,0,0,1,2.156-4.54c-7.542-.859-15.47-3.77-15.47-16.781a13.141,13.141,0,0,1,3.5-9.114,12.2,12.2,0,0,1,.329-8.986s2.851-.913,9.34,3.48a32.545,32.545,0,0,1,8.5-1.143,32.629,32.629,0,0,1,8.506,1.143c6.481-4.393,9.328-3.48,9.328-3.48a12.185,12.185,0,0,1,.333,8.986,13.115,13.115,0,0,1,3.495,9.114c0,13.042-7.943,15.913-15.5,16.754,1.218,1.054,2.3,3.12,2.3,6.288,0,4.543-.039,8.2-.039,9.318,0,.9.611,1.962,2.332,1.629a33.959,33.959,0,0,0,23.2-32.215,33.955,33.955,0,0,0-33.955-33.955`,fill:`#ffffff`})})}),children:r??a(`elements.buttons.github.text`)})},B=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=y(n?.i18n);return(0,D.jsx)(N,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,D.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 67.91 67.901`,xmlns:`http://www.w3.org/2000/svg`,children:(0,D.jsxs)(`g`,{transform:`translate(-0.001 -0.001)`,children:[(0,D.jsx)(`path`,{d:`M15.049,160.965l-2.364,8.824-8.639.183a34.011,34.011,0,0,1-.25-31.7h0l7.691,1.41,3.369,7.645a20.262,20.262,0,0,0,.19,13.642Z`,transform:`translate(0 -119.93)`,fill:`#fbbb00`}),(0,D.jsx)(`path`,{d:`M294.24,208.176A33.939,33.939,0,0,1,282.137,241h0l-9.687-.494-1.371-8.559a20.235,20.235,0,0,0,8.706-10.333H261.628V208.176Z`,transform:`translate(-226.93 -180.567)`,fill:`#518ef8`}),(0,D.jsx)(`path`,{d:`M81.668,328.8h0a33.962,33.962,0,0,1-51.161-10.387l11-9.006a20.192,20.192,0,0,0,29.1,10.338Z`,transform:`translate(-26.463 -268.374)`,fill:`#28b446`}),(0,D.jsx)(`path`,{d:`M80.451,7.816l-11,9A20.19,20.19,0,0,0,39.686,27.393l-11.06-9.055h0A33.959,33.959,0,0,1,80.451,7.816Z`,transform:`translate(-24.828)`,fill:`#f14336`})]})}),children:r??a(`elements.buttons.google.text`)})},V=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=y(n?.i18n);return(0,D.jsx)(N,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,D.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,D.jsx)(`path`,{fill:`#0077B5`,d:`M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z`})}),children:r??a(`elements.buttons.linkedin.text`)})},H=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=y(n?.i18n);return(0,D.jsx)(N,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,D.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 23 23`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,D.jsx)(`path`,{fill:`#f3f3f3`,d:`M0 0h23v23H0z`}),(0,D.jsx)(`path`,{fill:`#f35325`,d:`M1 1h10v10H1z`}),(0,D.jsx)(`path`,{fill:`#81bc06`,d:`M12 1h10v10H12z`}),(0,D.jsx)(`path`,{fill:`#05a6f0`,d:`M1 12h10v10H1z`}),(0,D.jsx)(`path`,{fill:`#ffba08`,d:`M12 12h10v10H12z`})]}),children:r??a(`elements.buttons.microsoft.text`)})},U=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=y(n?.i18n);return(0,D.jsx)(N,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,D.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,D.jsx)(`path`,{fill:`#627EEA`,d:`M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z`})}),children:r??a(`elements.buttons.ethereum.text`)})},me=e=>(0,D.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,D.jsx)(`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`}),(0,D.jsx)(`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`})]}),he=e=>(0,D.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,D.jsx)(`path`,{d:`m9 12 2 2 4-4`})]}),W=e=>(0,D.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,D.jsx)(`path`,{d:`M12 16v-4`}),(0,D.jsx)(`path`,{d:`M12 8h.01`})]}),ge=e=>(0,D.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,D.jsx)(`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`}),(0,D.jsx)(`path`,{d:`M12 9v4`}),(0,D.jsx)(`path`,{d:`M12 17h.01`})]}),G=(e,t,n)=>(0,k.useMemo)(()=>{let t=w`
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
    `,icon:i,title:o,variant:r[n]}},[e,t,n]),_e=e=>{switch(e){case`success`:return he;case`error`:return me;case`warning`:return ge;case`info`:return W;default:return W}},K=(0,k.createContext)(`info`),q=()=>(0,k.useContext)(K),J=(0,k.forwardRef)(({variant:e=`info`,showIcon:t=!0,children:n,className:r,style:i,...o},s)=>{let{theme:l,colorScheme:u}=c(),d=G(l,u,e),f=_e(e);return(0,D.jsx)(K.Provider,{value:e,children:(0,D.jsxs)(`div`,{ref:s,role:`alert`,style:i,className:S(a(m(`alert`)),d.alert,d.variant,a(m(`alert`,null,e)),r),...o,children:[t&&(0,D.jsx)(`div`,{className:S(a(m(`alert`,`icon`)),d.icon),children:(0,D.jsx)(f,{})}),(0,D.jsx)(`div`,{className:S(a(m(`alert`,`content`)),d.content),children:n})]})})}),ve=e=>{let{children:t,className:n,style:r,...i}=e,{theme:o,colorScheme:l}=c(),u=G(o,l,q()),{color:d,...f}=i;return(0,D.jsx)(s,{component:`h3`,variant:`h6`,fontWeight:600,style:r,className:S(a(m(`alert`,`title`)),u.title,n),...f,children:t})},ye=e=>{let{children:t,className:n,style:r,...i}=e,{theme:o,colorScheme:l}=c(),u=G(o,l,q()),{color:d,...f}=i;return(0,D.jsx)(s,{component:`p`,variant:`body2`,style:r,className:S(a(m(`alert`,`description`)),u.description,n),...f,children:t})};J.displayName=`Alert`,ve.displayName=`Alert.Title`,ye.displayName=`Alert.Description`,J.Title=ve,J.Description=ye;var be=J,Y=(e,t,n,r)=>(0,k.useMemo)(()=>{let t=w`
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
    `;return{action:l,card:t,clickable:r?a:``,content:u,description:c,footer:d,header:o,title:s,variant:i[n]}},[e,t,n,r]),X=(0,k.forwardRef)(({variant:e=`default`,clickable:t=!1,children:n,className:r,style:i,...o},s)=>{let{theme:l,colorScheme:u}=c(),d=Y(l,u,e,t);return(0,D.jsx)(`div`,{ref:s,style:i,className:S(a(m(`card`)),d.card,d.variant,d.clickable,a(m(`card`,null,e)),{[a(m(`card`,null,`clickable`))]:t},r),...o,children:n})}),xe=(0,k.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:o,colorScheme:s}=c(),l=Y(o,s,`default`,!1);return(0,D.jsx)(`div`,{ref:i,style:n,className:S(a(m(`card`,`header`)),l.header,t),...r,children:e})}),Se=e=>{let{children:t,level:n,className:r,style:i,...o}=e,l=n===void 0?3:n,{theme:u,colorScheme:d}=c(),f=Y(u,d,`default`,!1),p=Oe,h=ke,{color:g,..._}=o;return(0,D.jsx)(s,{component:h(l),variant:p(l),style:i,className:S(a(m(`card`,`title`)),f.title,r),fontWeight:600,..._,children:t})},Ce=e=>{let{children:t,className:n,style:r,...i}=e,{theme:o,colorScheme:l}=c(),u=Y(o,l,`default`,!1),{color:d,...f}=i;return(0,D.jsx)(s,{component:`p`,variant:`body2`,color:`textSecondary`,style:r,className:S(a(m(`card`,`description`)),u.description,n),...f,children:t})},we=(0,k.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:o,colorScheme:s}=c(),l=Y(o,s,`default`,!1);return(0,D.jsx)(`div`,{ref:i,style:n,className:S(a(m(`card`,`action`)),l.action,t),...r,children:e})}),Te=(0,k.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:o,colorScheme:s}=c(),l=Y(o,s,`default`,!1);return(0,D.jsx)(`div`,{ref:i,style:n,className:S(a(m(`card`,`content`)),l.content,t),...r,children:e})}),Ee=(0,k.forwardRef)(({children:e,className:t,style:n,...r},i)=>{let{theme:o,colorScheme:s}=c(),l=Y(o,s,`default`,!1);return(0,D.jsx)(`div`,{ref:i,style:n,className:S(a(m(`card`,`footer`)),l.footer,t),...r,children:e})});X.displayName=`Card`,xe.displayName=`Card.Header`,Se.displayName=`Card.Title`,Ce.displayName=`Card.Description`,we.displayName=`Card.Action`,Te.displayName=`Card.Content`,Ee.displayName=`Card.Footer`,X.Header=xe,X.Title=Se,X.Description=Ce,X.Action=we,X.Content=Te,X.Footer=Ee;var De=X;function Oe(e){switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}}function ke(e){switch(e){case 1:return`h1`;case 2:return`h2`;case 3:return`h3`;case 4:return`h4`;case 5:return`h5`;case 6:return`h6`;default:return`h3`}}var Ae=e=>(0,k.useMemo)(()=>{let t=w`
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
    `,toggleButton:i,togglePlaceholder:a}},[e.vars.colors.action.hover,e.vars.colors.action.selected,e.vars.colors.background.disabled,e.vars.colors.border,e.vars.colors.primary.main,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.medium,e.vars.borderRadius.small,e.vars.spacing.unit,e.vars.typography.fontFamily]),je=({rootOuId:e,selectedOuId:t,onSelect:n,fetchChildren:r,pageSize:i=10,className:a})=>{let{theme:o}=c(),s=Ae(o),[l,u]=(0,k.useState)({}),d=(0,k.useCallback)(async(e,t=0)=>{u(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!0}}));try{let n=await r(e,i,t),a=n.organizationUnits||[];u(r=>{let i=r[e]||{children:[],expanded:!0,hasMore:!1,loading:!1,offset:0,totalResults:0},o=t===0?a:[...i.children,...a],s=t+a.length;return{...r,[e]:{children:o,expanded:!0,hasMore:s<n.totalResults,loading:!1,offset:s,totalResults:n.totalResults}}})}catch{u(t=>({...t,[e]:{...t[e]||{children:[],expanded:!0,hasMore:!1,offset:0,totalResults:0},loading:!1}}))}},[r,i]);(0,k.useEffect)(()=>{e&&!l[e]&&d(e)},[e,d,l]);let f=(0,k.useCallback)(e=>{let t=l[e];t?.expanded?u(t=>({...t,[e]:{...t[e],expanded:!1}})):t?.children.length?u(t=>({...t,[e]:{...t[e],expanded:!0}})):d(e)},[l,d]),p=(0,k.useCallback)(e=>{let t=l[e];t&&d(e,t.offset)},[l,d]),m=e=>(0,D.jsx)(D.Fragment,{children:[0,1,2].map(t=>(0,D.jsx)(`div`,{className:s.loadingPlaceholder,style:{paddingLeft:`${(e+1)*20}px`},children:(0,D.jsx)(`div`,{className:s.skeleton,style:{width:`${100-t*20}px`}})},`skeleton-${t}`))}),h=(e,r=0)=>{let i=l[e.id],a=t===e.id,o=i?.expanded||!1,c=i?.loading||!1,u=!i||i.totalResults>0||i.children.length>0;return(0,D.jsxs)(k.Fragment,{children:[(0,D.jsxs)(`div`,{className:S(s.node,a&&s.nodeSelected),style:{paddingLeft:`${r*20+12}px`},role:`treeitem`,"aria-selected":a,"aria-expanded":u?o:void 0,onClick:()=>n(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),n(e.id))},tabIndex:0,children:[u?(0,D.jsx)(`button`,{className:s.toggleButton,onClick:t=>{t.stopPropagation(),f(e.id)},"aria-label":o?`Collapse`:`Expand`,type:`button`,children:o?`▾`:`▸`}):(0,D.jsx)(`span`,{className:s.togglePlaceholder}),(0,D.jsx)(`span`,{className:s.nodeName,children:e.name})]}),o&&c&&!i?.children.length&&m(r),o&&i?.children.map(e=>h(e,r+1)),o&&i?.hasMore&&(0,D.jsx)(`button`,{className:s.loadMoreButton,style:{paddingLeft:`${(r+1)*20+12}px`},onClick:()=>p(e.id),disabled:c,type:`button`,children:c?`Loading...`:`Load more`})]},e.id)},g=l[e],_=g?.loading&&!g?.children.length;return(0,D.jsxs)(`div`,{className:S(s.container,a),role:`tree`,"aria-label":`Organization unit picker`,children:[_&&m(0),g?.children.map(e=>h(e,0)),g?.hasMore&&(0,D.jsx)(`button`,{className:s.loadMoreButton,onClick:()=>p(e),disabled:g?.loading,type:`button`,children:g?.loading?`Loading...`:`Load more`})]})},Me=(e,n,r=[`label`,`placeholder`,`text`,`title`,`subtitle`],i)=>{let a={...e};return r.forEach(e=>{a[e]&&typeof a[e]==`string`&&(a[e]=t(a[e],{meta:i,t:n}))}),a},Ne=(e,t,n,r)=>e.map(e=>{let i=Me(e,t,n,r);return i.components&&Array.isArray(i.components)&&(i.components=Ne(i.components,t,n,r)),i}),Pe=Ne,Fe=e=>{let t=new Map;return e?.data?.inputs&&Array.isArray(e.data.inputs)&&e.data.inputs.forEach(e=>{e.ref&&e.identifier&&t.set(e.ref,e.identifier)}),t},Ie=e=>{let t=new Map;return e?.data?.actions&&Array.isArray(e.data.actions)&&e.data.actions.forEach(e=>{e.ref&&e.nextNode&&t.set(e.ref,e.nextNode)}),t},Le=(e,t,n,r=[])=>e.map(e=>{let i={...e};if(i.ref&&t.has(i.ref)&&(i.ref=t.get(i.ref)),i.type===`SELECT`&&e.id){let t=r.find(t=>t.ref===e.id);t?.options&&(i.options=t.options.map(e=>{if(typeof e==`string`)return{label:e,value:e};let t=typeof e.value==`object`?JSON.stringify(e.value):String(e.value||``);return{label:typeof e.label==`object`?JSON.stringify(e.label):String(e.label||t),value:t}}))}return i.type===`ACTION`&&i.id&&n.has(i.id)&&(i.actionRef=n.get(i.id)),i.components&&Array.isArray(i.components)&&(i.components=Le(i.components,t,n,r)),i}),Re=(e,t,n=!0,r)=>{if(!e?.data?.meta?.components)return[];let{components:i}=e.data.meta,a=Fe(e),o=Ie(e),s=e?.data?.inputs||[];return(a.size>0||o.size>0||s.length>0)&&(i=Le(i,a,o,s)),n?Pe(i,t,void 0,r):i},ze=(e,t,n=`errors.flow.generic`)=>{if(e&&typeof e==`object`&&e.error){let n=e.error;if(n?.message?.key){let e=t(n.message.key);if(e&&e!==n.message.key)return e;let r=`system.${n.message.key}`,i=t(r);if(i&&i!==r)return i}let r=n?.message?.defaultValue??n?.description?.defaultValue;if(r)return r}return e&&typeof e==`object`&&e.failureReason?e.failureReason:e instanceof Error&&e.message?e.message:t(n)},Be=(e,t,n=`errors.flow.generic`)=>e?.flowStatus===`ERROR`?ze(e,t,n):null,Ve=(e,t,n={},r)=>{let{throwOnError:i=!0,defaultErrorKey:a=`errors.flow.generic`,resolveTranslations:o=!0}=n;if(Be(e,t,a)&&i)throw e;let s=e?.data?.additionalData??{};if(typeof s.consentPrompt==`string`)try{let e=JSON.parse(s.consentPrompt);s.consentPrompt={purposes:Array.isArray(e)?e:[]}}catch{}return{additionalData:s,components:Re(e,t,o,r),executionId:e.executionId}},He=`4em`,Ue=e=>{let t=(0,O.c)(6),{component:n}=e,{theme:i}=c(),a,o;if(t[0]!==n.config||t[1]!==n.id||t[2]!==n.variant||t[3]!==i.vars.borderRadius.small){o=Symbol.for(`react.early_return_sentinel`);bb0:{let e=n.config||{},t=e.src||``,s=e.alt||e.label||`Image`,c=e.width||`100%`,l=e.height||`auto`,u=n.variant?.toLowerCase()||`image_block`,d={borderRadius:i.vars.borderRadius.small,display:`block`,margin:u===`image_block`?`1rem auto`:`0`};if(!t){o=null;break bb0}if(r(t)){let e=We,r=e(c),i=e(l),a=Ge,u;u=a(i)?i:a(r)?r:He,o=(0,D.jsx)(`div`,{style:{textAlign:`center`},children:(0,D.jsx)(`span`,{style:{...d,containerType:`size`,display:`inline-grid`,height:u,placeItems:`center`,width:r},children:(0,D.jsx)(`span`,{"aria-label":s,role:`img`,style:{fontSize:`100cqmin`,lineHeight:1},children:b(t)})})},n.id);break bb0}a=(0,D.jsx)(`div`,{style:{textAlign:`center`},children:(0,D.jsx)(`img`,{src:t,alt:s,height:l,width:c,style:d,onError:Ke})},n.id)}t[0]=n.config,t[1]=n.id,t[2]=n.variant,t[3]=i.vars.borderRadius.small,t[4]=a,t[5]=o}else a=t[4],o=t[5];return o===Symbol.for(`react.early_return_sentinel`)?a:o};function We(e){return/^\d+(\.\d+)?$/.test(e)?`${e}px`:e}function Ge(e){return e!==`auto`&&!e.endsWith(`%`)}function Ke(e){e.currentTarget.style.display=`none`}var qe=e=>{let{isLoading:t,preferences:n,children:r,...i}=e,{t:a}=y(n?.i18n);return(0,D.jsx)(N,{...i,fullWidth:!0,type:`button`,color:`secondary`,variant:`solid`,disabled:t,startIcon:(0,D.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,xmlns:`http://www.w3.org/2000/svg`,children:(0,D.jsx)(`path`,{fill:`currentColor`,d:`M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z`})}),children:r??a(`elements.buttons.smsotp.text`)})},Je=e=>(0,k.useMemo)(()=>({container:w`
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
      `}),[e]),Ye=e=>{let t=(0,O.c)(4),{label:n,value:r}=e,{theme:i}=c(),a=Je(i),{t:o}=y(),[s,l]=(0,k.useState)(!1),u;t[0]===r?u=t[1]:(u=async()=>{try{await navigator.clipboard.writeText(r)}catch{let e=document.createElement(`textarea`);e.value=r,document.body.appendChild(e),e.select(),document.execCommand(`copy`),document.body.removeChild(e)}l(!0),setTimeout(()=>l(!1),3e3)},t[0]=r,t[1]=u);let d=u,f;return t[2]===d?f=t[3]:(f=()=>{d().catch(Xe)},t[2]=d,t[3]=f),(0,D.jsxs)(`div`,{className:a.container,children:[n&&(0,D.jsx)(`span`,{className:a.label,children:n}),(0,D.jsxs)(`div`,{className:a.valueBox,children:[(0,D.jsx)(`span`,{className:a.valueText,children:r}),(0,D.jsx)(N,{variant:`outline`,size:`small`,className:a.copyButton,onClick:f,children:o(s?`elements.display.copyable_text.copied`:`elements.display.copyable_text.copy`)})]})]})};function Xe(){}var Ze=({color:e=`currentColor`,size:t=24})=>(0,D.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,D.jsx)(`path`,{d:`M8 3 4 7l4 4`}),(0,D.jsx)(`path`,{d:`M4 7h16`}),(0,D.jsx)(`path`,{d:`m16 21 4-4-4-4`}),(0,D.jsx)(`path`,{d:`M20 17H4`})]});Ze.displayName=`ArrowLeftRight`;var Qe=Ze,$e=({color:e=`currentColor`,size:t=24})=>(0,D.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,D.jsx)(`path`,{d:`m16 3 4 4-4 4`}),(0,D.jsx)(`path`,{d:`M20 7H4`}),(0,D.jsx)(`path`,{d:`m8 21-4-4 4-4`}),(0,D.jsx)(`path`,{d:`M4 17h16`})]});$e.displayName=`ArrowRightLeft`;var et={ArrowLeftRight:Qe,ArrowRightLeft:$e},Z=u(`@thunderid/react`,`AuthOptionFactory`),tt=w`
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
`,nt=e=>{switch(e){case n.EmailInput:return _.Email;case n.PhoneInput:return _.Tel;case n.PasswordInput:return _.Password;case n.TextInput:default:return _.Text}},rt=e=>({BODY_1:`body1`,BODY_2:`body2`,BUTTON_TEXT:`button`,CAPTION:`caption`,HEADING_1:`h1`,HEADING_2:`h2`,HEADING_3:`h3`,HEADING_4:`h4`,HEADING_5:`h5`,HEADING_6:`h6`,OVERLINE:`overline`,SUBTITLE_1:`subtitle1`,SUBTITLE_2:`subtitle2`})[e]||`h3`,Q=(e,t,n,r,i,a)=>{let o=`${r}_auth`,s=e===o||t===o;return n.toLowerCase().includes(r)?!0:i===`signup`?s||n.toLowerCase().includes(r):s},$=(e,r,a,c,u,f,p,m,y={})=>{let b=y._theme,x=y._customRenderers??{},S=y.key||e.id,C=x[e.id]??x[e.type];if(C)return C(e,{additionalData:y.additionalData,authType:m,formErrors:c,formValues:r,isFormValid:f,isLoading:u,meta:y.meta,onInputBlur:y.onInputBlur,onInputChange:p,onSubmit:y.onSubmit,touchedFields:a});let w=e=>!e||!y.t&&!y.meta?e||``:t(e,{meta:y.meta,t:y.t||(e=>e)});switch(e.type){case n.TextInput:case n.PasswordInput:case n.EmailInput:case n.PhoneInput:{let t=e.ref,n=r[t]||``,i=a[t]?c[t]:void 0,o=nt(e.type);return(0,k.cloneElement)(L({className:y.inputClassName,error:i,label:w(e.label)||``,name:t,onBlur:()=>y.onInputBlur?.(t),onChange:e=>p(t,e),placeholder:w(e.placeholder)||``,required:e.required||!1,type:o,value:n}),{key:S})}case n.OtpInput:{let t=e.ref,n=r[t]||``,i=a[t]?c[t]:void 0;return(0,k.cloneElement)(L({className:y.inputClassName,error:i,label:w(e.label)||``,name:t,onBlur:()=>y.onInputBlur?.(t),onChange:e=>p(t,e),placeholder:w(e.placeholder)||``,required:e.required||!1,type:_.Otp,value:n}),{key:S})}case n.Action:{let t=e.id,n=e.eventType||``,i=w(e.label),a=e.variant||``,s=n.toUpperCase()===o.Trigger,c=()=>{if(y.onSubmit){let t={};Object.keys(r).forEach(e=>{t[e]=r[e]});let i=y.additionalData?.consentPrompt;if(i&&n.toUpperCase()===o.Submit){let e=a.toLowerCase()!==`primary`,n={purposes:i.purposes.map(t=>({approved:!e,elements:[...t.essential.map(t=>({approved:!e,name:t.name})),...t.optional.map(n=>({approved:e?!1:r[g(t.purposeId,n.name)]!==`false`,name:n.name}))],purposeName:t.purposeName}))};t.consent_decisions=JSON.stringify(n)}y.onSubmit(e,t,s)}};if(Q(t,n,i,`google`,m,a))return(0,D.jsx)(B,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,i,`github`,m,a))return(0,D.jsx)(z,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,i,`facebook`,m,a))return(0,D.jsx)(R,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,i,`microsoft`,m,a))return(0,D.jsx)(H,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,i,`linkedin`,m,a))return(0,D.jsx)(V,{onClick:c,className:y.buttonClassName},S);if(Q(t,n,i,`ethereum`,m,a))return(0,D.jsx)(U,{onClick:c,className:y.buttonClassName},S);if(t===`prompt_mobile`||n===`prompt_mobile`)return(0,D.jsx)(qe,{onClick:c,className:y.buttonClassName},S);let l=e.startIcon?(0,D.jsx)(`img`,{src:e.startIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null,d=e.endIcon?(0,D.jsx)(`img`,{src:e.endIcon,alt:``,"aria-hidden":`true`,style:{height:`1.25em`,objectFit:`contain`,width:`1.25em`}}):null;return(0,D.jsx)(N,{fullWidth:!0,onClick:c,disabled:u||!f&&!s||y.isTimeoutDisabled||e.config?.disabled,className:y.buttonClassName,"data-testid":`thunderid-signin-submit`,variant:e.variant?.toLowerCase()===`primary`?`solid`:`outline`,color:e.variant?.toLowerCase()===`primary`?`primary`:`secondary`,startIcon:l,endIcon:d,children:i||`Submit`},S)}case n.Text:return(0,D.jsx)(s,{variant:rt(e.variant),style:{marginBottom:2,textAlign:typeof e?.align==`string`?e.align:`left`},children:w(e.label)},S);case n.Divider:return(0,D.jsx)(h,{children:w(e.label)||``},S);case n.Select:{let t=e.ref,n=r[t]||``,i=a[t]?c[t]:void 0,o=(e.options||[]).map(e=>({label:typeof e==`string`?e:String(e.label??e.value??``),value:typeof e==`string`?e:String(e.value??``)}));return(0,D.jsx)(I,{name:t,label:w(e.label)||``,placeholder:w(e.placeholder),required:e.required,options:o,value:n,error:i,onChange:e=>p(t,e.target.value),onBlur:()=>y.onInputBlur?.(t),className:y.inputClassName},S)}case n.DateInput:{let t=e.ref,n=r[t]||``,i=a[t]?c[t]:void 0;return(0,D.jsx)(ae,{name:t,label:w(e.label)||``,placeholder:w(e.placeholder),required:e.required,dateFormat:e.dateFormat,value:n,error:i,onChange:e=>p(t,e.target.value),onBlur:()=>y.onInputBlur?.(t),className:y.inputClassName},S)}case n.OuSelect:{let t=e.ref??e.id,n=y.additionalData?.rootOuId;return!n||!y.fetchOrganizationUnitChildren?(Z.warn(`OU_SELECT requires additionalData.rootOuId and fetchOrganizationUnitChildren. Skipping render.`),null):(0,D.jsx)(je,{rootOuId:n,selectedOuId:r[t]||null,onSelect:e=>p(t,e),fetchChildren:y.fetchOrganizationUnitChildren},S)}case n.Block:if(e.components&&e.components.length>0){let t={display:`flex`,flexDirection:`column`,gap:`calc(${b?.vars?.spacing?.unit??`4px`} * 2)`},n=e.components.map((t,n)=>$(t,r,a,c,u,f,p,m,{...y,key:t.id||`${e.id}_${n}`})).filter(Boolean);return(0,D.jsx)(`form`,{id:e.id,style:t,children:n},S)}return null;case n.RichText:return(0,D.jsx)(`div`,{className:tt,dangerouslySetInnerHTML:{__html:v.sanitize(i(w(e.label)))}},S);case n.Image:{let t=w(e.height?.toString()),n=w(e.width?.toString());return(0,D.jsx)(Ue,{component:{config:{alt:w(e.alt)||w(e.label)||`Image`,height:t||(y.inStack?`50`:`auto`),src:w(e.src),width:n||(y.inStack?`50`:`100%`)}},formErrors:void 0,formValues:void 0,isFormValid:!1,isLoading:!1,onInputChange:()=>{throw Error(`Function not implemented.`)},touchedFields:void 0},S)}case n.Icon:{let t=e.name||``,n=et[t];return n?(0,D.jsx)(n,{size:e.size||24,color:e.color||`currentColor`},S):(Z.warn(`Unknown icon name: "${t}". Skipping render.`),null)}case n.Stack:{let t=e.direction||`row`,n=e.gap??2,i=e.align||`center`,o=e.justify||`flex-start`;return(0,D.jsx)(`div`,{style:{alignItems:i,display:`flex`,flexDirection:t,flexWrap:`wrap`,gap:`${n*.5}rem`,justifyContent:o},children:e.components?e.components.map((t,n)=>$(t,r,a,c,u,f,p,m,{...y,inStack:!0,key:t.id||`${e.id}_${n}`})):[]},S)}case n.Consent:{let e=y.additionalData?.consentPrompt;return(0,D.jsx)(d,{consentData:e,formValues:r,onInputChange:p},S)}case n.Timer:{let t=w(e.label)||`Time remaining: {time}`,n=Number(y.additionalData?.stepTimeout)||0;return(0,D.jsx)(l,{expiresIn:n>0?Math.max(0,Math.floor((n-Date.now())/1e3)):0,textTemplate:t},S)}case n.CopyableText:{let t=e.source,n=t&&y.additionalData?String(y.additionalData[t]??``):``;return(0,D.jsx)(Ye,{label:w(e.label)||void 0,value:n},S)}default:return Z.warn(`Unsupported component type: ${e.type}. Skipping render.`),null}},it=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>$(e,t,n,r,i,a,o,`signin`,{...s,key:e.id||c})).filter(e=>e!==null),at=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>$(e,t,n,r,i,a,o,`signup`,{...s,key:e.id||c})).filter(e=>e!==null),ot=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>$(e,t,n,r,i,a,o,`recovery`,{...s,key:e.id||c})).filter(e=>e!==null),st=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>$(e,t,n,r,i,a,o,`signup`,{...s,key:e.id||c})).filter(e=>e!==null);export{F as _,Ue as a,j as b,De as c,H as d,V as f,L as g,R as h,at as i,be as l,z as m,ot as n,ze as o,B as p,it as r,Ve as s,st as t,U as u,P as v,N as y};