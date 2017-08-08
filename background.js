(function () {

    var timer = 0;
    function startInterval(tabId) {
        stopInterval();
        timer = setInterval(function () {

            chrome.tabs.sendRequest(tabId, { action: "startLearn" }, function (response) {
                if (response != null && response.isShowVerity != undefined) {
                    console.log("yes");
                    chrome.browserAction.setBadgeText({ tabId: tabId, text: 'y:' + new Date().getSeconds() });
                    chrome.tabs.reload(tabId);
                }
                else {
                    console.log("no");
                    chrome.browserAction.setBadgeText({ tabId: tabId, text: 'n:' + new Date().getSeconds() });
                }
            });

        }, 15 * 1000);
    }

    function stopInterval() {
        clearInterval(timer);
    }

    window.startInterval = startInterval;
    window.stopInterval = stopInterval;

})()