const { KakaoLinkClient } = require("KakaoLink");
const kakao = new KakaoLinkClient("d7034bc4d1255eddebae4399d0e95d67", "https://loawa.com");
kakao.login("ID", "PW");

Utils.getWeather = function (pos) {
  try {
    var data = org.jsoup.Jsoup.connect("https://m.search.daum.net/search?q=날씨%20" + pos.replace(" ", "%20")).get();
    data = data.select("div#weatherPanels").select("div.wrap_pannel").get(0);

    var status = data.select("p.desc_main").text().split(", 어제")[0];

    var temp = data.select("em.txt_temp").first().ownText();

    var data2 = data.select("ul.list_detail").select("li");
    var dust = data2.get(1).select("span.txt_state").text() + " (" + data2.get(1).select("span.txt_num").first().ownText() + "μg/m³)";
    var dust2 = data2.get(0).select("span.txt_state").text() + " (" + data2.get(0).select("span.txt_num").first().ownText() + "μg/m³)";

    data2 = data.select("div.area_rain").select("li");
    var rain = "정보 없음";
    for (var n = 0; n < data2.size(); n++) {
      if (data2.get(n).attr("class").includes(" on")) {
        rain = data2.get(n).select("span.txt_emph").text();
        break;
      }
    }

    data2 = data.select("div.area_wind").select("li");
    var windSpeed = "정보 없음";
    var windDir = "정보 없음";
    for (var n = 0; n < data2.size(); n++) {
      if (data2.get(n).attr("class") == "on") {
        windDir = data2.get(n).select("span.ico_wind").text();
        windSpeed = data2.get(n).select("span.txt_num").first().ownText();
        break;
      }
    }

    data2 = data.select("div.area_damp").select("li");
    var hum = "정보 없음";
    for (var n = 0; n < data2.size(); n++) {
      if (data2.get(n).attr("class") == "on") {
        hum = data2.get(n).select("span.txt_num").text();
        break;
      }
    }

    let obj = {
      link_ver: "4.0",
      template_id: 80870,
      template_args: {
        title: "🌈" + pos + " 날씨 정보",
        w1: status,
        w2: temp,
        w3: hum,
        w4: windDir + ", " + windSpeed + "m/s",
        w5: rain,
        w6: dust,
        w7: dust2,
      },
    };

    return obj;
  } catch (e) {
    return null;
  }
};

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

let 메뉴사진 = [
  "https://recipe1.ezmember.co.kr/cache/recipe/2017/09/12/8a64e811117ac8b1481ee52bd443b85c1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dolsot-bibimbap.jpg/220px-Dolsot-bibimbap.jpg",
  "https://cdn.shopify.com/s/files/1/0585/8495/7094/products/main_820b4384-e7f3-41e0-996a-27f192a9f69a.jpg?v=1653695416",
  "https://static.wtable.co.kr/image-resize/production/service/recipe/1074/4x3/d3c0b5c1-2671-483e-9bbf-76496bb443fd.jpg",
  "https://recipe1.ezmember.co.kr/cache/recipe/2018/08/14/ca8647124a4536b5dad3007a58181b7c1.jpg",
  "https://static.wtable.co.kr/image/production/service/product/9425/e4bea539-74ee-4437-9928-bd015f04ed3f.jpg?size=1024x1024",
  "https://tohomeimage.thehyundai.com/PD/PDImages/S/2/5/6/8806079814652_00.jpg?RS=720x864",
  "https://w.namu.la/s/d4c53737b61fec8cf0fa02206d85a5022fc5465593f2e0190648f7c5911acd836a5f7a1db0f19f0136ec1c178d782465a9455b31d178b79df5133fc6b493a41f6ffb5ff803eb4c65732790e5509cfd1481387fe12ca1e5d7b8b3fac60d3f47d0",
  "https://pds.joongang.co.kr//news/component/htmlphoto_mmdata/201802/24/46f9e8cd-ff32-440d-883e-e6d79ba15b3d.jpg",
  "https://w.namu.la/s/1bfbdabde6f79ac2f05843636edaa87a8e03419bf86205eabe0e33e76c16b1a02be6d9458d5fe7ab418ce21dc1eb3a831f20c8ba793514b71773858a625cdb63e78b5b7060762c60df4c04f43c8d95c049b0f9eb4204e18b0eb781a1b41fdcc3efdcd6b8a0cb14e32ae749f3ae5ebf67",
  "https://w.namu.la/s/765b0b376a9aee86d9f1966b0662494a6c8f4944ba97d3adb746a1574aea1e7cb48db326d42330f0288b3ef732de42dc8fb0eafe0055ed6e907252dc34ae7333cf6b7bf69f31adc6100e79f6812f121fbbd6fd4bfa2b79095b29fae944524de5",
  "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20201002142956&q=80&rw=750&rh=536",
  "https://udon0410.com/wp-content/themes/udon0410/assets/images/main_section02_01.png",
  "http://d20aeo683mqd6t.cloudfront.net/articles/title_images/000/026/084/medium/donburi_bowls_thumbnail_s278070458.jpeg?2021",
  "https://blog.kakaocdn.net/dn/byPebh/btq789JiHNV/CnTGjZg2k7tbFgEWEo5iI0/img.jpg",
  "http://th3.tmon.kr/thumbs/image/bb8/6ba/c98/42c4cfa92_700x700_95_FIT.jpg",
  "https://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/040/677/original/pixta_53717564_M.jpg?2020&d=750x400",
  "https://t1.daumcdn.net/cfile/tistory/235BF73D57525D4601",
  "https://cloudfront.haemukja.com/vh.php?url=https://d1hk7gw6lgygff.cloudfront.net/uploads/direction/image_file/57386/org_resized_______1.jpg&convert=jpgmin&rt=600",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/800px-Supreme_pizza.jpg",
  "https://sites.google.com/site/chikinsalang/_/rsrc/1401893008092/menyu/yangnyeomchikin/B3%D7%B3D7%C4%A1%C5%B2%28BEE7B3E4%C4%A1%C5%B2%29.jpg?height=266&width=400",
  "https://recipe1.ezmember.co.kr/cache/recipe/2019/04/01/f8b3042c80a214dd7cc60fa2027cdc9d1.jpg",
  "http://www.ntoday.co.kr/news/photo/202110/80781_55273_3022.jpg",
  "https://recipe1.ezmember.co.kr/cache/recipe/2020/09/06/ee00d6e59def943bc0eb0354fb58a00d1.jpg",
  "https://static.wtable.co.kr/image-resize/production/service/recipe/260/4x3/8e1380e6-d21e-46c7-8b56-b26e6c836bb1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b8/Korean.noodle-Kalguksu-01.jpg",
  "https://recipe1.ezmember.co.kr/cache/recipe/2016/12/05/cc1cb7798af9717f70a4772e5b53f0091.jpg",
  "https://file2.nocutnews.co.kr/newsroom/image/2014/02/18/20140218192129354091.jpg",
  "http://img4.tmon.kr/cdn3/deals/2021/07/15/4500036162/original_4500036162_front_f8dfd_1626343427production.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Gimbap_%28pixabay%29.jpg",
  "https://health.chosun.com/site/data/img_dir/2021/05/06/2021050601029_0.jpg",
  "http://yoochunmall.com/shopimages/yoochun/0030000000312.jpg?1586830906",
  "https://sjnfzdfjrjgl1655541.cdn.ntruss.com/goods/3/2020/11/525_tmp_2f70925cfbebf14d13be886e746dd6ff4457view.jpg",
  "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/3QTb/image/doy7JOx4eaH8sU-_a6WBn7Q3klE.jpg",
  "https://www.knun.net/data/photos/20180937/art_15368467708612_1c4fa1.png",
  "https://recipe1.ezmember.co.kr/cache/recipe/2019/10/10/04fb8b97fee9072002a0aa54c266a22e1.jpg",
  "https://mblogthumb-phinf.pstatic.net/20160728_110/angtal11_1469678845951ucEXr_JPEG/IMG_7613.JPG?type=w2",
  "https://agenery14.com/data/item/1611067564/thumb-6rmA7LCM_1000x1000.jpg",
  "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/edit/202005/28/102020052810014534459085730018_841.jpg&w=830&t=5088adf635ca30ff21a0ab880d05e8198da5c93e",
  "https://i.ytimg.com/vi/J1A44GtudLw/maxresdefault.jpg",
  "https://cdn.mindgil.com/news/photo/202103/70839_7148_1250.jpg",
  "http://image.auction.co.kr/itemimage/1e/aa/77/1eaa77c316.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFxhGuUc8av0XVVcqTAUf_MRzISTBDeMV0qu8FtWs5vh9n07_Hom0GbeRkZV-hdMiihGk&usqp=CAU",
  "https://health.chosun.com/site/data/img_dir/2021/01/14/2021011402383_0.jpg",
  "https://recipe1.ezmember.co.kr/cache/recipe/2015/04/18/c2aac4feb7c5fe07b8d118311cc8141a1.jpg",
  "https://img-cf.kurly.com/shop/data/goodsview/20220310/gv20000287761_1.jpg",
  "https://static.wtable.co.kr/image-resize/production/service/recipe/1074/4x3/d3c0b5c1-2671-483e-9bbf-76496bb443fd.jpg",
  "https://mblogthumb-phinf.pstatic.net/MjAxNjEyMDRfMjM3/MDAxNDgwODI1MzY0MDY5.grCErf_M8ICnnmYbmDma0sCxqcyuV9IkxHeF10qcsb8g.XzhSriYLNb1YoMGOFiIEhTItqQOnF2RTEw2b1xOersog.JPEG.njhanjo/20161203_103116.jpg?type=w800",
  "https://sjnfzdfjrjgl1655541.cdn.ntruss.com/goods/3/2021/07/857_tmp_25da9db63027695da220c165d9b9b7692878view.jpg",
  "https://i.ytimg.com/vi/BAFHWkOnuuE/maxresdefault.jpg",
  "http://image.auction.co.kr/itemimage/18/49/ce/1849ce0436.jpg",
  "http://www.foodyap.co.kr/shopimages/goldplate1/040001000001.jpg?1560837597",
  "http://www.goobnemall.com/static-root/prdct/2021/07/16/49b74f49a9334d06ab795ae4f3a18c96.jpg",
  "https://sjnfzdfjrjgl1655541.cdn.ntruss.com/goods/3/2020/08/481_tmp_bee21a85961b81ffaac02baefef175012918view.jpg",
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
  "김치찌개",
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
let 운세목록 = [
  78535, 78539, 78540, 78541, 78543, 78545, 78547, 78546, 78548, 78549, 78550, 78551, 78552, 78554, 78555, 78556, 78557, 78558, 78559, 78560, 78561, 78562, 78563, 78565, 78566, 78578, 78579, 78580,
  78581, 78582,
];
let 오늘날짜 = "";
let 오늘날짜2 = "";
let 사용자 = [];
let 사용자2 = [];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  let search = msg.split(" ");
  let 숫자 = /^\d*[.]\d{1}$/;

  if (room == "DEBUG ROOM") {
    return;
  }

  if (room == "이호정") {
    return;
  }
  let date = new Date();

  let 요일 = dateFormat(date).split(" ")[0];

  if (search[0] == prefix) {
    if (search[1] == "정보") {
      try {
        let name = search[2];
        let char_url = "http://freeface22.cafe24.com/Controller?name=" + name;
        let char_result = Utils.parse(char_url);

        let char_img = char_result.select("div.main").text();

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
          } catch (error) {}
        }

        let img_char = result.select("meta")[8].attr("content");

        let obj = {
          link_ver: "4.0",
          template_id: 78648,
          template_args: {
            img_char: img_char,
            name: name,
            server: server,
            cls: cls,
            one: one,
            ching: ching,
            item_lv: item_lv,
            guild: guild,
            farm: farm,
            gakin: gakin,
            atk: atk,
            hp: hp,
            cr: cr,
            th: th,
            ss: ss,
            img: char_img,
          },
        };

        kakao.sendLink(room, obj, "custom");

        let card_list = result.select("ul.card-list").select("li");
        let card_effect_list = result.select("ul.card-effect").select("li");
        let card_effect = "";

        for (let i = 0; i < card_effect_list.length; i++) {
          if (i == card_effect_list.length - 1) {
            card_effect = card_effect_list[i].select("div")[0].text();
          }
        }

        let cart_name_arr = [];
        let cart_img_arr = [];
        let card_star_arr = [];

        for (let i = 0; i < card_list.length; i++) {
          cart_name_arr.push(card_list[i].select("div").text());
          cart_img_arr.push(card_list[i].select("img").attr("src"));

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

        obj = {
          link_ver: "4.0",
          template_id: 78725,
          template_args: {
            set: card_effect,
            img1: cart_name_arr[0],
            img2: cart_name_arr[1],
            img3: cart_name_arr[2],
            img4: cart_name_arr[3],
            img5: cart_name_arr[4],
            img6: cart_name_arr[5],
            img1_img: cart_img_arr[0],
            img2_img: cart_img_arr[1],
            img3_img: cart_img_arr[2],
            img1_con: card_star_arr[0],
            img2_con: card_star_arr[1],
            img3_con: card_star_arr[2],
            img4_con: card_star_arr[3],
            img5_con: card_star_arr[4],
            img6_con: card_star_arr[5],
          },
        };

        kakao.sendLink(room, obj, "custom");

        let jewel = result.select("div.profile-jewel").select("ul").select("li");

        let jewel_img = [];
        let jewel_txt = [];

        for (let i = 0; i < jewel.length; i++) {
          let test = jewel[i].select("div.jewel_effect").select("p.skill_detail").text().split(" ");
          let temp = test[test.length - 1];

          if (temp == "증가") {
            jewel_txt.push(jewel[i].select("div.jewel").select("span.jewel_level").text() + " 멸화");
          } else if (temp == "감소") {
            jewel_txt.push(jewel[i].select("div.jewel").select("span.jewel_level").text() + " 홍염");
          }

          jewel_img.push(jewel[i].select("div.jewel").select("span.jewel_img").select("img").attr("src"));
        }

        obj = {
          link_ver: "4.0",
          template_id: 78731,
          template_args: {
            jw1: jewel_txt[0],
            jw2: jewel_txt[1],
            jw3: jewel_txt[2],
            jw4: jewel_txt[3],
            jw5: jewel_txt[4],
            jw6: jewel_txt[5],
            jw7: jewel_txt[6],
            jw8: jewel_txt[7],
            jw9: jewel_txt[8],
            jw10: jewel_txt[9],
            jw11: jewel_txt[10],
            jw1_img: jewel_img[0],
            jw2_img: jewel_img[1],
            jw3_img: jewel_img[2],
            jw4_img: jewel_img[3],
            jw5_img: jewel_img[4],
            jw6_img: jewel_img[5],
            jw7_img: jewel_img[6],
            jw8_img: jewel_img[7],
            jw9_img: jewel_img[8],
            jw10_img: jewel_img[9],
            jw11_img: jewel_img[10],
          },
        };

        kakao.sendLink(room, obj, "custom");

        let key = result.select("div.profile-equipment__slot").select("div.profile-item")[0].attr("data-item").split("_")[0];

        let temp = String(result.select("script")[2]).split("$.Profile =")[1].replace("</script>", "").replace(";", "");

        var test = JSON.parse(temp);

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

        obj = {
          link_ver: "4.0",
          template_id: 78736,
          template_args: {
            eq0: eq0.name,
            eq1: eq1.name,
            eq2: eq2.name,
            eq3: eq3.name,
            eq4: eq4.name,
            eq5: eq5.name,
            eq0_img: eq0.img,
            eq1_img: eq1.img,
            eq2_img: eq2.img,
            eq3_img: eq3.img,
            eq4_img: eq4.img,
            eq5_img: eq5.img,
            eq0_q: eq0.quality,
            eq1_q: eq1.quality,
            eq2_q: eq2.quality,
            eq3_q: eq3.quality,
            eq4_q: eq4.quality,
            eq5_q: eq5.quality,
          },
        };

        kakao.sendLink(room, obj, "custom");

        return;
      } catch (error) {
        Log.d(error);
        알림("없는 캐릭터명 입니다.", room);
        return;
      }
    }

    if (search[1] == "커마") {
      let name = search[2];

      if (search.length < 3) {
        알림("농부쿤 커마 [캐릭터명]\n으로 입력해주세요.", room);
        return;
      }

      let url = "http://freeface22.cafe24.com/Controller?name=" + name;
      let result = Utils.parse(url);

      let char_img = result.select("div.main").text();

      let sum_img = result.select("div.sum").text();

      let img_url = "profile" + char_img.split("profile")[1];

      if (char_img == "") {
        알림("없는 캐릭터명 입니다.", room);
        return;
      }

      obj = {
        link_ver: "4.0",
        template_id: 79238,
        template_args: {
          sum: sum_img,
          main: char_img,
          name: name,
          url: img_url,
        },
      };

      kakao.sendLink(room, obj, "custom");

      return;
    }

    if (search[1] == "강화") {
      let per = search[2];

      if (!숫자.test(per)) {
        알림("농부쿤 강화 [확률(1.0 ~ 100.0 소수점 1자리수)]\n으로 입력해주세요.", room);
        return;
      }

      var su;
      var arr = [];
      let success = 0;
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

              for (var x = 0; x < per * 10; x++) {
                if (arr.length == 0) {
                  arr.push((Math.random() * 100).toFixed(1));
                } else {
                  while (true) {
                    var num = (Math.random() * 100).toFixed(1);
                    if (!arr.includes(num)) {
                      arr.push(num);
                      break;
                    }
                  }
                }
              }
            } else {
              su = Math.floor(Math.random() * (100 - 1)) + 1;

              for (var x = 0; x < per; x++) {
                if (arr.length == 0) {
                  var num = Math.floor(Math.random() * (100 - 1)) + 1;
                  arr.push(num);
                } else {
                  while (true) {
                    var num = Math.floor(Math.random() * (100 - 1)) + 1;
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
      let obj = {
        link_ver: "4.0",
        template_id: 80475,
        template_args: {
          img: "https://upload3.inven.co.kr/upload/2021/05/25/bbs/i016465136329.gif",
          cnt: count,
          per: per,
        },
      };

      kakao.sendLink(room, obj, "custom");
      return;
    }

    if (search[1] == "건의") {
      let list = [78709, 78710];
      let ran = Math.floor(Math.random() * list.length);

      let temp = sender + " : ";
      for (let i = 2; i < search.length; i++) {
        if (i + 1 == search.length) {
          temp += search[i];
        } else {
          temp += search[i] + " ";
        }
      }

      let obj = {
        link_ver: "4.0",
        template_id: list[ran],
        template_args: {
          msg: temp,
        },
      };
      kakao.sendLink("이호정", obj, "custom");
      알림("👌건의사항이 접수되었습니다.\n😌감사합니다.😌", room);
      return;
    }

    if (search[1] == "뭐먹을까?" || search[1] == "뭐먹을까") {
      let ran = Math.floor(Math.random() * 메뉴.length);

      let obj = {
        link_ver: "4.0",
        template_id: 78872,
        template_args: {
          menu: 메뉴[ran],
          img: 메뉴사진[ran],
        },
      };
      kakao.sendLink(room, obj, "custom");
      return;
    }

    if (search[1] == "날씨") {
      var result = Utils.getWeather(search[2]);

      if (result == null) {
        알림("날씨 정보 불러오기 실패", room);
      } else {
        kakao.sendLink(room, result, "custom");
      }
      return;
    }

    if (search[1] == "경매") {
      try {
        let num = search[2];

        var su1_4 = num * 0.95 * 0.75;
        var su2_4 = (num * 0.95 * 0.75) / 1.1;

        var su1_8 = num * 0.95 * 0.875;
        var su2_8 = (num * 0.95 * 0.875) / 1.1;

        let obj = {
          link_ver: "4.0",
          template_id: 78738,
          template_args: {
            txt1: Math.floor(su1_4),
            txt2: Math.floor(su2_4),
            txt3: Math.floor(su1_8),
            txt4: Math.floor(su2_8),
          },
        };

        kakao.sendLink(room, obj, "custom");
      } catch (error) {
        알림("숫자만 입력해주세요.", room);
      }
      return;
    }

    if (search[1] == "멸화깡") {
      let ran = Math.floor(Math.random() * 2);

      let obj;

      if (ran == 0) {
        let 답변 = ["멸화!!! 개이득 ~", "멸화네 ㅊㅋㅊㅋ!!", "멸화깡 성공적!!!"];
        let ran = Math.floor(Math.random() * 답변.length);
        obj = {
          link_ver: "4.0",
          template_id: 78877,
          template_args: {
            img: "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_9_55.png",
            msg: 답변[ran],
          },
        };
      } else if (ran == 1) {
        let 답변 = ["홍염은 거래소에서 사는게 더 싸요.", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", "형도니가 랩을한다 홍~ 홍~ 홍~"];
        let ran = Math.floor(Math.random() * 답변.length);
        obj = {
          link_ver: "4.0",
          template_id: 78877,
          template_args: {
            img: "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_9_65.png",
            msg: 답변[ran],
          },
        };
      }
      kakao.sendLink(room, obj, "custom");
      return;
    }

    if (search[1] == "놀자") {
      kakao.sendLink(room, { template_id: 78713, template_args: {} }, "custom");
      return;
    }

    if (search[1] == "운세") {
      let ran = Math.floor(Math.random() * 운세목록.length);
      if (오늘날짜 == "" || 오늘날짜 != 오늘날짜구하기(date)) {
        오늘날짜 = 오늘날짜구하기(date);
        사용자 = [];
        kakao.sendLink(room, { template_id: 운세목록[ran], template_args: {} }, "custom");
        사용자.push(sender);
      } else {
        if (사용자.includes(sender)) {
          알림("📆 오늘은 이미 운세를 확인했습니다.", room);
        } else {
          kakao.sendLink(room, { template_id: 운세목록[ran], template_args: {} }, "custom");
          사용자.push(sender);
        }
      }
      return;
    }

    if (search[1] == "로아운") {
      function make_template() {
        let ran_10000 = Math.floor(Math.random() * 10000);
        let ran_100 = Math.floor(Math.random() * 100);
        let template;

        if (ran_10000 == 7777) {
          template = {
            template_id: 78921,
            template_args: {
              img: "https://i.ibb.co/2KxtqPd/image.png",
              msg: "에스더의기운 먹을거 같은 느낌이에요!",
            },
          };
          return template;
        }

        if (0 <= ran_100 && ran_100 <= 1) {
          template = {
            template_id: 78921,
            template_args: {
              img: "https://i.ibb.co/SngVw6P/image.png",
              msg: "거대한 금괴 먹을거 같은 느낌이에요!",
            },
          };
          return template;
        }

        if (2 <= ran_100 && ran_100 <= 3) {
          template = {
            template_id: 78921,
            template_args: {
              img: "https://i.ibb.co/0GP54Bz/image.png",
              msg: "비싼 악세 먹을거 같은 느낌이에요!",
            },
          };
          return template;
        }

        if (4 <= ran_100 && ran_100 <= 8) {
          template = {
            template_id: 78921,
            template_args: {
              img: "https://i.ibb.co/T4PKPMv/image.png",
              msg: "전설 카드 선택팩 먹을거 같은 느낌이에요!",
            },
          };
          return template;
        }

        if (요일 == "월" || 요일 == "목" || 요일 == "토" || 요일 == "일") {
          let num = Math.floor(Math.random() * 2);
          if (num == 1) {
            let num = Math.floor(Math.random() * 100);
            let msg;
            let img;
            if (0 <= num && num <= 54) {
              msg = "파란지도를 먹을거 같은 느낌이에요!";
              img = "https://i.ibb.co/JdQL7nH/image.png";
            } else if (55 <= num && num <= 88) {
              msg = "보라지도를 먹을거 같은 느낌이에요!";
              img = "https://i.ibb.co/3f0kgVF/image.png";
            } else if (89 <= num && num <= 98) {
              msg = "전설지도를 먹을거 같은 느낌이에요!";
              img = "https://i.ibb.co/myLcfvD/image.png";
            } else if (num == 99) {
              msg = "유물지도를 먹을거 같은 느낌이에요!";
              img = "https://i.ibb.co/NnWR6n0/image.png";
            }
            template = {
              template_id: 78921,
              template_args: {
                img: img,
                msg: msg,
              },
            };
            return template;
          } else {
            let num = Math.floor(Math.random() * 3);

            let ran = Math.floor(Math.random() * 100) + 1;

            let mok = parseInt(ran / 10);
            let rate = "";

            for (let i = 1; i < 11; i++) {
              if (mok >= i) {
                rate += "■";
              } else {
                rate += "□";
              }
              if (i == 10) {
                rate += " " + ran + "%";
              }
            }

            if (num == 0) {
              template = {
                template_id: 78921,
                template_args: {
                  img: "https://i.ibb.co/9wsNj3X/image.png",
                  msg: "강화할때 붙게될 장인의 기운 %는 !!!",
                  rate: rate,
                },
              };
            } else if (num == 1) {
              template = {
                template_id: 78921,
                template_args: {
                  img: "https://i.ibb.co/VYs1QqV/image.png",
                  msg: "전설카드 먹을 확률은 !!!",
                  rate: rate,
                },
              };
            } else if (num == 2) {
              template = {
                template_id: 78921,
                template_args: {
                  img: "https://i.ibb.co/VQbCMRc/image.png",
                  msg: "전설 각인서 먹을 확률은 !!!",
                  rate: rate,
                },
              };
            }
          }
        } else {
          let num = Math.floor(Math.random() * 3);

          let ran = Math.floor(Math.random() * 100) + 1;

          let mok = parseInt(ran / 10);
          let rate = "";

          for (let i = 1; i < 11; i++) {
            if (mok >= i) {
              rate += "■";
            } else {
              rate += "□";
            }
            if (i == 10) {
              rate += " " + ran + "%";
            }
          }

          if (num == 0) {
            template = {
              template_id: 78921,
              template_args: {
                img: "https://i.ibb.co/9wsNj3X/image.png",
                msg: "강화할때 붙게될 장인의 기운 %는 !!!",
                rate: rate,
              },
            };
          } else if (num == 1) {
            template = {
              template_id: 78921,
              template_args: {
                img: "https://i.ibb.co/VYs1QqV/image.png",
                msg: "전설카드 먹을 확률은 !!!",
                rate: rate,
              },
            };
          } else if (num == 2) {
            template = {
              template_id: 78921,
              template_args: {
                img: "https://i.ibb.co/VQbCMRc/image.png",
                msg: "전설 각인서 먹을 확률은 !!!",
                rate: rate,
              },
            };
          }
        }
        return template;
      }

      if (오늘날짜2 == "" || 오늘날짜2 != 오늘날짜구하기(date)) {
        오늘날짜2 = 오늘날짜구하기(date);
        사용자2 = [];

        kakao.sendLink(room, make_template(), "custom");

        사용자2.push(sender);
      } else {
        if (사용자2.includes(sender)) {
          알림("📆 오늘은 이미 운세를 확인했습니다.", room);
        } else {
          kakao.sendLink(room, make_template(), "custom");

          사용자2.push(sender);
        }
      }
      return;
    }

    if (search[1] == "확률") {
      kakao.sendLink(room, { template_id: 78932, template_args: {} }, "custom");
      return;
    }

    if (search[1] == "가위" || search[1] == "바위" || search[1] == "보") {
      가위바위보(search[1], sender, room);
      return;
    }

    if (sender == "차가운키쓰" || sender == "몰링츄 바드") {
      if (search[1] == "삭제") {
        let user = "";
        for (let i = 2; i < search.length; i++) {
          if (search.length == i + 1) {
            user += search[i];
          } else {
            user += search[i] + " ";
          }
        }

        for (let i = 0; i < 사용자.length; i++) {
          if (사용자[i] == user) {
            사용자.splice(i, 1);
          }
        }

        for (let i = 0; i < 사용자2.length; i++) {
          if (사용자2[i] == user) {
            사용자2.splice(i, 1);
          }
        }
        알림("초기화 완료", room);
        return;
      }
    }

    if (search[0] == "농부쿤") {
      let ran = Math.floor(Math.random() * 답변.length);
      replier.reply(답변[ran]);
      return;
    }
  }
}

function 가위바위보(user, sender, room) {
  const 가위 = "✌";
  const 바위 = "✊";
  const 보 = "🖐";

  let ran = Math.floor(Math.random() * 3);
  let com;
  if (ran == 0) {
    com = "가위";
  } else if (ran == 1) {
    com = "바위";
  } else if (ran == 2) {
    com = "보";
  }
  let result = 경우의수(user, com);

  if (user == "가위") {
    user = 가위;
  } else if (user == "바위") {
    user = 바위;
  } else if (user == "보") {
    user = 보;
  }

  if (com == "가위") {
    com = 가위;
  } else if (com == "바위") {
    com = 바위;
  } else if (com == "보") {
    com = 보;
  }

  let msg;
  let user_name = sender;
  let user_res = user;
  let bot_name = prefix;
  let bot_res = com;

  if (result == "user win") {
    msg = sender + " WIN";
  } else if (result == "com win") {
    msg = bot_name + " WIN";
  } else if (result == "무승부") {
    msg = "Draw Game";
  }

  let obj = {
    link_ver: "4.0",
    template_id: 78711,
    template_args: {
      msg: msg,
      user_name: user_name,
      user_res: user_res,
      bot_name: bot_name,
      bot_res: bot_res,
    },
  };
  kakao.sendLink(room, obj, "custom");
}

function 경우의수(user, com) {
  if (user == com) {
    return "무승부";
  } else if (user == "가위" && com == "바위") {
    return "com win";
  } else if (user == "가위" && com == "보") {
    return "user win";
  } else if (user == "바위" && com == "가위") {
    return "user win";
  } else if (user == "바위" && com == "보") {
    return "com win";
  } else if (user == "보" && com == "가위") {
    return "com win";
  } else if (user == "보" && com == "바위") {
    return "user win";
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

function 오늘날짜구하기(date) {
  let day = date.getDate();
  return day;
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
