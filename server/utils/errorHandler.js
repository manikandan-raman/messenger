const errorHandler = (error, req, res, next) => {
  return res.status(error.statusCode || 500).json({ message: error.message });
};

export default errorHandler;
