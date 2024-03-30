class Sp {
    private _frame = 0;
    private _sp: ha.s3d.Sprite;

    public get sp(): ha.s3d.Sprite {
        return this._sp;
    }
    public set sp(value: ha.s3d.Sprite) {
        this._sp = value;
    }

    public get frame() {
        return this._frame;
    }
    public set frame(value) {
        this._frame = value;
    }

    constructor(s: ha.s3d.Sprite) {
        this.sp = s;
    }
}

window.onload = () => {
    Grafis(480, 640);

    const c = ha.be.Be.Kontek();
    const t = new ha.s3d.Transform();
    const img = MuatAnimasi("./img/angka.png", 64, 64);
    // const sp = new ha.s3d.Sprite(-240, -320, 0, 128, 128);
    const sps: Sp[] = [];

    for (let i = 0; i < 10; i++) {
        let sp = new ha.s3d.Sprite(-240, -320, 0, 128, 128);
        let spw = new Sp(sp);

        random(spw);
        sp.z3d = (i / 10) * 4000;
        sps.push(spw);
    }

    let vz = 10;
    let lastTimer = Date.now();
    // random(sp);
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

    function random(spw: Sp) {
        let sp = spw.sp;
        sp.x3d = Math.floor(Math.random() * 480) - 240;
        sp.y3d = Math.floor(Math.random() * 640) - 320;
        sp.z3d = 0;
        spw.frame = Math.floor(Math.random() * 9)
    }

    function gerak(spw: Sp) {
        let sp = spw.sp;
        sp.z3d += vz;
        if (sp.z3d > 5000) {
            random(spw);
        }
    }

    function update() {
        if (Date.now() > (lastTimer + 500)) {
            lastTimer = Date.now();
            // frame = Math.floor(Math.random() * 9);
            // console.log(frame);
        }

        Bersih();
        drawBack();

        for (let i = 0; i < 10; i++) {
            let spw = sps[i];
            let sp = spw.sp;
            gerak(spw);
            Posisi(img, sp.x2d, sp.y2d);
            Ukuran(img, sp.width2d, sp.height2d);
            Handle(img, Panjang(img) / 2, Lebar(img) / 2);
            Gambar(img, sps[i].frame);
        }

        window.requestAnimationFrame(update);
    }
    update();

} 