import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import {
  Download,
  Users,
  Search,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  Shield,
  Trash2
} from "lucide-react";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, AlignmentType, TextRun, ImageRun, HeadingLevel } from "docx";

interface RegistrationRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  nationality: string;
  gender: string;
  class: string;
  registrationDate: string;
  checked: boolean;
}

const Records = () => {
  const { t } = useTranslation();
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [filteredRecords, setFilteredRecords] = useState<RegistrationRecord[]>([]);

  // Admin password (in production, this should be more secure)
  const ADMIN_PASSWORD = "iai2024admin";

  useEffect(() => {
    if (isAuthenticated) {
      loadRecords();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Filter records based on search term
    const filtered = records.filter(record => 
      record.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.phone.includes(searchTerm)
    );
    setFilteredRecords(filtered);
  }, [records, searchTerm]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: t('auth.granted'),
        description: t('auth.grantedMessage'),
      });
    } else {
      toast({
        title: t('auth.denied'),
        description: t('auth.deniedMessage'),
        variant: "destructive",
      });
    }
  };

  const loadRecords = () => {
    const storedRecords = localStorage.getItem("registrationRecords");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  };

  const updateRecord = (id: string, checked: boolean) => {
    const updatedRecords = records.map(record => 
      record.id === id ? { ...record, checked } : record
    );
    setRecords(updatedRecords);
    localStorage.setItem("registrationRecords", JSON.stringify(updatedRecords));
  };

  const deleteRecord = (id: string) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem("registrationRecords", JSON.stringify(updatedRecords));
    toast({
      title: t('records.delete'),
      description: t('records.deleteMessage'),
    });
  };

  const downloadWordDocument = async () => {
    try {
      // Create table rows for the document
      const tableRows = [
        // Header row with better formatting
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "Full Name", bold: true, size: 26 })],
                alignment: AlignmentType.CENTER
              })],
              width: { size: 20, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "Email", bold: true, size: 26 })],
                alignment: AlignmentType.CENTER
              })],
              width: { size: 20, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "Phone", bold: true, size: 26 })],
                alignment: AlignmentType.CENTER
              })],
              width: { size: 15, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "Age", bold: true, size: 26 })],
                alignment: AlignmentType.CENTER
              })],
              width: { size: 10, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "Gender", bold: true, size: 26 })],
                alignment: AlignmentType.CENTER
              })],
              width: { size: 10, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "Class", bold: true, size: 26 })],
                alignment: AlignmentType.CENTER
              })],
              width: { size: 10, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "Status ☐", bold: true, size: 26 })],
                alignment: AlignmentType.CENTER
              })],
              width: { size: 10, type: WidthType.PERCENTAGE }
            }),
          ],
        }),
        // Data rows with better formatting
        ...filteredRecords.map((record) => {
          return new TableRow({
            children: [
              // Full Name cell
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: `${record.firstName} ${record.lastName}`, size: 26 })],
                  alignment: AlignmentType.LEFT
                })],
                width: { size: 20, type: WidthType.PERCENTAGE }
              }),
              // Email cell
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: record.email, size: 26 })],
                  alignment: AlignmentType.LEFT
                })],
                width: { size: 20, type: WidthType.PERCENTAGE }
              }),
              // Phone cell
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: record.phone, size: 26 })],
                  alignment: AlignmentType.LEFT
                })],
                width: { size: 15, type: WidthType.PERCENTAGE }
              }),
              // Age cell
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: record.age, size: 26 })],
                  alignment: AlignmentType.CENTER
                })],
                width: { size: 10, type: WidthType.PERCENTAGE }
              }),
              // Gender cell
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: record.gender, size: 26 })],
                  alignment: AlignmentType.CENTER
                })],
                width: { size: 10, type: WidthType.PERCENTAGE }
              }),
              // Class cell
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: record.class, size: 26 })],
                  alignment: AlignmentType.CENTER
                })],
                width: { size: 10, type: WidthType.PERCENTAGE }
              }),
              // Status checkbox cell
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: record.checked ? "☑" : "☐", size: 26 })],
                  alignment: AlignmentType.CENTER
                })],
                width: { size: 10, type: WidthType.PERCENTAGE }
              }),
            ],
            height: { value: 600, rule: "atLeast" },
          });
        })
      ];

      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 720,
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
          children: [
            new Paragraph({
              children: [new TextRun({ 
                text: "IAI PROTOCOLE - Registration Records", 
                bold: true, 
                size: 32,
                color: "DC2626"
              })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [new TextRun({ 
                text: `Generated on: ${new Date().toLocaleDateString()}`, 
                size: 24 
              })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [new TextRun({ 
                text: `Total Records: ${filteredRecords.length}`, 
                size: 24,
                bold: true 
              })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: tableRows,
              borders: {
                top: { style: "single", size: 1, color: "000000" },
                bottom: { style: "single", size: 1, color: "000000" },
                left: { style: "single", size: 1, color: "000000" },
                right: { style: "single", size: 1, color: "000000" },
                insideHorizontal: { style: "single", size: 1, color: "CCCCCC" },
                insideVertical: { style: "single", size: 1, color: "CCCCCC" },
              },
            }),
            new Paragraph({
              children: [new TextRun({ 
                text: "\n\nNote: Please review each candidate and mark the status column manually.", 
                size: 22,
                italics: true,
                color: "666666"
              })],
              alignment: AlignmentType.LEFT,
              spacing: { before: 400 },
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `IAI_PROTOCOLE_Records_${new Date().toISOString().split('T')[0]}.docx`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: t('records.downloadSuccess'),
        description: t('records.downloadSuccessMessage'),
      });
    } catch (error) {
      console.error("Error generating document:", error);
      toast({
        title: t('records.downloadError'),
        description: t('records.downloadErrorMessage'),
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-red-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-slate-800 mb-2">
              {t('auth.title')}
            </h1>
            <p className="text-slate-600">
              {t('auth.description')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                {t('auth.password')}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 text-lg"
            >
              {t('auth.access')}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-soft mb-4 sm:mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                {t('records.title')}
              </h1>
              <p className="text-slate-600 flex items-center gap-2 text-sm sm:text-base">
                <Users className="w-4 sm:w-5 h-4 sm:h-5" />
                {t('records.total')}: {records.length}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 sm:w-5 h-4 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder={t('records.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 sm:pl-10 bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
                />
              </div>

              <Button
                onClick={downloadWordDocument}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold shadow-soft hover:shadow-elevated transition-all duration-300 text-sm sm:text-base"
                disabled={filteredRecords.length === 0}
              >
                <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                {t('records.download')}
              </Button>
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {filteredRecords.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <Users className="w-12 sm:w-16 h-12 sm:h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-600 mb-2">
                {t('records.noRecords')}
              </h3>
              <p className="text-slate-500 text-sm sm:text-base">
                {searchTerm ? t('records.noRecordsMessage') : t('records.noRecordsAlt')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">{t('records.name')}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">{t('records.contact')}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">{t('records.details')}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">{t('records.registration')}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-slate-700">{t('records.status')}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-slate-700">{t('records.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                              {record.firstName} {record.lastName}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600 capitalize">{record.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-600">
                            <Mail className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{record.email}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-600">
                            <Phone className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                            <span>{record.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-600">
                            <Calendar className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                            <span>{record.age} years old</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-600">
                            <MapPin className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{record.nationality || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-600">
                            <User className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                            <span className="truncate">Class: {record.class}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <p className="text-xs sm:text-sm text-slate-600">
                          {new Date(record.registrationDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(record.registrationDate).toLocaleTimeString()}
                        </p>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                        <Checkbox
                          checked={record.checked}
                          onCheckedChange={(checked) => updateRecord(record.id, checked as boolean)}
                          className="border-red-600 data-[state=checked]:bg-red-600"
                        />
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteRecord(record.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 sm:p-2"
                        >
                          <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Records;