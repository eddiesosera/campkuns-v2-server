const catchAsync = (fn) => (req, res, next) => {
  console.log('Catch Sync works')
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};


// const catchAsync = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch((err) => {
//     // Log the error for debugging purposes
//     console.error('Error in catchAsync:', err);
//     next(err);
//   });
// };

module.exports = catchAsync;
