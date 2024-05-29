import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'

const Dash = () => {
  const { username } = useContext(AuthContext);

  return (
    <div className="dash-nav">
        <div className='dav-body'>
            <div className=''></div>
        </div>
      dash
      {username && <div>{username}</div>}
      
    </div>
  )
}

export default Dash;