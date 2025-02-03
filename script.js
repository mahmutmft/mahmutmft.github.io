document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#particles'),
        alpha: true,
        antialias: true
    });
    renderer.setClearColor(0x0a1929);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particles = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: 0.005,
        color: '#00a8ff',
        transparent: true,
        opacity: 0.7
    });

    const particleMesh = new THREE.Points(particles, material);
    scene.add(particleMesh);
    camera.position.z = 2;

    function animate() {
        particleMesh.rotation.x += 0.001;
        particleMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    const commandEl = document.getElementById('command');
    const outputEl = document.querySelector('.command-history');
    const datetimeEl = document.getElementById('datetime');
    let commandHistory = [];
    let currentTheme = 'dark';

    const updateTime = () => {
        datetimeEl.textContent = new Date().toLocaleString();
    };
    setInterval(updateTime, 1000);

    const commands = {
        help: () => `<div class="command-output">
            <p>Available commands:</p>
            <p><span class="accent">about</span> - Professional summary</p>
            <p><span class="accent">skills</span> - Technical competencies</p>
            <p><span class="accent">projects</span> - Development portfolio</p>
            <p><span class="accent">contact</span> - Connect with me</p>
            <p><span class="accent">theme</span> - Toggle dark/light mode</p>
            <p><span class="accent">clear</span> - Clean the terminal</p>
            <p><span class="accent">github</span> - Open GitHub profile</p>
        </div>`,

        about: () => `<div class="command-output">
            <p>Mahmut Miftaroski is a computer science student at FINKI, specializing in secure software development.</p>
            <p>Passionate about creating robust systems that balance functionality with security best practices.</p>
        </div>`,

        skills: () => `<div class="command-output">
            ${['Java', 'JavaScript', 'C++', 'Networking', 'Linux', 'Web Security',
            'Penetration Testing', 'Docker', 'React', 'Node.js']
            .map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
        </div>`,

        projects: () => `<div class="command-output">
            <p><a href="https://github.com/mahmutmft/CyberVault" class="project-link" target="_blank">CyberVault</a> - Secure credential management system</p>
            <p><a href="https://github.com/mahmutmft/pdf-file-forwarder" class="project-link" target="_blank">PDF Forwarder</a> - Automated document workflow solution</p>
        </div>`,

        contact: () => `<div class="command-output">
            <p>📧 <a href="mailto:mahmutmft@gmail.com" class="project-link">mahmutmft@gmail.com</a></p>
            <p>💻 <a href="https://github.com/mahmutmft" class="project-link" target="_blank">github.com/mahmutmft</a></p>
            <p>🎮 Discord: muty00</p>
        </div>`,

        theme: () => {
            document.body.classList.toggle('light-mode');
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Set Three.js background color
            const bgColor = currentTheme === 'light' ? 0xf0f0f0 : 0x0a1929;
            renderer.setClearColor(bgColor);

            // Update particle color
            material.color.set(currentTheme === 'light' ? '#0066cc' : '#00a8ff');

            // Update CSS variables
            document.documentElement.style.setProperty('--background', currentTheme === 'light' ? '#f0f0f0' : '#0a1929');
            document.documentElement.style.setProperty('--terminal-bg', currentTheme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 21, 40, 0.9)');
            document.documentElement.style.setProperty('--text', currentTheme === 'light' ? '#333' : '#e0e0e0');
            document.documentElement.style.setProperty('--accent', currentTheme === 'light' ? '#0066cc' : '#00a8ff'); // Update accent color

            return `<p>Switched to ${currentTheme} mode</p>`;
        },

        github: async () => {
            const simulateInstall = async () => {
                const steps = [
                    { text: 'sudo apt-get install github-profile', delay: 1000 },
                    { text: 'Reading package lists... Done', delay: 800 },
                    { text: 'Building dependency tree... Done', delay: 800 },
                    { text: 'Downloading profile data... 42%', delay: 500 },
                    { text: 'Downloading profile data... 78%', delay: 500 },
                    { text: 'Downloading profile data... 100%', delay: 500 },
                    { text: 'Setting up mahmutmft@github (1.0-1337)... Done', delay: 1000 }
                ];

                for (const step of steps) {
                    outputEl.innerHTML += `<div class="command-output install-step">${step.text}</div>`;
                    outputEl.scrollTop = outputEl.scrollHeight;
                    await new Promise(resolve => setTimeout(resolve, step.delay));
                }
            };
            await simulateInstall();
            outputEl.innerHTML += `<div class="command-output">
        🚀 <a href="https://github.com/mahmutmft" class="project-link" target="_blank">Click to open GitHub profile</a>
    </div>`;

            outputEl.scrollTop = outputEl.scrollHeight;
            return '';
        },

        clear: () => {
            outputEl.innerHTML = '';
            return '';
        }
    };

    function startMatrixEffect() {
        const chars = '01';
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '9999';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);

        const w = canvas.width = window.innerWidth;
        const h = canvas.height = window.innerHeight;
        const colArr = Array(Math.floor(w / 20)).fill(0);

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#0F0';
            ctx.font = '15pt monospace';

            colArr.forEach((y, ind) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = ind * 20;
                ctx.fillText(text, x, y);
                if (y > 100 + Math.random() * 10000) colArr[ind] = 0;
                else colArr[ind] = y + 20;
            });
        }

        const matrixInterval = setInterval(draw, 50);
        setTimeout(() => {
            clearInterval(matrixInterval);
            canvas.remove();
        }, 5000);
    }

    commandEl.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cmd = commandEl.value.trim().toLowerCase();
            commandEl.value = '';

            if (cmd) commandHistory.push(cmd);

            let response;
            if (commands[cmd]) {
                if (cmd === 'github') {
                    outputEl.innerHTML += `<div class="command-entry">
                        <span class="prompt">></span> ${cmd}
                    </div>`;
                    await commands[cmd]();
                } else {
                    response = commands[cmd]();
                    outputEl.innerHTML += `<div class="command-entry">
                        <span class="prompt">></span> ${cmd}
                        ${response}
                    </div>`;
                }
            } else {
                response = `<p class="shake">Command not found. Type <span class="accent">help</span> for options</p>`;
                outputEl.innerHTML += `<div class="command-entry">
                    <span class="prompt">></span> ${cmd}
                    ${response}
                </div>`;
            }

            outputEl.scrollTop = outputEl.scrollHeight;
        }
    });
});
