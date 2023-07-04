# 餐廳清單 Restaurant List
一個可以幫助使用者尋找喜愛餐廳的線上平台。該網站提供了一個集中的地方，使用者可以瀏覽餐廳清單、查看詳細資訊及評分
## Features - 產品功能
1. 使用者可以透過搜尋餐廳名稱或類別來找到特定的餐廳

![image](https://github.com/boxunw/restaurant_list/blob/main/image/search.png)

按下搜尋送出表單之後，畫面會回傳相對應的短網址

![image](https://github.com/boxunw/restaurant_list/blob/main/image/after_search.png)

2. 點擊餐廳圖卡可以顯示詳細資訊

![image](https://github.com/boxunw/restaurant_list/blob/main/image/show.png)

## Environment SetUp - 環境建置
1. [Node.js](https://nodejs.org/zh-tw)
2. [express 4.17.1](https://www.npmjs.com/package/express/v/4.17.1)
3. [express-handlebars 4.0.2](https://www.npmjs.com/package/express-handlebars?activeTab=versions)
4. [nodemon 2.0.22](https://www.npmjs.com/package/nodemon)

## Installing - 安裝流程
1. 請先確認已安裝Node.js，若無，至環境建置第1項點擊安裝
2. 開啟終端機(Terminal)，指令cd到欲放置專案位置，Clone此專案至本機電腦
```
git clone https://github.com/boxunw/restaurant_list.git
```
3. 打開專案資料夾
```
cd restaurant_list
```
4. 安裝 npm 套件
```
npm install
```
5. 開啟程式
```
npm run dev
```
6. 等待終端機出現以下字樣
```
Express is listening on localhost:3000
```
7. 在瀏覽器輸入以下網址即可開始使用此工具
```
http://localhost:3000
```
