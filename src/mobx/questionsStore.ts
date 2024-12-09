import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IQuestion, IQuestionWithResult } from "../types";
import { siteUrl } from "../constants";

class QuestionsStore {
	isLoaded: boolean;
	questions: Array<IQuestion>;
	questionsWithResults: Array<IQuestionWithResult>;

	constructor() {
		this.isLoaded = false;
		this.questions = [];
		this.questionsWithResults = [];
		makeObservable(this, {
			isLoaded: observable,
			questions: observable.shallow,
			questionsWithResults: observable,
			loadQuestions: action,
			loadQuestionsWithResults: action
		})
	}

	loadQuestions(userId: number | undefined): void {
		this.isLoaded = false;
		axios<Array<IQuestion>>(`${siteUrl}/api/questions?userId=${userId}`)
    .then(({ data }) => {
			runInAction(() => {
				this.questions = data;
				this.isLoaded = true;
			});
		})
	}

	loadQuestionsWithResults(): void {
		this.isLoaded = false;
		axios<Array<IQuestionWithResult>>(`${siteUrl}/api/questions-with-results`)
    .then(({ data }) => {
			runInAction(() => {
				this.questionsWithResults = data;
				this.isLoaded = true;
			});
		})
	}
}

export default new QuestionsStore();