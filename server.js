var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var Contact=require("./models/contact");
var PORT=process.env.PORT || 3000;


mongoose.connect("mongodb://localhost/contactlist",function(){
	console.log("successfully connected to mogodb");
});

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.get("/contactList",function(req,res){

Contact.getContacts(function(err,data){
	if(err){
		throw err;
	}
		res.json(data);
	
})
})

app.post("/contactList",function(req,res){
	
var body=req.body;//will fetch body details

Contact.addContact(body,function(err,data){
	if(err){
		throw err;
	}
		res.json(data);
})
})

app.get("/contactList/:id",function(req,res){

var id=req.params.id;
Contact.getContactById(id,function(err,data){
	if(err){
		throw err;
	}
		res.json(data);
})

})

app.put("/contactList/:id",function(req,res){

	var id=req.params.id;
	var body=req.body;
	Contact.updateContact(id,body,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})

})

app.delete("/contactList/:id",function(req,res){

	var id=req.params.id;
	Contact.deleteContact(id,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})

})

app.listen(PORT,function(){
	console.log("Server is running in number "+PORT);
});
