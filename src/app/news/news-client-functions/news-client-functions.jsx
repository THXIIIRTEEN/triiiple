import { validateMessageContent } from "@/app/authorization/data-utils/validateContentFunction";
import { postUtils } from "../data-functions/postFunction";

export const likeFunction = async (user, props, setActive, setLikes, likes) => {
    const result = await postUtils.like(user._id, props._id);
    setActive(result)
    if (result) {
        setLikes([...likes, user]); 
    } else {
        setLikes(likes.filter(like => like._id !== user._id)); 
    }
};

export const deletePost = async (event, props) => {
    event.preventDefault();
    await postUtils.deletePost(props._id);
    location.reload();
}

export const postNewComment = async(event, setCommentError, commentError, commentInput, user, props, setValidContent, validContent) => {
    event.preventDefault();
    if (commentInput.current.value === "") {
        setCommentError(!commentError)
    }
    
    setValidContent(validateMessageContent(commentInput.current.value));

    if (commentInput.current.value != "" && validateMessageContent(commentInput.current.value) === true) {
        const data = {
            author: user._id,
            time: new Date(),
            text: commentInput.current.value
        }
        postUtils.postComment(props._id, data);
        commentInput.current.value = ""
    }
}

export const showComment = (setShow, show) => {
    setShow(!show)
}

export const deleteComment = (event, props) => {
    event.preventDefault();
    postUtils.deleteComment(props.postID, props._id);
}