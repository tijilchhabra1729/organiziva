var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 7;
var dragging = false;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;



context.lineWidth = radius*2;

var putPoint = function(e){
    if (dragging){
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.arc(e.offsetX, e.offsetY,radius,0 , Math.PI*2);
        context.fill();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
        
    }
}

var engage = function(e){
    dragging = true;
    putPoint(e);
}
var disengage = function(){
    dragging = false;
    context.beginPath();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);


// toolbar here:

// PEN RADIUS

var setRadius = function(newRadius){
    if (newRadius < minRad)
            newRadius = minRad;
    
    else if (newRadius > maxRad)
        newRadius = maxRad;
    radius = newRadius;
    context.lineWidth = radius*2;

    radSpan.innerHTML = radius;

}

var minRad = 1,
    maxRad = 100,
    defaultRad = 5,
    interval = 1;
    radSpan = document.getElementById('radval'),
    decRad = document.getElementById('minus'),
    incRad = document.getElementById('plus');


decRad.addEventListener('click', function(){

    setRadius(radius-interval);
});

incRad.addEventListener('click', function(){

    setRadius(radius+interval);
});

setRadius(defaultRad);

// PEN COLOR

var swatches = document.getElementsByClassName('swatch');

for (var i = 0, n=swatches.length; i < n ; i++){
    swatches[i].addEventListener('click', setSwatch);
}

function setColor(color){
    context.fillStyle = color ;
    context.strokeStyle = color;
    var active = document.getElementsByClassName('active')[0];

    if (active){
        active.className = 'swatch';
    }
}

function setSwatch(e){
    var swatch = e.target;
    setColor(swatch.style.backgroundColor);
    swatch.className += ' active';
}
