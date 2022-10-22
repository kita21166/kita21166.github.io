"use strict";
const SVGscreen = document.getElementById("SVGScreen");
const start_endButton = document.getElementById("start_endSelectDesk");
const userNumArea = document.getElementById("UserNumber");
const selectNameArea = document.getElementById("selectName");
const SVGcanvas = document.getElementById("SVGcanvas");
const optionButtons = document.getElementById("optionButtons");
const ReStartButton = {
	button: document.getElementById("ReStartButton"), 
	makeAble(WhenReStart) {
		if (SVGcanvas.childElementCount > 2) {
			this.button.addEventListener("click", WhenReStart);
			this.button.dataset.isable = "true"
		}
	},
	makeUnAble(WhenReStart) {
		if (this.button.dataset.isable === "true") {
			this.button.removeEventListener("click", WhenReStart);
			this.button.dataset.isable = "false"
		}
	}
};
const dates = new Date();
const [deskWidth, deskHeight, desksMargin, startlineX, startlineY, namePaddingX, namePaddingY] =
	[150, 70, 10, 20, 61, 75, 35];
const placeName = [];
let interval = 0;
let randomWhereNum, Animeid, userNameForOut, currentUserName, willReStart;
document.getElementById('RoomSettingOption').onclick = () =>
	location.href = "RoomSetting.html";
document.getElementById('StudentNameOption').onclick = () =>
	location.href = "StudentName.html";
window.onload = function () {
	if (localStorage.length !== 0) {
		document.getElementById("alert").textContent = "保存された設定内容があります";
	}
	notAvailableDesks = localStorage.getItem("notAvailableDesks") ?
		JSON.parse(localStorage.getItem("notAvailableDesks")) : [];
	howManyStudents = defaultDeskNumber - notAvailableDesks.length;
	RoomName = localStorage.getItem("RoomName") ? localStorage.getItem("RoomName") : "";
	StudentName = localStorage.getItem("StudentName") ?
		JSON.parse(localStorage.getItem("StudentName")) : [];
	document.title = `席替え＜席替え(${howManyStudents}人)＞`;
	const placeRect = [];
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 6; j++) {
			placeName.push([startlineX + namePaddingX + (j * (deskWidth + desksMargin)),
			startlineY + namePaddingY + (i * (deskHeight + desksMargin))]);
		}
	}
	for (let i = notAvailableDesks.length; i > 0; i--) {
		placeName.splice(notAvailableDesks[i - 1], 1);
	}
	placeName.forEach(ele => {
		const [Xplace, Yplace] = ele;
		placeRect.push([Xplace - namePaddingX, Yplace - namePaddingY]);
	});
	let p = "";
	for (let i = 0; i < placeRect.length; i++) {
		p += `<rect x="${placeRect[i][0]}" y="${placeRect[i][1]}" width="150" height="70" />`;
	}
	document.getElementById("deskCanvas").insertAdjacentHTML("beforeend", p);
	SVGcanvas.insertAdjacentHTML("beforeend", `<text x="150" y="20">${RoomName}</text><text x="50" y="20">
									${dates.getMonth() + 1}/${dates.getDate()}~</text>`);
	if (StudentName.length === 0) {
		document.getElementById("inputUserNumber").className = "ruleSentence blockElement";
		userNumArea.focus();
		start_endButton.addEventListener("click", startRandomChangeByInput);
	} else if (StudentName.length > 0) {
		for (let i = 0; i < howManyStudents; i++) {
			const nameOption = document.createElement("option");
			const userName = StudentName[i];
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
const startRandomChangeByInput = function () {
	let userNum = userNumArea.value;
	if (!userNum) {
		userNum = 1;
	}
	userNumArea.disabled = true;
	start_endButton.removeEventListener("click", startRandomChangeByInput);
	start_endButton.addEventListener("click", stopRandomChangeByInput);
	finishRandomChange(userNum);
	startRandomChange(userNum);
}
const startRandomChangeBySelect = function () {
	const userName = selectNameArea.value;
	selectNameArea.disabled = true;
	selectNameArea.removeChild(document.getElementById(userName));
	start_endButton.removeEventListener("click", startRandomChangeBySelect);
	startRandomChange(userName);
	start_endButton.addEventListener("click", stopRandomChangeBySelet);
}
const startRandomChange = function (userName) {
	ReStartButton.makeUnAble(ReStartInWaiting);
	ReStartButton.makeAble(ReStartInChanging);
	howManyStudents--;
	if (howManyStudents > 0) {
		randomWhereNum = -1;
		currentUserName = userName;
		userNameForOut = userName;
		Animeid = requestAnimationFrame(randomAnime);
		start_endButton.textContent = "停止";
	}
}
const randomAnime = function () {
	if (interval < 5) {
		interval++;
	} else {
		interval = 0;
		const userName = userNameForOut
		let preSelectNum = parseInt(Math.random() * placeName.length);
		if (preSelectNum === randomWhereNum) {
			searchDifferentNumber:
			for (; ;) {
				preSelectNum = parseInt(Math.random() * placeName.length);
				if (preSelectNum !== randomWhereNum) {
					break searchDifferentNumber;
				}
			}
		}
		if (randomWhereNum !== -1) {
			randomWhereNum = preSelectNum;
			const [x1, y1] = placeName[randomWhereNum];
			const userNameText = SVGcanvas.lastChild;
			userNameText.setAttribute("x", `${x1}`);
			userNameText.setAttribute("y", `${y1}`);
		} else {
			randomWhereNum = preSelectNum;
			const [x1, y1] = placeName[randomWhereNum];
			SVGcanvas.insertAdjacentHTML("beforeend", `<text x="${x1}" y="${y1}">${userName}</text>`);
		}
	}
	Animeid = requestAnimationFrame(randomAnime);
}
const stopRandomChangeByInput = function () {
	ReStartButton.makeUnAble(ReStartInChanging);
	ReStartButton.makeAble(ReStartInWaiting);
	userNumArea.disabled = false;
	cancelAnimationFrame(Animeid);
	placeName.splice(randomWhereNum, 1);
	start_endButton.removeEventListener("click", stopRandomChangeByInput);
	start_endButton.textContent = "開始";
	userNumArea.value = parseInt(currentUserName) + 1;
	start_endButton.addEventListener("click", startRandomChangeByInput);
}
const stopRandomChangeBySelet = function () {
	ReStartButton.makeUnAble(ReStartInChanging);
	ReStartButton.makeAble(ReStartInWaiting);
	selectNameArea.disabled = false;
	cancelAnimationFrame(Animeid);
	placeName.splice(randomWhereNum, 1);
	start_endButton.removeEventListener("click", stopRandomChangeBySelet);
	start_endButton.textContent = "開始";
	start_endButton.addEventListener("click", startRandomChangeBySelect);
	finishRandomChange(selectNameArea.value);
}
const finishRandomChange = function (userName) {
	if (howManyStudents === 1 && willReStart !== true) {
		SVGcanvas.insertAdjacentHTML("beforeend", `<text x="${placeName[0][0]}" y="${placeName[0][1]}">${userName}</text>`);
		document.getElementById("wrap").removeChild(optionButtons);
		putButtonSVG();
	}
}
const putButtonSVG = function () {
	if (screen.availWidth <= 600) {
		SVGscreen.className = "smallsizewindow";
	}
	const DLbutton = document.createElement("button");
	DLbutton.type = "button";
	DLbutton.textContent = "PNGで保存";
	document.body.append(DLbutton);
	DLbutton.addEventListener("click", () => {
		const SVGtext = new XMLSerializer().serializeToString(document.getElementById("SVGsheet"));
		const canvasForSVG = document.createElement("canvas");
		canvasForSVG.width = 990;
		canvasForSVG.height = 700;
		const SVGx = canvasForSVG.getContext("2d");
		const imageForSVG = new Image();
		imageForSVG.onload = () => {
			SVGx.drawImage(imageForSVG, 0, 0);
			const svgA = document.createElement("a");
			svgA.href = canvasForSVG.toDataURL("image/png");
			svgA.download = `席替え-${dates.getMonth() + 1}_${dates.getDate()}.png`;
			svgA.click();
		}
		imageForSVG.src = `data:image/svg+xml;charset=utf-8;base64,
							${btoa(unescape(encodeURIComponent(SVGtext)))}`;
	});
}
const ReStartInWaiting = function () {
	const RemovedStudent = SVGcanvas.lastChild;
	const [x,y] = [RemovedStudent.getAttribute("x"),RemovedStudent.getAttribute("y")];
	placeName.push([parseInt(x),parseInt(y)]);
	const RemovedStudentName = RemovedStudent.textContent;
	const RemovedStudentNameOption = document.createElement("option");
	RemovedStudentNameOption.value = RemovedStudentName;
	RemovedStudentNameOption.id = RemovedStudentName;
	RemovedStudentNameOption.textContent = RemovedStudentName;
	selectNameArea.appendChild(RemovedStudentNameOption);
	SVGcanvas.removeChild(RemovedStudent);
	howManyStudents++;
	ReStartButton.makeUnAble(ReStartInWaiting);
	ReStartButton.makeAble(ReStartInWaiting);
}
const ReStartInChanging = function () {
	willReStart = true;
	start_endButton.click();
	ReStartInWaiting();
	willReStart = false;
}