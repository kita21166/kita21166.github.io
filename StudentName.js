const tbody = document.getElementById("tbody");
const setNameTable = function () {
    howManyStudents = localStorage.getItem("notAvailableDesks") ?
        defaultDeskNumber - JSON.parse(localStorage.getItem("notAvailableDesks")).length : defaultDeskNumber;
    for (let i = 0; i < howManyStudents; i++) {
        const tr = document.createElement("tr");
        const tdNum = document.createElement("td");
        const tdName = document.createElement("td");
        const nameInput = document.createElement("input");
        tdNum.textContent = `${i + 1}`;
        nameInput.setAttribute("type", "text");
        nameInput.id = `${i}`;
        nameInput.className = "blockElement";
        nameInput.value = "";
        tdName.appendChild(nameInput);
        tr.append(tdNum,tdName);
        tbody.appendChild(tr);
    }
    document.getElementById("CompleteNameSetting").addEventListener("click",checkNameTable);
}
const checkNameTable = function () {
    for(let i = 0; i < howManyStudents; i++){
        StudentName.push(`${i + 1} ${document.getElementById(`${i}`).value}`);
        localStorage.setItem("StudentName",JSON.stringify(StudentName));
        location.href = "index.html";
    }
}
window.onload = setNameTable();