/**
 * 
 */
var createPerson=function(firstName,lastName){
	var person={
	firstName:firstName,
	lastName:lastName,
	thanks:function(){
		return "Thank you";
	}
	};
	Object.defineProperties(person,{
	fullName : {
		get:function(){
			return this.firstName+" "+this.lastName;
		},
		configurable:true
	},
	sayHello:{
		get:function(){
			return "Hi there!";
		},
		configurable:true
	}
	});
	return person;
}

var createEmployee=function(firstName,lastName,position){
	var person=createPerson(firstName,lastName);
	person.position=position;
	var fullName=Object.getOwnPropertyDescriptor(person,"fullName");
	var fullNamefunction=fullName.get.bind(person);
	var sayHello=Object.getOwnPropertyDescriptor(person,"sayHello");
	var sayHelloFunction=sayHello.get.bind(person);
	Object.defineProperties(person,{
		fullName:{
		get:function(){
			return fullNamefunction()+" "+this.position;
		},
		configurable:true
		},
		sayHello:{
			get:function(){
				return sayHelloFunction()+" My name is "+this.firstName+this.lastName;
			}
		}
	});
	
	var thanksfn=person.thanks.bind(person);
	
	person.thanks=function(){
		return thanksfn()+" "+this.fullName;
	}
	return person;
}