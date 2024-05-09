function html(str: string): HTMLElement {
    let el: HTMLDivElement = document.createElement('div');
    el.innerHTML = str;
    return el.firstChild as HTMLElement;
}

function q(el: HTMLElement, q: string): HTMLElement {
    let h = el.querySelector(q) as HTMLElement;

    console.log(el);
    console.log(q);
    if (!h) throw Error('query not found');
    return h;
}

function halDepan(): HTMLElement {
    let el: HTMLElement = html(`
        <div class="beranda disp-flex flex-dir-row">
            <div class="atas flex-grow-1">

            </div>
            <div class="bawah disp-flex">
                <button class="baru">baru</button>
                <button class="lihat">lihat</button>
                <button class="edit">edit</button>
                <button class="hapus">hapus</button>
            </div>
        </div>
    `);

    q(el, "button.baru").onclick = () => {
        console.log("baru klik");
    };

    return el;
}

document.body.querySelector("div.cont").appendChild(halDepan());
