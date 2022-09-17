const roomSetting = document.getElementById("RoomSetting"); 
const setRoomSetting = function() {
	for (let i = 0; i < 42; i++) {
		const desk = document.createElement("div");
		desk.className = "desks";
		desk.id = `desk_${i}`;
		desk.dataset.removed = "false";
		roomSetting.append(desk);
		desk.addEventListener("click", removeDesk)
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
	for (let i = 0; i < 42; i++) {
		const desk = document.getElementById(`desk_${i}`);
		if(desk.dataset.removed==="true"){
			RemovedDesks.push(i);
		}
	}
    howMany = 42 - RemovedDesks.length
	window.alert(`${howMany}人分の席が登録されました。`);
	RemoveRoomSetting();
}
const RemoveRoomSetting = function() {
	document.body.removeChild(document.getElementById("RoomSettingWrap"));
	document.body.removeChild(completeButton);
    document.title = "席替え＜R設定＞"
progress.setTrue(progress.roomNameSetting);
    const roomNameSetting= document.getElementById("RoomNameSettingWrap");
    roomNameSetting.className = "blockElement";
   document.getElementById("submitRName").addEventListener("click",checkRName);    
}

