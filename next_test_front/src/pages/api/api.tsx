import client from "@/app/apollo-client";
import { gql } from "@apollo/client";
import { Animal, Personne } from "./interface";

// Récupère les informations des personnes.
export async function fetchPersons(): Promise<Personne[]> {
  try {
    const { data } = await client.query({
      query: gql`
        query GetPersons {
          getPerson {
            id
            firstName
            lastName
            phoneNumber
            email
          }
        }
      `,
    });

    return data.getPerson || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return [];
  }
}

// Récupère les informations des animaux.
export async function fetchAnimals(): Promise<Animal[]> {
  try {
    const { data } = await client.query({
      query: gql`
        query GetAnimals {
          getAnimal {
            id
            name
            species
            weight
            breed
            color
            dateOfBirth
            owner {
              lastName
            }
          }
        }
      `,
    });

    return data.getAnimal || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return [];
  }
}

// Fontion qui va permettre d'affiche les details d'une personne à partir de son id.
export async function fetchPersonById(id: number) {
  try {
    const { data } = await client.query({
      query: gql`
        query GetPersonDetail($id: Int!) {
          getPersonById(id: $id) {
            id
            firstName
            lastName
            phoneNumber
            email
            animals {
              id
              name
              species
            }
          }
        }
      `,
      variables: { id },
    });

    return data.getPersonById || null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la personne :",
      error
    );
    return null;
  }
}
// Fontion qui va permettre de recupere  les details d'un animal à partir de son id.
export async function fetchAnimalById(id: number) {
  try {
    const { data } = await client.query({
      query: gql`
        query GetPersonDetail($id: Int!) {
          getAnimalById(id: $id) {
            id
            name
            species
            weight
            breed
            color
            dateOfBirth
            owner {
              id
              lastName
            }
          }
        }
      `,
      variables: { id },
    });

    return data.getAnimalById || null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'animal' :",
      error
    );
    return null;
  }
}
