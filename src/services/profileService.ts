
import { supabase } from "@/integrations/supabase/client";
import { JuniorProfile } from "@/types/database";

export const createProfileIfNotExists = async (userId: string, userMetadata: any) => {
  try {
    console.log("Creating profile for user:", userId);
    console.log("User metadata:", userMetadata);
    
    // Check if regular profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('junior_profile')
      .select()
      .eq('id', userId)
      .maybeSingle();
      
    if (fetchError && !fetchError.message.includes('No rows found')) throw fetchError;
    
    // Check if this is a senior (has college_id in metadata)
    const isSenior = userMetadata?.college_id || userMetadata?.roll_no;
    
    if (isSenior) {
      console.log("Creating senior profile...");
      // Check if senior profile exists
      const { data: existingSeniorProfile, error: seniorFetchError } = await supabase
        .from('senior_profiles')
        .select()
        .eq('id', userId)
        .maybeSingle();
        
      if (seniorFetchError && !seniorFetchError.message.includes('No rows found')) throw seniorFetchError;
      
      // If no senior profile exists, create one
      if (!existingSeniorProfile) {
        const seniorData = {
          id: userId,
          name: userMetadata?.name || null,
          gender: userMetadata?.gender || null,
          college_id: userMetadata?.college_id || null,
          roll_no: userMetadata?.roll_no || userMetadata?.college_id || null, // Use college_id as fallback for roll_no
          phone: userMetadata?.phone || null,
          email: userMetadata?.email || null,
          region: userMetadata?.region || null,
        };
        
        console.log("Inserting senior profile data:", seniorData);
        
        const { error: insertError } = await supabase.from('senior_profiles').insert(seniorData);
        
        if (insertError) {
          console.error("Error inserting senior profile:", insertError);
          throw insertError;
        }
        
        console.log("Senior profile created successfully");
      } else {
        console.log("Senior profile already exists");
      }
    } else {
      console.log("Creating regular profile...");
      // If no regular profile exists, create one
      if (!existingProfile) {
        const profileData = {
          id: userId,
          name: userMetadata?.name || null,
          gender: userMetadata?.gender || null,
          email: userMetadata?.email || null,
          phone: userMetadata?.phone || null,
        };
        
        console.log("Inserting profile data:", profileData);
        
        const { error: insertError } = await supabase.from('junior_profile').insert(profileData);
        
        if (insertError) {
          console.error("Error inserting profile:", insertError);
          throw insertError;
        }
        
        console.log("Profile created successfully");
      } else {
        console.log("Profile already exists");
      }
    }
  } catch (error) {
    console.error("Error checking/creating profile:", error);
  }
};

export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('junior_profile')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    throw error;
  }
};

export const fetchSeniorProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('senior_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching senior profile:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in fetchSeniorProfile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, profileData: { name?: string; gender?: string; email?: string; phone?: string }) => {
  try {
    console.log("Updating junior profile for user:", userId, "with data:", profileData);
    
    const updateData: any = {};
    if (profileData.name !== undefined) updateData.name = profileData.name;
    if (profileData.gender !== undefined) updateData.gender = profileData.gender;
    if (profileData.email !== undefined) updateData.email = profileData.email;
    if (profileData.phone !== undefined) updateData.phone = profileData.phone;

    const { data, error } = await supabase
      .from('junior_profile')
      .update(updateData)
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating junior profile:", error);
      throw error;
    }

    console.log("Junior profile updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
};

export const updateSeniorProfile = async (userId: string, data: {
  name?: string; 
  gender?: string; 
  roll_no?: string; 
  phone?: string; 
  email?: string; 
  region?: string;
}) => {
  console.log("Updating senior profile for user:", userId);
  console.log("Update data:", data);
  
  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.roll_no !== undefined) updateData.roll_no = data.roll_no;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.region !== undefined) updateData.region = data.region;

  const { error } = await supabase
    .from('senior_profiles')
    .update(updateData)
    .eq('id', userId);

  if (error) {
    console.error("Error updating senior profile:", error);
    throw error;
  }
  
  console.log("Senior profile updated successfully");
};
