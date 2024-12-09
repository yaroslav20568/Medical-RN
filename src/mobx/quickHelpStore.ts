import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IHotline } from '../types';
import { siteUrl } from "../constants";

interface IRespData {
	skip: number;
	totalSkip: number;
	items: Array<IHotline>;
}

class QuickHelpStore {
	isLoaded: boolean;
	skip: number;
	totalSkip: number;
	hotlines: Array<IHotline>;
	isLoadingMore: boolean;

	constructor() {
		this.isLoaded = false;
		this.skip = 0;
		this.totalSkip = 0;
		this.hotlines = [];
		this.isLoadingMore = false;

		makeObservable(this, {
			isLoaded: observable,
			skip: observable,
			totalSkip: observable,
			hotlines: observable,
			loadHotlines: action,
			loadMoreHotlines: action,
			isLoadingMore: observable
		})
	}

	loadHotlines(): void {
		this.isLoaded = false;
		axios<IRespData>(`${siteUrl}/api/hotlines`)
    .then(({ data }) => {
			runInAction(() => {
				this.skip = data.skip;
				this.totalSkip = data.totalSkip;
				this.hotlines = data.items;
				this.isLoaded = true;
			});
		})
	}

	loadMoreHotlines(): void {
		if(this.skip < this.totalSkip) {
			this.isLoadingMore = true;
			this.skip = this.skip + 5;
			axios<IRespData>(`${siteUrl}/api/hotlines?skip=${this.skip}`)
			.then(({ data }) => {
				runInAction(() => {
					this.skip = data.skip;
					this.totalSkip = data.totalSkip;
					this.hotlines = [...this.hotlines, ...data.items];
					this.isLoadingMore = false;
				});
			})
		}
	}
}

export default new QuickHelpStore();