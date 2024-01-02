import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { ISelectItem, IInstitutionRB, ITypeUser } from '../types';
import { siteUrl } from "../constants";
import { sortArray } from "../helpers";

interface IRespData {
	skip: number;
	totalSkip: number;
	items: Array<IInstitutionRB>;
}

class InstitutionsStore {
	isLoading: boolean;
	skip: number;
	totalSkip: number;
	institutions: Array<IInstitutionRB>;
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

	loadInstitutions(searchValue: string, region: string, cityId: number | '', typeInstitutionId: number | '', typesUser: Array<number>) {
		this.isLoading = true;
		axios<IRespData>(`${siteUrl}/api/laboratories?name=${searchValue}&region=${region}&cityId=${cityId}&typeId=${typeInstitutionId}&typesUsers=${sortArray(typesUser).join(',')}`)
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
			axios<IRespData>(`${siteUrl}/api/laboratories?skip=${this.skip + 10}`)
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

	get getTypesUser() {
		const typesUser: Array<ISelectItem> = [];
		this.institutions.forEach(institution => {
			institution.typesUsers.split(',').forEach(type => {
				const bool = typesUser.some(typeUser => typeUser?.value == +type);

				if(!bool) {
					typesUser.push({label: this.typesUsers[+type].name, value: this.typesUsers[+type].id - 1, isChecked: false});
				}
			});
		});

		return typesUser;
	}

	getTypesUsers() {
		this.isLoading = true;
		axios<Array<ITypeUser>>(`${siteUrl}/api/types-users`)
    .then(({ data }) => {
			runInAction(() => {
				this.typesUsers = data;
				this.isLoading = false;
			});
		})
	}
}

export default new InstitutionsStore();