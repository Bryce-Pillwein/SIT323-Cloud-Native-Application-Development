import { SQLiteDatabase } from "expo-sqlite";
import { PlayerCharacter } from "@/types/PlayerCharacter";
import { Status } from "@/types/Status";
import deleteCharacterFromSql from "./deleteCharacterFromSql";
import deleteCharacterFromFirestore from "./deleteCharacterFromFirestore";

/**
 * Delete Character
 * Deletes a character from both Firestore and SQLite.
 * @param db SQLite database instance
 * @param userId User ID
 * @param character Character object to delete
 */
export default async function deleteCharacter(db: SQLiteDatabase, userId: string, character: PlayerCharacter): Promise<Status> {
  try {
    if (!character.id) {
      return { success: false, message: "Invalid Character ID" };
    }

    // Delete character from Firestore
    await deleteCharacterFromFirestore(userId, character).catch((error: any) => {
      console.warn("Failed Firestore Operation: Deleting Character", error);
    });

    // Delete character from SQL
    await deleteCharacterFromSql(db, character.id);

    return { success: true };
  } catch (error) {
    console.warn("Failed to delete character: ", error);
    throw error;
  }
}
