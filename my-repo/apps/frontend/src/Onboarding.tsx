import { useUser } from '@clerk/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Onboarding = () => {

  const navigate = useNavigate()
  const { isLoaded, isSignedIn, user } = useUser()

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return
    saveUser()
    navigate("/", { replace: true })

  }, [isLoaded, isSignedIn, user])

  const saveUser = async () => {
    const response = await axios.post("http://localhost:8080/users/new", {
      "clerkID": user?.id,
      "username": user?.fullName,
      "email": user?.primaryEmailAddress?.emailAddress,
    })
  }
  return (
    <div>Onboarding</div>
  )
}

export default Onboarding