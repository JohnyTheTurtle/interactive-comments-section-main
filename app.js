/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////////RENDERING/////////////////////////
let highestCommentID = 0
const fetchFeed = async() => {
    const reply = await fetch("./data.json")
    const data = await reply.json()
    return data
}
const fetchChatData = async() => {
    const chatData = await fetchFeed()
    const allComments = chatData.comments
    const currentUser = chatData.currentUser
///render current user picture
const currentuserpicture = document.querySelector(".actions img")
currentuserpicture.src = currentUser.image.png

    ///render all comments
    for(let i = 0; i<allComments.length; i++ ){
        highestCommentID = renderComments(currentUser, allComments[i])
    }
    const allButtons = document.querySelectorAll("button")
    // allButtons.forEach(a=> a.addEventListener("click", ()=> {
        
        
        
    // }))
    // ScoreButtonAction(chatData)
  SendNewComment(currentUser, allComments)
}
fetchChatData()
const renderComments = function(userObj, commentObj) {
    // RenderComment(userObj, commentObj)
    // RenderReply(userObj, commentObj)
    let highestID = 0
    const commentSection = document.querySelector(".commentsection")
    //create comment
    const comment = document.createElement("div")
    comment.className = "comment"
    comment.setAttribute("id",commentObj.id)

    if(highestID < Number(commentObj.id)){///keep track of the highest ID
        highestID = Number(commentObj.id)
    }
    //1. create userinfo
    const userinfo = document.createElement("div")
    userinfo.className = "userinfo"
        //create userinfo content
        const userimg = document.createElement("img")
        userimg.className = "userimg"
        userimg.src = commentObj.user.image.png
        const username = document.createElement("p")
        username.className = "username"
        username.innerText = commentObj.user.username
        ///render 'you'icon only if it is current user's post
        const useryou = document.createElement("div")
        if (commentObj.user.username === userObj.username) {
            useryou.className = "useryou"
            useryou.innerText = "you"    
        }
        const postdate = document.createElement("p")
        postdate.className = "postdate"
        postdate.innerText = commentObj.createdAt
        ///append useinfo children
    userinfo.append(userimg, username, useryou, postdate)
    ///2. create postcontent
    // const postcontent = document.createElement("div")
    // postcontent.className = "postcontent"
    // postcontent.innerHTML = commentObj.content
    // postcontent.setAttribute("id",commentObj.id)

    const postcontent = document.createElement("div")
    postcontent.className = "postcontent"
    const replytouser = document.createElement("a")
    const posttext = document.createElement("p")
    posttext.innerText = commentObj.content
    // replytext.className = "postcontent"
    posttext.setAttribute("id",commentObj.id);
    // replypostcontent.innerHTML = "<a>"+"@" + commentObj.replies[j].replyingTo + "</a> "+ commentObj.replies[j].content
    postcontent.append(replytouser, posttext)

    ///3. create userinteractions
    const userinteractions = document.createElement("div")
    userinteractions.className = "userinteractions"
        ///create score
        const score = document.createElement("div")
        score.className = "score"
            ///create score children
            const plus = document.createElement("button")
            plus.className = "plus"
            plus.setAttribute("id",commentObj.id)
            PlusScoreButtonAction(plus)
                ///push img to button
                const plusimg = document.createElement("img")
                plusimg.src = "./images/icon-plus.svg"
                plus.append(plusimg)
            const scorebtn = document.createElement("div")
            scorebtn.className = "scorebtn"
            scorebtn.innerHTML = commentObj.score
            scorebtn.setAttribute("id",commentObj.id)
            const minus = document.createElement("button")
            minus.className = "minus"
            minus.setAttribute("id",commentObj.id)
            MinusScoreButtonAction(minus)
                ///push img to button
                const minusimg = document.createElement("img")
                minusimg.src = "./images/icon-minus.svg"
                minus.append(minusimg)
        score.append(plus, scorebtn, minus)
        ///create replyoredit
        const replyoredit = document.createElement("button")
        replyoredit.className = "replyoredit"
        replyoredit.setAttribute("id",commentObj.id)
        ReplyOrEdit(replyoredit, userObj)
            ///push img to button
            const replyoreditImg = document.createElement("img")
            replyoreditImg.src ="./images/icon-reply.svg"
            const replyoreditP = document.createElement("p")
            replyoreditP.innerText ="Reply"
        replyoredit.append(replyoreditImg, replyoreditP)
    userinteractions.append(score, replyoredit)
    ///render replies if there are replies to the comment
    const replies = document.createElement("div")
    replies.className = "replies"
        for(let j = 0; j<commentObj.replies.length; j++){
            //create reply
            const reply = document.createElement("div")
            reply.className = "reply"
            reply.setAttribute("id",commentObj.replies[j].id);

            if(highestID < Number(commentObj.replies[j].id)){ ///keep track of the highest ID
                highestID = Number(commentObj.replies[j].id)
            }

            //4. create replyuserinfo
                const replyuserinfo = document.createElement("div")
                replyuserinfo.className = "userinfo"
                //create replyuserinfo content
                const replyuserimg = document.createElement("img")
                replyuserimg.className = "userimg"
                replyuserimg.src = commentObj.replies[j].user.image.png
                const replyusername = document.createElement("p")
                replyusername.className = "username"
                replyusername.innerText = commentObj.replies[j].user.username
                ///render 'you' icon only if it is current user's post
                const replyuseryou = document.createElement("div")
                if (commentObj.replies[j].user.username === userObj.username) {
                    replyuseryou.className = "useryou"
                    replyuseryou.innerText = "you"    
                }
                const replypostdate = document.createElement("p")
                replypostdate.className = "postdate"
                replypostdate.innerText = commentObj.replies[j].createdAt
                ///append useinfo children
                replyuserinfo.append(replyuserimg, replyusername, replyuseryou, replypostdate)
            ///5. create replypostcontent
            // commentObj.user.username
                const replypostcontent = document.createElement("div")
                replypostcontent.className = "postcontent"
                const replytouser = document.createElement("a")
                replytouser.innerText = "@" + commentObj.replies[j].replyingTo + " "
                const replytext = document.createElement("p")
                replytext.innerText = commentObj.replies[j].content
                // replytext.className = "postcontent"
                replytext.setAttribute("id",commentObj.replies[j].id);
                // replypostcontent.innerHTML = "<a>"+"@" + commentObj.replies[j].replyingTo + "</a> "+ commentObj.replies[j].content
                replypostcontent.append(replytouser, replytext)
            ///6. create replyuserinteractions
            const replyuserinteractions = document.createElement("div")
            replyuserinteractions.className = "userinteractions"
            ///create replyscore
            const replyscore = document.createElement("div")
            replyscore.className = "score"
                ///create replyscore children
                const replyplus = document.createElement("button")
                replyplus.className = "plus"
                replyplus.setAttribute("id",commentObj.replies[j].id);
                PlusScoreButtonAction(replyplus)
                    ///push img to button
                    const replyplusimg = document.createElement("img")
                    replyplusimg.src = "./images/icon-plus.svg"
                    replyplus.append(replyplusimg)
                const replyscorebtn = document.createElement("div")
                replyscorebtn.className = "scorebtn"
                replyscorebtn.setAttribute("id",commentObj.replies[j].id)
                replyscorebtn.innerHTML = commentObj.replies[j].score
                const replyminus = document.createElement("button")
                replyminus.className = "minus"
                replyminus.setAttribute("id",commentObj.replies[j].id)
                MinusScoreButtonAction(replyminus)
                    ///push img to button
                    const replyminusimg = document.createElement("img")
                    replyminusimg.src = "./images/icon-minus.svg"
                    replyminus.append(replyminusimg)
            replyscore.append(replyplus, replyscorebtn, replyminus)
            ///create delete button if user is author of the comment
            const deletecomment = document.createElement("button")
            if (commentObj.replies[j].user.username === userObj.username) {
                deletecomment.className = "deletecomment"
                deletecomment.setAttribute("id",commentObj.replies[j].id)
                ///push img to button
                const deletecommentImg = document.createElement("img")
                deletecommentImg.src ="./images/icon-delete.svg"
                const deleteP = document.createElement("p")
                deleteP.innerText ="Delete"
                deletecomment.append(deletecommentImg, deleteP)
                DeleteComment2(deletecomment)
            }
            
            ///create replyoredit
            const replyreplyoredit = document.createElement("button")
            replyreplyoredit.className = "replyoredit"
            replyreplyoredit.setAttribute("id",commentObj.replies[j].id)
            ReplyOrEdit(replyreplyoredit, userObj)
                ///push img to button
                const replyreplyoreditImg = document.createElement("img")
                replyreplyoreditImg.src ="./images/icon-reply.svg"
                const replyreplyoreditP = document.createElement("p")
                replyreplyoreditP.innerText ="Reply"
                replyreplyoredit.append(replyreplyoreditImg, replyreplyoreditP)
                replyuserinteractions.append(replyscore, deletecomment, replyreplyoredit)
                if (commentObj.replies[j].user.username === userObj.username) {
                    replyreplyoreditImg.src ="./images/icon-edit.svg"
                    replyreplyoreditP.innerText ="Edit"
                }
            reply.append(replyuserinfo, replypostcontent, replyuserinteractions)    
            replies.append(reply)
        }      
        comment.append(userinfo, postcontent, userinteractions, replies)

commentSection.append(comment)
return highestID
}

////////////////////RENDERING-END////////////////////////

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////////BUTTONS///////////////////////////
const PlusScoreButtonAction = function(PlusButton){
    ////plus button score
    PlusButton.addEventListener("click", () =>{
            const scoreForThisComment = document.getElementById(PlusButton.id).querySelector(".scorebtn")
            const newScore = Number(scoreForThisComment.innerText) + 1
            scoreForThisComment.innerText = newScore
            })
}
const MinusScoreButtonAction = function(MinusButton){
    ////plus button score
    MinusButton.addEventListener("click", () =>{
            const scoreForThisComment = document.getElementById(MinusButton.id).querySelector(".scorebtn")
            const newScore = Number(scoreForThisComment.innerText) - 1
            scoreForThisComment.innerText = newScore
            })
}
const SendNewComment = function(currentUser, allComments) {
    const sendButton = document.querySelector(".sendbtn")
    const textArea = document.querySelector("textarea")
    const commentSection = document.querySelector(".commentsection")
    let newCommentObj = {}
    sendButton.addEventListener("click", () => {
        if(textArea.value !== "") {
            ////create new comment obj
            newCommentObj = {"id": highestCommentID+1,
            "content": textArea.value,
            "createdAt": "Now",
            "score": 0,
            "user": {
              "image": { 
                "png": currentUser.image.png,
                "webp": currentUser.image.webp
              },
              "username": currentUser.username
            },
            "replies": []
          }
            highestCommentID++;
          ////render new comment
          const newComment = document.createElement("div")
          newComment.className = "comment"
          newComment.setAttribute("id",newCommentObj.id)
          //1. create userinfo
            const userinfo = document.createElement("div")
            userinfo.className = "userinfo"
                //create userinfo content
                const userimg = document.createElement("img")
                userimg.className = "userimg"
                userimg.src = newCommentObj.user.image.png
                const username = document.createElement("p")
                username.className = "username"
                username.innerText = newCommentObj.user.username
                ///render 'you'icon only if it is current user's post
                const useryou = document.createElement("div")
            
                    useryou.className = "useryou"
                    useryou.innerText = "you"    
                
                const postdate = document.createElement("p")
                postdate.className = "postdate"
                postdate.innerText = newCommentObj.createdAt
                ///append useinfo children
            userinfo.append(userimg, username, useryou, postdate)
            ///2. create postcontent
            // const postcontent = document.createElement("div")
            // postcontent.className = "postcontent"
            // postcontent.innerHTML = newCommentObj.content
            // postcontent.setAttribute("id",newCommentObj.id)

            const postcontent = document.createElement("div")
            postcontent.className = "postcontent"
            const replytouser = document.createElement("a")
            const posttext = document.createElement("p")
            posttext.innerText = newCommentObj.content
            // replytext.className = "postcontent"
            posttext.setAttribute("id",newCommentObj.id);
            // replypostcontent.innerHTML = "<a>"+"@" + commentObj.replies[j].replyingTo + "</a> "+ commentObj.replies[j].content
            postcontent.append(replytouser, posttext)

            ///3. create userinteractions
            const userinteractions = document.createElement("div")
            userinteractions.className = "userinteractions"
                ///create score
                const score = document.createElement("div")
                score.className = "score"
                    ///create score children
                    const plus = document.createElement("button")
                    plus.className = "plus"
                    plus.setAttribute("id",newCommentObj.id)
                    PlusScoreButtonAction(plus)
                        ///push img to button
                        const plusimg = document.createElement("img")
                        plusimg.src = "./images/icon-plus.svg"
                        plus.append(plusimg)
                    const scorebtn = document.createElement("div")
                    scorebtn.className = "scorebtn"
                    scorebtn.innerHTML = newCommentObj.score
                    scorebtn.setAttribute("id",newCommentObj.id)
                    const minus = document.createElement("button")
                    minus.className = "minus"
                    minus.setAttribute("id",newCommentObj.id)
                    MinusScoreButtonAction(minus)
                        ///push img to button
                        const minusimg = document.createElement("img")
                        minusimg.src = "./images/icon-minus.svg"
                        minus.append(minusimg)
                score.append(plus, scorebtn, minus)
                ///create delete button if user is author of the comment
                const deletecomment = document.createElement("button")
                    deletecomment.className = "deletecomment"
                    deletecomment.setAttribute("id", newCommentObj.id)
                    ///push img to button
                    const deletecommentImg = document.createElement("img")
                    deletecommentImg.src ="./images/icon-delete.svg"
                    const deleteP = document.createElement("p")
                    deleteP.innerText ="Delete"
                    deletecomment.append(deletecommentImg, deleteP)
                    
                    DeleteComment2(deletecomment)
                ///create replyoredit
                const replyoredit = document.createElement("button")
                replyoredit.className = "replyoredit"
                replyoredit.setAttribute("id",newCommentObj.id)
                    ///push img to button
                    const replyoreditImg = document.createElement("img")
                    replyoreditImg.src ="./images/icon-edit.svg"
                    const replyoreditP = document.createElement("p")
                    replyoreditP.innerText ="Edit"

                const replies = document.createElement("div")
                replies.className = "replies"

                ReplyOrEdit(replyoredit, currentUser)

                replyoredit.append(replyoreditImg, replyoreditP)
            userinteractions.append(score,deletecomment, replyoredit)
        newComment.append(userinfo, postcontent, userinteractions, replies)
    commentSection.append(newComment)
    
        textArea.value = ""
        return newCommentObj
        }
    })
    
}

const DeleteComment2 = function(deletebutton){
    const modalWindow = document.querySelector(".modalbackground")
    const nocancelButton = document.querySelector(".nocancel")
    const yesdeleteButton = document.querySelector(".yesdelete")

    deletebutton.addEventListener("click", () =>{
            modalWindow.style.display ="flex"
            nocancelButton.addEventListener("click", () =>{
                modalWindow.style.display ="none"
            })
            yesdeleteButton.addEventListener("click", () =>{
                modalWindow.style.display ="none"
                const commentToBeRemoved = document.getElementById(deletebutton.id)
                try{commentToBeRemoved.remove()}catch(err){}
            })
        })
}
const showTextArea = function(ReplyOrEditButton, currentUser, userObj, buttonText) {
    let commentId = ReplyOrEditButton.id ///ID of this comment
    let commentTextDiv = document.getElementById(commentId).querySelector(".postcontent")
    let commentText = commentTextDiv.querySelector("p").innerText ///comment text div
    const replyUserName = commentTextDiv.querySelector("a").innerText ///username to whom we reply
    let userinteractionsDiv = commentTextDiv.parentElement.querySelector(".userinteractions")
    commentTextDiv.querySelector("p").style.display = "none"
    const EditField = document.createElement("textarea")
    EditField.innerText = commentText
    commentTextDiv.append(EditField)
        ReplyOrEditButton.style.display = "none"
    const updateBtn = document.createElement("button")
    updateBtn.className = "updatebtn"
    updateBtn.innerText = buttonText
    userinteractionsDiv.append(updateBtn)
    updateBtn.addEventListener("click", () => {
        // console.log("Updated!")
        const newCommentText = EditField.value
        updateBtn.remove()
        EditField.remove()
        commentTextDiv.querySelector("p").innerText = newCommentText
        
        commentTextDiv.querySelector("p").style.display = null
        ReplyOrEditButton.style.display = null
    })
}
const renderNewReply = function(ReplyOrEditButton, currentUser, userObj){
    let commentId = ReplyOrEditButton.id
    let commentTextDiv = document.getElementById(commentId).querySelector(".postcontent")
    const replyToUserName1 = "@" + document.getElementById(commentId).querySelector(".userinfo").querySelector(".username").innerText

    // console.log(replyToUserName1)
    newCommentObj = {"id": highestCommentID+1,
    "content": "",
    "createdAt": "Now",
    "score": 0,
    "user": {
      "image": { 
        "png": currentUser.image.png,
        "webp": currentUser.image.webp
      },
      "username": currentUser.username
    },
    "replies": []
  }
  highestCommentID++;
  let parentCommentDiv = document.getElementById(commentId).parentElement.className
  let replyToComment = document.getElementById(commentId)
//   console.log(replyToComment)
  
      const repliesDiv = document.getElementById(commentId).parentElement
      
      ////////////
      const reply = document.createElement("div")
      reply.className = "reply"
      reply.setAttribute("id", newCommentObj.id);

      //4. create replyuserinfo
          const replyuserinfo = document.createElement("div")
          replyuserinfo.className = "userinfo"
          //create replyuserinfo content
          const replyuserimg = document.createElement("img")
          replyuserimg.className = "userimg"
          replyuserimg.src = currentUser.image.png
          const replyusername = document.createElement("p")
          replyusername.className = "username"
          replyusername.innerText = newCommentObj.user.username
          ///render 'you' icon only if it is current user's post
          const replyuseryou = document.createElement("div")
              replyuseryou.className = "useryou"
              replyuseryou.innerText = "you"    
          const replypostdate = document.createElement("p")
          replypostdate.className = "postdate"
          replypostdate.innerText = newCommentObj.createdAt
          ///append useinfo children
          replyuserinfo.append(replyuserimg, replyusername, replyuseryou, replypostdate)
      ///5. create replypostcontent
      // commentObj.user.username
          const replypostcontent = document.createElement("div")
          replypostcontent.className = "postcontent"
          const replytouser = document.createElement("a")
          replytouser.innerText = replyToUserName1 + " "
          const replytext = document.createElement("p")
          replytext.innerText = ""
          // replytext.className = "postcontent"
          replytext.setAttribute("id",newCommentObj.id);
          // replypostcontent.innerHTML = "<a>"+"@" + commentObj.replies[j].replyingTo + "</a> "+ commentObj.replies[j].content
          replypostcontent.append(replytouser, replytext)
      ///6. create replyuserinteractions
      const replyuserinteractions = document.createElement("div")
      replyuserinteractions.className = "userinteractions"
      ///create replyscore
      const replyscore = document.createElement("div")
      replyscore.className = "score"
          ///create replyscore children
          const replyplus = document.createElement("button")
          replyplus.className = "plus"
          replyplus.setAttribute("id",newCommentObj.id);
          PlusScoreButtonAction(replyplus)
              ///push img to button
              const replyplusimg = document.createElement("img")
              replyplusimg.src = "./images/icon-plus.svg"
              replyplus.append(replyplusimg)
          const replyscorebtn = document.createElement("div")
          replyscorebtn.className = "scorebtn"
          replyscorebtn.setAttribute("id",newCommentObj.id)
          replyscorebtn.innerHTML = newCommentObj.score
          const replyminus = document.createElement("button")
          replyminus.className = "minus"
          replyminus.setAttribute("id",newCommentObj.id)
          MinusScoreButtonAction(replyminus)
              ///push img to button
              const replyminusimg = document.createElement("img")
              replyminusimg.src = "./images/icon-minus.svg"
              replyminus.append(replyminusimg)
      replyscore.append(replyplus, replyscorebtn, replyminus)
      ///create delete button if user is author of the comment
      const deletecomment = document.createElement("button")
          deletecomment.className = "deletecomment"
          deletecomment.setAttribute("id",newCommentObj.id)
          ///push img to button
          const deletecommentImg = document.createElement("img")
          deletecommentImg.src ="./images/icon-delete.svg"
          const deleteP = document.createElement("p")
          deleteP.innerText ="Delete"
          deletecomment.append(deletecommentImg, deleteP)
          DeleteComment2(deletecomment)

      ///create replyoredit
      const replyreplyoredit = document.createElement("button")
      replyreplyoredit.className = "replyoredit"
      replyreplyoredit.setAttribute("id",newCommentObj.id)
      ReplyOrEdit(replyreplyoredit, userObj)
          ///push img to button
          const replyreplyoreditImg = document.createElement("img")
          replyreplyoreditImg.src ="./images/icon-reply.svg"
          const replyreplyoreditP = document.createElement("p")
          replyreplyoreditP.innerText ="Reply"
          replyreplyoredit.append(replyreplyoreditImg, replyreplyoreditP)
          replyuserinteractions.append(replyscore, deletecomment, replyreplyoredit)

              replyreplyoreditImg.src ="./images/icon-edit.svg"
              replyreplyoreditP.innerText ="Edit"

      reply.append(replyuserinfo, replypostcontent, replyuserinteractions)    
      
        if(parentCommentDiv === "replies"){
            replyToComment.after(reply)
            showTextArea(replyreplyoredit, currentUser, userObj, "Reply")

        } else if(parentCommentDiv === "commentsection") {
            replyToComment.querySelector(".replies").append(reply)
            showTextArea(replyreplyoredit, currentUser, userObj, "Reply")
        }
        reply.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
const ReplyOrEdit = function(ReplyOrEditButton, currentUser, userObj) {
    let commentId = ReplyOrEditButton.id
    ReplyOrEditButton.addEventListener("click", ()=>{
        if(ReplyOrEditButton.childNodes[1].innerText === "Edit"){
            showTextArea(ReplyOrEditButton, currentUser, userObj, "Update")
        }else if(ReplyOrEditButton.childNodes[1].innerText === "Reply"){
            renderNewReply(ReplyOrEditButton, currentUser, userObj)
        }
    })
}
