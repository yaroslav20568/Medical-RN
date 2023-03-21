import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import { IInstitutionRB } from '../types';

interface IRespData {
	status: string;
	data: {
		current_page: number;
		total_pages: number;
		items: Array<IInstitutionRB>;
	}
}

class InstitutionsStore {
	isLoading: boolean;
	currentPage: number;
	totalPages: number;
	institutions: Array<IInstitutionRB>;

	constructor() {
		this.isLoading = false;
		this.currentPage = 1;
		this.totalPages = 1;
		this.institutions = [];
		makeObservable(this, {
			isLoading: observable,
			currentPage: observable,
			totalPages: observable,
			institutions: observable,
			loadInstitutions: action
		})
	}

	loadInstitutions() {
		this.isLoading = true;
		axios<IRespData>('http://dev6.dewpoint.of.by/api/laboratories')
    .then(({ data }) => {
			this.currentPage = data.data.current_page;
			this.totalPages = data.data.total_pages;
			this.institutions = data.data.items;
			this.isLoading = false;
		})
	}
}

export default new InstitutionsStore();