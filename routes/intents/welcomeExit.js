const { Text, Payload, Card, Suggestion } = require("dialogflow-fulfillment");

function defaultWelcome(agent) {
    let text = new Text('안녕하세요.스카이 서비스 입니다. 무엇을 도와드릴까요?');

    let card = new Card('');
    card.setText('원하시는 서비스를 추천 키워드를 참고하셔서 말씀해 주세요.');
    card.setImage('https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif');

    const suggestions = new Suggestion('화면이 이상해요');
    suggestions.addReply_('인터넷 연결 방법');

    agent.context.delete('support-check-status');
    agent.context.delete('support-find-symptom');
    agent.context.delete('guide-find-option');
    agent.context.delete('guide-find');

    agent.add(text);
    agent.add(card);
    // agent.add(new Card({title:"",imageUrl:'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif',text:"asdf",buttons:[{text:'ff',postback:'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif'}]}));
    agent.add(suggestions);

}

function defaultFallback(agent) {

    let text = new Text('죄송합니다. 무슨 말씀을 하시는지 못알아 들었어요.추천 키워드를 참고하시고 다시 한번 말씀해 주시겠습니까?');

    let card = new Card('');
    card.setText('죄송합니다. Skylife AI 상담원에게 추천 키워드를 참고하시고 다시 말씀해 주세요.');
    card.setImage('https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif');

    const suggestions = new Suggestion('화면이 이상해요');
    suggestions.addReply_('인터넷 연결 방법');

    agent.add(text);
    agent.add(card);
    agent.add(suggestions);

}


module.exports = { defaultWelcome: defaultWelcome, defaultFallback: defaultFallback };