import { Fragment } from 'react/cjs/react.development'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'
import Head from 'next/head'

const HomePage = (props) => {

  return <Fragment>
    {/* adding head tag for search engines */ }
    <Head>
      <title>React Meetups</title>
      <meta
        name='description'
        content="Browse a huge list of highly active React meetups"></meta>
    </Head>
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