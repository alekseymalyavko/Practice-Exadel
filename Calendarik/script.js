(function() {

    function addSection() {
        var calendar = document.createElement("section");
        calendar.id = "calendar";
        calendar.innerHTML = "<h1>" + "CALENDARIK" + "</h1>";
        document.body.appendChild(calendar);

        var place = document.createElement("div");
        place.id = "main";
        calendar.appendChild(place);
    }


    function calendar(year, month) {

		var place = document.getElementById("main");

    	var currentMonth = document.createElement("div");
        currentMonth.id = "month";        
        currentMonth.innerHTML = month;

        place.appendChild(currentMonth);

        var arrows = document.createElement("div");
        arrows.id = "arrows";
        currentMonth.appendChild(arrows);

        var arrowL = document.createElement("span")
        arrowL.src = "L.png";
        arrowL.id = "arrowL";
        
        arrows.appendChild(arrowL);

        var arrowR = document.createElement("span")
        arrowR.src = "R.png";
        arrowR.id = "arrowR";
        
        arrows.appendChild(arrowR);

        var dates = document.createElement("div");
        dates.id = "dates";
        place.appendChild(dates);


        
        var monthJs = month - 1;
        var date = new Date(year, monthJs);

        var table = '<table><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>';

        for (var i = 0; i < getDay(date); i++) {
            table += '<td></td>';
        }

        while (date.getMonth() === monthJs) {
            table += '<td>' + date.getDate() + '</td>';

            if (getDay(date) % 7 === 6) {
                table += '</tr><tr>';
            }

            date.setDate(date.getDate() + 1);
        }

        if (getDay(date) != 0) {
            for (var i = getDay(date); i < 7; i++) {
                table += '<td></td>';
            }
        }
        table += '</tr></table>';

        dates.innerHTML = table;
    }

    function getDay(date) {
        var day = date.getDay();
        if (day === 0) day = 7;
        return day - 1;
    }


    // function addArrowsHedler(){
    // 	var count = this.monthJs;
    // 	var year = this.year;

    // 	document.getElementById("arrowR").addEventListener("onclick", function() {
    // 		if (count <= 11){
    // 			var count = 0;
    // 			year += 1;  
    // 		}
    // 		count++
    // 	});

    // 	calendar(year, count++)	
    // }

    addSection();

    // var year = prompt("Какой год?","");
    // var month = prompt("Какой месяц?","");

    calendar(2017, 11);

})();