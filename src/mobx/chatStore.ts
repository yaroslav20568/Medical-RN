import { makeObservable, observable, action } from "mobx";
import { IMessage } from "../types";

class ChatStore {
	messages: Array<IMessage>;

	constructor() {
		this.messages = [];
		makeObservable(this, {
			messages: observable,
			setMessages: action,
			addNewMessage: action
		})
	}

	setMessages(messages: Array<IMessage>) {
		this.messages = messages;
	}

	addNewMessage(message: IMessage) {
		this.messages = [...this.messages, message]
	}
}

export default new ChatStore();