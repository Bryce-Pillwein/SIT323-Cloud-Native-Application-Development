import { SQLiteDatabase } from "expo-sqlite";
import { PlayerCharacter } from "@/types/PlayerCharacter";

// Define an interface for a row from the player_characters table.
interface PlayerCharacterRow {
  id: string;
  updated_at: string;
  data: string;
}

/**
 * Retrieve a specific player character by ID or all characters if no ID is provided.
 * @param db - The SQLite database instance.
 * @param characterId - Optional ID of the player character.
 * @returns A single PlayerCharacter if characterId is provided, an array of PlayerCharacter objects if not, or null if not found.
 */
export default async function getAllCharacters(db: SQLiteDatabase, characterId?: string): Promise<PlayerCharacter | PlayerCharacter[] | null> {
  try {
    if (characterId) {
      // Fetch a single player character by ID.
      const row = await db.getFirstAsync<PlayerCharacterRow>(
        "SELECT * FROM player_characters WHERE id = ?",
        [characterId]
      );
      if (!row) return null;

      // Parse the JSON stored in the data column.
      const character: PlayerCharacter = JSON.parse(row.data);
      return character;
    } else {
      // Fetch all player characters.
      const rows = await db.getAllAsync<PlayerCharacterRow>(
        "SELECT * FROM player_characters"
      );
      if (!rows || rows.length === 0) return [];

      // Map each row's JSON string to a PlayerCharacter object.
      const characters: PlayerCharacter[] = rows.map((row) =>
        JSON.parse(row.data) as PlayerCharacter
      );

      // Sort the characters by updatedAt in descending order (latest updated first).
      characters.sort((a, b) => {
        const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return bTime - aTime;
      });
      return characters;
    }
  } catch (error) {
    console.error("Error fetching characters from SQL:", error);
    throw error;
  }
}
