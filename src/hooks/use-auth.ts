import {useSelector} from 'react-redux'

interface RootState {
    user: {
      email: string;
      token: string;
      id: string;
    };
  }

  export function useAuth() {
    const { email, token, id } = useSelector((state: RootState) => state.user);
    return {
      isAuth: !!email,
      email,
      token,
      id,
    };
  }

  