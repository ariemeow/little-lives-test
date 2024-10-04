export interface slotListingParams {
	date: string;
}

export interface appointmentParams {
	date: string;
    time: string;
}

export interface appointmentCancelParams {
	id: string;
}

export interface appointmentSlot {
	date: string;
    time: string;
    available_slots: number;
}