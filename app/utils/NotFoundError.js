
// Create a new object, that prototypally inherits from the Error constructor.
function NotFound(message) {
  this.name = 'NotFound';
  this.message = message || 'Default Message';
  this.kind = 'castId';
}

NotFound.prototype = Object.create(Error.prototype);
NotFound.prototype.constructor = NotFound;

const notFound = NotFound;

exports.NotFound = notFound;