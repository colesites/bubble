import RightSidebar from '@/components/shared/RightSidebar'
import React from 'react'

function Home() {
  return (
    <section className="flex flex-1 text-white">
      <div className="col-item-center flex-1 gap-10 py-10 overflow-y-scroll custom-scrollbar">
        {/*<Status />*/}
        {/*<Main />*/}
        <p>hey</p>
      </div>
      <div>
        <RightSidebar />
      </div>
    </section>
  )
}

export default Home