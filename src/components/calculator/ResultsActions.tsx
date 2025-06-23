import React, { useState } from 'react';
import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
// @ts-ignore
import html2pdf from 'html2pdf.js';

const ResultsActions: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleEmailResults = () => {
    setShowModal(true);
  };

  const handleSendEmail = async () => {
    setSending(true);
    // Generate PDF blob
    const element = document.querySelector('.max-w-4xl.mx-auto');
    if (element) {
      const opt = {
        margin: 0.5,
        filename: 'calculator-results.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      // @ts-ignore
      const worker = html2pdf().set(opt).from(element);
      const pdfBlob = await worker.outputPdf('blob');
      // Send the blob to your backend API for emailing
      // Example fetch (replace with your actual API endpoint)
      await fetch('/api/send-pdf-email', {
        method: 'POST',
        body: (() => {
          const form = new FormData();
          form.append('email', email);
          form.append('pdf', pdfBlob, 'calculator-results.pdf');
          return form;
        })(),
      });
      setShowModal(false);
      setEmail('');
      setSending(false);
      alert('Results sent to your email!');
    } else {
      setSending(false);
      alert('Could not find the calculator results to export.');
    }
  };

  const handleDownloadPDF = () => {
    const element = document.querySelector('.max-w-4xl.mx-auto');
    if (element) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: 'calculator-results.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(element)
        .save();
    } else {
      alert('Could not find the calculator results to export.');
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
        <Button
          onClick={handleEmailResults}
          className="bg-blue-600 hover:bg-blue-800 text-white flex items-center gap-2"
        >
          <Mail size={16} />
          EMAIL ME MY RESULTS
        </Button>
        <Button
          onClick={handleDownloadPDF}
          variant="outline"
          className="border-calculator-blue text-calculator-blue hover:bg-blue-50 hover:border-blue-600 flex items-center gap-2"
        >
          <Download size={16} />
          DOWNLOAD AS PDF
        </Button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Send Results to Email</h2>
            <input
              type="email"
              className="border rounded px-3 py-2 w-full mb-4"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowModal(false)}
                variant="outline"
                className="px-4"
                disabled={sending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                className="bg-blue-600 text-white px-4"
                disabled={sending || !email}
              >
                {sending ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsActions;
