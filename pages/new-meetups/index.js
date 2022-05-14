import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { useRouter } from 'next/router';


function NewMeetup() {
  const router = useRouter()
  async function addMeetupHandler(meetupData) {
    //we can send the request using axis package
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);

    router.replace('/')
  }
  return <NewMeetupForm onAddMeetup={ addMeetupHandler } />

}
export default NewMeetup