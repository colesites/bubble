"use-client"

import React from 'react'

function ProfileImage ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-10 h-10 rounded-full overflow-hidden">    
        {children}
    </div>
  )
}

export default ProfileImage