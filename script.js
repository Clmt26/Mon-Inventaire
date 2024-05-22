document.getElementById('generateScreensBtn').addEventListener('click', function() {
    const screenCount = document.getElementById('screenCount').value;
    const container = document.getElementById('screenSerialNumbersContainer');
    
    // Vider le conteneur des champs de numéro de série d'écran existants
    container.innerHTML = '';
    
    // Générer les champs de numéro de série d'écran
    for (let i = 1; i <= screenCount; i++) {
        const div = document.createElement('div');
        div.classList.add('form-group');
        
        const label = document.createElement('label');
        label.textContent = `Numero de serie de l'ecran ${i}`;
        div.appendChild(label);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('screenSerialNumber');
        input.placeholder = `Numero de serie de l'ecran ${i}`;
        div.appendChild(input);
        
        container.appendChild(div);
    }
});

document.getElementById('addMachineBtn').addEventListener('click', function() {
    // Récupérer les valeurs des champs
    const pcName = document.getElementById('pcName').value;
    const serialNumber = document.getElementById('serialNumber').value;
    const screenCount = document.getElementById('screenCount').value;
    const screenSerialNumbers = Array.from(document.getElementsByClassName('screenSerialNumber')).map(input => input.value);

    // Vérifier si tous les champs sont remplis
    if (pcName && serialNumber && screenCount && screenSerialNumbers.every(num => num)) {
        // Créer un nouvel élément de liste
        const li = document.createElement('li');
        li.textContent = `${pcName} - ${serialNumber} - ${screenCount} - ${screenSerialNumbers.join(', ')}`;

        // Ajouter l'élément à la liste
        document.getElementById('machineList').appendChild(li);

        // Réinitialiser les champs du formulaire
        document.getElementById('pcName').value = '';
        document.getElementById('serialNumber').value = '';
        document.getElementById('screenCount').value = '';
        document.getElementById('screenSerialNumbersContainer').innerHTML = '';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

document.getElementById('exportCsvBtn').addEventListener('click', function() {
    const machineList = document.getElementById('machineList').getElementsByTagName('li');
    if (machineList.length === 0) {
        alert('Aucune machine à exporter.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nom du PC,Numero de serie,Nombre d'ecrans,Numeros de serie des ecrans\n";

    Array.from(machineList).forEach(li => {
        const machineData = li.textContent.split(' - ');
        csvContent += machineData.join(',') + "\n";
    });

    const fileName = document.getElementById('fileName').value || 'machines';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName + ".csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
});
