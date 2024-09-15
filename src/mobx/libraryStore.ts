import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { ILibraryArticle, ILibraryItem } from '../types';
import { siteUrl } from "../constants";
import { traversingTreeArray } from "../helpers";

class LibraryStore {
	isLoadingArticles: boolean;
	articles: Array<ILibraryArticle>;
	isLoadingItems: boolean;
	items: Array<ILibraryItem>;

	constructor() {
		this.isLoadingArticles = false;
		this.articles = [];
		this.isLoadingItems = false;
		this.items = [];
		makeObservable(this, {
			isLoadingArticles: observable,
			articles: observable,
			loadArticles: action,
			isLoadingItems: observable,
			items: observable,
			loadItems: action
		})
	}

	loadArticles() {
		this.isLoadingArticles = true;
		axios<Array<ILibraryArticle>>(`${siteUrl}/api/library-articles`)
    .then(({ data }) => {
			runInAction(() => {
				this.articles = traversingTreeArray(data);
				this.isLoadingArticles = false;
			});
		})
	}

	loadItems(id: number) {
		this.isLoadingItems = true;
		axios<Array<ILibraryItem>>(`${siteUrl}/api/library-items/?libraryArticleId=${id}`)
		.then(({ data }) => {
			runInAction(() => {
				this.items = data;
				this.isLoadingItems = false;
			});
		})
	}
}

export default new LibraryStore();