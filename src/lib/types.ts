export type Participant = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  gender: string;
  birth_date: string;
  distance: string;
  created_at: string;
};

export type ResultRow = {
  id: number;
  participant_id: number;
  finish_time: string;
  place: number;
};

export type ParticipantWithResult = {
  id: number;
  first_name: string;
  last_name: string;
  distance: string;
  finish_time: string | null;
  place: number | null;
};
