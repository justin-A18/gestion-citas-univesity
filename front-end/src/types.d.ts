interface UserModel {
	id?: string;
	username: string;
	email: string;
	role: string;
}

interface UserCredentials {
	email: string;
	password: string;
}

interface LoginResponse {
	user: UserModel;
	token: string;
}

interface ErrorAuth {
	error: string;
}

/* Store */

type status = 'authenticated' | 'not-authenticated' | 'checking';

interface InitialState {
	user: UserModel | null;
	status: status;
	token: string | null;
	messageError: string | null;
}

interface Store {
	initialState: InitialState;
	onLogin: (data: LoginResponse) => void;
	onLogout: (errMsg: string | null) => void;
	checkingCredentials: () => void;
}

/* Doctors */

interface DoctorModel {
	id?: string;
	fullname: string;
}

interface DoctorFull extends DoctorModel {
	description: string;
}

interface DoctorsResponse {
	doctors: DoctorFull[];
}

/* Quotes */

interface QuotesResponse {
	quotes: Quote[];
}


interface QuoteModel {
	name:     string;
	lastname: string;
	doctor:   string;
	reason:   string;
	createAt: Date;
	endAt:    Date;
}

interface Quote {
	name:     string;
	lastname: string;
	doctor:   DoctorModel;
	reason:   string;
	active:   boolean;
	createAt: Date;
	endAt:    Date;
	id:       string;
}

interface QuoteResponse {
	name:     string;
	lastname: string;
	doctor:   string;
	reason:   string;
	active:   boolean;
	createAt: Date;
	endAt:    Date;
	id:       string;
}

