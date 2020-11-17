
export const signUp = userData => {
    fetch(`http://localhost:3005/v1/users/sign-up`, userData). 
    then( response => {console.log(response)}).catch(error => console.log(error));
}
 