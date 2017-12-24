module.exports.runHealthCheck = (event, context, callback) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello From Serverless.',
      }),
    };
    callback(null, response);
  };