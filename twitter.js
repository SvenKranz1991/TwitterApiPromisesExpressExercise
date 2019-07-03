const https = require("https");
const { consumerKey, consumerSecret } = require("./secrets");

function trimText(textObj) {
    var str = textObj;
    var pos = str.indexOf("http");
    var sliced = str.slice(0, pos);
    console.log(pos);
    return sliced;
}

exports.makeRequest = function() {
    return new Promise((resolve, reject) => {
        const req = https.request(
            {
                method: "POST",
                host: "api.twitter.com",
                path: "/oauth2/token",
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${consumerKey}:${consumerSecret}`
                    ).toString("base64")}`,
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8"
                }
            },
            function(res) {
                if (res.statusCode != 200) {
                    reject(res.statusCode);
                }
                let body = "";
                res.on("data", chunk => (body += chunk));
                res.on("end", () => {
                    console.log("Let me know it Works");
                    console.log("----------Body---------", body);
                    try {
                        body = JSON.parse(body);

                        resolve(body.access_token);
                    } catch (err) {
                        reject(err);
                    }
                });
                res.on("error", err => {
                    console.log(err);
                    reject(err);
                });
            }
        );
        req.write("grant_type=client_credentials");
        req.on("error", err => console.log(err));
        req.end();
    });
};

exports.getTweets = (token, name) => {
    return new Promise((resolve, reject) => {
        const req = https.request(
            {
                method: "GET",
                host: "api.twitter.com",
                path: `/1.1/statuses/user_timeline.json?tweet_mode=extended&screen_name=${name}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            function(res) {
                if (res.statusCode != 200) {
                    return reject(res.statusCode);
                }

                let tweets = "";
                res.on("data", chunk => (tweets += chunk));
                res.on("end", () => {
                    try {
                        tweets = JSON.parse(tweets);

                        resolve(tweets);
                    } catch (err) {
                        reject(err);
                    }
                });
                res.on("error", err => {
                    reject(err);
                });
            }
        );
        req.end();
    });
};
