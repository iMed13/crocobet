import Interface from "./interface.js";

export default class extends Interface {
    constructor(params) {
        super(params); //Call the interface's constructor method and gets access to the  properties and methods
        this.userId = params.id;
        this.setTitle("User Post " + this.userId);
    }

    async renderHTML() {
        const posts  = await this.getUserPostsById();

        if(Object.keys(posts).length==0){
          return   window.location.href = '/404'
        }
        
        let postsList = '';
        posts.forEach(post => {
            postsList+=`
                <div class="col-lg-3  col-md-4 col-sm-6 col-xs-12 post-card">
                  <div class="card" style="width: 100%; height: 100%">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                    </div>
                  </div>
                </div>
            `
        });

        return `
          <div class="posts-content">
              <div class="posts-content-posts-content">
                <div class="row">
                `+postsList+`
                </div>
              </div>
            </div>
        `;
    }

    // Fetch user posts by user id
    async getUserPostsById() {
        return fetch('https://jsonplaceholder.typicode.com/users/' + this.userId + '/posts')
            .then(response => response.json())
            .then(json => json)
    }
}
