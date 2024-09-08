import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IQuestion } from "../types";
import { siteUrl } from "../constants";

class QuestionsStore {
	isLoading: boolean;
	questions: Array<IQuestion>;

	constructor() {
		this.isLoading = false;
		this.questions = [];
		makeObservable(this, {
			isLoading: observable,
			questions: observable,
			loadQuestions: action
		})
	}

	loadQuestions(userId: number | undefined) {
		this.isLoading = true;
		axios<Array<IQuestion>>(`${siteUrl}/api/questions?userId=${userId}`)
    .then(({ data }) => {
			runInAction(() => {
				console.log(data);
				this.questions = data;
				this.isLoading = false;
			});
		})
	}
}

export default new QuestionsStore();