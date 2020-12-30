
module.exports =  async(req, res) => {


	
	result = req.result
	

	res.render('index', {
		result:result,
		data: req.body
	})

}