import { fetchAnimalById } from "@/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Animal {
  id: number;
  name: string;
  species: string;
  weight: number;
  breed: string;
  color: string;
  dateOfBirth: string;
  owner: {
    id: number;
    lastName: string;
  };
}

const AnimalDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnimalData = async () => {
      if (id) {
        try {
          const AnimalData = await fetchAnimalById(parseInt(id as string, 10));
          setAnimal(AnimalData);
        } catch (err) {
          setError(
            `Erreur lors de la récupération des détails de l'animal. : ${err} `
          );
        } finally {
          setLoading(false);
        }
      }
    };

    getAnimalData();
  }, [id]);

  if (loading) return <p>Chargement des donneés...</p>;
  if (error) return <p>{error}</p>;
  if (!animal) return <p>Aucun détail disponible pour cet animal.</p>;

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center">Détails de l’animal</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>ID:</strong> {animal.id}
          </li>
          <li className="list-group-item">
            <strong> Nom:</strong> {animal.name}
          </li>

          <li className="list-group-item">
            <strong>Date de naissance:</strong> {animal.dateOfBirth}
          </li>
          <li className="list-group-item">
            <strong>Espèce:</strong> {animal.species}
          </li>
          <li className="list-group-item">
            <strong>Race:</strong> {animal.breed}
          </li>
          <li className="list-group-item">
            <strong>Poids:</strong> {animal.weight}
          </li>
          <li className="list-group-item">
            <strong>Couleur:</strong> {animal.color}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn">
            <div>
              <strong>Propriétaire :</strong> {animal.owner.lastName} (ID:{" "}
              {animal.owner.id})
            </div>
            <Link href={`/tasks/person/${animal.owner.id}`}>
              <button className="btn btn-outline-success btn-animated">
                <i className="fas fa-info-circle"></i> Détail
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AnimalDetail;
