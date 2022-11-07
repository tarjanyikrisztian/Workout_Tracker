import React from 'react'
import '../css/profile.css'

export const Profile = () => {

  return (

    <div className='profile'>
      <div className="profileInfo profileCards">
        <img className="profileImage" src="https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="profile" />
        <span className="profileName">John Doe</span>
        <span className="profileBio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquet nisl, eget aliquet nunc nisl sit amet nisl. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquet nisl, eget aliquet nunc nisl sit amet nisl.</span>
      </div>
      <div className="div2 profileCards"></div>
      <div className="div3 profileCards"></div>
      <div className="div4 profileCards"></div>
      <div className="div5 profileCards"></div>
    </div>




  )
}
