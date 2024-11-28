import { makeObservable, observable, action, runInAction, computed } from "mobx";
import axios from "axios";
import { ISelectItem, IInstitution } from '../types';
import { siteUrl } from "../constants";
import { sortArray } from "../helpers";

interface IRespData {
	skip: number;
	totalSkip: number;
	items: Array<IInstitution>;
}

class HelpAbroadsStore {
	isLoading: boolean;
	skip: number;
	totalSkip: number;
	institutions: Array<IInstitution>;
	isLoadingMore: boolean;

	constructor() {
		this.isLoading = false;
		this.skip = 0;
		this.totalSkip = 0;
		this.institutions = [];
		this.isLoadingMore = false;

		makeObservable(this, {
			isLoading: observable,
			skip: observable,
			totalSkip: observable,
			institutions: observable.shallow,
			loadInstitutions: action,
			loadMoreInstitutions: action,
			isLoadingMore: observable,
			getCities: computed,
			getСountries: computed,
			getTypesInstitution: computed
		})
	}

	loadInstitutions(name: string, countryId: number | '', cityId: number | '', typeInstitutionId: number | '', typesUser: Array<number>): void {
		this.isLoading = true;
		axios<IRespData>(`${siteUrl}/api/help-abroads?name=${name}&countryId=${countryId}&cityId=${cityId}&typeId=${typeInstitutionId}&typesUsers=${sortArray(typesUser).join(',')}`)
    .then(({ data }) => {
			runInAction(() => {
				this.skip = data.skip;
				this.totalSkip = data.totalSkip;
				this.institutions = data.items;
				this.isLoading = false;
			});
		})
	}

	loadMoreInstitutions(): void {
		if(this.skip < this.totalSkip) {
			this.isLoadingMore = true;
			this.skip = this.skip + 10;
			axios<IRespData>(`${siteUrl}/api/help-abroads?skip=${this.skip}`)
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

	get getCities(): Array<ISelectItem> {
		const citiesInstitution: Array<ISelectItem> = [];
		this.institutions.forEach(institution => {
			const bool = citiesInstitution.some(cityInstitution => cityInstitution?.value == institution.city?.id);

			if(!bool) {
				citiesInstitution.push({label: institution.city?.name, value: institution.city?.id});
			}
		});

		return citiesInstitution;
	}

	get getСountries(): Array<ISelectItem> {
		const countriesInstitution: Array<ISelectItem> = [];
		this.institutions.forEach(institution => {
			const bool = countriesInstitution.some(cityInstitution => cityInstitution?.value == institution.city?.country.id);

			if(!bool) {
				countriesInstitution.push({label: institution.city?.country.name, value: institution.city?.country.id});
			}
		});

		return countriesInstitution;
	}

	get getTypesInstitution(): Array<ISelectItem> {
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

export default new HelpAbroadsStore();