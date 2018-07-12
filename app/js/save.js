/*
1. background.js 에서 init()함수를 사용할 때 
   countObj['saveTabCount'] = 1;의 값을 countObj['saveTabCount'] = [1];로 변경하여
   배열로 값을 저장하도록 합니다.

2. 이후 saveTabCount과 관련된 모든 값은 배열을 저장하고 전달 받는 것으로 소스코드를 변경합니다.
   tab의 개수는 해당함수.length를 사용하면 된다. 
   값을 증가 시킬때는 array.slice(-1) 를 사용하여 
   마지막 항목의 값을 구해 해당 값을 이용하면 된다.

3. save.js에서 createSaveTabList(tabList) 함수 안에서 
   $.each를 반복할때 index가 사용되는데 해당 인덱스는 
   숫자가 하나씩 증가하는 것 뿐이므로 여기서는 index대신에 
   saveTabCount 배열 안에 있는 값을 하나씩 사용해야 됩니다.

*/

// 동적으로 tab 목록을 생성하는 함수
function createSaveTabList(keyArray, tabObj){
    console.log('★★★★★ save.js start ★★★★★');
    // console.log(keyArray);
    // console.log(tabObj);
    
    $.each(tabObj, function(index){
        // console.log('-------------------------------------------------- create save tab start');
        // console.log(index);
        // console.log(tabObj);
        // console.log(this);

        var tabKey          = keyArray[index - 1];          // 현재 tab의 key값을 구합니다.
        var tabData         = JSON.parse(this[tabKey]);     // tab 정보를 객체로 변환하여 저장합니다.
        var tabTitle        = tabData['title'];             // tab의 타이틀
        var tabUrl          = tabData['url'];               // tabl의 url
        var tabFavIconUrl   = tabData['favicon'];           // tab의 favIconUrl

        console.log('this tab info ^^');
        console.log(tabData);

        // save tab 리스트를 동적으로 생성합니다.
        // tr태그를 생성합니다.
        $('#tabListBody').append($('<tr/>', {
            id : index + '-tr'
        }));

        // 생성한 tr태그 객체를 대입합니다.
        var $trTag = $('#' + index + '-tr');

        // 생성한 tr태그에 속성을 대입합니다.
        $trTag.attr('data-toggle', 'modal');
        $trTag.attr('data-target', '#' + index + '-row');

        // th태그를 생성합니다.
        $trTag.append($('<th/>', {
            text : index
        }));

        // favIcon이 출력될 td태그를 생성합니다.
        $trTag.append($('<td/>', {
            id : index + '-favIcon'
        }));

        // 생성한 td태그 안에 favIcon을 가지는 img태그를 추가합니다.
        $('#' + index + '-favIcon').append($('<img/>', {
            class   : 'favIcon-img',
            src     : tabFavIconUrl
        }));

        // title이 출력될 td태그를 생성합니다.
        $trTag.append($('<td/>', {
            class   : 'text-truncate tab-title-cell',
            id      : index + '-line',
            text    : tabTitle
        }));

        // url이 출력될 td태그를 생성합니다.
        $trTag.append($('<td/>', {
            class   : 'text-truncate tab-title-cell',
            id      : index + '-url',
            text    : tabUrl
        }));

        /************************* 여기서 부터 Modal 생성 *************************/

        // modal 관련 태그를 추가합니다.
        $('#modalArea').append($('<div/>', {
            class   : 'modal fade',
            id      : index + '-row',
            tabindex : '-1',
            role : 'dialog',
        }));

        // 생성한 div태그 객체를 대입합니다.
        var $modalDiv = $('#' + index + '-row');
  
        // 생성한 div태그에 속성을 대입합니다.
        $modalDiv.attr('aria-labelledby', index + '-modalTitle');
        $modalDiv.attr('aria-hidden', 'true');

        $modalDiv.append($('<div/>', {
            class   : 'modal-dialog modal-dialog-centered',
            id      : index + '-modalDialog',
            role : 'document',
        }));

        $('#' + index + '-modalDialog').append($('<div/>', {
            class   : 'modal-content',
            id      : index + '-modalContent',
        }));

        var $modalContent = $('#' + index + '-modalContent');

        $modalContent.append($('<div/>', {
            class   : 'modal-header',
            id      : index + '-modalHeader',
        }));

        var $modalHeader = $('#' + index + '-modalHeader');

        $modalHeader.append($('<h5/>', {
            class   : 'modal-title',
            id      : index + '-modalTitle',
        }));

        $modalTitle = $('#' + index + '-modalTitle');

        $modalTitle.append($('<img/>', {
            class   : 'favIcon-img',
            id      : index + '-modalFavIcon',
            src     : tabFavIconUrl
        }));

        $modalTitle.append($('<span/>', {
            text : ' ' + tabTitle
        }));

        // 상단 닫기 버튼
        $modalHeader.append($('<button/>', {
            class   : 'close',
            id      : index + '-topCloseBtn',
            type    : 'button',
        }));

        var $topCloseBtn = $('#' + index + '-topCloseBtn');

        $topCloseBtn.attr('data-dismiss', 'modal');
        $topCloseBtn.attr('aria-label', 'Close');

        $topCloseBtn.append($('<span/>', {
            id      : index + '-closeSpan',
            text : "X"
        }));
        $('#' + index + '-closeSpan').attr('aria-hidden', 'true');

        $modalContent.append($('<div/>', {
            class   : 'modal-body text-truncate',
            id      : index + '-modalBody',
        }));

        $modalBody = $('#' + index + '-modalBody');

        $modalBody.append($('<h3/>', {
            text : 'url'
        }));

        // modal 내용
        $modalBody.append($('<span/>', {
            text : tabUrl
        }));

        $modalContent.append($('<div/>', {
            class   : 'modal-footer',
            id      : index + '-modalFooter',
        }));

        var $modalFooter = $('#' + index + '-modalFooter');

        // Remove 버튼
        $modalFooter.append($('<button/>', {
            class   : 'btn btn-outline-danger border-0',
            id      : index + '-modalRemoveBtn',
            text    : 'Remove',
            type    : 'button',
            click   : function(e){
                console.log('save remove ~~~~~~~~~');


                getSaveTabKeyList().then(function(result) {
                    console.log('saveTab remove test.........................');
                    console.log(result);
                    console.log(index);

                    // save Tab의 개수를 변경하는 함수            saveTabCount
                    removeSaveTab(result, index);

                    return result;
                }, function(error) {
                    console.log(error);
                }).then(function(tabKeyArr) {
                    console.log('※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※ next2 start ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※');
                
                    // storage에 저장된 key값을 배열에서 제거하는 함수
                    removeSaveTabKey(tabKeyArr, index);
                
                    console.log('※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※ next2 end ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※');
                }, function(err){
                    console.log(err)
                }).then(function(){
                    // tab 목록 새로고침
                    window.location.reload();
                }, function(err){
                    console.log(err)
                });
            }
        }));

        // Create 버튼
        $modalFooter.append($('<button/>', {
            class   : 'btn btn-outline-success border-0',
            id      : index + '-modalCreateBtn',
            text    : 'Create',
            type    : 'button',
            click   : function(e){
                console.log('save create ~~~~~~~~~');
                // 새로운 tab을 생성합니다.
                chrome.tabs.create({
                    url: tabUrl,
                    active: false
                });
            }
        }));

        // modal 닫기 버튼
        $modalFooter.append($('<button/>', {
            class   : 'btn btn-outline-dark border-0',
            id      : index + '-modalCloseBtn',
            text    : 'Close',
            type    : 'button'
        }));
        $('#' + index + '-modalCloseBtn').attr('data-dismiss', 'modal');
    });

    console.log('sava.js end');
}

// storage에서 지정된 tab의 정보를 제거합니다.
function removeSaveTab(saveTabKeyArr, index){
    chrome.storage.sync.remove(saveTabKeyArr[index - 1], function(result){
        console.log('-- save button remove success --');
        console.log(result); 
    });
}

// storage에 저장된 key값을 제거하는 함수
function removeSaveTabKey(saveTabKeyArr, index){
    console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ remove button start');
    console.log(saveTabKeyArr);
    console.log(index);

    var removeKeyIndex = index - 1; // 배열에서 삭제할 key값이 들어있을 index번호

    chrome.storage.sync.remove(saveTabKeyArr[removeKeyIndex], function(result){
        console.log('-- save button remove success --');
        console.log(result);
    });
    

    var newKeyArray = saveTabKeyArr;
    var removeKeyArray = saveTabKeyArr.splice(removeKeyIndex, 1);



    console.log('----- remove key array -----------------------------!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(newKeyArray);
    console.log(removeKeyArray);


    // 지정된 값을 배열에서 제거

    var keyArray = {};
    keyArray['saveTabKeys'] = newKeyArray;

    chrome.storage.sync.set(keyArray, function(){
        console.log('insert new keyArray ###################################');
    });
}


////////////// 아래 함수 문제 발생, key값이 변경되어 tab 목록을 제대로 가지고 올 수 없음

// tab 목록을 구하는 함수
function getSaveTabList(keyArray){
    var tabObjList = {};

    console.log('*** getSaveTabList start---- ');
    console.log(keyArray);
    console.log(keyArray.length);

    // JSON값을 변환할때 사용되는 변수
    var JSONCount = 1;

    try{
        // save tab들을 구합니다.
        for(var iCount = 0; iCount < keyArray.length; iCount++){
            // iCount를 문자열로 변환합니다.
            // var countValue = String([iCount]);

            // tab의 정보를 구합니다.
            chrome.storage.sync.get(keyArray[iCount], function(result){
                // console.log('getSaveTabList function tab print ---------');
                // console.log(result);
                tabObjList[JSONCount] = result;
                JSONCount++;
            })
        }
    } catch(err){
        console.log('-- getSaveTabList function error --');
    }



    console.log('getSaveTabList return value ------');
    console.log(tabObjList);

    // tab 목록을 반환합니다.
    return tabObjList;
}


// save Tab의 개수를 구합니다. (jQuery promise 문법 사용)
function getSaveTabKeyList (){
    var deferred = $.Deferred();
    
    try{
        chrome.storage.sync.get(['saveTabKeys'], function(result){
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ key test');
            console.log(result);
            console.log(result['saveTabKeys'].length);

            deferred.resolve(result['saveTabKeys']);
        })

    } catch(err){
        console.log('-- getSaveTabKeyList function error --');
        deferred.reject();
    }

    return deferred.promise();
}

// DOM 생성된 후 실행
$(document).ready(function(){
    console.log('ready');

    // tab 정보를 구하여 tab list를 출력합니다. (jQuery promise 문법 사용)
    // 1. tab 개수를 구합니다. (비동기 함수)
    // 2. tab의 정보를 구합니다. (비동기 함수)
    // 3. tab 목록을 생성합니다.
    getSaveTabKeyList().then(function(result) {
        // JSON 문자열로 이루어진 tabs 정보를 반환합니다.
        return [result, getSaveTabList(result)];
    }, function(error) {
        console.log(error);
    }).then(function(tabObj) {
        console.log('※※※ next start ※※※');
        console.log(tabObj);
     
        // tab list를 생성하는 함수 (매개변수 값 : keyArray, tabObj)
        createSaveTabList(tabObj[0], tabObj[1]);
    
        console.log('※※※ next end ※※※');
    }, function(err){
        console.log(err)
    });
});

// 이미지를 포함한 모든 요소들이 로드 완료되면 실행
$(window).on('load', function(){
    console.log('load');



    // chrome.storage.sync.remove(['saveTabKeys'], function(result){
    //     console.log('-- save button remove success --');
    //     console.log(result);
    // })

    chrome.storage.sync.get(null, function(result){
        console.log('~~~~~ save data check ~~~~~');
        console.log(result);
    })




    // chrome.storage.sync.get(['saveTabKeys'], function(result){
    //     console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ key test');
    //     console.log(result);
    //     console.log(result['saveTabKeys'].length);
    // })
});