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
			dialogs: observable,
			setMessages: action,
			addNewMessage: action,
			setDialogs: action
		})
	}

	setMessages(messages: Array<IMessage>) {
		this.messages = messages;
	}

	addNewMessage(message: IMessage) {
		this.messages = [...this.messages, message]
	}

	setDialogs(dialogs: Array<IDialog>) {
		this.dialogs = dialogs;
	}
}

export default new ChatStore();