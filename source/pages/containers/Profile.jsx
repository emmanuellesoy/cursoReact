import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../posts/containers/Post.jsx';
import api from '../../api.js';

class Profile extends Component {

   constructor(props){
      super(props);

      this.state = {
         user: {},
         posts: [],
         loading: true
      };
   }

   async componentDidMount(){
      const [
         user,
         posts
      ] = await Promise.all([
         api.users.getSingle(this.props.userId),
         api.users.getPost(this.props.userId)
      ]);
      this.setState({
         user,
         posts,
         loading: false
      })
   }

   render() {
      return (
         <section name="profile">
            <h2>Basic info</h2>
            <input type="email" value={this.state.user.email} disabled />

            {this.state.user.address && (
               <fieldset>
                  <legend>Adress</legend>
                  <adress>
                     {this.state.user.address.street} <br />
                  {this.state.user.address.suite} <br />
               {this.state.user.address.city} <br />
            {this.state.user.address.zipcode} <br />
      </adress>
   </fieldset>
)}

<section>
   {
      this.state.posts.map(post => <Post key={post.id} user={this.state.user} {...post} />)
   }
</section>

</section>
);
}

}

export default Profile;
