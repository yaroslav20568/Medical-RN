import { makeObservable, observable, action } from "mobx";
import { IRespAuthData } from "../types";

class UserStore {
	isAuth: boolean;
	userData: IRespAuthData | null;

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

	setUserData(userData: IRespAuthData) {
		this.userData = userData;
	}
}

export default new UserStore();