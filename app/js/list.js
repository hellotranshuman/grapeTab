function getAllTabList() {
    // 모든 탭의 정보를 구합니다.
    chrome.tabs.query({
        //  ----- currentWindow: true,// windowType: 'normal' -----
    }, function(tabs) {
        // <link rel="shortcut icon" href="path/to/favicon.ico">
        
        // 탭번호를 나타낼 변수
        var count = 1;

        for (let tab of tabs) {
            // favicon이 설정되어 있지 않는 경우 default값을 대입합니다.
            if(tab.favIconUrl == undefined)
                tab.favIconUrl = "../img/default_favicon.png";

            console.log('-------------- : ' + tab.favIconUrl);

            // tab.url requires the `tabs` permission
            console.log(tab);
            $('#tabListBody').append("<tr>");
            $('#tabListBody').append("<th scope='row'>"+ (count++) +"</th>");
            $('#tabListBody').append("<td><img src=" + tab.favIconUrl + " width='24'></td>");
            // $('#tabListBody').append("<td class='text-truncate' style='max-width: 150px;'>" + tab.title.text() + "</td>"); // // style='max-width: 150px;'
            $('#tabListBody').append("<td class='text-truncate' id='" + (count + '-line') + "' style='max-width: 150px;'>" +  "</td>");

            // 탭 title 등록, 따로 등록하는 이유는 html 태그가 작동하지 않도록 text()함수를 사용하기 위해서입니다.
            $('#' + (count + '-line')).text(tab.title);
            
            $('#tabListBody').append("</tr>");
        }
    });
}


$(document).ready(function(){
    getAllTabList();

    console.log('list start');

    var background = chrome.extension.getBackgroundPage();

    console.log(background);
});

// DOM이 완전히 로드되면 이벤트 리스너를 추가합니다.
document.addEventListener('DOMContentLoaded', function(){
    // getAllTabList();
});