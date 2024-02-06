let temp = ``;
let strings = ['some random string', 'yet another random string thing', 'who is', '1237918245'];
let angleIncrement = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians for even distribution
let spread = 40; // Adjust spread to avoid overlap
let namesAndLinks = [
    { name: 'Amelia Jeoung', link: 'link-amelia.html' },
    { name: 'Elliott Romano', link: 'link-elliott.html' },
    { name: 'Ashley Woo', link: 'link-ashley.html' },
    { name: 'Reese Huang', link: 'link-reese.html' },
    { name: 'Leon Calzone', link: 'link-leon.html' },
    { name: 'Esther Choi', link: 'link-esther.html' },
    { name: 'Daisy Wu', link: 'link-daisy.html' },
    { name: 'Stephanie Granados', link: 'link-stephanie.html' },
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

container.addEventListener('mousemove', mouse3d);

// Updated to handle touch events properly with `preventDefault` and passive listener
container.addEventListener('touchmove', touch3d, { passive: false });

let isUpdating = false;

function mouse3d(e) {
    if (!isUpdating) {
        isUpdating = true;
        requestAnimationFrame(() => {
            pos = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1];
            isUpdating = false;
        });
    }
}

function touch3d(e) {
    e.preventDefault();
    if (!isUpdating && e.touches.length > 0) {
        isUpdating = true;
        requestAnimationFrame(() => {
            let touch = e.touches[0];
            pos = [(touch.clientX / window.innerWidth) * 2 - 1, (touch.clientY / window.innerHeight) * 2 - 1];
            isUpdating = false;
        });
    }
}


let acc = 10;
function mainLoop() {
    requestAnimationFrame(mainLoop); // Use requestAnimationFrame for smoother animations
    
    let targets = [pos[0] * 30, pos[1] * 30];
    let delta = [targets[0] - rot[0], targets[1] - rot[1]];
    rot[0] += delta[0] / acc;
    rot[0] = Math.max(Math.min(rot[0], 90), -90);
    rot[1] += delta[1] / acc;
    rot[1] = Math.max(Math.min(rot[1], 90), -90);
    
    content.style.transform = `rotateX(${rot[1]}deg) rotateY(${-rot[0]}deg)`;
}
requestAnimationFrame(mainLoop); // Start the animation loop

function updateRotation() {
    // This function is triggered by touch movement to update the rotation immediately
    // It's defined for clarity but its code is already within mainLoop,
    // which continuously updates rotation based on `pos`.
    // If you want to decouple rotation logic for touch, you might call this
    // function directly from `touch3d`.
}

mainLoop(); // Start the animation loop
