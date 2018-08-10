class User{
    constructor(){

    }
    setUser(user){
        this.user = user;
    }
    getUser(){
        return this.user;
    }
}

let user = new User();

exports.user = user;