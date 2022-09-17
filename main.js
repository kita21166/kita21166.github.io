"use strict";
const RemovedDesks = [],userNames = [],placeName = [],userNums = [],studentTags = {};
const completeButton = document.getElementById("CompleteRoomSetting"); 
let afterChoose = false;
let howMany, howManyRest,randomWhereNum, Animeid, WhereAre;
const progress = {
    roomSetting: document.getElementById("progress_roomSetting"),
    roomNameSetting: document.getElementById("progress_roomNameSetting"),
    starts: document.getElementById("progress_start"),
    setTrue(which){
    this.roomSetting.dataset.progress = "false";
    this.roomNameSetting.dataset.progress = "false";
    this.starts.dataset.progress = "false";
    which.dataset.progress = "true";
    }
    }
    window.addEventListener("load", function() {
        if (localStorage.getItem("removedDesks") === null) {
            setRoomSetting();
        } else {
            if (window.confirm("以前使用したデータが保存されています。利用しますか？")) {
                JSON.parse(localStorage.getItem("removedDesks"))
                    .forEach(ele => {
                        RemovedDesks.push(ele);
                    })
                howMany = JSON.parse(localStorage.getItem("howMany"));
                WhereAre = JSON.parse(localStorage.getItem("WhereAre"));
                document.body.removeChild(document.getElementById("RoomSettingWrap"));
                document.body.removeChild(completeButton);
                document.body.removeChild(document.getElementById("RoomNameSettingWrap"));
                SVGmb();
            } else {
                localStorage.clear();
                setRoomSetting();
            }
        }
    });