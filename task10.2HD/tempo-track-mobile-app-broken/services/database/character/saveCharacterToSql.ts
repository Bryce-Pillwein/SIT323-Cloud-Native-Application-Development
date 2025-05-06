import { PlayerCharacter } from "@/types/PlayerCharacter";
import { SQLiteDatabase } from "expo-sqlite";

/**
 * Save Character To SQL
 * @param db SQLite database instance
 * @param character Character object to save
 */
export default async function saveCharacterToSql(db: SQLiteDatabase, character: PlayerCharacter) {
  try {
    await db.runAsync(
      "INSERT OR REPLACE INTO player_characters (id, updated_at, data) VALUES (?, ?, ?)",
      [character.id, character.updatedAt, JSON.stringify(character)]
    );
  } catch (error) {
    console.warn("Failed to save character to SQL");
    throw error;
  }
}