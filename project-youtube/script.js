(function() {

    var searchtext = "";
    var videoItems = [];
    var nextPage="";
    var info_2=[];

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


    function searching(search, page) {
        var xhr = new XMLHttpRequest(search);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {

                var info = JSON.parse(xhr.response);
                console.log(info);

                nextPage = info.nextPageToken;
                info_2 = nextPage;


                var info1 = Object.values(info.items);

                if (info1) {
                    var str = getClipIds(info1);

                    if (str) {
                        statistics(str);
                    }
                }
            }
        } 
        // &pageToken="+page+"

        xhr.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&key=AIzaSyC3nnobkH5nwPBr52O9zHKK2ZWgQbQT86A&q=" + search, true);
        xhr.send();

    };


    function statistics(str) {

        var xhr = new XMLHttpRequest(search);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {

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
        console.log(videoItems);

        addSearchResults(videoItems);

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

        return views.join(',');

    }


    var section = document.createElement("section");
    section.id = "main";
    document.body.appendChild(section);


    function addSearchResults(info1) {

        var sectionSearch = document.createElement("section");
        sectionSearch.id = "second";
        section.appendChild(sectionSearch);


        for (var i = 0; i < info1.length; i++) {

            var videoItems = info1[i];


            var firstDiv = document.createElement("div");
            firstDiv.className = "img-des";
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


        drop = document.createElement("a")
        footer.appendChild(drop);
        drop = document.createElement("a")
        footer.appendChild(drop);
        drop = document.createElement("a")
        footer.appendChild(drop);
    };

    function emptyList() {
        var section = document.getElementById("main");
        if (section) {
            section.innerHTML = " ";
        } else {
            return;
        }

    }


    function addFooter() {
        footer = document.createElement("footer");
        document.body.appendChild(footer);

    }


    function addArrows() {

        leftArrow = document.createElement("a");
        leftArrow.id = "arrow1";
        leftArrow.innerHTML = "LEFT";
        document.body.appendChild(leftArrow);

        rightArrow = document.createElement("a");
        rightArrow.id = "arrow2";
        rightArrow.innerHTML = "RIGHT";
        document.body.appendChild(rightArrow);
    }


    function screenSize() {
        var s = document.innerHTML = "Screen width is " + screen.width; // думаю что лучше делать через проценты, тк будет сразу адаптация и не нужно писать проверку
        console.log(s);

    }



function moveClips() {

    var counter = 0;

    arrow1.onclick = function() {

        var section = document.getElementById("second");
        if (section.style.marginLeft === '0%') {


        } else {
            --counter
            section.style.marginLeft = (-98 * counter) + '%';

        }

    }


    arrow2.onclick = function() {
        var section = document.getElementById("second");
        
        
         if (section.style.marginLeft === '-392%') {

           var page = info_2; 
           console.log(page)

           searching(page);



        } else {
            ++counter
            section.style.marginLeft = (-98 * counter) + '%';

        }

    }

}



    addLogo();
    addInput();
    addFooter();

    screenSize()

    addArrows();
    moveClips();


})();