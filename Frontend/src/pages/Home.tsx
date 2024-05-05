import React from 'react'


const home = () => {
  return (

    <>
      <section className='py-8 border-b'>
        <section className='flex justify-between items-center gap-20'>
          <div className='w-1/2 flex-col basis-2/3'>
            <h1 className='text-7xl font-black'>
              Find Instant Food <br />For Instant Hungers
            </h1>
            <img className='pt-3 w-3/4' src="\src\assets\10273781.jpg" alt="" />
          </div>
          <div className='w-1/2 flex-col  basis-1/3'>
            <div className="card w-full shadow-xl bg-primary">
              <div className="card-body">
                <h1 className='text-lg text-center font-bold'> Find the complete food menu around you</h1>
                <p>
                  We love finding new food and places to eat. Well what do you feel like eating today? Feel like going to a fancy place or maybe find some hot underrated place to eat. Eat it your way.
                </p>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            <img className='pt-3 w-full ' src="src\assets\39181.jpg" alt="" />
          </div>
        </section>

      </section>
    </>
  )
}

export default home