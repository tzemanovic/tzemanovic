import './main.css';
import { Main } from './Main.elm';
import { Main2 } from './Main2.elm';
// import registerServiceWorker from './registerServiceWorker';

let root = document.getElementById('root');
if (root === null) {
  Main2.embed(document.getElementById('root2'));
} else {
  Main.embed(root);
}

// registerServiceWorker();
