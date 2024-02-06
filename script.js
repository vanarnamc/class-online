
let temp = ``;
let strings = ['some random string', 'yetanothingrandomstringthing', 'who is', '1237918245']
let angleIncrement = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians for even distribution
let spread = 40; // Adjust spread to avoid overlap
let namesAndLinks = [
    { name: 'Amelia Jeoung', link: 'link-amelia.html' },
    { name: 'Elliott Romano', link: 'link-elliott.html' },
    { name: 'Ashley Woo', link: 'link-ashley.html' },
    { name: 'Reese Huang', link: 'link-reese.html' }, // Yijing Huang (Reese)
    { name: 'Leon Calzone', link: 'link-leon.html' }, // Leonardo Calzone (Leon)
    { name: 'Esther Choi', link: 'link-esther.html' }, // Eun Hae Choi (Esther)
    { name: 'Daisy Wu', link: 'link-daisy.html' }, // Jiayi Wu (Daisy)
    { name: 'Stephanie Granados', link: 'link-stephanie.html' }, // Estephania Granados (Stephanie)
    { name: 'Zheyun Chen', link: 'link-zheyun.html' },
    { name: 'Jerimiah Harrington', link: 'link-jerimiah.html' },
    { name: 'Ruijie Tai', link: 'link-ruijie.html' },
    { name: 'Yufan Xu', link: 'link-yufan.html' },
    { name: 'Qinzhi Wang', link: 'link-qinzhi.html' },
    { name: 'Lucy Pham', link: 'link-lucy.html' }
];
for (let i = 0; i < namesAndLinks.length; i++) {
    let y = (i / namesAndLinks.length) * 2 - 1 + (1 / namesAndLinks.length);
    let radius = Math.sqrt(1 - y * y); // radius at y

    let theta = angleIncrement * i; // theta equals golden angle increment

    let x = Math.cos(theta) * radius * spread;
    let z = Math.sin(theta) * radius * spread;

    temp += `
        <div class="floater-container" style="transform: translate3d(${x}vmin,${y * spread}vmin,${z}vmin)">
            <div class="floater-content">
                <a href="${namesAndLinks[i].link}" style="color: black;">${namesAndLinks[i].name}</a>
            </div>
        </div>
    `;
}
let content = document.querySelector('.content');
content.innerHTML += temp;

let container = document.querySelector('.container');
let rot = [0, 0];
let pos = [0, 0];
container.addEventListener('mousemove', (e) => {mouse3d(e)})
function mouse3d(e) {
	pos = [(e.clientX/window.innerWidth)*2-1, (e.clientY/window.innerHeight)*2-1];
}
let loop;
let acc = 10;
function mainLoop() {
	loop = setTimeout(() => {
		let targets = [pos[0]*30, pos[1]*30];
		let delta = [targets[0]-rot[0], targets[1]-rot[1]];
		rot[0] = rot[0] + delta[0]/acc;
		if (rot[0] > 90) {
			rot[0] = 90;
		} else if (rot[0] < -90) {
			rot[0] = -90;
		}
		rot[1] = rot[1] + delta[1]/acc;
		if (rot[1] > 90) {
			rot[1] = 90;
		} else if (rot[1] < -90) {
			rot[1] = -90;
		}
		content.style.transform = `rotateX(${rot[1]}deg) rotateY(${-rot[0]}deg)`;
		for (let div of document.querySelectorAll('.floater-content')) {
			div.style.transform = `translate(-50%, -50%)`; // Removed the counter-rotation part
		}
		mainLoop();
	}, 5)
}
mainLoop();