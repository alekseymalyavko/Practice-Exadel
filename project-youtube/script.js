(function() {

    "use strict"

    var counterDots = 0;
    var searchtext = "";
    var videoItems = [];
    var nextPage = "";
    var nextPageToken = [];
    var maxInlineVideos = "";
    var minVideoWidth = 300;
    var res = 12;
    var totalClipsCounter = 0;
    var screenWidth = document.body.clientWidth;

    var header = document.createElement("header");
    document.body.appendChild(header);

    function addLogo() {
        var logo = document.createElement("img");
        logo.src = "yt.png";
        logo.id = "logo";

        header.appendChild(logo);
    }

    function addInput() {

        var input = document.createElement("input");
        input.placeholder = "Search on YouTube";
        input.type = "search";
        input.id = "search";
        input.onkeypress = function(e) {
            e = e || window.event;
            if (e.keyCode === 13) {

                emptyList();

                searchtext = e.target.value;

                searching(searchtext);
            }
        }
        header.appendChild(input);
    };

    function searching(search, PageToken) {
        var xhr = new XMLHttpRequest(search);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {

                var info = JSON.parse(xhr.response);
                var info1 = Object.values(info.items);

                nextPageToken = info.nextPageToken;

                if (info1) {
                    var str = getClipIds(info1);

                    if (str) {
                        statistics(str);
                    }
                }
            }
        }
        var url = "";
        if (PageToken) {
            url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12" + PageToken + "&type=video&key=AIzaSyC3nnobkH5nwPBr52O9zHKK2ZWgQbQT86A&q=" + search;
        } else {
            url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&type=video&key=AIzaSyC3nnobkH5nwPBr52O9zHKK2ZWgQbQT86A&q=" + search;
        }

        totalClipsCounter = totalClipsCounter + 12;
        xhr.open("GET", url, true);
        xhr.send();
    };

    function statistics(str) {

        var xhr = new XMLHttpRequest(search);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {

                var info = JSON.parse(xhr.response);
                var info1 = Object.values(info.items);

                addDescriptions(info1);
            }
        }
        xhr.open("GET", "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + str + "&key=AIzaSyC3nnobkH5nwPBr52O9zHKK2ZWgQbQT86A", true);
        xhr.send();
    };

    function addDescriptions(info1) {

        for (var i = 0; i < videoItems.length; ++i) {
            videoItems[i].statistics = info1[i].statistics;
        }
        addContent(videoItems);
    }

    function getClipIds(items) {

        var clipList = [];
        var views = [];

        for (var i = 0; i < items.length; i++) {

            var entry = items[i];
            var date = new Date(Date.parse(entry.snippet.publishedAt));
            var shortId = entry.id.videoId;

            views.push(shortId);

            clipList.push({
                id: shortId,
                youtubeLink: "http://www.youtube.com/watch?v=" + shortId,
                title: entry.snippet.title,
                thumbnail: entry.snippet.thumbnails.high.url,
                description: entry.snippet.description,
                author: entry.snippet.channelTitle,
                publishDate: (date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear()
            });
        }
        videoItems = clipList;
        console.log(videoItems)

        return views.join(',');
    }

    var sectionSearch = document.createElement("section");
    sectionSearch.id = "second";
    document.body.appendChild(sectionSearch);

    function addContent(info1) {

        for (var i = 0; i < info1.length; i++) {

            var videoItems = info1[i];

            var firstDiv = document.createElement("div");
            firstDiv.id = "img-des";
            sectionSearch.appendChild(firstDiv);


            var img = document.createElement("img");
            img.id = "img";
            img.src = videoItems.thumbnail;
            firstDiv.appendChild(img);


            var a = document.createElement("a");
            a.id = "description_link";
            a.innerHTML = "<h1>" + videoItems.title + "</h1>";
            a.href = videoItems.youtubeLink;
            firstDiv.appendChild(a);


            var p = document.createElement("div");
            p.id = "description_text";
            p.innerHTML = "<p>" + videoItems.description + "</p>" + "<p>" + "Author:" + videoItems.author + "</p>";
            firstDiv.appendChild(p);


            var infoDiv = document.createElement("div");
            infoDiv.id = "description_stats";
            infoDiv.innerHTML = "<span>" + "Views: " + videoItems.statistics.viewCount + "</span>" + "<span>" + "Date: " + videoItems.publishDate + "</span>";
            firstDiv.appendChild(infoDiv);
        }

        if (!document.getElementById("arrowL", "arrowR")) {

            var leftArrow = document.createElement("a");
            leftArrow.id = "arrowL";
            leftArrow.innerHTML = "LEFT";
            document.body.appendChild(leftArrow);



            var rightArrow = document.createElement("a");
            rightArrow.id = "arrowR";
            rightArrow.innerHTML = "RIGHT";
            document.body.appendChild(rightArrow);

            addMoveClipsHandler();
        }

        var maxInlineVideos = Math.floor((screenWidth / minVideoWidth));
        var paddings = 15;

        if (maxInlineVideos === 0) {
            maxInlineVideos = 1;
        }

        var videoWidth = (screenWidth - (maxInlineVideos * 2 * paddings)) / maxInlineVideos;
        var container = document.querySelectorAll('#img-des');

        for (var i = 0; i < container.length; i++) {
            container[i].style.width = videoWidth + 'px';
        }
        addDots(res, maxInlineVideos);
    };

    function emptyList() {
        var section = document.getElementById("second");
        if (section) {
            section.innerHTML = " ";

            counterDots=0;
            totalClipsCounter = 0;
            section.style.transform = "translatex(" + 0 + "px)";

            if (footer) {
                footer.innerHTML = " ";
            }
        } else {
            return;
        }
    }

    function addFooter() {
        var footer = document.createElement("footer");
        footer.id = "footer";
        document.body.appendChild(footer);
    }





    function addDots(res, maxInlineVideos) {

        var dotsOnPage1 = document.querySelectorAll('.drop').length;

        var dotsOnPage2 = Math.ceil((totalClipsCounter / maxInlineVideos)); 

        var ogr = (res / maxInlineVideos);

        for (var i = dotsOnPage1; i < dotsOnPage2; i++) {

            var dots = document.createElement("a")
            dots.className = "drop tooltip";
            dots.id = [i + 1];
            footer.appendChild(dots);

            var tooltip = document.createElement("span")
            tooltip.className = "tooltiptext";
            tooltip.innerHTML = "<p>" + [i + 1] + "</p>";
            dots.appendChild(tooltip);
        }

        var activeDrop = document.getElementById(String(parseInt(dots.id) - Math.ceil(res / maxInlineVideos) + 1)).classList.add("active");
        
        moveDots();
    }



    function moveDots() {

        var dot = document.getElementsByClassName("drop");
        var dotCount = dot.length - 1;

        for (var i = 0; i <= dotCount; i++) {

            dot[i].onclick = function () {


                var counter = this.id;

                activeDot(parseInt(counter));

                var section = document.getElementById("second");

                counterDots = --counter;
                section.style.transform = "translatex(" + (-counter) * screenWidth + "px)";


                var maxInlineVideos = Math.floor((screenWidth / minVideoWidth));
                var blocks = (document.getElementById('second').childNodes.length - 1);

                if ((counterDots) * maxInlineVideos + maxInlineVideos > blocks) {
                var PageToken = "&pageToken=" + nextPageToken;
                searching(searchtext, PageToken);
                }

                var section = document.getElementById("second");
                if (section.style.transform < 'translateX(0px)') {
                    var left = document.getElementById("arrowL");
                    left.style.display = "block";
                } else {
                    var left = document.getElementById("arrowL");
                    left.style.display = "none";
                }
            }
        }
    }








    function addMoveClipsHandler() {

        var left = function () {

            var section = document.getElementById("second");

            if (section.style.transform === 'translateX(0px)') {

                var left = document.getElementById("arrowL");
                left.style.display = "none";

            } else {

                --counterDots
                section.style.transform = "translatex(" + (-counterDots) * screenWidth + "px)";

            }
            activeDot(counterDots + 1);
        }

        document.getElementById('arrowL').onclick = left;



        var right = function () {

            var section = document.getElementById("second");

            var left = document.getElementById("arrowL");
            left.style.display = "block";

            var maxInlineVideos = Math.floor(screenWidth / minVideoWidth);
            var blocks = (document.getElementById('second').childNodes.length - 1);

            if ((counterDots + 1) * maxInlineVideos + maxInlineVideos > blocks) {
                var PageToken = "&pageToken=" + nextPageToken;
                searching(searchtext, PageToken);
            }

            ++counterDots
            section.style.transform = "translatex(" + (-counterDots) * screenWidth + "px)";

            activeDot(counterDots + 1);
        }

        document.getElementById('arrowR').onclick = right;

        addMoveSectionHandlers(left, right);
    }

    function activeDot(counter) {

        var list = document.querySelectorAll("footer>a");
        list.forEach(function(a) {

            if (parseInt(a.id) === counter) {
                a.classList.add("active");
            }
            else a.classList.remove("active");
        });
    }

    function addMoveSectionHandlers(left, right) {

        var x = '';
        var y = '';
        
        var delta = x - y;

        document.getElementById("second").addEventListener("mousedown", function() {
            x = event.clientX;

        });
          

        document.getElementById("second").addEventListener("mouseup", function() {
            y = event.clientX;
            coordinate();

        }); 

        

        function coordinate() {

            var delta = x - y;

            if (delta === 0) {
                return;
            }
       

            var deltaProcent = delta / screenWidth * 100;
            if (deltaProcent > 20) {
                right();
            } else if (deltaProcent < -20) {
                left();
            }
        }
    }

    addLogo();
    addInput();
    addFooter();

})();