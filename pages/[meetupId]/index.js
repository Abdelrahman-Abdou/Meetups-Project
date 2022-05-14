import MeetupDetails from "../../components/meetups/MeetupDetails";


const MeetupItemDetails = (props) => {

  return (


    <MeetupDetails
      title={ props.meetupData.title }
      address={ props.meetupData.address }
      description={ props.meetupData.description }
      image={ props.meetupData.image }
    />
  )
}
//getStaticPath is a function that is used with two conditioins
//A- with getStaticProps in B- dynamic pages
export async function getStaticPaths() {
  return ({
    fallback: false,
    paths: [
      { params: { meetupId: 'm1' } },
      { params: { meetupId: 'm2' } }
    ]
  })
}
export async function getStaticProps(context) {
  //get the id from params object tha hol the encoded url(meetupId)
  const meetupId = context.params.meetupId
  return ({
    props: {
      meetupData: {
        title: 'A Second Meetup',
        address: 'Some address 10, 12345 Some City',
        description: 'This is a second meetup!',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        id: meetupId
      }
    },
    revalidate: 1

  })
}

export default MeetupItemDetails;