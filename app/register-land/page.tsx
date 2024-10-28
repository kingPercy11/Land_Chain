'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCircle2, CheckCircle2 } from 'lucide-react'

export default function Page() {
  return <RegisterLandComponent />
}

function RegisterLandComponent() {
  const [isDocumentsVerified, setIsDocumentsVerified] = useState(false)

  const handleDocumentVerification = () => {
    // Simulating document verification process
    setTimeout(() => {
      setIsDocumentsVerified(true)
    }, 2000)
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
          Register Your Land Now!!!
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Land Registration Form</CardTitle>
            <CardDescription>Please fill in all the necessary details to register your land.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Land Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (in sq. ft.)</Label>
                    <Input id="area" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" required />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Owner Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input id="ownerName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhoto">Owner Photograph</Label>
                    <Input id="ownerPhoto" type="file" accept="image/*" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identityProof">Identity Proof</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="aadhar">Aadhar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identityDocument">Upload Identity Document</Label>
                  <Input id="identityDocument" type="file" accept=".pdf,.jpg,.png" required />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Land Documents</h2>
                <div className="space-y-2">
                  <Label htmlFor="encumbranceCertificate">Encumbrance Certificate (PDF)</Label>
                  <Input id="encumbranceCertificate" type="file" accept=".pdf" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noc">No Objection Certificate (NOC) (PDF)</Label>
                  <Input id="noc" type="file" accept=".pdf" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleDeed">Title Deed (PDF)</Label>
                  <Input id="titleDeed" type="file" accept=".pdf" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyCard">Property Register Card (PDF)</Label>
                  <Input id="propertyCard" type="file" accept=".pdf" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxBill">Tax Bill Copy (PDF)</Label>
                  <Input id="taxBill" type="file" accept=".pdf" required />
                </div>
              </div>

              <div className="space-y-4">
                <Button type="button" onClick={handleDocumentVerification} disabled={isDocumentsVerified}>
                  {isDocumentsVerified ? 'Documents Verified' : 'Verify Documents'}
                </Button>
                {isDocumentsVerified && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="mr-2" />
                    <span>All documents have been verified</span>
                  </div>
                )}
              </div>

              <Button type="submit" disabled={!isDocumentsVerified}>
                Register Land
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}