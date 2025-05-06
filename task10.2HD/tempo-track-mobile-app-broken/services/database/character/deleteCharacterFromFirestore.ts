import { doc, runTransaction, arrayRemove } from "firebase/firestore";
import { fdb } from "@/firebaseConfig";
import { PlayerCharacter } from "@/types/PlayerCharacter";

/**
 * Delete Character From Firestore
 * Deletes the character document and updates the lookup document by removing the character ID.
 * If the character is associated with a campaign (character.campaign is not null),
 * it also removes the character from that campaign's "characters" array.
 * @param userId - The user's unique identifier
 * @param character - The character object to delete
 */
export default async function deleteCharacterFromFirestore(userId: string, character: PlayerCharacter) {
  try {
    if (!character.id) {
      console.error("Character Id is null. Cannot delete from Firestore.");
      return;
    }

    const characterRef = doc(fdb, "USERS", userId, "CHARACTERS", character.id);
    const lookupRef = doc(fdb, "USERS", userId, "ZZZ_IDS", "CHARACTERS");

    await runTransaction(fdb, async (transaction) => {
      // Retrieve the existing lookup document.
      const lookupDoc = await transaction.get(lookupRef);
      let characterIds: any[] = [];
      if (lookupDoc.exists()) {
        const data = lookupDoc.data();
        characterIds = data.characterIds || [];
      }

      // Remove any record with the current character ID.
      const filtered = characterIds.filter((record: any) => record.id !== character.id);

      // If character is part of a campaign, remove them from that campaign's "characters" array.
      if (character.campaign) {
        const campaignRef = doc(fdb, "CAMPAIGNS", character.campaign.id);
        const campaignSnap = await transaction.get(campaignRef);
        if (campaignSnap.exists()) {
          // Note: The object passed to arrayRemove must exactly match the stored object.
          transaction.update(campaignRef, {
            characters: arrayRemove({ userId, characterId: character.id, characterName: character.name })
          });
        }
      }

      // Delete the character document and update the lookup document.
      transaction.delete(characterRef);
      transaction.set(lookupRef, { characterIds: filtered }, { merge: false });
    });

  } catch (error) {
    console.warn("Delete Character From Firestore Failed:", error);
  }
}
