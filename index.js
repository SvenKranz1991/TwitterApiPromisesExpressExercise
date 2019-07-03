const express = require("express");
const app = express();
const tw = require("./twitter");

app.use(express.static("./public"));

app.get("/info.json", function(req, res) {
    tw.makeRequest().then(token => {
        return Promise.all([
            tw.getTweets(token, "nytimes"),
            tw.getTweets(token, "bbcworld"),
            tw.getTweets(token, "theonion")
        ])
            .then(responses => {
                let nytimes = responses[0];
                let bbcworld = responses[1];
                let theonion = responses[2];

                let mergedResults = [...nytimes, ...bbcworld, ...theonion];

                console.log(mergedResults);

                let sorted = mergedResults.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });

                const filtered = sorted
                    .filter(function(t) {
                        return (
                            t.user.name,
                            t.entities.urls && t.entities.urls.length == 1
                        );
                    })
                    .map(function(t) {
                        return {
                            source: t.user.name,
                            text: t.full_text.replace,
                            href: t.entities.urls[0].url
                        };
                    });
                res.json(filtered);
            })
            .catch(() => {
                res.sendStatus(500);
            });
    });
});

app.listen(8080, () => console.log("Listening on 8080"));
