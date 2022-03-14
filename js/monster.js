var name;
var life;
var money;
var awake = true;

var nbds = 0;

function init(n, l, m) {
    name = n;
    life = l;
    money = m;
}

/*function showme(){
    window.alert("nom du monstre: " + name + " vie du monstre: " + life + " argent du monstre: " + money);
}*/

function showme(){
    log("nom du monstre: " + name + " vie du monstre: " + life + " argent du monstre: " + money);
}

//init("MunsterLeFromage", 200, 2021);

//showme();

function go(){
    init("HommeOursPorc", 100, 66);
    showme();
}

window.onload = () => {go()};

function log(message){
    let parentElement = document.getElementById("actionbox");
    let theFirstChild = parentElement.firstChild;
    let p = document.createElement("p");
    parentElement.insertBefore(p, theFirstChild);
    var textp = document.createTextNode(message);
    p.appendChild(textp);
}

var actionbox = document.getElementById("actionbox");
actionbox.onclick = (e) => {};

function displayStatus(life, money, awake){
    var s = document.querySelector("ul#status");
    var lc = s.childNodes;

    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");

    let l = document.createTextNode(" Life : "+ life + " / ");
    let m = document.createTextNode(" Money : "+ money +" / ");
    let a = document.createTextNode("Awake : "+ awake );

    li1.appendChild(l);
    li2.appendChild(m);
    li3.appendChild(a);

    s.replaceChild(l, lc[1]);
    s.replaceChild(m, lc[2]);
    s.replaceChild(a, lc[3]);

    var monster = document.getElementById('monster');

    monster.style.border = `${money/4}px solid black`;

    monster.style.height = `${life*3}px`;

    if (life <= 25){
        monster.style.backgroundColor = 'red';
        monster.style.height = `75px`;
    }
    if (life > 25 && life <= 50){
        monster.style.backgroundColor = 'orange';
    }
    if (life > 50 && life <= 75){
        monster.style.backgroundColor = 'blue';
    }
    if (life > 75){
        monster.style.backgroundColor = 'green';
    }
    if (money <= 10){
        monster.style.border = `3px solid black`;
    }
}

window.addEventListener("load", () => {
    displayStatus(life, money, awake);
});

function run(){
    if (awake == true && life > 0){
        life = life - 1;
        if (life < 0) {
            life = 0;
        }
        log("perte d un point de vie");
    }
    displayStatus(life, money, awake);
}

var b2 = document.getElementById("b2");
b2.onclick = (e) => {run()};

function fight(){
    if (awake == true && life > 0){
        life = life - 3;
        if (life < 0) {
            life = 0;
        }
        log("perte de 3 points de vie");
    }
    displayStatus(life, money, awake);
}

var b3 = document.getElementById("b3");
b3.onclick = (e) => {fight()};

function work(){
    if (awake == true && life > 0){
        life = life - 1;
        if (life < 0) {
            life = 0;
        }
        money = money + 2;
        log("perte d un point de vie et gain de 2 unites d argent");
    }
    displayStatus(life, money, awake);
}

var b7 = document.getElementById("b7");
b7.onclick = (e) => {work()};

function sleep(){
    if (awake == true && life > 0){
        awake = false;
        log("le monstre est endormi");
        displayStatus(life, money, awake);
        monster.style.opacity = 0.5;
        let a = nbds;
        setTimeout(function(){
            if (life > 0 && nbds == a){
                log("le monstre est reveille");
                life = life + 1;
                awake = true;
                displayStatus(life, money, awake);
                monster.style.opacity = 1;
            }
        }, 7000);
    }
}

var b4 = document.getElementById("b4");
b4.onclick = (e) => {sleep()};

function eat(){
    if (awake == true && life > 0 && money > 0){
        money = money - 3;
        if (money < 0){
            money = 0;
        }
        life = life + 2;
        log("perte de 3 unites d argent et gain de 2 points de vie");
    }
    displayStatus(life, money, awake);
}

var b5 = document.getElementById("b5");
b5.onclick = (e) => {eat()};

var b6 = document.getElementById("b6");
b6.onclick = (e) => {showme()};

function hasard(){
    var tab = [run, fight, work, sleep, eat];
    var index = Math.floor( Math.random() * tab.length );
    tab[index]();
}

setInterval(function(){ hasard(); }, 12000);

function NewLife(){
    if (life == 0){
        awake = true;
        monster.style.opacity = 1;
        life = life + 100;
        displayStatus(life, money, awake);
        log("une nouvelle vie commence pour " + name);
    }
}

var b1 = document.getElementById("b1");
b1.onclick = (e) => {NewLife()};

function Kill(){
    nbds = nbds + 1;
    awake = false;
    life = 0;
    monster.style.opacity = 0.5;
    log(name + " nous a quitté...");
    displayStatus(life, money, awake);
}

var k = document.getElementById("k");
k.onclick = (e) => {Kill()};