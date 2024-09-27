export interface Personne {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  animals: Animal[];
}

export interface Animal {
  id: number;
  name: string;
  species: string;
  weight: number;
  breed: string;
  color: string;
  dateOfBirth: string;
  owner: {
    lastName: string;
  };
}
