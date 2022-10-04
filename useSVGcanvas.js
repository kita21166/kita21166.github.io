"use strict";
const SVGscreen = document.getElementById("SVGScreen"); 
const start_endButton = document.getElementById("start_endSelectDesk");
const userNumArea = document.getElementById("UserNumber");
const selectNameArea = document.getElementById("selectName");
const deskCanvas = document.getElementById("deskCanvas");
const SVGcanvas = document.getElementById("SVGcanvas");
const dates = new Date();
const deskWidth = 150;
const deskHeight = 70;
const desksMargin = 10;
const startlineX = 20;
const startlineY = 61;
const namePaddingX = 75;
const namePaddingY = 35;
const placeName = [];
const userNums = [];
let interval = 0;
let ShouldInputNumber= true;
let currentUserName = howManyStudents;
let randomWhereNum, Animeid, howManyRest, userNameForOut;
document.getElementById('RoomSettingOption').onclick = () => 
location.href = "RoomSetting.html";
document.getElementById('StudentNameOption').onclick = () =>
location.href = "StudentName.html";
window.onload = function () {
    if(localStorage.length !== 0){
        document.getElementById("alert").textContent = "保存された設定内容があります";
    }
    notAvailableDesks = localStorage.getItem("notAvailableDesks") ? 
        JSON.parse(localStorage.getItem("notAvailableDesks")) : [];
    howManyStudents = defaultDeskNumber - notAvailableDesks.length;
    howManyRest = howManyStudents;
    RoomName = localStorage.getItem("RoomName") ? localStorage.getItem("RoomName") : "";
    StudentName = localStorage.getItem("StudentName") ? 
        JSON.parse(localStorage.getItem("StudentName")) : [];
    document.title = `席替え＜席替え(${howManyStudents}人)＞`;
    SVGmb();
}
const putButtonSVG = function(){
    const DLbutton = document.createElement("button");
    DLbutton.type = "button";
    DLbutton.textContent = "保存";
    document.body.append(DLbutton);
    DLbutton.addEventListener("click",()=>{
        const SVGtext = new XMLSerializer().serializeToString(document.getElementById("SVGsheet"));
        const canvasForSVG = document.createElement("canvas");
        canvasForSVG.width = 990;
        canvasForSVG.height = 700;
        const SVGx = canvasForSVG.getContext("2d");
        const imageForSVG = new Image();
        imageForSVG.onload = () =>{
        SVGx.drawImage(imageForSVG,0,0);
        const svgA = document.createElement("a");
        svgA.href = canvasForSVG.toDataURL("image/png");
        svgA.download = `席替え-${dates.getMonth()+1}_${dates.getDate()}.png`;
        svgA.click();
        }
        imageForSVG.src = `data:image/svg+xml;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(SVGtext)))}`;
		preparePrint();
    })
}
const SVGmb = function() {
	if(screen.availWidth > 600){
		SVGscreen.style.width = `${(screen.availWidth)/2}px`;
	}else{
		SVGscreen.style.width = "300px";
	}
	const placeRect = [];
	for(let i = 0; i < 7; i++){
		for(let j = 0; j < 6; j++){
			placeName.push([startlineX + namePaddingX +( j * (deskWidth + desksMargin)),startlineY + namePaddingY +(i*(deskHeight + desksMargin))])
		}
	}
	for(let i = notAvailableDesks.length; i > 0; i--){
		placeName.splice(notAvailableDesks[i-1],1);
	}
	placeName.forEach(ele => {
		const [Xplace,Yplace] = ele;
		placeRect.push([Xplace - namePaddingX, Yplace - namePaddingY]);
	});
	let p = ""
	for (let i = 0; i < placeRect.length; i++) {
		p += `<rect x="${placeRect[i][0]}" y="${placeRect[i][1]}" width="150" height="70" />`;
	}
	deskCanvas.insertAdjacentHTML("beforeend", p);
	SVGcanvas.insertAdjacentHTML("beforeend",`<text x="150" y="20">${RoomName}</text><text x="50" y="20">${dates.getMonth()+1}/${dates.getDate()}~</text>`);
	if (StudentName.length === 0) {
		document.getElementById("inputUserNumber").className = "ruleSentence blockElement";
		userNumArea.focus();
		start_endButton.addEventListener("click", startRandomChangeByInput);
	} else if(StudentName.length > 0){
		ShouldInputNumber = false;
			for (let i = 0; i < howManyStudents; i++) {
				const nameOption = document.createElement("option");
                const userName = StudentName[i]
				nameOption.value = userName;
				nameOption.id = userName;
				nameOption.textContent = userName;
				selectNameArea.appendChild(nameOption);
			}
			document.getElementById("selectUserName").className =
				"ruleSentence blockElement";
			start_endButton.addEventListener("click", startRandomChangeBySelect);
	}
}
const startRandomChangeByInput = function(){
	let userNum = userNumArea.value;
if(!userNum){
	userNum = howManyStudents;
}
	start_endButton.removeEventListener("click",startRandomChangeByInput);
	startRandomChange(userNum);
}
const startRandomChange = function(userName){
	if(document.getElementById("optionButtons")){
		document.body.removeChild(document.getElementById("optionButtons"));
	}
	howManyStudents--;
if(howManyStudents > 1){
	randomWhereNum = 99;
	currentUserName = userName;
	userNameForOut = userName;
	Animeid = requestAnimationFrame(randomAnime);
	start_endButton.textContent = "停止";
	start_endButton.addEventListener("click",stopRandomChange);
}else{
	SVGcanvas.insertAdjacentHTML("beforeend",`<text x="${placeName[0][0]}" y="${placeName[0][1]}">${userName}</text>`);
		SVGscreen.removeChild(start_endButton);
		SVGscreen.removeChild(document.getElementById("selectUserName"));
}
}
const startRandomChangeBySelect = function(){
	const userName = selectNameArea.value;
	selectNameArea.removeChild(document.getElementById(userName));
	start_endButton.removeEventListener("click",startRandomChangeBySelect);
	startRandomChange(userName);
}
const randomAnime = function() {
	if(interval < 3){
		interval ++;
	}else{
		interval = 0;
	const userName = userNameForOut
	let preSelectNum = parseInt(Math.random() * placeName.length);
if(preSelectNum === randomWhereNum){
	searchDifferentNumber:
	for(;;){
preSelectNum = parseInt(Math.random() * placeName.length);
if(preSelectNum !== randomWhereNum){
break searchDifferentNumber;
}
}
}
		if (randomWhereNum !== 99) {
			randomWhereNum = preSelectNum;
			const [x1, y1] = placeName[randomWhereNum];
			const userNameText = SVGcanvas.lastChild;
userNameText.setAttribute("x",`${x1}`);
userNameText.setAttribute("y",`${y1}`);
		}else{
			randomWhereNum = preSelectNum;
			const [x1, y1] = placeName[randomWhereNum];
			SVGcanvas.insertAdjacentHTML("beforeend", `<text x="${x1}" y="${y1}">${userName}</text>`);
		}
	}
	Animeid = requestAnimationFrame(randomAnime);
}
const stopRandomChange = function() {
	cancelAnimationFrame(Animeid);
	if(ShouldInputNumber){
		placeName.splice(randomWhereNum, 1);
		start_endButton.removeEventListener("click", stopRandomChange);
		start_endButton.textContent = "開始";
		userNumArea.value = parseInt(currentUserName) + 1;
		start_endButton.addEventListener("click",startRandomChangeByInput);
	}else{
		if(howManyStudents === 1){
			
		}
			start_endButton.addEventListener("click", startRandomChangeBySelect);
		}
}
