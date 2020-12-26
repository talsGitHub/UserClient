const request = require('request');
const localStorage = require('webstorage-node').localStorage;

module.exports =  async(req, res) => {

    let token = req.session.token
    let redirect = false

    
    
    function checkLoggedIn() {
        return new Promise(function (resolve, reject) {
            
            try{
                request({
                    headers: {
                      'x-access-token': token
                    },
                    uri: 'http://localhost:3000/users/logout',
                    body: "",
                    method: 'GET'
                  },   function (err, res, body) {
                        
        
                        console.log("ERR::::: " + body)
                        parsedBody = JSON.parse(body)
                        console.log("Logout parse:: " + parsedBody.key)
                        
                        if(parsedBody.key == "error")
                        {
                            if (!err && res.statusCode == 200) {

                                redirect = true
                                console.log("Error: " + parsedBody.msg)
                                resolve(redirect);
                            }
                            else{
                                reject(parsedBody.msg);
                            }
                            
                            
        
                        }
                        else{
                            if (!err && res.statusCode == 200) {
                                
                                console.log(parsedBody.msg)
                                resolve(parsedBody.msg);
                            }
                            else{
                                reject(parsedBody.msg);
                            }
        
                       
                        }
                 
               
                  });
            }
            catch(e){
                    console.log("error with logout " + e)
            }


        });
      }
    
      
    result = ""
    result = await checkLoggedIn();
    console.log("RESULT: " +  result)
    if (result == true){
        
        return res.redirect('/dashboard')
        
    }
    else{
        req.session.destroy()
        return res.redirect('/')

    }
    
	 

}