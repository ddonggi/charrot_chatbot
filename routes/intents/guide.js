const {Text, Payload, Card, Suggestion} = require("dialogflow-fulfillment");

//인터넷 연결 방법

function guideFallback(agent) {
    console.log('--------guide fallback-----------');
    let allContext = agent.contexts;
    let context = agent.context.get('guide-find');
    console.log('allcontext : ' + JSON.stringify(allContext));
    console.log('param guideType : ' + context.parameters.guideType);
    console.log('param category Type : ' + context.parameters.guideCategoryType);


    let suggestions = new Suggestion('');

    if (context.parameters.guideCategoryType != "" || context.parameters.guideType != "") {
        suggestions.addReply_('다시 말해줘');
    }

    let text = new Text('죄송합니다. 무슨 말씀을 하시는지 못알아 들었어요. 다시 한번 말씀해 주시겠습니까?');
    //기존 AOG ssml : setTextToSpeech("<speak><sub alias='죄송합니다. 무슨 말씀을 하시는지 못알아 들었어요. 다시 한번 말씀해 주시겠습니까?'>죄송합니다. Skylife AI 상담원에게 다시 한번 정확한 발음으로 말씀해 주십시오.</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aispeak5.mp3'></audio></speak>");

    let card = new Card('');
    card.setText('죄송합니다. Skylife AI 상담원에게 다시 한번 정확한 발음으로 말씀해 주십시오.');
    card.setImage('https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aipersonKo.gif');

    suggestions.addReply_('화면이 이상해요');

    agent.add(text);
    agent.add(card);
    agent.add(suggestions);
}

function guideFind(agent) {
    console.log('------guideFind------')

    let allContext = agent.contexts;
    let context = agent.context.get('guide-find');
    console.log('allcontext : ' + JSON.stringify(allContext, null, 4));
    console.log('param guideType : ' + context.parameters.guideType);
    console.log('param category Type : ' + context.parameters.guideCategoryType);

    agent.context.delete('support-check-status');
    agent.context.delete('support-find-symptom');

    return genGuideFind(agent);
}

/*private ActionResponse genGuideFind(ResponseBuilder rb) {
    Map<String, Object> data = rb.getConversationData();
    String guideType = CommonUtil.makeSafeString(data.get("guideType"));
    String guideCategoryType = CommonUtil.makeSafeString(data.get("guideCategoryType"));

    CommonUtil.printMapData(data);

    if (!CommonUtil.isEmptyString(guideCategoryType)) {
        return genGuideCategoryType(rb, guideCategoryType);
    } else {
        return genGuideFindType(rb, guideType);
    }
}*/

function genGuideFind(agent) {
    console.log('-------genGuideFind------');

    let allContext = agent.contexts;
    console.log('allcontext : ' + JSON.stringify(allContext, null, 4));
    let context = agent.context.get('guide-find');

    let guideCategoryType = context.parameters.guideCategoryType; //인터넷
    console.log("guideCategoryType: " + guideCategoryType);

    let guideType = context.parameters.guideType; // wifi,lan,wps,원격상담,콜센터,
    console.log("guideType: " + guideType);

    if (guideCategoryType === "internet") {
        return genGuideCategoryType(agent, guideCategoryType);
    } else {
        return genGuideFindType(agent, guideType);
    }
}

function genGuideCategoryType(agent, guideCategoryType) {
    console.log('---------- genGuideCategoryType -------------');

    if (guideCategoryType == "internet") {
        console.log('category type is ' + guideCategoryType);
        let text = new Text('원하시는 인터넷 연결 방법을 선택해서 말씀해 주시면 됩니다.');
        //기존 AOG stt : setTextToSpeech("<speak><sub alias='원하시는 인터넷 연결 방법을 선택해서 말씀해 주시면 됩니다.'>원하시는 인터넷 연결 방법을 선택해서 말씀해 주시면 됩니다.</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aispeak6.mp3'></audio></speak>");

        //cards
/*
        let card = new Card("와이파이 연결 방법");
        card.setText("무선(WIFI) 인터넷 연결 방법입니다.");
        card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wifi.jpg");
        let card2 = new Card("유선 연결 방법");
        card2.setText("유선(LAN) 인터넷 연결 방법입니다.");
        card2.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/lan.jpg");
        let card3 = new Card("WPS 연결 방법");
        card3.setText("WPS 연결 방법입니다.");
        card3.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wps.jpg");
*/

        //payload
        const payload = {
            item: [
                {
                    title: "와이파이 연결 방법",
                    description: "무선(WIFI) 인터넷 연결 방법입니다.",
                    key: "wifi",
                    imageUrl: "https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wifi.jpg"
                },
                {
                    title: "유선 연결 방법",
                    description: "유선(LAN) 인터넷 연결 방법입니다.",
                    key: "lan",
                    imageUrl: "https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/lan.jpg"
                },
                {
                    title: "WPS 연결 방법",
                    description: "WPS 연결 방법입니다.",
                    key: "wps",
                    imageUrl: "https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wps.jpg"
                }
            ],
        }

        let suggestions = new Suggestion('와이파이 연결 방법');
        suggestions.addReply_('유선 연결 방법');
        suggestions.addReply_('WPS 연결 방법');
        suggestions.addReply_('화면이 이상해요');

        agent.add(text);
        // agent.add(card);
        // agent.add(card2);
        // agent.add(card3);
        agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
        agent.add(suggestions);
    }
}

/*private ActionResponse genGuideCategoryType(ResponseBuilder rb, String guideCategoryType ) {
    List < String > suggestions = new ArrayList < String > ();
    SimpleResponse
    simpleResponse = new SimpleResponse();
    List < CarouselSelectCarouselItem > items = new ArrayList < > ();
    CarouselSelectCarouselItem
    item;

    if (guideCategoryType.equalsIgnoreCase("internet")) {
        simpleResponse
            .setDisplayText("  \n원하시는 인터넷 연결 방법을 선택해서 말씀해 주시면 됩니다.")
            .setTextToSpeech("<speak><sub alias='원하시는 인터넷 연결 방법을 선택해서 말씀해 주시면 됩니다.'>원하시는 인터넷 연결 방법을 선택해서 말씀해 주시면 됩니다.</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/aispeak6.mp3'></audio></speak>");
        item = new CarouselSelectCarouselItem().setTitle("와이파이 연결 방법").setDescription("무선(WIFI) 인터넷 연결 방법입니다.")
            .setOptionInfo(new OptionInfo().setKey("wifi"))
            .setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wifi.jpg")
                .setAccessibilityText("wifi jpg"));
        items.add(item);

        item = new CarouselSelectCarouselItem().setTitle("유선 연결 방법").setDescription("유선(LAN) 인터넷 연결 방법입니다.")
            .setOptionInfo(new OptionInfo().setKey("lan"))
            .setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/lan.jpg")
                .setAccessibilityText("lan jpg"));
        items.add(item);

        item = new CarouselSelectCarouselItem().setTitle("WPS 연결 방법").setDescription("WPS 연결 방법입니다.")
            .setOptionInfo(new OptionInfo().setKey("wps"))
            .setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wps.jpg")
                .setAccessibilityText("wps jpg"));
        items.add(item);

        suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_WIFI);
        suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_LAN);
        suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_WPS);
    }
    suggestions.add(SkylifeServiceCenterWord.SUGGEST_TO_MOBILE);
    suggestions.add(SkylifeServiceCenterWord.SUGGEST_SUPPORT_FIND);

    rb.add(simpleResponse);
    rb.add(new SelectionCarousel().setItems(items));
    rb.addSuggestions(suggestions.toArray(new String[suggestions.size()]));

    return rb.build();
}*/

function genGuideFindType(agent, guideType) {
    let text;
    let card;
    let suggestions;

    switch (guideType) {
        case "ascontrol":
            text = new Text("  \n네 알겠습니다. 원격진단 연결하는 방법을 설명해 드릴게요. 다음에 보여지는 화면을 따라 시도해 주세요.")
            // .setTextToSpeech(
            //     "<speak><sub alias = '네 알겠습니다. 원격진단 연결하는 방법을 설명해 드릴게요. 다음에 보여지는 화면을 따라 시도해 주세요.'>1. 1588-3022  전화 연결   \n2. 2번 고장문의   \n3. 2번 원격진단   \n4. 스마트카드번호 앞 2자리를 제외한 10자리와 # 입력   \n5. 개인고객 - 생년월일 6자리 / 사업자고객 - 사업자번호 앞 6자리   \n6. 셋탑박스의 빨간 LED 확인</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/ascontrol.mp3'></audio></speak>");
            card = new Card("원격진단 방법")
            card.setText("  \n1. <a href='tel:1588-3022'>1588-3022  전화 연결</a>  <br>2. 2번 고장문의  <br>3. 2번 원격진단  <br>4. 스마트카드번호 앞 2자리를 제외한 10자리와 # 입력  <br>5. 개인고객 - 생년월일 6자리 / 사업자고객 - 사업자번호 앞 6자리  <br>6. 셋탑박스의 빨간 LED 확인");
            card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/ascontrol.gif");

            suggestions = new Suggestion("콜센터 연결 방법");
            suggestions.addReply_("스마트카드번호 확인방법");
            suggestions.addReply_("인터넷 연결 방법");
            break;
        case "callcenter":
            text = new Text("  \n네 알겠습니다. 콜센터 연결하는 방법을 설명해 드릴게요. 다만 스카이라이프가 아닌 고객님 소유 장비 또는 타사 서비스 문제인 경우는 기사 출동비 만 천원이 다음달에 발생될 수 있으니 참고 부탁드립니다.")
            // .setTextToSpeech(
            //     "<speak><sub alias = '네 알겠습니다. 콜센터 연결하는 방법을 설명해 드릴게요. 다만 스카이라이프가 아닌 고객님 소유 장비 또는 타사 서비스 문제인 경우는 기사 출동비 만 천원이 다음달에 발생될 수 있으니 참고 부탁드립니다.'>1. 1588-3002 전화 연결   \n2. 2번 고장문의</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/callcenter.mp3'></audio></speak>");
            card = new Card("콜센터 연결방법")
            card.setText("  \n1. <a href='tel:1588-3002'>1588-3002 전화 연결</a>  <br>2. 2번 고장문의");
            card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/callcenter.gif");

            suggestions = new Suggestion("원격진단 요청 방법");
            suggestions.addReply_("스마트카드번호 확인방법");
            suggestions.addReply_("인터넷 연결 방법");
            break;
        case "smartcardno":
            text = new Text("  \n네 고객님. 스마트카드번호를 확인하는 방법을 설명해 드릴게요. 다음과 같이 스마트카드번호 확인 후 ARS 콜센터로 연락 주시면, 안전하게 고객님의 소중한 정보를 확인하여 신속한 상담을 도와드리겠습니다.")
            // .setTextToSpeech(
            //     "<speak><sub alias='네 고객님. 스마트카드번호를 확인하는 방법을 설명해 드릴게요. 다음과 같이 스마트카드번호 확인 후 ARS 콜센터로 연락 주시면, 안전하게 고객님의 소중한 정보를 확인하여 신속한 상담을 도와드리겠습니다.'>1. 리모컨 버튼의 홈 버튼 클릭   \n2. 화면 상의 마이페이지 클릭   \n3. 우측 상단의 나의 스마트카드 번호 확인</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/smartcard.mp3'></audio></speak>");
            card = new Card("스마트카드번호 확인방법")
            card.setText("  \n1. 리모컨 버튼의 홈 버튼 클릭  <br>2. 화면 상의 마이페이지 클릭  <br>3. 우측 상단의 나의 스마트카드 번호 확인");
            card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/smartcard.gif");

            suggestions = new Suggestion("콜센터 연결 방법");
            suggestions.addReply_("원격진단 요청 방법");
            suggestions.addReply_("인터넷 연결 방법");
            break;
        case "wifi":
            text = new Text("  \n네 알겠습니다. 화면에 보이는것처럼 무선 와이파이 연결을 시도해 보시기 바랍니다.")
            // .setTextToSpeech(
            //     "<speak><sub alias='네 알겠습니다. 화면에 보이는것처럼 무선 와이파이 연결을 시도해 보시기 바랍니다.'>1.리모컨 버튼의 홈버튼 클릭   \n2. 화면 상의  설정 클릭   \n3. 인터넷   \n4. 인터넷 연결 가이드   \n5. 무선인터넷 연결(WiFi)   \n6. 해당 WiFi 비밀번호 입력   \n7. 무선인터넷 연결</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wifi.mp3'></audio></speak>");
            card = new Card("무선(WIFI) 인터넷 연결 방법")
            card.setText("  \n1.리모컨 버튼의 홈버튼 클릭  <br>2. 화면 상의  설정 클릭  <br>3. 인터넷  <br>4. 인터넷 연결 가이드  <br>5. 무선인터넷 연결(WiFi)  <br>6. 해당 WiFi 비밀번호 입력  <br>7. 무선인터넷 연결");
            card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wifi.gif");

            suggestions = new Suggestion("유선 연결 방법");
            suggestions.addReply_("WPS 연결 방법");
            suggestions.addReply_("화면이 이상해요");

            break;
        case "lan":
            text = new Text("  \n네 알겠습니다. 다음과 같이 유선 랜으로 인터넷 연결을 시도해 보시기 바랍니다.")
            // .setTextToSpeech(
            // "<speak>><sub alias='네 알겠습니다. 다음과 같이 유선 랜으로 인터넷 연결을 시도해 보시기 바랍니다.'>1.리모컨 버튼의 홈버튼 클릭   \n2. 화면 상의  설정 클릭    \n3. 인터넷   \n4. 인터넷 연결 가이드   \n5. 유선 인터넷 연결(이더넷)</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/lan.mp3'></audio></speak>");
            card = new Card("유선(LAN) 인터넷 연결 방법")
            card.setText("  \n1.리모컨 버튼의 홈버튼 클릭  <br>2. 화면 상의  설정 클릭   <br>3. 인터넷  <br>4. 인터넷 연결 가이드  <br>5. 유선 인터넷 연결(이더넷)");
            card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/lan.gif");

            suggestions = new Suggestion("와이파이 연결 방법");
            suggestions.addReply_("WPS 연결 방법");
            suggestions.addReply_("화면이 이상해요");
            break;
        case "wps":
            text = new Text("  \n네 알겠습니다. 무선 WPS 연결은 비밀번호 없이도  손쉽게 와이파이 연결이 가능한 방법이오니, 다음 설명을 잘 듣고 따라해 보시기 바랍니다.")
            // .setTextToSpeech(
            //     "<speak><sub alias='네 알겠습니다. 무선 WPS 연결은 비밀번호 없이도  손쉽게 와이파이 연결이 가능한 방법이오니, 다음 설명을 잘 듣고 따라해 보시기 바랍니다.'>1.리모컨 버튼의 홈버튼 클릭   \n2. 화면 상의  설정 클릭   \n3. 인터넷   \n4. 안드로이드 설정 바로가기   \n5. WPS를 통해 연결    \n6. 공유기의 WPS버튼 클릭</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wps.mp3'></audio></speak>");
            card = new Card("무선(WPS) 연결 방법")
            card.setText("  \n1.리모컨 버튼의 홈버튼 클릭  \n2. 화면 상의  설정 클릭  \n3. 인터넷  \n4. 안드로이드 설정 바로가기  \n5. WPS를 통해 연결   \n6. 공유기의 WPS버튼 클릭");
            card.setImage("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wps.gif");

            suggestions = new Suggestion("와이파이 연결 방법");
            suggestions.addReply_("유선 연결 방법");
            suggestions.addReply_("화면이 이상해요");
            break;
        default:
            break;
    }
    agent.add(text);
    agent.add(card);
    agent.add(suggestions);
}

function guideRetry(agent) {
    guideFind(agent);
}

/*private ActionResponse genGuideFindType(ResponseBuilder rb, String guideType) {
    BasicCard basicCard = new BasicCard();
    SimpleResponse simpleResponse = new SimpleResponse();
    List<String> suggestions = new ArrayList<String>();

    switch (guideType) {
        case "ascontrol":
            simpleResponse
                .setDisplayText("  \n네 알겠습니다. 원격진단 연결하는 방법을 설명해 드릴게요. 다음에 보여지는 화면을 따라 시도해 주세요.")
                .setTextToSpeech(
                    "<speak><sub alias = '네 알겠습니다. 원격진단 연결하는 방법을 설명해 드릴게요. 다음에 보여지는 화면을 따라 시도해 주세요.'>1. 1588-3022  전화 연결   \n2. 2번 고장문의   \n3. 2번 원격진단   \n4. 스마트카드번호 앞 2자리를 제외한 10자리와 # 입력   \n5. 개인고객 - 생년월일 6자리 / 사업자고객 - 사업자번호 앞 6자리   \n6. 셋탑박스의 빨간 LED 확인</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/ascontrol.mp3'></audio></speak>");
            basicCard.setTitle("원격진단 방법").setFormattedText("  \n1. 1588-3022  전화 연결  \n2. 2번 고장문의  \n3. 2번 원격진단  \n4. 스마트카드번호 앞 2자리를 제외한 10자리와 # 입력  \n5. 개인고객 - 생년월일 6자리 / 사업자고객 - 사업자번호 앞 6자리  \n6. 셋탑박스의 빨간 LED 확인");
            basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/ascontrol.gif")
                .setAccessibilityText("원격진단 방법 이미지"));
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_ASCENTER);
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_SMARTCARD);
            break;
        case "callcenter":
            simpleResponse
                .setDisplayText("  \n네 알겠습니다. 콜센터 연결하는 방법을 설명해 드릴게요. 다만 스카이라이프가 아닌 고객님 소유 장비 또는 타사 서비스 문제인 경우는 기사 출동비 만 천원이 다음달에 발생될 수 있으니 참고 부탁드립니다.")
                .setTextToSpeech(
                    "<speak><sub alias = '네 알겠습니다. 콜센터 연결하는 방법을 설명해 드릴게요. 다만 스카이라이프가 아닌 고객님 소유 장비 또는 타사 서비스 문제인 경우는 기사 출동비 만 천원이 다음달에 발생될 수 있으니 참고 부탁드립니다.'>1. 1588-3002 전화 연결   \n2. 2번 고장문의</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/callcenter.mp3'></audio></speak>");
            basicCard.setTitle("콜센터 연결방법").setFormattedText("  \n1. 1588-3002 전화 연결  \n2. 2번 고장문의");
            basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/callcenter.gif")
                .setAccessibilityText("콜센터 연결방법 이미지"));
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_REMOTE);
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_SMARTCARD);
            break;
        case "smartcardno":
            simpleResponse
                .setDisplayText("  \n네 고객님. 스마트카드번호를 확인하는 방법을 설명해 드릴게요. 다음과 같이 스마트카드번호 확인 후 ARS 콜센터로 연락 주시면, 안전하게 고객님의 소중한 정보를 확인하여 신속한 상담을 도와드리겠습니다.")
                .setTextToSpeech(
                    "<speak><sub alias='네 고객님. 스마트카드번호를 확인하는 방법을 설명해 드릴게요. 다음과 같이 스마트카드번호 확인 후 ARS 콜센터로 연락 주시면, 안전하게 고객님의 소중한 정보를 확인하여 신속한 상담을 도와드리겠습니다.'>1. 리모컨 버튼의 홈 버튼 클릭   \n2. 화면 상의 마이페이지 클릭   \n3. 우측 상단의 나의 스마트카드 번호 확인</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/smartcard.mp3'></audio></speak>");
            basicCard.setTitle("스마트카드번호 확인방법").setFormattedText("  \n1. 리모컨 버튼의 홈 버튼 클릭  \n2. 화면 상의 마이페이지 클릭  \n3. 우측 상단의 나의 스마트카드 번호 확인");
            basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/smartcard.gif")
                .setAccessibilityText("스마트카드번호 확인방법 이미지"));
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_ASCENTER);
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_REMOTE);
            break;
        case "wifi":
            simpleResponse
                .setDisplayText("  \n네 알겠습니다. 화면에 보이는것처럼 무선 와이파이 연결을 시도해 보시기 바랍니다.")
                .setTextToSpeech(
                    "<speak><sub alias='네 알겠습니다. 화면에 보이는것처럼 무선 와이파이 연결을 시도해 보시기 바랍니다.'>1.리모컨 버튼의 홈버튼 클릭   \n2. 화면 상의  설정 클릭   \n3. 인터넷   \n4. 인터넷 연결 가이드   \n5. 무선인터넷 연결(WiFi)   \n6. 해당 WiFi 비밀번호 입력   \n7. 무선인터넷 연결</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wifi.mp3'></audio></speak>");
            basicCard.setTitle("무선(WIFI) 인터넷 연결 방법").setFormattedText("  \n1.리모컨 버튼의 홈버튼 클릭  \n2. 화면 상의  설정 클릭  \n3. 인터넷  \n4. 인터넷 연결 가이드  \n5. 무선인터넷 연결(WiFi)  \n6. 해당 WiFi 비밀번호 입력  \n7. 무선인터넷 연결");
            basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wifi.gif")
                .setAccessibilityText("무선(WIFI) 인터넷 연결 방법 이미지"));
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_LAN);
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_WPS);
            break;
        case "lan":
            simpleResponse
                .setDisplayText("  \n네 알겠습니다. 다음과 같이 유선 랜으로 인터넷 연결을 시도해 보시기 바랍니다.")
                .setTextToSpeech(
                    "<speak>><sub alias='네 알겠습니다. 다음과 같이 유선 랜으로 인터넷 연결을 시도해 보시기 바랍니다.'>1.리모컨 버튼의 홈버튼 클릭   \n2. 화면 상의  설정 클릭    \n3. 인터넷   \n4. 인터넷 연결 가이드   \n5. 유선 인터넷 연결(이더넷)</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/lan.mp3'></audio></speak>");
            basicCard.setTitle("유선(LAN) 인터넷 연결 방법").setFormattedText("  \n1.리모컨 버튼의 홈버튼 클릭  \n2. 화면 상의  설정 클릭   \n3. 인터넷  \n4. 인터넷 연결 가이드  \n5. 유선 인터넷 연결(이더넷)");
            basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/lan.gif")
                .setAccessibilityText("유선(LAN) 인터넷 연결 방법 이미지"));
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_WIFI);
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_WPS);
            break;
        case "wps":
            simpleResponse
                .setDisplayText("  \n네 알겠습니다. 무선 WPS 연결은 비밀번호 없이도  손쉽게 와이파이 연결이 가능한 방법이오니, 다음 설명을 잘 듣고 따라해 보시기 바랍니다.")
                .setTextToSpeech(
                    "<speak><sub alias='네 알겠습니다. 무선 WPS 연결은 비밀번호 없이도  손쉽게 와이파이 연결이 가능한 방법이오니, 다음 설명을 잘 듣고 따라해 보시기 바랍니다.'>1.리모컨 버튼의 홈버튼 클릭   \n2. 화면 상의  설정 클릭   \n3. 인터넷   \n4. 안드로이드 설정 바로가기   \n5. WPS를 통해 연결    \n6. 공유기의 WPS버튼 클릭</sub><audio src = 'https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wps.mp3'></audio></speak>");
            basicCard.setTitle("무선(WPS) 연결 방법").setFormattedText("  \n1.리모컨 버튼의 홈버튼 클릭  \n2. 화면 상의  설정 클릭  \n3. 인터넷  \n4. 안드로이드 설정 바로가기  \n5. WPS를 통해 연결   \n6. 공유기의 WPS버튼 클릭");
            basicCard.setImage(new Image().setUrl("https://actions.o2o.kr/content/new/Skylife-ServiceCenter/Ko/wps.gif")
                .setAccessibilityText("WPS 연결 방법 이미지"));
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_WIFI);
            suggestions.add(SkylifeServiceCenterWord.SUGGEST_GUIDE_TYPE_LAN);
            break;
        default:
            break;
    }

    suggestions.add(SkylifeServiceCenterWord.SUGGEST_TO_MOBILE);
    suggestions.add(SkylifeServiceCenterWord.SUGGEST_SUPPORT_FIND);

    rb.add(simpleResponse);
    rb.add(basicCard);
    rb.addSuggestions(suggestions.toArray(new String[suggestions.size()]));

    return rb.build();
}*/

module.exports = {
    guideFallback: guideFallback,
    guideFind: guideFind,
    guideRetry: guideRetry
}