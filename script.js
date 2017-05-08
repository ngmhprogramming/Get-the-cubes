var vid = document.getElementById("v");
var highscores = [];
vid.play();
vid.onended = function(){
    highscores.push(cubesSolved);
    highscores = highscores.sort(function(a, b){return a-b});
    document.getElementById("score").innerHTML = cubesSolved;
    cubesSolved = 0;
    vid.play();
}
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 338;
document.body.appendChild(canvas);
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
}
bgImage.src = "background.jpg";
var feliksReady = false;
var feliksImage = new Image();
feliksImage.onload = function(){
    feliksReady = true;
}
feliksImage.src = "feliks.png";
var cubeReady = false;
var cubeImage = new Image();
cubeImage.onload = function(){
    cubeReady = true;
}
cubeImage.src = "cube.png";
var feliks = {
    speed: 256,
    x: 0,
    y: 0,
};
var cube = {
    x: 0,
    y: 0
};
var cubesSolved = 0;
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
var reset = function(){
    feliks.x = canvas.width/2;
    feliks.y = canvas.height/2;
    cube.x = 32 + (Math.random() * (canvas.width - 64));
    cube.y = 32 + (Math.random() * (canvas.height - 64));
};
var update = function(modifier){
    if(38 in keysDown){
        feliks.y -= feliks.speed * modifier;
    }
    if(40 in keysDown){
        feliks.y += feliks.speed * modifier;
    }
    if(37 in keysDown){
        feliks.x -= feliks.speed * modifier;
    }
    if(39 in keysDown){
        feliks.x += feliks.speed * modifier;
    }
    if(feliks.x <= (cube.x + 32) && cube.x <= (feliks.x + 32) && feliks.y <= (cube.y + 32) && cube.y <= (feliks.y + 32)){
        cubesSolved++;
        reset();
    }
};
var render = function(){
    if(bgReady){
        ctx.drawImage(bgImage, 0, 0);
    }
    if(feliksReady){
        ctx.drawImage(feliksImage, feliks.x, feliks.y);
    }
    if(cubeReady){
        ctx.drawImage(cubeImage, cube.x, cube.y);
    }
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Cubes solved:" + cubesSolved, 32, 32);
};
var main = function(){
    var now = Date.now();
    var delta = now - then;
    update(delta/1000);
    render();
    then = now;
    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
main();