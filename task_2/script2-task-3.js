(function() {

    var a = new Array(1, 2, 3);

    Array.prototype.getFirst = function() {

        return a[0];

    };

    console.log(a.getFirst());





    var b = new Array(1, 2, 3, 4, 6, 9);

    Array.prototype.getLength = function() {

        return b.length;

    };

    console.log(b.getLength());



    var c = new Array(1, 2, 3, 4, 100);

    Array.prototype.getLast = function() {

        return c[c.length - 1];

    };

    console.log(c.getLast());




    var d = new Array(1, 2, 3, 4, 100);

    Array.prototype.getpush = function() {
        d.push(9);
        return d;

    };

    console.log(d.getpush());



    var e = new Array(1, 2, 3);

    Array.prototype.getpop = function() {
        e.pop();
        return e;

    };

    console.log(e.getpop());




    var k = new Array(1, 2, 3, 4, 5, 6);

    Array.prototype.getreverse = function() {
        k.reverse();
        return k;

    };

    console.log(k.getreverse());






    // var r = new Array('frog', 'dog');

    // Array.prototype.getreplace = function() {
    //     r.replace('frog', 'dog');
    //     return r;

    // };

    // console.log(r.getreplace());




})();