import App from './src/components/App/App.js';

function initApp(){
    const app = new App(document.getElementById('app'));
}

document.addEventListener('DOMContentLoaded', initApp)
