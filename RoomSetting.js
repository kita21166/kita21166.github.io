"use strict";
const roomSetting = document.getElementById("RoomSetting");
const roomNameSetting = document.getElementById("RoomNameSetting");
const setRoomSetting = function () {
	roomNameSetting.focus();
	for (let i = 0; i < defaultDeskNumber; i++) {
		const desk = document.createElement("div");
		desk.className = "desks";
		desk.dataset.removed = "false";
		roomSetting.append(desk);
		desk.addEventListener("click", removeDesk);
	}
	document.getElementById("CompleteRoomSetting").addEventListener("click", checkRemovedDesks);
}
const removeDesk = function () {
	this.dataset.removed = "true";
	this.removeEventListener("click", removeDesk);
	this.addEventListener("click", cancelRemoveDesk);
}
const cancelRemoveDesk = function () {
	this.dataset.removed = "false";
	this.removeEventListener("click", cancelRemoveDesk);
	this.addEventListener("click", removeDesk);
}
const checkRemovedDesks = function () {
	const desk = roomSetting.children;
	const RoomName = roomNameSetting.value;
	notAvailableDesks = [];
	for (let i = 0; i < defaultDeskNumber; i++) {
		if (desk[i].dataset.removed === "true") {
			notAvailableDesks.push(i);
		}
	}
	if (notAvailableDesks.length === defaultDeskNumber) {
		window.alert(`座席は一つ以上有効にしてください`);
	} else {
		window.alert(`${RoomName}の${defaultDeskNumber - notAvailableDesks.length}人分の席が登録されました。`);
		if (localStorage.getItem("notAvailableDesks") && localStorage.getItem("StudentName")) {
			localStorage.removeItem("StudentName");
		}
		localStorage.setItem("RoomName", RoomName);
		localStorage.setItem("notAvailableDesks", JSON.stringify(notAvailableDesks));
		location.href = "index.html";
	}
}
window.onload = setRoomSetting();

