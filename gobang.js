var playerId = 1;//playerId 1为黑子，2为白子，黑子先行
var rows = 20;
var cols = 20;
var map;//二维数组，储存棋盘的状态
var position;//用对象储存刚落下的棋子的位置，方便悔棋的操作
var isDraw;//是否平手
//棋盘内容以及状态的初始化
function initialize() {
    isDraw = false;
    position = {};
    map = [];
    chessboard.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        let temp = [];
        for (let j = 0; j < cols; j++) {
            temp.push(0);
        }
        map.push(temp);
    }
    gameOverInfo.style.display = "none";
    playerId = 1;
    changeInfo();
}
let chessboard_box = document.getElementById("chessboard_box");
let chessboard = document.getElementById("chessboard");
let startBtn = document.getElementById("start");
let undoBtn = document.getElementById("undo");
let playerIdEle = document.getElementById("playerId");
let info = document.getElementById("info");
let gameOverInfo = document.createElement("div");
gameOverInfo.classList.add("gameOverInfo");
chessboard_box.appendChild(gameOverInfo);
//改变提示信息以及悔棋按钮的显示信息
function changeInfo() {
    if (playerId == 1){
        playerIdEle.innerText = "黑子";
        undoBtn.innerText = "白子悔棋";
    }else if(playerId == 2){
        playerIdEle.innerText = "白子";
        undoBtn.innerText = "黑子悔棋";
    }
}
//主体函数，生成棋盘中的小格，以及绑定单击事件
function main() {
    initialize();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            let acrossLine = document.createElement("div");
            acrossLine.classList.add("acrossLine");
            let lengthwaysLine = document.createElement("div");
            lengthwaysLine.classList.add("lengthwaysLine");
            let chess = document.createElement("div");
            chess.classList.add("chess");
            cell.appendChild(acrossLine);
            cell.appendChild(lengthwaysLine);
            cell.appendChild(chess);
            chessboard.appendChild(cell);
            if (i > 0 && i < rows - 1 && j > 0 && j < cols - 1){
                cell.onclick = function () {
                    // alert(this.style.backgroundImage == "");
                    if (this.childNodes[2].style.backgroundImage == ""){
                        // alert(this.childNodes[2].style.backgroundImage == "");
                        if(playerId == 1){
                            this.childNodes[2].style.backgroundImage = "url('./images/黑子.png')";
                            map[i][j] = 1;
                            let judge = isWin();
                            if (judge){
                                gameOver();
                                return;
                            }
                            playerId = 2;
                        }else if(playerId == 2){
                            this.childNodes[2].style.backgroundImage = "url('./images/白子.png')";
                            map[i][j] = 2;
                            let judge = isWin();
                            if (judge){
                                gameOver();
                                return;
                            }
                            playerId = 1;
                        }
                    }
                    position.x = i;
                    position.y = j;
                    undoBtn.style.visibility = "visible";
                    changeInfo();
                }
            }
        }
    }
}
//判断是否胜利
function isWin() {
    let count = 0;
    // console.dir(map);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] == playerId){
                count++;
            }
        }
    }
    if(count < 4){
        return false;
    }else if (count == 362){
        isDraw = true;
        return true;
    }
    //判断是否有竖列连成五子
    for (let i = 1; i < rows - 5; i++) {
        for (let j = 1; j < cols - 1; j++) {
            if(map[i][j] == playerId){
                let c = 1;
                for (let k = 1; k < 5; k++) {
                    if(map[i + k][j] != playerId){
                        break;
                    }else{
                        c++;
                    }
                }
                if(c == 5){
                    return true;
                }
            }
        }
    }
    //判断是否有横排连成五子
    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 5; j++) {
            if(map[i][j] == playerId){
                let c = 1;
                for (let k = 1; k < 5; k++) {
                    if(map[i][j + k] != playerId){
                        break;
                    }else{
                        c++;
                    }
                }
                if(c == 5){
                    return true;
                }
            }
        }
    }
    //判断“\”方向是否有连成五子
    for (let i = 1; i < rows - 5; i++) {
        for (let j = 1; j < cols - 5; j++) {
            if(map[i][j] == playerId){
                let c = 1;
                for (let k = 1; k < 5; k++) {
                    if(map[i + k][j + k] != playerId){
                        break;
                    }else{
                        c++;
                    }
                }
                if(c == 5){
                    return true;
                }
            }
        }
    }
    //判断“/”方向是否有连成五子
    for (let i = 1; i < rows - 5; i++) {
        for (let j = 5; j < cols - 1; j++) {
            if(map[i][j] == playerId){
                let c = 1;
                for (let k = 1; k < 5; k++) {
                    if(map[i + k][j - k] != playerId){
                        break;
                    }else{
                        c++;
                    }
                }
                if(c == 5){
                    return true;
                }
            }
        }
    }
    return false;
}
//游戏结束信息的显示
function gameOver() {
    if(isDraw){
        gameOverInfo.innerText = "平手";
    }else{
        if (playerId == 1){
            gameOverInfo.innerText = "黑子胜利";
        }else if(playerId == 2){
            gameOverInfo.innerText = "白子胜利";
        }
    }
    gameOverInfo.style.display = "block";
    undoBtn.style.visibility = "hidden";
}
//开始游戏以及重新开始
startBtn.onclick = function () {
    chessboard_box.style.display = "block";
    info.style.visibility = "visible";
    if (this.innerText == "开始游戏"){
        this.innerText = "重新开始";
        main();
    }else if (this.innerText == "重新开始"){
        let isRestart = confirm("确定要重新开始吗？");
        if (isRestart){
            main();
        }
    }
}
//悔棋
undoBtn.onclick = function () {
    let isUndo = confirm("确定要悔棋吗？");
    if (isUndo){
        map[position.x][position.y] = 0;
        let chesses = document.querySelectorAll(".chess");
        chesses[position.x * rows + position.y].style.backgroundImage = "";
        if (playerId == 1){
            playerId = 2;
        }else{
            playerId = 1;
        }
        changeInfo();
        undoBtn.style.visibility = "hidden";
    }
}