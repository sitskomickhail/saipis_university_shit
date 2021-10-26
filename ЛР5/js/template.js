class App {

    #currentInstrument

    saveFormValues(name, purpose, weight, cost) {
        const instrument = new Instrument(name, purpose, weight, cost);
        database.insertNewObject(instrument);
        document.getElementById("instrumentId").value = '';
        document.getElementById("instrumentId").dispatchEvent(new Event('change'));

        this.getValuesForSelectBox();
    }

    getValuesForSelectBox() {
        database.selectAll(fillSelectBox);
    }

    getExistingObjectForForm(id) {
        database.getInstrumentById(id, fillFormWithObject)
    }

    deleteChoice(instrumentId) {
        database.deleteInstrumentById(instrumentId, reloadAfterDeleting);
    }

    showAllInstruments() {
        database.selectAll(showInstrumentsTable);
    }

    set currentInstrument(value) {
        this.#currentInstrument = value;
    }

    showInstrumentMinWeight() {
        database.getMinWeightInstrument(showInstrumentsTable);
    }

    addNewProperty(propName, propValue) {
        this.#currentInstrument.addProperty(propName, propValue);
    }

    getAllProperties() {
        showPropertiesList(this.#currentInstrument.getPropertiesList());
    }
}

const app = new App();

document.getElementById("instrumentForm").addEventListener("submit", function (submitAction) {
    submitAction.preventDefault();

    const name = document.getElementById("title").value;
    const purpose = document.getElementById("purpose").value;
    const weight = document.getElementById("weight").value;
    const cost = document.getElementById("cost").value;

    app.saveFormValues(name, purpose, weight, cost);
});

document.getElementById("showTableList").addEventListener("click", function () {
    const table = document.getElementById("instrumentsTable");

    if (table.style.display !== "none") {
        table.style.display = "none";
    } else {
        table.style.display = "table";
        app.showAllInstruments();
    }

})

document.getElementById("selectInstruments").addEventListener("change", function () {
    const selectedValueId = Number.parseInt(document.getElementById("selectInstruments").value);

    if (!Number.isNaN(selectedValueId)) {
        app.getExistingObjectForForm(selectedValueId);
    } else {
        document.getElementById("instrumentId").value = '';
        document.getElementById("instrumentId").dispatchEvent(new Event('change'));
    }
});

document.getElementById("instrumentId").addEventListener("change", function () {
    const buttonDisabled = document.getElementById("instrumentId").value === '';

    document.getElementById("deleteCurrentValue").disabled = buttonDisabled;
    document.getElementById("manageProps").disabled = buttonDisabled;
})

document.getElementById("deleteCurrentValue").addEventListener("click", function () {
    const instrumentId = Number.parseInt(document.getElementById("instrumentId").value);

    app.deleteChoice(instrumentId);
})

document.getElementById("clearFormBtn").addEventListener("click", function () {
    clearForm();
})

document.getElementById("showMinWeightInstrument").addEventListener("click", function () {
    const table = document.getElementById("instrumentsTable");

    if (table.style.display === "none") {
        table.style.display = "table";
    }

    app.showInstrumentMinWeight();
});

document.getElementById("manageProps").addEventListener("click", function () {
    document.getElementById("newProperty").value = "";
    document.getElementById("propertyValue").value = "";
    document.getElementById("propertiesList").innerHTML = "";

    document.getElementById("modalWindow").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("modalWindow").style.display = "none";
});

document.getElementById("addProp").addEventListener("click", function () {

    const propName = document.getElementById("newProperty").value;
    const propValue = document.getElementById("propertyValue").value;

    app.addNewProperty(propName, propValue)
})

document.getElementById("showProps").addEventListener("click", function () {
    app.getAllProperties();
});

function FillCell(newRow, cellIndex, cellValue) {
    var rowCell = newRow.insertCell(cellIndex);
    var cellText = document.createTextNode(cellValue);
    rowCell.appendChild(cellText);
}

function showInstrumentsTable(instruments) {
    let table = document.getElementById("instrumentsTable");
    table.innerHTML = "<tr><th>Id</th><th>Название</th><th>Назначение</th><th>Вес (г)</th><th>Стоимость (руб.)</th></tr>";

    instruments.map((inst, index) => {
        var newRow = table.insertRow(index + 1);

        FillCell(newRow, 0, inst.id);
        FillCell(newRow, 1, inst.name);
        FillCell(newRow, 2, inst.purpose);
        FillCell(newRow, 3, inst.weight);
        FillCell(newRow, 4, inst.cost);
    });
}

function fillSelectBox(instruments) {
    let select = document.getElementById("selectInstruments");
    select.innerHTML = "<option selected>Выберите инструмент</option>";

    instruments.map(inst => {
        var option = document.createElement("option");
        option.text = inst.name;
        option.value = inst.id;
        select.appendChild(option);
    });
}

function fillFormWithObject(instrument) {

    if (instrument === undefined) {
        alert("Object is undefined");
        return;
    }

    document.getElementById("title").value = instrument.name;
    document.getElementById("purpose").value = instrument.purpose;
    document.getElementById("weight").value = instrument.weight;
    document.getElementById("cost").value = instrument.cost;
    document.getElementById("instrumentId").value = instrument.id;
    document.getElementById("instrumentId").dispatchEvent(new Event('change'));

    app.currentInstrument = instrument;
}

function reloadAfterDeleting() {
    app.getValuesForSelectBox();
    clearForm();
}

function clearForm() {
    document.getElementById("title").value = '';
    document.getElementById("purpose").value = '';
    document.getElementById("weight").value = '';
    document.getElementById("cost").value = '';
    document.getElementById("instrumentId").value = '';
    document.getElementById("instrumentId").dispatchEvent(new Event('change'));
}

function showPropertiesList(properties) {
    let list = document.getElementById("propertiesList");
    list.innerHTML = "";

    const iterator1 = properties.values();
    let prop = iterator1.next().value;

    while (prop !== undefined) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(prop));
        list.appendChild(li);

        prop = iterator1.next().value;
    }
}

app.getValuesForSelectBox();