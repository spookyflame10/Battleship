import Gameboard from './factories/Gameboard';
import Player from './factories/Player';
import Ship from './factories/Ship';
import UI from './UI';
import './styles/style.css';

export const player = new Player('p1', true, 10);
export const computer = new Player('computer', false, 10);
export const gameboard = new Gameboard(10);
const mode = document.querySelector('.mode');
mode.onclick = ()=>{
    mode.classList.toggle('clicked');
    document.body.classList.toggle('light');
  }
  
UI.initialUI();
