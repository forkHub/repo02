"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function updateData() {
    dataJson.angka = angka;
    dataJson.primes = primes;
}
function updateUI() {
    // console.log('update ui');
    // setTimeout(() => {
    document.body.querySelector('div.info').innerHTML = `
        angka: ${angka} <br/>
        prime: ${lastPrime}<br/>
        jml prime: ${primes.length} <br/>
    `;
    // }, (0));
}
function simpan() {
    return __awaiter(this, void 0, void 0, function* () {
        let str = JSON.stringify(dataJson);
        window.localStorage.setItem('ha.prime', str);
    });
}
function cariPrime() {
    return __awaiter(this, void 0, void 0, function* () {
        let ulang = true;
        while (ulang) {
            yield prime();
            let timer2 = Date.now();
            if ((timer2 - timer) > (1000 * 10)) {
                timer = timer2;
                updateData();
                yield simpan();
                ulang = false;
            }
        }
    });
}
function prime() {
    return __awaiter(this, void 0, void 0, function* () {
        angka = ha.cacah.tambah(angka, '1');
        //check apakah ada yang sama dengan prime
        let sama = false;
        for (let i = 0; i < primes.length; i++) {
            let p = primes[i];
            if (p.next == angka) {
                p.next = ha.cacah.tambah(p.next, p.value);
                sama = true;
            }
        }
        //tidak ada yang sama, ketemu prime baru
        if (false == sama) {
            // console.log('ketemu prime: ' + angka + '/' + (await ha.cacah.kali(angka, '2')));
            let n = yield ha.cacah.kali(angka, '2');
            let p = {
                value: angka,
                next: n
            };
            primes.push(p);
            lastPrime = angka;
            updateData();
            updateUI();
            yield simpan();
            console.log('last prime ' + lastPrime);
        }
    });
}
let primes = [];
let angka = '1';
let dataJson = {
    angka: angka,
    primes: primes
};
let timer = Date.now();
let lastPrime = '';
primes.push({
    value: '2',
    next: '2'
});
primes.push({
    value: '3',
    next: '3'
});
cariPrime().then(() => {
    console.log('finish');
}).catch((e) => {
    console.error(e);
});
