// 메인 이미지 3개의 id 이름의 배열, popup.js 및 view.js 에서 사용됨
var mainImageName = ['list', 'save', 'setup'];

// messages.json에 저장된 3개 주요 기능의 설명이 저장된 값의 배열
var mainFunctionName = ['list_function_name', 'save_function_name', 'setup_function_name'];

// messages.json에 저장된 기능 설명값을 가져와 매개변수로 주어진 변수의 원소에 들어있는 엘리먼트에 값을 저장하는 함수
function setFunctionName(dataArray) { 
    for(var iCount = 0; iCount < mainFunctionName.length; iCount++){        
        $("#" + dataArray[iCount]).prop('innerHTML', chrome.i18n.getMessage(mainFunctionName[iCount]));
    }
};