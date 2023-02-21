const { KakaoLinkClient } = require("KakaoLink");
const kakao = new KakaoLinkClient(
  "ed6fdb7fc987bcf0f48ef46425f0ac0e",
  "https://loawa.com"
);
kakao.login("hjlee@bluedata.kr", "dlghwjd123!!!");

let 영업 = "OFF";

let 평일 = [18, 24];

let 주말 = [14, 24];

let 운영시간아님 =
  "😛죄송합니다,\n지금은 운영시간이 아닙니다.\n\n❤운영시간❤\n⏰ 평일 : " +
  평일[0] +
  ":00 ~ " +
  평일[1] +
  ":00\n⏰ 주말 : " +
  주말[0] +
  ":00 ~ " +
  주말[1] +
  ":00\n\n문의/캐릭터명/클래스/템레벨/문의내용\n예)문의/몰링츄/바드/1591/가입문의\n으로 문의남기고 기다려주시면,\n순차적으로 연락드리겠습니다.🤗";

const prefix = "농부쿤";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (room == "자몽해 가입문의방") {
        let date = new Date();
        let 요일 = dateFormat(date).split(" ")[0];
        let 시간 = dateFormat(date).split(" ")[1];
        
        let search = msg.split(" ");
        if (search[0] == prefix) {
            if (search[1] == "시작") {
              영업 = "ON";
              알림("상담 ON", room);
              return;
            }
        
            if (search[1] == "종료") {
              영업 = "OFF";
              알림("상담 OFF", room);
              return;
            }
        
            if (search[1] == "상태") {
              알림("상담 " + 영업, room);
              return;
            }
        
            if (search[1] == "대기") {
              let 대기목록 = "";
              for (let i = 0; i < 대기.length; i++) {
                if (i + 1 == 대기.length) {
                  대기목록 += i + 1 + " : " + 대기[i];
                } else {
                  대기목록 += i + 1 + " : " + 대기[i] + "\n";
                }
              }
        
              if (대기목록 == "") {
                알림("대기목록이 없습니다.💦", room);
              } else {
                알림(대기목록, room);
              }
              return;
            }
        
            if (search[1] == "삭제") {
              대기 = [];
              알림("🗑대기목록을 모두 비웠습니다.", room);
              return;
            }
        
            if (search[1] == "초대") {
              replier.reply(
                "🎧디스코드주소🎧\n\nhttps://discord.gg/wgaE3HppUg\n\n📱오픈톡주소📱\n\nhttps://open.kakao.com/o/gvLfruhe\n\n오픈톡 참여는 자율이지만 오시면 길드에더 빠르게 적응하실 수 있을거에요! \n하지만 디코도 활발하기때문에 안들어오셔도 전혀 문제없고 후에 들어오고 싶을때 오셔두 되나 과한 들락날락은 삼가해주세용 (비번 0505)\n\n디코는 필참입니다 들어오셔서 인게임 닉으로 변경해주시면 역할지급 해드릴게요! 공지사항과 자몽규칙 게시글 한번씩만 정독 부탁드리고 규칙을 숙지하지 않아 일어나는 모든 일은 책임지지않습니다!\n\n확인되셨으면 카톡문의방은 나가주시고\n\n자몽해 길드에 머무는 동안 즐겁고 좋은 추억 많이 만들어가세요!! 환영합니다:)"
              );
              return;
            }
        }

        if (영업 == "OFF") {
            if (요일 == "토" || 요일 == "일") {
              if (시간 < 주말[0] || 시간 > 주말[1]) {
                replier.reply(운영시간아님);
                return;
              }
            } else {
              if (시간 < 평일[0] || 시간 > 평일[1]) {
                replier.reply(운영시간아님);
                return;
              }
            }
          }
      }
}

function dateFormat(date) {
    let week_arr = ["일", "월", "화", "수", "목", "금", "토"];
  
    let hour = date.getHours();
    let week = date.getDay();
  
    hour = hour >= 10 ? hour : hour;
  
    if (hour == 0) {
      hour = 24;
    }
  
    return week_arr[week] + " " + hour;
  }

  function 알림(메세지, room) {
    let 알림 = [78709, 78710];
    let ran = Math.floor(Math.random() * 알림.length);
  
    let obj = {
      link_ver: "4.0",
      template_id: 알림[ran],
      template_args: {
        msg: 메세지,
      },
    };
    kakao.sendLink(room, obj, "custom");
  }