import Gameboard from './factories/Gameboard';
import Player from './factories/Player';
import Ship from './factories/Ship';
import UI from './UI';
import { player, computer} from "./index";

const gameController = (() => {
    function gameStart(){
        // maybe put this in UI
        computer.randomPlaceShips();
        UI.displayShips(player.gameboard, 'player');
        UI.displayShips(computer.gameboard, 'computer');
        gameLoop();
    }
    function gameLoop(){
        while(!player.gameboard.isGameOver && !computer.gameboard.isGameOver){
            if(player.playing){
                player
            }
        }
    }

    return {gameStart};
})();

export default gameController;