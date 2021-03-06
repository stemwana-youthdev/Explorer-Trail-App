export interface Location {
  uid: number;
  name: string;
  position: Position;
  googlePlaceId: string;
  link?: string;
  phone?: string;
  email?: string;
  address?: string;
  distance?: string;
  locationChallenges: LocationChallenge[];
  challengeCount: number;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface LocationChallenge {
  challengeCategory: number;
  challengeDescription: string;
  challengeId: number;
  challengeTitle: string;
  challengeLevels: LocationLevel[];
}

export interface LocationLevel {
  difficulty: number;
  complete: boolean;
}
