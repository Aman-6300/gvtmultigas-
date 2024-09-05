const gasData = [
    { name: "H2S", values: ["compatable", "compatable", "compatable", "compatable", "compatable"], details: ["Detail 1 for Device 1", "Detail 2 for Device 2", "Detail 3 for Device 3", "Detail 4 for Device 4", "Detail 5 for Device 5"], partNumber: "PN-001" },
    { name: "O2", values: ["compatable", "compatable", "compatable", "compatable", "-"], details: ["Detail 1 for Device 1", "N/A", "Detail 3 for Device 3", "Detail 4 for Device 4", "Detail 5 for Device 5"], partNumber: "PN-002" },
    { name: "SO2", values: ["compatable", "-", "compatable", "compatable", "compatable"], details: ["Detail 1 for Device 1", "Detail 2 for Device 2", "Detail 3 for Device 3", "Detail 4 for Device 4", "Detail 5 for Device 5"], partNumber: "PN-003" },
    { name: "Gas4", values: ["compatable", "compatable", "-", "compatable", "compatable"], details: ["Detail 1 for Device 1", "Detail 2 for Device 2", "Detail 3 for Device 3", "Detail 4 for Device 4", "Detail 5 for Device 5"], partNumber: "PN-004" },
    { name: "LEL", values: ["compatable", "compatable", "compatable", "-", "compatable"], details: ["Detail 1 for Device 1", "Detail 2 for Device 2", "Detail 3 for Device 3", "Detail 4 for Device 4", "Detail 5 for Device 5"], partNumber: "PN-005" },
    { name: "Gas6", values: ["compatable", "-", "compatable", "compatable", "compatable"], details: ["Detail 1 for Device 1", "Detail 2 for Device 2", "Detail 3 for Device 3", "Detail 4 for Device 4", "Detail 5 for Device 5"], partNumber: "PN-006" }
];

function populateTable(selectedGases) {
    const tbody = document.querySelector('#gasTable tbody');
    tbody.innerHTML = '';

    const gasesToShow = gasData.filter(gas => selectedGases.includes(gas.name));

    gasesToShow.forEach(gas => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="gas-name" data-gas="${gas.name}">${gas.name}</td>` +
                        gas.values.map((value, index) => 
                            `<td data-gas="${gas.name}" data-device="${index + 1}" class="device-cell">${value}</td>`
                        ).join('');
        tbody.appendChild(row);
    });

    attachDeviceClickListeners();
    attachGasNameClickListeners();
}

function attachDeviceClickListeners() {
    const deviceCells = document.querySelectorAll('.device-cell');

    deviceCells.forEach(cell => {
        cell.addEventListener('click', (event) => {
            const gasName = event.target.getAttribute('data-gas');
            const deviceIndex = event.target.getAttribute('data-device') - 1;

            const gas = gasData.find(g => g.name === gasName);
            const detail = gas.details[deviceIndex];

            displayDetailsModal(gasName, deviceIndex + 1, detail);
        });
    });
}

function attachGasNameClickListeners() {
    const gasNameCells = document.querySelectorAll('.gas-name');

    gasNameCells.forEach(cell => {
        cell.addEventListener('click', (event) => {
            const gasName = event.target.getAttribute('data-gas');

            const gas = gasData.find(g => g.name === gasName);
            const partNumber = gas.partNumber;

            displayPartNumberModal(gasName, partNumber);
        });
    });
}

function displayDetailsModal(gasName, deviceNumber, detail) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${gasName} - Device ${deviceNumber}</h2>
            <p>${detail}</p>
        </div>
    `;
    
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.style.display = 'block';
}

function displayPartNumberModal(gasName, partNumber) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${gasName} - Part Number</h2>
            <p>Part Number: ${partNumber}</p>
        </div>
    `;
    
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const selectedGases = JSON.parse(localStorage.getItem('selectedGases')) || [];
    populateTable(selectedGases);
});
