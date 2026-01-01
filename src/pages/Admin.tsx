import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Download, 
  Search, 
  Users, 
  Calendar, 
  Filter,
  FileText,
  Loader2,
  Eye,
  RefreshCw
} from 'lucide-react';

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  nationality: string;
  gender: string;
  class: string;
  registration_date: string;
  created_at: string;
}

const Admin = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm, genderFilter]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('registration_date', { ascending: false });

      if (error) throw error;

      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.phone.includes(searchTerm) ||
        reg.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Gender filter
    if (genderFilter !== 'all') {
      filtered = filtered.filter(reg => reg.gender === genderFilter);
    }

    setFilteredRegistrations(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      'ID',
      'First Name',
      'Last Name', 
      'Email',
      'Phone',
      'Age',
      'Nationality',
      'Gender',
      'Class',
      'Registration Date'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        reg.id,
        `"${reg.first_name}"`,
        `"${reg.last_name}"`,
        reg.email,
        reg.phone,
        reg.age,
        `"${reg.nationality || ''}"`,
        reg.gender,
        `"${reg.class}"`,
        new Date(reg.registration_date).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Exported ${filteredRegistrations.length} registrations to CSV`,
    });
  };

  const generateDocument = async () => {
    setIsGeneratingDoc(true);
    try {
      // Import docx library dynamically
      const { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, HeadingLevel } = await import('docx');

      // Create document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: "IAI PROTOCOLE - Registration Report",
              heading: HeadingLevel.TITLE,
            }),
            new Paragraph({
              text: `Generated on: ${new Date().toLocaleDateString()}`,
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: `Total Registrations: ${filteredRegistrations.length}`,
              spacing: { after: 400 },
            }),
            
            // Create table
            new Table({
              rows: [
                // Header row
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Name")] }),
                    new TableCell({ children: [new Paragraph("Email")] }),
                    new TableCell({ children: [new Paragraph("Phone")] }),
                    new TableCell({ children: [new Paragraph("Age")] }),
                    new TableCell({ children: [new Paragraph("Gender")] }),
                    new TableCell({ children: [new Paragraph("Class")] }),
                    new TableCell({ children: [new Paragraph("Date")] }),
                  ],
                }),
                // Data rows
                ...filteredRegistrations.map(reg => 
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph(`${reg.first_name} ${reg.last_name}`)] }),
                      new TableCell({ children: [new Paragraph(reg.email)] }),
                      new TableCell({ children: [new Paragraph(reg.phone)] }),
                      new TableCell({ children: [new Paragraph(reg.age.toString())] }),
                      new TableCell({ children: [new Paragraph(reg.gender)] }),
                      new TableCell({ children: [new Paragraph(reg.class)] }),
                      new TableCell({ children: [new Paragraph(new Date(reg.registration_date).toLocaleDateString())] }),
                    ],
                  })
                ),
              ],
            }),
          ],
        }],
      });

      // Generate and download
      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `registrations_report_${new Date().toISOString().split('T')[0]}.docx`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Document Generated",
        description: `Generated Word document with ${filteredRegistrations.length} registrations`,
      });
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: "Error",
        description: "Failed to generate document",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and export registration data</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredRegistrations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Male</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registrations.filter(r => r.gender === 'male').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Female</CardTitle>
              <Users className="h-4 w-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registrations.filter(r => r.gender === 'female').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, phone, or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button onClick={fetchRegistrations} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                
                <Button onClick={exportToCSV} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                
                <Button 
                  onClick={generateDocument} 
                  disabled={isGeneratingDoc}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isGeneratingDoc ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4 mr-2" />
                  )}
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Registrations ({filteredRegistrations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Phone</th>
                    <th className="text-left p-3 font-medium">Age</th>
                    <th className="text-left p-3 font-medium">Gender</th>
                    <th className="text-left p-3 font-medium">Class</th>
                    <th className="text-left p-3 font-medium">Nationality</th>
                    <th className="text-left p-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((registration) => (
                    <tr key={registration.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium">
                          {registration.first_name} {registration.last_name}
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {registration.email}
                      </td>
                      <td className="p-3 text-sm">
                        {registration.phone}
                      </td>
                      <td className="p-3 text-sm">
                        {registration.age}
                      </td>
                      <td className="p-3">
                        <Badge variant={registration.gender === 'male' ? 'default' : 'secondary'}>
                          {registration.gender}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">
                        {registration.class}
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {registration.nationality || 'N/A'}
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(registration.registration_date).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredRegistrations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No registrations found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;