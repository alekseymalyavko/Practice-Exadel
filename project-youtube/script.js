(function() {

    var searchtext = "";
    var videoItems = [];




    /*header*/
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
                searchtext = e.target.value;

                searching();
                emptyList();

            }
        }
        header.appendChild(input);

    };


    function searching() {
        var xhr = new XMLHttpRequest(searchtext);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {


                var info = JSON.parse(xhr.response);

                console.log(info);
                var info1 = Object.values(info.items);

                if (info1) {
                    initClipList(info1);
                }
            }
        }
        xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyC3nnobkH5nwPBr52O9zHKK2ZWgQbQT86A&q=' + searchtext, true);
        xhr.send();

    };

    function initClipList(items) {

        var clipList = [];

        for (var i = 0; i < items.length; i++) {

            var entry = items[i];
            var date = new Date(Date.parse(entry.snippet.publishedAt));
            var shortId = entry.id.videoId;


            clipList.push({
                id: shortId,
                youtubeLink: "http://www.youtube.com/watch?v=" + shortId,
                title: entry.snippet.title,
                thumbnail: entry.snippet.thumbnails.high.url,
                description: entry.snippet.description,
                author: entry.snippet.channelTitle,
                // viewCount: entry.brandingSettings.trackingImageUrl,
                publishDate: (date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear()
            });
        }

        videoItems = clipList;

        console.log(videoItems);


        if (videoItems) {
            addSresults(videoItems);
        }
    }




    /*header*/

    /*body*/





    /*search-result*/

    function addSresults(items) {

        section = document.createElement("section");
        section.id = "main";
        document.body.appendChild(section);

        var section_search = document.createElement("section");
        section_search.id = "second";
        section.appendChild(section_search);



        for (var i = 0; i < items.length; i++) {

            var videoItems = items[i];



            var first_div = document.createElement("div");
            first_div.className = "img-des";
            section_search.appendChild(first_div);



            var img = document.createElement("img");
            img.id = "img";
            img.src = videoItems.thumbnail;
            first_div.appendChild(img);



            var a = document.createElement("a");
            a.id = "description_link";
            a.innerHTML = "<h1>" + videoItems.title + "</h1>";
            a.href = videoItems.youtubeLink;
            first_div.appendChild(a);



            var p = document.createElement('div');
            p.id = "description_text";
            p.innerHTML = "<p>" + videoItems.description + "</p>" + "<p>" + "Author:" + videoItems.author + "</p>";
            first_div.appendChild(p);




            var info_div = document.createElement("div");
            info_div.id = "description_stats";
            info_div.innerHTML = "<span>" + "Views:" + videoItems.viewCount + "</span>" + "<span>" + "Date:" + videoItems.publishDate + "</span>";
            first_div.appendChild(info_div);

        }


    };


    function emptyList() {

        document.body.removeChild(section);

    }





    /*search-result*/






    /*body*/


    /*footer*/
    function addFooter() {
        footer = document.createElement("footer");
        document.body.appendChild(footer);

        drop = document.createElement('a')
        footer.appendChild(drop);
    }

    /*footer*/

    addLogo();
    addInput();
    // addSresults();
    addFooter();

})();