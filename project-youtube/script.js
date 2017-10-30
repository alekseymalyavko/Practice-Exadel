(function() {


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
    header.appendChild(input);

};

/*header*/

/*body*/

    section = document.createElement("section");
    section.id = "main";
    document.body.appendChild(section);



/*search-result*/

function addSresults(){

    var section_search = document.createElement("section");
    section_search.className = "second";
    section.appendChild(section_search);


    var first_div = document.createElement("div");
    first_div.className="img-des";
    section_search.appendChild(first_div);



    var img = document.createElement("img");
    img.id="img";
    img.src="https://content.rspca.org.uk/cmsprd/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1232999396412&ssbinary=true";
    first_div.appendChild(img);



    var a = document.createElement("a");
    a.id="description_link";
    a.innerHTML = "<h1>"+"Dangerous rabbits"+"</h1>";
	a.href = "";
    first_div.appendChild(a);



   	var p = document.createElement('div');
    p.id="description_text";
    p.innerHTML= "<p>"+"this video about rabbits which killed people"+"</p>"+"<p>"+"Author:"+"ivan petrov"+"</p>";
    first_div.appendChild(p);




    var info_div = document.createElement("div");
    info_div.id="description_stats";
	info_div.innerHTML = "<span>"+"Views:"+"53 000 000"+"</span>"+"<span>"+"Date:"+"21.08.2021"+"</span>";
	first_div.appendChild(info_div);		

};

/*search-result*/






/*body*/


/*footer*/

    footer = document.createElement("footer");
    document.body.appendChild(footer);

    author_1=document.createElement('span')
    author_1.id='author';
   	author_1.innerHTML= "© Malyavko Aleksey";
    footer.appendChild(author_1);


/*footer*/

addLogo();
addInput();
addSresults();


})();