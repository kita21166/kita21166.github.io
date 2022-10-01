const roomSetting = document.getElementById("RoomSetting"); 
const setRoomSetting = function() {
	for (let i = 0; i < defaultDeskNumber; i++) {
		const desk = document.createElement("div");
		desk.className = "desks";
		desk.dataset.number = `${i}`;
		desk.dataset.removed = "false";
		roomSetting.append(desk);
		desk.addEventListener("click", removeDesk);
	}
	completeButton.addEventListener("click", checkRemovedDesks);
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
	WhereAre = document.getElementById("RoomNameSetting").value;
	for (let i = 0; i < defaultDeskNumber; i++) {
		if(desk[i].dataset.removed==="true"){
			RemovedDesks.push(i);
		}
	}
    howMany = defaultDeskNumber - RemovedDesks.length;
	window.alert(`${WhereAre}の${howMany}人分の席が登録されました。`);
	document.body.removeChild(document.getElementById("RoomSettingWrap"));
    document.title = "席替え＜振り分け＞";
	SVGmb();
}
