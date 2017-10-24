
	var arr = [3, 2, 1, 4, 10, 6, 7, 8, 9, 5];	 //массив данных
 	var count = arr.length-1;						//подсчет длины массива
for (var i = 0; i < count; i++) 				//выполнение цикла до конца длины

     for (var j = 0; j < count-i; j++)

        if (arr[j]> arr[j+1]) {

           var max = arr[j];
           arr[j] = arr[j+1];
           
           arr[j+1] = max;
        }

document.write(arr);

console.log(arr);

