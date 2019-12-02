exports.handler = function(event, context, callback) {
    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type"
      };

      if (event.httpMethod !== "POST") {
        return callback(null, {
          statusCode: 401,
          headers,
          body: "This was not a POST request"
        })
      }

    let body;

    const secretContent = `
    <h3>Welcome To The Secret Area</h3>
    <p>Here we can tell you that the sky is <strong>blue</strong> and 2+2 = 4</p>
    `;

    if(event.body) {
      body = JSON.parse(event.body);  
    }else {
        body = {};
    }

    if(body.password === 'javascript') {
        callback(null, {
            statusCode: 200,
            headers,
            body: secretContent,
            
        });
    }else {
        callback(null, {
            statusCode: 401,
            headers,
            body: 'You do not have access to this content',
        });
    }

   
}