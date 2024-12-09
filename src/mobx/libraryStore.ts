import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { ILibraryArticle, ILibraryItem } from '../types';
import { siteUrl } from "../constants";
import { traversingTreeArticles } from "../helpers";

interface IRespData {
	skip: number;
	totalSkip: number;
	items: Array<ILibraryItem>;
}

class LibraryStore {
	isLoadedArticles: boolean;
	articles: Array<ILibraryArticle>;
	isLoadedItems: boolean;
	skip: number;
	totalSkip: number;
	items: Array<ILibraryItem>;
	isLoadingItemsMore: boolean;

	constructor() {
		this.isLoadedArticles = false;
		this.articles = [];
		this.isLoadedItems = false;
		this.skip = 0;
		this.totalSkip = 0;
		this.items = [];
		this.isLoadingItemsMore = false;
		makeObservable(this, {
			isLoadedArticles: observable,
			articles: observable,
			loadArticles: action,
			isLoadedItems: observable,
			skip: observable,
			totalSkip: observable,
			items: observable.shallow,
			isLoadingItemsMore: observable,
			loadItems: action
		})
	}

	loadArticles(): void {
		this.isLoadedArticles = false;
		axios<Array<ILibraryArticle>>(`${siteUrl}/api/library-articles`)
    .then(({ data }) => {
			runInAction(() => {
				this.articles = traversingTreeArticles(data);
				this.isLoadedArticles = true;
			});
		})
	}

	loadItems(libraryArticleId: number): void {
		this.isLoadedItems = false;
		axios<IRespData>(`${siteUrl}/api/library-items/?libraryArticleId=${libraryArticleId}`)
		.then(({ data }) => {
			runInAction(() => {
				this.skip = data.skip;
				this.totalSkip = data.totalSkip;
				this.items = data.items;
				this.isLoadedItems = true;
			});
		})
	}

	loadMoreItems(libraryArticleId: number): void {
		if(this.skip < this.totalSkip) {
			this.isLoadingItemsMore = true;
			this.skip = this.skip + 5;
			axios<IRespData>(`${siteUrl}/api/library-items?libraryArticleId=${libraryArticleId}&skip=${this.skip}`)
			.then(({ data }) => {
				runInAction(() => {
					this.skip = data.skip;
					this.totalSkip = data.totalSkip;
					this.items = [...this.items, ...data.items];
					this.isLoadingItemsMore = false;
				});
			})
		}
	}
}

export default new LibraryStore();