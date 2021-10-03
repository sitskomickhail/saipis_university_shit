function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

let selectValues = [
    {key: uuidv4(), value: "Value 1"},
    {key: uuidv4(), value: "Value 2"},
    {key: uuidv4(), value: "Value 3"},
    {key: uuidv4(), value: "Value 4"},
    {key: uuidv4(), value: "Value 5"},
    {key: uuidv4(), value: "Value 6"},
];

function renderSelectBox() {
    let selectBox = document.getElementById("optionsList");

    for (let i = 0; i < selectValues.length; i++) {
        selectBox.options[i] = new Option(selectValues[i].value, selectValues[i].key);
    }
}

function FillCell(newRow, cellIndex, cellValue) {
    var rowCell = newRow.insertCell(cellIndex);
    var cellText = document.createTextNode(cellValue);
    rowCell.appendChild(cellText);
}

function renderTable(object, position) {
    let table = document.getElementById("deletedItemsTable");
    let datalist = document.getElementById("deletedItemsDataList");

    let str = '<option>' + object.value + '</option>';
    datalist.innerHTML += str;

    let index = table.rows.length;
    var newRow = table.insertRow(index);

    FillCell(newRow, 0, index++);
    FillCell(newRow, 1, object.value);
    FillCell(newRow, 2, (position + 1));
    FillCell(newRow, 3, object.key);
}

function positionOption(textValue) {
    selectValues.splice(2, 0, {key: uuidv4(), value: textValue});

    renderSelectBox();
}

function removeOption(key) {
    for (let i = 0; i < selectValues.length; i++) {
        if (selectValues[i].key === key) {

            let selectBox = document.getElementById("optionsList");
            selectBox.options.remove(i);

            renderTable(selectValues[i], i);
            selectValues.splice(i, 1);

            break;
        }
    }

    renderSelectBox();
}

renderSelectBox();

document.getElementById("deleteOptionForm").addEventListener("submit", (a) => {
    a.preventDefault();

    const newOption = document.getElementById("optionsList").value;
    removeOption(newOption);
});

document.getElementById("addOptionForm").addEventListener("submit", (a) => {
    a.preventDefault();

    const newOption = document.getElementById("optionField").value;
    positionOption(newOption);
});

document.getElementById("showButton").addEventListener("click", () => {
    let area = document.getElementById("results");
    area.hidden = !area.hidden;
});