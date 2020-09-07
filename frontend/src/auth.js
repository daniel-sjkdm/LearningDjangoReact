import axios from 'axios';


export default class auth {
    
    isAuthenticated = false;
    
    login = async (username, password) => {

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
    
        const body = JSON.stringify({
            username, 
            password
        });
    
        const request = await axios.post(
            "http://localhost:8000/accounts/login/",
            body,
            config
        );
        if (request.status === 200) {
            const data = request.data;
            console.log("From auth.js = ", data);
            localStorage.setItem(
                'login',
                JSON.stringify({
                    login: true,
                    token: data.token
                })
            )
            this.isAuthenticated = true;
        }
        else {
            return {"Error": "Invalid credentials..."}
        }
    }

    register = async (user_data) => {
        console.log("From register = ", user_data)
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const body = JSON.stringify(user_data);

        const request = await axios.post(
            "http://localhost:8000/accounts/register/",
            body,
            config
        ) 
        
        if (request.status === 200) {
            const data = request.data;
            console.log(request)
            console.log("From register: ", data)
            return data;
        }
    }   

}