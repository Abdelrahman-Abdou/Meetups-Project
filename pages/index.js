import { Fragment } from 'react/cjs/react.development'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 5, 12345 Some City',
//     description: 'This is a first meetup!'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 10, 12345 Some City',
//     description: 'This is a second meetup!'
//   }
// ];


const HomePage = (props) => {

  return <Fragment>

    <h1>All Meetups</h1>
    <MeetupList meetups={ props.meetUps } />

  </Fragment >
}
export async function getStaticProps() {
  // code like fetch data
  //connecting to database
  const client = await MongoClient.connect(
    'mongodb+srv://AbdelrahmanAbdou:badriamostafa2@cluster0.l9c5s.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray()

  client.close();

  return ({
    props: {
      meetUps: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  })
}
// export async function getServerSideProps(context) {
//   //fetching data or authentication
//   const res = context.res
//   const req = context.req

//   return ({
//     props: {
//       meetUps: DUMMY_MEETUPS
//     }
//   })
// }

export default HomePage