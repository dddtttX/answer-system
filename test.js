let arr1 = [1, 2, 3, 4, 5]
let arr2 = [{ a: 1, b: 2 }, { a: 3, b: 4 }]

arr1.forEach((item,index) => {
    if (item == 2) {
        // item = 6
        item[index] = 6
    }
})
console.log(arr1);

arr2.forEach(item => {
    if (item.a == 1) {
        item.a = 5
    }
})
console.log(arr2);
