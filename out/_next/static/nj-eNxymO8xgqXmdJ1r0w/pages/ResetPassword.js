(window.webpackJsonp=window.webpackJsonp||[]).push([["5782"],{DHlL:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e){return{__html:e}};t.default=a},FmXa:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e){return Array.isArray(e)?"[".concat(e.map(function(e){return'"'.concat(e,'"')}),"]"):'"'.concat(e,'"')};t.default=a},Kh8m:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.courseName,n=e.description,r=e.providerName,l=e.providerUrl,c='{\n    "@context": "http://schema.org",\n    "@type": "Course",\n    "name": "'.concat(t,'",\n    "description": "').concat(n,'",\n    "provider": {\n      "@type": "Organization",\n      "name": "').concat(r,'"').concat(l?',\n      "sameAs": "'.concat(l,'"'):"","\n    }\n  }");return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(c),key:"jsonld-course"}))};c.defaultProps={providerUrl:null},c.propTypes={courseName:r.default.string.isRequired,providerName:r.default.string.isRequired,providerUrl:r.default.string,description:r.default.string.isRequired};var s=c;t.default=s},L3zb:function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("BRRx"),i=n("tEjU"),l=n("q1tI"),c=n.n(l),s=n("17x9"),u=n.n(s),d=n("TSYQ"),p=n.n(d),f=n("33Jr"),m={children:u.a.node,type:u.a.string,size:u.a.string,bsSize:u.a.string,valid:u.a.bool,invalid:u.a.bool,tag:f.p,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),plaintext:u.a.bool,addon:u.a.bool,className:u.a.string,cssModule:u.a.object},g=function(e){function t(t){var n;return(n=e.call(this,t)||this).getRef=n.getRef.bind(Object(o.a)(n)),n.focus=n.focus.bind(Object(o.a)(n)),n}Object(i.a)(t,e);var n=t.prototype;return n.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},n.focus=function(){this.ref&&this.ref.focus()},n.render=function(){var e=this.props,t=e.className,n=e.cssModule,o=e.type,i=e.bsSize,l=e.valid,s=e.invalid,u=e.tag,d=e.addon,m=e.plaintext,g=e.innerRef,h=Object(r.a)(e,["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"]),y=["radio","checkbox"].indexOf(o)>-1,b=new RegExp("\\D","g"),v=u||("select"===o||"textarea"===o?o:"input"),E="form-control";m?(E+="-plaintext",v=u||"input"):"file"===o?E+="-file":y&&(E=d?null:"form-check-input"),h.size&&b.test(h.size)&&(Object(f.r)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),i=h.size,delete h.size);var w=Object(f.l)(p()(t,s&&"is-invalid",l&&"is-valid",!!i&&"form-control-"+i,E),n);return("input"===v||u&&"function"==typeof u)&&(h.type=o),h.children&&!m&&"select"!==o&&"string"==typeof v&&"select"!==v&&(Object(f.r)('Input with a type of "'+o+'" cannot have children. Please use "value"/"defaultValue" instead.'),delete h.children),c.a.createElement(v,Object(a.a)({},h,{ref:g,className:w}))},t}(c.a.Component);g.propTypes=m,g.defaultProps={type:"text"},t.a=g},NMoU:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.url,n=e.title,r=e.images,l=void 0===r?[]:r,c=e.datePublished,s=e.dateModified,u=void 0===s?null:s,d=e.authorName,p=e.description,f='{\n    "@context": "http://schema.org",\n    "@type": "Blog",\n    "mainEntityOfPage": {\n      "@type": "WebPage",\n      "@id": "'.concat(t,'"\n    },\n    "headline": "').concat(n,'",\n    "image": [\n      ').concat(l.map(function(e){return'"'.concat(e,'"')}),'\n     ],\n    "datePublished": "').concat(c,'",\n    "dateModified": "').concat(u||c,'",\n    "author": {\n      "@type": "Person",\n      "name": "').concat(d,'"\n    },\n    "description": "').concat(p,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(f),key:"jsonld-blog"}))};c.defaultProps={dateModified:null},c.propTypes={url:r.default.string.isRequired,title:r.default.string.isRequired,images:r.default.array.isRequired,datePublished:r.default.string.isRequired,dateModified:r.default.string,authorName:r.default.string.isRequired,description:r.default.string.isRequired};var s=c;t.default=s},OgNi:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("q1tI")),r=c(n("17x9")),o=c(n("m/Pd")),i=c(n("DHlL")),l=c(n("FmXa"));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.type,n=e.id,r=e.name,c=e.description,s=e.url,u=e.telephone,d=e.address,p=e.geo,f=e.images,m='{\n    "@context": "http://schema.org",\n    "@type": "'.concat(t,'",\n    "@id": "').concat(n,'",\n    ').concat(c?'"description": "'.concat(c,'",'):"","\n    ").concat(s?'"url": "'.concat(s,'",'):"","\n    ").concat(u?'"telephone": "'.concat(u,'",'):"","\n    ").concat(function(e){return'\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "'.concat(e.streetAddress,'",\n    "addressLocality": "').concat(e.addressLocality,'",\n    ').concat(e.addressRegion?'"addressRegion": "'.concat(e.addressRegion,'",'):"",'\n    "postalCode": "').concat(e.postalCode,'",\n    "addressCountry": "').concat(e.addressCountry,'"\n  },\n')}(d),"\n    ").concat(p?"".concat(function(e){return'\n  "geo": {\n    "@type": "GeoCoordinates",\n    "latitude": "'.concat(e.latitude,'",\n    "longitude": "').concat(e.longitude,'"\n  },\n')}(p)):"",'\n    "image":').concat((0,l.default)(f),',\n    "name": "').concat(r,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(m),key:"jsonld-local-business"}))};s.defaultProps={type:"LocalBusiness",description:null,url:null,telephone:null,images:[],geo:null},s.propTypes={type:r.default.string,id:r.default.string.isRequired,name:r.default.string.isRequired,description:r.default.string,url:r.default.string,telephone:r.default.string,address:r.default.shape({streetAddress:r.default.string.isRequired,addressLocality:r.default.string.isRequired,addressRegion:r.default.string,postalCode:r.default.string.isRequired,addressCountry:r.default.string.isRequired}).isRequired,geo:r.default.shape({latitude:r.default.string.isRequired,longitude:r.default.string.isRequired}),images:r.default.oneOfType([r.default.arrayOf(r.default.string),r.default.string])};var u=s;t.default=u},TtSx:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.type,n=e.name,r=e.url,l=e.sameAs,c=void 0===l?[]:l,s='{\n    "@context": "http://schema.org",\n    "@type": "'.concat(t,'",\n    "name": "').concat(n,'",\n    "url": "').concat(r,'",\n    "sameAs": [\n      ').concat(c.map(function(e){return'"'.concat(e,'"')}),"\n     ]\n  }");return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(s),key:"jsonld-social"}))};c.propTypes={type:r.default.string.isRequired,name:r.default.string.isRequired,url:r.default.string.isRequired,sameAs:r.default.array.isRequired};var s=c;t.default=s},"Z+s4":function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("q1tI"),i=n.n(o),l=n("17x9"),c=n.n(l),s=n("TSYQ"),u=n.n(s),d=n("33Jr"),p={tag:d.p,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,n=e.cssModule,o=e.tag,l=Object(r.a)(e,["className","cssModule","tag"]),c=Object(d.l)(u()(t,"input-group-text"),n);return i.a.createElement(o,Object(a.a)({},l,{className:c}))};f.propTypes=p,f.defaultProps={tag:"span"},t.a=f},dESq:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("q1tI")),r=c(n("17x9")),o=c(n("m/Pd")),i=c(n("DHlL")),l=c(n("FmXa"));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.url,n=e.logo,r=e.contactPoint,c=void 0===r?[]:r,s='{\n    "@context": "https://schema.org",\n    "@type": "Organization",\n    "url": "'.concat(t,'",\n    ').concat(n?'"logo": "'.concat(n,'",'):"",'\n    "contactPoint": [').concat(function(e){return e.map(function(e){return'{\n    "@type": "ContactPoint",\n    "telephone": "'.concat(e.telephone,'",\n    "contactType": "').concat(e.contactType,'"').concat(e.areaServed?',\n    "areaServed": '.concat((0,l.default)(e.areaServed)):"").concat(e.availableLanguage?',\n    "availableLanguage": '.concat((0,l.default)(e.availableLanguage)):"").concat(e.contactOption?',\n    "contactOption": "'.concat(e.contactOption,'"'):"","\n    }")})}(c),"]\n  }");return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(s),key:"jsonld-corporate-contact"}))};s.defaultProps={logo:null},s.propTypes={logo:r.default.string,url:r.default.string.isRequired,contactPoint:r.default.arrayOf(r.default.shape({telephone:r.default.string.isRequired,contactType:r.default.string.isRequired,areaServed:r.default.oneOfType([r.default.string,r.default.array]),availableLanguage:r.default.oneOfType([r.default.string,r.default.array]),contactOption:r.default.string})).isRequired};var u=s;t.default=u},erEE:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ArticleJsonLd",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"BreadcrumbJsonLd",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"BlogJsonLd",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"CourseJsonLd",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"LocalBusinessJsonLd",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"LogoJsonLd",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"ProductJsonLd",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"SocialProfileJsonLd",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"CorporateContactJsonLd",{enumerable:!0,get:function(){return p.default}}),t.default=void 0;var a=f(n("zrE3")),r=f(n("wQvz")),o=f(n("uSNX")),i=f(n("NMoU")),l=f(n("Kh8m")),c=f(n("OgNi")),s=f(n("pjlW")),u=f(n("s3TM")),d=f(n("TtSx")),p=f(n("dESq"));function f(e){return e&&e.__esModule?e:{default:e}}var m=a.default;t.default=m},fon5:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ResetPassword",function(){var e=n("sjNC");return{page:e.default||e}}])},pjlW:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.url,n=e.logo,r='{\n    "@context": "http://schema.org",\n    "@type": "Organization",\n    "url": "'.concat(t,'",\n    "logo": "').concat(n,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(r),key:"jsonld-logo"}))};c.propTypes={url:r.default.string.isRequired,logo:r.default.string.isRequired};var s=c;t.default=s},q7Gj:function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("q1tI"),i=n.n(o),l=n("17x9"),c=n.n(l),s=n("TSYQ"),u=n.n(s),d=n("33Jr"),p={tag:d.p,size:c.a.string,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,n=e.cssModule,o=e.tag,l=e.size,c=Object(r.a)(e,["className","cssModule","tag","size"]),s=Object(d.l)(u()(t,"input-group",l?"input-group-"+l:null),n);return i.a.createElement(o,Object(a.a)({},c,{className:s}))};f.propTypes=p,f.defaultProps={tag:"div"},t.a=f},re1l:function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("q1tI"),i=n.n(o),l=n("17x9"),c=n.n(l),s=n("TSYQ"),u=n.n(s),d=n("33Jr"),p=n("Z+s4"),f={tag:d.p,addonType:c.a.oneOf(["prepend","append"]).isRequired,children:c.a.node,className:c.a.string,cssModule:c.a.object},m=function(e){var t=e.className,n=e.cssModule,o=e.tag,l=e.addonType,c=e.children,s=Object(r.a)(e,["className","cssModule","tag","addonType","children"]),f=Object(d.l)(u()(t,"input-group-"+l),n);return"string"==typeof c?i.a.createElement(o,Object(a.a)({},s,{className:f}),i.a.createElement(p.a,{children:c})):i.a.createElement(o,Object(a.a)({},s,{className:f,children:c}))};m.propTypes=f,m.defaultProps={tag:"div"},t.a=m},s3TM:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("q1tI")),r=c(n("17x9")),o=c(n("m/Pd")),i=c(n("DHlL")),l=c(n("FmXa"));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.productName,n=e.images,r=void 0===n?[]:n,c=e.description,s=e.sku,u=e.gtin8,d=e.gtin13,p=e.gtin14,f=e.mpn,m=e.brand,g=e.reviews,h=void 0===g?[]:g,y=e.aggregateRating,b=e.offers,v='{\n    "@context": "http://schema.org/",\n    "@type": "Product",\n    "image":'.concat((0,l.default)(r),",\n    ").concat(c?'"description": "'.concat(c,'",'):"","\n    ").concat(f?'"mpn": "'.concat(f,'",'):"","\n    ").concat(s?'"sku": "'.concat(s,'",'):"","\n    ").concat(u?'"gtin8": "'.concat(u,'",'):"","\n    ").concat(d?'"gtin13": "'.concat(d,'",'):"","\n    ").concat(p?'"gtin14": "'.concat(p,'",'):"","\n    ").concat(m?function(e){return'\n  "brand": {\n      "@type": "Thing",\n      "name": "'.concat(e,'"\n    },\n')}(m):"","\n    ").concat(h.length?function(e){return'\n"review": [\n  '.concat(e.map(function(e){return'{\n      "@type": "Review",\n      '.concat(e.datePublished?'"datePublished": "'.concat(e.datePublished,'",'):"","\n      ").concat(e.reviewBody?'"reviewBody": "'.concat(e.reviewBody,'",'):"","\n      ").concat(e.name?'"name": "'.concat(e.name,'",'):"","\n      ").concat(function(e){return e?'"reviewRating": {\n          "@type": "Rating",\n          '.concat(e.bestRating?'"bestRating": "'.concat(e.bestRating,'",'):"","\n          ").concat(e.worstRating?'"worstRating": "'.concat(e.worstRating,'",'):"",'\n          "ratingValue": "').concat(e.ratingValue,'"\n        },'):""}(e.reviewRating),'\n      "author": "').concat(e.author,'"\n  }')}),"],")}(h):"","\n    ").concat(y?function(e){return'\n  "aggregateRating": {\n      "@type": "AggregateRating",\n      "ratingValue": "'.concat(e.ratingValue,'",\n      "reviewCount": "').concat(e.reviewCount,'"\n    },\n')}(y):"","\n    ").concat(b?function(e){return'\n  "offers": {\n    "@type": "Offer",\n    "priceCurrency": "'.concat(e.priceCurrency,'",\n    ').concat(e.priceValidUntil?'"priceValidUntil": "'.concat(e.priceValidUntil,'",'):"","\n    ").concat(e.itemCondition?'"itemCondition": "'.concat(e.itemCondition,'",'):"","\n    ").concat(e.availability?'"availability": "'.concat(e.availability,'",'):"","\n    ").concat(e.seller?'\n      "seller": {\n      "@type": "Organization",\n      "name": "'.concat(e.seller.name,'"\n    },\n    '):"",'\n    "price": "').concat(e.price,'"\n  },\n')}(b):"",'\n    "name": "').concat(t,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(v),key:"jsonld-product"}))};s.defaultProps={images:[],description:null,brand:null,reviews:[],aggregateRating:null,offers:null,sku:null,gtin8:null,gtin13:null,gtin14:null,mpn:null},s.propTypes={productName:r.default.string.isRequired,images:r.default.oneOfType([r.default.arrayOf(r.default.string),r.default.string]),description:r.default.string,brand:r.default.string,reviews:r.default.arrayOf(r.default.shape({author:r.default.string.isRequired,datePublished:r.default.string,reviewBody:r.default.string,name:r.default.string,reviewRating:r.default.shape({bestRating:r.default.string,ratingValue:r.default.string.isRequired,worstRating:r.default.string})})),aggregateRating:r.default.shape({ratingValue:r.default.string.isRequired,reviewCount:r.default.string.isRequired}),offers:r.default.shape({price:r.default.string.isRequired,priceCurrency:r.default.string.isRequired,priceValidUntil:r.default.string,itemCondition:r.default.string,availability:r.default.string,seller:r.default.shape({name:r.default.string.isRequired})}),sku:r.default.string,gtin8:r.default.string,gtin13:r.default.string,gtin14:r.default.string,mpn:r.default.string};var u=s;t.default=u},sjNC:function(e,t,n){"use strict";n.r(t);var a=n("ln6h"),r=n.n(a),o=n("O40h"),i=n("0iUn"),l=n("MI3g"),c=n("a7VT"),s=n("sLSF"),u=n("Tit0"),d=n("q1tI"),p=n.n(d),f=n("uBiN"),m=n("sOKU"),g=n("1Yj4"),h=n("ok1R"),y=n("rhny"),b=n("BLzl"),v=n("/kxI"),E=n("q7Gj"),w=n("re1l"),k=n("Z+s4"),P=n("L3zb"),O=n("3OM0"),R=n("6yR0"),j=n("8lYe"),_=n("5Yp1"),q=n("vDqi"),T=n.n(q),x=n("Q3j3"),G=n("nOHt"),M=n.n(G),N=n("rOcY"),I=n("erEE"),L=n.n(I),S=function(e){function t(e){var n;return Object(i.default)(this,t),(n=Object(l.default)(this,Object(c.default)(t).call(this,e))).sendClicked=function(){var e=n.state,t=e.password,a=e.customerID,r=e.confirmpassword;if(n.validatePassword(t))if(r===t){n.setState({emailsending:!0});var o={catererPassword:t},i=x.a.PUTupdatepassword+"?_id="+a;T.a.put(i,o,{headers:{"Content-Type":"application/json"}}).then(function(e){201===e.status&&n.setState({password:"",confirmpassword:"",emailsending:!1,updatePassword:"Success"})}).catch(function(e){n.setState({password:"",confirmpassword:"",error:!0,emailsending:!1,updatePassword:"Failed"})})}else n.setState({passwordnotmatch:!0});else n.setState({isPasswordFormatWrong:!0})},n.backClicked=function(){window.location.assign("".concat(N.a))},n.state={password:"",confirmpassword:"",error:!1,emailsending:!1,customerID:null,passwordnotmatch:!1,updatePassword:null,isPasswordFormatWrong:!1},n}return Object(u.default)(t,e),Object(s.default)(t,[{key:"componentWillMount",value:function(){this.setState({customerID:this.props.customerID,error:""===this.props.customerID})}}],[{key:"getInitialProps",value:function(){var e=Object(o.default)(r.a.mark(function e(t){var n,a,o,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.query.resetPasswordToken,a="".concat(N.a).concat(x.a.GETresetpassword)+"?resetPasswordToken="+n,o="",e.prev=3,e.next=6,T.a.get(a);case 6:(i=e.sent)&&i.data&&void 0!==i.data&&(o=i.data.customerID),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.error(e.t0);case 13:return e.abrupt("return",{customerID:o});case 14:case"end":return e.stop()}},e,null,[[3,10]])}));return function(t){return e.apply(this,arguments)}}()}]),Object(s.default)(t,[{key:"handlePasswordChange",value:function(e){this.setState({password:e.target.value,isPasswordFormatWrong:!1})}},{key:"handleConfirmPasswordChange",value:function(e){this.setState({confirmpassword:e.target.value})}},{key:"validatePassword",value:function(e){return/^(?=.{7,13}$)(?=\w{7,13})(?=.*\d)/.test(String(e).toLowerCase())}},{key:"signIn",value:function(e){e.preventDefault(),M.a.push({pathname:"/login",query:{returnurl:"/searchcaterer?".concat(this.state.locationquerystring).concat(this.state.occasionquerystring)}})}},{key:"renderError",value:function(){var e=this;return p.a.createElement(f.a,null,p.a.createElement("h2",null,"Ooops!"),p.a.createElement("p",{className:"text-muted"},"Error resetting your password. Please send another resend link."),p.a.createElement(m.a,{color:"primary",block:!0,onClick:function(){return e.backClicked()}},"Back"))}},{key:"renderSuccess",value:function(){var e=this;return p.a.createElement(f.a,null,p.a.createElement("h2",null,"Success"),p.a.createElement("p",{className:"text-muted"},"Password has been successfully changed."),p.a.createElement(m.a,{color:"success",block:!0,onClick:function(){return e.backClicked()}},"Back"))}},{key:"render",value:function(){var e=this;return p.a.createElement(_.a,{title:"Reset Password"},p.a.createElement(L.a,{config:{title:"Reset Password | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers"}}),p.a.createElement("div",{style:{backgroundColor:"white"}},p.a.createElement(R.a,{signIn:function(t){return e.signIn(t)}}),p.a.createElement("div",{className:"app justify-content-center align-items-center"},p.a.createElement(g.a,null,p.a.createElement(h.a,{style:{flex:1,display:"flex"},className:"justify-content-center"},p.a.createElement(y.a,{md:"9",lg:"7",xl:"6"},p.a.createElement(b.a,{style:{boxShadow:"1px 1px 3px #9E9E9E"},className:"p-4"},p.a.createElement(v.a,{className:"p-4"},this.state.error||"Failed"===this.state.updatePassword?this.renderError():"Success"===this.state.updatePassword?this.renderSuccess():p.a.createElement(f.a,null,p.a.createElement("h2",null,"Reset Password"),p.a.createElement("p",{className:"text-muted"},"Enter your new password below."),p.a.createElement(E.a,{className:"mb-3"},p.a.createElement(w.a,{addonType:"prepend"},p.a.createElement(k.a,null,p.a.createElement("a",{style:{color:"gray",marginLeft:2.5,marginRight:2.5},className:"fa fa-lock"}))),p.a.createElement(P.a,{type:"password",placeholder:"Password",autoComplete:"password",onChange:function(t){return e.handlePasswordChange(t)}})),p.a.createElement(E.a,{className:"mb-3"},p.a.createElement(w.a,{addonType:"prepend"},p.a.createElement(k.a,null,p.a.createElement("a",{style:{color:"gray",marginLeft:2.5,marginRight:2.5},className:"fa fa-lock"}))),p.a.createElement(P.a,{type:"password",placeholder:"Confirm Password",autoComplete:"confirmpassword",onChange:function(t){return e.handleConfirmPasswordChange(t)}})),this.state.passwordnotmatch?p.a.createElement(O.a,{style:{color:"red",marginBottom:20,fontSize:13}},"* Passwords do not match"):null,this.state.isPasswordFormatWrong?p.a.createElement(O.a,{style:{fontSize:13,color:"red",marginBottom:20}},"Password should be alphanumerical and within length of 7 to 13"):null,p.a.createElement(m.a,{color:"success",block:!0,disabled:""===this.state.password,onClick:function(){return e.sendClicked()}},"Update")))))))),p.a.createElement(j.a,null)))}}]),t}(d.Component);t.default=S},uBiN:function(e,t,n){"use strict";var a=n("ELrk"),r=n("sDqW"),o=n("BRRx"),i=n("tEjU"),l=n("q1tI"),c=n.n(l),s=n("17x9"),u=n.n(s),d=n("TSYQ"),p=n.n(d),f=n("33Jr"),m={children:u.a.node,inline:u.a.bool,tag:f.p,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),className:u.a.string,cssModule:u.a.object},g=function(e){function t(t){var n;return(n=e.call(this,t)||this).getRef=n.getRef.bind(Object(o.a)(n)),n.submit=n.submit.bind(Object(o.a)(n)),n}Object(i.a)(t,e);var n=t.prototype;return n.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},n.submit=function(){this.ref&&this.ref.submit()},n.render=function(){var e=this.props,t=e.className,n=e.cssModule,o=e.inline,i=e.tag,l=e.innerRef,s=Object(r.a)(e,["className","cssModule","inline","tag","innerRef"]),u=Object(f.l)(p()(t,!!o&&"form-inline"),n);return c.a.createElement(i,Object(a.a)({},s,{ref:l,className:u}))},t}(l.Component);g.propTypes=m,g.defaultProps={tag:"form"},t.a=g},uSNX:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.itemListElements,n='{\n    "@context": "http://schema.org",\n    "@type": "BreadcrumbList",\n    "itemListElement": [\n      '.concat((void 0===t?[]:t).map(function(e){return'{\n        "@type": "ListItem",\n        "position": '.concat(e.position,',\n        "name": "').concat(e.name,'",\n        "item": "').concat(e.item,'"\n      }')}),"\n     ]\n  }");return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(n),key:"jsonld-breadcrumb"}))};c.propTypes={itemListElements:r.default.arrayOf(r.default.shape({position:r.default.number.isRequired,name:r.default.string.isRequired,item:r.default.string.isRequired})).isRequired};var s=c;t.default=s},wQvz:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("q1tI")),r=l(n("17x9")),o=l(n("m/Pd")),i=l(n("DHlL"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.url,n=e.title,r=e.images,l=void 0===r?[]:r,c=e.datePublished,s=e.dateModified,u=void 0===s?null:s,d=e.authorName,p=e.description,f=e.publisherName,m=e.publisherLogo,g='{\n    "@context": "http://schema.org",\n    "@type": "Article",\n    "mainEntityOfPage": {\n      "@type": "WebPage",\n      "@id": "'.concat(t,'"\n    },\n    "headline": "').concat(n,'",\n    "image": [\n      ').concat(l.map(function(e){return'"'.concat(e,'"')}),'\n     ],\n    "datePublished": "').concat(c,'",\n    "dateModified": "').concat(u||c,'",\n    "author": {\n      "@type": "Person",\n      "name": "').concat(d,'"\n    },\n    "publisher": {\n      "@type": "Organization",\n      "name": "').concat(f,'",\n      "logo": {\n        "@type": "ImageObject",\n        "url": "').concat(m,'"\n      }\n    },\n    "description": "').concat(p,'"\n  }');return a.default.createElement(o.default,null,a.default.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:(0,i.default)(g),key:"jsonld-article"}))};c.defaultProps={dateModified:null},c.propTypes={url:r.default.string.isRequired,title:r.default.string.isRequired,images:r.default.array.isRequired,datePublished:r.default.string.isRequired,dateModified:r.default.string,authorName:r.default.string.isRequired,publisherName:r.default.string.isRequired,publisherLogo:r.default.string.isRequired,description:r.default.string.isRequired};var s=c;t.default=s},zMgs:function(e,t,n){"use strict";var a,r=(a=n("q1tI"))&&a.__esModule?a:{default:a};Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={templateTitle:null,noindex:!1,openGraph:{defaultImageHeight:null,defaultImageWidth:null}},i=function(e){var t=[];if(e.titleTemplate&&(o.templateTitle=e.titleTemplate),e.title){var n=e.title;o.templateTitle&&(n=o.templateTitle.replace(/%s/g,function(){return n})),t.push(r.default.createElement("title",{key:"title"},n))}if(!1===e.noindex?(t.push(r.default.createElement("meta",{key:"robots",name:"robots",content:"index,follow"})),t.push(r.default.createElement("meta",{key:"googlebot",name:"googlebot",content:"index,follow"}))):e.noindex||o.noindex||e.dangerouslySetAllPagesToNoIndex?(e.dangerouslySetAllPagesToNoIndex&&(o.noindex=!0),t.push(r.default.createElement("meta",{key:"robots",name:"robots",content:"noindex,nofollow"})),t.push(r.default.createElement("meta",{key:"googlebot",name:"googlebot",content:"noindex,nofollow"}))):(t.push(r.default.createElement("meta",{key:"robots",name:"robots",content:"index,follow"})),t.push(r.default.createElement("meta",{key:"googlebot",name:"googlebot",content:"index,follow"}))),e.description&&t.push(r.default.createElement("meta",{key:"description",name:"description",content:e.description})),e.hasOwnProperty("twitter")&&(e.twitter.cardType&&t.push(r.default.createElement("meta",{key:"twitter:card",name:"twitter:card",content:e.twitter.cardType})),e.twitter.site&&t.push(r.default.createElement("meta",{key:"twitter:site",name:"twitter:site",content:e.twitter.site})),e.twitter.handle&&t.push(r.default.createElement("meta",{key:"twitter:creator",name:"twitter:creator",content:e.twitter.handle}))),e.hasOwnProperty("facebook")&&e.facebook.appId&&t.push(r.default.createElement("meta",{key:"fb:app_id",property:"fb:app_id",content:e.facebook.appId})),e.hasOwnProperty("openGraph")){if(e.openGraph.url&&t.push(r.default.createElement("meta",{key:"og:url",property:"og:url",content:e.openGraph.url})),e.openGraph.type){var a=e.openGraph.type.toLowerCase();t.push(r.default.createElement("meta",{key:"og:type",property:"og:type",content:a})),"profile"===a&&e.openGraph.profile?(e.openGraph.profile.firstName&&t.push(r.default.createElement("meta",{key:"profile:first_name",property:"profile:first_name",content:e.openGraph.profile.firstName})),e.openGraph.profile.lastName&&t.push(r.default.createElement("meta",{key:"profile:last_name",property:"profile:last_name",content:e.openGraph.profile.lastName})),e.openGraph.profile.username&&t.push(r.default.createElement("meta",{key:"profile:username",property:"profile:username",content:e.openGraph.profile.username})),e.openGraph.profile.gender&&t.push(r.default.createElement("meta",{key:"profile:gender",property:"profile:gender",content:e.openGraph.profile.gender}))):"book"===a&&e.openGraph.book?(e.openGraph.book.authors&&e.openGraph.book.authors.length&&e.openGraph.book.authors.forEach(function(e,n){t.push(r.default.createElement("meta",{key:"book:author:0".concat(n),property:"book:author",content:e}))}),e.openGraph.book.isbn&&t.push(r.default.createElement("meta",{key:"book:isbn",property:"book:isbn",content:e.openGraph.book.isbn})),e.openGraph.book.releaseDate&&t.push(r.default.createElement("meta",{key:"book:release_date",property:"book:release_date",content:e.openGraph.book.releaseDate})),e.openGraph.book.tags&&e.openGraph.book.tags.length&&e.openGraph.book.tags.forEach(function(e,n){t.push(r.default.createElement("meta",{key:"book:tag:0".concat(n),property:"book:tag",content:e}))})):"article"===a&&e.openGraph.article&&(e.openGraph.article.publishedTime&&t.push(r.default.createElement("meta",{key:"article:published_time",property:"article:published_time",content:e.openGraph.article.publishedTime})),e.openGraph.article.modifiedTime&&t.push(r.default.createElement("meta",{key:"article:modified_time",property:"article:modified_time",content:e.openGraph.article.modifiedTime})),e.openGraph.article.expirationTime&&t.push(r.default.createElement("meta",{key:"article:expiration_time",property:"article:expiration_time",content:e.openGraph.article.expirationTime})),e.openGraph.article.authors&&e.openGraph.article.authors.length&&e.openGraph.article.authors.forEach(function(e,n){t.push(r.default.createElement("meta",{key:"article:author:0".concat(n),property:"article:author",content:e}))}),e.openGraph.article.section&&t.push(r.default.createElement("meta",{key:"article:section",property:"article:section",content:e.openGraph.article.section})),e.openGraph.article.tags&&e.openGraph.article.tags.length&&e.openGraph.article.tags.forEach(function(e,n){t.push(r.default.createElement("meta",{key:"article:tag:0".concat(n),property:"article:tag",content:e}))}))}e.openGraph.title&&t.push(r.default.createElement("meta",{key:"og:title",property:"og:title",content:e.openGraph.title})),e.openGraph.description&&t.push(r.default.createElement("meta",{key:"og:description",property:"og:description",content:e.openGraph.description})),e.openGraph.images&&e.openGraph.images.length&&e.openGraph.images.forEach(function(n,a){t.push(r.default.createElement("meta",{key:"og:image:0".concat(a),property:"og:image",content:n.url})),n.alt&&t.push(r.default.createElement("meta",{key:"og:image:alt0".concat(a),property:"og:image:alt",content:n.alt})),n.width?t.push(r.default.createElement("meta",{key:"og:image:width0".concat(a),property:"og:image:width",content:n.width})):(o.openGraph.defaultImageWidth||e.openGraph.defaultImageWidth)&&(e.openGraph.defaultImageWidth&&(o.openGraph.defaultImageWidth=e.openGraph.defaultImageWidth),t.push(r.default.createElement("meta",{key:"og:image:width0".concat(a),property:"og:image:width",content:o.openGraph.defaultImageWidth}))),n.height?t.push(r.default.createElement("meta",{key:"og:image:height".concat(a),property:"og:image:height",content:n.height})):(o.openGraph.defaultImageHeight||e.openGraph.defaultImageHeight)&&(e.openGraph.defaultImageHeight&&(o.openGraph.defaultImageHeight=e.openGraph.defaultImageHeight),t.push(r.default.createElement("meta",{key:"og:image:height".concat(a),property:"og:image:height",content:o.openGraph.defaultImageHeight})))}),e.openGraph.locale&&t.push(r.default.createElement("meta",{key:"og:locale",property:"og:locale",content:e.openGraph.locale})),e.openGraph.site_name&&t.push(r.default.createElement("meta",{key:"og:site_name",property:"og:site_name",content:e.openGraph.site_name}))}return e.canonical&&t.push(r.default.createElement("link",{rel:"canonical",href:e.canonical,key:"canonical"})),t};t.default=i},zrE3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=l(n("m/Pd")),r=l(n("17x9")),o=l(n("q1tI")),i=l(n("zMgs"));function l(e){return e&&e.__esModule?e:{default:e}}function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n,a=0;a<t.length;a++)(n=t[a]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}function u(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=function(e){function t(e){var n;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=u(this,d(t).call(this,e)),!e.config)throw new Error("[next-seo] You must supply an SEO configuration");return n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,o.default.Component),function(e,t,n){t&&s(e.prototype,t),n&&s(e,n)}(t,[{key:"render",value:function(){var e=this.props.config;return o.default.createElement(a.default,null,(0,i.default)(e))}}]),t}();f.propTypes={config:r.default.object.isRequired};var m=f;t.default=m}},[["fon5","5d41","9da1","ad9d"]]]);