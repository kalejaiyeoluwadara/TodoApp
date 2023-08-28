import React from 'react'
import { useGlobal } from './context'
function Nav() {
  const {mode} = useGlobal();
  return (
    <div className={` ${mode? 'nav' : 'nav2'} `}>
      
    </div>
  )
}

export default Nav
