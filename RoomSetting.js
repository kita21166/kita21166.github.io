"use strict";
const roomSetting = document.getElementById("RoomSetting");
const setRoomSetting = function() {
	for (let i = 0; i < defaultDeskNumber; i++) {
		const desk = document.createElement("div");
		desk.className = "desks";
		desk.dataset.number = `${i}`
		desk.dataset.removed = "false";
		roomSetting.append(desk);
		desk.addEventListener("click", removeDesk);
	}
	document.getElementById("CompleteRoomSetting").addEventListener("click", checkRemovedDesks);
}
const removeDesk = function() {
	this.dataset.removed = "true";
	this.removeEventListener("click", removeDesk);
	this.addEventListener("click", cancelRemoveDesk);
}
const cancelRemoveDesk = function() {
	this.dataset.removed = "false";
	this.removeEventListener("click", cancelRemoveDesk);
	this.addEventListener("click", removeDesk);
}
const checkRemovedDesks = function() {
	const desk = roomSetting.children;
	const RoomName = document.getElementById("RoomNameSetting").value;
	const notAvailableDesks = [];
	for (let i = 0; i < defaultDeskNumber; i++) {
		if(desk[i].dataset.removed==="true"){
			notAvailableDesks.push(i);
		}
	}
	window.alert(`${RoomName}の${defaultDeskNumber - notAvailableDesks.length}人分の席が登録されました。`);
	localStorage.setItem("RoomName",RoomName);
	localStorage.setItem("notAvailableDesks",JSON.stringify(notAvailableDesks));
	location.href = "index.html";
}
window.onload = setRoomSetting();
