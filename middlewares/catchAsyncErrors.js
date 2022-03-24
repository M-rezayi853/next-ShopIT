// eslint-disable-next-line import/no-anonymous-default-export
export default (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next)

// module.exports = (func) => {
//   return (req, res, next) => {
//     func(req, res, next).catch(next)
//   }
// }
