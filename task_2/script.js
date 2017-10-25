(function() {

    var m = [1, 2, 3, 4, 10, 6, 7, 8, 9, 5, 11, 14, 15, 13, 12];

    for (var i = 0; i < m.length - 1; i++) {


        for (var j = i + 1; j < m.length; j++) {

            if (m[j] < m[i]) {

                var mm = m[i];
                m[i] = m[j];
                m[j] = mm;
            }
        }
    }

    document.write(m);
    console.log(m);

})();