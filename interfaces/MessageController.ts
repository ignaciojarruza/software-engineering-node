import {Request, Response} from "express";

/**
 * Declares the controller for the message functionality
 */
export default interface MessageController {
    userSendsMessage(req: Request, res: Response): void;
    userViewsMessagesSent(req: Request, res: Response): void;
    userViewsMessagesReceived(req: Request, res: Response): void;
    userDeletesMessage(req: Request, res: Response): void;
}