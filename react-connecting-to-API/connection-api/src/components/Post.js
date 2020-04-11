import React, { Component } from 'react';

function Post(props) {
    console.log(props.posts)
    return (
        <React.Fragment>
            <div>
                <form onSubmit={props.addPosts}>
                    <input name="post" value={props.values.post} onChange={props.onChange}></input>
                    <button type = "submit" >Add new post</button>
                </form>
                {/* <button onClick={props.addPost}>Add new post</button> */}
            </div>
            <div>
                {props.posts.map((item, index) => 
                <div key={index}>
                    {item.name}
                    <textarea name={index}  value={props.values[index]} onChange={(e) => props.onChange(e,index)}/>
                    <button onClick= {(e) => props.updatePosts(e,index)}>update Name</button>
                    <button onClick={(e) => props.deletePosts(e,item.id)}>Delete</button>
                </div>)}
            </div>
        </React.Fragment>
    )
}

export default Post;