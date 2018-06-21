// 메인 이미지 6개에 대응하는 span 태그 id 이름의 배열
var navBarNameArr = ['listNav', 'deleteNav', 'lockNav', 'saveNav', 'folderNav', 'setupNav'];

// 네비게이션바에 click에 따른 페이지이동 이벤트를 추가하는 함수
function moveContentPage() {
    // jQuery로 네비게이션 바의 Element를 찾는데 사용될 문자열이 저장될 배열
    var setNavNameStr = '';

    // jQuery로 네비게이션 바의 Element를 찾는데 사용될 문자열을 저장합니다.
    // 가장 마지막의 경우 , 를 붙이지 않도록 합니다. (jQuery문법상의 이유)
    for(var iCount = 0; iCount < navBarNameArr.length; iCount++){
        if(iCount == navBarNameArr.length - 1){
            setNavNameStr += '#' + navBarNameArr[iCount];
        } else {
            setNavNameStr += '#' + navBarNameArr[iCount] + ',';
        }
    }

    // 네비게이션 바의 원소를 jQuery형 배열로 대입합니다.
    navAreaArr = $(setNavNameStr);

    // 네비게이션바에 해당하는 페이지로 이동하는 click이벤트를 추가합니다.
    navAreaArr.each(function(index){
        $(this).on('click', function(){
            $('#iframeContentArea').attr('src', './' + mainImageName[index] + '.html');
        });
    });   
}

// popup.html에서 선택한 것에 맞게 view.html 페이지가 출력되도록 하는 함수
// 1. 전달된 파라미터 획득, 2. 파라미터 값에 해당하는 네비게이션바 및 iframe src 설정
function setNavMovePage(){
    var sendParameter = null;
    
    // 참고 전달받은 값 내역 [전달받을 값 : 나타내는 페이지] 
    // -> [0:list], [1:delete], [2:lock], [3:save], [4:folder], [5:setup]
    var getParameter = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );

    console.log('get parameter');
    console.log(getParameter);

    // popup.js에서 선택한 것에 해당하는 네비게이션바가 활성화되도록 class값을 변경합니다.
    $('#' + navBarNameArr[getParameter]).attr('class', 'nav-item nav-link active');

    // popup.js에서 선택한 것에 맞추어 view.html의 iframe에 출력할 페이지 url을 변경합니다.
    $('#iframeContentArea').attr('src', './' + mainImageName[getParameter] + '.html');
}

// 이미지를 포함한 모든 요소들이 로드 완료되면 실행
$(window).on('load', function(){
    // common.js에 선언되어 있는 setFunctionName() 함수를 호출하여 주요 기능의 이름값이 저장된 배열을 반환받습니다.
    setFunctionName(navBarNameArr);

    // 네비게이션바에 click에 따른 페이지이동 이벤트를 추가하는 함수
    moveContentPage();

    // popup.html에서 선택한 것에 맞게 view.html 페이지가 출력되도록 하는 함수
    setNavMovePage();
});