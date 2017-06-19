
export default function errorHandler(err, req, res, next){

    const payload = {
      name: err.name,
      message: err.message,
      kind: err.kind
    };

  if(payload.name == 'CastError'){
    res.status('422').json(payload);
  } else if (payload.name == 'NotFound') {
    res.status('404').json(payload);
  } else if (payload.name == 'ValidationError') {
    res.status('422').json(payload);
  } else {
    res.status('500').json(payload);
  }
}