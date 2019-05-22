/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, tossDone;

init();

function init()
{
    scores = [0,0]
    roundScore=0;
    activePlayer=0;
    gamePlaying=true;
    tossDone=false;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');

}

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying && tossDone){
        var dice = Math.floor(Math.random() * 6 ) + 1;
    

        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
    
        if (dice>1){
            roundScore += dice;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying && tossDone){
        scores[activePlayer]+=roundScore;
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
    
        if(scores[activePlayer]>=20)
        {
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.getElementById('name-'+activePlayer).textContent = 'Winner!';
            document.getElementById('name-'+(1-activePlayer)).textContent = 'Oops!';
            document.querySelector('.dice').style.display = 'none';
            gamePlaying=false;
            tossDone=false;
    
        }
        else{
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    roundScore=0;
    activePlayer = 1-activePlayer;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-toss').addEventListener('click', function(){
    if(!tossDone && gamePlaying){
        var toss = Math.floor(Math.random()*2);
        activePlayer=toss;
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
        document.getElementById('name-'+activePlayer).textContent = 'Player '+(1+activePlayer)+'(Won Toss)';
        document.getElementById('name-'+(1-activePlayer)).textContent = 'Player '+(1-activePlayer+1)+'(Lost Toss)';
        tossDone=true;
    }

});