import { doc, runTransaction } from "firebase/firestore";
import { fdb } from "@/firebaseConfig";
import { PlayerCharacter } from "@/types/PlayerCharacter";

/**
 * Save Character To Firestore
 * Overwrites the character document and updates the lookup document so that only one record exists per character.
 * @param userId - The user's unique identifier
 * @param character - The character object to save
 */
export default async function saveCharacterToFirestore(userId: string, character: PlayerCharacter) {
  try {
    if (!character.id) {
      console.error("Character Id is null. Cannot save to Firestore.");
      return { success: false, message: "Invalid Character ID" };
    }

    const characterRef = doc(fdb, "USERS", userId, "CHARACTERS", character.id);
    const lookupRef = doc(fdb, "USERS", userId, "ZZZ_IDS", "CHARACTERS");

    await runTransaction(fdb, async (transaction) => {
      // Retrieve the existing lookup document first.
      const lookupDoc = await transaction.get(lookupRef);
      let characterIds: any[] = [];
      if (lookupDoc.exists()) {
        const data = lookupDoc.data();
        characterIds = data.characterIds || [];
      }

      // Remove any record with the current templateId.
      const filtered = characterIds.filter((record: any) => record.characterId !== character.id);

      // Add the new record with the updated timestamp.
      filtered.push({ characterId: character.id, updatedAt: character.updatedAt });

      // Write both the template and the lookup document.
      transaction.set(characterRef, character, { merge: false });
      transaction.set(lookupRef, { characterIds: filtered }, { merge: false });
    });
  } catch (error) {
    console.warn("Save Template To Firestore Failed:", error);
  }
}
