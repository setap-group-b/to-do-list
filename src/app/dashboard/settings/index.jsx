"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { localStorageFont, localStorageBoldness } from "@/utils/constants";
import ReusableInput from "@/components/ui/ReusableInput";
import { Label } from "@/components/ui/label";

const SettingsPage = ({ userData }) => {
  const { setTheme, theme } = useTheme();
  const [font, setFont] = useState(
    localStorage.getItem(localStorageFont) || "16px"
  );
  const [boldness, setBoldness] = useState(
    localStorage.getItem(localStorageBoldness) || "normal"
  );

  const handleThemeChange = (value) => {
    setTheme(value);
  };

  const handleFontChange = (value) => {
    document.documentElement.style.fontSize = value;
    setFont(value);
    localStorage.setItem(localStorageFont, value);
  };

  const handleBoldnessChange = (value) => {
    document.documentElement.style.fontWeight = value;
    setBoldness(value);
    localStorage.setItem(localStorageBoldness, value);
  };

  return (
    <div className="settings flex gap-4 flex-col h-full">
      {/* Account Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReusableInput
            label="Name"
            defaultValue={userData.name}
            readOnly
            disabled
          />
          <ReusableInput
            label="Email"
            defaultValue={userData.email}
            readOnly
            disabled
          />
        </CardContent>
      </Card>

      {/* Theme Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center flex-wrap gap-4 *:flex-1 *:*:w-full">
          <div className="space-y-2">
            <Label htmlFor="theme-select">Theme</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger id="theme-select">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size-select">Font Size</Label>
            <Select value={font} onValueChange={handleFontChange}>
              <SelectTrigger id="font-size-select">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className={"text-[13px]"} value="13px">
                  Small
                </SelectItem>
                <SelectItem className={"text-[16px]"} value="16px">
                  Medium
                </SelectItem>
                <SelectItem className={"text-[19px]"} value="19px">
                  Large
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-boldness-select">Font Boldness</Label>
            <Select value={boldness} onValueChange={handleBoldnessChange}>
              <SelectTrigger id="font-boldness-select">
                <SelectValue placeholder="Select font boldness" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className={"font-light"} value="300">
                  Light
                </SelectItem>
                <SelectItem className={"font-normal"} value="normal">
                  Normal
                </SelectItem>
                <SelectItem className={"font-bold"} value="700">
                  Bold
                </SelectItem>
                <SelectItem className={"font-extrabold"} value="900">
                  Extra Bold
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
