
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";

interface SeniorEditProfileFormProps {
  initialName: string;
  initialGender: string;
  initialRollNo: string;
  initialPhone: string;
  initialEmail: string;
  initialRegion: string;
  isLoading: boolean;
  onSave: (name: string, gender: string, rollNo: string, phone: string, email: string, region: string, password: string) => Promise<void>;
}

const SeniorEditProfileForm: React.FC<SeniorEditProfileFormProps> = ({
  initialName,
  initialGender,
  initialRollNo,
  initialPhone,
  initialEmail,
  initialRegion,
  isLoading,
  onSave
}) => {
  const [name, setName] = useState(initialName);
  const [gender, setGender] = useState(initialGender);
  const [rollNo, setRollNo] = useState(initialRollNo);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [region, setRegion] = useState(initialRegion);
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await onSave(name, gender, rollNo, phone, email, region, password);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5c7bb5]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Name</h3>
        <Input 
          type="text" 
          placeholder="Enter New Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="border-gray-300"
          disabled={isSaving}
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Password</h3>
        <Input 
          type="password" 
          placeholder="Enter New Password (leave empty to keep current)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="border-gray-300"
          disabled={isSaving}
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Gender</h3>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border border-gray-300 rounded h-12 px-3"
          disabled={isSaving}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Roll Number</h3>
        <Input 
          type="text" 
          placeholder="Enter Roll Number" 
          value={rollNo} 
          onChange={(e) => setRollNo(e.target.value)}
          className="border-gray-300"
          disabled={isSaving}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-1">Phone Number</h3>
        <Input 
          type="tel" 
          placeholder="Enter Phone Number" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)}
          className="border-gray-300"
          disabled={isSaving}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-1">Email</h3>
        <Input 
          type="email" 
          placeholder="Enter Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="border-gray-300"
          disabled={isSaving}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-1">Region (State)</h3>
        <Input 
          type="text" 
          placeholder="Enter Region" 
          value={region} 
          onChange={(e) => setRegion(e.target.value)}
          className="border-gray-300"
          disabled={isSaving}
        />
      </div>

      <hr className="border-gray-300 mb-6" />
      
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md px-8"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default SeniorEditProfileForm;
