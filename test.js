const { KakaoApiService, KakaoLinkClient } = require('kakaolink')

const Kakao = new KakaoLinkClient();

KakaoApiService.createService().login({
  email: 'ID',
  password: 'PW',
  keepLogin: true,
}).then(e => {
  Kakao.login(e, {
    apiKey: 'd7034bc4d1255eddebae4399d0e95d67',
    url: 'https://loawa.com'
  });
}).catch(e => {
  Log.d(e);
});

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg === '!카카오링크') {
    Kakao.sendLink(room, {
      template_id: 78539,
      template_args: {

      }
    }, 'custom').then(e => {
      replier.reply('카링 보내기 성공!')
    }).catch(e => {
      replier.reply(e);
    })
  }
}
