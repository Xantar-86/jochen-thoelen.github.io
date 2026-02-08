#!/usr/bin/env node
/**
 * Build script to convert Markdown files to HTML for local development
 * This generates static HTML files from Jekyll Markdown files
 */

const fs = require('fs');
const path = require('path');

// HTML Template
const getTemplate = (title, description, content, relativePath = './', activeNav = 'home') => `
<!DOCTYPE html>
<html lang="nl" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="${relativePath}assets/css/style.css">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="${relativePath}" class="nav-logo">
                <span class="logo-text">JT</span>
            </a>
            
            <button class="nav-toggle" aria-label="Navigatie wisselen">
                <span class="hamburger"></span>
            </button>
            
            <ul class="nav-menu">
                <li><a href="${relativePath}" class="nav-link${activeNav === 'home' ? ' active' : ''}">Home</a></li>
                <li><a href="${relativePath}ad-electro/" class="nav-link${activeNav === 'ad' ? ' active' : ''}">AD Project</a></li>
                <li><a href="${relativePath}botje-familyhub/" class="nav-link${activeNav === 'botje' ? ' active' : ''}">Family Hub</a></li>
            </ul>
            
            <div class="nav-actions">
                <button class="theme-toggle" aria-label="Wissel donker/licht thema">
                    <i class="fas fa-moon"></i>
                </button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
        ${content}
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <span class="footer-logo">JT</span>
                    <p>Jochen Thoelen</p>
                    <span class="footer-tagline">IT Infrastructure Specialist</span>
                </div>
                <div class="footer-links">
                    <a href="${relativePath}">Home</a>
                    <a href="${relativePath}ad-electro/">AD Project</a>
                    <a href="${relativePath}botje-familyhub/">Family Hub</a>
                </div>
                <div class="footer-social">
                    <a href="https://www.linkedin.com/in/jochen-thoelen-b83106189" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Jochen Thoelen. All rights reserved.</p>
                <p>Designed with <i class="fas fa-heart"></i> and lots of <i class="fas fa-coffee"></i></p>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button class="back-to-top" aria-label="Terug naar boven">
        <i class="fas fa-arrow-up"></i>
    </button>

    <!-- JavaScript -->
    <script src="${relativePath}assets/js/main.js"></script>
</body>
</html>
`;

// Parse frontmatter from markdown
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
        const frontmatter = {};
        match[1].split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            }
        });
        return { frontmatter, content: match[2] };
    }
    
    return { 
        frontmatter: { title: '', description: '' }, 
        content 
    };
}

// Simple markdown to HTML converter
function markdownToHtml(content, isHome = false) {
    // Handle Jekyll URLs first
    const prefix = isHome ? '.' : '..';
    
    // Replace absolute GitHub Pages URLs
    content = content.replace(/\/jochen-thoelen\.github\.io\//g, prefix + '/');
    
    // Handle relative_url filter
    content = content.replace(/\{\{\s*['"](.+?)['"]\s*\|\s*relative_url\s*\}\}/g, (match, p1) => {
        if (p1.startsWith('/')) {
            return isHome ? '.' + p1 : '..' + p1;
        }
        return isHome ? './' + p1 : '../' + p1;
    });
    
    // Remove Jekyll liquid tags
    content = content.replace(/\{\%.*\%\}/g, '');
    content = content.replace(/\{\{.*\}\}/g, '');
    
    // Convert headers
    content = content.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
    content = content.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    content = content.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    content = content.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    
    // Convert bold and italic
    content = content.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
    content = content.replace(/_(.+?)_/g, '<em>$1</em>');
    
    // Convert code blocks
    content = content.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convert horizontal rules
    content = content.replace(/^---$/gm, '<hr>');
    
    // Convert paragraphs - wrap lines that aren't HTML tags
    const lines = content.split('\n');
    let inHtml = false;
    let result = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // Check if we're entering/exiting HTML block
        if (trimmed.startsWith('<') && !trimmed.startsWith('<code') && !trimmed.startsWith('</code')) {
            if (!trimmed.startsWith('</')) {
                // Opening tag
                inHtml = true;
                result.push(line);
            } else {
                // Closing tag
                inHtml = false;
                result.push(line);
            }
        } else if (inHtml) {
            result.push(line);
        } else if (trimmed === '') {
            result.push('');
        } else if (trimmed.match(/^<(h[1-6]|p|ul|ol|li|div|section|a|img|figure|figcaption|strong|em|code|pre|hr|span|i|b)/)) {
            // Already HTML
            result.push(line);
        } else {
            // Regular paragraph
            result.push('<p>' + line + '</p>');
        }
    }
    
    return result.join('\n');
}

// Build a single file
function buildFile(inputPath, outputPath, relativePath, pageType) {
    try {
        const rawContent = fs.readFileSync(inputPath, 'utf-8');
        const { frontmatter, content } = parseFrontmatter(rawContent);
        
        const title = frontmatter.title || 'Jochen Thoelen - Portfolio';
        const description = frontmatter.description || 'Praktijkgerichte IT-projecten rond infrastructuur, automatisatie en webontwikkeling';
        
        // Convert content
        let htmlContent = markdownToHtml(content, pageType === 'home');
        
        // Get template with proper active nav
        const template = getTemplate(title, description, htmlContent, relativePath, pageType);
        
        // Write output
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, template);
        
        console.log(`✅ Built: ${inputPath} → ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`❌ Error building ${inputPath}:`, error.message);
        return false;
    }
}

// Main build function
function build() {
    console.log('\n🔨 Building site...\n');
    
    const startTime = Date.now();
    let successCount = 0;
    
    // Build homepage
    if (buildFile('./index.md', './index.html', './', 'home')) {
        successCount++;
    }
    
    // Build AD Electro page
    if (buildFile('./ad-electro/index.md', './ad-electro/index.html', '../', 'ad')) {
        successCount++;
    }
    
    // Build Botje page
    if (buildFile('./botje-familyhub/index.md', './botje-familyhub/index.html', '../', 'botje')) {
        successCount++;
    }
    
    const duration = Date.now() - startTime;
    console.log(`\n✨ Built ${successCount}/3 files in ${duration}ms\n`);
    
    return successCount === 3;
}

// Watch mode
function watch() {
    console.log('\n👀 Watching for changes... (Press Ctrl+C to stop)\n');
    
    const chokidar = require('chokidar');
    
    const watcher = chokidar.watch([
        './index.md',
        './ad-electro/index.md',
        './botje-familyhub/index.md',
        './_layouts/*.html'
    ], {
        ignored: /node_modules/,
        persistent: true
    });
    
    watcher.on('change', (filepath) => {
        console.log(`📝 Changed: ${filepath}`);
        build();
    });
    
    // Initial build
    build();
}

// CLI
const command = process.argv[2];

if (command === 'watch') {
    watch();
} else {
    const success = build();
    process.exit(success ? 0 : 1);
}
