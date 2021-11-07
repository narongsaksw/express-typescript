import SessionModel from "../models/session.model";

export async function createSession(userId: any, userAgent: string) {
    const session = await SessionModel.create({user: userId, userAgent})
    
    return session.toJSON()
}