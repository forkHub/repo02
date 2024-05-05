interface IPrime {
    value: string,
    next: string
}

interface IPrimeData {
    angka: string,
    primes: IPrime[]
}

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

async function simpan() {
    let str = JSON.stringify(dataJson);
    window.localStorage.setItem('ha.prime', str);
}

async function cariPrime() {
    let ulang = true;
    while (ulang) {
        await prime();

        let timer2 = Date.now();
        if ((timer2 - timer) > (1000 * 10)) {
            timer = timer2;
            updateData();
            await simpan();
            ulang = false;
        }
    }
}

async function prime() {
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
        let n = await ha.cacah.kali(angka, '2');

        let p = {
            value: angka,
            next: n
        }

        primes.push(p);
        lastPrime = angka;
        updateData();
        updateUI();
        await simpan();

        console.log('last prime ' + lastPrime);
    }
}

let primes: IPrime[] = []
let angka = '1';
let dataJson: IPrimeData = {
    angka: angka,
    primes: primes
}
let timer = Date.now();
let lastPrime = '';

primes.push({
    value: '2',
    next: '2'
});

primes.push({
    value: '3',
    next: '3'
})

cariPrime().then(() => {
    console.log('finish');
}).catch((e) => {
    console.error(e);
});