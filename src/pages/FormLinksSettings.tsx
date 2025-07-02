
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const FormLinksSettings: React.FC = () => {
  const [seniorFormUrl, setSeniorFormUrl] = useState("https://docs.google.com/forms/d/e/1FAIpQLSe7OIarVQZe7_uQ2TiJJQlWZ72uTlAt4rv5jM-4r00viXM3Wg/viewform?embedded=true");
  const [juniorFormUrl, setJuniorFormUrl] = useState("https://docs.google.com/forms/d/e/1FAIpQLSfoTge0of1wrZTTbVaoc2CTh7uqQSv3q3-LALT-wUriftj_QA/viewform?embedded=true");

  const handleSave = () => {
    // Store URLs in localStorage for now
    localStorage.setItem('seniorFormUrl', seniorFormUrl);
    localStorage.setItem('juniorFormUrl', juniorFormUrl);
    
    toast({
      title: "Form URLs Updated",
      description: "The Google Form URLs have been saved successfully.",
    });
  };

  const convertToEmbedUrl = (url: string) => {
    if (url.includes('viewform')) {
      return url.replace('viewform?usp=dialog', 'viewform?embedded=true')
                .replace('viewform', 'viewform?embedded=true');
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-[#edf1f8] font-['Poppins'] p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Form Links Settings</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#5c7bb5]">Senior Form URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seniorUrl" className="text-sm font-medium">
                  Google Form URL for Senior "Raise Issue"
                </Label>
                <Input
                  id="seniorUrl"
                  type="url"
                  value={seniorFormUrl}
                  onChange={(e) => setSeniorFormUrl(convertToEmbedUrl(e.target.value))}
                  placeholder="Enter the Google Form URL for seniors"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The URL will automatically be converted to embedded format
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#5c7bb5]">Junior Form URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="juniorUrl" className="text-sm font-medium">
                  Google Form URL for Junior "Report Issue"
                </Label>
                <Input
                  id="juniorUrl"
                  type="url"
                  value={juniorFormUrl}
                  onChange={(e) => setJuniorFormUrl(convertToEmbedUrl(e.target.value))}
                  placeholder="Enter the Google Form URL for juniors"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The URL will automatically be converted to embedded format
                </p>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSave}
            className="w-full bg-[#7d9bd2] hover:bg-[#6b89c0] text-white py-3"
          >
            Save Form URLs
          </Button>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Copy the Google Form share URL</li>
              <li>• Paste it in the appropriate field above</li>
              <li>• The system will automatically convert it to embedded format</li>
              <li>• Click "Save Form URLs" to apply changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLinksSettings;
