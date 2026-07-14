import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{b as t,q as n,vt as r}from"./dist-UmdHoCqG.js";import{m as i,n as a,t as o}from"./vendor-emotion-Cfw8XpNY.js";import{Zt as s}from"./vendor-mui-D7wxsaM1.js";var c=e(i(),1),l=(e,t,n)=>(0,c.useMemo)(()=>{let e=o`
      width: auto;
      object-fit: contain;
      display: block;
    `,t=o`
      height: 32px;
      max-width: 120px;
    `,r=o`
      height: 48px;
      max-width: 180px;
    `,i=o`
      height: 64px;
      max-width: 240px;
    `;return{large:i,logo:e,medium:r,size:{large:i,medium:r,small:t}[n],small:t}},[e,t,n]),u=s(),d=({className:e,src:i,alt:o,title:s,size:c=`medium`})=>{let{theme:d,colorScheme:f}=t(),p=l(d,f,c),m=d.images?.logo,h=i||m?.url,g=o||m?.alt||`Logo`,_=s||m?.title;return h?(0,u.jsx)(`img`,{src:h,alt:g,title:_,className:a(r(n(`logo`)),r(n(`logo`,c)),p.logo,p.size,e)}):null},f=(e,t)=>(0,c.useMemo)(()=>{let t=o`
      min-width: 420px;
      margin: 0 auto;
      font-family: ${e.vars.typography.fontFamily};
    `,n=o`
      background: ${e.vars.colors.background.surface};
      border-radius: ${e.vars.borderRadius.large};
      gap: calc(${e.vars.spacing.unit} * 2);
      min-width: 420px;
    `,r=o`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `,i=o`
      gap: 0;
      align-items: center;
    `,a=o`
      margin: 0 0 calc(${e.vars.spacing.unit} * 1) 0;
      color: ${e.vars.colors.text.primary};
    `,s=o`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
      color: ${e.vars.colors.text.secondary};
    `,c=o`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
    `,l=o`
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `,u=o`
      display: flex;
      flex-direction: column;
      gap: calc(${e.vars.spacing.unit} * 2);
    `,d=o`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: calc(${e.vars.spacing.unit} * 4);
    `,f=o`
      margin-top: calc(${e.vars.spacing.unit} * 2);
      color: ${e.vars.colors.text.secondary};
    `,p=o`
      margin: calc(${e.vars.spacing.unit} * 1) 0;
    `,m=o`
      text-align: center;
      padding: calc(${e.vars.spacing.unit} * 4);
    `,h=o`
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `,g=o`
      margin-top: calc(${e.vars.spacing.unit} * 1);
      color: ${e.vars.colors.text.secondary};
    `,_=o`
      display: flex;
      flex-direction: column;
      gap: calc(${e.vars.spacing.unit} * 2);
    `,v=o`
      margin: calc(${e.vars.spacing.unit} * 1) 0;
    `,y=o`
      display: flex;
      flex-direction: column;
      gap: calc(${e.vars.spacing.unit} * 1);
    `,b=o`
      width: 100%;
    `,x=o`
      background: ${e.vars.colors.background.surface};
      border-radius: ${e.vars.borderRadius.large};
      padding: calc(${e.vars.spacing.unit} * 2);
    `,S=o`
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `,C=o`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
    `,w=o`
      margin-bottom: calc(${e.vars.spacing.unit} * 2);
    `;return{authenticatorItem:b,authenticatorSection:y,card:n,centeredContainer:m,contentContainer:u,divider:p,errorAlert:S,errorContainer:l,flowMessageItem:o`
      margin-bottom: calc(${e.vars.spacing.unit} * 1);
    `,flowMessagesContainer:w,form:_,formDivider:v,header:i,loadingContainer:d,loadingText:f,logoContainer:r,messageItem:c,messagesAlert:C,noAuthenticatorCard:x,passkeyContainer:h,passkeyText:g,signUp:t,subtitle:s,title:a}},[e.vars.colors.background.surface,e.vars.colors.text.primary,e.vars.colors.text.secondary,e.vars.borderRadius.large,e.vars.spacing.unit,e.vars.typography.fontFamily,t]),p=(e,t,n,r,i)=>{let a=null,o=null,s=e=>{for(let t of e){if(t.type===`TEXT`&&t.variant?.startsWith(`HEADING_`)){if(!a)a=t;else if(!o){o=t;break}}if(t.components&&t.components.length>0&&(s(t.components),a&&o))break}},c=e=>{let t=0,n=e=>e.reduce((e,r)=>{if(t<2&&r.type===`TEXT`&&r.variant?.startsWith(`HEADING_`))return t+=1,e;if(r.components&&r.components.length>0){let t=n(r.components);t.length>0&&e.push({...r,components:t})}else e.push(r);return e},[]);return n(e)},l=e=>e&&e.label||``;s(e);let u=l(a),d=l(o);return{componentsWithoutHeadings:c(e),headingComponents:{heading:a,subheading:o},subtitle:n||d||i||``,title:t||u||r||``}};export{f as n,d as r,p as t};