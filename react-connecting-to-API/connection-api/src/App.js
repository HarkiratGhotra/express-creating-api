import React from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import { useState, useEffect} from 'react';

function App() {

  const[posts, setPost] = useState([]);
  const [values, setName] = useState({
      post:'',
      update:''
  });
  const [userInput, setUserInput] = useState({
    update:''
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/courses')
    .then(res => res.json())
    .then(data => setPost(data))
  },[]);

  const onChange = (e, index) => {
    e.persist();
    console.log('input', e);
    // setName(prevState => {...prevState,[e.target.name]: e.target.value});
    // setName(prevState => {
    //     ...prevState,[e.target.name]:e.target.value
    // })
    setName({
      [e.target.name]: e.target.value
    })

  }
  const addPosts = (e) => {
    console.log('submit',e)
    e.preventDefault();
    
    const data = {
      name: values.post
    }
    console.log(data)
    // console.log(JSON.stringify(name));
    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     //     method:'POST',
    //     //     headers: {
    //     //         'content-type':'application/json'
    //     //     },
    //     //     body: JSON.stringify(data)
    //     // })
    fetch('http://localhost:3000/api/courses',{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      const dummyPosts = [...posts];
      dummyPosts.push(data);
      console.log(dummyPosts)
      setPost(dummyPosts)
    })
  }
  const getName = (id) => {
    console.log(id)
    return 1
  }
  // const onChangeName = (e) => {
  //   setUpdateName({
  //     [e.target.name]: e.target.value
  //   })
  // }
  const updatePosts = (e,id) => {
    console.log(e);
    e.persist();
    console.log(values)
    const data = {
      name: values[id]
    }
    console.log('update',data)
    fetch(`http://localhost:3000/api/courses/${id+1}`,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const dummyPostUpdate =[...posts];
      // let array = dummyPostUpdate.find(post => post.id === id+1);
      let array = dummyPostUpdate.map(post => {
        if(post.id === id+1) {
          post.name = data.name;
        }
        return post;
      });
      setPost(array);
      // console.log(array);
    })
  }

  const onChangeUpdateName = (e, index) => {
    // event.persist()
    e.persist();
    console.log(index);
    console.log(e);
    // const updateText = updateName[index];
    // console.log(updateText);
    // setUpdateName({
    //   update
    // })
    // setUserInput({
    //   update:e.target.value
    // });
    // console.log(userInput)
    // console.log(updateName)


  }

  const deletePosts = (e, id) => {
    console.log('id', id)
    e.persist();
    fetch(`http://localhost:3000/api/courses/${id}`,{
      method:'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const dummyDeleteArray = [...posts];
      let filterResult = dummyDeleteArray.filter(item => item.id !== data.id);
      console.log(filterResult);
      setPost(filterResult);
    })

  }
  return (
    <div className="App">
      <Post posts={posts}
        onChange={onChange}
        addPosts={addPosts}
        updatePosts={updatePosts}
        values={values}
        userInput={userInput}
        onChangeUpdateName={onChangeUpdateName}
        getName={getName}
        deletePosts = {deletePosts}
      />
    </div>
  );
}

export default App;
