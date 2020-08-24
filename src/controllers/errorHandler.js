function nonExistingEndpointHandler (req, res, next) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
}
  
function errorHandler (error, req, res, next) {
	res.status(error.status || 500)
	if (error.status == 404) {
		return res.json({
			message: 'La ruta especificada no existe'
		});
	} else {
		return res.json({
			message: 'Error interno de servidor, reintente en unos minutos por favor',
			error: error.message
		});
	}
}

module.exports = {
    nonExistingEndpointHandler,
    errorHandler
}
