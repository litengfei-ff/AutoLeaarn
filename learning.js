
// 和真实的tab内容进行交互  放到配置文件的contentscript中


chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "startLearn") {

            // 验证弹窗是否出现
            var verify = document.getElementById("layui-layer1")
                || document.getElementById("layui-layer2")
                || document.getElementById("preventCheatDialog");
            var result = {};
            result.isShowVerity = verify || undefined;

            // 添加学习完成之后 自动进行下一节学习的功能
            var chapterList = document.getElementsByClassName("cl-catalog-link");
            var nextChapterIndex = 0;
            for (var i = 0; i < chapterList.length; i++) {
                var chapter = chapterList[i];
                if (chapter.classList.contains("cl-catalog-link-done")) {
                    nextChapterIndex = i + 1;
                }
            }
            if (nextChapterIndex == chapterList.length) {
                // 全部学完 弹出通知
                if (window.Notification) {
                    if (Notification.Permission === 'granted') {
                        var notification = new Notification('Hello', { body: "Learning Finished!" });

                    } else {
                        window.Notification.requestPermission(function (status) {
                            Notification.permission = status;
                            var notification = new Notification('Hello', { body: "Learning Finished!" });
                        });
                    };
                } else alert('你的浏览器不支持此特性，请下载谷歌浏览器试用该功能');
            }
            else {
                // 没有在学习中 则进行学习
                if (!chapterList[nextChapterIndex].classList.contains("cl-catalog-playing")) {
                    chapterList[nextChapterIndex].click();
                }
            }
            sendResponse(result);
        }
    }
)


