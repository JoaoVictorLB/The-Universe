import { Router } from './router.js';

const router = new Router();

router.add('/home','/Pages/home.html', '/Assets/mountains-universe-1.png');
router.add('/theuniverse','/Pages/theuniverse.html', '/Assets/mountains-universe-2.png');
router.add('/exploration','/Pages/exploration.html', '/Assets/mountains-universe-3.png');
router.handle();

window.onpopstate = () => router.handle();
window.route = () => router.route();
window.findOut = () => router.findOut();