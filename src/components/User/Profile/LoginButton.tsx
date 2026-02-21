import { signIn } from 'next-auth/react'
import React from 'react'

const LoginButton = () => {
  return (
    <button
              onClick={() => signIn("google")}
              className="bg-black text-white text-md px-10 py-2 font-extrabold rounded-sm shadow hover:font-black hover:shadow-lg hover:bg-green-600"
            >
              Login
            </button>
  )
}

export default LoginButton