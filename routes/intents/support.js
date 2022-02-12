const {Text, Payload, Card, Suggestion} = require("dialogflow-fulfillment");

//화면이 이상해요

let solution=0;

function supportFallback(agent) {
    console.log('--------support fallback-----------');
    let allContext = agent.contexts;
    let context = agent.context.get('support-find-symptom');
    let symptom = context.parameters.symptom;
    console.log('allcontext : ' + JSON.stringify(allContext));
    console.log('param symptom : ' + context.parameters.symptom);

    let text = new Text('  \n죄송합니다. Skylife AI 상담원에게 다시 한번 정확한 발음으로 말씀해 주십시오.');
    //기존 AOG ssml : .setTextToSpeech("<speak><sub alis=''>죄송합니다. Skylife AI 상담원에게 다시 한번 정확한 발음으로 말씀해 주십시오.</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aispeak5.mp3'></audio></speak>");

    let card = new Card('');
    card.setText('죄송합니다. Skylife AI 상담원에게 다시 한번 정확한 발음으로 말씀해 주십시오.');
    card.setImage('https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif');

    let suggestions = new Suggestion('다시 말해줘');

    if (symptom != "" && symptom == "sym1") {

    } else {
        suggestions.addReply_('화면이 이상해요');
    }
    suggestions.addReply_('인터넷 연결 방법');

    agent.add(text);
    agent.add(card);
    agent.add(suggestions);
}

function supportFindSymptom(agent) {
    console.log('------support find symptom------')

    let allContext = agent.contexts;
    let context = agent.context.get('support-find-symptom');
    console.log('allcontext : ' + JSON.stringify(allContext, null, 4));
    console.log('symtom : ' + context.parameters.symptom);

    agent.context.delete('guide-find-option');
    agent.context.delete('guide-find');

    return genSupport(agent);
}

function supportCheckStatus(agent) {
    console.log('------supportCheckStatus------');

    let allContext = agent.contexts;
    let context = agent.context.get('support-check-status');
    console.log('allcontext : ' + JSON.stringify(allContext, null, 4));
    let connectionType = context.parameters.connectionType;
    console.log('connectionType : ' + connectionType);

    solution=1;

    return genSupport(agent);
}

function supportResolutionNotWork(agent) {
    console.log('----------supportResolutionNotWork----------');
    console.log(agent);
    console.log('agent body :' + JSON.stringify(agent.request_.body.queryResult));
    console.log('agent json :' + JSON.stringify(agent.request_.body.originalDetectIntentRequest));
    console.log('solution : ' + solution);

    solution++;
    if (solution > 3 || solution <= 0) {
        solution = 0;
    }
    console.log('changed solution : ' + solution);
    const payload = {
        solution: solution
    }
    console.log("changed payload : " + JSON.stringify(payload));

    return genSupport(agent);
}

function genSupport(agent) {
    console.log('------genSupport------');

    let card;
    let text;
    let suggestions;
    let connectionType;
    let allContext = agent.contexts;
    let symptomContext = agent.context.get('support-find-symptom');
    let statusContext = agent.context.get('support-check-status');
    console.log('allcontext : ' + JSON.stringify(allContext, null, 4));


    let symptom = symptomContext.parameters.symptom;
    console.log('symtom : ' + symptomContext.parameters.symptom);

    try {
        connectionType = statusContext.parameters.connectionType;
        console.log('connectionType : ' + connectionType);
    } catch (e) {
        console.log('can not find connectionType');
    }

    try {
        //Solution은 0~3값을 가져야 한다.
        console.log('solution : ' + solution);
    } catch (e) {
        console.log('can not find solution');
    }

    // ConnectionType 이 없으면 Symptom 부터
    if (connectionType == null || connectionType.length <= 0) {
        console.log('connectionType is : ' + connectionType);

        if (symptom == null || symptom.length <= 0) { //증상 (symptom) 파라미터값이 없을때
            console.log('symptom is :' + symptom);

            text = new Text("  \n현재 화면 상태를 추천 키워드 중 선택하셔서  말씀해 주시면 됩니다.")
            //기존 AOG ssml .setTextToSpeech("<speak><sub alias='현재 화면 상태를 추천 키워드 중 선택하셔서  말씀해 주시면 됩니다.'>현재 화면 상태를 추천 키워드 중 선택하셔서  말씀해 주시면 됩니다.</sub><audio src='https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aispeak1.mp3'></audio></speak>");

            card = new Card('')
            card.setText("  \n현재 화면 상태를 추천 키워드 중 선택하셔서  말씀해 주시면 됩니다.");
            card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif");

            suggestions = new Suggestion('깜박여요');
            suggestions.addReply_("안나와요");
            suggestions.addReply_("인터넷 연결 방법");
            agent.add(text);
            agent.add(card);
            agent.add(suggestions);
        } else { //증상 (symptom) 파라미터값이 있을때
            console.log('symptom is :' + symptom);

            if (symptom == "sym1") { //깜빡여요

                text = new Text("  \nTV와 셋탑박스를 연결하고있는 케이블 (HDMI / 컴포넌트 케이블)을 아래의 그림을 참고하시고 선택해서 말씀해 주시면 됩니다.")
                // .setTextToSpeech(
                //     "<speak><sub alias='그러셨군요. 혹시 티비와 연결되어 있는 케이블 종류는 에이치디엠아이나 컴포넌트 케이블 중 무엇을 사용하고 계신가요'>TV와 셋탑박스를 연결하고있는 케이블 (HDMI / 컴포넌트 케이블)을 아래의 그림을 참고하시고 선택해서 말씀해 주시면 됩니다.</sub></speak>");

                const payload = {
                    item: [
                        {
                            title: "컴포넌트",
                            description: "컴포넌트 케이블",
                            key: "con2",
                            imageUrl: "https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/componentCable.jpg"
                        },
                        {
                            title: "HDMI",
                            description: "HDMI 케이블",
                            key: "con1",
                            imageUrl: "https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmiCable.jpg"
                        }
                    ],

                }
                suggestions = new Suggestion('컴포넌트');
                suggestions.addReply_("HDMI");
                suggestions.addReply_("인터넷 연결 방법");

                agent.add(text);
                agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
                agent.add(suggestions);
            }

            if (symptom == "sym2") { //안나와요

                text = new Text("  \nTV와 셋탑박스를 연결하고있는 케이블 (HDMI / 컴포넌트 케이블)을 아래의 그림을 참고하시고 선택해서 말씀해 주시면 됩니다.")
                // .setTextToSpeech(
                //     "<speak><sub alias='그러셨군요. 혹시 티비와 연결되어 있는 케이블 종류는 에이치디엠아이나 컴포넌트 케이블 중 무엇을 사용하고 계신가요'>TV와 셋탑박스를 연결하고있는 케이블 (HDMI / 컴포넌트 케이블)을 아래의 그림을 참고하시고 선택해서 말씀해 주시면 됩니다.</sub></speak>");

                const payload = {
                    // type: "carousel",
                    item : [
                        {
                            title: "컴포넌트",
                            description: "컴포넌트 케이블",
                            key: "con2",
                            imageUrl: "https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/cablecomponent.jpg"
                        },
                        {
                            title: "HDMI",
                            description: "HDMI 케이블",
                            key: "con1",
                            imageUrl: "https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmiCable.jpg"
                        }
                    ]
                }

                suggestions = new Suggestion('컴포넌트');
                suggestions.addReply_("HDMI");
                suggestions.addReply_("인터넷 연결 방법");
                agent.add(text);
                agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
                agent.add(suggestions);

            }
        }

    } else { //connectionType 이 있을때

        switch (solution) {
            case 1:
                console.log('case1');
                if (connectionType == "con2") {
                    text = new Text("  \n네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 컴포넌트 케이블 연결을 다시 한번 확인해 보시겠습니까?");
                    // .setTextToSpeech(
                    //     "<speak><sub alias='네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 컴포넌트 케이블 연결을 다시 한번 확인해 보시겠습니까?'>1. 컴포넌트 케이블 구성 확인  \n	(영상 3개 - 빨강/파랑/초록 + 음성 2개 - 하양/빨강)   \n2. TV와 셋탑박스 뒷 면의 컴포넌으 입력 단자에 색상에 맞게 케이블 연결   \n3. TV 외부입력 - 컴포넌트 확인</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/componentcheck.mp3'></audio></speak>");

                    card = new Card("컴포넌트 연결확인 방법");
                    card.setText("  \n1. 컴포넌트 케이블 구성 확인  \n	(영상 3개 - 빨강/파랑/초록 + 음성 2개 - 하양/빨강)   <br>2. TV와 셋탑박스 뒷 면의 컴포넌으 입력 단자에 색상에 맞게 케이블 연결   <br>3. TV 외부입력 - 컴포넌트 확인");
                    card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/componentcheck.gif");
                } else { // if (connectionType=="con1")
                    text = new Text("  \n네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 HDMI 케이블 연결을 다시 한번 확인해 보시겠습니까?");
                    // .setTextToSpeech(
                    //     "<speak><sub alias='네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 HDMI 케이블 연결을 다시 한번 확인해 보시겠습니까?'>1. 셋탑박스 뒷 면의 HDMI 단자 위치   \n2. HDMI 케이블 연결상태 확인   \n3. TV외부입력 - HDMI1 / HDMI2 확인</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmicheck.mp3'></audio></speak>");
                    card = new Card("HDMI 연결확인 방법");
                    card.setText("  \n1. 셋탑박스 뒷 면의 HDMI 단자 위치   <br>2. HDMI 케이블 연결상태 확인   <br>3. TV외부입력 - HDMI1 / HDMI2 확인");
                    card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmicheck.gif");
                }

                suggestions = new Suggestion('안돼요');
                suggestions.addReply_("인터넷 연결 방법");
                agent.add(text);
                agent.add(card);
                agent.add(suggestions);
                break;
            case 2:
                console.log('case2');
                text = new Text("  \n네 알겠습니다. 번거로우시겠지만 보여지는 화면처럼 TV 전원을 다시 껏다 켜보시겠습니까?");
                // .setTextToSpeech(
                //     "<speak><sub alias='네 알겠습니다. 번거로우시겠지만 보여지는 화면처럼 TV 전원을 다시 껏다 켜보시겠습니까?'>1. 셋탑박스 뒷 면의 전원 버튼 OFF   \n2. 셋탑박스 뒷 면의 전원 버튼 ON</sub><audio src ='https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/suggesttvonoff.mp3'></audio></speak>");
                card = new Card("TV 전원 껏다 켜는 방법");
                card.setText("  \n1. 셋탑박스 뒷 면의 전원 버튼 OFF  <br>2. 셋탑박스 뒷 면의 전원 버튼 ON");
                card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/suggesttvonoff.gif");

                suggestions = new Suggestion('안돼요');
                suggestions.addReply_("인터넷 연결 방법");
                agent.add(text);
                agent.add(card);
                agent.add(suggestions);

                break;
            case 3:
                console.log('case3');
                text = new Text("  \n네 알게습니다. 화면에 보이는것처럼 RF 케이블 연결을 다시 한번 확인 부탁드릴게요.");
                // .setTextToSpeech(
                //     "<speak><sub alias='네 알게습니다. 화면에 보이는것처럼 RF 케이블 연결을 다시 한번 확인 부탁드릴게요.'>1. 셋탑박스 뒷 면의 위성 입력에 꽂혀있는 RF 케이블 확인   \n2. RF 케이블 뺏다 끼기</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/suggestrfcable.mp3'></audio></speak>");
                card = new Card("RF 케이블 연결 확인하는 방법");
                card.setText("  \n1. 셋탑박스 뒷 면의 위성 입력에 꽂혀있는 RF 케이블 확인  <br>2. RF 케이블 뺏다 끼기");
                card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/suggestrfcable.gif");
                suggestions = new Suggestion('안돼요');
                suggestions.addReply_("인터넷 연결 방법");
                agent.add(text);
                agent.add(card);
                agent.add(suggestions);
                break;
            default:
                console.log('default case');
                text = new Text("  \n그러셨군요, 증상 해결에 도움을 드리지 못해 죄송합니다. 대신 AS 접수를 위해 원격진단이나 콜센터 연결방법을 알려드릴까요?");
                // .setTextToSpeech(
                //     "<speak><sub alias='그러셨군요, 증상 해결에 도움을 드리지 못해 죄송합니다. 대신 AS 접수를 위해 원격진단이나 콜센터 연결방법을 알려드릴까요?'>  \nSkylife AS 접수 : 1588-3022   \n원격진단이나 콜센터 연결 방법을 듣길 원하신다면 해당 항목을 말씀해주세요.</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aispeak3.mp3'></audio></speak>");
                card = new Card("");
                card.setText("  \n증상 해결에 도움을 드리지 못해 죄송합니다.  <br><a href='tel:1588-3022'>Skylife AS 접수 : 1588-3022 </a> <br>원격진단이나 콜센터 연결 방법을 듣길 원하신다면 해당 항목을 말씀해주세요.");
                card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif");

                suggestions = new Suggestion('콜센터 연결 방법');
                suggestions.addReply_("원격진단 요청 방법");
                suggestions.addReply_("인터넷 연결 방법");
                agent.add(text);
                agent.add(card);
                agent.add(suggestions);
                break;
        }
        console.log('----end of case----');
    }
}

/*private ActionResponse genSupport(ResponseBuilder rb) {
    Map<String, Object> data = rb.getConversationData();

    String symptom = CommonUtil.makeSafeString(data.get("symptom"));
    String connectionType = CommonUtil.makeSafeString(data.get("connectionType"));
    // Solution은 0~3값을 가져야 한다.
    int solution = CommonUtil.makeSafeInt(data.get("solution"));

    CommonUtil.printMapData(data);

    List<String> suggestions = new ArrayList<String>();
    SimpleResponse simpleResponse = new SimpleResponse();

    // ConnectionType 이 없으면 Symptom 부터
    if (CommonUtil.isEmptyString(connectionType)) {
        List<CarouselSelectCarouselItem> items = new ArrayList<>();
        BasicCard basicCard = new BasicCard();
        if (CommonUtil.isEmptyString(symptom)) {


            simpleResponse.setDisplayText("  \n현재 화면 상태를 추천 키워드 중 선택하셔서  말씀해 주시면 됩니다.")
                .setTextToSpeech("<speak><sub alias='현재 화면 상태를 추천 키워드 중 선택하셔서  말씀해 주시면 됩니다.'>현재 화면 상태를 추천 키워드 중 선택하셔서  말씀해 주시면 됩니다.</sub><audio src='https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aispeak1.mp3'></audio></speak>");
            basicCard.setFormattedText("  \n현재 화면 상태를 추천 키워드 중 선택하셔서  말씀해 주시면 됩니다.");
            basicCard
                .setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif")
                    .setAccessibilityText("Skylife 서비스센터 AI 상담원 이미지"));

            rb.add(simpleResponse);
            rb.add(basicCard);
            suggestions.add("깜박여요");
            suggestions.add("안나와요");
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_TO_MOBILE);
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_FIND);
        } else {
            // check status로 유도
            if (symptom.equalsIgnoreCase("sym1")) {
                simpleResponse
                    .setDisplayText("  \nTV와 셋탑박스를 연결하고있는 케이블 (HDMI / 컴포넌트 케이블)을 아래의 그림을 참고하시고 선택해서 말씀해 주시면 됩니다.")
                    .setTextToSpeech(
                        "<speak><sub alias='그러셨군요. 혹시 티비와 연결되어 있는 케이블 종류는 에이치디엠아이나 컴포넌트 케이블 중 무엇을 사용하고 계신가요'>TV와 셋탑박스를 연결하고있는 케이블 (HDMI / 컴포넌트 케이블)을 아래의 그림을 참고하시고 선택해서 말씀해 주시면 됩니다.</sub></speak>");
                CarouselSelectCarouselItem item1, item2;

                List<String> synonyms1 = new ArrayList<String>();
                synonyms1.add("컴포넌트");

                item1 = new CarouselSelectCarouselItem().setTitle("컴포넌트").setDescription("컴포넌트 케이블")
                    .setOptionInfo(new OptionInfo().setKey("con2").setSynonyms(synonyms1));
                item1.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/componentCable.jpg")
                    .setAccessibilityText("컴포넌트케이블이미지"));
                items.add(item1);

                List<String> synonyms2 = new ArrayList<String>();
                synonyms2.add("HDMI");

                item2 = new CarouselSelectCarouselItem().setTitle("HDMI").setDescription("HDMI 케이블")
                    .setOptionInfo(new OptionInfo().setKey("con1").setSynonyms(synonyms2));

                item2.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmiCable.jpg")
                    .setAccessibilityText("hdmi케이블이미지"));

                items.add(item2);

                rb.add(simpleResponse);
                rb.add(new SelectionCarousel().setItems(items));

                suggestions.add("컴포넌트");
                suggestions.add("HDMI");
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_TO_MOBILE);
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_FIND);
            }

            if (symptom.equalsIgnoreCase("sym2")) {
                simpleResponse
                    .setDisplayText("  \nTV와 셋탑박스를 연결하고있는 케이블 (HDMI / 컴포넌트 케이블)을 아래의 그림을 참고하시고 선택해서 말씀해 주시면 됩니다.")
                    .setTextToSpeech(
                        "<speak><sub alias='그러셨군요. 혹시 티비와 연결되어 있는 케이블 종류는 에이치디엠아이나 컴포넌트 케이블 중 무엇을 사용하고 계신가요'>TV와 셋탑박스를 연결하고있는 케이블 (HDMI / 컴포넌트 케이블)을 아래의 그림을 참고하시고 선택해서 말씀해 주시면 됩니다.</sub></speak>");
                CarouselSelectCarouselItem item1, item2;

                List<String> synonyms1 = new ArrayList<String>();
                synonyms1.add("컴포넌트");

                item1 = new CarouselSelectCarouselItem().setTitle("컴포넌트").setDescription("컴포넌트 케이블")
                    .setOptionInfo(new OptionInfo().setKey("con2").setSynonyms(synonyms1));
                item1.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/cablecomponent.jpg")
                    .setAccessibilityText("컴포넌트케이블이미지"));
                items.add(item1);

                List<String> synonyms2 = new ArrayList<String>();
                synonyms2.add("HDMI");

                item2 = new CarouselSelectCarouselItem().setTitle("HDMI").setDescription("HDMI 케이블")
                    .setOptionInfo(new OptionInfo().setKey("con1").setSynonyms(synonyms2));

                item2.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/cablehdmi.jpg")
                    .setAccessibilityText("hdmi케이블이미지"));

                items.add(item2);

                rb.add(simpleResponse);
                rb.add(new SelectionCarousel().setItems(items));

                suggestions.add("컴포넌트");
                suggestions.add("HDMI");
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_TO_MOBILE);
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_FIND);
            }
        }

        rb.addSuggestions(suggestions.toArray(new String[suggestions.size()]));
    } else {
        BasicCard basicCard = new BasicCard();

        switch (solution) {
            case 1:
                if (connectionType.equalsIgnoreCase("con2")) {
                    simpleResponse
                        .setDisplayText("  \n네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 컴포넌트 케이블 연결을 다시 한번 확인해 보시겠습니까?")
                        .setTextToSpeech(
                            "<speak><sub alias='네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 컴포넌트 케이블 연결을 다시 한번 확인해 보시겠습니까?'>1. 컴포넌트 케이블 구성 확인  \n	(영상 3개 - 빨강/파랑/초록 + 음성 2개 - 하양/빨강)   \n2. TV와 셋탑박스 뒷 면의 컴포넌으 입력 단자에 색상에 맞게 케이블 연결   \n3. TV 외부입력 - 컴포넌트 확인</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/componentcheck.mp3'></audio></speak>");
                    basicCard.setFormattedText("  \n1. 컴포넌트 케이블 구성 확인  \n	(영상 3개 - 빨강/파랑/초록 + 음성 2개 - 하양/빨강)   \n2. TV와 셋탑박스 뒷 면의 컴포넌으 입력 단자에 색상에 맞게 케이블 연결   \n3. TV 외부입력 - 컴포넌트 확인").setImage(
                        new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/componentcheck.gif")
                            .setAccessibilityText("컴포넌트연결확인방법 이미지"));
                } else { // if (connectionType.equalsIgnoreCase("con1")
                    simpleResponse
                        .setDisplayText("  \n네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 HDMI 케이블 연결을 다시 한번 확인해 보시겠습니까?")
                        .setTextToSpeech(
                            "<speak><sub alias='네 고객님. 그럼 몇 가지 확인을 부탁 드리겠습니다. 다음과 같이 HDMI 케이블 연결을 다시 한번 확인해 보시겠습니까?'>1. 셋탑박스 뒷 면의 HDMI 단자 위치   \n2. HDMI 케이블 연결상태 확인   \n3. TV외부입력 - HDMI1 / HDMI2 확인</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmicheck.mp3'></audio></speak>");
                    basicCard.setTitle("HDMI 연결확인 방법").setFormattedText("  \n1. 셋탑박스 뒷 면의 HDMI 단자 위치   \n2. HDMI 케이블 연결상태 확인   \n3. TV외부입력 - HDMI1 / HDMI2 확인");
                    basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/hdmicheck.gif")
                        .setAccessibilityText("HDMI연결확인방법 이미지"));
                }
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_NOT_WORK);

                rb.add(simpleResponse);
                rb.add(basicCard);
                break;
            case 2:
                simpleResponse
                    .setDisplayText("  \n네 알겠습니다. 번거로우시겠지만 보여지는 화면처럼 TV 전원을 다시 껏다 켜보시겠습니까?")
                    .setTextToSpeech(
                        "<speak><sub alias='네 알겠습니다. 번거로우시겠지만 보여지는 화면처럼 TV 전원을 다시 껏다 켜보시겠습니까?'>1. 셋탑박스 뒷 면의 전원 버튼 OFF   \n2. 셋탑박스 뒷 면의 전원 버튼 ON</sub><audio src ='https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/suggesttvonoff.mp3'></audio></speak>");

                basicCard.setTitle("TV 전원 껏다 켜는 방법").setFormattedText("  \n1. 셋탑박스 뒷 면의 전원 버튼 OFF  \n2. 셋탑박스 뒷 면의 전원 버튼 ON");
                basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/suggesttvonoff.gif")
                    .setAccessibilityText("TV 전원껏다켜는 방법 이미지"));
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_NOT_WORK);

                rb.add(simpleResponse);
                rb.add(basicCard);
                break;
            case 3:
                simpleResponse
                    .setDisplayText("  \n네 알게습니다. 화면에 보이는것처럼 RF 케이블 연결을 다시 한번 확인 부탁드릴게요.")
                    .setTextToSpeech(
                        "<speak><sub alias='네 알게습니다. 화면에 보이는것처럼 RF 케이블 연결을 다시 한번 확인 부탁드릴게요.'>1. 셋탑박스 뒷 면의 위성 입력에 꽂혀있는 RF 케이블 확인   \n2. RF 케이블 뺏다 끼기</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/suggestrfcable.mp3'></audio></speak>");

                basicCard.setTitle("RF 케이블 연결 확인하는 방법").setFormattedText("  \n1. 셋탑박스 뒷 면의 위성 입력에 꽂혀있는 RF 케이블 확인  \n2. RF 케이블 뺏다 끼기");
                basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/suggestrfcable.gif")
                    .setAccessibilityText("RF 케이블 연결 확인하는 방법 이미지"));
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_NOT_WORK);

                rb.add(simpleResponse);
                rb.add(basicCard);
                break;
            default:
                simpleResponse
                    .setDisplayText("  \n그러셨군요, 증상 해결에 도움을 드리지 못해 죄송합니다. 대신 AS 접수를 위해 원격진단이나 콜센터 연결방법을 알려드릴까요?")
                    .setTextToSpeech(
                        "<speak><sub alias='그러셨군요, 증상 해결에 도움을 드리지 못해 죄송합니다. 대신 AS 접수를 위해 원격진단이나 콜센터 연결방법을 알려드릴까요?'>  \nSkylife AS 접수 : 1588-3022   \n원격진단이나 콜센터 연결 방법을 듣길 원하신다면 해당 항목을 말씀해주세요.</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aispeak3.mp3'></audio></speak>");

                basicCard.setFormattedText("  \n증상 해결에 도움을 드리지 못해 죄송합니다.  \nSkylife AS 접수 : 1588-3022  \n원격진단이나 콜센터 연결 방법을 듣길 원하신다면 해당 항목을 말씀해주세요.");
                basicCard
                    .setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif")
                        .setAccessibilityText("Skylife 서비스센터 AI 상담원 이미지"));
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_ASCENTER);
                suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_REMOTE);

                rb.add(simpleResponse);
                rb.add(basicCard);
                break;
        }
        suggestions.add(SkylifeServiceCenterWord.SUGGEST_TO_MOBILE);
        suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_FIND);

        rb.addSuggestions(suggestions.toArray(new String[suggestions.size()]));
    }
    return rb.build();
}*/

function supportRetry(agent) {
    supportFindSymptom(agent);
}

module.exports = {
    supportCheckStatus: supportCheckStatus,
    supportFindSymptom: supportFindSymptom,
    supportResolutionNotWork: supportResolutionNotWork,
    supportRetry: supportRetry,
    supportFallback: supportFallback
}
