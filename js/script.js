/* eslint-disable no-prototype-builtins */
'use strict';

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = ".post-tags .list",
    optArticleAuthorSelector = ".post-author",
    optTagsListSelector = ".tags.list",
    optCloudClassCount = 5,
    optCloudClassPrefix = "tag-size-";

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

function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.split("-")[1];
    console.log("href: " + href);
    console.log("tag: " + tag);

    /* find all tag links with class active */
    const links = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log("links: " + links);

    /* START LOOP: for each active tag link */
    for(let link of links){

        /* remove class active */
        link.classList.remove("active");

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const linksTagsEqualHref = document.querySelectorAll("a[href='" + href + "']");

    /* START LOOP: for each found tag link */
    for(let link of linksTagsEqualHref){

        /* add class active */
        link.classList.add("active");

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks("[data-tags~='" + tag + "']");
}

function addClickListenersToTags(){
    /* find all links to tags */
    const linksToTags = document.querySelectorAll(".post-tags .list a");

    /* START LOOP: for each link */
    for(let link of linksToTags){

        /* add tagClickHandler as event listener for that link */
        link.addEventListener("click", tagClickHandler);

    /* END LOOP: for each link */
    }
}

addClickListenersToTags();

function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

        /* find author wrapper */
        const wrapperAuthor = article.querySelector(optArticleAuthorSelector);

        /* get author from data-author attribute */
        const articleAuthor = article.getAttribute("data-author");

        /* generate HTML of the link */
        const linkhtml = "by <a href='#author'><span>" + articleAuthor + "</span></a>";

        /* insert HTML of all the links into the author wrapper */
        wrapperAuthor.innerHTML = linkhtml;

    /* END LOOP: for every article: */
    }
}

generateAuthors();

function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* find all author links with class active */
    const links = document.querySelectorAll(optArticleAuthorSelector);

    /* START LOOP: for each active author link */
    for(let link of links){

        /* remove class active */
        link.classList.remove("active");

    /* END LOOP: for each active author link */
    }

    /* make new constant named "dataAuthor" and give it value data-author click element */
    const dataAuthor = clickedElement.parentElement.parentElement.getAttribute("data-author");
    console.log("author:" + dataAuthor);

    /* find all author links with data-author attribute equal to the "data-author" constant */
    const linksDataAuthor = document.querySelectorAll(optArticleAuthorSelector + " a");
    console.log("linksData: " + linksDataAuthor);

    /* START LOOP: for each found author link */
    for(let link of linksDataAuthor){

        /* add class active */
        link.classList.add("active");

    /* END LOOP: for each found author link */
    }


    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks("[data-author='" + dataAuthor + "']");
}

function addClickListenersToAuthors(){
    /* find all links to tags */
    const linksToTags = document.querySelectorAll(".post-author a");

    /* START LOOP: for each link */
    for(let link of linksToTags){

        /* add authorClickHandler as event listener for that link */
        link.addEventListener("click", authorClickHandler);

    /* END LOOP: for each link */
    }
}

addClickListenersToAuthors();

function caluclateTagsParams(tags){
    const params = {
        max: 0,
        min: 999999
    }

    for(let tag in tags){
        if(tags[tag] > params.max){
            params.max = tags[tag];
        }

        if(tags[tag] < params.min){
            params.min = tags[tag];
        }
    }

    return params;
}

function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
}

function generateTagsRightColumn(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

        /* get tags from data-tags attribute */
        const dataTags = article.getAttribute("data-tags");

        /* split tags into array */
        const tagsArray = dataTags.split(' ');

        /* START LOOP: for each tag */
        for(let tag of tagsArray){

            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(tag)){

                /* [NEW] add tag to allTags object */
                allTags[tag] = 1;
            }else {
                allTags[tag]++;
            }

        /* END LOOP: for each tag */
        }

    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* make new const named tagsParams variable */
    const tagsParams = caluclateTagsParams(allTags);
    console.log(tagsParams);

    /* [NEW] create variable for all links to HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags */
    for(let tag in allTags){

        /* [NEW] generate code of a link and it to allTagsHTML */
        allTagsHTML += "<li><a href='#tag-" + tag + "' class='" + calculateTagClass(allTags[tag], tagsParams) + "'>"+ tag +"</a></li>";

    /* [NEW] END LOOP: for each tag in allTags */
    }

    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
}

generateTagsRightColumn();

function addClickListenersToTagsRightColumn(){
    /* find all links to tags */
    const linksToTags = document.querySelectorAll(".tags.list a");

    /* START LOOP: for each link */
    for(let link of linksToTags){

        /* add tagClickHandler as event listener for that link */
        link.addEventListener("click", tagClickHandler);

    /* END LOOP: for each link */
    }
}

addClickListenersToTagsRightColumn();
