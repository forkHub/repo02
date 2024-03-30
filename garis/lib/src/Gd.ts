namespace ha.gd {
    export class Gd {
        static readonly max = Math.sqrt((255 ** 2) * 3);

        private static hitungJrk(d: Uint8ClampedArray, dx: Uint8ClampedArray): number {
            let hasil = Math.sqrt(
                (d[0] - dx[0]) ** 2 +
                (d[1] - dx[1]) ** 2 +
                (d[2] - dx[2]) ** 2
            );

            return hasil;
        }

        private static jarak(ctxSrc: CanvasRenderingContext2D, i: number, j: number, w: number, h: number): number {
            let d: Uint8ClampedArray = ctxSrc.getImageData(i, j, 1, 1).data;
            let jarak: number[] = [0];

            //kanan
            if (i < w - 1) {
                let dx = ctxSrc.getImageData(i + 1, j, 1, 1).data;
                jarak.push(Gd.hitungJrk(d, dx));
            }

            //kiri
            if (i > 0) {
                let dx = ctxSrc.getImageData(i - 1, j, 1, 1).data;
                jarak.push(Gd.hitungJrk(d, dx));
            }

            //atas
            if (j > 0) {
                let dx = ctxSrc.getImageData(i, j - 1, 1, 1).data;
                jarak.push(Gd.hitungJrk(d, dx));
            }

            //bawah
            if (j < h - 1) {
                let dx = ctxSrc.getImageData(i, j + 1, 1, 1).data;
                jarak.push(Gd.hitungJrk(d, dx));
            }

            let hasil = jarak[0];
            jarak.forEach((item) => {
                if (item > hasil) hasil = item;
            })
            return hasil;
        }

        static async start(cSrc: HTMLCanvasElement, cDst: HTMLCanvasElement) {
            let ctxSrc = cSrc.getContext('2d');
            let ctxDest = cDst.getContext('2d');

            for (let i = 0; i < cSrc.width; i++) {
                for (let j = 0; j < cSrc.height; j++) {
                    let jrk = Gd.jarak(ctxSrc, i, j, cSrc.width, cSrc.height);
                    jrk = Math.floor(255 - (jrk / Gd.max));
                    ctx.fillStyle = `rgba(${Be.merah}, ${Be.hijau}, ${Be.biru}, ${Be.transparan})`;
                    ctxDest.fillRect(Math.floor(i), Math.floor(j), 1, 1);
                }
            }
        }

        static async startImg(img: HTMLImageElement, canvas: HTMLCanvasElement) {
            let canvasImg: HTMLCanvasElement = document.createElement('canvas');
            // let ctx = canvas.getContext("2d");
            let ctxImg = canvas.getContext("2d");

            canvasImg.width = img.naturalWidth;
            canvasImg.height = img.naturalHeight;
            ctxImg.drawImage(img, 0, 0);

            await Gd.start(canvasImg, canvas);
        }
    }
}