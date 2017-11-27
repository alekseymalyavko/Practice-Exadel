(function() {

    var year = 2017;
    var month = 11;

    calendar(year, month);

    function calendar(year, month) {
        var place = document.getElementById("main");
        var monthVisible = document.getElementById("month");
        monthVisible.innerHTML = "Месяц " + month + " Год  	" + year;

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
    };

    function getDay(date) {
        var day = date.getDay();
        if (day === 0) day = 7;
        return day - 1;
    }


    var table = document.querySelector("#dates");
    var field = document.createElement("div");
    field.id = "field";
    document.body.appendChild(field);

    table.onclick = function(event) {

        if (event.target.tagName != 'TD') return;
        else if (event.target.innerHTML === "") return;
        activeTd(event.target);
        field.innerHTML = "День: " + event.target.innerHTML;
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