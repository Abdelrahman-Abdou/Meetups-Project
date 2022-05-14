// import MeetupDetails from "../../components/meetups/MeetupDetails";
// import { MongoClient } from "mongodb";

// const MeetupItemDetails = (props) => {

//   return (


//     <MeetupDetails
//       title={ props.meetupData.title }
//       address={ props.meetupData.address }
//       description={ props.meetupData.description }
//       image={ props.meetupData.image }
//     />
//   )
// }
// //getStaticPath is a function that is used with two conditioins
// //A- with getStaticProps in B- dynamic pages
// export async function getStaticPaths() {
//   const client = await MongoClient.connect(
//     'mongodb+srv://AbdelrahmanAbdou:badriamostafa2@cluster0.l9c5s.mongodb.net/meetups?retryWrites=true&w=majority'
//   );
//   const db = client.db();

//   const meetupsCollection = db.collection('meetups');
//   const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

//   return ({
//     fallback: false,
//     paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
//   })
// }
// export async function getStaticProps(context) {
//   //get the id from params object that hold the encoded url(meetupId)
//   const meetupId = context.params.meetupId

//   const client = await MongoClient.connect(
//     'mongodb+srv://AbdelrahmanAbdou:badriamostafa2@cluster0.l9c5s.mongodb.net/meetups?retryWrites=true&w=majority'
//   )
//   const db = client.db();

//   const meetupsCollection = db.collection('meetups');
//   const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

//   client.close();


//   return ({
//     props: {
//       meetupData: selectedMeetup
//     },


//   })
// }

// export default MeetupItemDetails;
import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetails from "../../components/meetups/MeetupDetails";

function MeetupItemDetails(props) {
  return (
    <MeetupDetails
      image={ props.meetupData.image }
      title={ props.meetupData.title }
      address={ props.meetupData.address }
      description={ props.meetupData.description }
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://AbdelrahmanAbdou:badriamostafa2@cluster0.l9c5s.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  console.log('meetups', meetups)
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://AbdelrahmanAbdou:badriamostafa2@cluster0.l9c5s.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupItemDetails;