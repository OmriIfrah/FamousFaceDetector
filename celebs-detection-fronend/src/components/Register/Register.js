import React, { useState } from 'react'

const Register = ({ onRouteChange,  loadUser}) => {
  const [signInName, setSignInName] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onNameChange = (event) => {
    setSignInName(event.target.value);
  }

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  }

  const onSubmitRegister = () => {
    fetch('http://localhost:3001/register',{
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: signInName,
      email: signInEmail,
      password: signInPassword
    })
  })
  .then(response => response.json())
  .then(user => {
    if (user)
    {
      loadUser(user);
      onRouteChange('home');
    }
    //console.log("data = " + user);
  })
  

  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="name" id="name"/>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"/>
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
          </fieldset>
          <div className="lh-copy mt3">
            <input onClick={onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
          </div>
        </div>
      </main>
    </article>
  );
}
export default Register;