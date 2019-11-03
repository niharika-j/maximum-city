import React, { useState } from 'react';
import './place.css';
import places from '../../shared/places.js';
import appRoutes from '../../shared/appRoutes.js';

import {Link, useParams} from "react-router-dom";

function updateLikesInLocalStorage(likesObj, newLikeCount, id){
    let newLikesObj = likesObj;
    newLikesObj[id] = newLikeCount;
    localStorage.setItem('likes', JSON.stringify(newLikesObj));
}

function updateCommentsInLocalStorage(commentsObj, oldCommentsList, newComment, id){
    let newCommentObj = commentsObj;
    oldCommentsList.push(newComment);
    newCommentObj[id] = oldCommentsList;
    localStorage.setItem('comments', JSON.stringify(newCommentObj));
}

function Place() {
  let id = useParams()['id'];
  let placeDetails = places.filter(place => place.id == id)[0];

  let allLikes = localStorage.getItem('likes')?JSON.parse(localStorage.getItem('likes')):{};
  if(!allLikes[id]){
      allLikes[id] = 0;
  }
  let [likes, setLikes] = useState(allLikes[id]);

  let allComments = localStorage.getItem('comments')?JSON.parse(localStorage.getItem('comments')):{};
  if(!allComments[id]){
    allComments[id] = [];
  }
  
  let [comments, setComments] = useState(allComments[id]);
  let [newComment, setNewComment] = useState('');

  return (
    <div className="place">
        <div className="breadcrumbs"><Link to={appRoutes.explore}>Explore Places</Link> > {placeDetails.name}</div>
        <div className="articleContainer">
            <div className="article">
                <div className="articleTitle">
                    {placeDetails.name}
                    <span className="like"><i className="fas fa-heart" onClick={() => {updateLikesInLocalStorage(allLikes, likes+1, id);setLikes(likes+1);}}></i> {likes}</span>
                    
                </div>
                <div className="articleText">{placeDetails.fullText}</div>
                <p className="credits">Text from- {placeDetails.textCredits}</p>
            </div>
            <div className="articleImage">
                <img src={placeDetails.imgSrc} alt={placeDetails.name} />
                <p className="credits">Image source- {placeDetails.imageCredits}</p>
            </div>
        </div>
        <div className="comments">
            <fieldset>
                <legend className="commentLegend">Comment</legend>
                <textarea className="commentBox" placeholder="Type a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
                <button className="saveComment" onClick={() => {updateCommentsInLocalStorage(allComments, comments, newComment, id); setLikes(likes+1);}}>Save</button>
            </fieldset>
            {comments.map(comment => {
                return (
                    <div class="comment">{comment}</div>
                )
            })}
        </div>
    </div>
  );
}

export default Place;
