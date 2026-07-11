export function successResponse(res, data, message = 'Success', status = 200) {
  return res.status(status).json({ success: true, message, data });
}

export function errorResponse(res, message = 'Error', status = 500, error = null) {
  return res.status(status).json({ success: false, message, error });
}
