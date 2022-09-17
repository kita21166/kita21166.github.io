const userNameTextArea = document.getElementById("userNameTextArea")
const checkRName = function(){
	WhereAre = document.getElementById("RoomNameSetting").value;
	if(afterChoose === false){
		const userNameString = userNameTextArea.value;
		const userNameStringArr = userNameString.split("、");
		if(userNameStringArr.length !== parseInt(howMany)){
			window.alert(`生徒名の読み取り時にエラーが発生しました。
			\n名前は全角で入力し、名前と名前の間は全角の「、」で区切ってください。
			\n${howMany}人の名前を入力してください
			\n入力の終わりには「、」を入れないでください`);
			return;
		}
		for(let i = 0; i < userNameStringArr.length; i++){
			studentTags[i] = userNameStringArr[i];
		}
	}
    document.body.removeChild(document.getElementById("RoomNameSettingWrap"));
	progress.setTrue(progress.starts);
	SVGmb();
}
const checkBoxStudentName = document.getElementById("whenSetStudentName");
checkBoxStudentName.addEventListener("change",()=>{
	if(checkBoxStudentName.checked === true){
		afterChoose = true;
		userNameTextArea.className = "hiddenElement";
	}else{
		afterChoose = false;
		userNameTextArea.className = "blockElement";
	}
})