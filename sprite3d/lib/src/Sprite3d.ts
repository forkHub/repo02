namespace ha.s3d {
    class P2d {
        private _x: number = 0;
        public get x(): number {
            return this._x;
        }
        public set x(value: number) {
            this._x = value;
        }
        private _y: number = 0;
        public get y(): number {
            return this._y;
        }
        public set y(value: number) {
            this._y = value;
        }
    }

    class P3d {
        private _x: number = 0;
        private _y: number = 0;
        private _z: number = 0;


        public get x(): number {
            return this._x;
        }
        public set x(value: number) {
            this._x = value;
        }
        public get y(): number {
            return this._y;
        }
        public set y(value: number) {
            this._y = value;
        }
        public get z(): number {
            return this._z;
        }
        public set z(value: number) {
            this._z = value;
        }
    }

    export class SpriteObj {
        private _z3d: number = 0;
        private _x3d: number = 0;
        private _y3d: number = 0;
        private _width: number = 0;
        private _height: number = 0;

        private readonly p3d1: P3d = new P3d();
        private readonly p3d2: P3d = new P3d();
        private readonly p2d1: P2d = new P2d();
        private readonly p2d2: P2d = new P2d();
        private readonly t: Transform = new Transform();

        constructor(x: number, y: number, z: number, w: number, h: number) {
            this.p3d1.x = x;
            this.p3d1.y = y;
            this.p3d1.z = z;

            this.p3d2.x = w + x;
            this.p3d2.y = h + y;
            this.p3d2.z = z;

            this._x3d = x;
            this._y3d = y;
            this._z3d = z;
            this._width = w;
            this._height = h;

            this.update();
        }

        private update() {
            this.t.transformP3d(this.p3d1, this.p2d1);
            this.t.transformP3d(this.p3d2, this.p2d2);
        }

        public get x2d() {
            this.update();
            return this.p2d1.x;
        }

        public get y2d() {
            this.update();
            return this.p2d1.y;
        }

        public get width2d() {
            this.update();
            return this.p2d2.x - this.p2d1.x;
        }

        public get height2d() {
            this.update();
            return this.p2d2.y - this.p2d1.y;
        }

        public get z3d(): number {
            return this._z3d;
        }
        public set z3d(value: number) {
            this._z3d = value;
            this.p3d1.z = this._z3d;
            this.p3d2.z = this._z3d;
            this.update();
        }

        public get x3d(): number {
            return this._x3d;
        }
        public set x3d(value: number) {
            this._x3d = value;
            this.p3d1.x = value;
            this.p3d2.x = this._width + value;
            this.update();
        }

        public get y3d(): number {
            return this._y3d;
        }
        public set y3d(value: number) {
            this._y3d = value;
            this.p3d1.y = value;
            this.p3d2.y = this.p3d1.y + this._height;
            this.update();
        }

        public get width3d(): number {
            return this._width;
        }
        public set width3d(value: number) {
            this._width = value;
            this.p3d2.x = this.p3d1.x + value;
            this.update();
        }

        public get height3d(): number {
            return this._height;
        }
        public set height3d(value: number) {
            this._height = value;
            this.p3d2.y = this.p3d1.y + value;
            this.update();
        }

    }

    export class Sprite {
        private static readonly list: SpriteObj[] = [];

        static buat(x: number, y: number, z: number, w: number, h: number): SpriteObj {
            let hs = new SpriteObj(x, y, z, w, h);

            Sprite.list.push(hs);

            return hs;
        }

        static hapus(s: SpriteObj) {
            for (let i: number = 0; i < this.list.length; i++) {
                if (this.list[i] == s) {
                    this.list.splice(i, 1);
                }
            }
        }

        static urut(): void {
            this.list.sort((i, j) => {
                return i.z3d - j.z3d;
            });
        }
    }

    export class Transform {
        private _jrk: number = 500;
        private _offX: number = 240; //480
        private _offY: number = 320; //640

        public get offX(): number {
            return this._offX;
        }
        public set offX(value: number) {
            this._offX = value;
        }
        public get offY(): number {
            return this._offY;
        }
        public set offY(value: number) {
            this._offY = value;
        }

        public get jrk(): number {
            return this._jrk;
        }
        public set jrk(value: number) {
            this._jrk = value;
        }

        transformP3d(p: P3d, p2: P2d) {
            p2.x = this.x2d(p.x, p.z);
            p2.y = this.y2d(p.y, p.z);
        }

        x2d(x: number, z: number): number {
            return this.p2d(x, z) + this.offX;
        }

        y2d(x: number, z: number): number {
            return this.p2d(x, z) + this.offY;
        }

        private p2d(x: number, z: number): number {
            return (this.jrk * x) / (this.jrk + z)
        }

    }

}