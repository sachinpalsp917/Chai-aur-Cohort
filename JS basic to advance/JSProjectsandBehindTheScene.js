//Before we start we will do some machine coding round questions
//as to why machine coding rounds are done it's to get you can work or not
//In machine coding round there are two types one is concept based and another is task based

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// arr[-1] //now what will this print -> undefined

//-------------Proxy---------------
//there comes the concept of proxy which will redefine fundamental operation for a specific task we can write our own proxy. A classic concept of js
//Proxy means simply "talk to my lawyer" i.e you directly doesn't talk but use your lwayer ta make statemnts.

const user = {
  name: "Sachin",
  age: 21,
  password: "123",
};

//now we want if someone wants to access user object it can access all properties except password. Now to do this type of thing we use proxy

// once we define the proxyUser it's going to talk instead of user and it takes two things i.e target and handler
//the target is user and the handler is whatever property is called using proxyUser
const proxyUser = new Proxy(user, {
  get(target, prop) {
    // console.log(target);
    // console.log(prop);
    if (prop === "password") throw new Error("Access Denied");
    return target[prop]; //this thing here just call the property
  },
});
// console.log(proxyUser.name);
// console.log(proxyUser.age);
// console.log(proxyUser.password); //now this will throw error stating access denied while others will not

// Fact: we have been using one proxy property all the time and that is .length like in Array.length

function negativeIndex(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      const index = Number(prop);
      if (index < 0) {
        return target[target.length + index];
      }
      return target[index];
    },
    set(target, prop, value) {
      const index = Number(prop);
      if (index < 0) target[target.length + index] = value;
      else target[index] = value;
      return true;
    },
  });
}

let newArr = negativeIndex(arr)

// console.log(newArr[-2]);
// console.log(arr[1]);

newArr[-2]=22
// console.log(newArr);
// console.log(arr);

