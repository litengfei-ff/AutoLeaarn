

window.onload = function () {
    var backgroundMethod = chrome.extension.getBackgroundPage();

    document.getElementById('startLearn').onclick = function () {
        chrome.tabs.getSelected(function (tab) {
            backgroundMethod.startInterval(tab.id);
        });
    }

    document.getElementById('stopLearn').onclick = function () {
        backgroundMethod.stopInterval();
    }
 
}