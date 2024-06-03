let maxBack: number = 8;
let wrapper = document.querySelector("div.hal-wrapper");
let max: number = wrapper.scrollHeight;
let ratio: number = (wrapper.scrollTop) / max;
let ratioN: number = Math.floor(ratio * (maxBack));
let maxBack2: number = 7;

let backEl = document.body.querySelector("div#back").children;
let backElJml: number = backEl.length;
let backAr: HTMLDivElement[] = [];

let ctr = 0;
function update() {
	updateRatio();
	backAr.forEach((item, idx) => {
		if (idx != ratioN) {
			let o = parseFloat(item.style.opacity);
			if (o > 0) {
				o -= .005;
				item.style.opacity = o + '';
				// console.log("turun");
				// console.log(item);
			}
		}
		else if (idx == ratioN) {
			let o = parseFloat(item.style.opacity);
			if (o < 1) {
				o += .005;
				item.style.opacity = o + '';
				// console.log("naik");
				// console.log(item);
				// console.log(o);
			}

		}
		else {
			throw Error("");
		}
	})

	// ctr++;
	// console.log(wrapper.scrollTop);
	if (ctr < 10) {
		window.requestAnimationFrame(update);
	}
}

function debug(str: string) {
	document.body.querySelector("div.debug").innerHTML = str;
}

function updateRatio() {
	ratio = (wrapper.scrollTop) / max;
	ratioN = Math.floor(ratio * (maxBack));
	if (ratioN > maxBack2) ratioN = maxBack2;
	debug("rationN " + ratioN + "/ratio " + ratio + "/max " + max);
}
updateRatio();

for (let i = 0; i < backElJml; i++) {
	let item = backEl.item(i) as HTMLDivElement
	item.classList.add(item.getAttribute("back"));
	backAr.push(item);
	item.style.opacity = '0';
	item.style.left = '0px';
	item.style.top = '0px';
	item.style.right = '0px';
	item.style.bottom = '0px';

	if (i == 0) {
		item.style.opacity = '0';
	}
	console.log(i);
}

// backAr[0].style.opacity = '1';
// console.log(backAr[0]);
// console.log(backAr[0].style.opacity);
// console.log("ratio n " + ratioN);
// console.log(backAr);

window.onscroll = () => {
	updateRatio();
	console.log(ratioN);
	console.log(wrapper.scrollTop);
}
window.requestAnimationFrame(update);
