const monitor = {
    res: "1024x768",
    d: "17"
};

const samsung = Object.create(monitor);
samsung.d = "19";
samsung.sayHelloMsg = function(){
    console.log("Hello from Samsung!")
};
// samsung = {
//     sound: true,
// };

samsung.sayHelloMsg();
