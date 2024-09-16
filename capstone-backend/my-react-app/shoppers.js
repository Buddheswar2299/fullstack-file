  import axios from "axios"
        
document.querySelector('#create-account-shopper').addEventListener('click',()=>{


    let rendercreateAccountForShopper = `
    <div class="sellers-right-shopper-create">
        <form action="http://localhost:5501/signup" method='post' id="consent-Form">
            <p>Login and start shopping from your favorite brands. Refer a friend and got 50% OFF</p>
            <input type="email" placeholder="Enter Email" name="email" id="shopper-login-form-email-shopper-create" required>
            <input type="password" placeholder="Enter password" name="password" id="shopper-login-form-password-shopper-create1" required>
            <input type="password" placeholder="Re-enter password" name="rePassword" id="shopper-login-form-password-shopper-create2" required>
            <button id="shopper-login-form-create-shopper-btn" type="submit">Create Account</button>
            <a href="./shoppersPage.html">Login</a>
        </form>
    </div>`

    

 
       

    document.querySelector('.shoppers-right').innerHTML = rendercreateAccountForShopper
    

    // document.querySelector('#shopper-login-form-create-shopper-btn').addEventListener('click',async(e)=>{
    //     e.preventDefault()
    //   let  email = document.querySelector('#shopper-login-form-email-shopper-create').value
    //    let  password = document.querySelector('#shopper-login-form-password-shopper-create1').value
    //   let  rePassword = document.querySelector('#shopper-login-form-password-shopper-create2').value

    //     console.log(email)
    //     console.log(password)
    //     console.log(rePassword)

    //     let body = {email,password,rePassword}
    //     console.log(body)
    //     if(password == rePassword){
    //         console.log('password are same')
    //         let res = await axios.post('http://localhost:5501/signup',body)
    //         console.log(res)
    //     }else{
    //         alert('password does not match')
    //     }
    //     })

})

document.querySelector('#shoppers-login-form-btn').addEventListener('click',async(e)=>{
    e.preventDefault()
    console.log('login into home page')
    // document.querySelector("#consent").addEventListener('submit')
    // let email = document.querySelector('#shoppers-login-form-email').value
    // let password = document.querySelector("#shoppers-login-form-password").value

  
    // let body1 =  {email,password}
    // console.log(body1)
    
    // let response = await axios.post('http://localhost:5501/signin',body1)
    // console.log(response)
   

})
