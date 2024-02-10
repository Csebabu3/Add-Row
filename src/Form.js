// import React from 'react'

// function Form() {
//   return (
//     <div>
//       let input = "big black bug bit a big black dog on his big black nose";
//       let charactor = {};
//       console.log("big")
//       for(let i=0; i<input.length; i++){
//         if(charactor[input[i]]{

//         })
//       }
      
//     </div>
//   )
// }

// export default Form
 
// Example 2
let arr = ["a", "b", "c", "d"];
let reversedArr = [];

for (let i = arr.length - 1; i >= 0; i--) {
    reversedArr.push(arr[i]);
}

console.log("Original array:", arr);
console.log("Reversed array:", reversedArr);

// Example 3
let arr1 = ["1", "2", "3", "4"];
let reversedArr1 = [];

for (let i = arr.length - 1; i >= 0; i--) {
    reversedArr1.push(arr[i]);
}

console.log("Original array:", arr1);
console.log("Reversed array:", reversedArr);

// Example 4
const date = new Date('2023-12-23');
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayOfWeek = daysOfWeek[date.getUTCDay()];

console.log(`The day for 23/12/2023 is: ${dayOfWeek}`);

