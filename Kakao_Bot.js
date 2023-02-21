const prefix = "농부쿤";
const 답변 = [
    "되겠냐?",
    "아마도...?",
    "그럼요!!",
    "아니요.",
    "네",
    "장난하냐?",
    "물론입니다 !!",
    "몰?루",
    "절대절대절대절대 아니요.",
    "그럼요 당연하죠!!",
    "물어보지마!!",
    "그만 물어봐",
    "Nope!!",
    "Yes!!",
];

let 메뉴 = [
    "닭볶음",
    "비빔밥",
    "김치찌개",
    "순두부찌개",
    "된장찌개",
    "부대찌개",
    "갈비탕",
    "짜장면",
    "짬뽕",
    "탕수육",
    "볶음밥",
    "초밥",
    "우동",
    "덮밥",
    "돈까스",
    "메밀소바",
    "라멘",
    "낫또",
    "스파게티",
    "피자",
    "치킨",
    "파스타",
    "햄버거",
    "쌀국수",
    "카레",
    "칼국수",
    "찜닭",
    "밥버거",
    "떡볶이",
    "김밥",
    "샐러드",
    "물냉면",
    "순대국",
    "설렁탕",
    "국밥",
    "제육볶음",
    "된장국",
    "부대찌개",
    "월남쌈",
    "삼겹살",
    "갈비",
    "보쌈",
    "곱창",
    "불고기",
    "마라탕",
    "순두부찌개",
    "만두국",
    "스테이크",
    "낙지볶음",
    "불닭발",
    "육개장",
    "뼈해장국",
    "닭갈비",
];

let 사용자 = [];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    let search = msg.split(" ");
    let 숫자 = /^\d*[.]\d{1}$/;

    let is_push = 등록확인(sender);
    let user_id = 아이디가져오기(sender);

    if (is_push) {
        사용자[user_id].score += 1;
        Log.d(사용자[user_id].score);
    } else {
        사용자.push({ sender: sender, score: 0 })
        user_id = 아이디가져오기(sender);
    }

    if (search[0] == prefix) {
        if (search[1] == "놀자") {
            try {
                replier.reply(
                    "💡 명령어\n\n" +
                    "💗농부쿤 정보 [캐릭터명]\n》 로아 캐릭 검색\n\n" +
                    "💗농부쿤 경매 [경매금액(숫자)]\n 》 경매 분배금 조회\n\n" +
                    "💗농부쿤 강화 [확률(1.0 ~ 100.0 소수점 1자리수)]\n 》 모의 강화\n\n" +
                    "💗농부쿤 뭐먹을까\n 》 메뉴 추천\n\n" +
                    "💗농부쿤 내점수\n 》 채팅 점수 확인\n\n" +
                    "💗농부쿤 랭킹\n 》 채팅 랭킹 확인"
                );
                return;
            } catch (error) {
                Log.d(error);
                replier.reply("📣 Error 발생.");
            }
        }
        if (search[1] == "내점수") {
            try {
                let id = 아이디가져오기(sender);

                let rank = 랭킹확인();
                let my_rank;

                for (let i = 0; i < rank.length; i++) {
                    if (rank[i].sender == 사용자[id].sender) {
                        my_rank = i + 1;
                    }
                }

                replier.reply(
                    "💙 '?1'의 점수는 ?2점, ?3등 입니다.".replace("?1", 사용자[id].sender).replace("?2", 사용자[id].score).replace("?3", my_rank)
                );
            } catch (error) {
                Log.d(error);
                replier.reply("📣 Error 발생.");
            }
            return;
        }

        if (search[1] == "랭킹") {
            try {
                let res = 랭킹확인();

                let msg = "💡 랭킹정보\n";
                for (let i = 0; i < res.length; i++) {
                    if (i == res.length - 1) {
                        msg += "🏆 ?1등 '?2' ?3 점".replace("?1", i + 1).replace("?2", res[i].sender).replace("?3", res[i].score);
                    } else {
                        msg += "🏆 ?1등 '?2' ?3 점\n".replace("?1", i + 1).replace("?2", res[i].sender).replace("?3", res[i].score);
                    }
                }

                replier.reply(msg);
            } catch (error) {
                Log.d(error);
                replier.reply("📣 Error 발생.");
            }
            return;
        }

        if (search[1] == "정보") {
            try {
                let msg;

                let name = search[2];
                let url = "https://lostark.game.onstove.com/Profile/Character/" + name;
                let result = Utils.parse(url);

                let server = result.select("div.wrapper-define").select("dl.define")[0].select("dd").text();
                let cls = result.select("div.wrapper-define").select("dl.define")[1].select("dd").text();
                let one = result.select("div.wrapper-define").select("dl.define")[2].select("dd").text();
                let ching = result.select("div.wrapper-define").select("dl.define")[3].select("dd").text();
                let item_lv = result.select("div.wrapper-define").select("dl.define")[4].select("dd").text();
                let guild = result.select("div.wrapper-define").select("dl.define")[6].select("dd").text();
                let farm = result.select("div.wrapper-define").select("dl.define")[8].select("dd").text();

                let ability_arr = result.select("div.profile-ability-engrave").select("li");

                let gakin = "";
                for (let i = 0; i < ability_arr.length; i++) {
                    let temp = ability_arr[i].select("span").text().split("Lv.");
                    if (ability_arr.length == i + 1) {
                        let str = temp[0].trim() + "(" + temp[1].trim() + ")";
                        gakin = gakin + str;
                    } else {
                        let str = temp[0].trim() + "(" + temp[1].trim() + ")";
                        gakin = gakin + str + "/";
                    }
                }

                let basic_arr = result.select("div.profile-ability-basic").select("li");

                let atk;
                let hp;
                let cr;
                let th;
                let ss;
                for (let i = 0; i < basic_arr.length; i++) {
                    try {
                        basic_arr[i].select("span");
                        if (basic_arr[i].select("span")[0].text() == "공격력") {
                            atk = basic_arr[i].select("span")[1].text();
                        } else if (basic_arr[i].select("span")[0].text() == "최대 생명력") {
                            hp = basic_arr[i].select("span")[1].text();
                        } else if (basic_arr[i].select("span")[0].text() == "치명") {
                            cr = basic_arr[i].select("span")[1].text();
                        } else if (basic_arr[i].select("span")[0].text() == "특화") {
                            th = basic_arr[i].select("span")[1].text();
                        } else if (basic_arr[i].select("span")[0].text() == "신속") {
                            ss = basic_arr[i].select("span")[1].text();
                        }
                    } catch (error) { }
                }

                msg =
                    " 💗 ?1 / ?2 / ?3 \n".replace("?1", name).replace("?2", cls).replace("?3", server) +
                    "\n" +
                    "💡 기본정보\n" +
                    "템 레 벨 :   ?1\n".replace("?1", item_lv) +
                    "칭     호 :   ?1\n".replace("?1", ching) +
                    "영     지 :   ?1\n".replace("?1", farm) +
                    "원 정 대 :   ?1\n".replace("?1", one) +
                    "길     드 :   ?1\n".replace("?1", guild) +
                    "치/특/신 :   ?1 / ?2 / ?3\n".replace("?1", cr).replace("?2", th).replace("?3", ss) +
                    " A  T  K  :   ?1\n".replace("?1", atk) +
                    "H       P :   ?1\n".replace("?1", hp) +
                    "▪▪▪▪▪▪▪▪▪▪\n" +
                    "💡 각인정보\n" +
                    gakin;

                replier.reply(msg);
                msg = "";

                let card_list = result.select("ul.card-list").select("li");
                let card_effect_list = result.select("ul.card-effect").select("li");
                let card_effect = "";

                for (let i = 0; i < card_effect_list.length; i++) {
                    if (i == card_effect_list.length - 1) {
                        card_effect = card_effect_list[i].select("div")[0].text();
                    }
                }

                let cart_name_arr = [];
                let card_star_arr = [];

                for (let i = 0; i < card_list.length; i++) {
                    cart_name_arr.push(card_list[i].select("div").text());

                    let star = card_list[i].select("div").attr("data-awake");
                    let temp = "";
                    for (let y = 1; y < 6; y++) {
                        if (y <= star) {
                            temp = temp + "★";
                        } else {
                            temp = temp + "☆";
                        }
                    }
                    card_star_arr.push(temp);
                }

                msg +=
                    "💡 카드정보\n" +
                    "?1(?2)\n".replace("?1", cart_name_arr[0]).replace("?2", card_star_arr[0]) +
                    "?1(?2)\n".replace("?1", cart_name_arr[1]).replace("?2", card_star_arr[1]) +
                    "?1(?2)\n".replace("?1", cart_name_arr[2]).replace("?2", card_star_arr[2]) +
                    "?1(?2)\n".replace("?1", cart_name_arr[3]).replace("?2", card_star_arr[3]) +
                    "?1(?2)\n".replace("?1", cart_name_arr[4]).replace("?2", card_star_arr[4]) +
                    "?1(?2)\n".replace("?1", cart_name_arr[5]).replace("?2", card_star_arr[5]) +
                    "\n" +
                    card_effect + "\n" +
                    "▪▪▪▪▪▪▪▪▪▪\n";

                let jewel = result.select("div.profile-jewel").select("ul").select("li");

                let jewel_txt = [];

                for (let i = 0; i < jewel.length; i++) {
                    let test = jewel[i].select("div.jewel_effect").select("p.skill_detail").text().split(" ");
                    let temp = test[test.length - 1];

                    if (temp == "증가") {
                        jewel_txt.push(jewel[i].select("div.jewel").select("span.jewel_level").text() + " 멸화");
                    } else if (temp == "감소") {
                        jewel_txt.push(jewel[i].select("div.jewel").select("span.jewel_level").text() + " 홍염");
                    }

                }

                msg +=
                    "💡 보석정보\n";

                for (let i = 0; i < jewel_txt.length; i++) {
                    if (i == jewel_txt.length - 1) {
                        msg += jewel_txt[i] + "\n";
                    } else {
                        msg += jewel_txt[i] + "/";
                    }
                }

                msg += "▪▪▪▪▪▪▪▪▪▪\n";

                let key = result.select("div.profile-equipment__slot").select("div.profile-item")[0].attr("data-item").split("_")[0];

                let temp = String(result.select("script")[2]).split("$.Profile =")[1].replace("</script>", "").replace(";", "");

                let test = JSON.parse(temp);

                let eq0 = {
                    name: test.Equip[key + "_000"].Element_000.value.replace(/<[^>]*>?/g, ""),
                    img: "https://cdn-lostark.game.onstove.com/" + test.Equip[key + "_000"].Element_001.value.slotData.iconPath,
                    quality: test.Equip[key + "_000"].Element_001.value.qualityValue,
                };
                let eq1 = {
                    name: test.Equip[key + "_001"].Element_000.value.replace(/<[^>]*>?/g, ""),
                    img: "https://cdn-lostark.game.onstove.com/" + test.Equip[key + "_001"].Element_001.value.slotData.iconPath,
                    quality: test.Equip[key + "_001"].Element_001.value.qualityValue,
                };
                let eq2 = {
                    name: test.Equip[key + "_002"].Element_000.value.replace(/<[^>]*>?/g, ""),
                    img: "https://cdn-lostark.game.onstove.com/" + test.Equip[key + "_002"].Element_001.value.slotData.iconPath,
                    quality: test.Equip[key + "_002"].Element_001.value.qualityValue,
                };
                let eq3 = {
                    name: test.Equip[key + "_003"].Element_000.value.replace(/<[^>]*>?/g, ""),
                    img: "https://cdn-lostark.game.onstove.com/" + test.Equip[key + "_003"].Element_001.value.slotData.iconPath,
                    quality: test.Equip[key + "_003"].Element_001.value.qualityValue,
                };
                let eq4 = {
                    name: test.Equip[key + "_004"].Element_000.value.replace(/<[^>]*>?/g, ""),
                    img: "https://cdn-lostark.game.onstove.com/" + test.Equip[key + "_004"].Element_001.value.slotData.iconPath,
                    quality: test.Equip[key + "_004"].Element_001.value.qualityValue,
                };
                let eq5 = {
                    name: test.Equip[key + "_005"].Element_000.value.replace(/<[^>]*>?/g, ""),
                    img: "https://cdn-lostark.game.onstove.com/" + test.Equip[key + "_005"].Element_001.value.slotData.iconPath,
                    quality: test.Equip[key + "_005"].Element_001.value.qualityValue,
                };

                msg +=
                    "💡 장비정보\n" +
                    "무기 : ?1(?2)\n".replace("?1", eq0.name).replace("?2", eq0.quality) +
                    "머리 : ?1(?2)\n".replace("?1", eq1.name).replace("?2", eq1.quality) +
                    "상의 : ?1(?2)\n".replace("?1", eq2.name).replace("?2", eq2.quality) +
                    "하의 : ?1(?2)\n".replace("?1", eq3.name).replace("?2", eq3.quality) +
                    "장갑 : ?1(?2)\n".replace("?1", eq4.name).replace("?2", eq4.quality) +
                    "견갑 : ?1(?2)\n".replace("?1", eq5.name).replace("?2", eq5.quality);

                replier.reply(msg);

                return;
            } catch (error) {
                Log.d(error);
                replier.reply("📣 없는 캐릭터명 입니다.");
                return;
            }
        }

        if (search[1] == "강화") {
            try {
                let per = search[2];

                if (!숫자.test(per)) {
                    replier.reply("📣 농부쿤 강화 [확률(1.0 ~ 100.0 소수점 1자리수)]으로 입력해주세요.");
                    return;
                }

                let su;
                let arr = [];
                let count = 0;

                if (per <= 100) {
                    while (true) {
                        count++;
                        if (per == 100 || per == 100.0) {
                            success = 1;
                            break;
                        } else {
                            if (per.includes(".")) {
                                su = (Math.random() * 100).toFixed(1);

                                for (let x = 0; x < per * 10; x++) {
                                    if (arr.length == 0) {
                                        arr.push((Math.random() * 100).toFixed(1));
                                    } else {
                                        while (true) {
                                            let num = (Math.random() * 100).toFixed(1);
                                            if (!arr.includes(num)) {
                                                arr.push(num);
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else {
                                su = Math.floor(Math.random() * (100 - 1)) + 1;

                                for (let x = 0; x < per; x++) {
                                    if (arr.length == 0) {
                                        let num = Math.floor(Math.random() * (100 - 1)) + 1;
                                        arr.push(num);
                                    } else {
                                        while (true) {
                                            let num = Math.floor(Math.random() * (100 - 1)) + 1;
                                            if (!arr.includes(num)) {
                                                arr.push(num);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (arr.includes(su)) {
                            success = 1;
                            break;
                        }
                        arr = [];
                    }
                }

                replier.reply(
                    "⚒ 강화완료! ⚒\n" +
                    "▪▪▪▪▪▪▪▪▪▪\n" +
                    "💚 확률 : ?1%\n".replace("?1", per) +
                    "🧡 횟수 : ?1\n".replace("?1", count) +
                    "▪▪▪▪▪▪▪▪▪▪"
                );

            } catch (error) {
                Log.d(error);
                replier.reply("📣 Error 발생.");
            }

            return;
        }

        if (search[1] == "뭐먹을까?" || search[1] == "뭐먹을까") {
            try {
                let ran = Math.floor(Math.random() * 메뉴.length);

                replier.reply(
                    "👩‍🍳 오늘의 메뉴! 👨‍🍳\n" +
                    "▪▪▪▪▪▪▪▪▪▪\n\n" +
                    " 🔴 ?1 🔴 \n\n".replace("?1", 메뉴[ran]) +
                    "▪▪▪▪▪▪▪▪▪▪"
                );

            } catch (error) {
                Log.d(error);
                replier.reply("📣 Error 발생.");
            }
            return;
        }

        if (search[1] == "경매") {
            try {
                let num = search[2];

                let su1_4 = num * 0.95 * 0.75;
                let su2_4 = (num * 0.95 * 0.75) / 1.1;

                let su1_8 = num * 0.95 * 0.875;
                let su2_8 = (num * 0.95 * 0.875) / 1.1;

                replier.reply(
                    " 💲 경매 💲\n" +
                    "▪▪▪▪▪▪▪▪▪▪\n" +
                    "4인 균등 : ?1 G\n".replace("?1", Math.floor(su1_4)) +
                    "4인 선점 : ?1 G\n".replace("?1", Math.floor(su2_4)) +
                    "▪▪▪▪▪▪▪▪▪▪\n" +
                    "8인 균등 : ?1 G\n".replace("?1", Math.floor(su1_8)) +
                    "8인 선등 : ?1 G\n".replace("?1", Math.floor(su2_8)) +
                    "▪▪▪▪▪▪▪▪▪▪"
                )
            } catch (error) {
                replier.reply("📣 숫자만 입력해주세요.");
            }
            return;
        }

        if (search[0] == "농부쿤") {
            try {
                let ran = Math.floor(Math.random() * 답변.length);
                replier.reply(답변[ran]);
            } catch (error) {
                Log.d(error);
                replier.reply("📣 Error 발생.");
            }
            return;
        }
    }
}

function 아이디가져오기(sender) {
    let user_id = null;

    for (let i = 0; i < 사용자.length; i++) {
        if (사용자[i].sender == sender) {
            user_id = i;
        }
    }
    return user_id;
}

function 등록확인(sender) {
    let res = null;

    for (let i = 0; i < 사용자.length; i++) {
        if (사용자[i].sender == sender) {
            res = true;
        }
    }
    return res;
}

function 랭킹확인() {
    let res = [];

    res = 사용자.sort(function (a, b) {
        return b.score - a.score;
    });
    return res;
}