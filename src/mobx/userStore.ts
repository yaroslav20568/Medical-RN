import { makeObservable, observable, action, runInAction } from "mobx";
import { IAnalysis, IUser } from "../types";
import axios from "axios";
import { siteUrl } from "../constants";

interface IRespData {
	skip: number;
	totalSkip: number;
	items: Array<IAnalysis>;
}

class UserStore {
	isAuth: boolean;
	userData: IUser | null;
	isLoaded: boolean;
	skip: number;
	totalSkip: number;
	analyzes: Array<IAnalysis>;
	isLoadingMore: boolean;

	constructor() {
		this.isAuth = false;
		this.userData = null;
		this.isLoaded = false;
		this.skip = 0;
		this.totalSkip = 0;
		this.analyzes = [];
		this.isLoadingMore = false;
		makeObservable(this, {
			isAuth: observable,
			userData: observable,
			isLoaded: observable,
			skip: observable,
			totalSkip: observable,
			analyzes: observable,
			isLoadingMore: observable,
			setIsAuth: action,
			setUserData: action,
			loadAnalyzes: action,
			loadMoreAnalyzes: action
		})
	}

	setIsAuth(flag: boolean): void {
		this.isAuth = flag;
	}

	setUserData(userData: IUser | null): void {
		this.userData = userData;
	}

	loadAnalyzes(userId: number | undefined): void {
		this.isLoaded = false;
		axios<IRespData>(`${siteUrl}/api/analyzes?userId=${userId}`)
    .then(({ data }) => {
			runInAction(() => {
				this.skip = data.skip;
				this.totalSkip = data.totalSkip;
				this.analyzes = data.items;
				this.isLoaded = true;
			});
		})
	}

	loadMoreAnalyzes(userId: number | undefined): void {
		if(this.skip < this.totalSkip) {
			this.isLoadingMore = true;
			this.skip = this.skip + 5;
			axios<IRespData>(`${siteUrl}/api/analyzes?userId=${userId}&skip=${this.skip}`)
			.then(({ data }) => {
				runInAction(() => {
					this.skip = data.skip;
					this.totalSkip = data.totalSkip;
					this.analyzes = [...this.analyzes, ...data.items];
					this.isLoadingMore = false;
				});
			})
		}
	}
}

export default new UserStore();