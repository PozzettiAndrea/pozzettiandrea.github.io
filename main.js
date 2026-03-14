// Fetch pinned & top repos from GitHub API
const USERNAME = 'PozzettiAndrea';

// Pinned repos (hardcoded names since GitHub API doesn't expose pins without GraphQL)
const PINNED = [
    'ComfyUI-SAM3',
    'ComfyUI-UniRig',
    'ComfyUI-DepthAnythingV3',
    'ComfyUI-SAM3DBody',
    'ComfyUI-SAM3DObjects',
    'ComfyUI-GeometryPack',
];

const grid = document.getElementById('project-grid');

// Show loading skeletons
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

async function loadProjects() {
    showLoading();
    try {
        const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=stars&direction=desc`);
        if (!res.ok) throw new Error('GitHub API error');
        const repos = await res.json();

        // Show pinned repos first, then top starred ones
        const pinned = PINNED.map(name => repos.find(r => r.name === name)).filter(Boolean);
        const rest = repos.filter(r => !PINNED.includes(r.name)).slice(0, 6);
        const display = [...pinned, ...rest].slice(0, 9);

        grid.innerHTML = '';
        display.forEach(repo => grid.appendChild(renderCard(repo)));
    } catch (err) {
        console.error('Failed to load repos:', err);
        grid.innerHTML = '<p style="color: var(--text-muted);">Could not load projects. <a href="https://github.com/PozzettiAndrea" style="color: var(--accent);">View on GitHub →</a></p>';
    }
}

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
