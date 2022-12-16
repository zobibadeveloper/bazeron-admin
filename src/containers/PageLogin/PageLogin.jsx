import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'

export default function PageLogin() {
  const [{ email, password }, setForm] = useState({ email: "", password: "" });
  const {login, isAuthenticated} = useAuth();

  console.log(isAuthenticated)

  const handleChange = (e) => {
    setForm({ email, password, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 offset-md-3 mt-4">
          <div className='d-flex justify-content-center mt-4'>
            <img src="/images/logo.png" className="img-fluid profile-image-pic my-3 mt-5"
              width="200px" alt="profile" />
          </div>
          <div className="card my-2">
            <form className="card-body cardbody-color p-lg-3" onSubmit={handleSubmit}>
              <div className="text-center my-2">
                <h2 className="text-center text-dark">Giriş</h2>
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                  placeholder="Mail Adresi" required value={email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder="Şifre" required value={password} onChange={handleChange} />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5 mb-3 w-100">GİRİŞ</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
