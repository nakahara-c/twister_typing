let isTwister = false;
const isTwisterSelect = document.getElementById('isTwister');
isTwisterSelect.addEventListener('change', () => {
    isTwister = isTwisterSelect.value === 'ノーマル' ? false : true;
});
isTwisterSelect.addEventListener('change', init);
isTwisterSelect.addEventListener('change', main);

let wordAllCount = 10;

const wordCountSelect = document.getElementById('typeCount');
wordCountSelect.addEventListener('change', () => {
    wordAllCount = Number(wordCountSelect.value);
});
wordCountSelect.addEventListener('change', init);
wordCountSelect.addEventListener('change', main);


let randTmp = 100;
let timerArray = new Array();

let isSuccessed = false;

let keyPressed = new Object();

//window.addEventListener('click', stopInterval);

const keysSelect = document.getElementById('keysCount');
let keysCount = 3;

const progress = document.getElementById('progress');
progress.max = wordAllCount;

//ページを開いてすぐの処理
window.addEventListener('DOMContentLoaded', () => {
    generateButtons(keysCount);
    const nxt = document.querySelectorAll('.nxt');
    let lis = getRandomAlphabets(keysCount);
    for (let i = 0; i < keysCount; i++) {
        nxt[i].textContent = lis[i].toUpperCase();
    }
    const nxtnxt = document.querySelectorAll('.nxtnxt');
    lis = getRandomAlphabets(keysCount);
    for (let i = 0; i < keysCount; i++) {
        nxtnxt[i].textContent = lis[i].toUpperCase();
    }

    main();

});

keysSelect.addEventListener('change', init);
keysSelect.addEventListener('change', main);

function init() {

    stopInterval();

    const d = document.getElementById('next');
    const d2 = document.getElementById('nextnext');
    const p = document.getElementById('pressedKeys');
    while (d.firstChild) {
        d.removeChild(d.firstChild);
        d2.removeChild(d2.firstChild);
        p.removeChild(p.firstChild);
    }
    const keysSelect = document.getElementById('keysCount');
    keysCount = keysSelect.value;
    generateButtons(keysCount);
    const nxt = document.querySelectorAll('.nxt');
    const nxtnxt = document.querySelectorAll('.nxtnxt');
    let lis; let lis2;

    if (!isTwister) {
        lis = getRandomAlphabets(keysCount);
        lis2 = getRandomAlphabets(keysCount);
        for (let i = 0; i < keysCount; i++) {
            nxt[i].textContent = lis[i].toUpperCase();
            nxtnxt[i].textContent = lis2[i].toUpperCase();
        }

    } else {

        let rand = Math.floor(Math.random() * keysCount);
        randTmp = rand;

        for (let i = 0; i < keysCount; i++) {
            lis = getRandomAlphabets(keysCount);

            nxt[i].classList.remove('is-warning');
            nxtnxt[i].classList.remove('is-warning');
            nxt[i].classList.remove('is-danger');
            nxtnxt[i].classList.remove('is-danger');

            nxt[i].textContent = lis[i].toUpperCase();
            nxt[i].classList.add('is-danger');
            nxtnxt[i].textContent = lis[i].toUpperCase();
            nxtnxt[i].classList.add('is-danger');
        }
        for (let i = 0; i < 100; i++) {
            nxtnxt[rand].textContent = getRandomAlphabets(1)[0].toUpperCase();
            if (nxt[rand].textContent !== nxtnxt[rand].textContent) {
                //nxtnxtの中で重複がないかチェック
                let flag = true;
                for (let j = 0; j < keysCount; j++) {
                    if (nxtnxt[rand].textContent === nxtnxt[j].textContent && rand !== j) {
                        flag = false;
                    }
                }
                if (flag === true) break;
            }
        }

        nxtnxt[rand].classList.remove('is-danger');
        nxtnxt[rand].classList.remove('is-warning');
        nxtnxt[rand].classList.add('is-warning');
        nxt[rand].classList.remove('is-danger');
        nxt[rand].classList.remove('is-warning');
        nxt[rand].classList.add('is-warning');

    }

    const timer = document.getElementById('timer');
    timer.textContent = '0.0';
    progress.value = 0;
    progress.max = wordAllCount;

}


function generateButtons(cnt) {

    const d = document.getElementById('next');
    const d2 = document.getElementById('nextnext');

    for (let i = 0; i < cnt; i++) {
        let b = document.createElement('button');
        b.classList.add('button');
        b.classList.add('nxt');
        b.style.fontSize = '2em';

        d.appendChild(b);
    }

    for (let i = 0; i < cnt; i++) {
        let b = document.createElement('button');
        b.classList.add('button');
        b.classList.add('nxtnxt');
        b.style.fontSize = '2em';

        d2.appendChild(b);
    }

    const p = document.getElementById('pressedKeys');
    for (let i = 0; i < cnt; i++) {
        let b = document.createElement('button');
        b.classList.add('button');
        b.classList.add('keys');
        b.classList.add('is-primary');
        b.style.fontSize = '2em';
        b.textContent = '-';

        p.appendChild(b);
    }

}



function generateWord() {

    let words = new Array(wordAllCount);
    for (let i = 0; i < wordAllCount; i++) words[i] = new Array(keysCount);

    for (let i = 0; i < wordAllCount; i++) {
        let lis = getRandomAlphabets(keysCount);
        for (let j = 0; j < keysCount; j++) {
            words[i][j] = lis[j];
        }

    }

    const nxt = document.querySelectorAll('.nxt');
    const nxtnxt = document.querySelectorAll('.nxtnxt');

    if (!isTwister) {
    for (let i = 0; i < keysCount; i++) {
        nxt[i].textContent = words[0][i].toUpperCase();
        nxtnxt[i].textContent = words[0][i].toUpperCase();
    }
    } else {
        let rand = Math.floor(Math.random() * keysCount);
        randTmp = rand;

        for (let i = 0; i < keysCount; i++) {
            nxt[i].textContent = words[0][i].toUpperCase();
            nxtnxt[i].textContent = words[0][i].toUpperCase();
        }
        nxtnxt[rand].textContent = getRandomAlphabets(1)[0].toUpperCase();

    }

    return words;
}



function judge(k) {
    let shouldPress = document.getElementsByClassName('nxt');
    let arr = new Array();
    for (let i = 0; i < keysCount; i++) {
        arr.push(shouldPress[i].textContent);
    }
    for (let i = 0; i < keysCount; i++) {
        if (k === arr[i]) {
            return i;
        }
    }
    return false;
}

function success() {
    if (progress.value === 0) {
    timerArray.push(setInterval(startTimer, 100));
    }
    progress.value += 1;
    

    //ワードを置き換える処理
    const nxt = document.querySelectorAll('.nxt');
    const nxtnxt = document.querySelectorAll('.nxtnxt');
    let nextChars = getRandomAlphabets(keysCount);
    if (!isTwister) {
        for (let i = 0; i < keysCount; i++) {
            nxt[i].textContent = nxtnxt[i].textContent;
            nxtnxt[i].textContent = nextChars[i].toUpperCase();
            //nxt[i].classList.add('slide-fade');
        }
    } else {
        
        let rand = Math.floor(Math.random() * keysCount);
        randTmp = rand;

        for (let i = 0; i < keysCount; i++) {
            nxt[i].textContent = nxtnxt[i].textContent;

            nxt[i].classList.remove('is-warning');
            nxtnxt[i].classList.remove('is-warning');
            nxt[i].classList.remove('is-danger');
            nxtnxt[i].classList.remove('is-danger');
            nxt[i].classList.add('is-danger');
            nxtnxt[i].classList.add('is-danger');
        }
        let pressedKeys = document.querySelectorAll('.keys');

        for (let i = 0; i < keysCount; i++) {
            if (pressedKeys[i].textContent !== nxt[i].textContent) {
                nxt[i].classList.remove('is-danger');
                nxt[i].classList.add('is-warning');
            }
        }
        for (let i = 0; i < 100; i++) {
            nxtnxt[rand].textContent = getRandomAlphabets(1)[0].toUpperCase();
            if (nxt[rand].textContent !== nxtnxt[rand].textContent) {
                //nxtnxtの中で重複がないかチェック
                let flag = true;
                for (let j = 0; j < keysCount; j++) {
                    if (nxtnxt[rand].textContent === nxtnxt[j].textContent && rand !== j) {
                        flag = false;
                    }
                }
                if (flag === true) break;
            }
        }
        
    }

    if (progress.value === wordAllCount) {
        complete();
    }

}

function complete() {
    //タイマー止める処理
    stopInterval();

    //ツイートあれする処理
    makeTweet();

    window.alert(`${keysCount}キー同時押し cleared! in ${timer.textContent} seconds! \n Press Escape to restart!`)


    keyPressed = new Object();
    init();
    main();
    let pressedKeys = document.querySelectorAll('.keys');
    for (let i = 0; i < wordAllCount; i++) {
        pressedKeys[i].textContent = '-';
    }

}

//Escapeキーが押されたとき
window.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

        keyPressed = new Object();
        init();
        main();

    }
})





function main() {

    keyPressed = new Object();

    window.removeEventListener('keydown', keydownEventListener);
    window.removeEventListener('keydown', keydownEventListener);

    window.removeEventListener('keyup', keyupEventListener);

    function keydownEventListener(e) {
        whenKeydown(e);
    }

    function keyupEventListener(e) {
        whenKeyup(e);
    }

    window.addEventListener('keydown', keydownEventListener);
    window.addEventListener('keyup', keyupEventListener);

}

function whenKeydown(e) {

    function isLowerCaseLetter(char) {
        return char >= 'a' && char <= 'z';
      }
    if (!isLowerCaseLetter(e.key)) return;

    let pressedKeys = document.querySelectorAll('.keys');
    let nxt = document.querySelectorAll('.nxt');

    //キーを押しっぱなしかのフラグ管理
    if (!keyPressed[e.key]) {

        keyPressed[e.key] = true;

        const currentKeysButton = document.querySelectorAll('.keys');
        //1個押しすぎたとき
        if (countTrueValues(keyPressed) === keysCount + 1) {
            for (let i = 0; i < keysCount; i++) {
                currentKeysButton[i].classList.remove('is-primary');
                currentKeysButton[i].classList.add('is-warning');
            }
        }

        

        //画面更新の処理
        for (let i = 0; i < keysCount; i++) {

            if (e.key === nxt[i].textContent.toLowerCase()) {
                pressedKeys[i].textContent = String(e.key).toUpperCase();
            }

        }

        //正解判定
        let isSuccess = true;
        for (let i = 0; i < keysCount; i++) {
            if (pressedKeys[i].textContent !== nxt[i].textContent) isSuccess = false; 
        }
        if (countTrueValues(keyPressed) > keysCount) isSuccess = false;

        if (isSuccess) {
            success();
            isSuccessed = true;
        }

        function countTrueValues(obj) {
            let count = 0;
            for (const key in obj) {
              if (obj[key] === true) {
                count++;
              }
            }
            return count;
          }


    }
}


//キーを離したときの処理
function whenKeyup(e) {

    function isLowerCaseLetter(char) {
        return char >= 'a' && char <= 'z';
      }
    if (!isLowerCaseLetter(e.key)) return;

    let pressedKeys = document.querySelectorAll('.keys');
    let nxt = document.querySelectorAll('.nxt');
    
    keyPressed[e.key] = false;

    let isSuccess = true;
    for (let i = 0; i < keysCount; i++) {
        if (pressedKeys[i].textContent !== nxt[i].textContent) isSuccess = false; 
    }
    if (countTrueValues(keyPressed) > keysCount) isSuccess = false;
    if (isSuccessed) isSuccess = false;
    isSuccessed = false;
    if (isSuccess) {
        success();
    }

    const currentKeysButton = document.querySelectorAll('.keys');
    //1個押しすぎてて、ちょうどになったとき
    if (countTrueValues(keyPressed) === keysCount) {
        for (let i = 0; i < keysCount; i++) {
            currentKeysButton[i].classList.remove('is-warning');
            currentKeysButton[i].classList.add('is-primary');
        }
    }

    function countTrueValues(obj) {
        let count = 0;
        for (const key in obj) {
          if (obj[key] === true) {
            count++;
          }
        }
        return count;
      }

    for (let i = 0; i < pressedKeys.length; i++) {

        if (pressedKeys[i].textContent === String(e.key).toUpperCase()) {
            pressedKeys[i].textContent = '-';
        }

    }

}

function makeTweet() {

    const time = document.getElementById('timer').textContent;

    const tweetButton = document.getElementById('tweet');

    const hashTags = "ツイスタータイピング";
    const mode = isTwister ? 'ツイスター' : 'ノーマル';
    const tweetText = `${mode}モード${keysCount}個同時押し(${wordAllCount}回)を${time}秒でクリア！`;

    const url = 'https://nkhr.web.fc2.com/typing/twister.html';
    const tweetURL = `https://twitter.com/intent/tweet?ref_src=twsrc&text=${tweetText}&hashtags=${hashTags}&url=${url}`;

    tweetButton.href = tweetURL;

}


function getRandomAlphabets(n) {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //alphabetsをランダムに並べ替える
    const shuffledAlphabets = alphabets.split('').sort(function(){return Math.random()-.5}).join('');
    //配列にしたものをreturn
    return shuffledAlphabets.slice(0, n).split('');
}




function stopInterval() {
    if (timerArray.length > 0) {
        clearInterval(timerArray.shift());
    }
}
function startTimer() {
    const timer = document.getElementById('timer');

    let nowTime = Number(timer.textContent);
    nowTime = (nowTime + 0.1);
    timer.textContent = nowTime.toFixed(1);

}
