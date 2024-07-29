import { UserCard } from '../components/UserCard';
import { useAuth } from '../hook/useAuth';
import './userProfile.scss';

export const UserProfile = () => {
  const { authState } = useAuth();

  console.log(authState);

  console.log(authState.user);
  return (
    <section className="profile wrapper">
      <h1 className="profile__title">User Profile: {authState.user?.name}</h1>
      {authState.user && <UserCard user={authState.user} />}
    </section>
  );
};
