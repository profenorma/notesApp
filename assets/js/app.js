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
    document.getElementById('currentSectionTitle').innerText = 'Section ' + sec + ' (A4 Grid Notes)';
    const svgGroup = document.getElementById('svgContent');
    const notes = Storage.get('notes_' + sec);
    const currentDate = formatDate();
    
    let html = '<rect width="700" height="990" fill="#ffffff"/>';
    
    // Draw A4 Grid lines (spacing 25px)
    for (let x = 40; x < 660; x += 25) {
        html += <line x1="" y1="0" x2="" y2="990" stroke="#e0f0ff" stroke-width="1"/>;
    }
    for (let y = 40; y < 950; y += 25) {
        html += <line x1="40" y1="" x2="660" y2="y" stroke="#e0f0ff" stroke-width="1"/>;
    }

    // Right/Left Red Margin Line
    html += <line x1="630" y1="0" x2="630" y2="990" stroke="#ffcccc" stroke-width="2"/>;

    // Header Template (matching A4 notebook style)
    html += <text x="50" y="55" font-family="sans-serif" font-size="14" fill="#0066cc">Name: ________________________</text>;
    html += <text x="420" y="55" font-family="sans-serif" font-size="14" fill="#0066cc"></text>;
    html += <text x="50" y="85" font-family="sans-serif" font-size="14" fill="#0066cc">Week 2.1</text>;
    html += <text x="530" y="85" font-family="sans-serif" font-size="14" fill="#0066cc">4th Grade "__"</text>;

    // Title
    html += <text x="350" y="130" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle" fill="#222">Classroom Notes - Section </text>;
    html += <line x1="150" y1="145" x2="550" y2="145" stroke="#0066cc" stroke-width="2"/>;

    if (notes.length === 0) {
        html += <text x="50" y="200" font-family="sans-serif" font-size="16" fill="#666">• No entries for this section yet. Click '+ Add Note' below.</text>;
    } else {
        notes.forEach((n, idx) => {
            let yPos = 200 + (idx * 70);
            html += <rect x="50" y="" width="560" height="55" rx="6" fill="#f8fbff" stroke="#bce0fd" stroke-width="1"/>;
            html += <text x="65" y="" font-family="sans-serif" font-size="12" fill="#888"></text>;
            html += <text x="65" y="" font-family="sans-serif" font-size="16" fill="#333">• </text>;
        });
    }

    svgGroup.innerHTML = html;
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
    currentZoom = Math.max(0.5, Math.min(3.0, currentZoom + delta));
    document.getElementById('svgContent').setAttribute('transform', 'scale(' + currentZoom + ')');
};
