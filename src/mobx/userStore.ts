import { makeObservable, observable, action } from "mobx";
import { IUser } from "../types";

class UserStore {
	isAuth: boolean;
	userData: IUser | null;

	constructor() {
		this.isAuth = false;
		this.userData = null;
		makeObservable(this, {
			isAuth: observable,
			userData: observable,
			setIsAuth: action,
			setUserData: action
		})
	}

	setIsAuth(flag: boolean) {
		this.isAuth = flag;
	}

	setUserData(userData: IUser) {
		this.userData = userData;
	}
}

export default new UserStore();