import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const ImportExportData = () => {
  const [importedData, setImportedData] = useState([]);
  const [exportedFilePath, setExportedFilePath] = useState('');

  const handleFileUpload = async (file) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileData = event.target.result;
      const students = [];

      // Parse the CSV file data
      // Assuming the CSV file format: pseudonym,percData_question1,percData_question2,spiSpiritData_question1,spiSpiritData_question2,tallyForms,yenzaTest_score,attendanceRecords_date,attendanceRecords_status,oralExamResults_score,projectGrades_score,quizResults_score
      const rows = fileData.split('\n').slice(1); // Skip the header row
      rows.forEach((row) => {
        const columns = row.split(',');
        const student = {
          pseudonym: columns[0],
          data: {
            qualtricsSurveys: [
              {
                percData: {
                  question1: columns[1],
                  question2: columns[2],
                },
                spiSpiritData: {
                  question1: columns[3],
                  question2: columns[4],
                },
              },
            ],
            tallyForms: [columns[5]],
            yenzaTest: { score: parseInt(columns[6]) },
            attendanceRecords: {
              date: columns[7],
              status: columns[8],
            },
            oralExamResults: { score: parseInt(columns[9]) },
            projectGrades: { score: parseInt(columns[10]) },
            quizResults: { score: parseInt(columns[11]) },
          },
        };
        students.push(student);
      });

      try {
        for (const student of students) {
          const response = await axios.post('https://directed-api.onrender.com/webhook/tally', student, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Student data uploaded:', response.data);
        }
        setImportedData(students);
      } catch (error) {
        console.error('Error uploading student data:', error);
      }
    };

    reader.readAsText(file);
  };

  const handleExportData = async () => {
    try {
      const response = await axios.get('https://directed-api.onrender.com/api/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setExportedFilePath(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv, .xlsx',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      handleFileUpload(file);
    },
  });

  return (
 <div>
  <h2 className="text-2xl font-bold mb-4">Import and Export Data</h2>
  
  <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 mb-4">
    <input {...getInputProps()} />
    <p className="text-gray-600">Drag & drop files here, or click to select files</p>
  </div>

  <div>
    <h3 className="text-xl font-semibold mb-2">Imported Data</h3>
    <ul className="list-disc pl-6">
      {importedData.map((student, index) => (
        <li key={index}>{JSON.stringify(student)}</li>
      ))}
    </ul>
  </div>

  <div className="mt-4">
    <button onClick={handleExportData} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
      Export Data
    </button>
  </div>

  {exportedFilePath && (
    <div className="mt-4">
      <a href={exportedFilePath} download="exported_data.xlsx" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block">
        Download Exported Data
      </a>
    </div>
  )}
</div>

  );
};

export default ImportExportData;
