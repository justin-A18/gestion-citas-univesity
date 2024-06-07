import { Types, isValidObjectId } from 'mongoose';

export class Validations {
	static get email() {
		return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	}

	static isMongoID(mongoId: string): boolean {
		return isValidObjectId(mongoId);
	}

	static mongoId(id: string) {
		return new Types.ObjectId(id);
	}

	static startDay(date: Date) {
		const startOfDay = new Date(date);
		startOfDay.setHours(0, 0, 0, 0);

		return startOfDay;
	}

	static endDay(date: Date) {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return endOfDay;
  }
}
