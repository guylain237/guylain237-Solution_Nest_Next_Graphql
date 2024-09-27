import { fetchPersonById } from "@/pages/api/api";
import { Personne } from "@/pages/api/interface";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PersonDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = useState<Personne | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPersonData = async () => {
      if (id) {
        try {
          const personData = await fetchPersonById(parseInt(id as string, 10));
          setPerson(personData);
        } catch (err) {
          setError(
            `Échec de la récupération des détails de la personne. ${err}`
          );
        } finally {
          setLoading(false);
        }
      }
    };

    getPersonData();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!person) return <p>Aucun détail disponible pour cet utilisateur.</p>;

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center">Détails de la personne</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>ID:</strong> {person.id}
          </li>
          <li className="list-group-item">
            <strong>Nom:</strong> {person.lastName}
          </li>
          <li className="list-group-item">
            <strong>Prénom:</strong> {person.firstName}
          </li>

          <li className="list-group-item">
            <strong>Numéro de téléphone:</strong> {person.phoneNumber}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {person.email}
          </li>
          <li className="list-group-item">
            <strong>Animaux de compagnie :</strong>
            {person.animals && person.animals.length > 0
              ? person.animals.map((animal, index) => (
                  <>
                    {index > 0 && ", "}
                    <Link
                      key={animal.id}
                      className="text-decoration-none text-primary"
                      href={`/tasks/animal/${animal.id}`}
                    >
                      {`${animal.name} (Espece: ${animal.species}).`}
                    </Link>
                  </>
                ))
              : "Aucun animal de compagnie."}
          </li>
        </ul>
      </div>
    </>
  );
};

export default PersonDetail;
