declare namespace ha.s3d {
    class P2d {
        private _x;
        get x(): number;
        set x(value: number);
        private _y;
        get y(): number;
        set y(value: number);
    }
    class P3d {
        private _x;
        private _y;
        private _z;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get z(): number;
        set z(value: number);
    }
    export class Sprite {
        private _z3d;
        private _x3d;
        private _y3d;
        private _width;
        private _height;
        private readonly p3d1;
        private readonly p3d2;
        private readonly p2d1;
        private readonly p2d2;
        private readonly t;
        constructor(x: number, y: number, z: number, w: number, h: number);
        private update;
        get x2d(): number;
        get y2d(): number;
        get width2d(): number;
        get height2d(): number;
        get z3d(): number;
        set z3d(value: number);
        get x3d(): number;
        set x3d(value: number);
        get y3d(): number;
        set y3d(value: number);
        get width3d(): number;
        set width3d(value: number);
        get height3d(): number;
        set height3d(value: number);
    }
    export class Transform {
        private _jrk;
        private _offX;
        private _offY;
        get offX(): number;
        set offX(value: number);
        get offY(): number;
        set offY(value: number);
        get jrk(): number;
        set jrk(value: number);
        transformP3d(p: P3d, p2: P2d): void;
        x2d(x: number, z: number): number;
        y2d(x: number, z: number): number;
        private p2d;
    }
    export {};
}
