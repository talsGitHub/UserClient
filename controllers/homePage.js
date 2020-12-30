
module.exports =  async(req, res) => {


	//error = req.session.error
	result = req.result
	
	
	res.render('index', {
		//error: error
		result:result,
		data: req.body
	})

}