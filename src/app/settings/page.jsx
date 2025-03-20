"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsPage = () => {
  // Example user data
  const [userData, setUserData] = useState({
    accountName: "JohnDoe123",
    name: "John Doe",
    gender: "Male",
    age: 28,
    userName: "johndoe",
  });

  // Example theme settings
  const [themeSettings, setThemeSettings] = useState({
    theme: "Light",
    accentColor: "#3498db",
    fontSize: "16px",
    fontBoldness: "Normal",
  });

  return (
    <div className="p-6 space-y-6">
      {/* Account Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Account Name" defaultValue={userData.accountName} readOnly />
          <Input label="Name" defaultValue={userData.name} readOnly />
          <Input label="Gender" defaultValue={userData.gender} readOnly />
          <Input label="Age" defaultValue={userData.age} readOnly />
          <Input label="Username" defaultValue={userData.userName} readOnly />
        </CardContent>
      </Card>

      {/* Theme Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            label="Theme"
            value={themeSettings.theme}
            onChange={(e) => setThemeSettings({ ...themeSettings, theme: e.target.value })}
          >
            <SelectItem value="Light">Light</SelectItem>
            <SelectItem value="Dark">Dark</SelectItem>
          </Select>
          <Input
            label="Accent Color"
            type="color"
            value={themeSettings.accentColor}
            onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
          />
          <Select
            label="Font Size"
            value={themeSettings.fontSize}
            onChange={(e) => setThemeSettings({ ...themeSettings, fontSize: e.target.value })}
          >
            <SelectItem value="14px">Small</SelectItem>
            <SelectItem value="16px">Medium</SelectItem>
            <SelectItem value="18px">Large</SelectItem>
          </Select>
          <Select
            label="Font Boldness"
            value={themeSettings.fontBoldness}
            onChange={(e) => setThemeSettings({ ...themeSettings, fontBoldness: e.target.value })}
          >
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="Bold">Bold</SelectItem>
          </Select>
        </CardContent>
      </Card>

      <Button>Save Changes</Button>
    </div>
  );
};

export default SettingsPage;