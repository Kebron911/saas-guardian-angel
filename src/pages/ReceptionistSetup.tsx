
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Headphones, 
  Play,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const ReceptionistSetup = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Receptionist Setup & Configuration</h2>
        <p className="text-gray-500 mt-1">Configure your AI phone receptionist to match your business requirements.</p>
      </div>

      {/* Setup progress */}
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Setup Progress</h3>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">Assistant is Ready</span>
            </div>
          </div>
          <Progress value={85} className="h-2 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Persona Selected</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Greeting Set</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Hours Configured</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Test Call Complete</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
              <span>Training Materials</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="assistant" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="assistant">Select Assistant</TabsTrigger>
          <TabsTrigger value="training">Training Materials</TabsTrigger>
          <TabsTrigger value="behavior">Assistant Behavior</TabsTrigger>
          <TabsTrigger value="rules">Smart Rules</TabsTrigger>
          <TabsTrigger value="test">Test Assistant</TabsTrigger>
          <TabsTrigger value="routing">Call Routing</TabsTrigger>
        </TabsList>

        <TabsContent value="assistant">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Select an Assistant</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="assistant-persona" className="mb-2 block">Persona</Label>
                  <div className="flex mb-4">
                    <select id="assistant-persona" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                      <option value="sally">Sally – Optimistic, Fun, Some Casual Conversation</option>
                      <option value="steve">Steve – Straightforward, Professional</option>
                      <option value="maya">Maya – Friendly, Helpful, Detail-Oriented</option>
                    </select>
                    <Button variant="outline" className="ml-2" size="sm">
                      <Headphones className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>

                  <Label htmlFor="assistant-name" className="mb-2 block">Assistant Name</Label>
                  <Input 
                    id="assistant-name" 
                    placeholder="e.g., Maya" 
                    defaultValue="Maya" 
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-500">What name should your assistant use when answering?</p>
                  <p className="text-sm text-gray-500 mt-1">Example: "Hi, this is Maya, the assistant for Premier Dental"</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Voice Preview</h4>
                  <div className="bg-white rounded-md border border-gray-200 p-4 flex items-center justify-center h-[150px] mb-3">
                    <Button>
                      <Play className="w-4 h-4 mr-2" />
                      Play Sample Voice
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">This is how your AI assistant will sound when answering calls. You can customize the tone and speaking style in the advanced settings.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Provide Training Materials</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="font-medium">Drag & Drop files here</p>
                <p className="text-sm text-gray-500 mb-3">Upload PDFs, DOCs, or paste URLs</p>
                <Button variant="outline">Browse Files</Button>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Uploaded Materials</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-md border border-gray-200 p-3">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <span className="ml-3 font-medium">business-hours-policy.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-md border border-gray-200 p-3">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <span className="ml-3 font-medium">service-descriptions.docx</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Training helps your assistant give accurate answers about your business.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Configure Assistant Behavior</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <Label className="mb-1 block">Answer after 2 rings</Label>
                      <p className="text-sm text-gray-500">How quickly your assistant picks up calls</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <Label className="mb-1 block">Transfer urgent calls</Label>
                      <p className="text-sm text-gray-500">Route critical calls to your phone</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="transfer-number" className="mb-1 block">Transfer number</Label>
                    <Input 
                      id="transfer-number" 
                      placeholder="e.g., (555) 123-4567" 
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-500">Mobile or office number for urgent calls</p>
                  </div>
                  
                  <div className="mb-6">
                    <Label className="mb-1 block">Active Business Hours</Label>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                        <Label htmlFor="start-time" className="text-sm text-gray-500">Start</Label>
                        <Input 
                          id="start-time" 
                          type="time"
                          defaultValue="08:00" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-time" className="text-sm text-gray-500">End</Label>
                        <Input 
                          id="end-time" 
                          type="time"
                          defaultValue="18:00" 
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">When your assistant handles calls directly</p>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <Label htmlFor="greeting-message" className="mb-1 block">Greeting Message</Label>
                    <Textarea 
                      id="greeting-message" 
                      placeholder="Enter the greeting your assistant will use"
                      defaultValue="Hello! Thank you for calling Premier Dental. This is Maya, your AI assistant. How may I help you today?"
                      className="mb-1 h-[100px]"
                    />
                    <p className="text-sm text-gray-500">Used when answering calls during business hours</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Play className="w-3 h-3 mr-1" /> Preview Greeting
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor="fallback-message" className="mb-1 block">Fallback Message</Label>
                    <Textarea 
                      id="fallback-message" 
                      placeholder="Enter a message for when the assistant can't understand the caller"
                      defaultValue="I'm sorry, I didn't quite understand that. Could you please rephrase your question, or would you prefer to leave a message for the team?"
                      className="mb-1 h-[100px]"
                    />
                    <p className="text-sm text-gray-500">Used if the assistant doesn't understand the caller</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Smart Rules & Selectors</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <h4 className="font-medium">Rule Builder</h4>
                <Button className="bg-[#00B8D4] hover:bg-[#00A5BD]">
                  <Plus className="w-4 h-4 mr-1" />
                  Add New Rule
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-medium">Appointment Rule</h5>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-6 gap-3 mb-2">
                    <div className="md:col-span-1 flex items-center">
                      <span className="font-medium">If</span>
                    </div>
                    <div className="md:col-span-2">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>caller says</option>
                        <option>time is</option>
                        <option>caller is</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <Input defaultValue="appointment" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-6 gap-3">
                    <div className="md:col-span-1 flex items-center">
                      <span className="font-medium">Then</span>
                    </div>
                    <div className="md:col-span-2">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>route to</option>
                        <option>transfer to</option>
                        <option>send to</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>booking flow</option>
                        <option>voicemail</option>
                        <option>phone number</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-medium">After Hours Rule</h5>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-6 gap-3 mb-2">
                    <div className="md:col-span-1 flex items-center">
                      <span className="font-medium">If</span>
                    </div>
                    <div className="md:col-span-2">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>call is</option>
                        <option>caller says</option>
                        <option>time is</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>outside business hours</option>
                        <option>during business hours</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-6 gap-3">
                    <div className="md:col-span-1 flex items-center">
                      <span className="font-medium">Then</span>
                    </div>
                    <div className="md:col-span-2">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>send to</option>
                        <option>route to</option>
                        <option>transfer to</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>voicemail</option>
                        <option>booking flow</option>
                        <option>phone number</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-medium">Spam Filter Rule</h5>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-6 gap-3 mb-2">
                    <div className="md:col-span-1 flex items-center">
                      <span className="font-medium">If</span>
                    </div>
                    <div className="md:col-span-2">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>spam detected</option>
                        <option>caller says</option>
                        <option>call is</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <Input defaultValue="true" disabled />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-6 gap-3">
                    <div className="md:col-span-1 flex items-center">
                      <span className="font-medium">Then</span>
                    </div>
                    <div className="md:col-span-2">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                        <option>block call</option>
                        <option>send to</option>
                        <option>route to</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <Input disabled placeholder="No additional input required" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Test Your Assistant</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="bg-[#00B8D4] text-white rounded-full p-5 mb-4">
                  <Headphones className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Your Assistant Now</h3>
                <p className="text-gray-500 text-sm mb-6">Test your AI assistant's configuration with a real call</p>
                <Button size="lg" className="bg-[#00B8D4] hover:bg-[#00A5BD]">
                  <Headphones className="w-5 h-5 mr-2" />
                  Call Your Assistant Now
                </Button>
                <p className="text-sm text-gray-500 mt-4">Last test call: April 20, 3:15 PM – 2m 12s</p>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Test Call Results</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Voice recognition working properly</p>
                      <p className="text-sm text-gray-600">The assistant recognized and processed your speech correctly.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Greeting message played correctly</p>
                      <p className="text-sm text-gray-600">Your configured greeting message was used.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Call routing rule 'Appointment' activated</p>
                      <p className="text-sm text-gray-600">When you mentioned 'appointment', you were routed to the booking flow.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routing">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Call Routing & Number Setup</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="incoming-number" className="mb-2 block">Incoming Number</Label>
                  <div className="flex mb-4">
                    <select id="incoming-number" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none">
                      <option value="number1">(555) 123-4567 - Primary Line</option>
                      <option value="number2">(555) 987-6543 - Secondary Line</option>
                    </select>
                    <Button variant="outline" className="ml-2" size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add New
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Receive calls from this number</p>

                  <Label htmlFor="outgoing-id" className="mb-2 block">Outgoing Caller ID</Label>
                  <select id="outgoing-id" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none mb-2">
                    <option value="business">Use business number</option>
                    <option value="assistant">Use AI assistant number</option>
                  </select>
                  <p className="text-sm text-gray-500">The number that shows when your assistant makes outbound calls</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Your Phone Numbers</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between bg-white rounded-md border border-gray-200 p-3">
                      <div>
                        <p className="font-medium">(555) 123-4567</p>
                        <p className="text-xs text-gray-500">Primary Line</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-md border border-gray-200 p-3">
                      <div>
                        <p className="font-medium">(555) 987-6543</p>
                        <p className="text-xs text-gray-500">Secondary Line</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Inactive</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Another Phone Number
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Additional phone numbers may require a plan upgrade.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <div>
          <span className="text-green-600">Changes auto-saved</span>
        </div>
        <div className="flex gap-4">
          <button className="hover:text-gray-800">Reset to Defaults</button>
          <button className="hover:text-gray-800">View Logs</button>
          <button className="hover:text-gray-800">Need Help?</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceptionistSetup;
