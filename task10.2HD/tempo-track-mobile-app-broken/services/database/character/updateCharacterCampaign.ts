import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { CampaignData, CharacterDataForCampaign } from "@/types/Campaign";
import { Status } from "@/types/Status";
import { fdb } from "@/firebaseConfig";
import { SQLiteDatabase } from "expo-sqlite";
import { PlayerCharacter } from "@/types/PlayerCharacter";
import saveCharacter from "./saveCharacter";

/**
 * Updates a character's campaign association.
 *
 * If a valid campaignId is provided:
 *   - Retrieves the campaign data.
 *   - Updates the character object with the campaign data.
 *   - Adds the character to the campaign's "characters" array.
 *
 * If campaignId is null:
 *   - Removes the campaign association from the character.
 *   - Removes the character from the campaign's "characters" array.
 *
 * Finally, it re-saves the character using the saveCharacter function.
 *
 * @param db - SQLite database instance.
 * @param userId - User ID associated with the character.
 * @param character - The character object to update.
 * @param campaignId - The campaign ID to join, or null to leave a campaign.
 * @returns Status indicating success or failure.
 */
export default async function updateCharacterCampaign(
  db: SQLiteDatabase,
  userId: string,
  character: PlayerCharacter,
  campaignId: string | null
): Promise<Status> {
  try {
    if (campaignId) {
      // JOINING a campaign.
      const campaignRef = doc(fdb, "CAMPAIGNS", campaignId);
      const campaignSnap = await getDoc(campaignRef);

      if (!campaignSnap.exists()) {
        return { success: false, message: `Campaign with ID ${campaignId} does not exist.` };
      }

      const campaignData = campaignSnap.data() as CampaignData;

      // If the character is already in this campaign, nothing to do.
      if (character.campaign && character.campaign.id === campaignId) {
        return { success: false, message: "Character already belongs to this campaign." };
      }

      // Update character object with campaign data.
      character.campaign = {
        id: campaignId,
        name: campaignData.name,
        description: campaignData.description,
      };

      // Prepare the minimal object to add to the campaign's characters array.
      const newCharacterData: CharacterDataForCampaign = { userId, characterId: character.id, characterName: character.name };

      // Add the character to the campaign's characters array if not already added.
      if (!campaignData.characters || !campaignData.characters.some(char => char.characterId === character.id)) {
        await updateDoc(campaignRef, {
          characters: arrayUnion(newCharacterData)
        });
      }
    } else {
      // LEAVING a campaign.
      if (!character.campaign) {
        return { success: false, message: "Character is not associated with any campaign." };
      }
      const campaignRef = doc(fdb, "CAMPAIGNS", character.campaign.id);

      // Remove campaign association from character.
      character.campaign = null;

      // Remove the character from the campaign's characters array.
      await updateDoc(campaignRef, {
        characters: arrayRemove({ userId, characterId: character.id, characterName: character.name })
      });
    }

    // Finally, re-save the character with updated campaign data in both Firestore and SQL.
    const saveStatus = await saveCharacter(db, userId, character);
    return saveStatus;
  } catch (error) {
    console.error("Error updating character campaign:", error);
    throw error;
  }
}
