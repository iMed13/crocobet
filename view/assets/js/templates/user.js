import Interface from "./interface.js";

export default class extends Interface {
    constructor(params) {
        super(params); //Call the interface's constructor method and gets access to the  properties and methods
        this.userId = params.id;
    }

    async renderHTML() {
        const user = await this.getUserById();
        
        if(Object.keys(user).length==0){
          return   window.location.href = '/404'
        }

        let address = '';
        let company = '';
        this.setTitle(user.name);
        Object.entries(user.address).forEach(field => {
            if (field[0] !== 'geo') {
                address += `<div class="info-content-child"">
                    <b> ${field[0]} : </b>  ${field[1]}
                </div> `
            }
        })
        Object.entries(user.company).forEach(field => {
            company += `<div class="info-content-child"">
                    <b> ${field[0]} : </b>  ${field[1]}
                </div> `
        })
        return `
           <div class="user-content">
              <div class="card">
                <div class="card-body">
                  <div class="user-content-user-content">
                    <div class="info-content">
                      <b>Username: </b>  ${user.name}
                    </div>
                    <div class="info-content">
                      <b>Email: </b> ${user.email}
                    </div>
                    <div class="info-content">
                      <b>Phone: </b>  ${user.phone}
                    </div>
                    <div class="info-content">
                      <b>Website: </b>  ${user.website}
                    </div>
                    <div class="info-content multi-info">
                      <b>Address: </b> ` + address + `
                    </div>
                    <div class="info-content multi-info">
                      <b>Company: </b> ` + company + `
                    </div>
                  </div>
                  <div class="user-content-user-posts-button">
                    <a class="btn btn-primary"  role="button" href="/users/${this.userId}/posts"> ${user.name + 's'} Posts</a>
                  </div>
                </div>
              </div>
            </div>
        `;
    }

    // Fetch user by id
    async getUserById() {
        return fetch('https://jsonplaceholder.typicode.com/users/' + this.userId)
            .then(response => response.json())
            .then(json => json)
    }
}
