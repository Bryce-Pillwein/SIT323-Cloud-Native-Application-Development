// // Get DM Campaigns
// import { Firestore, doc, getDoc } from "firebase/firestore";

// /**
//  * Get DM Campaigns
//  * @param uid User ID
//  * @returns Campaign Data
//  */
// export default async function getDMCampaigns(uid: string) {
//   const { $db } = useNuxtApp();
//   const db = $db as Firestore;

//   try {
//     const docSnapDMCampaigns = await getDoc(doc(db, `USER_DM_CAMPAIGNS/${uid}`))

//     if (!docSnapDMCampaigns.exists()) {
//       return null;
//     }
//     // Get User Characters and Campaign ID's
//     const campaignIDs = docSnapDMCampaigns.data().campaigns;

//     // Get The Campaign Data, using Campaign ID's
//     const campaigns = await Promise.all(campaignIDs.map(async (id: any, idx: number) => {
//       const docSnapCampaigns = await getDoc(doc(db, `CAMPAIGNS/${id}`));
//       if (!docSnapCampaigns.exists()) {
//         return null;
//       }

//       const campaignData = docSnapCampaigns.data();
//       return campaignData;
//     }));

//     // Filter out null values
//     const filteredCampaigns = campaigns.filter(campaign => campaign !== null);

//     // Return null if all values were null
//     if (filteredCampaigns.length === 0) {
//       return null;
//     }

//     return filteredCampaigns;
//   } catch (error) {
//     throw error;
//   }
// }