import { useAuth } from '../hook/useAuth';
import { UserInterface } from '../interface/user.interface';
import { CheckIcon } from './icons/CheckIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PersonIcon } from './icons/PersonIcon';
import './userCard.scss';

interface UserCardProps {
  user: UserInterface;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { onLogout } = useAuth();
  return (
    <article className="card">
      <div className="card__banner">
        <img
          className="card__img skeleton"
          loading="lazy"
          src="https://www.dumpaday.com/wp-content/uploads/2015/12/random-pictures-208.jpg"
          alt={user.name}
        />
      </div>

      <div className="card__content">
        <h2 className="card__name">{user.name}</h2>

        <ul className="card__details">
          <li className="card__details-info">
            <EmailIcon className="card__details-icon" aria-label="email icon" />
            {user.email}
          </li>
          <li className="card__details-info">
            <CheckIcon className="card__details-icon" aria-label="email verfied icon" />
            {user.email_verified ? 'Verfied' : 'No Verified'}
          </li>
          <li className="card__details-info">
            <PersonIcon className="card__details-icon" aria-label="user nickname" />
            {user.given_name}
          </li>
        </ul>

        <button className="logOut" onClick={onLogout}>
          Log Out
        </button>
      </div>
    </article>
  );
};
