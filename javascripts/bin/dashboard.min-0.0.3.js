"use strict";var gereji=function(){};gereji.extend=function(){var b=arguments[0];var e=arguments[1];var d=function(){};d.extend=gereji.extend;for(var c in this.prototype){d.prototype[c]=this.prototype[c]}for(var a in e){d.prototype[a]=e[a]}this[b]=d};"use strict";gereji.extend("broker",{init:function(){this.events=[]},on:function(){var b=typeof arguments[0]=="string"?[arguments[0]]:arguments[0];for(var a in b){var c=b[a];this.events=this.events?this.events:{};this.events[c]=typeof this.events[c]=="undefined"?[]:this.events[c];this.events[c].push(arguments[1])}},emit:function(a){a=typeof a=="string"?{type:a,data:{}}:a;a.data=typeof a.data=="undefined"?{}:a.data;try{var c=this.events?this.events[a.type]:[];for(var b in c){typeof c[b]==="function"&&c[b](a)}}catch(d){console&&console.error(d)}}});"use strict";gereji.extend("sync",{init:function(){this.headers={};this.headers["X-Powered-By"]="Gereji";this.headers["Content-Type"]="application/json";this.headers["Cache-Control"]="no-cache";this.options={async:true}},header:function(a,b){this.headers[a]=b;return this},get:function(a,b){return this.request({uri:a,method:"GET",complete:b})},post:function(a,b,c){return this.request({method:"POST",uri:a,data:b,complete:c})},put:function(a,b,c){return this.request({method:"PUT",uri:a,data:b,complete:c})},"delete":function(a,b){return this.request({method:"DELETE",uri:a,complete:b})},request:function(){var a=arguments[0];try{var d=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");d.onreadystatechange=function(){var e=arguments[0].target;e.readyState===4&&e.status>=200&&e.status<400&&a.complete(e.responseText)};d.open(a.method,a.uri,this.options);for(var b in this.headers){d.setRequestHeader(b,this.headers[b])}d.send(a.data)}catch(c){console&&console.log(c)}},xget:function(b,d){try{var a=document.createElement("script");a.src=b;a.readyState?a.onreadystatechange=function(){if(a.readyState!="loaded"&&a.readyState!="complete"){return}d();a.onreadystatechange=null}:a.onload=d;a.type="text/javascript";a.async=true;document.getElementsByTagName("head")[0].appendChild(a)}catch(c){console&&console.log(c)}}});"use strict";gereji.extend("storage",{init:function(){this.scope=arguments[0]?arguments[0]:"gereji";this.store=localStorage?localStorage:new gereji.memory();this.store.hasOwnProperty(this.scope)||this.store.setItem(this.scope,"{}")},set:function(b,c){var a=this.getStore();a[b]=c;this.store.setItem(this.scope,JSON.stringify(a))},get:function(b){var a=this.getStore();return a.hasOwnProperty(b)?a[b]:{}},where:function(c){var a=this.getStore();var d=[];for(var b in a){}},getStore:function(){return this.store.hasOwnProperty(this.scope)?JSON.parse(this.store.getItem(this.scope)):{}},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(d){var b=Math.random()*16|0,a=d=="x"?b:b&3|8;return a.toString(16)})}});"use strict";gereji.extend("validator",{test:function(b,a){switch(b){case"required":return String(a).length;break;case"string":return this.testString(a);break;case"integer":return this.testInteger(a);break;case"positiveinteger":return this.testPositiveInteger(a);break;case"negativeinteger":return this.testNegativeInteger(a);break;case"currency":return this.testCurrency(a);break;case"double":return this.testDouble(a);break;case"positivedouble":return this.testPositiveDouble(a);break;case"negativedouble":return this.testNegativeDouble(a);break;case"phone":return this.testPhone(a);break;case"year":return this.testYear(a);break;case"date":return this.testDate(a);break;case"ip":return this.testIP(a);break;case"password":return this.testPassword(a);break;case"email":return this.testEmail(a);break;case"domain":return this.testDomain(a);break;case"subdomain":return this.testSubDomain(a);break;case"handle":return this.testHandle(a);break;case"url":return this.testURL(a);break;case"uuid":return this.testUUID(a);break;case"boolean":return(typeof a=="boolean");break;default:return true;break}},testString:function(){var a=/^.+$/i;return a.test(arguments[0])},testInteger:function(){var a=/^-{0,1}\d+$/;return a.test(arguments[0])},testPositiveInteger:function(){var a=/^\d+$/;return a.test(arguments[0])},testNegativeInteger:function(){var a=/^-\d+$/;return a.test(arguments[0])},testCurrency:function(){var a=/^-{0,1}\d*\.{0,2}\d+$/;return a.test(arguments[0])},testDouble:function(){var a=/^-{0,1}\d*\.{0,1}\d+$/;return a.test(arguments[0])},testPositiveDouble:function(){var a=/^\d*\.{0,1}\d+$/;return a.test(arguments[0])},testNegativeDouble:function(){var a=/^-\d*\.{0,1}\d+$/;return a.test(arguments[0])},testPhone:function(){var a=/^\+?[0-9\s]{8,16}/;return a.test(arguments[0])},testYear:function(){var a=/^(19|20)[\d]{2,2}$/;return a.test(arguments[0])},testDate:function(){return !isNaN(Date.parse(arguments[0]))},testIP:function(){var a=/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;return a.test(arguments[0])},testPassword:function(){var b=/^[a-z0-9_-]{6,18}$/i;var a=b.test(arguments[0]);return a},testEmail:function(){var a=/^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i;return a.test(arguments[0])},testDomain:function(){var a=/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i;return a.test(arguments[0])},testSubDomain:function(){var a=/^[a-z\d]+([-_][a-z\d]+)*$/i;return a.test(arguments[0])},testHandle:function(){var a=/^[a-z\d\/\+\-\.]+$/i;return a.test(arguments[0])},testURL:function(){var a=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;return a.test(arguments[0])},testUUID:function(){var a=/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;return a.test(arguments[0])}});"use strict";gereji.extend("transition",{options:{direction:"left",duration:900,timingFunction:"ease"},duration:function(){this.options.duration=arguments[0]?arguments[0]:this.options.duration;return this},direction:function(){this.options.direction=arguments[0]?arguments[0]:this.options.direction;return this},slide:function(){var a=arguments[0];var b=arguments[1]?arguments[1]:false;switch(this.options.direction){case"left":this.transition(a,this.next(a),"width",b);break;case"right":this.transition(a,this.previous(a),"width",b);break;case"up":this.transition(a,this.next(a),"height",b);break;case"down":this.transition(a,this.previous(a),"height",b);break}return this},transition:function(d,c,b,f){c.style.display="inline-block";var a=d[("client"+b.charAt(0).toUpperCase()+b.slice(1))];if(!this.modern()){return this.animate(function(g){c.style[b]=String(Math.ceil(a*g))+"%";d.style[b]=String(Math.floor(a-(a*g)))+"%"},f)}var e=b+" "+this.options.duration+"ms "+this.options.timingFunction;d.style.transition=e;c.style.transition=e;d.style[b]="0";c.style[b]=String(a)+"px";f&&setTimeout(f,this.options.duration);return this},next:function(b){var a=b.nextSibling?b.nextSibling:b.parentNode.firstChild;while(a.nodeType!=1){a=a.nextSibling?a.nextSibling:b.parentNode.firstChild}return a},previous:function(b){var a=b.previousSibling?b.previousSibling:b.parentNode.lastChild;while(a.nodeType!=1){a=a.previousSibling?a.previousSibling:b.parentNode.lastChild}return a},modern:function(){var a=document.createElement("p").style;return("transition" in a||"webkitTransition" in a||"MozTransition" in a||"msTransition" in a||"OTransition" in a)},animate:function(a,b){var d=1;do{var c=Math.sin(0.5*Math.PI*d/this.options.duration);(function(){var f=c;var e=d;setTimeout(function(){a(f);(e==duration)&&b&&b()},d)})()}while(d++<duration)}});"use strict";gereji.extend("model",{init:function(){this.status="ready";this.broker=new gereji.broker();this.broker.init();this.ajax=new gereji.sync();this.ajax.init();this.store={data:{},meta:{}};return this},ready:function(){if(arguments[0]){this.status=arguments[0]}return(this.status=="ready")},meta:function(){var a=arguments[0]?arguments[0]:undefined;var b=arguments[1]?arguments[1]:undefined;if(b!=undefined){this.store.meta[a]=b}if(a!=undefined&&b==undefined){return this.store.meta[a]?this.store.meta[a]:undefined}return this},set:function(key,value){var test="this.store.data";var path=key.replace(/\[(.*)\]/,"").split(".");for(var i in path){test+="."+path[i];eval(test+" = "+test+" ? "+test+" : {}")}var index=(key.indexOf("[")==-1)?false:key.match(/\[(.*)\]/)[1];index||eval(test+' = "'+value+'"');index&&eval(test+" = "+test+" instanceof Array ? "+test+" : []");index&&eval(test+"["+index+'] = "'+value+'"');return this},get:function(key){var test="this.store.data";var path=key.replace(/\[(.*)\]/,"").split(".");var index=(key.indexOf("[")==-1)?false:key.match(/\[(.*)\]/)[1];var value=undefined;for(var i in path){test+="."+path[i];value=eval(test)===undefined?undefined:(index?eval(test+"["+index+"]"):eval(test))}return value},sync:function(){var b=this.meta("about");var a=this.meta("name");var c=this;this.broker.emit({type:"submit",data:this.store.data});this.ajax.post(b,JSON.stringify(this.store.data),function(){c.response=JSON.parse(arguments[0]);c.broker.emit({type:"sync",data:c.response})})},destroy:function(){this.store={}},serialize:function(){return JSON.stringify(this.store)},find:function(){return this.store.data}});"use strict";gereji.extend("collection",{init:function(){this.store={data:{},meta:{}};if(arguments[0].meta){this.store.meta=arguments[0].meta}if(arguments[0].data){this.store.data=arguments[0].data}this.status=null;this.broker=new gereji.broker();this.broker.init();this.ajax=new gereji.sync();this.ajax.init();this.storage=new gereji.storage();this.storage.init();var a=this.storage.get("collections");if(!a.hasOwnProperty(this.store.meta.name)){return this.fetch(this.store.meta.name)}this.store.data=a[this.store.meta.name];this.status="ready";return this},fetch:function(a){var b=this;this.ajax.get(this.store.meta.about,function(c){b.status="ready";b.store.data=c;b.broker.emit({type:"update",data:b.store.data});var d=b.storage.get("collections");d[a]=b.store.data;b.storage.set("collections",d)});return this},ready:function(){return(this.status=="ready")},meta:function(){var a=arguments[0];var b=arguments[1];if(b!=undefined){this.store.meta[a]=b}if(a!=undefined&&b==undefined){return this.store.meta[a]?this.store.meta[a]:undefined}return this},find:function(){return this.store.data}});"use strict";gereji.extend("dom",{findId:function(a){this.elements=document.getElementsById(a)},findTag:function(a){this.elements=document.getElementsByTagName(a);return this},findClass:function(d){var a=[];for(var c=0;c<this.elements.length;c++){var b=this.elements[c];if(b.className.split(" ").indexOf(d)!=-1){a.push(b)}}this.elements=a;return this},getElements:function(){return this.elements},setElement:function(){this.elements=[arguments[0]];return this},setElements:function(){this.elements=[];for(var a=0;a<arguments[0].length;a++){this.elements.push(arguments[0][a])}return this},addClass:function(){var c=arguments[0] instanceof Array?arguments[0]:[arguments[0]];for(var b=0;b<this.elements.length;b++){for(var a in c){var d=this.elements[b].className;this.elements[b].className=(d.indexOf(c[b])==-1)?(d+" "+c[b]):d}}return this},removeClass:function(){var c=arguments[0] instanceof Array?arguments[0]:[arguments[0]];for(var b=0;b<this.elements.length;b++){for(var a in c){this.elements[b].className=this.elements[b].className.replace(c[a],"").replace("  "," ")}}return this},hasClass:function(){return(this.elements[0]&&this.elements[0].className&&this.elements[0].className.indexOf(arguments[0])!=-1)},findParentTag:function(b){var a=this.elements[0].tagName.toLowerCase();if(a=="body"){this.elements=[]}if(a==b||a=="body"){return this}this.elements=[this.elements[0].parentNode];return this.findParentTag(b)},findChildrenTag:function(a){var b=this.elements[0].getElementsByTagName(a);this.elements=b?b:[];return this},findNextSibling:function(){var b=this.elements[0];var a=b.nextSibling?b.nextSibling:b.parentNode.firstChild;while(a.nodeType!=1){this.elements[0]=a.nextSibling?a.nextSibling:b.parentNode.firstChild}return this},findPreviousSibling:function(){var b=this.elements[0];var a=b.previousSibling?b.previousSibling:b.parentNode.lastChild;while(a.nodeType!=1){this.elements[0]=a.previousSibling?a.previousSibling:b.parentNode.lastChild}return this},attribute:function(){if(arguments.length==1){return this.elements[0].getAttribute(arguments[0])}for(var a in this.elements){this.elements[a].setAttribute(arguments[0],arguments[1])}return this},css:function(c){for(var b in this.elements){for(var a in c){this.elements[b].style[a]=c[a]}}return this}});"use strict";gereji.extend("xslt",{init:function(){this.status=null;var c=arguments[0];var a=arguments[1];this.key=c+"-"+a;this.broker=new gereji.broker();this.broker.init();this.sync=new gereji.sync();this.sync.init();this.storage=new gereji.storage();this.storage.init();var b=this.storage.get("templates");this.processor=new XSLTProcessor();if(!b.hasOwnProperty(this.key)){return this.fetch(c,a)}this.xsl=b[this.key];this.status="ready";return this},ready:function(){return(this.status=="ready")},fetch:function(c,b){var a="/static/"+c+"/"+b+".xsl";var d=this;this.sync.get(a,function(f){d.xsl=f;d.status="ready";d.broker.emit({type:"update",data:f});var e=d.storage.get("templates");e[d.key]=f;d.storage.set("templates",e)});return this},transform:function(){var b=this.parse(this.xsl);this.processor.importStylesheet(b);var c=typeof arguments[0]=="string"?JSON.parse(arguments[0]):arguments[0];var a=this.parse(this.json2xml(c));this.html=this.processor.transformToFragment(a,document)},getHTML:function(){return this.html},json2xml:function(b){var a=this.createXML(b);a.unshift('<?xml version="1.0"?>');return a.join("\n")},createXML:function(){var d=arguments[0];var b=[];for(var c in d){var a=isNaN(c)?c:"node-"+String(c);var e=["number","boolean","string"].indexOf(typeof d[c])==-1?this.createXML(d[c]):String(d[c]);b.push("<"+a+">"+e+"</"+a+">")}return b},parse2:function(){return Saxon.parseXML(arguments[0])},parse:function(){try{return((new DOMParser).parseFromString(arguments[0],"application/xml"))}catch(b){var a=document.implementation.createHTMLDocument("");a.documentElement.innerHTML=arguments[0];return a}}});"use strict";gereji.extend("view",{init:function(){this.store={data:{},template:{},stage:{}};return this},ready:function(){return(this.store.template.ready()&&this.store.data.ready())},data:function(){this.store.data=arguments[0];var a=this;this.store.data.broker.on("update",function(){a.render(arguments[0])});return this},template:function(){this.store.template=arguments[0];var a=this;this.store.template.broker.on("update",function(){a.render(arguments[0])});return this},stage:function(){this.store.stage=arguments[0];return this},render:function(){var a=this.store.data.find();if(!a||!this.ready()){return this}this.store.template.transform(a);this.store.stage.innerHTML="";this.store.stage.appendChild(this.store.template.getHTML());return this}});"use strict";gereji.extend("os",{sandbox:{},apps:{},register:function(b,a){this.apps[b]={creator:a,instance:null}},start:function(b){var c=this.apps[b];c.instance=c.creator(this.sandbox);try{c.instance.init()}catch(a){console&&console.error(a.message)}},stop:function(b){var a=this.apps[b];if(!a.instance){return}a.instance.kill();a.instance=null},boot:function(){this.sandbox=new gereji.broker();this.sandbox.init();this.sandbox.models={};this.sandbox.collections={};this.sandbox.views={};this.sandbox.validator=new gereji.validator();this.sandbox.transition=new gereji.transition();this.sandbox.storage=new gereji.storage();this.sandbox.sync=new gereji.sync();this.sandbox.storage.init();this.sandbox.sync.init();for(var a in this.apps){this.apps.hasOwnProperty(a)&&this.start(a)}this.sandbox.emit({type:"body:load",data:{}})},halt:function(){for(var a in this.apps){this.apps.hasOwnProperty(a)&&this.stop(a)}}});gereji.apps=new gereji.os();"use strict";gereji.apps.register("events",function(a){var b;return{init:function(){b=this;for(var c in b.events){var d="on"+b.events[c];document[d]=function(){b.fire.apply(b,arguments)}}window.onresize=function(){a.emit({type:"window:resize",data:arguments[0]})}},fire:function(g){g=g||window.event;var j=g.target||g.srcElement;if(String(j.className).indexOf("bubble-up")!=-1){return j.parentNode[g.type]&&j.parentNode[g.type]()}var c=String(j.className).split(" ");var e=j.tagName.toLowerCase();var h={target:j,event:g};a.emit({type:e+":"+g.type,data:h});j.id&&a.emit({type:"#"+j.id+":"+g.type,data:h});for(var d in c){var f="."+c[d]+":"+g.type;a.emit({type:f,data:h})}},events:["load","change","resize","submit","drag","dragstart","dragenter","dragleave","dragover","dragend","drop","mousedown","mouseup","mousemove","mouseover","mouseout","click","dblclick","keyup","keydown","keypress"]}});"use strict";gereji.apps.register("form",function(a){var b;return{init:function(){b=this;a.on([".dashboard-add-new:click"],b.add);a.on(["input:change","textarea:change","select:change"],b.validate);a.on(["form:submit"],b.submit);a.on([".select-add:change"],b.selectAdd);return this},add:function(){var c=(new gereji.dom()).setElement(arguments[0].data.target).findParentTag("button").getElements()[0];b.stage({_id:(new gereji.storage()).uuid(),name:c.getAttribute("name"),type:c.getAttribute("type"),stage:c.getAttribute("stage"),about:c.getAttribute("about")})},stage:function(){var e=arguments[0];var c=(new gereji.view()).init();c.template((new gereji.xslt()).init(e.type,e.name));c.stage(document.getElementById(e.stage));var d=b.model({about:e.about,name:e.name,_id:e._id});c.data(d);c.render();setTimeout(function(){a.emit({type:"body:change",data:{}})},1200)},model:function(){var d=arguments[0];var c=(new gereji.model());c.init();c.meta("about",d.about);c.meta("name",d.name);c.set("_id",d._id);var e="model."+d.name+":create";a.emit({type:e,data:c});return c},createIdInput:function(e){var d=(new gereji.storage()).uuid();var c=document.createElement("input");c.name="_id";c.value=d;c.setAttribute("type","hidden");c.setAttribute("property","_id");e.appendChild(c);return d},findId:function(e){var c=e.getElementsByTagName("input");for(var d=0;d<c.length;d++){if(c[d].name=="_id"){return c[d].value}}return undefined},submit:function(){var h=arguments[0].data.target;var g=arguments[0].data.event;var f=h.getAttribute("about");if(!f){return this}g.preventDefault();var e=b.findId(h);var d=h.getAttribute("name");var c=a.models[e];if(!e){b.createIdInput(h)}if(!c){c=b.model({about:f,form:h,_id:e,name:d})}if(!b.parse(["input","textarea","select"],h,c)){return this}c.sync();return this},parse:function(d,j,c){for(var f in d){var e=d[f];var h=j.getElementsByTagName(e);for(var f=0;f<h.length;f++){if(!b.validate({data:{target:h[f]}})){return false}var g=h[f].getAttribute("property");g&&c.set(g,h[f].value)}}return true},validate:function(){var h=arguments[0].data.target;var e=h.tagName.toLowerCase();var g=h.value;var c=h.className.split(" ");(new gereji.dom()).setElement(h).removeClass("invalid-input");var f=true;for(var d in c){var j=a.validator.test(c[d],g);j||(new gereji.dom()).setElement(h).addClass(" invalid-input");if(j){continue}h.value="";if(h.className.indexOf("required")!=-1){f=false}}return f},selectAdd:function(){var d=arguments[0].data.target;var c=document.createElement("input");c.setAttribute("type","text");c.setAttribute("size","32");c.setAttribute("style","width:auto;");c.setAttribute("name",d.getAttribute("name"));c.setAttribute("about",d.getAttribute("about"));d.parentNode.insertBefore(c,d);d.remove();c.focus()}}});"use strict";gereji.apps.register("layout",function(a){var b;return{init:function(){b=this;a.on(["body:load"],this.vertical)},vertical:function(){var c=(new gereji.dom()).findTag("main").findClass("fill-vertical");if(!c.getElements().length){return}var i=(new gereji.dom()).findTag("header");var d=i.getElements().length?i.getElements()[0].offsetHeight:0;var h=(new gereji.dom()).findTag("footer");var e=h.getElements().length?h.getElements()[0].offsetHeight:0;var f=window.innerHeight-d-e-c.getElements()[0].offsetHeight;var g=String(Math.floor(f/2.4))+"px 0 "+String(Math.floor(f/1.6)-16)+"px";c.css({padding:g});setTimeout(b.lock,1200)},lock:function(){var c=(new gereji.dom()).findTag("*").findClass("lock-height").getElements();for(var d=0;d<c.length;d++){if(c[d].clientHeight){c[d].style.height=c[d].clientHeight+"px"}}c=(new gereji.dom()).findTag("*").findClass("lock-width").getElements();for(var d=0;d<c.length;d++){if(c[d].clientWidth){c[d].style.width=c[d].clientWidth+"px"}}}}});"use strict";gereji.apps.register("collapsible",function(a){var b;return{init:function(){b=this;a.on(["body:load","body:change"],b.close);a.on([".collapsible-single-openclose:click"],b.toggle);a.on([".collapsible-openclose:mousedown"],b.dance)},close:function(){var d=(new gereji.dom()).findTag("*").findClass("collapsible-single").getElements();if(!d.length){return}for(var e=0;e<d.length;e++){var c=(new gereji.dom()).setElement(d[e]);c.attribute("collapsible-height")||c.attribute("collapsible-height",d[e].clientHeight);c.addClass("collapsible-single-closed")}},toggle:function(){var d=(new gereji.dom()).setElement(arguments[0].data.target.parentNode);if(!d.hasClass("collapsible-single-closed")){return d.css("collapsible-height","auto").addClass("collapsible-single-closed")}var c=d.attribute("collapsible-height")+"px";d.css("height",c).removeClass("collapsible-single-closed")},dance:function(){var d=(new gereji.dom()).setElement(arguments[0].data.target);d.attribute("target")?d.findParentTag(d.attribute("target")):d.setElement(arguments[0].data.target.parentNode);var c=d.hasClass("collapsible-open");(new gereji.dom()).setElements(d.getElements()[0].parentNode).findClass("collapsible").removeClass("collapsible-open");c?d.removeClass("collapsible-open"):d.addClass("collapsible-open")},findCollapsible:function(d){if(d.className.indexOf("collapsible")!=-1){return d}var c=d.parentNode;if(c.className.indexOf("collapsible")!=-1){return c}return b.findCollapsible(c)}}});"use strict";gereji.apps.register("basket",function(a){var b;return{init:function(){b=this;a.on([".draggable:dragstart"],b.dragStart);a.on([".draggable:dragend"],b.dragEnd);a.on([".droppable:dragover"],b.dragOver);a.on([".droppable:dragenter"],b.dragEnter);a.on([".droppable:dragleave"],b.dragLeave);a.on([".droppable:drop"],b.drop)},dragStart:function(){var d=arguments[0].data.target;d.id=d.id?d.id:a.storage.uuid();var c=arguments[0].data.event;c.dataTransfer.setData("id",d.id)},dragOver:function(){var c=arguments[0].data.event;c.preventDefault();c.dataTransfer.effectAllowed="move"},dragEnter:function(){var c=arguments[0].data.target;c.classList.add("dragover")},dragLeave:function(){var c=arguments[0].data.target;c.classList.remove("dragover")},drop:function(){var e=arguments[0].data.target;var d=arguments[0].data.event;var f=d.dataTransfer.getData("id");var c=document.getElementById(f);e.appendChild(c);e.classList.remove("dragover")},dragEnd:function(){var c=arguments[0].data.target;c.classList.remove("dragover")}}});"use script";gereji.apps.register("dashboard",function(a){var b;return{init:function(){b=this;b.header=document.getElementsByTagName("header")[0];b.main=document.getElementsByTagName("main")[0];b.primary=document.getElementById("primary");b.secondary=document.getElementById("secondary");a.on(["body:load","window:resize"],b.resize);a.on([".dashboard-nav:mousedown"],b.clear);a.on([".dashboard-nav:mousedown"],b.navigate);a.on([".dashboard-nav:mousedown"],b.stage);a.on([".dashboard-nav:click"],b.brake);a.on([".dashboard-add-new:click"],b.toggleMode)},kill:function(){},resize:function(){var c=b.main.offsetHeight-b.main.getElementsByTagName("section")[0].offsetHeight;b.main.getElementsByTagName("section")[1].style.height=c+"px"},clear:function(){var e=arguments[0].data.target;var d=b.header.getElementsByTagName("a");for(var c=0;c<d.length;c++){d[c].className=d[c].className.replace(/current/,"").replace("  "," ")}},navigate:function(){var d=arguments[0].data.target;if(d.className.indexOf("openclose")==-1){return(d.className+=" current")}var c=d.parentNode.getElementsByTagName("ul")[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0];b.stage({data:{target:c}});b.navigate({data:{target:c}})},stage:function(){var d=arguments[0].data.target;var c={};c.type=d.getAttribute("type");c.href=d.getAttribute("href");c.about=d.getAttribute("about");c.name=d.getAttribute("name");c.target=d.getAttribute("target");if(c.href&&c.about&&c.name){a.emit({type:(c.type+":stage"),data:c})}},brake:function(){var c=arguments[0].data.event;c.preventDefault()},toggleMode:function(){var e=arguments[0].data.target;var c=(new gereji.dom()).setElement(e).getElements()[0];var d=c&&c.getAttribute("mode")?c.getAttribute("mode"):"split-mode";(new gereji.dom()).findTag("main").removeClass(["primary-mode","split-mode","secondary-mode"]).addClass(d)}}});