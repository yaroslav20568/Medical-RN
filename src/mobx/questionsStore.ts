import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IQuestion, IQuestionWithResult } from "../types";
import { siteUrl } from "../constants";

class QuestionsStore {
	isLoading: boolean;
	questions: Array<IQuestion>;
	questionsWithResults: Array<IQuestionWithResult>;

	constructor() {
		this.isLoading = false;
		this.questions = [];
		this.questionsWithResults = [];
		makeObservable(this, {
			isLoading: observable,
			questions: observable.shallow,
			questionsWithResults: observable,
			loadQuestions: action,
			loadQuestionsWithResults: action
		})
	}

	loadQuestions(userId: number | undefined): void {
		this.isLoading = true;
		axios<Array<IQuestion>>(`${siteUrl}/api/questions?userId=${userId}`)
    .then(({ data }) => {
			runInAction(() => {
				this.questions = data;
				this.isLoading = false;
			});
		})
	}

	loadQuestionsWithResults(): void {
		this.isLoading = true;
		axios<Array<IQuestionWithResult>>(`${siteUrl}/api/questions-with-results`)
    .then(({ data }) => {
			runInAction(() => {
				this.questionsWithResults = data;
				this.isLoading = false;
			});
		})
	}
}

export default new QuestionsStore();