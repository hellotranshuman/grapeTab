console.log('Welcome to background.js');

// 가장 먼저 실행되는 초기화 작업을 수행하는 함수로 
// key값을 저장하는 배열이 존재하지 않을 경우 생성합니다.
function init(){
    chrome.storage.sync.get(['saveTabKeys'], function(result){
        console.log('save tab keys start-- : ' + result);
        console.log(result);
        
        // saveTabKeys 값이 저장되어 있지 않은 경우 빈배열로 초기화합니다.
        if(result['saveTabKeys'] === undefined){
            var keyArray = {};
            keyArray['saveTabKeys'] = [];

            chrome.storage.sync.set(keyArray, function(result){
                console.log('save tab keys set?');
                console.log(result);
            });
        }
    })
}

init();



// var tabToUrl = {};

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     // Note: this event is fired twice:
//     // Once with `changeInfo.status` = "loading" and another time with "complete"
//     tabToUrl[tabId] = tab.url;
// });

// tab이 삭제되면 실행되는 이벤트
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    console.log('@@@@@ onRemoved event~~ @@@@@')
    console.log(tabId);
    console.log(removeInfo);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    // console.log(chrome.tabs.get(tabId));

    // chrome.tabs.create();
});




/*
※삭제 기능 구현
1. 삭제 버튼에서 삭제를 클릭하고 삭제되는 tab의 정보를 background.js로 전달함
2. background.js는 전달받은 tab의 정보를 local storage에 저장함
3. 해당 tab의 정보를 읽어와 삭제된 tab 리스트를 출력함
4. 삭제된 tab을 클릭하면 create(tab.url) 메서드를 활용하여 다시 생성시킴
*/

// save할 tab을 저장하는 함수
function setSaveTab(tabObj){
    console.log('~~~~~ setSaveTab function start ~~~~~');
    console.log(tabObj);


    var tabKey = tabObj['key'];
    console.log('tabKey check ~~~~~~~~!!!!!!!!!!!!!!!');
    console.log(tabKey);


    // 저장할 tab 정보가 저장될 변수
    var saveTabObj = {};
    saveTabObj[tabKey] = JSON.stringify(tabObj);


    // save할 tab 정보를 저장합니다.
    chrome.storage.sync.set(saveTabObj, function(){
        console.log('~~~~~ setSaveTab function Set ~~~~~');
    });

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ saveTabObj test ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(saveTabObj);
    console.log(tabKey);



    // 저장되었는지 확인
    chrome.storage.sync.get(tabKey, function(result){

        console.log('haha');
        console.log(result);
        console.log(result[tabKey]);

        var tabObjValue = JSON.parse(result[tabKey]);

        console.log('save tab success????????');
        console.log(tabObjValue);
        console.log(tabObjValue['url']);

        // 저장에 성공하였을 경우 key값을 추가하여 저장합니다.
        if(tabObjValue['url']){
            chrome.storage.sync.get(['saveTabKeys'], function(result){
                console.log(result['saveTabKeys']);
                console.log(typeof result['saveTabKeys']);
                console.log(tabObjValue['key']);

                // key값이 들어 있는 배열을 구한 뒤 현재 save할 tab의 key값을 저장합니다.
                var keyArray = result['saveTabKeys'];
                keyArray.push(tabObjValue['key'])

                // storage에 저장되어 있는 saveTabKeys를 key로 하는 배열을 구한 뒤 key값이 들어 있는 배열을 저장합니다.
                var keyObj = {};
                keyObj['saveTabKeys'] = keyArray

                console.log(keyObj);

                // 새로운 key값이 추가된 배열을 저장합니다.
                chrome.storage.sync.set(keyObj, function(){
                    console.log('new key array insert success ~~');
                });
            });
            console.log('key array push end --');
        }
    })
}

// Message를 얻습니다.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('$$$ Save Button onMessage $$$');

        var requestObj = JSON.parse(request);
        console.log(requestObj);

        // save tab의 정보를 받았을 경우
        if(requestObj['saveTab']){
            var saveTabObj = {};
            saveTabObj['favicon']   = requestObj['favIconUrl'];     // favicon의 url 값을 저장합니다.
            saveTabObj['url']       = requestObj['url'];            // url 값을 저장합니다.
            saveTabObj['title']     = requestObj['title'];          // title 값을 저장합니다.
            saveTabObj['key']       = requestObj['key'];            // key 값을 저장합니다.

            // 중복된 탭이 저장되지 않도록 합니다, 중복된 탭일 경우 경고문을 출력하고 중복이지 않을 경우 해당 탭을 추가합니다.
            chrome.storage.sync.get(['saveTabKeys'], function(result){
                if(result['saveTabKeys'].includes(saveTabObj['key'])){
                    console.log('The tab already exists!');
                    alert('The tab already exists!');
                    // $('<div>').alert();
                    
                    // $('div').append($('<div>', {
                    //     class : 'alert alert-primary',
                    //     role : 'alert'
                    // }));

                } else {
                    console.log('add tab!!');
                    // save할 tab을 저장하는 함수 
                    setSaveTab(saveTabObj);
                }
            })
        } else {
            console.log('save tab info false!!');
        }

        console.log('$$$ end onMessage end $$$');
});


// 실행중인 Tab를 구하는 함수
// function getTabs(){
//     chrome.tabs.query({
//         //  ----- currentWindow: true,// windowType: 'normal' -----
//     },function(tabs) {
//         alert('chrome.tabs.query() ing~~');
        
        
//         return JSON.stringify(tabs);
//     })
// }