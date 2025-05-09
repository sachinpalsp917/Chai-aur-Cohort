//before we start let's talk about blocking and non-blocking code i.e. sync and async code
//code that waits for none is called async i.e it does not block the code and code that waits till a specific task is completed is called synchronus code i.e it blocks the code.

//let's take example of sync code
// const fs = require('fs')
// console.log("hello");
// const content = fs.readFileSync('Code/JS basic to advance/resources/hello.txt','utf-8')
// console.log("content of file is: ",content);
// console.log("end of code");

// now the above code is the example of sync code i.e it first prints hello then it goes for reading the file and only after the file is read then only it starts to proceed further.

// As for the async code we will use the same example
// const fs = require('fs')
// console.log("hello");
// fs.readFile("Code/JS basic to advance/resources/hello.txt","utf-8",function (err,content){
//     if(err)
//         console.log("Error reding file");
//     else
//         console.log("content of file is: ",content);
// })
// console.log("end of code");
//now as we can see the output is same but the order is changed to async manner
//Fact -> In previous time when there were no promises in js coders tend to use callbacks in every code to make the code async. In every function there used to be a callback as the last parameter so that it became async and the code runs smoothly without blocking any further code.

//now let's do some exercise
const fs1 = require("fs");
const { resolve } = require("path");
// console.log("Starting Program");
// fs1.readFile(
//   "Code/JS basic to advance/resources/hello copy.txt",
//   "utf-8",
//   function (err, content) {
//     if (err) console.log("Error in reading file", err);
//     else {
//       console.log("File read: ", content);
//       fs1.writeFile(
//         "Code/JS basic to advance/resources/backup.txt",
//         content,
//         function (err) {
//           if (err) console.log("Error in creating backup.txt", err);
//           else {
//             fs1.unlink(
//               "Code/JS basic to advance/resources/hello copy.txt",
//               function (err) {
//                 if (err) console.log("Error in deleting hello copy.text", err);
//                 else {
//                   console.log("file delete success");
//                 }
//               }
//             );
//           }
//         }
//       );
//     }
//   }
// );

// console.log("End of code");

//our work is done but you see the code there are multiple callbacks inside another callback and all now this scenario here is called "callback hell" -> where there is callback inside callback inside callback and so on but this can be resolved using promises

// const fsv2 = require("fs/promises");

// fsv2
//   .readFile("Code/JS basic to advance/resources/hello copy.txt", "utf-8")
//   .then((content) =>
//     fsv2.writeFile("Code/JS basic to advance/resources/backup.txt", content)
//   )
//   .then(() => fsv2.unlink("Code/JS basic to advance/resources/hello copy.txt"))
//   .catch((e) => console.log("Error", e));
//this is the same work done but using promises and it looks much cleaner and readable and this is called modern code while the upper one was called legacy code

//now what if we want to create functionality like readFile or writeFile using promises i.e we wamt to make make out own custom promises.

//now this is a custom promise for readFile 
function readFileWithPromise(filepath, encoding) {
  return new Promise((resolve, reject) => {
    fs1.readFile(filepath, encoding, (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

//now we will write that for writeFile
function writeFileWithPromise(filepath,content){
    return new Promise((resolve,reject) =>{
        fs1.writeFile(filepath,content,function(err){
            if(err)
                reject(err)
            else
                resolve()
        })
    })
}

//now we will weite that for unlink
function unlinkWithPromise(filepath){
    return new Promise((resolve,reject) =>{
        fs1.unlink(filepath,(err)=>{
            if(err)
                reject(err)
            else
                resolve()
        })
    })
}


// readFileWithPromise(
//   "Code/JS basic to advance/resources/hello copy.txt",
//   "utf-8"
// )
// .then((content) => {writeFileWithPromise("Code/JS basic to advance/resources/backup.txt",content)})
// .then(()=>unlinkWithPromise("Code/JS basic to advance/resources/hello copy.txt"))
// .catch((e) => {console.log(e);});

//at last we have created our own custom functions for our legacy code i.e we have written some wrappers(chocolate wala wrapper hi samaj lo) on top of promises for our own functions and this thing is called Promisification(converting a legacy callback code to support promises)

//Now we will learn about async and await -> running async code in a sync manner
//we use async await because at some point if we use too much .then() and .catch() then we can have a .then() or .catch() hell so to avoid these we use async await(it's just syntactic sugar)
//just like from like 113 to 119 -> multiple async line are running in a sync manner

//now to async and await we first have to define async function and the push all the await statment inside the function

//for better understanding we will use the above example only just that if we use async await and if there is an error so we use the try catch block.

function wait(seconds){
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(),seconds*1000)
    })
}

async function doTasks(){
    try{
        const content = await readFileWithPromise("Code/JS basic to advance/resources/hello copy.txt",'utf-8')
        await writeFileWithPromise("Code/JS basic to advance/resources/backup.txt",content)
        //task -> write a wait function to block the code for 10 seconds
        await wait(10)
        await unlinkWithPromise("Code/JS basic to advance/resources/hello copy.txt")
    }catch(e){
        console.log(e);
    }finally{
        console.log("All done at last");
    }
}

doTasks().then(()=>console.log("All done"))
//this is also doing the same work as above just the difference is it looks nice
