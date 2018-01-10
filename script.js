// ES6 Class module
class User {
    constructor(obj) {
        this.id = obj.id || null;
        this.name = obj.name || "";
        this.todos= obj.todo || [];
        this.posts = obj.posts || [];
    };
    url() {
        return `https://jsonplaceholder.typicode.com/users/${this.id}`;
    }
    todosUrl(){
            return `${this.url()}/todos`;
        }
    postUrl(){
            return `${this.url()}/posts`;
            }
    fetch(){
        return fetch(this.url())
        .then(response => response.json())
        .then(data => {
            this.name = data.name;
            return Promise.resolve(this);
            })
    }
    loadTodos(){
                return fetch(this.todosUrl())
                    .then(response => response.json())
                    .then(data => {
                        this.todos = data.map(todo => new Todo(this, todo))
                        return (Promise.resolve(this));
                    });
    }
    loadPosts(){
                return fetch(this.todosUrl())
                    .then(response => response.json())
                    .then(data => {
                        this.posts = data.map(post => new Post(this, post))
                        return (Promise.resolve(this));
                    });
    };
};

//function User (obj){
//    this.id = obj.id || null;
//    this.name = obj.name || "";
//    this.todos= obj.todo || [];
//    this.posts = obj.posts || [];

//          this.url =  function(){
//                       return `https://jsonplaceholder.typicode.com/users/${ this.id }`;
//          };
//          this.todosUrl = function(){
//                       return `${ this.url() }/todos`;
//          };
//  this.postsUrl = function(){
//    return `${ this.url() }/posts`;
//  };

//          this.fetch = function(){
//                       return fetch(this.url())
//                       .then(response => response.json())
//                       .then(data => {
//                                   this.name = data.name;
//                                   return Promise.resolve(this);
//                       })
//                       };
//          this.loadTodos = function(){
//                       return fetch(this.todosUrl())
//                       .then(response => response.json())
//                       .then(data => {
//                                   this.todos = data.map(todo => new Todo(this,todo));
//                                   return Promise.resolve(this);
//                       });
//  };
//            this.loadPosts = function(){
//                       return fetch(this.postsUrl())
//                       .then(response => response.json())
//                       .then(data => {
//                                   this.posts = data.map(post => new Post(this,post));
//                                   return Promise.resolve(this);
//                       });
// };


//};

// post constructor

class Post {
    constructor(user, obj) {
        this.user = user;
        this.id = obj.id || null;
        this.title = obj.title || "";
        this.body = obj.body || "";
        this.commentsUrl = function () {
            return `https://jsonplaceholder.typicode.com/posts/${this.id}/comments`;
        }
    }

            // this.fetch = function(){
            //           return fetch(this.Url())
            //          .then(response => response.json())
            //          .then(data => {
            //                       this.name = data.name;
            //                       return Promise.resolve(this);
            //          })
            //           };

    loadComments() {
        return fetch(this.commentsUrl())
            .then(response => response.json())
            .then(data => {
                this.comments = data.map(comment => new Comment(this, comment));
                return Promise.resolve(this);
            });
    };
}
// comments Constructor
class Comment {
    constructor(user, post) {
        this.user = user;
        this.id = post.id || null;
        this.title = post.title || "";
    }
}



let leanne = new User({id : 1});
leanne
.fetch() // load the data
.then(() => leanne.loadTodos()) // load the todos
.then(() => leanne.loadPosts())
//.then(() => Promise.all( leanne.posts.map(post => post.loadComments())) )
.then(()=> leanne.posts[0].loadComments())
.then(() => console.log("Leanne with todos:", leanne))
// .then(() => console.log("Leanne with todos:", JSON.stringify(leanne.posts[0].comments)))
;

let ervin = new User({id : 2});
ervin
.fetch() // load the data
.then(() => ervin.loadTodos()) // load the todos
.then(() => ervin.loadPosts())
    .then(() => ervin.posts[0].loadComments())
.then(() => console.log("Ervin with todos:", ervin));

class Todo {
    constructor(user, obj) {
        this.user = user;
        this.id = obj.id || null;
        this.title = obj.title || "";
        this.completed = obj.completed || false;
    }
            // method
            isCompleted(){
                         if(this.completed)
                                     return `Todo id ${this.id} of user ${this.user.id} is completed.`;
                         else
                                     return `Todo id ${this.id} of user ${this.user.id} is incomplete.`;
            }
}
 
