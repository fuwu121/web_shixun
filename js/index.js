// 验证是否成功登陆
if(!sessionStorage.getItem('id')){
    location.href='login.html';
}
// 通过id获取容器
let article_container=$('#article-container');
let myArticle='';
let page_size=3;
let current_page=1;
let page_count=0;
let btn_in=$('#btn_in');
main();
// 文章显示函数
function displayArticle(data) {
    let articles="";
    article_container.empty();
    for (let i=0;i<data.length;i++) {
        articles=articles+`
            <div class="title">
                ${data[i].title}
            </div>
            <div class="author">
                作者：<name class="author-name">${data[i].author}</name><date>• ${data[i].date}</date>
            </div>
            <img src="${data[i].image}" alt="" class="myIMG">
            <div class="content">
                ${data[i].content}
            </div>
            <a href="${data[i].url}">
                <input type="button" onmouseover="this.style.backgroundColor='black'" onmouseleave="this.style.backgroundColor=''" class="button" value="阅读全文" >
            </a>
            <div class="line-small"></div>
            <img src="images/book.png" height="16" width="16"/>
            <div class="line-large"></div>
    `;
    }
    article_container.append(articles);
}
// 按页显示文章
function getArticleByIndex(cur,AllArticles){
    myArticle=AllArticles.slice((cur-1)*page_size,cur*page_size);
    console.log(myArticle);
    displayArticle(myArticle);
}
// 验证当前左/右按钮能否显示
function checkPageView(){
    if(current_page==1){
        $('#btn_pre').hide();
    }
    else{
        $('#btn_pre').show();
    }
    if(current_page==page_count){
        $('#btn_next').hide();
    }
    else{
        $('#btn_next').show();
    }
}
function page_add(){
    current_page++;
    main();
}
function page_minus(){
    current_page--;
    main();
}
// 异步请求数据
function main(){
    $.ajax({
        url:"datas/articles.json",
        type:'get',
        dataType:'json',
        success:function (dd) {
            page_count=Math.ceil(dd.length/page_size);
            btn_in.val(`第${current_page}页/共${page_count}页`);
            checkPageView();
            getArticleByIndex(current_page,dd);
        },
        error:function (err) {
            console.log(err);
            alert(err.message);
        }
    });
}