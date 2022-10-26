export default interface MessageDao {
    userSendsMessage(message: string, to: string, from: string): Promise<any>;
    userViewsMessagesSent(from: string): Promise<any>;
    userViewsMessagesReceived(to: string): Promise<any>;
    userDeletesMessage(message: string): Promise<any>;
}