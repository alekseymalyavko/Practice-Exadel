(function() {

    var year = moment().year();
    var month = moment().month()+1;

    calendar(year, month);

    function calendar(year, month) {
    	year = year;
    	month = month;
        var place = document.getElementById("main");
        var monthVisible = document.getElementById("month");
        monthVisible.innerHTML = moment().month(month-1).year(year).format("MMMM YYYY");

        var monthJs = month - 1;
        var date = new Date(year, monthJs);

        var table = '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Sn</th></tr><tr>';

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
    };

    function getDay(date) {
        var day = date.getDay();
        if (day === 0) day = 7;
        return day - 1;
    }

    var timeDate = document.getElementById("timeDate");
    var time = document.getElementById("clock");
    time.innerHTML = moment().format('LTS');
    timeDate.innerHTML = moment().format('LL'); 
    setInterval(function () {
    time.innerHTML = moment().format('LTS'); 
    }, 1000)
   






    var table = document.querySelector("#dates");
    table.onclick = function(event) {
        if (event.target.tagName != 'TD') return;
        else if (event.target.innerHTML === "") return;
        activeTd(event.target);
        field.innerHTML =  moment(""+year+""+""+month+""+""+event.target.innerHTML+"", 'YYYY/MM/DD').format('dddd')+" "+event.target.innerHTML;
    };

    var selectedTd;
    function activeTd(Td) {
        if (selectedTd) {
            selectedTd.classList.remove('active');
        }
        selectedTd = Td;
        selectedTd.classList.add('active');
    };

    document.getElementById("arrowL").addEventListener("click", function() {
        this.month = month--;
        if (month <= 0) {
            year--;
            month = 12;
        }
        calendar(year, month)

    });

    document.getElementById("arrowR").addEventListener("click", function() {
        this.month = month++;
        if (month > 12) {
            year++;
            month = 1;
        }
        calendar(year, month)
    });

})();