'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;

    console.log("Link was clicked!");

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for(let activeLink of activeLinks){
        activeLink.classList.remove("active");
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add("active");

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll("article.active")
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove("active");
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const articleTarget = document.querySelector(articleSelector);
    console.log(articleTarget);

    /* [DONE] add class 'active' to the correct article */
    articleTarget.classList.add("active");

}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks(){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    for(let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute("id");
        console.log(articleId);

        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

        /* create HTML of the link */
        const linkHTML = "<li><a href='#" + articleId + "'><span>" + articleTitle + "</span></a></li>";
        console.log(linkHTML);

        /* insert link into titleList */
        titleList.insertAdjacentHTML("beforeend", linkHTML);
    }

    document.querySelector(".titles a").classList.add("active");

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

        /* find tags wrapper */
        const wrapperTags = article.querySelector(optArticleTagsSelector);
        console.log("wrappper tags: " + wrapperTags);

        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute("data-tags");
        console.log(articleTags);

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray);

        /* START LOOP: for each tag */
        for(let tag of articleTagsArray){

            /* generate HTML of the link */
            const linkhtml = "<li><a href='#tag-" + tag + "'><span>" + tag + "</span></a></li>\n";

            /* add generated code to html variable */
            html += linkhtml;

        /* END LOOP: for each tag */
        }

        /* insert HTML of all the links into the tags wrapper */
        wrapperTags.insertAdjacentHTML("beforeend", html);

    /* END LOOP: for every article: */
    }
}

generateTags();
