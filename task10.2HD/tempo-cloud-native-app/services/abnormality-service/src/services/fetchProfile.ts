import fetch from 'node-fetch';
import { UserProfile } from '../types/UserProfile';

const PROFILE_SERVICE_URL = process.env.PROFILE_SERVICE_URL || 'http://localhost:3001';

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${PROFILE_SERVICE_URL}/v1/profile/${userId}`);

    if (!res.ok) {
      console.warn(`⚠️ Profile not found for user ${userId}`);
      return null;
    }

    const profile = await res.json() as UserProfile;
    return profile;
  } catch (err) {
    console.error('Error fetching profile:', err);
    return null;
  }
}
