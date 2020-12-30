const localStorage = require('webstorage-node').localStorage;
const request = require('request');

let token = localStorage.getItem("token");




module.exports =  async(req, res) => {

    if (req.firstTime == true){
        console.log("req: " + req.session.name )
    }

   
    try{
        name = req.session.name
    }
    catch{
        name = "No name found"
    }

    try{
        email = req.session.email
    }
    catch{
        email = "No email found"
    }
   
	res.render('dashboard', {
        name: name,
        email: email
    })

}