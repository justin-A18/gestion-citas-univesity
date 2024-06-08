import { create } from 'zustand';

const userStorage = localStorage.getItem('user') || null;
const tokenStorage = localStorage.getItem('token') || null;
const statusStorage = localStorage.getItem('status') || 'not-authenticated';

const initialState: InitialState = {
	user: userStorage ? JSON.parse(userStorage) : null,
	token: tokenStorage,
	status: statusStorage as status,
	messageError: null,
};

export const authStore = create<Store>()((set) => ({
	initialState,
	checkingCredentials: () =>
		set({
			initialState: {
				user: null,
				token: null,
				status: 'checking',
				messageError: null,
			},
		}),
	onLogin: ({ token, user }) =>
		set({
			initialState: {
				user,
				token,
				status: 'authenticated',
				messageError: null,
			},
		}),
	onLogout: (errMsg) =>
		set({
			initialState: {
				user: null,
				token: null,
				messageError: errMsg,
				status: 'not-authenticated',
			},
		}),
}));
