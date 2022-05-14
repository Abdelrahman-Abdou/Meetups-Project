import { Fragment } from 'react/cjs/react.development'
import MeetupList from '../components/meetups/MeetupList'


const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
];


const HomePage = (props) => {

  return <Fragment>

    <h1>All Meetups</h1>
    <MeetupList meetups={ props.meetUps } />

  </Fragment >
}
// export async function getStaticProps() {
//code like fetch data
//   return ({
//     props: {
//       data: DUMMY_MEETUPS
//     },
//     revalidate: 1
//   })
// }
export async function getServerSideProps(context) {
  //fetching data or authentication
  const res = context.res
  const req = context.req

  return ({
    props: {
      meetUps: DUMMY_MEETUPS
    }
  })
}

export default HomePage