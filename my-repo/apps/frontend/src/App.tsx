import { Tooltip } from '#components/ui/tooltip'
import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'


function App() {
  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton fallbackRedirectUrl="/onboard" forceRedirectUrl="/onboard" />
          <SignUpButton fallbackRedirectUrl="/onboard" forceRedirectUrl="/onboard" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App