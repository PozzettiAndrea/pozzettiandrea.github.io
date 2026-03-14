const USERNAME = 'PozzettiAndrea';

// Repo categories
const CATEGORIES = {
    'comfyui-nodes': [
        'ComfyUI-SAM3', 'ComfyUI-TRELLIS2', 'ComfyUI-UniRig',
        'ComfyUI-DepthAnythingV3', 'ComfyUI-Sharp', 'ComfyUI-SAM3DBody',
        'ComfyUI-MotionCapture', 'ComfyUI-SAM3DObjects', 'ComfyUI-GeometryPack',
        'ComfyUI-Hunyuan3D-Part', 'ComfyUI-Grounding', 'ComfyUI-CADabra',
        'ComfyUI-BGPSeg', 'ComfyUI-Cadrille', 'ComfyUI-CameraPack',
        'ComfyUI-DetailGen3D', 'ComfyUI-HunyuanX', 'ComfyUI-HyMotion',
        'ComfyUI-Inspyrenet-Rembg-withcaching', 'ComfyUI-MeshSegmenter',
        'ComfyUI-MIDI3D', 'ComfyUI-MotionCapture', 'ComfyUI-Multiband',
        'ComfyUI-MVDUST3R', 'ComfyUI-NeurCADRecon', 'ComfyUI-Point2CAD',
        'ComfyUI-PrimitiveAnything', 'ComfyUI-SECADNET',
        'ComfyUI-Trellis2-vbfork', 'ComfyUI-TripoSF',
        'ComfyUI-UltraShape1', 'ComfyUI-WaLa', 'ComfyUI-WayPoint',
        'ComfyUI-Weather', 'ComfyUI-SAM3-0.1.2', 'comfyui-sam3mirror',
    ],
    'comfyui-tools': [
        'ComfyUI-3D_nodes_index', 'ComfyUI-Env-Manager', 'ComfyUI-PyVista',
        'ComfyUI-Pulse-MeshAudit', 'ComfyUI-validate-endpoint',
        'comfy-3d-viewers', 'comfy-aimdo', 'comfy-dev-cli',
        'comfy-dynamic-widgets', 'comfy-env', 'comfy-sparse-attn',
        'comfy-test', 'cookiecutter-comfy-extension', 'cuda-wheels',
    ],
    'python-bindings': [
        'libigl-python-bindings', 'pygeogram', 'PyMesh', 'pypmp',
        'pyQuadriFlow', 'pyquadwild', 'pyrxmesh', 'occt-rt-python',
    ],
    'cuda-ports': [
        'geogram-cuda', 'instant-meshes-cuda', 'mmg-cuda',
        'pmp-library-cuda', 'QuadriFlow-cuda', 'quadwild-bimdf-cuda',
        'FlexGEMM-ap', 'OCCT-RT',
    ],
};

// Minimum stars for comfyui-nodes
const MIN_STARS_NODES = 30;

// First README image per repo (raw GitHub URLs)
const REPO_IMAGES = {
    'ComfyUI-SAM3': 'docs/bbox.png',
    'ComfyUI-TRELLIS2': 'docs/tpose.png',
    'ComfyUI-UniRig': 'docs/rigging_and_skinning.png',
    'ComfyUI-DepthAnythingV3': 'docs/simple.png',
    'ComfyUI-Sharp': 'docs/no_exif.png',
    'ComfyUI-SAM3DBody': 'docs/body.png',
    'ComfyUI-SAM3DObjects': null,
    'ComfyUI-GeometryPack': null,
    'ComfyUI-Hunyuan3D-Part': 'docs/teapot_segmentation.png',
    'ComfyUI-Grounding': 'docs/simple.png',
    'ComfyUI-MeshSegmenter': 'docs/samesh.png',
    'ComfyUI-MIDI3D': 'docs/basic_workflow.png',
    'ComfyUI-WaLa': 'docs/single_image.png',
    'ComfyUI-PrimitiveAnything': 'docs/bun.png',
    'instant-meshes-cuda': 'https://github.com/wjakob/instant-meshes/raw/master/resources/screenshot.jpg',
};

function imageUrl(repoName) {
    const path = REPO_IMAGES[repoName];
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `https://raw.githubusercontent.com/${USERNAME}/${repoName}/main/${path}`;
}

// Category placeholder icons (SVG data URIs)
const CATEGORY_ICONS = {
    'comfyui-nodes': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="3" stroke="#6c63ff" stroke-width="2"/><rect x="28" y="4" width="16" height="16" rx="3" stroke="#6c63ff" stroke-width="2"/><rect x="4" y="28" width="16" height="16" rx="3" stroke="#6c63ff" stroke-width="2"/><circle cx="36" cy="36" r="8" stroke="#6c63ff" stroke-width="2"/></svg>`,
    'comfyui-tools': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L30 6L30 18L42 18L42 30L30 30L30 42L18 42L18 30L6 30L6 18L18 18Z" stroke="#6c63ff" stroke-width="2"/></svg>`,
    'python-bindings': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 8C14 8 24 8 24 8C34 8 34 18 34 18V24H24V26H38V30C38 30 38 40 28 40H20C10 40 10 30 10 30V18C10 18 10 8 14 8Z" stroke="#6c63ff" stroke-width="2"/><circle cx="19" cy="15" r="2" fill="#6c63ff"/><circle cx="29" cy="33" r="2" fill="#6c63ff"/></svg>`,
    'cuda-ports': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L24 4L40 12V36L24 44L8 36Z" stroke="#6c63ff" stroke-width="2"/><path d="M8 12L24 20L40 12" stroke="#6c63ff" stroke-width="2"/><path d="M24 20V44" stroke="#6c63ff" stroke-width="2"/></svg>`,
};

// Custom descriptions for repos without good GitHub descriptions
const CUSTOM_DESC = {
    'ComfyUI-SAM3': 'Segment Anything 3 for ComfyUI — bbox, point, and text prompt segmentation',
    'ComfyUI-TRELLIS2': 'Trellis 2 for ComfyUI — structured latent 3D generation',
    'ComfyUI-UniRig': 'UniRig for ComfyUI — automatic rigging and skinning of 3D meshes',
    'ComfyUI-DepthAnythingV3': 'DepthAnything V3 for ComfyUI — monocular depth estimation with 3D output',
    'ComfyUI-Sharp': 'Apple ML-Sharp for ComfyUI — detail-preserving image sharpening',
    'ComfyUI-SAM3DBody': 'SAM-3D-Body for ComfyUI — 3D human body segmentation from images',
    'ComfyUI-MotionCapture': 'Motion capture from video in ComfyUI',
    'ComfyUI-SAM3DObjects': 'SAM-3D-Objects for ComfyUI — 3D object segmentation',
    'ComfyUI-GeometryPack': '3D geometry processing in ComfyUI — igl, CGAL, and Blender tools',
    'ComfyUI-Hunyuan3D-Part': 'Hunyuan3D-Part for ComfyUI — part-aware 3D generation',
    'ComfyUI-Grounding': 'Grounding models for ComfyUI — visual grounding and SA2VA',
    'ComfyUI-CADabra': 'CAD loading, manipulation, and meshing in ComfyUI via GMSH and OCC',
    'ComfyUI-MeshSegmenter': 'Surface mesh segmentation in ComfyUI — SAMesh and PartField',
    'ComfyUI-MIDI3D': 'MIDI3D model for ComfyUI — multi-instance diffusion for 3D',
    'ComfyUI-WaLa': 'WaLa for ComfyUI — wavelet latent diffusion 3D generation',
    'ComfyUI-PrimitiveAnything': 'PrimitiveAnything for ComfyUI — primitive decomposition of 3D shapes',
    'geogram-cuda': 'CUDA port of Geogram — geometric algorithms library',
    'instant-meshes-cuda': 'CUDA port of Instant Meshes — field-aligned quad mesh generator',
    'pmp-library-cuda': 'CUDA port of PMP Library — polygon mesh processing',
    'mmg-cuda': 'CUDA port of MMG — adaptive remeshing for 2D/3D',
    'QuadriFlow-cuda': 'CUDA port of QuadriFlow — scalable quadrangulation',
    'quadwild-bimdf-cuda': 'CUDA port of QuadWild — quad meshing with BiMDF solver',
    'FlexGEMM-ap': 'Octree-based GEMM for reduced memory usage',
    'OCCT-RT': 'High-performance BVH raytracer for OpenCASCADE — 6M+ rays/sec with OpenMP and Embree',
    'libigl-python-bindings': 'Python bindings for libigl geometry processing library',
    'pygeogram': 'Python bindings for Geogram with CI-built wheels',
    'PyMesh': 'Python bindings for PyMesh geometry processing',
    'pypmp': 'Python bindings for PMP Library (Polygon Mesh Processing)',
    'pyQuadriFlow': 'Python bindings for QuadriFlow quad remeshing',
    'pyquadwild': 'Python bindings for QuadWild quad remeshing',
    'pyrxmesh': 'Python bindings for RXMesh — GPU-accelerated triangle mesh processing',
    'occt-rt-python': 'Python bindings for OCCT-RT raytracer with NumPy integration',
    'ComfyUI-3D_nodes_index': 'Curated index of all 3D-related ComfyUI nodes',
    'comfy-env': 'CUDA dependency management and process isolation for ComfyUI nodes',
    'cuda-wheels': 'CUDA Python wheels with PEP 503 index for easy installation',
    'cookiecutter-comfy-extension': 'Cookiecutter template for ComfyUI custom node extensions',
    'ComfyUI-Env-Manager': 'GPU info, precision support, and node environment panel for comfy-env',
    'comfy-3d-viewers': 'Reusable 3D viewer infrastructure for ComfyUI nodes',
    'comfy-dev-cli': 'CLI tools for ComfyUI node development',
};

// Build reverse lookup
const repoCategory = {};
for (const [cat, repos] of Object.entries(CATEGORIES)) {
    for (const name of repos) repoCategory[name] = cat;
}

const grid = document.getElementById('project-grid');
let allRepos = [];
let activeCategory = 'comfyui-nodes';

function showLoading() {
    grid.innerHTML = Array(6).fill('<div class="skeleton"></div>').join('');
}

function langClass(lang) {
    if (!lang) return 'lang-default';
    return 'lang-' + lang.toLowerCase().replace(/[^a-z]/g, '');
}

function renderCard(repo) {
    const cat = repoCategory[repo.name];
    const img = imageUrl(repo.name);
    const desc = CUSTOM_DESC[repo.name] || repo.description || 'No description';

    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.className = 'project-card';

    const imgHtml = img
        ? `<div class="project-thumb"><img src="${img}" alt="${repo.name}" loading="lazy"></div>`
        : `<div class="project-thumb project-thumb-icon">${CATEGORY_ICONS[cat] || CATEGORY_ICONS['comfyui-nodes']}</div>`;

    card.innerHTML = `
        ${imgHtml}
        <div class="project-info">
            <h3>${repo.name}</h3>
            <p>${desc}</p>
            <div class="project-meta">
                ${repo.language ? `<span><span class="lang-dot ${langClass(repo.language)}"></span> ${repo.language}</span>` : ''}
                <span class="star-icon">★</span><span>${repo.stargazers_count.toLocaleString()}</span>
                <span>🔀 ${repo.forks_count}</span>
            </div>
        </div>
    `;
    return card;
}

function displayRepos() {
    let filtered = activeCategory === 'all'
        ? allRepos
        : allRepos.filter(r => repoCategory[r.name] === activeCategory);

    // For comfyui-nodes (and "all"), filter out nodes with < 30 stars
    filtered = filtered.filter(r => {
        if (repoCategory[r.name] === 'comfyui-nodes' && r.stargazers_count < MIN_STARS_NODES) return false;
        return true;
    });

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
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
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

// Smooth scroll
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
