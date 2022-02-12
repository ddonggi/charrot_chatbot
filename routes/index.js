const express = require('express');
const {WebhookClient} = require("dialogflow-fulfillment");
const { defaultWelcome, defaultFallback } = require("./intents/welcomeExit");
const {
    guideFallback,
    guideFind,
    guideRetry
} = require("./intents/guide");
const {
    supportFallback,
    supportCheckStatus,
    supportFindSymptom,
    supportResolutionNotWork,
    supportRetry
} = require("./intents/support");

const { test } = require("./intents/test");

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'O2O Chatbot'});

});

router.post("/skylifeservice", express.json(), (req, res) => {
    const agent = new WebhookClient({request: req, response: res});
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", defaultWelcome);
    intentMap.set("test", test);
    intentMap.set("Default Fallback Intent", defaultFallback);

    intentMap.set("guide-fallback", guideFallback);
    intentMap.set("guide-find", guideFind); //유선, 무선인터넷,콜센터, 와이파이,스마트카드번호, 인터넷
    // intentMap.set("guide-find.option", guideFindOption);
    // intentMap.set("guide-resume", guideResume); // slot filling x
    intentMap.set("guide-retry", guideRetry); //잘 안들렸어, 다시 말해봐

    intentMap.set("support-check.status", supportCheckStatus);

    intentMap.set("support-fallback", supportFallback);
    intentMap.set("support-find.symptom", supportFindSymptom); //안나와요,깜빡여요,화면이 이상해요
    intentMap.set("support-resolution.notwork", supportResolutionNotWork); //이상해요,똑같아요 ,여전히 안돼요
    // intentMap.set("support-resume", supportResume); //slot filling
    intentMap.set("support-retry", supportRetry); //잘 안들렸어, 다시 말해봐

    agent.handleRequest(intentMap);
});

module.exports = router;
