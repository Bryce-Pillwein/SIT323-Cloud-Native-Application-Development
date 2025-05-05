import { SQLiteDatabase } from "expo-sqlite";
import { v4 as uuidv4 } from "uuid";
import { Status } from "@/types/Status";
import { PlayerCharacter } from "@/types/PlayerCharacter";
import saveCharacterToSql from "./saveCharacterToSql";
import saveCharacterToFirestore from "./saveCharacterToFirestore";
import createCharacterFacetStory from "@/services/utilities/createCharacterFacetStory";

/**
 * Save Character
 * Saves a character to both Firestore and SQLite.
 * @param db SQLite database instance
 * @param userId User ID
 * @param character character object to save
 */
export default async function saveCharacter(db: SQLiteDatabase, userId: string, character: PlayerCharacter): Promise<Status> {
  try {
    // Check template capacity for new templates
    if (!character.id) {
      const countResult = await db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM player_characters`
      );
      const characterCount = countResult?.count ?? 0;
      if (characterCount >= 10) {
        return { success: false, message: "Reached Character Capacity" };
      }
    }

    // Generate a new template ID if none exists
    const characterId = character.id || `C-${uuidv4()}`;
    const updatedAt = new Date().toISOString();

    // Prepare character object
    const characterToSave: PlayerCharacter = {
      ...character,
      id: characterId,
      updatedAt
    };

    // Save character to Firestore
    await saveCharacterToFirestore(userId, characterToSave).catch((error: any) => {
      console.warn("Failed Firestore Operation: Saving Character");
    });

    // Save character to SQL
    await saveCharacterToSql(db, characterToSave);

    return { success: true };
  } catch (error) {
    console.warn("Failed to save character: ", error);
    throw error;
  }
}
