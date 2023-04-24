function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
  
// function errorHandler(err, _, res, next){
//   if (res.headersSent) {
//     return next(err)
//   }
//   res.status(500)
//   res.render('error', { error: err })
// }

  module.exports = {
    errorHandler,
  };