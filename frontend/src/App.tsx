import './App.css'
import { Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import {useCurrentUser} from "../hooks/useCurrentUser.ts"

function App() {
  const {email} = useCurrentUser()
  console.log(email)
  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App