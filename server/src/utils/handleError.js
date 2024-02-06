const handleErrors = (err, req, res, next) => {
  console.log({err})
  return res.status(500).json({
      status: 'error',
      message: err.message
  });
}


export default handleErrors;