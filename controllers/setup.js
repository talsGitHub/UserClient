
module.exports =  async(req, res) => {


	error = req.session.error

	
	res.render('setup', {
		error: error
	})

}