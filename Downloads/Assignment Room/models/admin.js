const User = require("./user_schema");

User.findOne({email: "admin@gmail.com"}, function(err,admin){
    if(err){
        console.log("Error in finding the admin..");
        return;
    }
    if(admin){
        console.log("Admin already exists !");
        return;
    }
    if(!admin){
        User.create({
            name:"admin",
            email:"admin@gmail.com",
            role:"admin",
            password:"admin#2021"
        },function(err,admin){
            if(err){
                console.log("Error in creating the admin..");
                return;
            }
          //  return admin.redirect("/");
        })
    }
})

