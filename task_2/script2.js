(function() {
    'use strict'

    function List(param) {
        this.data = param;

    }

    var a = new List([1,2,3]);


    List.prototype.getFirst = function() {

        return this.data.length ? this.data[0] : null;
    };

    List.prototype.getLength = function() {

        return this.data.length ? this.data.length - 1 : null;
    };


    List.prototype.getLast = function() {

        return this.data.length ? this.data[this.data.length - 1] : null;

    };


    List.prototype.push = function() {

        if (this.data.length <= 0) {
            return null
        }

        this.data[this.data.length] = 56;

        return this.data;

    };


    List.prototype.pop = function(d) {


        if (this.data.length <= 0) {
            return null
        }

        this.data.splice(this.data.indexOf(d), 1);

        return this.data;

    };


    List.prototype.reverse = function() {

        if (this.data.length <= 1) {
            return null
        }


        var newData = [];



        for (var i = this.data.length - 1; i >= 0; i--) {

            newData.push(this.data[i]);
        }

        return newData;

    };



    List.prototype.replace = function replace(d, k) {


        if (this.data.length <= 1) {
            return null
        }

        var t = this.data[d];
        var h = this.data[k];

        this.data[d] = h;
        this.data[k] = t;

        return this.data;

    };


    console.log(a.getFirst());
    console.log(a.getLength());
    console.log(a.getLast());
    console.log(a.push());
    console.log(a.pop(4));
    console.log(a.reverse());
    console.log(a.replace(1, 0));



})();

