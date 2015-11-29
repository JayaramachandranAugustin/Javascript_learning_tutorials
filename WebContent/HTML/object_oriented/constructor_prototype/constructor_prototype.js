/**
 * 
 */
var Person=function(firstName,lastName){
		this.firstName=firstName;
		this.lastName=lastName;
}
/*
Person.prototype.sayHi=function(){
	return "Hi there";
}
*/
Object.defineProperties(Person.prototype,{
	sayHi:{
		value:function(){
			return "Hi there";
		}
	},
	fullName:{
		get:function(){
			return this.firstName+" "+this.lastName;
		},
		set:function(value){
			this.firstName=value;
		}
	}
})