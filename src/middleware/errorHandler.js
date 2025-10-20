function notFound(req, res, next) {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
  }
  
  function errorHandler(err, req, res, next) { // eslint-disable-line
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
      error: {
        code: err.code || 'SERVER_ERROR',
        message: err.message || 'Something went wrong'
      }
    });
  }
  
  module.exports = { notFound, errorHandler };
  