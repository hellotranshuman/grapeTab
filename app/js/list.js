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
            if(tab.favIconUrl == undefined){
                tab.favIconUrl = "../img/default_favicon.png";
            }
            
            var tabTitle        = tab.title;        // tab의 타이틀
            var tabUrl          = tab.url;          // tabl의 url
            var tabFavIconUrl   = tab.favIconUrl;   // tab의 favIconUrl

            // tr태그를 생성합니다.
            $('#tabListBody').append($('<tr/>', {
                id : count + '-tr'
            }));

            // 생성한 tr태그 객체를 대입합니다.
            var $trTag = $('#' + count + '-tr');

            // 생성한 tr태그에 속성을 대입합니다.
            $trTag.attr('data-toggle', 'modal');
            $trTag.attr('data-target', '#' + count + '-row');

            // th태그를 생성합니다.
            $trTag.append($('<th/>', {
                text : count
            }));

            // favIcon이 출력될 td태그를 생성합니다.
            $trTag.append($('<td/>', {
                id : count + '-favIcon'
            }));

            // 생성한 td태그 안에 favIcon을 가지는 img태그를 추가합니다.
            $('#' + count + '-favIcon').append($('<img/>', {
                class   : 'favIcon-img',
                src     : tabFavIconUrl
            }));

            // title이 출력될 td태그를 생성합니다.
            $trTag.append($('<td/>', {
                class   : 'text-truncate tab-title-cell',
                id      : count + '-line',
                text    : tabTitle
            }));

            // url이 출력될 td태그를 생성합니다.
            $trTag.append($('<td/>', {
                class   : 'text-truncate tab-title-cell',
                id      : count + '-url',
                text    : tabUrl
            }));

            // modal 관련 태그를 추가합니다.
            $('#modalArea').append($('<div/>', {
                class   : 'modal fade',
                id      : count + '-row',
                tabindex : '-1',
                role : 'dialog',
            }));

            // 생성한 div태그 객체를 대입합니다.
            var $modalDiv = $('#' + count + '-row');
      
            // 생성한 div태그에 속성을 대입합니다.
            $modalDiv.attr('aria-labelledby', count + '-modalTitle');
            $modalDiv.attr('aria-hidden', 'true');

            $modalDiv.append($('<div/>', {
                class   : 'modal-dialog modal-dialog-centered',
                id      : count + '-modalDialog',
                role : 'document',
            }));

            $('#' + count + '-modalDialog').append($('<div/>', {
                class   : 'modal-content',
                id      : count + '-modalContent',
            }));

            var $modalContent = $('#' + count + '-modalContent');

            $modalContent.append($('<div/>', {
                class   : 'modal-header',
                id      : count + '-modalHeader',
            }));

            var $modalHeader = $('#' + count + '-modalHeader');

            $modalHeader.append($('<h5/>', {
                class   : 'modal-title',
                id      : count + '-modalTitle',
            }));

            $modalTitle = $('#' + count + '-modalTitle');

            $modalTitle.append($('<img/>', {
                class   : 'favIcon-img',
                id      : count + '-modalFavIcon',
                src     : tabFavIconUrl
            }));

            $modalTitle.append($('<span/>', {
                text : ' ' + tabTitle
            }));

            // 상단 닫기 버튼
            $modalHeader.append($('<button/>', {
                class   : 'close',
                id      : count + '-topCloseBtn',
                type    : 'button',
            }));

            var $topCloseBtn = $('#' + count + '-topCloseBtn');

            $topCloseBtn.attr('data-dismiss', 'modal');
            $topCloseBtn.attr('aria-label', 'Close');

            $topCloseBtn.append($('<span/>', {
                id      : count + '-closeSpan',
                text : "X"
            }));
            $('#' + count + '-closeSpan').attr('aria-hidden', 'true');

            $modalContent.append($('<div/>', {
                class   : 'modal-body text-truncate',
                id      : count + '-modalBody',
            }));

            $modalBody = $('#' + count + '-modalBody');

            $modalBody.append($('<h3/>', {
                text : 'url'
            }));

            // modal 내용
            $modalBody.append($('<span/>', {
                text : tabUrl
            }));

            $modalContent.append($('<div/>', {
                class   : 'modal-footer',
                id      : count + '-modalFooter',
            }));

            var $modalFooter = $('#' + count + '-modalFooter');

            $modalFooter.append($('<button/>', {
                class   : 'btn btn-outline-dark',
                id      : count + '-modalCloseBtn',
                text    : 'Close',
                type    : 'button'
            }));
            $('#' + count + '-modalCloseBtn').attr('data-dismiss', 'modal');

            $modalFooter.append($('<button/>', {
                class   : 'btn btn-primary',
                id      : count + '-modalTestBtn',
                text    : 'test~~',
                type    : 'button'
            }));

            // copy 버튼
            $modalFooter.append($('<button/>', {
                class   : 'btn btn-outline-success copyBtn',
                id      : count + '-modalCopyBtn',
                text    : 'Copy',
                type    : 'button',
                click   : function(e){

                    var copyElement = $("<input id='input' value='" + tab.url + "' type='text'/>");
                    $('body').append(copyElement);
                    copyElement.select();
                    document.execCommand("copy");
                    copyElement.remove();
                }
            }));
         
            // count값을 증가시킵니다.
            count++;
        }
    });
}


// background.js 관련
// var test = chrome.runtime.getBackgroundPage(page => {
//     console.log(page);
//     page.foo("send data @@@");
//     console.log(page.foo());
// });


// bootstrap modal을 강제로 focus 하는 함수를 초기화 합니다. (copy 버튼을 구현하기 위해 필요)
$.fn.modal.Constructor.prototype._enforceFocus = function() {};

// DOM 생성된 후 실행
$(document).ready(function(){
    console.log('ready');
    
    // 동적으로 tab 목록을 생성하는 함수
    getAllTabList();


});

// 이미지를 포함한 모든 요소들이 로드 완료되면 실행
$(window).on('load', function(){
    console.log('load');

});