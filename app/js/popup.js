// 메인 이미지 6개에 대응하는 span 태그 id 이름의 배열
var mainImageTitleName = ['listName', 'deleteName', 'lockName', 'saveName', 'folderName', 'setupName'];

// 메인 이미지 6개를 드래그 하지 못하도록 하는 함수
function mainImageDragSet(){
    for(var iCount = 0; iCount < mainImageName.length; iCount++){
        // draggable 라는 속성을 false로 설정합니다.
        $("#" + mainImageName[iCount]).prop('draggable', false);        
    }
};

// messages.json에 저장된 기능 설명값을 저장하는 함수
// function setMainImageTitleName(){
//     // common.js에 선언되어 있는 setFunctionName() 함수를 호출하여 주요 기능의 이름값이 저장된 배열을 반환받습니다.
//     var getFunctionNameArr = setFunctionName();

//     for(var iCount = 0; iCount < mainFunctionName.length; iCount++){        
//         $("#" + mainImageTitleName[iCount]).prop('innerHTML', getFunctionNameArr[iCount]);
//     }
// };

// 클릭하여 이동할 페이지 주소를 설정하는 함수
function setMovePage(){
    // select-area를 class로 가지는 모든 엘리먼트를 배열로 대입합니다.
    var getSelectAreaArr = $('.select-area');   

    // 클릭이벤트를 추가합니다.
    getSelectAreaArr.each(function(index){
        // console.log('move number');
        // console.log(index);
        console.log($(this));


        $(this).on('click', function(){
            document.location.href = "app/html/view.html?page=" + index;

            console.log('move number');
            console.log(index);
        });
    });    
}

// 마우스가 이미지의 위에 있을 경우 이미지를 변경시키는 이벤트를 추가하는 함수
function changeImg(){
    // select-area를 class로 가지는 모든 엘리먼트를 배열로 대입합니다.
    var getSelectAreaArr = $('.select-area');

    // 마우스 이벤트를 추가합니다.
    getSelectAreaArr.each(function(index){
        // 이미지가 변경되기전 src값을 구합니다.
        var beforeImgName = $('#' + mainImageName[index]).attr('src');
        // 변경될 이미지의 src값을 구합니다.
        var afterImgName = $('#' + mainImageName[index]).attr('src').split('.')
        afterImgName = afterImgName[0] + '_change.png';
        
        // jQuery로 이미지 엘리먼트를 구합니다.
        var $imgObj = $('#' + mainImageName[index]);

        // 마우스가 위에 있을때 실행 될 이벤트를 추가합니다.
        $(this).on('mouseover', function(){
            // console.log('----- over -----' + index);
            $imgObj.attr('src', afterImgName);
        });

        // 마우스가 위에서 벗어 났을때 실행 될 이벤트를 추가합니다.
        $(this).on('mouseout', function(){
            // console.log('&&&&& out &&&&&' + index);
            $imgObj.attr('src', beforeImgName);
        });
    });
}


// 이미지를 포함한 모든 요소들이 로드 완료되면 실행
$(window).on('load', function(){
    // 메인 이미지 6개를 드래그 하지 못하도록 하는 함수
    mainImageDragSet();
    // common.js에 선언되어 있는 setFunctionName() 함수를 호출하여 주요 기능의 이름값이 저장된 배열을 반환받습니다.
    setFunctionName(mainImageTitleName);
    // 마우스가 이미지의 위에 있을 경우 이미지를 변경시키는 이벤트를 추가하는 함수
    changeImg();
    // 클릭하여 이동할 페이지 주소를 설정하는 함수
    setMovePage();
});