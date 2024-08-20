export class Router {
    constructor() {
        this.REDIRECTS = {};
        this.BACKGROUNDS = {};
    }

    // Adiciona uma nova rota e seu fundo associado
    add(redirect, html, img) {
        this.REDIRECTS[redirect] = html;
        this.BACKGROUNDS[redirect] = img;
    }

    // Função principal de roteamento
    route(event) {
        event = event || window.event;
        event.preventDefault();
        this.removeOldFocus();
        event.target.classList.add('selected');
        this.updateHistory(event);
        this.handle();
    }

    // Lida com a atualização da UI após o roteamento
    handle() {
        const body = document.querySelector('body');
        const app = document.querySelector('.app');
        const pathname = window.location.pathname === '/' ? '/home' : window.location.pathname;
        const route = this.REDIRECTS[pathname];

        this.getContent(route);
        this.updateBackground(pathname);
        
        if (pathname !== '/home') {
            app.classList.add('text');
        } else {
            app.classList.remove('text');
        }
    }

    // Atualiza o background com base na rota
    updateBackground(pathname) {
        const body = document.querySelector('body');
        const backgroundImage = this.BACKGROUNDS[pathname] || this.BACKGROUNDS['/home'];
        body.style.backgroundImage = `url(${backgroundImage})`;
    }

    // Busca o conteúdo do HTML e o insere na página
    getContent(url) {
        fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.app').innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar o conteúdo:', error));
    }

    findOut() {
        const app = document.querySelector('.app');
        const newFocus = document.querySelector('#buttonRedirect');
        app.classList.add('text');
        newFocus.classList.add('selected');
        this.getContent('/Pages/theuniverse.html');
        this.updateHistory();
        this.removeOldFocus();
        this.updateBackground('/theuniverse');
    }

    updateHistory(event){
        let redirect = event?.target?.href;
        if(!redirect){
            redirect = '/theuniverse';
        }
        window.history.pushState({}, "", redirect);
    }

    removeOldFocus(){
        const focus = document.querySelector('.selected');
        if (focus) {
            focus.classList.remove('selected');
        }
    }
}