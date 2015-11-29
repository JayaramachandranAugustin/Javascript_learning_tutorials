/**
 * 
 */

var oojs = (function(oojs) {
	
	var Toolbaritem=function(itemElement){
		Object.defineProperty(this,"__el",{
			value:itemElement
		});
	}
	Object.defineProperties(Toolbaritem.prototype,{
		toogleActiveState:{
			value:function() {
				this.activate = !this.activate;
			}
		},

		enabled : {
			get : function() {
				return !this.__el.classList.contains("disabled");
			},
			set : function(value) {
				if (value) {
					this.__el.classList.remove("disabled");
				} else {
					this.__el.classList.add("disabled");
				}
			}
		},
		activate : {
			get : function() {
				return this.__el.classList.contains("active");
			},
			set : function(value) {
				if (value) {
					this.__el.classList.add("active");
				} else {
					this.__el.classList.remove("active");
				}
			}
		}

	});

	var createToolbarItems = function(itemElements) {
		var items = [];

		[].forEach.call(itemElements, function(el, index, array) {

			var item = new Toolbaritem(el);
			items.push(item);
		});
		return items;
	};
	
	var Toolbar=function(element){
		var items = element.querySelectorAll(".toolbar-item");
		

		Object.defineProperties(this,{
			__el:{
				value:element
			},
			items:{
				value:createToolbarItems(items),
				enumerable:true
			},
			add:{
				value:function(options){
				var span=document.createElement("span");
				span.className="toolbar-item";
				this.__el.appendChild(span);
				var item=new Toolbaritem(span);
				this.items.push(item);
			}
			},
			remove: {
				value:function (index) {
	            var len = this.items.length;
	
	            if (index > len || index < 0) {
	                throw new Error("Index is out of range");
	            }
	
	            var item = this.items[index];
	            this.items.splice(index, 1);
	            this.__el.removeChild(item.__el);
	            item = null;
			}
	        },
	        appendTo: {
	        	value:function (parentElement) {
	            parentElement.appendChild(this.__el);
	        }
	        }
		})
	}
	oojs.createToolBar = function(elementId) {
		var element = document.getElementById(elementId);
		
		if(!element){
			element=document.createElement("div");
			element.id=elementId;
			element.className="toolbar";
		}
		return new Toolbar(element);
	};

	return oojs;
}(oojs || {}));