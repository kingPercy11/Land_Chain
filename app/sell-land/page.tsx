'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserCircle2, IndianRupee, TrendingUp } from 'lucide-react'

// Mock data for registered lands
const registeredLands = [
  {
    id: '1',
    address: '123, Main Street, Sector 15, Noida, Uttar Pradesh, 201301',
    area: 10764, // sq ft
    location: 'Noida, Uttar Pradesh'
  },
  {
    id: '2',
    address: '456, Oak Avenue, Banjara Hills, Hyderabad, Telangana, 500034',
    area: 6146, // sq ft
    location: 'Hyderabad, Telangana'
  },
  {
    id: '3',
    address: '789, Pine Road, Koregaon Park, Pune, Maharashtra, 411001',
    area: 2152, // sq ft
    location: 'Pune, Maharashtra'
  }
];
// Define a type for the land object
interface Land {
  id: string;
  address: string;
  area: number;
  location: string;
}

export default function Page() {
  return <SellLandComponent />
}

function SellLandComponent() {
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [aiPredictedPrice, setAiPredictedPrice] = useState<number | null>(null);
  const [expectedPrice, setExpectedPrice] = useState('');

  const handleLandSelection = (landId: string) => {  // Change landId to string
    const land = registeredLands.find(land => land.id === landId);
    setSelectedLand(land || null); // Handle the case where land is not found
  };

  const handleAIPrediction = () => {
    // Simulating AI prediction
    setTimeout(() => {
      if(selectedLand) {
        const predictedPrice = (selectedLand.area * 12207.8);
        setAiPredictedPrice(predictedPrice);
      }
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 mr-8">LandChain</span>
              <Button variant="ghost">AI Assistant</Button>
            </div>
            <div className="flex items-center">
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Contact</Button>
              <Button variant="ghost" className="ml-4">
                <UserCircle2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Sell Your Land
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Land Selling Form</CardTitle>
            <CardDescription>Select your registered land and set your selling price.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="landSelection">Select Your Registered Land</Label>
                  <Select onValueChange={handleLandSelection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a registered land" />
                    </SelectTrigger>
                    <SelectContent>
                      {registeredLands.map(land => (
                        <SelectItem key={land.id} value={land.id}>
                          {land.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedLand && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Area</Label>
                        <Input value={`${selectedLand.area} sq. ft.`} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input value={selectedLand.location} readOnly />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Full Address</Label>
                      <Input value={selectedLand.address} readOnly />
                    </div>
                  </div>
                )}


                <div className="space-y-2">
                  <Button type="button" onClick={handleAIPrediction} className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" /> Use AI Predictor for Price Estimation
                  </Button>
                  {aiPredictedPrice && (
                    <div className="mt-2 p-2 bg-blue-100 rounded-md">
                      <p className="text-sm font-medium text-blue-800">
                        AI Estimated Value: ₹{aiPredictedPrice.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>


                <div className="space-y-2">
                  <Label htmlFor="expectedPrice">Expected Price (₹)</Label>
                  <Input
                    id="expectedPrice"
                    type="number"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    required
                  />
                </div>

                

                <div className="space-y-2">
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Upload Property Images</Label>
                  <Input id="images" type="file" accept="image/*" multiple />
                </div>
              </div>

              <Button type="submit" className="w-full">
                <IndianRupee className="mr-2 h-4 w-4" /> Upload Listing
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}