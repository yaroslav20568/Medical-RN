import { makeObservable, observable, action } from "mobx";
import { IMessage, IDialog } from "../types";

class ChatStore {
	messages: Array<IMessage>;
	dialogs: Array<IDialog>;

	constructor() {
		this.messages = [];
		this.dialogs = []
		makeObservable(this, {
			messages: observable,
			dialogs: observable.shallow,
			setMessages: action,
			addNewMessage: action,
			setDialogs: action
		})
	}

	setMessages(messages: Array<IMessage>): void {
		this.messages = messages;
	}

	addNewMessage(message: IMessage): void {
		this.messages = [...this.messages, message]
	}

	setDialogs(dialogs: Array<IDialog>): void {
		this.dialogs = dialogs;
	}
}

export default new ChatStore();