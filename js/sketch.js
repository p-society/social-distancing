let button;

let particles = [];
let slider;
let numP = 199;
let sdfactor;
let infected = 0.01;

let numInfec = 0;
let numHealt = 0;
// let numCured = 0;

let frameCount;
let cureday = 10 * 150;


function setup() {

    var canvasDiv = document.getElementById('sketch-holder');
    var rel=document.createClass

    slider = createSlider(0, 1, 0.5, 0.05);
    slider.parent('slider');

    button = createButton('Reload')
    button.mousePressed(reload);
    button.parent('reload');


    bgcanvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    bgcanvas.style(
        "cursor: none; z-index:-1000 ; border:1px; border-style: groove; "
    );
    bgcanvas.parent('sketch-holder');

    reload();

}

function draw() {
    numInfec = 0;
    numHealt = 0;
    background(0);
    textSize(50);

    fill(0, 102, 153);
    text(sdfactor, 20, 120);


    // document.getElementById("sdfactor").innerHTML = slider.value();
    document.getElementById("time passed").innerHTML = int(frameCount / 10) + ' Days';

    particles.forEach(p => {
        p.collide();
        p.move();
        p.show();

        if (p.infected == true) {
            numInfec++;
        } else if (p.infected == false && p.vaccinetime > 0) {
            numHealt++;
        }


        if (frameCount >= cureday) {
            if (p.infected) {
                p.vaccinetime--;
            }
        }

    });

    frameCount++;

}

function reload() {
    frameCount = 0;
    for (let i = 0; i < numP; i++) {
        particles[i] = new Particle(
            random(width),
            random(height),
            i,
            particles,
            Math.random() < sdfactor ? 0 : 1,
            Math.random() < infected ? true : false,
            random(0, 5000)

        );
    }
    sdfactor = slider.value();

    hdps = [];
    idps = [];
}