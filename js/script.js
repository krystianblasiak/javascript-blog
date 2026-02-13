/* eslint-disable no-prototype-builtins */
'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector("#template-article-link").innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector("#template-tag-cloud-link").innerHTML)
};

const optCloudClassCount = 5,
    optCloudClassPrefix = "tag-size-";

const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: ".post-tags .list",
    articleAuthorSelector: ".post-author",
    tagsListSelector: ".tags.list",
    authorsListSelector: ".authors.list"
};

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
    const titleList = document.querySelector(opts.titleListSelector);
    titleList.innerHTML = "";

    /* for each article */
    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    console.log(articles);

    for(let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute("id");
        console.log(articleId);

        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
        console.log(articleTitle);

        /* create HTML of the link */
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
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

function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

        /* find tags wrapper */
        const wrapperTags = article.querySelector(opts.articleTagsSelector);
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
            const linkHTMLData = {id: "tag-" + tag, title: tag};
            const linkHTML = templates.articleLink(linkHTMLData);

            /* add generated code to html variable */
            html += linkHTML;

            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(tag)){

                /* [NEW] add tag to allTags object */
                allTags[tag] = 1;
            }else {
                allTags[tag]++;
            }

        /* END LOOP: for every article: */
        }

        /* insert HTML of all the links into the tags wrapper */
        wrapperTags.insertAdjacentHTML("beforeend", html);

    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opts.tagsListSelector);

    /* make new const named tagsParams variable */
    const tagsParams = caluclateTagsParams(allTags);
    console.log(tagsParams);

    /* [NEW] create variable for all links to HTML code */
    let allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags */
    for(let tag in allTags){

        /* [NEW] generate code of a link and it to allTagsHTML */
        allTagsData.tags.push({
            hashTag: "tag-" + tag,
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
        });

    /* [NEW] END LOOP: for each tag in allTags */
    }

    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log("allTagsData: ");
    console.log(allTagsData);
}

generateTags();

function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");

    /* make a new constant "articles" */
    const articles = document.querySelectorAll(opts.articleSelector);

    /* START LOOP: for each articles */
    for(let article of articles){

        article.classList.remove("active");

    /* END LOOP: for each articles */
    }

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.split("-")[1];
    console.log("href: " + href);
    console.log("tag: " + tag);

    for(let article of articles){
        const dataTags = article.getAttribute("data-tags").split(' ');
        let breakFor =  0;

        for(let dataTag of dataTags){
            if(dataTag == tag){
                article.classList.add("active");
                breakFor = 1;
                break;
            }
        }

        if(breakFor == 1){
            break;
        }
    }

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

function generateAuthors(){
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

        /* find author wrapper */
        const wrapperAuthor = article.querySelector(opts.articleAuthorSelector);

        /* get author from data-author attribute */
        const articleAuthor = article.getAttribute("data-author");

        /* generate HTML of the link */
        const linkHTMLData = {id: "author-" + articleAuthor.split(' ')[0] + "-" + articleAuthor.split(' ')[1], title: "by " + articleAuthor};
        const linkHTML = templates.articleLink(linkHTMLData);

        /* [NEW] check if this link is NOT already in allAuthors */
        if(!allAuthors.hasOwnProperty(articleAuthor)){

            /* [NEW] add tag to allAuthors object */
            allAuthors[articleAuthor] = 1

        }
        else {
            allAuthors[articleAuthor] += 1;
        }

        /* insert HTML of all the links into the author wrapper */
        wrapperAuthor.innerHTML = linkHTML;

    /* END LOOP: for every article: */
    }

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(opts.authorsListSelector);

    /* make new const named authorsParams variable */
    const authorsParams = caluclateTagsParams(allAuthors);
    console.log(authorsParams);

    /* [NEW] create variable for all links to HTML code */
    let allAuthorsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allAuthors */
    for(let author in allAuthors){

        /* [NEW] generate code of a link and it to allAuthorsHTML */
        //allAuthorsHTML += "<li><a href='#author-" +  + "' class='" + calculateTagClass(allAuthors[author], authorsParams) + "'>"+ author +"</a></li>";
        allAuthorsData.tags.push({
            hashTag: "author-" + author.split(" ")[0] + "-" + author.split(" ")[1],
            tag: author,
            count: allAuthors[author],
            className: calculateTagClass(allAuthors[author], authorsParams)
        });


    /* [NEW] END LOOP: for each tag in allAuthors */
    }

    /* [NEW] add html from allTagsHTML to AuthorsList */
    authorList.innerHTML = templates.tagCloudLink(allAuthorsData);
    console.log("allAuthorsData: ");
    console.log(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* find all author links with class active */
    const links = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for(let link of links){

        /* remove class active */
        link.classList.remove("active");

    /* END LOOP: for each active author link */
    }

    /* make new constant named "dataAuthor" and give it value data-author click element */
    const dataAuthor = clickedElement.getAttribute("href").split('-')[1] + " " + clickedElement.getAttribute("href").split('-')[2];
    console.log("author:" + dataAuthor);

    const articles = document.querySelectorAll(opts.articleSelector);

    /* START LOOP: for each articles */
    for(let article of articles){

        article.classList.remove("active");

    /* END LOOP: for each articles */
    }

    for(let article of articles){

        const author = article.getAttribute("data-author");
        if(dataAuthor == author){
            article.classList.add("active");
            break;
        }
    }

    /* find all author links with data-author attribute equal to the "data-author" constant */
    const linksDataAuthor = document.querySelectorAll("a[href='" + clickedElement.getAttribute("href") + "']");
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

function addClickListenersToAuthorsToRightColumn(){
    /* find all links to tags */
    const linksToTags = document.querySelectorAll(".authors.list a");

    /* START LOOP: for each link */
    for(let link of linksToTags){

        /* add authorClickHandler as event listener for that link */
        link.addEventListener("click", authorClickHandler);

    /* END LOOP: for each link */
    }
}

addClickListenersToAuthorsToRightColumn();
