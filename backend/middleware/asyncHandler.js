// instead of writing the full code each async => try catch
const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next);

export default asyncHandler;