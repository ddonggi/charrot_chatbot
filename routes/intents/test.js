const { Text, Payload, Card, Suggestion } = require("dialogflow-fulfillment");

function test(agent) { //테스트용 인텐트
    let text = new Text('안녕하세요.test 문장입 니다. 무엇을 도와드릴까요?');
    let text2 = new Text('안녕하세요.test2 문장 입니다. 두번째 라구요');
//     const wakeUpText = new Text('Waking up...');
//     wakeUpText.setSsml(`
//   <speak>
//   <sub alias='네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 컴포넌트 케이블 연결을 다시 한번 확인해 보시겠습니까?'>1. 컴포넌트 케이블 구성 확인  \n	(영상 3개 - 빨강/파랑/초록 + 음성 2개 - 하양/빨강)   \n2. TV와 셋탑박스 뒷 면의 컴포넌으 입력 단자에 색상에 맞게 케이블 연결   \n3. TV 외부입력 - 컴포넌트 확인</sub>
//     <audio src="https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/componentcheck.mp3"></audio>
//   </speak>
// `);
//     agent.add(wakeUpText);

    // agent.add(new Card({
    //         title: 'Title: this is a card title',
    //         imageUrl: 'https://developers.google.com/actions/assistant.png',
    //         text: 'This is the body text of a card.  You can even use line\n  breaks and emoji! 💁',
    //         buttonText: 'This is a button',
    //         buttonUrl: 'https://assistant.google.com/'
    //     })
    // );
    const payload = {
        "textToSpeech":"인녕하세요.",
        "basicCard" : {
            "type":[""],
        }
    }
    let card = new Card('컴포넌트');
    card.setText("컴포넌트 케이블");
    card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/componentCable.jpg");
    card.setButton({text:'링크로 이동',url:"https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmiCable.jpg"});

    let card2 = new Card('HDMI');
    card2.setText("HDMI 케이블");
    card2.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmiCable.jpg");
    card2.setButton({text:'링크로 이동',url:"https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmiCable.jpg"});

    let card3 = new Card('HDMI2');
    card3.setText("HDMI 케이블2");
    card3.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmiCable.jpg");
    card3.setButton({text:'링크로 이동',url:"https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmiCable.jpg"});
    // const suggestions = new Suggestion('화면이 이상해요');
    // suggestions.addReply_('인터넷 연결 방법');

    agent.context.delete('support-check-status');
    agent.context.delete('support-find-symptom');
    agent.context.delete('guide-find-option');
    agent.context.delete('guide-find');

    agent.add(text);
    agent.add(text2);
    agent.add(["배열 텍스트1","배열 텍스트2"]);
    agent.add(card);
    // agent.add(card2);
    // agent.add(card3);
    agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
    // agent.add(new Card({title:"",imageUrl:'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif',text:"asdf",buttons:[{text:'ff',postback:'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif'}]}));
    // agent.add(suggestions);

}

module.exports = { test:test};