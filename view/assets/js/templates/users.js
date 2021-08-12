import Interface from "./interface.js";

export default class extends Interface {
    constructor(params) {
        super(params); //Call the interface's constructor method and gets access to the  properties and methods
        this.setTitle("Users");
    }

    async renderHTML() {
        const users = await this.getUsers();
        let userList = '';
        users.forEach(user => {
            userList += `
            <div class="col-lg-3  col-md-4 col-sm-6 col-xs-12 user-card">
            <div class="card" style="width: 100%;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <a class="btn btn-primary"  role="button" href="/users/${user.id}"">See More</a>
                </div>
            </div>
            </div>
            `
        })
        return `
            <div class="users-content">
            <div class="row">
            ` + userList + ` 
            </div>
            </div>
        `;
    }

    // Fetch users
    async getUsers() {
        return fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => json)
    }
}
