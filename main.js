const USERNAME = 'PozzettiAndrea';

// Categorize repos
const CATEGORIES = {
    'comfyui-nodes': [
        'ComfyUI-SAM3', 'ComfyUI-UniRig', 'ComfyUI-DepthAnythingV3',
        'ComfyUI-SAM3DBody', 'ComfyUI-SAM3DObjects', 'ComfyUI-GeometryPack',
        'ComfyUI-BGPSeg', 'ComfyUI-CADabra', 'ComfyUI-Cadrille',
        'ComfyUI-CameraPack', 'ComfyUI-DetailGen3D', 'ComfyUI-Grounding',
        'ComfyUI-Hunyuan3D-Part', 'ComfyUI-HunyuanX', 'ComfyUI-HyMotion',
        'ComfyUI-Inspyrenet-Rembg-withcaching', 'ComfyUI-MeshSegmenter',
        'ComfyUI-MIDI3D', 'ComfyUI-MotionCapture', 'ComfyUI-Multiband',
        'ComfyUI-MVDUST3R', 'ComfyUI-NeurCADRecon', 'ComfyUI-Point2CAD',
        'ComfyUI-PrimitiveAnything', 'ComfyUI-SECADNET', 'ComfyUI-Sharp',
        'ComfyUI-TRELLIS2', 'ComfyUI-Trellis2-vbfork', 'ComfyUI-TripoSF',
        'ComfyUI-UltraShape1', 'ComfyUI-WaLa', 'ComfyUI-WayPoint',
        'ComfyUI-Weather', 'ComfyUI-SAM3-0.1.2', 'comfyui-sam3mirror',
    ],
    'comfyui-tools': [
        'ComfyUI-3D_nodes_index', 'ComfyUI-Env-Manager', 'ComfyUI-PyVista',
        'ComfyUI-Pulse-MeshAudit', 'ComfyUI-validate-endpoint',
        'comfy-3d-viewers', 'comfy-aimdo', 'comfy-dev-cli',
        'comfy-dynamic-widgets', 'comfy-env', 'comfy-sparse-attn',
        'comfy-test', 'cookiecutter-comfy-extension',
    ],
    'python-bindings': [
        'libigl-python-bindings', 'pygeogram', 'PyMesh', 'pypmp',
        'pyQuadriFlow', 'pyquadwild', 'pyrxmesh', 'occt-rt-python',
    ],
    'cuda-ports': [
        'geogram-cuda', 'instant-meshes-cuda', 'mmg-cuda',
        'pmp-library-cuda', 'QuadriFlow-cuda', 'quadwild-bimdf-cuda',
        'cuda-wheels', 'FlexGEMM-ap', 'OCCT-RT',
    ],
};

// Build reverse lookup
const repoCategory = {};
for (const [cat, repos] of Object.entries(CATEGORIES)) {
    for (const name of repos) {
        repoCategory[name] = cat;
    }
}

const grid = document.getElementById('project-grid');
let allRepos = [];
let activeCategory = 'all';

function showLoading() {
    grid.innerHTML = Array(6).fill('<div class="skeleton"></div>').join('');
}

function langClass(lang) {
    if (!lang) return 'lang-default';
    return 'lang-' + lang.toLowerCase().replace(/[^a-z]/g, '');
}

function renderCard(repo) {
    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.className = 'project-card';
    card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description'}</p>
        <div class="project-meta">
            ${repo.language ? `<span><span class="lang-dot ${langClass(repo.language)}"></span> ${repo.language}</span>` : ''}
            <span class="star-icon">★</span><span>${repo.stargazers_count.toLocaleString()}</span>
            <span>🔀 ${repo.forks_count}</span>
        </div>
    `;
    return card;
}

function displayRepos() {
    const filtered = activeCategory === 'all'
        ? allRepos
        : allRepos.filter(r => repoCategory[r.name] === activeCategory);

    grid.innerHTML = '';
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-muted);">No repos in this category yet.</p>';
        return;
    }
    filtered.forEach(repo => grid.appendChild(renderCard(repo)));
}

async function loadProjects() {
    showLoading();
    try {
        // Fetch up to 200 repos (2 pages)
        const page1 = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=stars&direction=desc&page=1`);
        if (!page1.ok) throw new Error('GitHub API error');
        const repos1 = await page1.json();

        let repos = repos1;
        if (repos1.length === 100) {
            const page2 = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=stars&direction=desc&page=2`);
            if (page2.ok) {
                const repos2 = await page2.json();
                repos = [...repos1, ...repos2];
            }
        }

        // Only show categorized repos, sorted by stars
        allRepos = repos
            .filter(r => repoCategory[r.name])
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        displayRepos();
    } catch (err) {
        console.error('Failed to load repos:', err);
        grid.innerHTML = '<p style="color: var(--text-muted);">Could not load projects. <a href="https://github.com/PozzettiAndrea" style="color: var(--accent);">View on GitHub →</a></p>';
    }
}

// Category sidebar
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.category-btn.active').classList.remove('active');
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        displayRepos();
    });
});

// Subtle animated background
function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((w * h) / 15000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(108, 99, 255, 0.4)';
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Init
initBackground();
loadProjects();
