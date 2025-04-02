function render() {
    // Referenz auf den Container
    const content = document.getElementById('content');
    
    // HTML-Code für die Tabelle erstellen
    let tableHTML = '<table>';
    
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cellValue = fields[index];
            
            // HTML für die Zelle entsprechend dem Wert im Array setzen
            let displayValue = '';
            if (cellValue === 'sircle') {
                displayValue = createAnimatedClockwiseCircle(); // Anzeigen eines Kreises
            } else if (cellValue === 'cross') {
                displayValue = createAnimatedX(); // Anzeigen eines Kreuzes
            }
            
            tableHTML += `<td>${displayValue}</td>`;
        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    
    // Tabelle in den Container einfügen
    content.innerHTML = tableHTML;
}

function createAnimatedClockwiseCircle() {
    const radius = 30; // Radius der Kreise
    const circumference = 2 * Math.PI * radius; // Umfang des Kreises
    
    return `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="${radius}" stroke="#00B0EF" stroke-width="9" fill="none" />
            <circle cx="35" cy="35" r="${radius}" stroke="#00B0EF" stroke-width="9" fill="none" 
                    stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}">
                <animate attributeName="stroke-dashoffset" from="${circumference}" to="0" dur="0.25s" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;
}

function createAnimatedX() {
    const crossSVG = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="0">
                <animate attributeName="stroke-width" from="0" to="12" dur="250ms" begin="0s" fill="freeze" />
            </line>
            <line x1="10" y1="60" x2="60" y2="10" stroke="#FFC000" stroke-width="0">
                <animate attributeName="stroke-width" from="0" to="12" dur="250ms" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;
    return crossSVG;
}
