const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');

function resize() {
    canv.width = canv.offsetWidth;
    canv.height = canv.offsetHeight;    
}
window.addEventListener('resize', resize);
resize();

const mouse = {x:0, y:0}

const objs = [];
for (let i = 0; i < canv.width*canv.height/5000; i++) objs.push({x:Math.random()*canv.width, y:Math.random()*canv.height, xVel:0, yVel:0});

ctx.strokeStyle = ctx.fillStyle = '#1f1e1f';
(function loop() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    for (let o of objs) {
        o.xVel = Math.max(-1, Math.min(1, o.xVel + (Math.random()-0.5)/5));
        o.yVel = Math.max(-1, Math.min(1, o.yVel + (Math.random()-0.5)/5));

        if (Math.hypot(o.x-mouse.x, o.y-mouse.y) < 100) {
            if (o.x > mouse.x) o.x+=2; else o.x-=2;
            if (o.y > mouse.y) o.y+=2; else o.y-=2;
            o.xVel = o.yVel = 0;
        }

        o.x += o.xVel;
        o.y += o.yVel;

        if (o.x > canv.width) o.xVel = -Math.abs(o.xVel)
        if (o.x < 0) o.xVel = Math.abs(o.xVel)
        if (o.y > canv.height) o.yVel = -Math.abs(o.xVel)
        if (o.y < 0) o.yVel = Math.abs(o.xVel)

        ctx.beginPath();
        for (let o2 of objs) if (Math.hypot(o.x-o2.x, o.y-o2.y) < 100) {
            ctx.strokeStyle = `rgba(31, 30, 31, ${4/Math.hypot(o.x-o2.x, o.y-o2.y)})`
            ctx.moveTo(o.x, o.y);
            ctx.lineTo(o2.x, o2.y);
            ctx.stroke();
        }
        ctx.arc(Math.floor(o.x), Math.floor(o.y), 2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
    requestAnimationFrame(loop);
})();

window.addEventListener('mousemove', e => {
    mouse.x = e.x; mouse.y = e.y+window.scrollY;
})