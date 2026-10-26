import { Storage, formatDate } from './utils.js';

const sections = ['4A', '4B', '4C', '4D', '4E', '5B'];
let currentZoom = 1;

window.initApp = () => {
    const nav = document.getElementById('section-nav');
    sections.forEach(sec => {
        const btn = document.createElement('button');
        btn.innerText = sec;
        btn.onclick = () => loadSection(sec);
        nav.appendChild(btn);
    });
    loadSection('4A');
};

function loadSection(sec) {
    document.getElementById('currentSectionTitle').innerText = 'Section ' + sec + ' (Vector Reader)';
    const svgGroup = document.getElementById('svgContent');
    const notes = Storage.get('notes_' + sec);
    
    let contentHtml = <rect width="700" height="900" fill="#ffffff" rx="10" stroke="#ddd" stroke-width="2"/>;
    contentHtml += <text x="40" y="60" font-family="sans-serif" font-size="28" font-weight="bold" fill="#0066cc">PROFENORMA - </text>;
    contentHtml += <line x1="40" y1="80" x2="660" y2="80" stroke="#0066cc" stroke-width="2"/>;

    if (notes.length === 0) {
        contentHtml += <text x="40" y="130" font-family="sans-serif" font-size="18" fill="#666">No vectorized notes added for Section  yet.</text>;
    } else {
        notes.forEach((n, idx) => {
            const yPos = 130 + (idx * 60);
            contentHtml += <text x="40" y="" font-family="sans-serif" font-size="14" fill="#888"></text>;
            contentHtml += <text x="40" y="" font-family="sans-serif" font-size="18" fill="#222"></text>;
        });
    }

    svgGroup.innerHTML = contentHtml;
    window.currentSec = sec;
}

window.addNote = () => {
    const text = prompt('Enter note content for Section ' + (window.currentSec || '4A') + ':');
    if (!text || !text.trim()) return;
    const notes = Storage.get('notes_' + (window.currentSec || '4A'));
    notes.push({ text: text.trim(), date: formatDate() });
    Storage.setItem('notes_' + (window.currentSec || '4A'), notes);
    loadSection(window.currentSec || '4A');
};

window.adjustZoom = (delta) => {
    currentZoom = Math.max(0.5, Math.min(4.0, currentZoom + delta));
    const group = document.getElementById('svgContent');
    group.setAttribute('transform', scale());
};
