import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{_ as t,b as n,m as r,tt as i,z as a}from"./dist-CrNHmsnv.js";import{m as o,t as s}from"./vendor-emotion-Cfw8XpNY.js";import{Zt as c}from"./vendor-mui-D7wxsaM1.js";import{_ as l,a as u,b as d,d as f,f as p,g as m,h,m as g,p as _,u as v,y}from"./AuthOptionFactory-CsVDR56M.js";var b=({component:e,formValues:t,touchedFields:n,formErrors:r,onInputChange:a,inputClassName:o})=>{let s=e.config||{},c=s.identifier||s.name||e.id,l=t[c]||!1;return m({className:o,error:n[c]?r[c]:void 0,label:s.label||``,name:c,onChange:e=>a(c,e),placeholder:s.placeholder||``,required:s.required||!1,type:i.Checkbox,value:l})},x=({component:e,formValues:t,touchedFields:n,formErrors:r,onInputChange:a,inputClassName:o})=>{let s=e.config||{},c=s.identifier||s.name||e.id,l=t[c]||``;return m({className:o,error:n[c]?r[c]:void 0,label:s.label||``,name:c,onChange:e=>a(c,e),placeholder:s.placeholder||``,required:s.required||!1,type:i.Date,value:l})},S=c(),C=({component:e})=>{let{theme:t}=n(),i=(e.config||{}).text||``;return(0,S.jsx)(r,{orientation:(e.variant?.toLowerCase()||`horizontal`)===`vertical`?`vertical`:`horizontal`,style:{margin:`calc(${t.vars.spacing.unit} * 2) 0`},children:i},e.id)},w=({component:e,formValues:t,touchedFields:n,formErrors:r,onInputChange:a,inputClassName:o})=>{let s=e.config||{},c=s.identifier||s.name||e.id,l=t[c]||``;return m({className:o,error:n[c]?r[c]:void 0,label:s.label||`Email`,name:c,onChange:e=>a(c,e),placeholder:s.placeholder||`Enter your email`,required:s.required||!1,type:i.Email,value:l})},T=e=>{let{component:t}=e;return t.components&&t.components.length>0?(0,S.jsx)(`form`,{onSubmit:n=>{n.preventDefault();let r=t.components?.find(e=>e.type===`BUTTON`&&(e.variant===`PRIMARY`||e.variant===`SECONDARY`||e.config?.type===`submit`));r&&e.onSubmit&&e.onSubmit(r,e.formValues)},style:{display:`flex`,flexDirection:`column`},children:t.components.map(t=>N({...e,component:t}))},t.id):(0,S.jsx)(`div`,{},t.id)},E=({component:e,formValues:t,touchedFields:n,formErrors:r,onInputChange:a,inputClassName:o})=>{let s=e.config||{},c=s.identifier||s.name||e.id,l=t[c]||``;return m({className:o,error:n[c]?r[c]:void 0,label:s.label||``,name:c,onChange:e=>a(c,e),placeholder:s.placeholder||``,required:s.required||!1,type:i.Number,value:l})},D=({component:e,formValues:t,touchedFields:n,formErrors:r,onInputChange:a,inputClassName:o})=>{let s=e.config||{},c=s.identifier||s.name||e.id,l=t[c]||``,u=n[c]?r[c]:void 0,d=s.validations||[],f=[];return d.forEach(e=>{if(e.name===`LengthValidator`){let t=e.conditions?.find(e=>e.key===`min.length`)?.value,n=e.conditions?.find(e=>e.key===`max.length`)?.value;(t||n)&&f.push(`Length: ${t||`0`}-${n||`∞`} characters`)}else if(e.name===`UpperCaseValidator`){let t=e.conditions?.find(e=>e.key===`min.length`)?.value;t&&parseInt(t,10)>0&&f.push(`Must contain uppercase letter(s)`)}else if(e.name===`LowerCaseValidator`){let t=e.conditions?.find(e=>e.key===`min.length`)?.value;t&&parseInt(t,10)>0&&f.push(`Must contain lowercase letter(s)`)}else if(e.name===`NumeralValidator`){let t=e.conditions?.find(e=>e.key===`min.length`)?.value;t&&parseInt(t,10)>0&&f.push(`Must contain number(s)`)}else if(e.name===`SpecialCharacterValidator`){let t=e.conditions?.find(e=>e.key===`min.length`)?.value;t&&parseInt(t,10)>0&&f.push(`Must contain special character(s)`)}}),m({className:o,error:u,label:s.label||`Password`,name:c,onChange:e=>a(c,e),placeholder:s.placeholder||`Enter your password`,required:s.required||!1,type:i.Password,value:l})},O=({component:e,formValues:t,touchedFields:n,formErrors:r,onInputChange:a,inputClassName:o})=>{let s=e.config||{},c=s.identifier||s.name||e.id,l=t[c]||``,u=n[c]?r[c]:void 0,d=(s.options||[]).map(e=>({label:e,value:e}));return m({className:o,error:u,label:s.label||``,name:c,onChange:e=>a(c,e),options:d,placeholder:s.placeholder||``,required:s.required||!1,type:i.Select,value:l})},k=({component:e,isLoading:t,isFormValid:n,buttonClassName:r,onSubmit:i,size:a=`medium`})=>{let o=e.config||{},s=o.text||o.label||`Continue`,c=o.type||`submit`,l=e.variant?.toUpperCase()||`PRIMARY`,{variant:u,color:f}=(()=>{switch(l){case`PRIMARY`:return{color:`primary`,variant:`solid`};case`SECONDARY`:return{color:`secondary`,variant:`solid`};case`TEXT`:return{color:`primary`,variant:`text`};case`SOCIAL`:case`OUTLINED`:return{color:`primary`,variant:`outline`};default:return{color:`primary`,variant:`solid`}}})();return(0,S.jsx)(y,{type:c===`submit`?`submit`:`button`,variant:u,color:f,size:a,disabled:t||c===`submit`&&!n,onClick:c===`submit`?void 0:()=>{i&&c!==`submit`&&i(e)},className:r,style:{width:`100%`},children:t?(0,S.jsx)(d,{size:`small`}):s},e.id)},A=({component:e,formValues:t,touchedFields:n,formErrors:r,onInputChange:i,inputClassName:a})=>{let o=e.config||{},s=o.identifier||o.name||e.id,c=t[s]||``,u=n[s]?r[s]:void 0;return(0,S.jsx)(l,{name:s,type:`tel`,label:o.label||``,placeholder:o.placeholder||``,required:o.required||!1,value:c,error:u,onChange:e=>i(s,e.target.value),className:a,helperText:o.hint||``},e.id)},j=({component:e,formValues:t,touchedFields:n,formErrors:r,onInputChange:a,inputClassName:o})=>{let s=e.config||{},c=s.identifier||s.name||e.id,l=t[c]||``;return m({className:o,error:n[c]?r[c]:void 0,label:s.label||``,name:c,onChange:e=>a(c,e),placeholder:s.placeholder||``,required:s.required||!1,type:i.Text,value:l})},M=({component:e})=>{let{theme:r}=n(),i=e.config||{},a=i.text||i.content||``,o=e.variant?.toLowerCase()||`body1`,s=`body1`;switch(o){case`h1`:s=`h1`;break;case`h2`:s=`h2`;break;case`h3`:s=`h3`;break;case`h4`:s=`h4`;break;case`h5`:s=`h5`;break;case`h6`:s=`h6`;break;case`subtitle1`:s=`subtitle1`;break;case`subtitle2`:s=`subtitle2`;break;case`body2`:s=`body2`;break;case`caption`:s=`caption`;break;default:s=`body1`}return(0,S.jsx)(t,{variant:s,style:{marginBottom:`calc(${r.vars.spacing.unit} * 2)`},children:a},e.id)},N=({component:e,onSubmit:t,...n})=>{switch(e.type){case a.Typography:return(0,S.jsx)(M,{component:e,onSubmit:t,...n});case a.Input:{let r=e.variant?.toUpperCase()??``,i=e.config.type?.toLowerCase()??``;return r===`EMAIL`||i===`email`?(0,S.jsx)(w,{component:e,onSubmit:t,...n}):r===`PASSWORD`||i===`password`?(0,S.jsx)(D,{component:e,onSubmit:t,...n}):r===`TELEPHONE`||i===`tel`?(0,S.jsx)(A,{component:e,onSubmit:t,...n}):r===`NUMBER`||i===`number`?(0,S.jsx)(E,{component:e,onSubmit:t,...n}):r===`DATE`||i===`date`?(0,S.jsx)(x,{component:e,onSubmit:t,...n}):r===`CHECKBOX`||i===`checkbox`?(0,S.jsx)(b,{component:e,onSubmit:t,...n}):(0,S.jsx)(j,{component:e,onSubmit:t,...n})}case a.Button:{let r=e.variant?.toUpperCase(),i=e.config.text||e.config.label||``;if(r===`SOCIAL`){if(i.toLowerCase().includes(`google`))return(0,S.jsx)(_,{onClick:()=>t?.(e,{}),...n,children:i});if(i.toLowerCase().includes(`github`))return(0,S.jsx)(g,{onClick:()=>t?.(e,{}),...n,children:i});if(i.toLowerCase().includes(`microsoft`))return(0,S.jsx)(f,{onClick:()=>t?.(e,{}),...n,children:i});if(i.toLowerCase().includes(`facebook`))return(0,S.jsx)(h,{onClick:()=>t?.(e,{}),...n,children:i});if(i.toLowerCase().includes(`linkedin`))return(0,S.jsx)(p,{onClick:()=>t?.(e,{}),...n,children:i});if(i.toLowerCase().includes(`ethereum`))return(0,S.jsx)(v,{onClick:()=>t?.(e,{}),...n,children:i})}return(0,S.jsx)(k,{component:e,onSubmit:t,...n})}case a.Form:return(0,S.jsx)(T,{component:e,onSubmit:t,...n});case a.Select:return(0,S.jsx)(O,{component:e,onSubmit:t,...n});case a.Divider:return(0,S.jsx)(C,{component:e,onSubmit:t,...n});case a.Image:return(0,S.jsx)(u,{component:e,onSubmit:t,...n});default:return(0,S.jsx)(`div`,{})}},P=(e,t,n,r,i,a,o,s)=>N({component:e,formErrors:r,formValues:t,isFormValid:a,isLoading:i,onInputChange:o,touchedFields:n,...s}),F=(e,t,n,r,i,a,o,s)=>e.map((e,c)=>P(e,t,n,r,i,a,o,{...s,key:e.id||c})).filter(Boolean),I=e(o(),1),L=(e,t)=>(0,I.useMemo)(()=>{let t=s`
      min-width: 420px;
      margin: 0 auto;
      font-family: ${e.vars.typography.fontFamily};
    `,n=s`
      background: ${e.vars.colors.background.surface};
      border-radius: ${e.vars.borderRadius.large};
      gap: calc(${e.vars.spacing.unit} * 2);
      min-width: 420px;
    `,r=s`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `,i=s`
      gap: 0;
      align-items: center;
    `,a=s`
      margin: 0 0 calc(${e.vars.spacing.unit} * 1) 0;
      color: ${e.vars.colors.text.primary};
    `,o=s`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
      color: ${e.vars.colors.text.secondary};
    `,c=s`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
    `,l=s`
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `,u=s`
      display: flex;
      flex-direction: column;
      gap: calc(${e.vars.spacing.unit} * 2);
    `,d=s`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: calc(${e.vars.spacing.unit} * 4);
    `,f=s`
      margin-top: calc(${e.vars.spacing.unit} * 2);
      color: ${e.vars.colors.text.secondary};
    `,p=s`
      margin: calc(${e.vars.spacing.unit} * 1) 0;
    `,m=s`
      text-align: center;
      padding: calc(${e.vars.spacing.unit} * 4);
    `,h=s`
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `,g=s`
      margin-top: calc(${e.vars.spacing.unit} * 1);
      color: ${e.vars.colors.text.secondary};
    `,_=s`
      display: flex;
      flex-direction: column;
      gap: calc(${e.vars.spacing.unit} * 2);
    `,v=s`
      margin: calc(${e.vars.spacing.unit} * 1) 0;
    `,y=s`
      display: flex;
      flex-direction: column;
      gap: calc(${e.vars.spacing.unit} * 1);
    `,b=s`
      width: 100%;
    `,x=s`
      background: ${e.vars.colors.background.surface};
      border-radius: ${e.vars.borderRadius.large};
      padding: calc(${e.vars.spacing.unit} * 2);
    `,S=s`
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `,C=s`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
    `,w=s`
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `;return{authenticatorItem:b,authenticatorSection:y,card:n,centeredContainer:m,contentContainer:u,divider:p,errorAlert:S,errorContainer:l,flowMessageItem:s`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
    `,flowMessagesContainer:w,form:_,formDivider:v,header:i,loadingContainer:d,loadingText:f,logoContainer:r,messageItem:c,messagesAlert:C,noAuthenticatorCard:x,passkeyContainer:h,passkeyText:g,signUp:t,subtitle:o,title:a}},[e.vars.colors.background.surface,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.large,e.vars.spacing.unit,e.vars.typography.fontFamily,t]),R=(e,t,n,r,i)=>{let a=null,o=null,s=e=>{for(let t of e){if(t.type===`TEXT`&&t.variant?.startsWith(`HEADING_`)){if(!a)a=t;else if(!o){o=t;break}}if(t.components&&t.components.length>0&&(s(t.components),a&&o))break}},c=e=>{let t=0,n=e=>e.reduce((e,r)=>{if(t<2&&r.type===`TEXT`&&r.variant?.startsWith(`HEADING_`))return t+=1,e;if(r.components&&r.components.length>0){let t=n(r.components);t.length>0&&e.push({...r,components:t})}else e.push(r);return e},[]);return n(e)},l=e=>e&&e.label||``;s(e);let u=l(a),d=l(o);return{componentsWithoutHeadings:c(e),headingComponents:{heading:a,subheading:o},subtitle:n||d||i||``,title:t||u||r||``}};export{j as a,O as c,T as d,w as f,b as h,M as i,D as l,x as m,L as n,A as o,C as p,F as r,k as s,R as t,E as u};