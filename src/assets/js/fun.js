
var app = new PIXI.Application();
document.body.appendChild(app.view);

var count = 0;

// build a rope!
var ropeLength = 30;

var points = [];

for (var i = 0; i < 30; i++) {
    points.push(new PIXI.Point(i * ropeLength, 0));
}

var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('required/assets/snake.png'), points);
var yup = new PIXI.mesh.Rope(PIXI.Texture.fromImage('required/assets/snake.png'), points);

yup.x = -40;
yup.y = 150;

strip.x = -40;
strip.y = 450;

app.stage.addChild(strip);
app.stage.addChild(yup);

var g = new PIXI.Graphics();
g.x = yup.x;
g.y = yup.y;
app.stage.addChild(g);

var b = new PIXI.Graphics();
b.x = strip.x;
b.y = strip.y;
app.stage.addChild(b);

// start animating
app.ticker.add(function() {

    count += 0.1;

    // make the snake
    for (var i = 0; i < points.length; i++) {
        points[i].y = Math.sin((i * 0.5) + count) * 30;
        points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    }
    renderPoints();
});

function renderPoints () {

    g.clear();
    b.clear();

    g.lineStyle(2,0xffc2c2);
    b.lineStyle(2,0xffc2c2);
    g.moveTo(points[0].x,points[0].y);
    b.moveTo(points[0].x,points[0].y);

    for (var i = 1; i < points.length; i++) {
        g.lineTo(points[i].x,points[i].y);
    }
    for (var i = 1; i < points.length; i++) {
        b.lineTo(points[i].x,points[i].y);
    }

    for (var i = 1; i < points.length; i++) {
        g.beginFill(0xff0022);
        g.drawCircle(points[i].x,points[i].y,10);
        g.endFill();
    }
    for (var i = 1; i < points.length; i++) {
        b.beginFill(0xff0022);
        b.drawCircle(points[i].x,points[i].y,10);
        b.endFill();
    }
}
