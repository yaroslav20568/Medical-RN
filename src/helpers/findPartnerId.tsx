import { IMessage } from "../types"

const findPartnerId = (userId: number | undefined, messages: Array<IMessage>): number => {
	const arrayUsersId = [...new Set(messages.map(message => message.user.id))];
	const partnerId = arrayUsersId.filter(item => item !== userId)[0];

	return partnerId;
}

export default findPartnerId