(window.webpackJsonp=window.webpackJsonp||[]).push([["5f98"],{"2yMD":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/CatererLogin",function(){var e=n("LvJl");return{page:e.default||e}}])},DHlL:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e){return{__html:e}};t.default=a},FmXa:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e){return Array.isArray(e)?"[".concat(e.map(function(e){return'"'.concat(e,'"')}),"]"):'"'.concat(e,'"')};t.default=a},Kh8m:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.courseName,n=e.description,r=e.providerName,l=e.providerUrl,c='{\n    "@context": "http://schema.org",\n    "@type": "Course",\n    "name": "'.concat(t,'",\n    "description": "').concat(n,'",\n    "provider": {\n      "@type": "Organization",\n      "name": "').concat(r,'"').concat(l?',\n      "sameAs": "'.concat(l,'"'):"","\n    }\n  }");return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(c),key:"jsonld-course"}))};c.defaultProps={providerUrl:null},c.propTypes={courseName:r.default.string.isRequired,providerName:r.default.string.isRequired,providerUrl:r.default.string,description:r.default.string.isRequired};var u=c;t.default=u},L3zb:function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("BRRx"),i=n("tEjU"),l=n("q1tI"),c=n.n(l),u=n("17x9"),s=n.n(u),d=n("TSYQ"),p=n.n(d),f=n("33Jr"),m={children:s.a.node,type:s.a.string,size:s.a.string,bsSize:s.a.string,valid:s.a.bool,invalid:s.a.bool,tag:f.p,innerRef:s.a.oneOfType([s.a.object,s.a.func,s.a.string]),plaintext:s.a.bool,addon:s.a.bool,className:s.a.string,cssModule:s.a.object},g=function(e){function t(t){var n;return(n=e.call(this,t)||this).getRef=n.getRef.bind(Object(o.a)(n)),n.focus=n.focus.bind(Object(o.a)(n)),n}Object(i.a)(t,e);var n=t.prototype;return n.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},n.focus=function(){this.ref&&this.ref.focus()},n.render=function(){var e=this.props,t=e.className,n=e.cssModule,o=e.type,i=e.bsSize,l=e.valid,u=e.invalid,s=e.tag,d=e.addon,m=e.plaintext,g=e.innerRef,h=Object(r.a)(e,["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"]),y=["radio","checkbox"].indexOf(o)>-1,b=new RegExp("\\D","g"),v=s||("select"===o||"textarea"===o?o:"input"),E="form-control";m?(E+="-plaintext",v=s||"input"):"file"===o?E+="-file":y&&(E=d?null:"form-check-input"),h.size&&b.test(h.size)&&(Object(f.r)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),i=h.size,delete h.size);var k=Object(f.l)(p()(t,u&&"is-invalid",l&&"is-valid",!!i&&"form-control-"+i,E),n);return("input"===v||s&&"function"==typeof s)&&(h.type=o),h.children&&!m&&"select"!==o&&"string"==typeof v&&"select"!==v&&(Object(f.r)('Input with a type of "'+o+'" cannot have children. Please use "value"/"defaultValue" instead.'),delete h.children),c.a.createElement(v,Object(a.a)({},h,{ref:g,className:k}))},t}(c.a.Component);g.propTypes=m,g.defaultProps={type:"text"},t.a=g},LvJl:function(e,t,n){"use strict";n.r(t);var a=n("0iUn"),r=n("sLSF"),o=n("MI3g"),i=n("a7VT"),l=n("AT/M"),c=n("Tit0"),u=n("q1tI"),s=n.n(u),d=(n("YFqc"),n("m/Pd"),n("nOHt"),n("1Yj4")),p=n("ok1R"),f=n("rhny"),m=n("BLzl"),g=n("/kxI"),h=n("uBiN"),y=n("q7Gj"),b=n("re1l"),v=n("Z+s4"),E=n("L3zb"),k=n("sOKU"),O=n("6yR0"),j=n("8lYe"),R=n("5Yp1"),w=n("erEE"),P=n.n(w),_=function(e){function t(e){var n;return Object(a.default)(this,t),(n=Object(o.default)(this,Object(i.default)(t).call(this,e))).login=function(e){e.preventDefault(),window.location.assign("https://foodiebeecaterer.herokuapp.com")},n.handleEmailChange=n.handleEmailChange.bind(Object(l.default)(n)),n.handlePasswordChange=n.handlePasswordChange.bind(Object(l.default)(n)),n.state={useremail:"",userpassword:""},n}return Object(c.default)(t,e),Object(r.default)(t,[{key:"handleEmailChange",value:function(e){this.setState({useremail:e.target.value})}},{key:"handlePasswordChange",value:function(e){this.setState({userpassword:e.target.value})}},{key:"render",value:function(){var e=this;return s.a.createElement(R.a,{title:"Caterer Login"},s.a.createElement(P.a,{config:{title:"Caterer Login | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers"}}),s.a.createElement("div",{style:{backgroundColor:"white"}},s.a.createElement(O.a,{signInHide:!0}),s.a.createElement("div",{className:"app justify-content-center align-items-center"},s.a.createElement(d.a,null,s.a.createElement(p.a,{style:{marginTop:20,flex:1,display:"flex"},className:"justify-content-center"},s.a.createElement(f.a,{xs:"12",md:"6"},s.a.createElement(m.a,{style:{boxShadow:"1px 1px 3px #9E9E9E"},className:"p-4"},s.a.createElement(g.a,{className:"text-center"},s.a.createElement(h.a,null,s.a.createElement("h2",null,"Caterer Login"),s.a.createElement("p",{style:{marginBottom:20},className:"text-muted text-center"},"Sign In to your caterer's account"),s.a.createElement(y.a,{className:"mb-3"},s.a.createElement(b.a,{addonType:"prepend"},s.a.createElement(v.a,null,"@")),s.a.createElement(E.a,{value:this.state.useremail,onChange:function(t){return e.handleEmailChange(t)},type:"text",placeholder:"Email",autoComplete:"email"})),s.a.createElement(y.a,{className:"mb-4"},s.a.createElement(b.a,{addonType:"prepend"},s.a.createElement(v.a,null,s.a.createElement("a",{style:{color:"gray",marginLeft:2.5,marginRight:2.5},className:"fa fa-lock"}))),s.a.createElement(E.a,{value:this.state.userpassword,onChange:function(t){return e.handlePasswordChange(t)},type:"password",placeholder:"Password",autoComplete:"current-password"})),s.a.createElement(p.a,null,s.a.createElement(f.a,{xs:"6",md:"6"},s.a.createElement(k.a,{style:{backgroundColor:"#20a8d8"},onClick:function(t){return e.login(t)},color:"primary",className:"px-4"},"Login")),s.a.createElement(f.a,{xs:"6",md:"6"},s.a.createElement(k.a,{style:{boxShadow:"none",background:"none",fontWeight:"500"},color:"link",className:"px-4"},"Forgot password?")))))))))),s.a.createElement(j.a,null)))}}]),t}(u.Component);t.default=_},NMoU:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.url,n=e.title,r=e.images,l=void 0===r?[]:r,c=e.datePublished,u=e.dateModified,s=void 0===u?null:u,d=e.authorName,p=e.description,f='{\n    "@context": "http://schema.org",\n    "@type": "Blog",\n    "mainEntityOfPage": {\n      "@type": "WebPage",\n      "@id": "'.concat(t,'"\n    },\n    "headline": "').concat(n,'",\n    "image": [\n      ').concat(l.map(function(e){return'"'.concat(e,'"')}),'\n     ],\n    "datePublished": "').concat(c,'",\n    "dateModified": "').concat(s||c,'",\n    "author": {\n      "@type": "Person",\n      "name": "').concat(d,'"\n    },\n    "description": "').concat(p,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(f),key:"jsonld-blog"}))};c.defaultProps={dateModified:null},c.propTypes={url:r.default.string.isRequired,title:r.default.string.isRequired,images:r.default.array.isRequired,datePublished:r.default.string.isRequired,dateModified:r.default.string,authorName:r.default.string.isRequired,description:r.default.string.isRequired};var u=c;t.default=u},OgNi:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("q1tI")),r=c(n("17x9")),o=c(n("m/Pd")),i=c(n("DHlL")),l=c(n("FmXa"));function c(e){return e&&e.__esModule?e:{default:e}}var u=function(e){var t=e.type,n=e.id,r=e.name,c=e.description,u=e.url,s=e.telephone,d=e.address,p=e.geo,f=e.images,m='{\n    "@context": "http://schema.org",\n    "@type": "'.concat(t,'",\n    "@id": "').concat(n,'",\n    ').concat(c?'"description": "'.concat(c,'",'):"","\n    ").concat(u?'"url": "'.concat(u,'",'):"","\n    ").concat(s?'"telephone": "'.concat(s,'",'):"","\n    ").concat(function(e){return'\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "'.concat(e.streetAddress,'",\n    "addressLocality": "').concat(e.addressLocality,'",\n    ').concat(e.addressRegion?'"addressRegion": "'.concat(e.addressRegion,'",'):"",'\n    "postalCode": "').concat(e.postalCode,'",\n    "addressCountry": "').concat(e.addressCountry,'"\n  },\n')}(d),"\n    ").concat(p?"".concat(function(e){return'\n  "geo": {\n    "@type": "GeoCoordinates",\n    "latitude": "'.concat(e.latitude,'",\n    "longitude": "').concat(e.longitude,'"\n  },\n')}(p)):"",'\n    "image":').concat((0,l.default)(f),',\n    "name": "').concat(r,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(m),key:"jsonld-local-business"}))};u.defaultProps={type:"LocalBusiness",description:null,url:null,telephone:null,images:[],geo:null},u.propTypes={type:r.default.string,id:r.default.string.isRequired,name:r.default.string.isRequired,description:r.default.string,url:r.default.string,telephone:r.default.string,address:r.default.shape({streetAddress:r.default.string.isRequired,addressLocality:r.default.string.isRequired,addressRegion:r.default.string,postalCode:r.default.string.isRequired,addressCountry:r.default.string.isRequired}).isRequired,geo:r.default.shape({latitude:r.default.string.isRequired,longitude:r.default.string.isRequired}),images:r.default.oneOfType([r.default.arrayOf(r.default.string),r.default.string])};var s=u;t.default=s},TtSx:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.type,n=e.name,r=e.url,l=e.sameAs,c=void 0===l?[]:l,u='{\n    "@context": "http://schema.org",\n    "@type": "'.concat(t,'",\n    "name": "').concat(n,'",\n    "url": "').concat(r,'",\n    "sameAs": [\n      ').concat(c.map(function(e){return'"'.concat(e,'"')}),"\n     ]\n  }");return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(u),key:"jsonld-social"}))};c.propTypes={type:r.default.string.isRequired,name:r.default.string.isRequired,url:r.default.string.isRequired,sameAs:r.default.array.isRequired};var u=c;t.default=u},"Z+s4":function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("q1tI"),i=n.n(o),l=n("17x9"),c=n.n(l),u=n("TSYQ"),s=n.n(u),d=n("33Jr"),p={tag:d.p,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,n=e.cssModule,o=e.tag,l=Object(r.a)(e,["className","cssModule","tag"]),c=Object(d.l)(s()(t,"input-group-text"),n);return i.a.createElement(o,Object(a.a)({},l,{className:c}))};f.propTypes=p,f.defaultProps={tag:"span"},t.a=f},dESq:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("q1tI")),r=c(n("17x9")),o=c(n("m/Pd")),i=c(n("DHlL")),l=c(n("FmXa"));function c(e){return e&&e.__esModule?e:{default:e}}var u=function(e){var t=e.url,n=e.logo,r=e.contactPoint,c=void 0===r?[]:r,u='{\n    "@context": "https://schema.org",\n    "@type": "Organization",\n    "url": "'.concat(t,'",\n    ').concat(n?'"logo": "'.concat(n,'",'):"",'\n    "contactPoint": [').concat(function(e){return e.map(function(e){return'{\n    "@type": "ContactPoint",\n    "telephone": "'.concat(e.telephone,'",\n    "contactType": "').concat(e.contactType,'"').concat(e.areaServed?',\n    "areaServed": '.concat((0,l.default)(e.areaServed)):"").concat(e.availableLanguage?',\n    "availableLanguage": '.concat((0,l.default)(e.availableLanguage)):"").concat(e.contactOption?',\n    "contactOption": "'.concat(e.contactOption,'"'):"","\n    }")})}(c),"]\n  }");return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(u),key:"jsonld-corporate-contact"}))};u.defaultProps={logo:null},u.propTypes={logo:r.default.string,url:r.default.string.isRequired,contactPoint:r.default.arrayOf(r.default.shape({telephone:r.default.string.isRequired,contactType:r.default.string.isRequired,areaServed:r.default.oneOfType([r.default.string,r.default.array]),availableLanguage:r.default.oneOfType([r.default.string,r.default.array]),contactOption:r.default.string})).isRequired};var s=u;t.default=s},erEE:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ArticleJsonLd",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"BreadcrumbJsonLd",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"BlogJsonLd",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"CourseJsonLd",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"LocalBusinessJsonLd",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"LogoJsonLd",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"ProductJsonLd",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"SocialProfileJsonLd",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"CorporateContactJsonLd",{enumerable:!0,get:function(){return p.default}}),t.default=void 0;var a=f(n("zrE3")),r=f(n("wQvz")),o=f(n("uSNX")),i=f(n("NMoU")),l=f(n("Kh8m")),c=f(n("OgNi")),u=f(n("pjlW")),s=f(n("s3TM")),d=f(n("TtSx")),p=f(n("dESq"));function f(e){return e&&e.__esModule?e:{default:e}}var m=a.default;t.default=m},pjlW:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.url,n=e.logo,r='{\n    "@context": "http://schema.org",\n    "@type": "Organization",\n    "url": "'.concat(t,'",\n    "logo": "').concat(n,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(r),key:"jsonld-logo"}))};c.propTypes={url:r.default.string.isRequired,logo:r.default.string.isRequired};var u=c;t.default=u},q7Gj:function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("q1tI"),i=n.n(o),l=n("17x9"),c=n.n(l),u=n("TSYQ"),s=n.n(u),d=n("33Jr"),p={tag:d.p,size:c.a.string,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,n=e.cssModule,o=e.tag,l=e.size,c=Object(r.a)(e,["className","cssModule","tag","size"]),u=Object(d.l)(s()(t,"input-group",l?"input-group-"+l:null),n);return i.a.createElement(o,Object(a.a)({},c,{className:u}))};f.propTypes=p,f.defaultProps={tag:"div"},t.a=f},re1l:function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("q1tI"),i=n.n(o),l=n("17x9"),c=n.n(l),u=n("TSYQ"),s=n.n(u),d=n("33Jr"),p=n("Z+s4"),f={tag:d.p,addonType:c.a.oneOf(["prepend","append"]).isRequired,children:c.a.node,className:c.a.string,cssModule:c.a.object},m=function(e){var t=e.className,n=e.cssModule,o=e.tag,l=e.addonType,c=e.children,u=Object(r.a)(e,["className","cssModule","tag","addonType","children"]),f=Object(d.l)(s()(t,"input-group-"+l),n);return"string"==typeof c?i.a.createElement(o,Object(a.a)({},u,{className:f}),i.a.createElement(p.a,{children:c})):i.a.createElement(o,Object(a.a)({},u,{className:f,children:c}))};m.propTypes=f,m.defaultProps={tag:"div"},t.a=m},s3TM:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("q1tI")),r=c(n("17x9")),o=c(n("m/Pd")),i=c(n("DHlL")),l=c(n("FmXa"));function c(e){return e&&e.__esModule?e:{default:e}}var u=function(e){var t=e.productName,n=e.images,r=void 0===n?[]:n,c=e.description,u=e.sku,s=e.gtin8,d=e.gtin13,p=e.gtin14,f=e.mpn,m=e.brand,g=e.reviews,h=void 0===g?[]:g,y=e.aggregateRating,b=e.offers,v='{\n    "@context": "http://schema.org/",\n    "@type": "Product",\n    "image":'.concat((0,l.default)(r),",\n    ").concat(c?'"description": "'.concat(c,'",'):"","\n    ").concat(f?'"mpn": "'.concat(f,'",'):"","\n    ").concat(u?'"sku": "'.concat(u,'",'):"","\n    ").concat(s?'"gtin8": "'.concat(s,'",'):"","\n    ").concat(d?'"gtin13": "'.concat(d,'",'):"","\n    ").concat(p?'"gtin14": "'.concat(p,'",'):"","\n    ").concat(m?function(e){return'\n  "brand": {\n      "@type": "Thing",\n      "name": "'.concat(e,'"\n    },\n')}(m):"","\n    ").concat(h.length?function(e){return'\n"review": [\n  '.concat(e.map(function(e){return'{\n      "@type": "Review",\n      '.concat(e.datePublished?'"datePublished": "'.concat(e.datePublished,'",'):"","\n      ").concat(e.reviewBody?'"reviewBody": "'.concat(e.reviewBody,'",'):"","\n      ").concat(e.name?'"name": "'.concat(e.name,'",'):"","\n      ").concat(function(e){return e?'"reviewRating": {\n          "@type": "Rating",\n          '.concat(e.bestRating?'"bestRating": "'.concat(e.bestRating,'",'):"","\n          ").concat(e.worstRating?'"worstRating": "'.concat(e.worstRating,'",'):"",'\n          "ratingValue": "').concat(e.ratingValue,'"\n        },'):""}(e.reviewRating),'\n      "author": "').concat(e.author,'"\n  }')}),"],")}(h):"","\n    ").concat(y?function(e){return'\n  "aggregateRating": {\n      "@type": "AggregateRating",\n      "ratingValue": "'.concat(e.ratingValue,'",\n      "reviewCount": "').concat(e.reviewCount,'"\n    },\n')}(y):"","\n    ").concat(b?function(e){return'\n  "offers": {\n    "@type": "Offer",\n    "priceCurrency": "'.concat(e.priceCurrency,'",\n    ').concat(e.priceValidUntil?'"priceValidUntil": "'.concat(e.priceValidUntil,'",'):"","\n    ").concat(e.itemCondition?'"itemCondition": "'.concat(e.itemCondition,'",'):"","\n    ").concat(e.availability?'"availability": "'.concat(e.availability,'",'):"","\n    ").concat(e.seller?'\n      "seller": {\n      "@type": "Organization",\n      "name": "'.concat(e.seller.name,'"\n    },\n    '):"",'\n    "price": "').concat(e.price,'"\n  },\n')}(b):"",'\n    "name": "').concat(t,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(v),key:"jsonld-product"}))};u.defaultProps={images:[],description:null,brand:null,reviews:[],aggregateRating:null,offers:null,sku:null,gtin8:null,gtin13:null,gtin14:null,mpn:null},u.propTypes={productName:r.default.string.isRequired,images:r.default.oneOfType([r.default.arrayOf(r.default.string),r.default.string]),description:r.default.string,brand:r.default.string,reviews:r.default.arrayOf(r.default.shape({author:r.default.string.isRequired,datePublished:r.default.string,reviewBody:r.default.string,name:r.default.string,reviewRating:r.default.shape({bestRating:r.default.string,ratingValue:r.default.string.isRequired,worstRating:r.default.string})})),aggregateRating:r.default.shape({ratingValue:r.default.string.isRequired,reviewCount:r.default.string.isRequired}),offers:r.default.shape({price:r.default.string.isRequired,priceCurrency:r.default.string.isRequired,priceValidUntil:r.default.string,itemCondition:r.default.string,availability:r.default.string,seller:r.default.shape({name:r.default.string.isRequired})}),sku:r.default.string,gtin8:r.default.string,gtin13:r.default.string,gtin14:r.default.string,mpn:r.default.string};var s=u;t.default=s},uBiN:function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("BRRx"),i=n("tEjU"),l=n("q1tI"),c=n.n(l),u=n("17x9"),s=n.n(u),d=n("TSYQ"),p=n.n(d),f=n("33Jr"),m={children:s.a.node,inline:s.a.bool,tag:f.p,innerRef:s.a.oneOfType([s.a.object,s.a.func,s.a.string]),className:s.a.string,cssModule:s.a.object},g=function(e){function t(t){var n;return(n=e.call(this,t)||this).getRef=n.getRef.bind(Object(o.a)(n)),n.submit=n.submit.bind(Object(o.a)(n)),n}Object(i.a)(t,e);var n=t.prototype;return n.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},n.submit=function(){this.ref&&this.ref.submit()},n.render=function(){var e=this.props,t=e.className,n=e.cssModule,o=e.inline,i=e.tag,l=e.innerRef,u=Object(r.a)(e,["className","cssModule","inline","tag","innerRef"]),s=Object(f.l)(p()(t,!!o&&"form-inline"),n);return c.a.createElement(i,Object(a.a)({},u,{ref:l,className:s}))},t}(l.Component);g.propTypes=m,g.defaultProps={tag:"form"},t.a=g},uSNX:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.itemListElements,n='{\n    "@context": "http://schema.org",\n    "@type": "BreadcrumbList",\n    "itemListElement": [\n      '.concat((void 0===t?[]:t).map(function(e){return'{\n        "@type": "ListItem",\n        "position": '.concat(e.position,',\n        "name": "').concat(e.name,'",\n        "item": "').concat(e.item,'"\n      }')}),"\n     ]\n  }");return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(n),key:"jsonld-breadcrumb"}))};c.propTypes={itemListElements:r.default.arrayOf(r.default.shape({position:r.default.number.isRequired,name:r.default.string.isRequired,item:r.default.string.isRequired})).isRequired};var u=c;t.default=u},wQvz:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.url,n=e.title,r=e.images,l=void 0===r?[]:r,c=e.datePublished,u=e.dateModified,s=void 0===u?null:u,d=e.authorName,p=e.description,f=e.publisherName,m=e.publisherLogo,g='{\n    "@context": "http://schema.org",\n    "@type": "Article",\n    "mainEntityOfPage": {\n      "@type": "WebPage",\n      "@id": "'.concat(t,'"\n    },\n    "headline": "').concat(n,'",\n    "image": [\n      ').concat(l.map(function(e){return'"'.concat(e,'"')}),'\n     ],\n    "datePublished": "').concat(c,'",\n    "dateModified": "').concat(s||c,'",\n    "author": {\n      "@type": "Person",\n      "name": "').concat(d,'"\n    },\n    "publisher": {\n      "@type": "Organization",\n      "name": "').concat(f,'",\n      "logo": {\n        "@type": "ImageObject",\n        "url": "').concat(m,'"\n      }\n    },\n    "description": "').concat(p,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(g),key:"jsonld-article"}))};c.defaultProps={dateModified:null},c.propTypes={url:r.default.string.isRequired,title:r.default.string.isRequired,images:r.default.array.isRequired,datePublished:r.default.string.isRequired,dateModified:r.default.string,authorName:r.default.string.isRequired,publisherName:r.default.string.isRequired,publisherLogo:r.default.string.isRequired,description:r.default.string.isRequired};var u=c;t.default=u},zMgs:function(e,t,n){"use strict";var a,r=(a=n("q1tI"))&&a.__esModule?a:{default:a};Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={templateTitle:null,noindex:!1,openGraph:{defaultImageHeight:null,defaultImageWidth:null}},i=function(e){var t=[];if(e.titleTemplate&&(o.templateTitle=e.titleTemplate),e.title){var n=e.title;o.templateTitle&&(n=o.templateTitle.replace(/%s/g,function(){return n})),t.push(r.default.createElement("title",{key:"title"},n))}if(!1===e.noindex?(t.push(r.default.createElement("meta",{key:"robots",name:"robots",content:"index,follow"})),t.push(r.default.createElement("meta",{key:"googlebot",name:"googlebot",content:"index,follow"}))):e.noindex||o.noindex||e.dangerouslySetAllPagesToNoIndex?(e.dangerouslySetAllPagesToNoIndex&&(o.noindex=!0),t.push(r.default.createElement("meta",{key:"robots",name:"robots",content:"noindex,nofollow"})),t.push(r.default.createElement("meta",{key:"googlebot",name:"googlebot",content:"noindex,nofollow"}))):(t.push(r.default.createElement("meta",{key:"robots",name:"robots",content:"index,follow"})),t.push(r.default.createElement("meta",{key:"googlebot",name:"googlebot",content:"index,follow"}))),e.description&&t.push(r.default.createElement("meta",{key:"description",name:"description",content:e.description})),e.hasOwnProperty("twitter")&&(e.twitter.cardType&&t.push(r.default.createElement("meta",{key:"twitter:card",name:"twitter:card",content:e.twitter.cardType})),e.twitter.site&&t.push(r.default.createElement("meta",{key:"twitter:site",name:"twitter:site",content:e.twitter.site})),e.twitter.handle&&t.push(r.default.createElement("meta",{key:"twitter:creator",name:"twitter:creator",content:e.twitter.handle}))),e.hasOwnProperty("facebook")&&e.facebook.appId&&t.push(r.default.createElement("meta",{key:"fb:app_id",property:"fb:app_id",content:e.facebook.appId})),e.hasOwnProperty("openGraph")){if(e.openGraph.url&&t.push(r.default.createElement("meta",{key:"og:url",property:"og:url",content:e.openGraph.url})),e.openGraph.type){var a=e.openGraph.type.toLowerCase();t.push(r.default.createElement("meta",{key:"og:type",property:"og:type",content:a})),"profile"===a&&e.openGraph.profile?(e.openGraph.profile.firstName&&t.push(r.default.createElement("meta",{key:"profile:first_name",property:"profile:first_name",content:e.openGraph.profile.firstName})),e.openGraph.profile.lastName&&t.push(r.default.createElement("meta",{key:"profile:last_name",property:"profile:last_name",content:e.openGraph.profile.lastName})),e.openGraph.profile.username&&t.push(r.default.createElement("meta",{key:"profile:username",property:"profile:username",content:e.openGraph.profile.username})),e.openGraph.profile.gender&&t.push(r.default.createElement("meta",{key:"profile:gender",property:"profile:gender",content:e.openGraph.profile.gender}))):"book"===a&&e.openGraph.book?(e.openGraph.book.authors&&e.openGraph.book.authors.length&&e.openGraph.book.authors.forEach(function(e,n){t.push(r.default.createElement("meta",{key:"book:author:0".concat(n),property:"book:author",content:e}))}),e.openGraph.book.isbn&&t.push(r.default.createElement("meta",{key:"book:isbn",property:"book:isbn",content:e.openGraph.book.isbn})),e.openGraph.book.releaseDate&&t.push(r.default.createElement("meta",{key:"book:release_date",property:"book:release_date",content:e.openGraph.book.releaseDate})),e.openGraph.book.tags&&e.openGraph.book.tags.length&&e.openGraph.book.tags.forEach(function(e,n){t.push(r.default.createElement("meta",{key:"book:tag:0".concat(n),property:"book:tag",content:e}))})):"article"===a&&e.openGraph.article&&(e.openGraph.article.publishedTime&&t.push(r.default.createElement("meta",{key:"article:published_time",property:"article:published_time",content:e.openGraph.article.publishedTime})),e.openGraph.article.modifiedTime&&t.push(r.default.createElement("meta",{key:"article:modified_time",property:"article:modified_time",content:e.openGraph.article.modifiedTime})),e.openGraph.article.expirationTime&&t.push(r.default.createElement("meta",{key:"article:expiration_time",property:"article:expiration_time",content:e.openGraph.article.expirationTime})),e.openGraph.article.authors&&e.openGraph.article.authors.length&&e.openGraph.article.authors.forEach(function(e,n){t.push(r.default.createElement("meta",{key:"article:author:0".concat(n),property:"article:author",content:e}))}),e.openGraph.article.section&&t.push(r.default.createElement("meta",{key:"article:section",property:"article:section",content:e.openGraph.article.section})),e.openGraph.article.tags&&e.openGraph.article.tags.length&&e.openGraph.article.tags.forEach(function(e,n){t.push(r.default.createElement("meta",{key:"article:tag:0".concat(n),property:"article:tag",content:e}))}))}e.openGraph.title&&t.push(r.default.createElement("meta",{key:"og:title",property:"og:title",content:e.openGraph.title})),e.openGraph.description&&t.push(r.default.createElement("meta",{key:"og:description",property:"og:description",content:e.openGraph.description})),e.openGraph.images&&e.openGraph.images.length&&e.openGraph.images.forEach(function(n,a){t.push(r.default.createElement("meta",{key:"og:image:0".concat(a),property:"og:image",content:n.url})),n.alt&&t.push(r.default.createElement("meta",{key:"og:image:alt0".concat(a),property:"og:image:alt",content:n.alt})),n.width?t.push(r.default.createElement("meta",{key:"og:image:width0".concat(a),property:"og:image:width",content:n.width})):(o.openGraph.defaultImageWidth||e.openGraph.defaultImageWidth)&&(e.openGraph.defaultImageWidth&&(o.openGraph.defaultImageWidth=e.openGraph.defaultImageWidth),t.push(r.default.createElement("meta",{key:"og:image:width0".concat(a),property:"og:image:width",content:o.openGraph.defaultImageWidth}))),n.height?t.push(r.default.createElement("meta",{key:"og:image:height".concat(a),property:"og:image:height",content:n.height})):(o.openGraph.defaultImageHeight||e.openGraph.defaultImageHeight)&&(e.openGraph.defaultImageHeight&&(o.openGraph.defaultImageHeight=e.openGraph.defaultImageHeight),t.push(r.default.createElement("meta",{key:"og:image:height".concat(a),property:"og:image:height",content:o.openGraph.defaultImageHeight})))}),e.openGraph.locale&&t.push(r.default.createElement("meta",{key:"og:locale",property:"og:locale",content:e.openGraph.locale})),e.openGraph.site_name&&t.push(r.default.createElement("meta",{key:"og:site_name",property:"og:site_name",content:e.openGraph.site_name}))}return e.canonical&&t.push(r.default.createElement("link",{rel:"canonical",href:e.canonical,key:"canonical"})),t};t.default=i},zrE3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("m/Pd")),r=l(n("17x9")),o=l(n("q1tI")),i=l(n("zMgs"));function l(e){return e&&e.__esModule?e:{default:e}}function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n,a=0;a<t.length;a++)(n=t[a]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}function s(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=function(e){function t(e){var n;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=s(this,d(t).call(this,e)),!e.config)throw new Error("[next-seo] You must supply an SEO configuration");return n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,o.default.Component),function(e,t,n){t&&u(e.prototype,t),n&&u(e,n)}(t,[{key:"render",value:function(){var e=this.props.config;return o.default.createElement(a.default,null,(0,i.default)(e))}}]),t}();f.propTypes={config:r.default.object.isRequired};var m=f;t.default=m}},[["2yMD","5d41","9da1","ad9d"]]]);