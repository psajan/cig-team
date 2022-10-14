import React from 'react'

const Register = () => {
  return (
    <div>
    <section className="signup">
      <div className='container mt-5'>
        <div className='signup-content'>
        <div className='signup-form'>
<h2 className='form-title'>Sign up</h2>
<form className='register-form' id='register-form'>
  <div className='form-group'>
    <label htmlFor= 'name'>
    <i class="zmdi zmdi-account material-icon-name"></i>
    </label>
    <input type = "text" name="name" id="name" autoComplete='off' placeholder='Enter Your Name'></input>
  </div>
</form>
        </div>
        </div>
      </div>
    </section>
       
    </div>
  )
}

export default Register