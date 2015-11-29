/**
 * 
 */

var oojs = (function(oojs) {

	var createToolbarItem = function(itemElement) {
		var item = {
			toogleActiveState : function() {
				this.activate = !this.activate;
			}
		};

		Object.defineProperties(item, {
			el : {
				value : itemElement
			},
			enabled : {
				get : function() {
					return !this.el.classList.contains("disabled");
				},
				set : function(value) {
					if (value) {
						this.el.classList.remove("disabled");
					} else {

						this.el.classList.add("disabled");
					}
				}
			},
			activate : {
				get : function() {
					return this.el.classList.contains("active");
				},
				set : function(value) {
					if (value) {
						this.el.classList.add("active");
					} else {
						this.el.classList.remove("active");
					}
				}
			}
		});

		return item;
	}

	var createToolbarItems = function(itemElements) {
		var items = [];

		[].forEach.call(itemElements, function(el, index, array) {

			var item = createToolbarItem(el);
			/*var item={
			el:el,
			disable:function(){
				this.el.classList.add("disabled");
			},
			enable:function(){
				this.el.classList.remove("disabled");
			},
			isEnabled:function(){
				return !this.el.classList.contains("disabled");
			},
			activate:function(){
				if(!this.isEnabled()){
					return;
				}
				this.el.classList.add("active");
			},
			deactivate:function(){
				if(!this.isEnabled()){
					return;
				}
				this.el.classList.remove("active");
			},
			isActive:function(){
				return this.el.classList.contains("active");
			},
			toggleActiveState:function(){
				if(this.isActive()){
					this.deactivate();
				}
				else{
					this.activate();
				}
			}
			};*/
			items.push(item);
		});
		return items;
	};

	oojs.createToolBar = function(elementId) {
		var element = document.getElementById(elementId);
		
		if(!element){
			element=document.createElement("div");
			element.id=elementId;
			element.className="toolbar";
		}
		var items = element.querySelectorAll(".toolbar-item");
		
		var toolbar={
				add:function(options){
					var span=document.createElement("span");
					span.className="toolbar-item";
					this.el.appendChild(span);
					var item=createToolbarItem(span);
					this.items.push(item);
				},
				remove: function (index) {
		            var len = this.items.length;
		
		            if (index > len || index < 0) {
		                throw new Error("Index is out of range");
		            }
		
		            var item = this.items[index];
		            this.items.splice(index, 1);
		            this.el.removeChild(item.el);
		            item = null;
		        },
		        appendTo: function (parentElement) {
		            parentElement.appendChild(this.el);
		        }
		}
		
		Object.defineProperties(toolbar,{
			el:{
				value:element
			},
			items:{
				value:createToolbarItems(items),
				enumerable:true
			}
		})
		return toolbar;
	};

	return oojs;
}(oojs || {}));