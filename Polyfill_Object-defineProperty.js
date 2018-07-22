(function(w){
	var undefined,
	Object=w.Object,
	ObjectProto=Object.prototype,
	isObject=w.isObject||(w.isObject=function(x){return x!==null && (typeof(x)==='object'||x instanceof Object)}),
	Function=w.Function,
	isFunction=w.isFunction||(w.isFunction=function(x){return typeof(x)==='function'}),
	has=w.has||(w.has=function(o,p){var e=p in o;return {value:e && (e=o[p]) && true,refer:e,valueOf:function(){return this.value}}}),
	Polyfill=w.PolyfillMethod||(w.PolyfillMethod=function(o,p,x,b){var e=has(o,p);if(e && (isFunction(e.refer))===false){o[p]=b?x():x}}),
	supportAccessor=(Polyfill(ObjectProto,'hasOwnProperty',function(x){var o,e=this,p=String(x);return p in e && (o=e.__proto__||e.constructor.prototype,(p in o ===false)||e[p]!== o[p])}),ObjectProto.hasOwnProperty('__defineGetter__'));
	RaiseErrorType=function(x){throw new TypeError(x)},
	RaiseError=function(x){throw new Error(x)};

	Polyfill(Object,'create',function(){
		var G=ObjectProto.__defineGetter__,S=ObjectProto.__defineSetter__;
		return function(a,b){
			var e=RaiseErrorType,t=isObject,g;
			if(a!=null){
				if(t(a)){
					g={};
					g.prototype=a;
					if(b!==undefined ){
						if(t(b)){
							for(i in b){
								if(b.hasOwnProperty(i)){
									e=b[i];
									if(e && e.hasOwnProperty('get')){
										if(supportAccessor){G.call(g,i,e.get)}else{RaiseError('unsupport Get')}
									}else{
										if(e && e.hasOwnProperty('set')){
											if(supportAccessor){S.call(g,i,e.set)}else{RaiseError('unsupport Set')}
										}else{
											g[i]=e.value
										}
									}
								}
							}
						}else{
							e('Object.create descriptor must be an object')
						}
					};
					return g
				}else{
					e('Object.create proto must be an object')
				}
			}else{
				g={};g.prototype=null
			};
			return g
		}
	},true);

	Polyfill(Object,'defineProperty',function(){var y=supportAccessor;return Function('a','b','c',"var e=RaiseErrorType,"+(y?"G=Object.__defineGetter__,S=Object.__defineSetter__,defineAccessor=function(o,f,s,i,x){isFunction(x)?f.call(o,i,x):e(s+' must be a function')},":"")+"f=isObject,g,s,i;if(f(a)){if(f(c)){f=has;g=f(c,'get');s=f(c,'set');i=String(b);if(g||s){if('value' in c||'writable' in c){e('A property cannot both have accessors and be writable or have a value')}else{"+(y?"f=defineAccessor;f(a,G,'Getter',i,g.refer);f(a,S,'Setter',i,s.refer)":"e('Accessors cannot be defined on this javascript engine')")+"}}else{a[i]=c.value}}else{e('Property description must be an object')}}else{e('Object.defineProperty called on non-object')}")},true);


})(window);






