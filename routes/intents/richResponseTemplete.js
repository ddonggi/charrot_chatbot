/*
* Rich response template
*
* const { Text, Card, Payload, Suggestion, Image } = require("dialogflow-fulfillment");
*/
/*
    // ================== construct =================================

    //card
    let card = new Card('card title');
    card.setImage('https://blog.kakaocdn.net/dn/drZyGZ/btqyZtBY0aB/hiWQknVLEeU85vAsXKhUR1/img.jpg');
    card.setText('This is the body text of a card.  You can even use line\nbreaks and emoji! 💁');
    card.setButton({text: 'This is a button', url: 'https://assistant.google.com/'});


    //payload
    const payload = {
        type: "Card",
        title: "안녕하세요",
        text: "skylife챗봇입니다."
    }

    //suggestion - chips
    const suggestions =  new Suggestion('aaa');
    suggestions.addReply_('bbb');
    suggestions.addReply_('ccc');

    //image
    const imageUrl = 'https://blog.kakaocdn.net/dn/drZyGZ/btqyZtBY0aB/hiWQknVLEeU85vAsXKhUR1/img.jpg'
    let image = new Image(imageUrl);


    //=============== add to agent =====================

    //card
    agent.add(card);

    //payload
    agent.add(
        new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true})
    )

    //suggestion - chips
    agent.add(suggestions);

    //image
    agent.add(suggestions);*/
