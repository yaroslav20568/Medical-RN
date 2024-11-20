import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { ISelectItem, IInstitution, ITypeUser } from '../types';
import { siteUrl } from "../constants";
import { sortArray } from "../helpers";

interface IRespData {
	skip: number;
	totalSkip: number;
	items: Array<IInstitution>;
}

class InstitutionsStore {
	isLoading: boolean;
	skip: number;
	totalSkip: number;
	institutions: Array<IInstitution>;
	isLoadingMore: boolean;
	typesUsers: Array<ITypeUser>;

	constructor() {
		this.isLoading = false;
		this.skip = 0;
		this.totalSkip = 0;
		this.institutions = [];
		this.isLoadingMore = false;
		this.typesUsers = [];

		makeObservable(this, {
			isLoading: observable,
			skip: observable,
			totalSkip: observable,
			institutions: observable,
			loadInstitutions: action,
			loadMoreInstitutions: action,
			isLoadingMore: observable,
			typesUsers: observable
		})
	}

	loadInstitutions(name: string, region: string, cityId: number | '', typeInstitutionId: number | '', typesUser: Array<number>) {
		this.isLoading = true;
		axios<IRespData>(`${siteUrl}/api/laboratories?name=${name}&region=${region}&cityId=${cityId}&typeId=${typeInstitutionId}&typesUsers=${sortArray(typesUser).join(',')}`)
    .then(({ data }) => {
			runInAction(() => {
				this.skip = data.skip;
				this.totalSkip = data.totalSkip;
				this.institutions = data.items;
				this.isLoading = false;
			});
		})
	}

	loadMoreInstitutions() {
		if(this.skip < this.totalSkip) {
			this.isLoadingMore = true;
			this.skip = this.skip + 10;
			axios<IRespData>(`${siteUrl}/api/laboratories?skip=${this.skip}`)
			.then(({ data }) => {
				runInAction(() => {
					this.skip = data.skip;
					this.totalSkip = data.totalSkip;
					this.institutions = [...this.institutions, ...data.items];
					this.isLoadingMore = false;
				});
			})
		}
	}

	loadTypesUsers() {
		this.isLoading = true;
		axios<Array<ITypeUser>>(`${siteUrl}/api/types-users`)
    .then(({ data }) => {
			runInAction(() => {
				this.typesUsers = data;
				this.isLoading = false;
			});
		})
	}

	get getCities() {
		const citiesInstitution: Array<ISelectItem> = [];
		this.institutions.forEach(institution => {
			const bool = citiesInstitution.some(cityInstitution => cityInstitution?.value == institution.city?.id);

			if(!bool) {
				citiesInstitution.push({label: institution.city?.name, value: institution.city?.id});
			}
		});

		return citiesInstitution;
	}

	get getTypesInstitution() {
		const typesInstitution: Array<ISelectItem> = [];
		this.institutions.forEach(institution => {
			const bool = typesInstitution.some(typeInstitution => typeInstitution?.value == institution.type?.id);

			if(!bool) {
				typesInstitution.push({label: institution.type?.name, value: institution.type?.id});
			}
		});

		return typesInstitution;
	}
}

export default new InstitutionsStore();