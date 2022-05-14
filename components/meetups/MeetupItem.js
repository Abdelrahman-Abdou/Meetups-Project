import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import { useRouter } from 'next/router';
function MeetupItem(props) {
  //importing useRouter which imported instead of importing Link to programmatically navigate the page to meetupId page
  const router = useRouter()
  const showDetailsHandler = () => {
    router.push('/' + props.id)
  }

  return (
    <li className={ classes.item } key={ props.id }>
      <Card>
        <div className={ classes.image }>
          <img src={ props.image } alt={ props.title } />
        </div>
        <div className={ classes.content }>
          <h3>{ props.title }</h3>
          <address>{ props.address }</address>
        </div>
        <div className={ classes.actions }>
          <button onClick={ showDetailsHandler }>
            Show Details
          </button>

        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
