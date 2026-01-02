import { createRoot, html } from './deps.js';
import App from './App.js';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(html`<${App} />`);
} else {
    console.error("No root element found");
}