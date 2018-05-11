// 验证是否成功登陆
if(!sessionStorage.getItem('id')){
    location.href='login.html';
}
// 通过id获取容器
let articles="";
let diary_container=$('#diary-container');
let myArticle='';
let page_size=3;
let current_page=1;
let page_count=0;
let load_button=$('#loadmore-button');
main();
console.log(articles);
// 文章显示函数
function displayArticle(data) {
    articles="";
    // diary_container.empty();
    for (let i=0;i<data.length;i++) {
        articles=articles+`<div class="diary-caption">${data[i].caption}</div>
                    <div class="diary-content">${data[i].content}</div>`;
        if(data[i].image!="")
        {
            articles=articles+`
            <div class="diary-image">
                <img src="${data[i].image}" alt="">
            </div>`;
        }
        articles=articles+`
                    <div class="diary-status">
                        <img width="20px" height="20px" src="images/like.png" alt="">
                        <span class="diary-likes">${data[i].likes}</span>
                        <span class="diary-date">${data[i].date}</span>
                        <div class="diary-line"></div>
                    </div>
    `;
    }
    // 采用追加方式实现动态加载
    diary_container.append(articles);
}
// 按页显示文章
function getArticleByIndex(cur,AllArticles){
    myArticle=AllArticles.slice((cur-1)*page_size,cur*page_size);
    console.log(myArticle);
    displayArticle(myArticle);
}
// 验证当前左/右按钮能否显示
function checkPageView(){
    if(current_page>=page_count){
        load_button.val("没有更多了");
    }
    else{
        load_button.val("加载更多...");
    }
}
load_button.click(function () {
    current_page++;
    main();
});
// 异步请求数据
function main(){
    $.ajax({
        url:"datas/diary.json",
        type:'get',
        dataType:'json',
        success:function (dd) {
            page_count=Math.ceil(dd.length/page_size);
            checkPageView();
            getArticleByIndex(current_page,dd);
        },
        error:function (err) {
            console.log(err);
            alert(err.message);
        }
    });
}