
import { supabase, getProfiles, getSeniorProfiles } from "@/integrations/supabase/client";
import { Profile } from "@/types/database";

export const createProfileIfNotExists = async (userId: string, userMetadata: any) => {
  try {
    // Check if regular profile exists
    const { data: existingProfile, error: fetchError } = await getProfiles()
      .select()
      .eq('id', userId)
      .maybeSingle();
      
    if (fetchError && !fetchError.message.includes('No rows found')) throw fetchError;
    
    // Check if this is a senior (has college_id in metadata)
    const isSenior = userMetadata?.college_id;
    
    if (isSenior) {
      // Check if senior profile exists
      const { data: existingSeniorProfile, error: seniorFetchError } = await getSeniorProfiles()
        .select()
        .eq('id', userId)
        .maybeSingle();
        
      if (seniorFetchError && !seniorFetchError.message.includes('No rows found')) throw seniorFetchError;
      
      // If no senior profile exists, create one
      if (!existingSeniorProfile) {
        const { error: insertError } = await getSeniorProfiles().insert({
          id: userId,
          name: userMetadata?.name || null,
          gender: userMetadata?.gender || null,
          college_id: userMetadata?.college_id || null,
          roll_no: userMetadata?.roll_no || null,
          phone: userMetadata?.phone || null,
          email: userMetadata?.email || null,
          region: userMetadata?.region || null,
        });
        
        if (insertError) throw insertError;
      }
    } else {
      // If no regular profile exists, create one
      if (!existingProfile) {
        const { error: insertError } = await getProfiles().insert({
          id: userId,
          name: userMetadata?.name || null,
          gender: userMetadata?.gender || null,
        });
        
        if (insertError) throw insertError;
      }
    }
  } catch (error) {
    console.error("Error checking/creating profile:", error);
  }
};

export const updateUserProfile = async (userId: string, data: {name?: string; gender?: string}) => {
  const updateData: Partial<Profile> = {};
  if (data.name) updateData.name = data.name;
  if (data.gender) updateData.gender = data.gender;

  const { error } = await getProfiles()
    .update(updateData)
    .eq('id', userId);

  if (error) throw error;
};
