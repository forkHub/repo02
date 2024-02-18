"use strict";
window.onload = () => {
    Grafis(480, 640);
    const c = ha.be.Be.Kontek();
    const t = new ha.s3d.Transform();
    const img = MuatAnimasi("./img/angka.png", 64, 64);
    const sp = new ha.s3d.Sprite(-240, -320, 0, 128, 128);
    let vz = 10;
    let frame = 0;
    let lastTimer = Date.now();
    random();
    update();
    function drawBack() {
        c.beginPath();
        c.moveTo(t.x2d(-240, 0), t.y2d(-320, 0));
        c.lineTo(t.x2d(-240, 2000), t.y2d(-320, 2000));
        c.lineTo(t.x2d(-240, 2000), t.y2d(320, 2000));
        c.lineTo(t.x2d(-240, 0), t.y2d(320, 0));
        c.moveTo(t.x2d(-240, 2000), t.y2d(-320, 2000));
        c.lineTo(t.x2d(240, 2000), t.y2d(-320, 2000));
        c.lineTo(t.x2d(240, 2000), t.y2d(320, 2000));
        c.lineTo(t.x2d(-240, 2000), t.y2d(320, 2000));
        c.moveTo(t.x2d(240, 2000), t.y2d(-320, 2000));
        c.lineTo(t.x2d(240, 0), t.y2d(-320, 0));
        c.moveTo(t.x2d(240, 2000), t.y2d(320, 2000));
        c.lineTo(t.x2d(240, 0), t.y2d(320, 0));
        c.stroke();
    }
    function random() {
        sp.x3d = Math.floor(Math.random() * 480) - 240;
        sp.y3d = Math.floor(Math.random() * 640) - 320;
        sp.z3d = 0;
    }
    function gerak() {
        sp.z3d += vz;
        if (sp.z3d > 5000) {
            random();
        }
    }
    function update() {
        if (Date.now() > (lastTimer + 500)) {
            lastTimer = Date.now();
            frame = Math.floor(Math.random() * 9);
            console.log(frame);
        }
        gerak();
        drawBack;
        Posisi(img, sp.x2d, sp.y2d);
        Ukuran(img, sp.width2d, sp.height2d);
        Bersih();
        drawBack();
        Gambar(img, frame);
        // Posisi(img, 0, 0);
        // Gambar(img, 1)
        // Posisi(img, 200, 0);
        // Gambar(img, 3)
        window.requestAnimationFrame(update);
    }
    update();
};
