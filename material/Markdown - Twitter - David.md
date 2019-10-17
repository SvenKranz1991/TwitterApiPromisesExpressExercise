1. create a directory for project

    - a static folder containing ticker html, css, js files
    - one GET route with the same url that the ticker js is currently making an ajax request to

        - First get the token

            - POST to /oauth2/token
            - Authorization header ("Basic " + consumer key and consumer secret joined on colon and base64 encoded)
            - Content-Type header: "application/x-www-form-urlencoded;charset=UTF-8"
            - request body: "grant_type=client_credentials"

            /////////////- works till here?

            - when full body has arrived, `JSON.parse` it and call the callback with the `access_token` as the second argument (and `null` as the first)

            ///////////- is there

            - errors:
                - request error event
                - response error event
                - non-200 status code
                - json parse error

            //////////- something missing?

            - in case of error call callback with the error as the first argument and no second argument


            -------------- am I here yet?
        * Second get the tweets
            * GET request to "/1.1/statuses/user_timeline.json?tweet_mode=extended&screen_name=" + the twitter account name
            * Authorization header: "Bearer " + token
            * No content-type header
            * No body
            * errors:
                * request error event
                * response error event
                * non-200 status code
                * json parse error
            * in case of error call callback with the error as the first argument and no second argument
            * after the body is received, `JSON.parse` it to get an array of tweet objects
                * each object will have a `full_text` property. that is the text we want
                * filter out tweets that have no `entities.urls` property or whose `entities.urls.length` does not equal 1
                * map the array of tweet objects into an array of objects with the correct properties
                * the tweets passed as second argument to the callback should be passed by the route to `res.json`
