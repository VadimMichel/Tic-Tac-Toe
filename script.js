let currentPlayer = 'sircle'; // Startspieler

function render() {
    // Referenz auf den Container
    const content = document.getElementById('content');
    
    // HTML-Code für die Tabelle erstellen
    let tableHTML = '<table id="ticTacToeTable">';
    
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cellValue = fields[index];
            
            // HTML für die Zelle entsprechend dem Wert im Array setzen
            let displayValue = '';
            if (cellValue === 'sircle') {
                displayValue = generateCircleSVG(); // Anzeigen eines Kreises
            } else if (cellValue === 'cross') {
                displayValue = createAnimatedX(); // Anzeigen eines Kreuzes
            }
            
            tableHTML += `<td onclick="handleCellClick(${index}, this)">${displayValue}</td>`;
        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    
    // Tabelle in den Container einfügen
    content.innerHTML = tableHTML;
}

function handleCellClick(index, cell) {
    // Überprüfen, ob das Feld bereits belegt ist
    if (fields[index] === null) {
        fields[index] = currentPlayer; // Aktueller Spieler wird ins Array eingefügt
        // HTML-Code einfügen
        if (currentPlayer === 'sircle') {
            cell.innerHTML = generateCircleSVG(); // Anzeige des Kreises
        } else {
            cell.innerHTML = createAnimatedX(); // Anzeige des Kreuzes
        }
        // Wechseln des aktuellen Spielers
        currentPlayer = currentPlayer === 'sircle' ? 'cross' : 'sircle';
        // Überprüfen, ob das Spiel gewonnen wurde
        checkForWinner();
        // Entfernen des onclick-Handlers von diesem <td>
        cell.onclick = null;
    }
}

function checkForWinner() {
    const winPatterns = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale von oben links
        [2, 4, 6]  // Diagonale von oben rechts
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(pattern);
            return; // Spielen beenden, wenn ein Gewinner gefunden wurde
        }
    }
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;
  
    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
  
    const contentRect = document.getElementById('content').getBoundingClientRect();
  
    const lineLength = Math.sqrt(
      Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
  
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
  }

function generateCircleSVG() {
    const color = '#00B0EF';
    const width = 70;
    const height = 70;

    return `<svg width="${width}" height="${height}">
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="9" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
              </circle>
            </svg>`;
}

// Beispiel: Diese Funktion gibt das animierte X zurück
function createAnimatedX() {
    return `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="12">
                <animate attributeName="stroke-width" from="0" to="12" dur="0.25s" begin="0s" fill="freeze" />
            </line>
            <line x1="10" y1="60" x2="60" y2="10" stroke="#FFC000" stroke-width="12">
                <animate attributeName="stroke-width" from="0" to="12" dur="0.25s" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;
}
