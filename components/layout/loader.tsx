import React from 'react'
import Image from 'next/image'

type Props = {
  size?: number
}

const Loader = ({ size = 100 }: Props) => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Image
        src='/images/logo.svg'
        alt='Logo'
        width={size}
        height={size}
        className='animate-pulse duration-800'
      />
    </div>
  )
}

export default Loader