const gasData = [
    { name: "H2S"},{ name: "O2"},{ name: "SO2"},{ name: "Gas 4"},{ name: "LEL"},{ name: "Gas 6"},
];

function populateGasSelect() {
    const gasSelectDiv = document.getElementById('gasSelect');
    gasData.forEach(gas => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = gas.name;
        checkbox.id = gas.name;

        const label = document.createElement('label');
        label.htmlFor = gas.name;
        label.textContent = gas.name;

        const br = document.createElement('br');

        gasSelectDiv.appendChild(checkbox);
        gasSelectDiv.appendChild(label);
        gasSelectDiv.appendChild(br);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateGasSelect();

    const showDataButton = document.getElementById('showDataButton');
    showDataButton.addEventListener('click', () => {
        const selectedGases = Array.from(document.querySelectorAll('#gasSelect input[type="checkbox"]:checked')).map(cb => cb.value);

        if (selectedGases.length === 0) {
            alert("Please select at least one gas.");
            return;
        }
        if (selectedGases.length > 6) {
            alert("Please select a maximum of 6 gases.");
            return;
        }

        localStorage.setItem('selectedGases', JSON.stringify(selectedGases));
        window.location.href = 'data.html';
    });
});
