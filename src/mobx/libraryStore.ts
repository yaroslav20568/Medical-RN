import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IArticleSections, IArticles } from '../types';
import { siteUrl } from "../constants";

interface IRespArticleSections {
	status: string;
	data: Array<IArticleSections>;
}

interface IRespArticles {
	status: string;
	data: Array<IArticles>;
}

class LibraryStore {
	isLoadingSections: boolean;
	articleSections: Array<IArticleSections>;
	isLoadingArticles: boolean;
	articles: Array<IArticles>;

	constructor() {
		this.isLoadingSections = false;
		this.articleSections = [];
		this.isLoadingArticles = false;
		this.articles = [];
		makeObservable(this, {
			isLoadingSections: observable,
			articleSections: observable,
			loadArticleSections: action,
			isLoadingArticles: observable,
			articles: observable,
			loadArticles: action
		})
	}

	loadArticleSections() {
		this.isLoadingSections = true;
		axios<IRespArticleSections>(`${siteUrl}/api/article-sections`)
    .then(({ data }) => {
			runInAction(() => {
				this.articleSections = data.data;
				this.isLoadingSections = false;
			});
		})
	}

	loadArticles(id: number) {
		this.isLoadingArticles = true;
		axios<IRespArticles>(`${siteUrl}/api/article/${id}`)
		.then(({ data }) => {
			runInAction(() => {
				this.articles = data.data;
				this.isLoadingArticles = false;
			});
		})
	}
}

export default new LibraryStore();