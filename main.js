"use strict";
const RemovedDesks = [],userNames = [],placeName = [],userNums = []
const completeButton = document.getElementById("CompleteRoomSetting"); 
const defaultDeskNumber = 42;
let howMany, howManyRest,randomWhereNum, Animeid, WhereAre;
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
                SVGmb();
            } else {
                localStorage.clear();
                setRoomSetting();
            }
        }
    });
