import create from 'solid-zustand'

interface AuthenticationState {
  isAuthenticated: boolean
};

const loginStore = create<AuthenticationState>(set => ({
  isAuthenticated: false,
  authenticate: () => set(state => ({ ...state, isAuthenticated: true })),
  logout: () => set(state => ({ ...state, isAuthenticated: false })),
}))

export const tryLogin = async () =>{
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',
  });
  const { isAuthenticated } = await response.json();
  loginStore.setState(state => ({ ...state, isAuthenticated }));
}
