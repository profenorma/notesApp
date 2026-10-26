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

function generateGridBackground() {
    let lines = <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dbeafe" stroke-width="1"/>
    </pattern>
    <rect width="792" height="1056" fill="url(#grid)" />
    <line x1="710" y1="0" x2="710" y2="1056" stroke="#ef4444" stroke-width="2"/>;
    return lines;
}

function loadSection(sec) {
    document.getElementById('currentSectionTitle').innerText = 'Section ' + sec + ' (A4 Math Grid Note)';
    const svgGroup = document.getElementById('svgContent');
    const notes = Storage.get('notes_' + sec);

    let html = <rect width="792" height="1056" fill="#ffffff" rx="4" stroke="#cbd5e1" stroke-width="2"/>;
    html += generateGridBackground();

    // Standardized Header Metadata
    html += <text x="36" y="48" font-family="'Comic Sans MS', sans-serif" font-size="18" fill="#1e40af">Name: ____________________</text>;
    html += <text x="500" y="48" font-family="'Comic Sans MS', sans-serif" font-size="18" fill="#1e40af">Monday, October 12, 2026</text>;
    html += <text x="36" y="84" font-family="'Comic Sans MS', sans-serif" font-size="18" fill="#1e40af">Week 2.1</text>;
    html += <text x="560" y="84" font-family="'Comic Sans MS', sans-serif" font-size="18" fill="#1e40af">4th Grade "___"</text>;

    // Centered Title Block
    html += <text x="396" y="140" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#1e293b">Inverse Operations</text>;
    html += <text x="396" y="180" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#2563eb">Division and Multiplication</text>;

    // Goal & Definitions
    html += <text x="36" y="240" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">Goal: <tspan fill="#1e293b" font-weight="normal">Apply the inverse relationship between division and multiplication to solve</tspan></text>;
    html += <text x="36" y="270" font-family="sans-serif" font-size="18" fill="#1e293b">division equations and verify quotients with multiplication.</text>;

    html += <text x="36" y="330" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb" text-decoration="underline">Definitions</text>;
    html += <text x="36" y="370" font-family="sans-serif" font-size="18" fill="#2563eb">• Division and Multiplication: <tspan fill="#1e293b">Are inverse operations. Dividing partitions a total</tspan></text>;
    html += <text x="56" y="400" font-family="sans-serif" font-size="18" fill="#1e293b">into equal parts, and multiplying combines those equal parts to restore the original whole.</text>;

    // Render Section Notes / Dynamic Rows
    let startY = 460;
    if (notes.length === 0) {
        html += <text x="36" y="" font-family="sans-serif" font-size="18" fill="#64748b">• No additional notes added for Section  yet.</text>;
    } else {
        notes.forEach((n, idx) => {
            let rowY = startY + (idx * 50);
            html += <text x="36" y="" font-family="sans-serif" font-size="18" fill="#1e293b">•  <tspan fill="#94a3b8" font-size="14">()</tspan></text>;
        });
    }

    // Standardized Rule Container Box
    html += <rect x="36" y="820" width="650" height="180" fill="none" rx="12" stroke="#2563eb" stroke-width="2"/>;
    html += <text x="60" y="860" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">Original:</text>;
    html += <text x="520" y="860" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">Inverse:</text>;
    html += <text x="60" y="900" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb">56 ÷ 8 = 7</text>;
    html += <text x="330" y="910" font-family="sans-serif" font-size="22" fill="#dc2626">?</text>;
    html += <text x="520" y="900" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb">7 × 8 = 56</text>;
    html += <text x="60" y="940" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb">56 ÷ 7 = 8</text>;
    html += <text x="520" y="940" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb">8 × 7 = 56</text>;

    svgGroup.innerHTML = html;
    window.currentSec = sec;
}

window.addNote = () => {
    const text = prompt('Enter a note/rule line for Section ' + (window.currentSec || '4A') + ':');
    if (!text || !text.trim()) return;
    const notes = Storage.get('notes_' + (window.currentSec || '4A'));
    notes.push({ text: text.trim(), date: formatDate() });
    Storage.set('notes_' + (window.currentSec || '4A'), notes);
    loadSection(window.currentSec || '4A');
};

window.adjustZoom = (delta) => {
    currentZoom = Math.max(0.5, Math.min(3.0, currentZoom + delta));
    const group = document.getElementById('svgContent');
    group.setAttribute('transform', scale());
};
