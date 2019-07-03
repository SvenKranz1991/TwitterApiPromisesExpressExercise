console.log("sanity check");
console.log("realsanitycheck");
console.log("realsanitycheck", $);

(function() {
    // var headlines = document.getElementById("headlines");
    var headlines = $("#headlines");

    // var links = headlines.getElementsByTagName("A");
    var links = $("a"); // $("[href]") //$("#tagline")
    // var left = headlines.offsetLeft;
    var left = headlines.offset().left;

    var animId;

    $.ajax({
        url: "info.json",
        success: function(links) {
            console.log(links);
            var html = "";
            for (var i = 0; i < links.length; i++) {
                html +=
                    "<a href='" +
                    links[i].href +
                    "'id='tagline'>" +
                    links[i].text +
                    "</a>";
            }
            $("#headlines").append(html);
        }
    });

    function moveHeadlines() {
        left--;
        console.log(left);
        if (left <= -links.eq(0).offsetWidth) {
            left += links.eq(0).offsetWidth;

            headlines.append(links.eq(0));
        }

        // if (left <= -links[0].offsetWidth) {
        //     left += links[0].offsetWidth;
        //     headlines.appendChild(links);
        // }

        console.log(left);
        // move headlines to left
        // headlines.style.left = left + "px";
        headlines.css({
            left: left + "px"
        });

        animId = requestAnimationFrame(moveHeadlines);
    }
    moveHeadlines();
    headlines.on("mouseover", function() {
        cancelAnimationFrame(animId);
    });

    // headlines.addEventListener("mouseleave", function() {
    headlines.on("mouseleave", function() {
        moveHeadlines();
    });
})();

// One Time Event Handler
// $(e.currentTarget).off("click", functionName);
