import { SQLiteDatabase } from "expo-sqlite";

/**
 * Delete Character From SQL
 * @param db SQLite database instance
 * @param characterId The ID of the character to delete
 */
export default async function deleteCharacterFromSql(db: SQLiteDatabase, characterId: string) {
  try {
    await db.runAsync(
      "DELETE FROM player_characters WHERE id = ?",
      [characterId]
    );
  } catch (error) {
    console.warn("Failed to delete character from SQL", error);
    throw error;
  }
}
