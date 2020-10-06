const colors = [
  'red', 'blue', 'green',
  'pink', 'orange', 'yellow',
  'black', 'white', 'purple',
  'brown', 'cyan', 'lime'
];
const nColumns = 3;

var players = {};
var totalPlayers = 12;


class Player {
  constructor(color) {
    this.color = color;
    this.state = '-';
  }

  setState(state) {
    if (state == this.state) {      
      return;
    }

    if (state == 'Died' || state == 'Not Play') {
      console.log(state)
      totalPlayers -= 1;
      document.querySelector('#total-players').innerHTML = totalPlayers;
    } else if (state == '-') {
      totalPlayers += 1;
      document.querySelector('#total-players').innerHTML = totalPlayers;
    }

    this.state = state;
    var ctn = document.querySelector(`#card-${this.color}`);
    ctn.innerHTML = this.render();
  }

  getStyle() {
    if (this.state == 'Died' || this.state == 'Not Play') {
      return `style="background-color:#797a7e;color:white;"`;
    } else if (this.state == 'Crewmate') {
      return `style="background-color:#ccf6c8;color:black;"`;
    } else if (this.state == 'Suspect') {
      return `style="background-color:#f9c0c0;color:black;"`;
    } else if (this.state == 'Warn') {
      return `style="background-color:#edc988;color:black;"`;
    }
    return ""
  }

  render() {
    return `
    <div class="card" ${this.getStyle()}>
      <div class="row">
        <div class="col-sm-4">
          <div class="row">
            <img src="assets/${this.color}.png">
          </div>
          <div class="row">
              Status:
          </div>
          <div class="row">
              <b>${this.state}</b>
          </div>
        </div>
        <div class="col-sm-8">
          <button class="primary" onclick="crewmate('${this.color}');">Crewmate</button>
          <button style="background-color:#ac4b1c;color:white;" onclick="warn('${this.color}');">Warn</button>
          <button class="secondary" onclick="suspect('${this.color}');">Suspect</button>
          <button class="tertiary" onclick="died('${this.color}');">Died</button>
          <button class="inverse" onclick="notPlay('${this.color}');">Not Play</button>
          <button style="background-color:#a6f6f1;color:black;" onclick="play('${this.color}');">Play</button>
        </div>
      </div>
    </div>`
  }
}

function renderAll() {
  totalPlayers = 12;
  document.querySelector('#total-players').innerHTML = totalPlayers;
  var ctn = document.querySelector('#main-container');
  colors.forEach(color => {
    players[color] = new Player(color);
  });

  body = `<div class="row">`
  for (var i = 0, n = colors.length; i < n; i++) {
    if(i % nColumns == 0) {
      body += `<div class="col-sm-4">`
    }

    var color = colors[i];
    body += `
    <div id="card-${color}">
      ${players[color].render()}
    </div>`

    if(i % nColumns == 0) {
      body += `</div>`
    }
  }

  ctn.innerHTML = body;
}

function crewmate(color) {
  var player = players[color];
  player.setState('Crewmate');
}

function warn(color) {
  var player = players[color];
  player.setState('Warn');
}

function suspect(color) {
  var player = players[color];
  player.setState('Suspect');
}

function died(color) {
  var player = players[color];
  player.setState('Died');
}

function notPlay(color) {
  var player = players[color];
  player.setState('Not Play');
}

function play(color) {
  var player = players[color];
  player.setState('-');
}
