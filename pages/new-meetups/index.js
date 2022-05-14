import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { useRouter } from 'next/router';
import { Fragment } from 'react'
import Head from 'next/head'
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
  return <Fragment>
    <Head>
      <title>Add a New Meetup</title>
      <meta
        name="description"
        content="Add your own meetups and create amazing networking opportunities."
      >

      </meta>
    </Head>
    <NewMeetupForm onAddMeetup={ addMeetupHandler } />
  </Fragment >
}
export default NewMeetup