import Interface from "./interface.js";

export default class extends Interface {
    constructor(params) {
        super(params); //Call the interface's constructor method and gets access to the  properties and methods
        this.setTitle("404");
    }

    async renderHTML() {
        return '<div>Such route does not exist</div>';
    }
  
}
