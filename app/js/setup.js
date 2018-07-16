// _locales에 있는 json 파일에서 브라우저의 설정에 따라 해당하는 언어로 된 문자값을 받아 초기화합니다.
function initString(){
    // setup_description를 key로 하여 message.json에 저장된 문자열을 구합니다.
    var setupDescriptionTitle = chrome.i18n.getMessage("setup_description");

    // 설정페이지 최상단에 해당 문자열을 출력시킵니다.
    $('#setupDescriptionTitle').prop('innerHTML', setupDescriptionTitle);
    // 해당 문자열을 모달 버튼에 출력시킵니다.
    $('#instructionModal').prop('innerHTML', setupDescriptionTitle);
    // 해당 문자열을 출력된 모달의 제목으로 출력시킵니다.
    $('#setupModalTitle').prop('innerHTML', setupDescriptionTitle);

    // setup_description_contents를 key로 하여 message.json에서 프로그램에 대한 설명이 적혀 있는 문자열을 구합니다.
    var setupDescriptionContents = chrome.i18n.getMessage("setup_description_contents");

    // 구한 문자열에서 +가 적혀 있는 값을 <br>로 변경합니다.
    var descriptionContentsArr = setupDescriptionContents.replace(/[+]/gi, '<br>');

    // setup의 사용 설명을 출력하는 모달의 내용을 초기화합니다.
    $('#setupModalBody').prop('innerHTML', descriptionContentsArr);
}

// DOM 생성된 후 실행
$(document).ready(function(){
    // console.log('ready');

    initString();
});

// 이미지를 포함한 모든 요소들이 로드 완료되면 실행
$(window).on('load', function(){
    // console.log('load');

    // CSS로 투명도가 0인 값을 1로 변경하면서 fadeIn을 실시하는 함수
    $('.tableMainContain').animate({'opacity':'1'}, 500);
});