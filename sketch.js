let spriteSheet; // 儲存載入的角色精靈圖
let spriteFrameCount = 8; // 設定指定精靈圖的影格數
let characterX; // 儲存角色的水平位置
let characterDirection = 1; // 設定角色初始朝向右方
let isMoving = false; // 記錄角色目前是否正在移動
const moveSpeed = 4; // 設定角色每次繪圖移動的像素

function setup() { // 初始化畫布與角色
  createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的畫布
  characterX = width / 2; // 將角色初始位置放在畫面中央
  frameRate(12); // 設定動畫更新速度
  loadImage("1/walk/walk.png", (imageFile) => { // 載入指定的八格走路精靈圖
    spriteSheet = imageFile; // 儲存指定的走路精靈圖
    spriteFrameCount = 8; // 使用八格影格播放指定精靈圖
  }, () => { // 指定精靈圖不存在時執行回退載入
    loadImage("1/walk/all.png", (imageFile) => { // 載入資料夾內現有的走路精靈圖
      spriteSheet = imageFile; // 儲存回退用的走路精靈圖
      spriteFrameCount = 7; // 使用現有精靈圖的七格影格
    }); // 結束回退精靈圖載入
  }); // 結束指定精靈圖載入
} // 結束初始化程序

function draw() { // 每一畫格更新角色與畫面
  background("#3f7cac"); // 使用指定的藍色作為畫布背景
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查左方向鍵是否按住
  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查右方向鍵是否按住
  isMoving = movingLeft !== movingRight; // 只有單一方向鍵按住時才移動
  if (isMoving) { // 判斷角色是否需要移動
    characterDirection = movingLeft ? -1 : 1; // 根據按鍵設定角色面向
    characterX += characterDirection * moveSpeed; // 依方向更新角色水平位置
  } // 結束角色移動判斷
  if (spriteSheet) { // 確認精靈圖已完成載入
    const frameWidth = spriteSheet.width / spriteFrameCount; // 計算單格精靈圖寬度
    const displayScale = min(1, (height * 0.8) / spriteSheet.height, (width * 0.8) / frameWidth); // 計算符合視窗的角色縮放比例
    const displayWidth = frameWidth * displayScale; // 計算角色顯示寬度
    const displayHeight = spriteSheet.height * displayScale; // 計算角色顯示高度
    characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2); // 限制角色不超出畫布左右邊界
    const frameIndex = isMoving ? floor(frameCount / 2) % spriteFrameCount : 0; // 移動時輪播影格並在停止時使用第一格
    const sourceX = frameIndex * frameWidth; // 計算目前影格在精靈圖中的水平位置
    push(); // 儲存目前畫布狀態
    translate(characterX, height / 2); // 將繪圖原點移至角色中心
    scale(characterDirection, 1); // 依角色朝向翻轉精靈圖
    image(spriteSheet, -displayWidth / 2, -displayHeight / 2, displayWidth, displayHeight, sourceX, 0, frameWidth, spriteSheet.height); // 繪製目前的角色影格
    pop(); // 還原畫布狀態
  } // 結束精靈圖繪製判斷
} // 結束畫格更新程序

function windowResized() { // 視窗尺寸改變時調整畫布
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為最新視窗大小
  characterX = constrain(characterX, 0, width); // 將角色位置限制在新畫布範圍內
} // 結束視窗尺寸調整程序

function keyPressed() { // 按下方向鍵時阻止頁面捲動
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷是否按下左右方向鍵
    return false; // 阻止方向鍵捲動瀏覽器頁面
  } // 結束方向鍵判斷
} // 結束按鍵處理程序
