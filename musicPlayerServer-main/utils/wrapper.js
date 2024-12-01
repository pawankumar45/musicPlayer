const success = (statuscode, result, message) => {
  return {
    status: "ok",
    statuscode,
    result,
    message
  };
};
const error = (statuscode, message) => {
  return {
    status: "error",
    statuscode,
    message,
  };
};

module.exports = { success, error };